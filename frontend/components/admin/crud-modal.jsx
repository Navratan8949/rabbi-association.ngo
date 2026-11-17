"use client"
import { useState, useEffect } from "react"
import { X, Loader2, Globe, Languages, Eye, FileText, ExternalLink, Download } from "lucide-react"

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

const CONTENT_LANGS = [
  { code: "en", label: "English", native: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "hi", label: "Hindi", native: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
  { code: "ur", label: "Urdu", native: "اردو", flag: "🇵🇰", dir: "rtl" },
  { code: "ar", label: "Arabic", native: "العربية", flag: "🇸🇦", dir: "rtl" },
];

const isFieldTranslatable = (field) => {
  if (field.multilingual !== undefined) return field.multilingual;
  const name = field.name?.toLowerCase() || "";
  const type = field.type || "text";
  if (type !== "text" && type !== "textarea") return false;
  const translatableNames = [
    "title",
    "description",
    "name",
    "designation",
    "message",
    "location",
    "content",
    "about",
    "heading",
    "summary",
    "story",
    "beneficiary",
    "organizer"
  ];
  return translatableNames.includes(name);
};

function FileUploadField({ field, value, initialUrl, onChange, onOpenPreview }) {
  const [fileObjectUrl, setFileObjectUrl] = useState(null)

  useEffect(() => {
    if (value instanceof File || value instanceof Blob) {
      const url = URL.createObjectURL(value)
      setFileObjectUrl(url)
      return () => {
        URL.revokeObjectURL(url)
      }
    } else {
      setFileObjectUrl(null)
    }
  }, [value])

  const currentUrl = fileObjectUrl || (typeof value === "string" ? value : (value?.url || initialUrl))
  const isSelectedFile = value instanceof File || value instanceof Blob
  const fileName = isSelectedFile ? value.name : (currentUrl ? currentUrl.split("/").pop().split("?")[0] : "")
  const isImage = isSelectedFile
    ? (value.type?.startsWith("image/") || !!value.name?.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i))
    : (currentUrl ? !!currentUrl.match(/\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?$/i) : false)
  const isPdf = isSelectedFile
    ? (value.type === "application/pdf" || !!value.name?.toLowerCase().endsWith(".pdf"))
    : (currentUrl ? !!currentUrl.match(/\.pdf(\?.*)?$/i) : false)

  const fileSize = isSelectedFile
    ? value.size > 1024 * 1024
      ? `${(value.size / (1024 * 1024)).toFixed(2)} MB`
      : `${Math.round(value.size / 1024)} KB`
    : null

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 transition-all hover:border-blue-500 hover:bg-blue-50/30">
        <input
          type="file"
          id={`file-input-${field.name}`}
          required={field.required && !initialUrl && !value}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              onChange(e.target.files[0])
            }
          }}
          className="w-full text-sm text-slate-500 file:mr-4 file:cursor-pointer file:rounded-xl file:border-0 file:bg-blue-50 file:px-4 file:py-2.5 file:text-xs file:font-bold file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer"
        />

        {/* Selected File Live Preview */}
        {isSelectedFile && (
          <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 shadow-xs">
            <div className="flex items-center gap-3 overflow-hidden">
              {isImage && fileObjectUrl ? (
                <div className="size-12 shrink-0 overflow-hidden rounded-lg border border-emerald-300 bg-white shadow-xs">
                  <img src={fileObjectUrl} alt="Preview" className="size-full object-cover" />
                </div>
              ) : isPdf ? (
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-rose-100 border border-rose-200 text-rose-600 font-bold text-xs">
                  PDF
                </div>
              ) : (
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 border border-blue-200 text-blue-700 font-bold text-xs">
                  DOC
                </div>
              )}
              <div className="min-w-0 text-left">
                <div className="flex items-center gap-2">
                  <span className="inline-block rounded-md bg-emerald-600 px-1.5 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                    New File Selected
                  </span>
                  {fileSize && <span className="text-[11px] font-semibold text-slate-500">{fileSize}</span>}
                </div>
                <p className="truncate text-xs font-bold text-slate-800 mt-0.5 max-w-[200px] sm:max-w-[260px]" title={fileName}>
                  {fileName}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenPreview({
                url: fileObjectUrl,
                title: fileName,
                isPdf,
                isImage,
                fileSize
              })}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-emerald-800 border border-emerald-300 shadow-xs hover:bg-emerald-100 transition-colors"
            >
              <Eye className="size-3.5" /> Preview
            </button>
          </div>
        )}

        {/* Current Existing File (if not replaced yet) */}
        {!isSelectedFile && currentUrl && (
          <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-left shadow-xs">
            <div className="flex items-center gap-3 overflow-hidden">
              {isImage ? (
                <div className="size-12 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
                  <img src={currentUrl} alt="Current" className="size-full object-cover" />
                </div>
              ) : isPdf ? (
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-rose-50 border border-rose-200 text-rose-600 font-bold text-xs">
                  PDF
                </div>
              ) : (
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-bold text-xs">
                  DOC
                </div>
              )}
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Current Attached Document
                </span>
                <p className="truncate text-xs font-bold text-navy mt-0.5 max-w-[200px] sm:max-w-[260px]" title={fileName}>
                  {fileName || "Attached File"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenPreview({
                url: currentUrl,
                title: fileName || "Current Document",
                isPdf,
                isImage
              })}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-navy border border-slate-300 shadow-xs hover:bg-slate-100 transition-colors"
            >
              <Eye className="size-3.5" /> Preview
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export function CrudModal({ isOpen, onClose, onSubmit, title, schema = [], initialData }) {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeLang, setActiveLang] = useState("en")
  const [previewModalFile, setPreviewModalFile] = useState(null)

  useEffect(() => {
    if (isOpen) {
      const dataToSet = initialData ? { ...initialData } : {}
      if (dataToSet.password) {
        dataToSet.password = ""
      }
      if (dataToSet.translations && typeof dataToSet.translations === "string") {
        try {
          dataToSet.translations = JSON.parse(dataToSet.translations);
        } catch (e) {
          dataToSet.translations = {};
        }
      }
      if (!dataToSet.translations || typeof dataToSet.translations !== "object") {
        dataToSet.translations = {};
      }
      setFormData(dataToSet)
      setActiveLang("en")
      setError(null)
      setLoading(false)
    }
  }, [isOpen, initialData])

  if (!isOpen) return null

  const hasTranslatableFields = (schema || []).some(isFieldTranslatable);
  const currentLangMeta = CONTENT_LANGS.find(l => l.code === activeLang) || CONTENT_LANGS[0];
  const isRTL = currentLangMeta.dir === "rtl";

  const handleChange = (name, value) => {
    if (activeLang === "en") {
      setFormData(prev => ({ ...prev, [name]: value }))
    } else {
      setFormData(prev => ({
        ...prev,
        translations: {
          ...(prev.translations || {}),
          [activeLang]: {
            ...((prev.translations && prev.translations[activeLang]) || {}),
            [name]: value
          }
        }
      }))
    }
  }

  const getFieldValue = (field) => {
    if (activeLang === "en") {
      return formData[field.name];
    }
    return formData.translations?.[activeLang]?.[field.name] || "";
  };

  const visibleFields = activeLang === "en"
    ? schema
    : schema.filter(isFieldTranslatable);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-md" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative w-full max-w-xl rounded-2xl border border-white/20 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ring-1 ring-black/5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-navy/5 bg-gradient-to-r from-navy to-[#022c1d] px-6 py-5">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-extrabold text-white tracking-wide">{title}</h2>
            {hasTranslatableFields && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold text-amber-300">
                <Languages className="size-3" /> Multilingual
              </span>
            )}
          </div>
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

          {/* 4-Language Tab Bar */}
          {hasTranslatableFields && (
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Globe className="size-3.5 text-accent" /> Select Language / भाषा चुनें
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  {activeLang === "en" ? "Primary Default Content" : "Optional Translation"}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 bg-slate-100 p-1 rounded-xl">
                {CONTENT_LANGS.map((lang) => {
                  const isActive = activeLang === lang.code;
                  const hasData = lang.code === "en" 
                    ? true 
                    : !!(formData.translations?.[lang.code] && Object.values(formData.translations[lang.code]).some(v => v && String(v).trim()));
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setActiveLang(lang.code)}
                      className={`relative flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-bold transition-all ${
                        isActive
                          ? "bg-navy text-white shadow-md scale-[1.02]"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="truncate">{lang.native}</span>
                      {hasData && lang.code !== "en" && (
                        <span className="size-1.5 rounded-full bg-emerald-500 absolute top-1.5 right-1.5" title="Translation added" />
                      )}
                    </button>
                  );
                })}
              </div>
              {activeLang !== "en" && (
                <p className="mt-2 text-[11px] font-medium text-slate-500 px-1 leading-normal">
                  💡 Writing in <strong>{currentLangMeta.label} ({currentLangMeta.native})</strong> is optional. If left blank, visitors viewing the site in {currentLangMeta.label} will automatically see the English content.
                </p>
              )}
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
            {(visibleFields || []).map((field) => {
              const isTrans = isFieldTranslatable(field);
              const val = getFieldValue(field);

              return (
                <div key={field.name} dir={activeLang !== "en" && isTrans && isRTL ? "rtl" : "ltr"}>
                  <label className="mb-1.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    <span>
                      {field.label} {activeLang !== "en" && isTrans && `(${currentLangMeta.native})`}{" "}
                      {field.required && activeLang === "en" ? (
                        <span className="text-rose-500 text-sm">*</span>
                      ) : (
                        <span className="text-muted-foreground font-normal text-[10px] ml-1">
                          {activeLang === "en" ? "(Optional)" : "(Optional Translation)"}
                        </span>
                      )}
                    </span>
                    {activeLang !== "en" && isTrans && isRTL && (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        RTL Mode
                      </span>
                    )}
                  </label>
                  
                  {field.type === "textarea" ? (
                    <textarea
                      required={field.required && activeLang === "en"}
                      value={val || ""}
                      onChange={(e) => {
                        handleChange(field.name, e.target.value)
                        if (activeLang === "en" && field.onChange) field.onChange(e.target.value, setFormData, formData)
                      }}
                      dir={activeLang !== "en" && isTrans && isRTL ? "rtl" : "ltr"}
                      className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-navy shadow-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 min-h-[100px] transition-all ${
                        activeLang !== "en" && isTrans && isRTL ? "font-serif text-right text-base leading-relaxed" : ""
                      }`}
                      placeholder={
                        activeLang !== "en"
                          ? `Write ${field.label} in ${currentLangMeta.native} (Optional)...`
                          : field.placeholder
                      }
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
                    <FileUploadField
                      field={field}
                      value={formData[field.name]}
                      initialUrl={initialData?.[field.name]?.url || (typeof initialData?.[field.name] === "string" ? initialData[field.name] : null)}
                      onChange={(file) => handleChange(field.name, file)}
                      onOpenPreview={(prev) => setPreviewModalFile(prev)}
                    />
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
                      required={field.name === "password" && initialData ? false : (field.required && activeLang === "en")}
                      value={val !== undefined && val !== null ? val : ""}
                      onChange={(e) => {
                        handleChange(field.name, e.target.value)
                        if (activeLang === "en" && field.onChange) field.onChange(e.target.value, setFormData, formData)
                      }}
                      dir={activeLang !== "en" && isTrans && isRTL ? "rtl" : "ltr"}
                      disabled={field.disabled || (field.disableOnEdit && !!initialData)}
                      className={`w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy shadow-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all ${
                        field.disabled || (field.disableOnEdit && !!initialData)
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "bg-white"
                      } ${activeLang !== "en" && isTrans && isRTL ? "font-serif text-right text-base" : ""}`}
                      placeholder={
                        activeLang !== "en"
                          ? `Enter ${field.label} in ${currentLangMeta.native} (Optional)...`
                          : field.placeholder
                      }
                    />
                  )}
                </div>
              );
            })}

            {activeLang !== "en" && hasTranslatableFields && (
              <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3 text-center text-xs text-blue-900 font-medium">
                Common settings (images, dates, status, categories) are configured in the <strong>English (🇬🇧)</strong> tab.
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-5">
          <div className="text-[11px] font-semibold text-slate-500">
            Editing: <span className="font-bold text-navy">{currentLangMeta.label} ({currentLangMeta.flag})</span>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={onClose} className="rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-slate-500 transition hover:bg-slate-200 hover:text-navy">
              Cancel
            </button>
            <button 
              type="submit" 
              form="crud-form" 
              disabled={loading}
              className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-accent-foreground shadow-md transition-all hover:scale-[1.02] hover:bg-accent/90 hover:shadow-lg disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                initialData ? "Save Changes" : "Create Record"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Live Document / Image Preview Modal */}
      {previewModalFile && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setPreviewModalFile(null)} />
          <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-black/10">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-6 py-4 text-white">
              <div className="flex items-center gap-3 overflow-hidden">
                {previewModalFile.isPdf ? (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-rose-600 text-white font-bold text-xs">
                    PDF
                  </div>
                ) : (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs">
                    IMG
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold text-white max-w-md">
                    {previewModalFile.title || "File Preview"}
                  </h3>
                  {previewModalFile.fileSize && (
                    <p className="text-[11px] text-slate-400">{previewModalFile.fileSize}</p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewModalFile(null)}
                className="rounded-full bg-white/10 p-1.5 text-white/80 transition-colors hover:bg-rose-500 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-4 sm:p-6 bg-slate-100 flex items-center justify-center min-h-[350px]">
              {previewModalFile.isPdf ? (
                <iframe
                  src={previewModalFile.url}
                  title={previewModalFile.title}
                  className="w-full h-[65vh] rounded-xl border border-slate-300 shadow-inner bg-white"
                />
              ) : previewModalFile.isImage ? (
                <div className="flex flex-col items-center justify-center p-2">
                  <img
                    src={previewModalFile.url}
                    alt={previewModalFile.title}
                    className="max-h-[65vh] w-auto max-w-full rounded-xl shadow-lg border border-slate-200 object-contain bg-white"
                  />
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <FileText className="size-16 mx-auto text-slate-400 mb-3" />
                  <p className="text-sm font-bold text-navy">Non-visual document preview</p>
                  <p className="text-xs text-slate-500 mt-1">This document can be downloaded or opened in a new tab.</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-3.5">
              <span className="text-xs text-slate-500 font-medium">
                {previewModalFile.isPdf ? "PDF Document Preview" : "Media Preview"}
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={previewModalFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-100 transition-colors"
                >
                  <ExternalLink className="size-3.5" /> Open in New Tab
                </a>
                <a
                  href={previewModalFile.url}
                  download={previewModalFile.title}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-3.5 py-1.5 text-xs font-bold text-accent-foreground shadow-xs hover:bg-accent/90 transition-colors"
                >
                  <Download className="size-3.5" /> Download
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewModalFile(null)}
                  className="rounded-xl px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
