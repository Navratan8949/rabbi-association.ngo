"use client"
import { useEffect, useState } from "react"
import api from "@/service/api"
import { Loader2, FileText, Download, Briefcase, Calendar } from "lucide-react"
import { toAbsoluteFileUrl } from "@/lib/utils"
import { toast } from "sonner"

export default function Page() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [downloadingId, setDownloadingId] = useState(null)

  const handleDownloadPdf = async (e, app) => {
    e.preventDefault()
    if (!app.pdf?.url) {
      toast.error("Appointment letter PDF is not available yet")
      return
    }

    setDownloadingId(app._id)
    const fileName = `${app.letterNo || "Appointment-Letter"}.pdf`
    const toastId = toast.loading(`Downloading ${fileName}...`)

    try {
      const fileUrl = toAbsoluteFileUrl(app.pdf.url)
      const res = await fetch(fileUrl, { headers: { Accept: "application/pdf" } })
      if (!res.ok) throw new Error(`HTTP error ${res.status}`)

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
      console.warn("Direct blob download failed, trying endpoint:", err)
      try {
        const dlRes = await api.get(`/appointments/${app._id}/download`, { responseType: "blob" })
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
      } catch (backendErr) {}

      window.open(toAbsoluteFileUrl(app.pdf.url), "_blank", "noopener,noreferrer")
      toast.info("Opening PDF in new tab...", { id: toastId })
    } finally {
      setDownloadingId(null)
    }
  }

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await api.get("/appointments/me")
        setAppointments(res.data?.letters || [])
      } catch (err) {
        // Normal if 404
      } finally {
        setLoading(false)
      }
    }
    fetchAppointments()
  }, [])

  if (loading) return <div className="py-10 text-center"><Loader2 className="mx-auto size-6 animate-spin text-navy" /></div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Appointment Letters</h1>
        <p className="mt-1 text-sm text-muted-foreground">View and download your official designation and appointment letters.</p>
      </div>

      {appointments.length === 0 ? (
        <div className="rounded-2xl border border-border/60 bg-white p-10 text-center shadow-soft">
          <FileText className="mx-auto size-12 text-muted-foreground/40" />
          <h2 className="mt-4 text-lg font-bold">No Appointments Found</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">You have not been assigned any official roles or appointments yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {appointments.map((app) => (
            <div key={app._id} className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-navy/5 text-navy">
                    <Briefcase className="size-5" />
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    app.status === 'active' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                    'bg-rose-50 text-rose-600 border border-rose-100'
                  }`}>
                    {app.status}
                  </span>
                </div>
                
                <h3 className="mt-4 text-lg font-bold text-navy">{app.designation}</h3>
                {app.department && <p className="mt-1 text-sm text-muted-foreground">{app.department}</p>}
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>Letter No:</span>
                    <span className="font-semibold">{app.letterNo}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Joining Date:</span>
                    <span className="font-semibold text-slate-700 flex items-center gap-1"><Calendar className="size-3" /> {new Date(app.joiningDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto border-t border-dashed border-border/60 bg-slate-50 p-4">
                {app.pdf?.url ? (
                  <button
                    type="button"
                    onClick={(e) => handleDownloadPdf(e, app)}
                    disabled={downloadingId === app._id}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-3 py-2 text-xs font-semibold text-white hover:bg-navy/90 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {downloadingId === app._id ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Download className="size-4" />
                    )}
                    <span>{downloadingId === app._id ? "Downloading..." : "Download PDF"}</span>
                  </button>
                ) : (
                  <button disabled className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-slate-200 px-3 py-2 text-xs font-semibold text-slate-400">
                    No PDF Available
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
