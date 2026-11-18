"use client"
import { useState, useEffect } from "react"
import { Award, Medal, Trophy, Eye, X, ExternalLink } from "lucide-react"
import Image from "next/image"
import { PageHero } from "@/components/pages/page-hero"
import { Reveal } from "@/components/shared/reveal"
import { getAwards } from "@/service/award.service"

export default function Page() {
  const [awards, setAwards] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedAward, setSelectedAward] = useState(null)

  useEffect(() => {
    getAwards()
      .then(data => {
        if (data.success) {
          setAwards(data.awards || data.data || [])
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="bg-background">
      <PageHero 
        eyebrow="Awards" 
        title="Awards & Certificates" 
        description="Recognition for our relentless dedication to community welfare and rural empowerment." 
        image="/hero-community-education-india.png" 
      />
      
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24 min-h-[50vh]">
        {/* Optional intro text */}
        <div className="mb-16 max-w-3xl text-center md:text-left">
          <h2 className="text-3xl font-bold text-navy md:text-4xl">Our Achievements</h2>
          <p className="mt-4 text-lg text-muted-foreground">Every award we receive is a testament to the hard work of our volunteers and the unwavering support of our donors.</p>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="size-10 animate-spin rounded-full border-4 border-accent border-t-transparent"></div>
          </div>
        ) : awards.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((award, idx) => {
              const hasImage = Boolean(award.image?.url);

              return (
                <Reveal key={award._id || idx} delay={idx * 0.1}>
                  <article 
                    onClick={() => hasImage && setSelectedAward(award)}
                    className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-accent/40 ${hasImage ? "cursor-pointer" : ""}`}
                  >
                    {/* Media Header Container: Displays large, full-width image without cutting off */}
                    {hasImage ? (
                      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-slate-100 flex items-center justify-center mb-6 border border-slate-200/80 shadow-xs">
                        {/* Ambient blurred backdrop to eliminate harsh letterbox gaps */}
                        <Image
                          src={award.image.url}
                          alt=""
                          fill
                          aria-hidden="true"
                          className="object-cover blur-lg scale-110 opacity-30 select-none pointer-events-none"
                        />
                        {/* Crisp complete foreground image fitted 100% */}
                        <Image
                          src={award.image.url}
                          alt={award.title}
                          fill
                          className="object-contain p-2.5 transition-transform duration-500 group-hover:scale-105 relative z-[1]"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-[2]">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-navy shadow-md">
                            <Eye className="size-3.5 text-accent" /> Click to View Full Size
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-accent/15 text-accent shadow-xs">
                        {idx % 2 === 0 ? <Award className="size-7" /> : <Trophy className="size-7" />}
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {award.year && (
                          <span className="inline-flex rounded-full bg-accent/15 px-3 py-0.5 text-xs font-extrabold text-navy">
                            {award.year}
                          </span>
                        )}
                        {award.awardedBy && (
                          <span className="text-xs font-bold text-slate-500">
                            By {award.awardedBy}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg md:text-xl font-bold text-navy leading-snug group-hover:text-accent transition-colors">
                        {award.title}
                      </h3>

                      {award.description && (
                        <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">
                          {award.description}
                        </p>
                      )}

                      {hasImage && (
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-accent">
                          <span className="inline-flex items-center gap-1">
                            <Eye className="size-3.5" /> View Certificate
                          </span>
                          <span>&rarr;</span>
                        </div>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border/70 bg-white py-24 text-center">
            <Award className="mx-auto size-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-bold text-navy">No awards found</h3>
            <p className="mt-1 text-sm text-muted-foreground">Awards will appear here once added.</p>
          </div>
        )}

        {/* Lightbox / Fullscreen Preview Modal */}
        {selectedAward && selectedAward.image?.url && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
            onClick={() => setSelectedAward(null)}
          >
            <div 
              className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl bg-white shadow-2xl overflow-hidden flex flex-col ring-1 ring-black/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 bg-navy px-6 py-4 text-white">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <span className="inline-flex items-center rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent uppercase tracking-wider">
                    {selectedAward.year || "Award"}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold truncate text-white">
                    {selectedAward.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAward(null)}
                  className="size-9 rounded-full bg-white/10 hover:bg-rose-500 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 ml-4"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Image Body */}
              <div className="relative flex-1 bg-slate-950 flex items-center justify-center min-h-[300px] max-h-[65vh] p-4 overflow-hidden">
                <img 
                  src={selectedAward.image.url} 
                  alt={selectedAward.title} 
                  className="max-h-[62vh] max-w-full object-contain rounded-xl shadow-lg"
                />
              </div>

              {/* Footer */}
              <div className="p-5 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="max-w-xl">
                  {selectedAward.awardedBy && (
                    <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">
                      Conferred By: {selectedAward.awardedBy}
                    </p>
                  )}
                  <h4 className="text-base font-bold text-navy">
                    {selectedAward.title}
                  </h4>
                  {selectedAward.description && (
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {selectedAward.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={selectedAward.image.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 px-4 py-2 text-xs font-bold text-navy transition-all"
                  >
                    <ExternalLink className="size-3.5" /> Open Full Image
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedAward(null)}
                    className="rounded-xl bg-navy px-5 py-2 text-xs font-bold text-white hover:bg-navy/90 transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
