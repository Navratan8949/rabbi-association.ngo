"use client"
import { useState } from "react"
import { AdminCrudPage, StatusBadge } from "@/components/admin/crud-page"
import { Eye, FileText, Download, ExternalLink, X } from "lucide-react"
import { toAbsoluteFileUrl } from "@/lib/utils"

const DOWNLOAD_SCHEMA = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { 
    name: "category", 
    label: "Category", 
    type: "select", 
    options: [
      { label: "Certificate", value: "certificate" },
      { label: "Document", value: "document" },
      { label: "Report", value: "report" },
      { label: "Fatwa", value: "fatwa" },
      { label: "Book", value: "book" },
      { label: "Article", value: "article" },
      { label: "Other", value: "other" }
    ],
    required: true
  },
  { name: "file", label: "File (PDF/DOC)", type: "file", required: true },
  { 
    name: "status", 
    label: "Status", 
    type: "select", 
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" }
    ],
    required: true
  }
]

export default function Page() {
  const [previewDoc, setPreviewDoc] = useState(null)

  const columns = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category", render: (r) => <span className="capitalize font-semibold">{r.category}</span> },
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
    { 
      key: "file", 
      label: "Document", 
      render: (r) => {
        if (!r.file?.url) return <span className="text-xs text-muted-foreground italic">No file</span>
        const absUrl = toAbsoluteFileUrl(r.file.url)
        const isImage = !!r.file.url.match(/\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?$/i)
        const isPdf = !!r.file.url.match(/\.pdf(\?.*)?$/i)

        return (
          <div className="flex items-center gap-2">
            {isImage ? (
              <button
                type="button"
                onClick={() => setPreviewDoc(r)}
                className="group relative h-9 w-12 overflow-hidden rounded-lg border border-slate-200 shadow-xs hover:border-blue-500 transition-all cursor-pointer bg-slate-50 shrink-0"
                title="Click to preview image"
              >
                <img src={absUrl} alt="Doc preview" className="size-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Eye className="size-3 text-white" />
                </div>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setPreviewDoc(r)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 text-xs font-bold hover:bg-rose-100 border border-rose-200 transition-colors shrink-0 cursor-pointer"
                title="Click to preview document"
              >
                <FileText className="size-3.5 text-rose-500" />
                <span>{isPdf ? "PDF" : "DOC"}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setPreviewDoc(r)}
              className="inline-flex items-center gap-1 text-xs font-bold text-navy hover:text-accent transition-colors cursor-pointer"
            >
              <Eye className="size-3.5" /> Preview
            </button>

            <a
              href={absUrl}
              download={r.title}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-700 transition-colors p-1"
              title="Download File"
            >
              <Download className="size-3.5" />
            </a>
          </div>
        )
      }
    }
  ]

  return (
    <>
      <AdminCrudPage
        title="Publications & Resources"
        description="Manage digital library: Certificates, Fatwas, books, articles and public documents."
        endpoint="/downloads"
        schema={DOWNLOAD_SCHEMA}
        columns={columns}
      />

      {/* Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-md" onClick={() => setPreviewDoc(null)} />
          <div className="relative w-full max-w-4xl rounded-2xl border border-white/20 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-navy/5 bg-gradient-to-r from-navy to-[#022c1d] px-6 py-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white font-bold text-xs uppercase">
                  {previewDoc.category || "DOC"}
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-white tracking-wide">
                    {previewDoc.title}
                  </h2>
                  <p className="text-xs text-white/70 capitalize">
                    Category: <span className="font-semibold text-white/90">{previewDoc.category}</span> &bull; Status: <span className="uppercase font-bold text-emerald-300">{previewDoc.status}</span>
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setPreviewDoc(null)} 
                className="rounded-full bg-white/10 p-2 text-white/80 transition-all hover:bg-rose-500 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto p-6 bg-slate-100 flex items-center justify-center min-h-[350px]">
              {previewDoc.file?.url ? (() => {
                const absUrl = toAbsoluteFileUrl(previewDoc.file.url)
                const isImg = !!previewDoc.file.url.match(/\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?$/i)
                return isImg ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={absUrl} 
                      alt={previewDoc.title} 
                      className="max-h-[68vh] w-auto max-w-full rounded-xl shadow-lg border border-slate-200 object-contain bg-white" 
                    />
                  </div>
                ) : (
                  <iframe 
                    src={absUrl} 
                    title={previewDoc.title}
                    className="w-full h-[68vh] rounded-xl border border-slate-300 shadow-inner bg-white" 
                  />
                )
              })() : (
                <div className="text-center py-12 text-slate-500">
                  <FileText className="size-12 mx-auto text-slate-400 mb-2" />
                  <p className="text-sm font-semibold">No document file attached.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4 shrink-0">
              <span className="text-xs text-slate-500 font-medium">
                {previewDoc.description || "Official NGO Resource"}
              </span>
              <div className="flex items-center gap-3">
                {previewDoc.file?.url && (() => {
                  const absUrl = toAbsoluteFileUrl(previewDoc.file.url)
                  return (
                    <>
                      <a
                        href={absUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-100 transition-colors"
                      >
                        <ExternalLink className="size-3.5" /> Open in New Tab
                      </a>
                      <a
                        href={absUrl}
                        download={previewDoc.title}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs font-bold text-accent-foreground shadow-xs hover:bg-accent/90 transition-colors"
                      >
                        <Download className="size-3.5" /> Download
                      </a>
                    </>
                  )
                })()}
                <button 
                  type="button" 
                  onClick={() => setPreviewDoc(null)}
                  className="rounded-xl px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-200 hover:text-navy transition-colors cursor-pointer"
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
