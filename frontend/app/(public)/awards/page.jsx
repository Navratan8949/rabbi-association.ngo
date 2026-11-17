"use client"

import { useState, useEffect } from "react"
import { 
  Award, 
  Trophy, 
  Medal, 
  Star, 
  Building2, 
  Calendar, 
  Eye, 
  ExternalLink, 
  Download, 
  X, 
  Sparkles,
  Loader2
} from "lucide-react"
import Image from "next/image"
import { PageHero } from "@/components/pages/page-hero"
import { Reveal } from "@/components/shared/reveal"
import { getAwards } from "@/service/award.service"
import { useLanguage } from "@/context/LanguageContext"
import { getLocalizedField } from "@/lib/localized-field"

export default function Page() {
  const { language, isRTL, t } = useLanguage()
  const [awards, setAwards] = useState([])
  const [loading, setLoading] = useState(true)
  const [previewAward, setPreviewAward] = useState(null)

  useEffect(() => {
    getAwards()
      .then((data) => {
        if (data.success) {
          setAwards(data.awards || data.data || [])
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="bg-slate-50/50 min-h-screen" dir={isRTL ? "rtl" : "ltr"}>
      <PageHero
        eyebrow={t("nav.awards", "Awards & Recognition")}
        title={t("awards.hero_title", "Awards & Honours")}
        description={t(
          "awards.hero_desc",
          "Recognition and accolades received for our persistent service to education, community empowerment, and social development."
        )}
        image="/hero-community-education-india.png"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24 min-h-[50vh]">
        {/* Intro text */}
        <div className={`mb-14 max-w-3xl ${isRTL ? "text-right" : "text-left"}`}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 mb-3 border border-amber-200">
            <Sparkles className="size-3.5 text-amber-600" />
            {t("awards.badge", "Honours & Accolades")}
          </span>
          <h2 className="text-3xl font-extrabold text-navy md:text-5xl tracking-tight">
            {t("awards.section_title", "Our Achievements")}
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-600 font-medium">
            {t(
              "awards.section_desc",
              "Every award we receive is a testament to the hard work of our scholars, volunteers, and the unwavering support of our well-wishers."
            )}
          </p>
        </div>

        {loading ? (
          <div className="flex h-64 flex-col items-center justify-center text-slate-400">
            <Loader2 className="size-10 animate-spin text-accent" />
            <p className="mt-4 text-sm font-bold text-navy">{t("common.loading", "Loading awards...")}</p>
          </div>
        ) : awards.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((award, idx) => {
              const title = getLocalizedField(award, "title", language) || award.title
              const description = getLocalizedField(award, "description", language) || award.description
              const awardedBy = getLocalizedField(award, "awardedBy", language) || award.awardedBy

              return (
                <Reveal key={award._id || idx} delay={idx * 0.08}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-xl">
                    {/* Top Image Container - Edge-to-Edge full image display */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                      {award.image?.url ? (
                        <>
                          <Image
                            src={award.image.url}
                            alt={title || "Award Certificate"}
                            fill
                            priority={idx < 3}
                            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          {/* Hover Overlay with Preview Button */}
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 z-10 pointer-events-none">
                            <button
                              type="button"
                              onClick={() => setPreviewAward({ ...award, title, description, awardedBy })}
                              className="pointer-events-auto inline-flex items-center gap-1.5 rounded-xl bg-white/95 px-3 py-1.5 text-xs font-bold text-navy shadow-sm backdrop-blur-xs hover:bg-white transition-all cursor-pointer"
                            >
                              <Eye className="size-3.5 text-accent" />
                              <span>{t("awards.view_cert", "View Full Image")}</span>
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="size-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100/50 text-amber-600 p-6 text-center">
                          <Trophy className="size-16 text-amber-500 mb-2 drop-shadow-xs" />
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                            {t("awards.honored", "Honored Recognition")}
                          </span>
                        </div>
                      )}

                      {/* Year Badge */}
                      {award.year && (
                        <span
                          className={`absolute top-3 ${
                            isRTL ? "right-3" : "left-3"
                          } rounded-full bg-accent px-3 py-1 text-xs font-extrabold text-accent-foreground shadow-md`}
                        >
                          {award.year}
                        </span>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      {awardedBy && (
                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                          <Building2 className="size-3.5 text-accent shrink-0" />
                          <span className="truncate">{awardedBy}</span>
                        </p>
                      )}

                      <h3 className="text-xl font-bold text-navy leading-snug group-hover:text-accent transition-colors">
                        {title}
                      </h3>

                      {description && (
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 font-medium line-clamp-3">
                          {description}
                        </p>
                      )}

                      {/* Bottom Action Footer */}
                      {award.image?.url && (
                        <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => setPreviewAward({ ...award, title, description, awardedBy })}
                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-navy hover:text-accent transition-colors cursor-pointer"
                          >
                            <Eye className="size-3.5 text-accent" />
                            <span>{t("awards.view_details", "Preview Certificate")}</span>
                          </button>

                          <a
                            href={award.image.url}
                            download={title || "Award"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-accent transition-colors p-1"
                            title={t("common.download", "Download")}
                          >
                            <Download className="size-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white py-24 text-center">
            <Trophy className="mx-auto size-14 text-slate-300" />
            <h3 className="mt-4 text-xl font-bold text-navy">{t("awards.no_awards", "No awards found")}</h3>
            <p className="mt-1 text-sm text-slate-500">{t("awards.no_awards_desc", "Awards and certificates will appear here once published.")}</p>
          </div>
        )}
      </section>

      {/* Award & Certificate Full Preview Modal */}
      {previewAward && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-navy/70 backdrop-blur-md"
            onClick={() => setPreviewAward(null)}
          />
          <div className="relative w-full max-w-4xl rounded-3xl border border-white/20 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-navy/5 bg-gradient-to-r from-navy to-[#022c1d] px-6 py-4.5 text-white shrink-0">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/20 text-amber-300">
                  <Trophy className="size-5" />
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-base sm:text-lg font-extrabold text-white tracking-wide">
                    {previewAward.title}
                  </h2>
                  <p className="text-xs text-white/70">
                    {previewAward.year && <span>{previewAward.year} &bull; </span>}
                    {previewAward.awardedBy || "Rabbi Association Recognition"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPreviewAward(null)}
                className="rounded-full bg-white/10 p-2 text-white/80 transition-all hover:bg-rose-500 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto p-4 sm:p-6 bg-slate-100 flex items-center justify-center min-h-[380px]">
              {previewAward.image?.url ? (
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={previewAward.image.url}
                    alt={previewAward.title}
                    className="max-h-[68vh] w-auto max-w-full rounded-2xl shadow-xl border border-slate-200 object-contain bg-white"
                  />
                </div>
              ) : (
                <div className="text-center py-16 text-slate-500">
                  <Trophy className="size-16 mx-auto text-slate-300 mb-2" />
                  <p className="text-base font-bold text-navy">No image file attached</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 shrink-0">
              <p className="text-xs text-slate-600 font-medium truncate max-w-md">
                {previewAward.description || previewAward.title}
              </p>

              <div className="flex items-center gap-2.5">
                {previewAward.image?.url && (
                  <>
                    <a
                      href={previewAward.image.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-100 transition-colors"
                    >
                      <ExternalLink className="size-3.5" /> Open in New Tab
                    </a>
                    <a
                      href={previewAward.image.url}
                      download={previewAward.title || "award"}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs font-bold text-accent-foreground shadow-xs hover:bg-accent/90 transition-colors"
                    >
                      <Download className="size-3.5" /> Download
                    </a>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setPreviewAward(null)}
                  className="rounded-xl px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-200 hover:text-navy transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
