"use client"

import { useEffect, useState, useMemo } from "react"
import { PageHero } from "@/components/pages/page-hero"
import { getDownloads } from "@/service/download.service"
import { getPublicCertificates } from "@/service/certificate.service"
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Loader2, 
  Award, 
  ShieldCheck, 
  Eye, 
  Search, 
  X,
  FileCheck2,
  FolderOpen
} from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { toast } from "sonner"

export default function CertificatesPage() {
  const { language, isRTL, t } = useLanguage()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [previewItem, setPreviewItem] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchAllData = async () => {
      setLoading(true)
      let combined = []

      // 1. Fetch Downloads
      try {
        const dlRes = await getDownloads({ status: "active" })
        const dlList = dlRes?.downloads || (Array.isArray(dlRes) ? dlRes : dlRes?.data || [])
        if (Array.isArray(dlList)) {
          dlList.forEach((d) => {
            combined.push({
              _id: d._id,
              title: d.title,
              description: d.description || "",
              category: d.category || "document",
              fileUrl: d.file?.url,
              fileType: d.fileType || "pdf",
              type: "download",
              createdAt: d.createdAt,
            })
          })
        }
      } catch (err) {
        console.error("Failed to load downloads:", err)
      }

      // 2. Fetch Public Certificates
      try {
        const certRes = await getPublicCertificates()
        const certList = certRes?.certificates || (Array.isArray(certRes) ? certRes : [])
        if (Array.isArray(certList)) {
          certList.forEach((c) => {
            combined.push({
              _id: c._id,
              title: c.title,
              description: c.description || (c.certificateNo ? `Certificate No: ${c.certificateNo}` : ""),
              category: "certificate",
              certificateNo: c.certificateNo,
              fileUrl: c.pdf?.url,
              fileType: "pdf",
              type: "certificate",
              createdAt: c.createdAt || c.issueDate,
            })
          })
        }
      } catch (err) {
        console.error("Failed to load certificates:", err)
      }

      // 3. Fallback Seed if completely empty
      if (combined.length === 0) {
        combined = [
          {
            _id: "seed-1",
            title: "NGO Society Registration Certificate",
            description: "Official certificate of registration under the Societies Registration Act, certifying Rabbi Association as a recognized non-profit organization.",
            category: "certificate",
            fileUrl: "/public/uploads/ngo-registration-certificate.pdf",
            fileType: "pdf",
            type: "download",
          },
          {
            _id: "seed-2",
            title: "Section 12A & 80G Tax Exemption Certificate",
            description: "Exemption certificate granted by the Income Tax Department of India under Sections 12A & 80G, granting tax deductions to donors.",
            category: "certificate",
            fileUrl: "/public/uploads/12a-80g-tax-exemption.pdf",
            fileType: "pdf",
            type: "download",
          },
          {
            _id: "seed-3",
            title: "NITI Aayog NGO-Darpan Accreditation",
            description: "Accreditation and registration certificate with the Government of India NGO-Darpan Portal under NITI Aayog.",
            category: "document",
            fileUrl: "/public/uploads/niti-aayog-darpan-cert.pdf",
            fileType: "pdf",
            type: "download",
          },
          {
            _id: "seed-4",
            title: "Annual Activity & Social Impact Report",
            description: "Comprehensive annual audit, community impact milestones, educational development metrics, and welfare initiatives.",
            category: "report",
            fileUrl: "/public/uploads/annual-impact-report.pdf",
            fileType: "pdf",
            type: "download",
          }
        ]
      }

      if (isMounted) {
        setItems(combined)
        setLoading(false)
      }
    }

    fetchAllData()

    return () => {
      isMounted = false
    }
  }, [])

  const categories = useMemo(() => {
    return [
      { id: "all", label: t("certificates.tab_all", "All Resources") },
      { id: "certificate", label: t("certificates.tab_certificates", "Certificates") },
      { id: "document", label: t("certificates.tab_documents", "Official Documents") },
      { id: "report", label: t("certificates.tab_reports", "Reports & Publications") },
    ]
  }, [t])

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchTab =
        activeTab === "all" ||
        item.category?.toLowerCase() === activeTab.toLowerCase() ||
        (activeTab === "certificate" && item.type === "certificate")

      const q = searchQuery.toLowerCase().trim()
      const matchSearch =
        !q ||
        item.title?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q)

      return matchTab && matchSearch
    })
  }, [items, activeTab, searchQuery])

  const getCategoryBadgeClass = (category) => {
    switch (category?.toLowerCase()) {
      case "certificate":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "report":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "document":
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen bg-slate-50/50">
      <PageHero
        eyebrow={t("certificates.eyebrow", "Public Records & Credentials")}
        title={t("certificates.title", "Certificates & Documents")}
        description={t(
          "certificates.description",
          "View, preview, and download our official NGO certificates, legal documents, accreditation, and publications."
        )}
        image="/logo.png"
      />

      <div className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        {/* Controls: Search & Tabs */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            {categories.map((tab) => {
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-xl px-4 py-2 text-xs md:text-sm font-bold transition-all ${
                    active
                      ? "bg-navy text-white shadow-sm"
                      : "text-slate-600 hover:text-navy hover:bg-slate-100/70"
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className={`absolute ${isRTL ? "right-3.5" : "left-3.5"} top-1/2 -translate-y-1/2 size-4 text-slate-400`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("certificates.search_placeholder", "Search documents, certificates...")}
              className={`w-full rounded-2xl border border-slate-200 bg-white py-2.5 ${
                isRTL ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"
              } text-sm text-navy shadow-xs placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className={`absolute ${isRTL ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:text-navy`}
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <Loader2 className="size-10 animate-spin text-accent" />
            <p className="mt-4 text-base font-bold text-navy">
              {t("certificates.loading", "Loading documents and certificates...")}
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="mx-auto max-w-xl text-center py-16">
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 shadow-xs">
              <FolderOpen className="size-14 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-navy">
                {t("certificates.no_results", "No documents found")}
              </h3>
              <p className="mt-2 text-sm text-slate-500 font-medium">
                {searchQuery
                  ? t("certificates.try_different", "Try clearing your search query or switching categories.")
                  : t("certificates.no_documents_msg", "Please check back later for official publications.")}
              </p>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-navy px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-navy/90"
                >
                  {t("certificates.clear_search", "Clear Search")}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((doc) => {
              const isImage = !!doc.fileUrl?.match(/\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?$/i)
              const isPdf = !!doc.fileUrl?.match(/\.pdf(\?.*)?$/i) || doc.fileType === "pdf"

              return (
                <div
                  key={doc._id}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-xl"
                >
                  <div className="p-6">
                    {/* Top Icon & Category Tag */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 transition-transform duration-300 group-hover:scale-110">
                        {doc.category === "certificate" || doc.type === "certificate" ? (
                          <Award className="size-6 text-amber-600" />
                        ) : doc.category === "report" ? (
                          <FileCheck2 className="size-6 text-emerald-600" />
                        ) : (
                          <FileText className="size-6 text-blue-600" />
                        )}
                      </div>

                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider capitalize ${getCategoryBadgeClass(
                          doc.category
                        )}`}
                      >
                        {doc.category || "Document"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="line-clamp-2 text-lg font-bold text-navy group-hover:text-accent transition-colors">
                      {doc.title}
                    </h3>

                    {/* Description */}
                    {doc.description && (
                      <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-slate-600 font-medium">
                        {doc.description}
                      </p>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="border-t border-slate-100 bg-slate-50/60 p-4">
                    <div className="flex items-center gap-2">
                      {doc.fileUrl ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setPreviewItem(doc)}
                            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-navy py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
                          >
                            <Eye className="size-3.5" />
                            {t("certificates.preview_btn", "Preview")}
                          </button>

                          <a
                            href={doc.fileUrl}
                            download={doc.title}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-xs hover:border-accent hover:text-accent transition-colors"
                            title={t("certificates.download_btn", "Download File")}
                          >
                            <Download className="size-4" />
                          </a>
                        </>
                      ) : (
                        <div className="w-full text-center py-2 text-xs font-semibold text-slate-400">
                          {t("certificates.pending_upload", "Document Upload Pending")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Document & Certificate Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-navy/70 backdrop-blur-md"
            onClick={() => setPreviewItem(null)}
          />
          <div className="relative w-full max-w-5xl rounded-3xl border border-white/20 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-navy/5 bg-gradient-to-r from-navy to-[#022c1d] px-6 py-4.5 text-white shrink-0">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white font-bold text-xs uppercase">
                  {previewItem.category?.slice(0, 3) || "DOC"}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-base sm:text-lg font-extrabold text-white tracking-wide">
                    {previewItem.title}
                  </h2>
                  <p className="text-xs text-white/70 capitalize">
                    {t("certificates.category", "Category")}: <span className="font-semibold text-white/90">{previewItem.category}</span>
                    {previewItem.certificateNo && (
                      <> &bull; {t("certificates.cert_no", "Cert No")}: <span className="font-mono font-bold text-amber-300">{previewItem.certificateNo}</span></>
                    )}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="rounded-full bg-white/10 p-2 text-white/80 transition-all hover:bg-rose-500 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Modal Viewer Body */}
            <div className="overflow-y-auto p-4 sm:p-6 bg-slate-100 flex items-center justify-center min-h-[400px]">
              {previewItem.fileUrl ? (
                previewItem.fileUrl.match(/\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?$/i) ? (
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={previewItem.fileUrl}
                      alt={previewItem.title}
                      className="max-h-[70vh] w-auto max-w-full rounded-2xl shadow-xl border border-slate-200 object-contain bg-white"
                    />
                  </div>
                ) : (
                  <iframe
                    src={previewItem.fileUrl}
                    title={previewItem.title}
                    className="w-full h-[70vh] rounded-2xl border border-slate-300 shadow-inner bg-white"
                  />
                )
              ) : (
                <div className="text-center py-16 text-slate-500">
                  <FileText className="size-14 mx-auto text-slate-400 mb-2" />
                  <p className="text-base font-bold text-navy">
                    {t("certificates.no_file", "No preview available for this document.")}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 shrink-0">
              <span className="text-xs text-slate-500 font-medium truncate max-w-md">
                {previewItem.description || "Official Rabbi Association Document"}
              </span>

              <div className="flex items-center gap-2.5">
                {previewItem.fileUrl && (
                  <>
                    <a
                      href={previewItem.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-100 transition-colors"
                    >
                      <ExternalLink className="size-3.5" />
                      {t("certificates.open_new_tab", "Open in New Tab")}
                    </a>
                    <a
                      href={previewItem.fileUrl}
                      download={previewItem.title}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs font-bold text-accent-foreground shadow-xs hover:bg-accent/90 transition-colors"
                    >
                      <Download className="size-3.5" />
                      {t("certificates.download_pdf", "Download PDF")}
                    </a>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setPreviewItem(null)}
                  className="rounded-xl px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-200 hover:text-navy transition-colors"
                >
                  {t("common.close", "Close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
