"use client"
import { useState, useEffect, useRef } from "react"
import { AdminCrudPage } from "@/components/admin/crud-page"
import { getMembers } from "@/service/member.service"
import { regenerateAppointment } from "@/service/appointment.service"
import api from "@/service/api"
import { toast } from "sonner"
import { 
  FileText, 
  Upload, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2, 
  RefreshCw, 
  Download, 
  Image as ImageIcon, 
  Trash2, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { toAbsoluteFileUrl } from "@/lib/utils"

export default function Page() {
  const [memberOptions, setMemberOptions] = useState([])
  const [branding, setBranding] = useState({ stamp: "", signature: "", siteName: "" })
  const [loadingBranding, setLoadingBranding] = useState(true)
  const [uploadingStamp, setUploadingStamp] = useState(false)
  const [uploadingSig, setUploadingSig] = useState(false)
  const [regeneratingId, setRegeneratingId] = useState(null)
  const [downloadingId, setDownloadingId] = useState(null)
  const [showStampSettings, setShowStampSettings] = useState(true)
  const crudRef = useRef(null)

  // Fetch current site_logo / branding
  useEffect(() => {
    async function fetchBranding() {
      try {
        const res = await api.get("/site-content")
        if (res.data?.contents) {
          const logoContent = res.data.contents.find(c => c.key === "site_logo")
          if (logoContent?.content) {
            try {
              const parsed = JSON.parse(logoContent.content)
              setBranding({
                stamp: parsed.stamp || "/association-stamp.png",
                signature: parsed.signature || "",
                siteName: parsed.siteName || "Rabbi Association"
              })
            } catch (e) {}
          }
        }
      } catch (err) {
        console.error("Error fetching branding:", err)
      } finally {
        setLoadingBranding(false)
      }
    }
    fetchBranding()
  }, [])

  useEffect(() => {
    getMembers()
      .then(res => {
        if (res.success) {
          const options = res.members.map(m => ({
            label: `${m.user?.fullName || 'Unknown'} (${m.memberId})`,
            value: m._id
          }))
          setMemberOptions(options)
        }
      })
      .catch(console.error)
  }, [])

  // Handle Dynamic Stamp Upload
  const handleStampUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingStamp(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const uploadRes = await api.post("/site-content/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      if (uploadRes.data?.url) {
        const newStampUrl = uploadRes.data.url
        const updatedBranding = { ...branding, stamp: newStampUrl }
        setBranding(updatedBranding)

        // Save to site_logo content in MongoDB
        await api.post("/site-content", {
          key: "site_logo",
          title: "Site Logo & Official Stamp",
          content: JSON.stringify(updatedBranding)
        })

        toast.success("Official Association Stamp uploaded successfully! It will now appear on all Appointment Letters.")
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload stamp")
    } finally {
      setUploadingStamp(false)
      e.target.value = ""
    }
  }

  // Handle Dynamic Signature Upload
  const handleSignatureUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingSig(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const uploadRes = await api.post("/site-content/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      if (uploadRes.data?.url) {
        const newSigUrl = uploadRes.data.url
        const updatedBranding = { ...branding, signature: newSigUrl }
        setBranding(updatedBranding)

        await api.post("/site-content", {
          key: "site_logo",
          title: "Site Logo & Official Stamp",
          content: JSON.stringify(updatedBranding)
        })

        toast.success("Authorized Signature uploaded successfully!")
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload signature")
    } finally {
      setUploadingSig(false)
      e.target.value = ""
    }
  }

  // Handle Re-generating Appointment Letter with new stamp
  const handleRegenerate = async (id) => {
    setRegeneratingId(id)
    try {
      await regenerateAppointment(id)
      toast.success("Appointment Letter re-generated with the latest official stamp and signature!")
      if (crudRef.current?.fetchData) {
        crudRef.current.fetchData()
      } else {
        window.location.reload()
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to regenerate appointment letter")
    } finally {
      setRegeneratingId(null)
    }
  }

  // Handle downloading appointment letter PDF directly
  const handleDownloadPdf = async (e, r) => {
    e.preventDefault()
    if (!r.pdf?.url) {
      toast.error("Appointment letter PDF is not available yet")
      return
    }

    setDownloadingId(r._id)
    const fileName = `${r.letterNo || "Appointment-Letter"}.pdf`
    const toastId = toast.loading(`Preparing ${fileName}...`)

    try {
      const fileUrl = toAbsoluteFileUrl(r.pdf.url)
      
      const res = await fetch(fileUrl, {
        headers: { Accept: "application/pdf" }
      })
      
      if (!res.ok) {
        throw new Error(`File fetch HTTP ${res.status}`)
      }
      
      const blob = await res.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = blobUrl
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
      
      toast.success(`${fileName} downloaded successfully!`, { id: toastId })
    } catch (err) {
      console.warn("Direct blob download failed, falling back to download endpoint:", err)
      
      try {
        const dlRes = await api.get(`/appointments/${r._id}/download`, { responseType: "blob" })
        if (dlRes.data) {
          const blobUrl = window.URL.createObjectURL(new Blob([dlRes.data], { type: "application/pdf" }))
          const link = document.createElement("a")
          link.href = blobUrl
          link.download = fileName
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(blobUrl)
          toast.success(`${fileName} downloaded successfully!`, { id: toastId })
          return
        }
      } catch (backendErr) {
        console.warn("Backend endpoint fallback failed:", backendErr)
      }

      // Final fallback: open in new tab
      const fallbackUrl = toAbsoluteFileUrl(r.pdf.url)
      window.open(fallbackUrl, "_blank", "noopener,noreferrer")
      toast.info("Opening PDF in new tab...", { id: toastId })
    } finally {
      setDownloadingId(null)
    }
  }

  const appointmentSchema = [
    {
      name: "memberId",
      label: "Select Member",
      type: "select",
      required: true,
      options: memberOptions
    },
    { name: "designation", label: "Designation (Post)", type: "text", required: true, placeholder: "e.g., Senior Research Fellow" },
    { name: "department", label: "Department", type: "text", required: false, placeholder: "e.g., Academic & Islamic Studies" },
    { name: "joiningDate", label: "Joining Date", type: "date", required: true }
  ]

  const columns = [
    { key: "letterNo", label: "Letter No." },
    {
      key: "member",
      label: "Issued To",
      render: (r) => (
        <div>
          <span className="font-semibold text-navy">{r.member?.user?.fullName || "Unknown"}</span>
          {r.member?.memberId && <div className="text-xs text-muted-foreground font-mono">{r.member.memberId}</div>}
        </div>
      )
    },
    { key: "designation", label: "Designation" },
    {
      key: "department",
      label: "Department",
      render: (r) => r.department || "General"
    },
    {
      key: "joiningDate",
      label: "Joining Date",
      render: (r) => r.joiningDate ? new Date(r.joiningDate).toLocaleDateString() : "-"
    },
    {
      key: "pdf",
      label: "Document & Actions",
      render: (r) => (
        <div className="flex items-center gap-2">
          {r.pdf?.url ? (
            <button
              type="button"
              onClick={(e) => handleDownloadPdf(e, r)}
              disabled={downloadingId === r._id}
              className="inline-flex items-center gap-1.5 rounded-lg bg-navy/10 px-2.5 py-1 text-xs font-semibold text-navy hover:bg-navy hover:text-white transition-colors cursor-pointer disabled:opacity-50"
              title="Download Appointment Letter PDF"
            >
              {downloadingId === r._id ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Download className="size-3.5" />
              )}
              <span>{downloadingId === r._id ? "Downloading..." : "PDF"}</span>
            </button>
          ) : (
            <span className="text-muted-foreground text-xs">No PDF</span>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={regeneratingId === r._id}
            onClick={() => handleRegenerate(r._id)}
            title="Re-stamp & Re-generate with latest stamp"
            className="h-7 px-2 text-xs gap-1 border-primary/30 hover:bg-primary/10 text-primary"
          >
            <RefreshCw className={`size-3 ${regeneratingId === r._id ? "animate-spin" : ""}`} />
            {regeneratingId === r._id ? "Re-stamping..." : "Re-stamp"}
          </Button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Dynamic Official Stamp & Seal Management Section */}
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-white via-primary/5 to-slate-50 p-5 md:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-primary/10">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="size-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy flex items-center gap-2">
                Official Seal & Stamp Settings (आधिकारिक मुहर एवं हस्ताक्षर)
              </h2>
              <p className="text-xs text-muted-foreground">
                Upload or update the official association stamp and authorized signature that automatically print on all Appointment Letters and Certificates.
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowStampSettings(!showStampSettings)}
            className="text-xs text-primary font-semibold gap-1"
          >
            {showStampSettings ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
            {showStampSettings ? "Collapse Settings" : "Manage Stamp"}
          </Button>
        </div>

        {showStampSettings && (
          <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            
            {/* Stamp Box */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-navy">
                    Official Stamp (सील / मुहर)
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    Auto-Stamped on PDF
                  </span>
                </div>

                <div className="flex items-center gap-4 py-2">
                  <div className="size-20 rounded-full border-2 border-dashed border-primary/30 p-1 flex items-center justify-center bg-slate-50 shrink-0 overflow-hidden shadow-xs">
                    <img 
                      src={branding.stamp || "/association-stamp.png"} 
                      alt="Official Association Stamp"
                      className="size-full object-contain"
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = "/association-stamp.png"
                      }}
                    />
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p className="font-semibold text-slate-800">Association Round Seal</p>
                    <p className="text-[11px] text-muted-foreground leading-snug">
                      Format: PNG / JPG with transparent or light background.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                <label className="flex-1 cursor-pointer">
                  <span className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-navy px-3 py-2 text-xs font-semibold text-white hover:bg-navy/90 transition-colors">
                    {uploadingStamp ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
                    {uploadingStamp ? "Uploading..." : "Upload New Stamp"}
                  </span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    className="hidden"
                    disabled={uploadingStamp}
                    onChange={handleStampUpload}
                  />
                </label>

                {branding.stamp && branding.stamp !== "/association-stamp.png" && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      const updated = { ...branding, stamp: "/association-stamp.png" }
                      setBranding(updated)
                      await api.post("/site-content", {
                        key: "site_logo",
                        title: "Site Logo & Official Stamp",
                        content: JSON.stringify(updated)
                      })
                      toast.success("Reset to default association stamp")
                    }}
                    className="text-xs text-rose-600 hover:bg-rose-50 border-rose-200"
                    title="Reset to default stamp"
                  >
                    Reset
                  </Button>
                )}
              </div>
            </div>

            {/* Signature Box */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-navy">
                    Authorized Signature (हस्ताक्षर)
                  </span>
                  <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    Signatory Block
                  </span>
                </div>

                <div className="flex items-center gap-4 py-2">
                  <div className="h-20 w-32 rounded-xl border-2 border-dashed border-primary/30 p-2 flex items-center justify-center bg-slate-50 shrink-0 overflow-hidden shadow-xs">
                    {branding.signature ? (
                      <img 
                        src={branding.signature} 
                        alt="Authorized Signature"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="text-center text-[10px] text-muted-foreground font-mono">
                        No Signature
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p className="font-semibold text-slate-800">President / Secretary</p>
                    <p className="text-[11px] text-muted-foreground leading-snug">
                      Format: PNG / JPG (transparent background recommended).
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                <label className="flex-1 cursor-pointer">
                  <span className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-navy px-3 py-2 text-xs font-semibold text-white hover:bg-navy/90 transition-colors">
                    {uploadingSig ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
                    {uploadingSig ? "Uploading..." : "Upload Signature"}
                  </span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    className="hidden"
                    disabled={uploadingSig}
                    onChange={handleSignatureUpload}
                  />
                </label>

                {branding.signature && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      const updated = { ...branding, signature: "" }
                      setBranding(updated)
                      await api.post("/site-content", {
                        key: "site_logo",
                        title: "Site Logo & Official Stamp",
                        content: JSON.stringify(updated)
                      })
                      toast.success("Signature removed")
                    }}
                    className="text-xs text-rose-600 hover:bg-rose-50 border-rose-200"
                    title="Remove signature"
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>

            {/* Live Document Preview Card */}
            <div className="rounded-xl border border-primary/20 bg-white/80 p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-navy block mb-3">
                  Letterhead Footer Preview
                </span>
                
                <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-slate-700">Sincerely,</div>
                    <div className="h-6 flex items-center">
                      {branding.signature ? (
                        <img src={branding.signature} alt="sig" className="h-5 object-contain" />
                      ) : (
                        <span className="text-[10px] text-slate-400 font-mono">___________</span>
                      )}
                    </div>
                    <div className="text-[10px] font-bold text-navy">Authorized Signatory</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <img 
                      src={branding.stamp || "/association-stamp.png"} 
                      alt="stamp" 
                      className="size-11 object-contain"
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = "/association-stamp.png"
                      }}
                    />
                    <span className="text-[8px] font-bold text-navy uppercase tracking-wider mt-0.5">Official Seal</span>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-[11px] text-emerald-700 bg-emerald-50/80 p-2 rounded-lg border border-emerald-100 flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600" />
                <span>Any newly issued letter will immediately include this stamp and signature.</span>
              </p>
            </div>

          </div>
        )}
      </div>

      {/* Main Appointment Letters CRUD Table */}
      <AdminCrudPage
        title="Appointment Letters"
        description="Issue official appointment letters to members and staff."
        endpoint="/appointments"
        schema={appointmentSchema}
        columns={columns}
        crudRef={crudRef}
      />
    </div>
  )
}
