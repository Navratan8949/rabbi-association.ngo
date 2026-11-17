"use client"

import { Quote, Sparkles, ShieldCheck, Mail, Phone, Globe } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { getLocalizedField } from "@/lib/localized-field"
import { Reveal } from "@/components/shared/reveal"

export function TrusteesClient({ inspirationalPersons = [], trustees = [] }) {
  const { language, isRTL, t } = useLanguage()
  const orgName = t("org.name", "World Association for Al-Azhar Graduates – India")

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="space-y-16 md:space-y-24 py-12 md:py-16">
      
      {/* 1. Inspirational Figures / Guiding Light Section */}
      {inspirationalPersons.length > 0 && (
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 mb-4 border border-amber-200">
                <Sparkles className="size-3.5 text-amber-600" /> {t("founder.inspiration_badge", "Inspiration & Guiding Light")}
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight">
                {t("founder.inspiration_title", "Honoring Our Guiding Inspirations")}
              </h2>
              <p className="mt-4 text-base md:text-lg text-slate-600 font-medium">
                {t("founder.inspiration_desc", "Our mission is built upon the timeless principles, sacrifice, and dedication of the visionaries whose values inspire our daily service.")}
              </p>
            </div>

            <div className="space-y-16 md:space-y-24">
              {inspirationalPersons.map((person, idx) => {
                const name = getLocalizedField(person, "name", language) || person.name
                const designation = getLocalizedField(person, "designation", language) || person.designation || "Inspiration & Guiding Light"
                const description = getLocalizedField(person, "description", language) || person.description
                const photoUrl = person.photo?.url || "/placeholder-user.svg"

                return (
                  <div 
                    key={person._id || idx}
                    className="relative overflow-hidden rounded-[2.5rem] bg-white p-8 md:p-12 lg:p-16 border border-slate-200/80 shadow-sm"
                  >
                    {/* Decorative blurred background aura */}
                    <div className="absolute -left-32 -top-32 size-[450px] rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-32 -right-32 size-[450px] rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

                    <div className="grid items-center gap-12 lg:grid-cols-2 relative z-10">
                      
                      {/* Image Side with Offset Frame */}
                      <Reveal className="relative mx-auto w-full max-w-sm lg:max-w-md">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-border bg-slate-100">
                          <img
                            src={photoUrl}
                            alt={name}
                            className="size-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-60" />
                        </div>
                        {/* Offset Accent Border Frame */}
                        <div 
                          className={`absolute -bottom-6 -z-10 h-full w-full rounded-3xl border-4 border-amber-500 hidden sm:block ${
                            isRTL ? "-left-6" : "-right-6"
                          }`} 
                        />
                      </Reveal>

                      {/* Text Side */}
                      <div className={`relative ${isRTL ? "text-right" : "text-left"}`}>
                        <Reveal>
                          <div className={`flex flex-col mb-6 ${isRTL ? "items-end" : "items-start"}`}>
                            <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20">
                              <Quote className="size-6 fill-current" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-2">
                              {t("founder.inspiration_badge", "Inspiration & Guiding Light")}
                            </span>
                            <h3 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl lg:text-5xl">
                              {designation}
                            </h3>
                          </div>
                        </Reveal>

                        <Reveal delay={0.1}>
                          <div className="prose prose-lg prose-p:leading-relaxed prose-p:text-slate-600 max-w-none">
                            <p className="whitespace-pre-wrap font-medium text-base sm:text-lg">
                              {description}
                            </p>
                          </div>
                        </Reveal>

                        <Reveal delay={0.2}>
                          <div className="mt-8 border-t border-slate-200/80 pt-6">
                            <p className="font-bold text-navy text-xl sm:text-2xl">{name}</p>
                            <p className="text-sm font-semibold text-amber-700 mt-0.5">
                              {designation} | {orgName}
                            </p>
                          </div>
                        </Reveal>
                      </div>

                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* 2. Board of Trustees Section */}
      {trustees.length > 0 && (
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-800 mb-4 border border-blue-200">
                <ShieldCheck className="size-3.5 text-blue-600" /> {t("founder.governance_badge", "Governance & Leadership")}
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight">
                {t("founder.trustees_title", "Board of Trustees")}
              </h2>
              <p className="mt-4 text-base md:text-lg text-slate-600 font-medium">
                {t("founder.trustees_desc", "The distinguished individuals providing governance, leadership, and ethical stewardship to the Rabbi Association.")}
              </p>
            </div>

            <div className="space-y-16 md:space-y-24">
              {trustees.map((trustee, idx) => {
                const name = getLocalizedField(trustee, "name", language) || trustee.name
                const designation = getLocalizedField(trustee, "designation", language) || trustee.designation || "Trustee"
                const description = getLocalizedField(trustee, "description", language) || trustee.description
                const photoUrl = trustee.photo?.url || "/placeholder-user.svg"

                return (
                  <div
                    key={trustee._id || idx}
                    className="relative overflow-hidden rounded-[2.5rem] bg-white p-8 md:p-12 lg:p-16 border border-slate-200/80 shadow-sm"
                  >
                    {/* Decorative blurred background aura */}
                    <div className="absolute -left-32 -top-32 size-[450px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-32 -right-32 size-[450px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

                    <div className="grid items-center gap-12 lg:grid-cols-2 relative z-10">
                      
                      {/* Image Side with Offset Accent Frame */}
                      <Reveal className="relative mx-auto w-full max-w-sm lg:max-w-md">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-border bg-slate-100">
                          <img
                            src={photoUrl}
                            alt={name}
                            className="size-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-60" />
                        </div>
                        {/* Offset Accent Border Frame (Matches Screenshot Style) */}
                        <div 
                          className={`absolute -bottom-6 -z-10 h-full w-full rounded-3xl border-4 border-accent hidden sm:block ${
                            isRTL ? "-left-6" : "-right-6"
                          }`} 
                        />
                      </Reveal>

                      {/* Text Side */}
                      <div className={`relative ${isRTL ? "text-right" : "text-left"}`}>
                        <Reveal>
                          <div className={`flex flex-col mb-6 ${isRTL ? "items-end" : "items-start"}`}>
                            <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/20">
                              <Quote className="size-6 fill-current" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
                              {t("founder.trustees_title", "Board of Trustees")}
                            </span>
                            <h3 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl lg:text-5xl">
                              {designation}
                            </h3>
                          </div>
                        </Reveal>

                        <Reveal delay={0.1}>
                          <div className="prose prose-lg prose-p:leading-relaxed prose-p:text-slate-600 max-w-none">
                            <p className="whitespace-pre-wrap font-medium text-base sm:text-lg">
                              {description}
                            </p>
                          </div>
                        </Reveal>

                        <Reveal delay={0.2}>
                          <div className="mt-8 border-t border-slate-200/80 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                              <p className="font-bold text-navy text-xl sm:text-2xl">{name}</p>
                              <p className="text-sm font-semibold text-accent mt-0.5">
                                {designation} | {orgName}
                              </p>
                            </div>

                            {/* Contact links if provided */}
                            {(trustee.email || trustee.phone || trustee.website) && (
                              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
                                {trustee.email && (
                                  <a
                                    href={`mailto:${trustee.email}`}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                                    title={trustee.email}
                                  >
                                    <Mail className="size-3.5" />
                                    <span className="truncate max-w-[150px]">{trustee.email}</span>
                                  </a>
                                )}
                                {trustee.phone && (
                                  <a
                                    href={`tel:${trustee.phone}`}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                                  >
                                    <Phone className="size-3.5" />
                                    <span>{trustee.phone}</span>
                                  </a>
                                )}
                                {trustee.website && (
                                  <a
                                    href={trustee.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                                  >
                                    <Globe className="size-3.5" />
                                    <span>Website</span>
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </Reveal>
                      </div>

                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

    </div>
  )
}
