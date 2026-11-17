"use client";

import { PageHero } from "@/components/pages/page-hero";
import { ImpactStats } from "@/components/sections/impact-stats";
import { FocusAreas } from "@/components/sections/focus-areas";
import { CtaBand } from "@/components/sections/cta-band";
import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";
import { Target, BookOpen, Globe, Building2, ShieldCheck, HeartHandshake } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t, isRTL } = useLanguage();

  const title = t("about.title", "About Us");
  const orgName = t("org.name", "World Association for Al-Azhar Graduates – India");
  const image = "/rabbi-context/about_us_classroom.jpg";

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        eyebrow={t("org.tagline", "Knowledge | Moderation | Unity | Service to Humanity")}
        title={title}
        description={orgName}
        image={image}
      />

      {/* Main Al-Azhar Al-Sharif Section */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content Area */}
            <div className="order-2 lg:order-1">
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <h2 className="text-sm font-bold uppercase tracking-widest text-accent text-start">
                    {t("about.title", "ABOUT US")}
                  </h2>
                </div>

                <h3 className="text-3xl md:text-5xl font-extrabold text-navy mb-8 leading-[1.2] text-start">
                  {t("about.al_azhar_title", "About Al-Azhar Al-Sharif")}
                </h3>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="space-y-6 text-slate-700 text-base md:text-lg leading-relaxed text-start border-l-0 sm:border-l-4 sm:border-accent/20 sm:pl-6">
                  <p>{t("about.al_azhar_text")}</p>
                </div>
              </Reveal>
            </div>

            {/* Right Image Area */}
            <div className="order-1 lg:order-2">
              <Reveal delay={0.2} className="relative">
                <div className="absolute -inset-4 bg-accent/10 rounded-[2.5rem] transform rotate-3 scale-105 transition-transform duration-500 hover:rotate-6 hidden md:block" />

                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-auto lg:h-[500px] border-8 border-white group">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                </div>

                <div className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-8 bg-white p-3 md:p-5 rounded-xl md:rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100 z-20">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                  </div>
                  <div className="pr-2 md:pr-4">
                    <div className="text-sm md:text-base font-bold text-navy leading-none mb-1">
                      {t("org.tagline", "Al-Azhar")}
                    </div>
                    <div className="text-[10px] md:text-xs font-semibold text-slate-500 leading-none">
                      {t("about.title", "World Association")}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* World Association & India Branch Section */}
      <section className="py-20 md:py-28 bg-slate-50 border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            {/* World Association Card */}
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
              <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Globe className="size-7" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">
                {t("about.world_assoc_title", "About The World Association")}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6 flex-1 text-base md:text-lg">
                {t("about.world_assoc_text")}
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm font-semibold text-accent flex items-center gap-2">
                <ShieldCheck className="size-5 shrink-0" />
                <span>{t("about.world_assoc_patron")}</span>
              </div>
            </div>

            {/* India Branch Card */}
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
              <div className="size-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-6">
                <Building2 className="size-7" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">
                {t("about.india_branch_title", "India Branch")}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4 text-base md:text-lg">
                {t("about.india_branch_p1")}
              </p>
              <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                {t("about.india_branch_p2")}
              </p>
            </div>
          </div>

          {/* Distinctive Character Card */}
          <div className="mt-10 bg-navy text-white p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <div className="inline-flex size-14 rounded-2xl bg-white/10 text-accent items-center justify-center mb-6">
                <HeartHandshake className="size-7" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-accent">
                {t("about.distinctive_title", "Our Distinctive Character")}
              </h3>
              <p className="text-lg md:text-xl leading-relaxed text-white/90">
                {t("about.distinctive_text")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ImpactStats />
      <FocusAreas />
      <CtaBand />
    </main>
  );
}
