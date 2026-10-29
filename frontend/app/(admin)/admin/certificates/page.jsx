"use client"
import { useState, useEffect } from "react"
import { AdminCrudPage, StatusBadge } from "@/components/admin/crud-page"
import { getMembers } from "@/service/member.service"
import api from "@/service/api"
import { Eye, FileText, Download, ExternalLink, X } from "lucide-react"

export default function Page() {
  const [memberOptions, setMemberOptions] = useState([])
  const [volunteerOptions, setVolunteerOptions] = useState([])
  const [previewCert, setPreviewCert] = useState(null)
  
  useEffect(() => {
    // Fetch members to populate the select dropdown
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

    // Fetch volunteers to populate the select dropdown
    api.get('/volunteer')
      .then(res => {
        if (res.data?.success) {
          const options = res.data.volunteers
            .filter(v => v.status === "approved")
            .map(v => ({
              label: `${v.user?.fullName || 'Unknown'} (${v.volunteerId})`,
              value: v._id
            }))
          setVolunteerOptions(options)
        }
      })
      .catch(console.error)
  }, [])

  const certificateSchema = [
    { 
      name: "member", 
      label: "Select Member (Leave blank if Volunteer)", 
      type: "select", 
      required: false,
      options: [{label: "--- None ---", value: ""}, ...memberOptions]
    },
    { 
      name: "volunteer", 
      label: "Select Volunteer (Leave blank if Member)", 
      type: "select", 
      required: false,
      options: [{label: "--- None ---", value: ""}, ...volunteerOptions]
    },
    { name: "certificateNo", label: "Certificate Number", type: "text", required: true },
    { name: "title", label: "Certificate Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", required: false },
    { 
      name: "pdf", 
      label: "Attach Certificate (PDF / Image)", 
      type: "file", 
      required: false 
    },
    { 
      name: "status", 
      label: "Status", 
      type: "select", 
      required: true,
      options: [
        { label: "Active", value: "active" },
        { label: "Cancelled", value: "cancelled" }
      ] 
    }
  ]

  const columns = [
    { key: "certificateNo", label: "Cert No." },
    { key: "title", label: "Title" },
    { 
      key: "recipient", 
      label: "Issued To",
      render: (r) => {
        if (r.member) return `${r.member.user?.fullName || "Unknown"} (Member)`;
        if (r.volunteer) return `${r.volunteer.user?.fullName || "Unknown"} (Volunteer)`;
        return "Unknown";
      }
    },
    { 
      key: "pdf", 
      label: "Certificate File",
      render: (r) => {
        if (!r.pdf?.url) return <span className="text-muted-foreground text-xs italic">No File</span>
        const isImage = r.pdf.url.match(/\.(jpeg|jpg|gif|png|webp)$/i)
        return (
          <div className="flex items-center gap-2">
            {isImage ? (
              <button 
                type="button"
                onClick={() => setPreviewCert(r)}
                className="group relative h-10 w-14 overflow-hidden rounded-lg border border-slate-200 shadow-sm hover:border-blue-500 transition-all cursor-pointer bg-slate-50 shrink-0"
                title="Click to view certificate"
              >
                <img src={r.pdf.url} alt="Certificate" className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Eye className="size-3.5 text-white" />
                </div>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setPreviewCert(r)}
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100 border border-blue-200 transition-colors shrink-0"
                title="Click to view PDF"
              >
                <FileText className="size-3.5 text-rose-500" />
                <span>PDF</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setPreviewCert(r)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Eye className="size-3.5" /> View
            </button>
            <a
              href={r.pdf.url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-700 transition-colors p-1"
              title="Download Certificate"
            >
              <Download className="size-3.5" />
            </a>
          </div>
        )
      }
    },
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> }
  ]

  return (
    <>
      <AdminCrudPage
        title="Certificates"
        description="Issue and manage certificates for registered members and volunteers."
        endpoint="/certificates"
        schema={certificateSchema}
        columns={columns}
      />

      {/* Certificate Preview Modal */}
      {previewCert && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-md" onClick={() => setPreviewCert(null)} />
          <div className="relative w-full max-w-4xl rounded-2xl border border-white/20 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-navy/5 bg-gradient-to-r from-navy to-[#022c1d] px-6 py-4 shrink-0">
              <div>
                <h2 className="text-lg font-extrabold text-white tracking-wide">
                  {previewCert.title}
                </h2>
                <p className="text-xs text-white/70">
                  Certificate No: <span className="font-mono font-semibold text-white/90">{previewCert.certificateNo}</span> &bull; Issued to: <span className="font-semibold text-white/90">{previewCert.member ? `${previewCert.member.user?.fullName || "Member"} (Member)` : previewCert.volunteer ? `${previewCert.volunteer.user?.fullName || "Volunteer"} (Volunteer)` : "Recipient"}</span>
                </p>
              </div>
              <button 
                onClick={() => setPreviewCert(null)} 
                className="rounded-full bg-white/10 p-2 text-white/80 transition-all hover:bg-rose-500 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto p-6 bg-slate-100 flex items-center justify-center min-h-[350px]">
              {previewCert.pdf?.url ? (
                previewCert.pdf.url.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={previewCert.pdf.url} 
                      alt={previewCert.title} 
                      className="max-h-[68vh] w-auto max-w-full rounded-xl shadow-lg border border-slate-200 object-contain bg-white" 
                    />
                  </div>
                ) : (
                  <iframe 
                    src={previewCert.pdf.url} 
                    title={previewCert.title}
                    className="w-full h-[68vh] rounded-xl border border-slate-300 shadow-inner bg-white" 
                  />
                )
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <FileText className="size-12 mx-auto text-slate-400 mb-2" />
                  <p className="text-sm font-semibold">No certificate document attached.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4 shrink-0">
              <span className="text-xs text-slate-500 font-medium">
                Status: <span className="font-bold uppercase">{previewCert.status}</span>
              </span>
              <div className="flex items-center gap-3">
                {previewCert.pdf?.url && (
                  <>
                    <a
                      href={previewCert.pdf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-100 transition-colors"
                    >
                      <ExternalLink className="size-3.5" /> Open in New Tab
                    </a>
                    <a
                      href={previewCert.pdf.url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs font-bold text-accent-foreground shadow-sm hover:bg-accent/90 transition-colors"
                    >
                      <Download className="size-3.5" /> Download
                    </a>
                  </>
                )}
                <button 
                  type="button" 
                  onClick={() => setPreviewCert(null)}
                  className="rounded-xl px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-200 hover:text-navy transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
