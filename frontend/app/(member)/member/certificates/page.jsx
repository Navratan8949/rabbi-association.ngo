"use client";
import { useState, useEffect } from "react";
import { getMyCertificates } from "@/service/certificate.service";
import { Award, FileBadge, Download, Loader2, Eye, FileText, ExternalLink, X } from "lucide-react";

export default function MemberCertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewCert, setPreviewCert] = useState(null);

  useEffect(() => {
    getMyCertificates()
      .then((res) => {
        if (res.success) {
          setCertificates(res.certificates || []);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold md:text-3xl text-navy">My Certificates</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        View and download your official certificates and awards.
      </p>

      <div className="mt-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="size-6 animate-spin text-navy" />
          </div>
        ) : certificates.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => {
              const isImage = cert.pdf?.url && cert.pdf.url.match(/\.(jpeg|jpg|gif|png|webp)$/i);
              return (
                <div
                  key={cert._id}
                  className="relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm transition-all hover:shadow-md"
                >
                  {cert.status === "cancelled" && (
                    <div className="absolute right-0 top-0 z-10 rounded-bl-xl bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
                      Cancelled
                    </div>
                  )}

                  {/* Certificate Visual Preview Header */}
                  {cert.pdf?.url && isImage ? (
                    <div 
                      onClick={() => setPreviewCert(cert)}
                      className="group relative h-48 w-full cursor-pointer overflow-hidden border-b border-border/50 bg-slate-100"
                    >
                      <img 
                        src={cert.pdf.url} 
                        alt={cert.title} 
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-navy/50 opacity-0 backdrop-blur-xs transition-opacity group-hover:opacity-100">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-bold text-navy shadow-sm">
                          <Eye className="size-3.5" /> View Certificate
                        </span>
                      </div>
                    </div>
                  ) : cert.pdf?.url ? (
                    <div 
                      onClick={() => setPreviewCert(cert)}
                      className="group flex h-36 w-full cursor-pointer flex-col items-center justify-center border-b border-border/50 bg-gradient-to-br from-blue-50/60 to-slate-100 transition-colors hover:from-blue-100/60 hover:to-slate-200/60"
                    >
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-white shadow-sm border border-blue-100 text-blue-600 transition-transform group-hover:scale-110">
                        <FileText className="size-6 text-rose-500" />
                      </div>
                      <span className="mt-2 text-xs font-bold text-navy group-hover:text-blue-700 flex items-center gap-1">
                        <Eye className="size-3" /> Official Certificate (PDF)
                      </span>
                    </div>
                  ) : null}

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-6">
                    {!cert.pdf?.url && (
                      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-accent/20 text-accent">
                        <FileBadge className="size-6 text-red-500" />
                      </div>
                    )}

                    <h3 className="text-lg font-bold text-navy leading-tight">
                      {cert.title}
                    </h3>
                    <p className="mt-1 text-xs font-mono text-muted-foreground">
                      No: {cert.certificateNo}
                    </p>

                    {cert.description && (
                      <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                        {cert.description}
                      </p>
                    )}

                    <div className="mt-auto pt-6">
                      <div className="flex items-center justify-between border-t border-border/50 pt-4">
                        <span className="text-xs font-semibold text-muted-foreground">
                          Issued: {new Date(cert.issueDate).toLocaleDateString()}
                        </span>

                        {cert.pdf?.url && cert.status !== "cancelled" ? (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setPreviewCert(cert)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                              <Eye className="size-3.5" />
                              View
                            </button>
                            <a
                              href={cert.pdf.url}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-navy/90 transition-colors"
                            >
                              <Download className="size-3.5" />
                              Download
                            </a>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">
                            File not available
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border/70 bg-white py-20 text-center">
            <Award className="mx-auto size-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-bold text-navy">
              No Certificates Yet
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              You will see your official certificates here once they are issued
              by the administration.
            </p>
          </div>
        )}
      </div>

      {/* Certificate Preview Modal */}
      {previewCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-md" onClick={() => setPreviewCert(null)} />
          <div className="relative w-full max-w-4xl rounded-2xl border border-white/20 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-navy/5 bg-gradient-to-r from-navy to-[#022c1d] px-6 py-4 shrink-0">
              <div>
                <h2 className="text-lg font-extrabold text-white tracking-wide">
                  {previewCert.title}
                </h2>
                <p className="text-xs text-white/70">
                  Certificate No: <span className="font-mono font-semibold text-white/90">{previewCert.certificateNo}</span> &bull; Issued on: {new Date(previewCert.issueDate).toLocaleDateString()}
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
                Status: <span className="font-bold uppercase text-navy">{previewCert.status}</span>
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
    </div>
  );
}
