"use client"
import { useState, useEffect } from "react"
import { X, Loader2, Eye, FileText, ExternalLink, Download } from "lucide-react"
import { toAbsoluteFileUrl } from "@/lib/utils"

export const formatToInputDate = (dateVal) => {
  if (!dateVal) return "";
  if (typeof dateVal === "string" && dateVal.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return dateVal;
  }
  try {
    const d = new Date(dateVal);
    if (!isNaN(d.getTime())) {
      return d.toISOString().split("T")[0];
    }
    if (typeof dateVal === "string") {
      const parts = dateVal.split(/[-/]/);
      if (parts.length === 3 && parts[2].length === 4) {
        const d2 = new Date(`${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`);
        if (!isNaN(d2.getTime())) {
          return d2.toISOString().split("T")[0];
        }
      }
    }
  } catch (e) {}
  return "";
};

export function CrudModal({ isOpen, onClose, onSubmit, title, schema, initialData }) {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [previewModalFile, setPreviewModalFile] = useState(null)

  useEffect(() => {
    if (isOpen) {
      const dataToSet = initialData ? { ...initialData } : {}
      if (dataToSet.password) {
        dataToSet.password = ""
      }
      setFormData(dataToSet)
      setError(null)
      setLoading(false)
    }
  }, [isOpen, initialData])

  if (!isOpen) return null

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const payload = { ...formData }
      if (initialData && payload.password === "") {
        delete payload.password
      }
      await onSubmit(payload)
      onClose()
    } catch (err) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-md" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl border border-white/20 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-black/5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-navy/5 bg-gradient-to-r from-navy to-[#022c1d] px-6 py-5">
          <h2 className="text-xl font-extrabold text-white tracking-wide">{title}</h2>
          <button onClick={onClose} className="rounded-full bg-white/10 p-2 text-white/80 transition-all hover:bg-rose-500 hover:text-white">
            <X className="size-4" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 bg-slate-50/50">
          {error && (
            <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700 shadow-sm">
              {error}
            </div>
          )}

          <form id="crud-form" onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setError(null);
            
            try {
              const hasFile = schema.some(f => f.type === 'file');
              
              // Clean payload: extract _id from populated objects
              let cleanPayload = { ...formData };
              if (initialData && cleanPayload.password === "") {
                delete cleanPayload.password;
              }
              Object.keys(cleanPayload).forEach(key => {
                if (cleanPayload[key] && typeof cleanPayload[key] === 'object' && cleanPayload[key]._id && !(cleanPayload[key] instanceof File) && !(cleanPayload[key] instanceof Blob)) {
                  cleanPayload[key] = cleanPayload[key]._id;
                }
              });

              let payload = cleanPayload;
              
              if (hasFile) {
                payload = new FormData();
                Object.keys(cleanPayload).forEach(key => {
                  if (cleanPayload[key] !== undefined && cleanPayload[key] !== null) {
                    // Do not append existing image objects to FormData as they become "[object Object]"
                    // Backend will keep existing image if no new file is provided.
                    if (typeof cleanPayload[key] === 'object' && cleanPayload[key].url && !(cleanPayload[key] instanceof File) && !(cleanPayload[key] instanceof Blob)) {
                      return; // Skip existing image object
                    }
                    if (typeof cleanPayload[key] === 'object' && !(cleanPayload[key] instanceof File) && !(cleanPayload[key] instanceof Blob)) {
                      payload.append(key, JSON.stringify(cleanPayload[key]));
                      return;
                    }
                    payload.append(key, cleanPayload[key]);
                  }
                });
              }
              
              await onSubmit(payload);
              onClose();
            } catch (err) {
              setError(err.message || "An error occurred");
            } finally {
              setLoading(false);
            }
          }} className="space-y-4">
            {(schema || []).map((field) => (
              <div key={field.name}>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
                  {field.label} {field.required ? <span className="text-rose-500 text-sm">*</span> : <span className="text-muted-foreground font-normal text-[10px] ml-1">(Optional)</span>}
                </label>
                
                {field.type === "textarea" ? (
                  <textarea
                    required={field.required}
                    value={formData[field.name] || ""}
                    onChange={(e) => {
                      handleChange(field.name, e.target.value)
                      if (field.onChange) field.onChange(e.target.value, setFormData, formData)
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-navy shadow-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 min-h-[100px] transition-all"
                    placeholder={field.placeholder}
                  />
                ) : field.type === "select" ? (
                  <select
                    required={field.required}
                    value={
                      formData[field.name] && typeof formData[field.name] === 'object' && formData[field.name]._id
                        ? formData[field.name]._id
                        : formData[field.name] || ""
                    }
                    onChange={(e) => {
                      handleChange(field.name, e.target.value)
                      if (field.onChange) field.onChange(e.target.value, setFormData, formData)
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-navy shadow-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer"
                  >
                    <option value="" disabled>Select {field.label}</option>
                    {field.options?.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : field.type === "boolean" ? (
                  <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm">
                    <input
                      type="checkbox"
                      checked={!!formData[field.name]}
                      onChange={(e) => {
                        handleChange(field.name, e.target.checked)
                        if (field.onChange) field.onChange(e.target.checked, setFormData, formData)
                      }}
                      className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
                    />
                    <span className="text-sm font-semibold text-navy">{field.placeholder || "Yes"}</span>
                  </label>
                ) : field.type === "file" ? (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-center transition-all hover:border-blue-500 hover:bg-blue-50/50">
                    <input
                      type="file"
                      required={field.required && !initialData?.[field.name] && !formData[field.name]}
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null
                        handleChange(field.name, file)
                      }}
                      className="w-full text-sm text-slate-500 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-xs file:font-bold file:text-blue-700 hover:file:bg-blue-100 transition-all"
                    />

                    {/* Case 1: Newly selected file before submit */}
                    {formData[field.name] instanceof File && (() => {
                      const file = formData[field.name]
                      const isImg = file.type.startsWith("image/")
                      const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
                      const previewUrl = URL.createObjectURL(file)
                      const sizeKb = Math.round(file.size / 1024)
                      const sizeDisplay = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`

                      return (
                        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-emerald-300 bg-emerald-50/80 p-3 text-left">
                          <div className="flex items-center gap-3 min-w-0">
                            {isImg ? (
                              <div className="size-12 shrink-0 overflow-hidden rounded-lg bg-black/5 border border-emerald-200">
                                <img src={previewUrl} alt="Selected file" className="size-full object-cover" />
                              </div>
                            ) : (
                              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-[11px] font-bold text-emerald-800 border border-emerald-300">
                                {isPdf ? "PDF" : "FILE"}
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-emerald-950 truncate max-w-[200px] sm:max-w-[240px]">
                                {file.name}
                              </p>
                              <p className="text-[11px] text-emerald-700 font-medium">
                                Ready for upload &bull; {sizeDisplay}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => setPreviewModalFile({ url: previewUrl, title: file.name })}
                              className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1.5 text-xs font-bold text-emerald-900 border border-emerald-300 shadow-xs hover:bg-emerald-100 transition-colors cursor-pointer"
                            >
                              <Eye className="size-3.5" /> Preview
                            </button>
                            <button
                              type="button"
                              onClick={() => handleChange(field.name, null)}
                              className="rounded-lg p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Clear selection"
                            >
                              <X className="size-4" />
                            </button>
                          </div>
                        </div>
                      )
                    })()}

                    {/* Case 2: Existing file on record */}
                    {!formData[field.name] && initialData?.[field.name]?.url && (() => {
                      const rawUrl = initialData[field.name].url
                      const absUrl = toAbsoluteFileUrl(rawUrl)
                      const isImg = !!rawUrl.match(/\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?$/i)
                      const isPdf = !!rawUrl.match(/\.pdf(\?.*)?$/i)

                      return (
                        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-left shadow-xs">
                          <div className="flex items-center gap-3 min-w-0">
                            {isImg ? (
                              <div className="size-12 shrink-0 overflow-hidden rounded-lg bg-black/5 border border-slate-200">
                                <img src={absUrl} alt="Current file" className="size-full object-cover" />
                              </div>
                            ) : (
                              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[10px] font-bold tracking-widest text-blue-700 border border-blue-200">
                                {isPdf ? "PDF" : "DOC"}
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-navy truncate">Current Attached File</p>
                              <p className="text-[11px] text-slate-500 font-medium">Select a new file above to replace it.</p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setPreviewModalFile({ url: absUrl, title: field.label || "Document" })}
                            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-navy border border-slate-300 shadow-xs hover:bg-slate-100 transition-colors cursor-pointer"
                          >
                            <Eye className="size-3.5" /> Preview
                          </button>
                        </div>
                      )
                    })()}
                  </div>
                ) : field.type === "date" ? (
                  <input
                    type="date"
                    required={field.required}
                    value={formatToInputDate(formData[field.name])}
                    onChange={(e) => {
                      handleChange(field.name, e.target.value)
                      if (field.onChange) field.onChange(e.target.value, setFormData, formData)
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-navy shadow-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                ) : (
                  <input
                    type={field.type || "text"}
                    required={field.name === "password" && initialData ? false : field.required}
                    value={formData[field.name] !== undefined && formData[field.name] !== null ? formData[field.name] : ""}
                    onChange={(e) => {
                      handleChange(field.name, e.target.value)
                      if (field.onChange) field.onChange(e.target.value, setFormData, formData)
                    }}
                    disabled={field.disabled || (field.disableOnEdit && !!initialData)}
                    className={`w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy shadow-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all ${field.disabled || (field.disableOnEdit && !!initialData) ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-white"}`}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5">
          <button type="button" onClick={onClose} className="rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-slate-500 transition hover:bg-slate-200 hover:text-navy">
            Cancel
          </button>
          <button 
            type="submit" 
            form="crud-form" 
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-accent-foreground shadow-md transition-all hover:scale-[1.02] hover:bg-accent/90 hover:shadow-lg disabled:pointer-events-none disabled:opacity-50"
          >
            {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
            {initialData ? "Save Changes" : "Create"}
          </button>
        </div>

      </div>

      {/* Document / File Preview Modal */}
      {previewModalFile && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-navy/70 backdrop-blur-md"
            onClick={() => setPreviewModalFile(null)}
          />
          <div className="relative w-full max-w-4xl rounded-3xl border border-white/20 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-navy/5 bg-gradient-to-r from-navy to-slate-900 px-6 py-4 text-white shrink-0">
              <div className="flex items-center gap-2.5">
                <FileText className="size-5 text-accent" />
                <h3 className="text-base font-bold text-white truncate max-w-md">
                  {previewModalFile.title || "File Preview"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewModalFile(null)}
                className="rounded-full bg-white/10 p-1.5 text-white/80 transition-all hover:bg-rose-500 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Viewer Body */}
            <div className="overflow-y-auto p-4 bg-slate-100 flex items-center justify-center min-h-[350px]">
              {previewModalFile.url ? (() => {
                const absoluteUrl = toAbsoluteFileUrl(previewModalFile.url)
                const isImage = !!previewModalFile.url.match(/\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?$/i)
                return isImage ? (
                  <img
                    src={absoluteUrl}
                    alt={previewModalFile.title}
                    className="max-h-[65vh] w-auto max-w-full rounded-2xl shadow-lg border border-slate-200 object-contain bg-white"
                  />
                ) : (
                  <iframe
                    src={absoluteUrl}
                    title={previewModalFile.title}
                    className="w-full h-[65vh] rounded-2xl border border-slate-300 shadow-inner bg-white"
                  />
                )
              })() : (
                <p className="text-sm font-semibold text-slate-500">No preview available</p>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 border-t border-slate-200 bg-slate-50 px-6 py-3.5 shrink-0">
              {previewModalFile.url && (() => {
                const absoluteUrl = toAbsoluteFileUrl(previewModalFile.url)
                return (
                  <>
                    <a
                      href={absoluteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-100 transition-colors"
                    >
                      <ExternalLink className="size-3.5" /> Open in New Tab
                    </a>
                    <a
                      href={absoluteUrl}
                      download={previewModalFile.title || "download"}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-3.5 py-1.5 text-xs font-bold text-accent-foreground shadow-xs hover:bg-accent/90 transition-colors"
                    >
                      <Download className="size-3.5" /> Download
                    </a>
                  </>
                )
              })()}
              <button
                type="button"
                onClick={() => setPreviewModalFile(null)}
                className="rounded-xl px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-200 hover:text-navy transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
