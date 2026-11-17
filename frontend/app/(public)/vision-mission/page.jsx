"use client";

import { PageHero } from "@/components/pages/page-hero";
import { 
  Target, 
  Eye, 
  Sparkles, 
  BookOpen, 
  Scale, 
  HeartHandshake, 
  Compass, 
  GraduationCap, 
  Users, 
  CheckCircle2, 
  ShieldCheck,
  Award,
  ArrowRight
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useSelector } from "react-redux";
import { Reveal } from "@/components/shared/reveal";
import Link from "next/link";

// Helper to safely render dynamic HTML or plain text without raw JSON
function SafeHtmlRenderer({ content, fallback, className = "" }) {
  if (!content) {
    return <p className={className}>{fallback}</p>;
  }

  // If content is somehow still an object or JSON string, don't dump JSON
  if (typeof content === "object") {
    return <p className={className}>{fallback}</p>;
  }

  const trimmed = String(content).trim();
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    try {
      const parsed = JSON.parse(trimmed);
      return <p className={className}>{fallback}</p>;
    } catch (e) {
      // Not JSON
    }
  }

  const hasHtml = /<[a-z][\s\S]*>/i.test(trimmed);
  if (hasHtml) {
    return (
      <div 
        className={`prose prose-slate max-w-none prose-p:leading-relaxed ${className}`}
        dangerouslySetInnerHTML={{ __html: trimmed }} 
      />
    );
  }

  return <p className={className}>{trimmed}</p>;
}

export default function VisionMissionPage() {
  const { t, isRTL } = useLanguage();
  const { data: siteContent } = useSelector((state) => state.siteContent);

  // Safely parse dynamic site-content if set from Admin CMS
  let dynamicVision = null;
  let dynamicMission = null;
  let dynamicObjectives = null;

  if (siteContent?.vision_mission?.content) {
    const raw = siteContent.vision_mission.content;
    if (typeof raw === "object" && raw !== null) {
      dynamicVision = raw.vision;
      dynamicMission = raw.mission;
      dynamicObjectives = raw.objectives;
    } else if (typeof raw === "string") {
      const trimmed = raw.trim();
      if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
        try {
          const parsed = JSON.parse(trimmed);
          if (parsed && typeof parsed === "object") {
            dynamicVision = parsed.vision;
            dynamicMission = parsed.mission;
            dynamicObjectives = parsed.objectives;
          }
        } catch (e) {
          // If plain string
          dynamicVision = trimmed;
        }
      } else {
        dynamicVision = trimmed;
      }
    }
  }

  const pageTitle = t("vision_mission.page_title", "Vision & Mission");
  const tagline = t("vision_mission.subtitle", "Knowledge | Moderation | Unity | Service to Humanity");
  const motto = t("org.motto", "Moderation is our methodology, unity is our strength, knowledge is our identity, and service to humanity is our mission.");

  const missionBadge = t("vision_mission.mission_badge", "OUR MISSION");
  const missionTitle = t("vision_mission.mission_title", "Dedicated to Knowledge, Moderation & Service");
  const missionFallback = t("vision_mission.mission_desc", "To unite Al-Azhar graduates across India, foster academic and intellectual collaboration, spread moderate values across all sections of Indian society, support educational and research initiatives, and serve society through knowledge, dialogue, and constructive work.");

  const visionBadge = t("vision_mission.vision_badge", "OUR VISION");
  const visionTitle = t("vision_mission.vision_title", "Building a Cohesive National Network");
  const visionFallback = t("vision_mission.vision_desc", "To build a cohesive national network of Al-Azhar graduates across India that contributes to disseminating knowledge, promoting peace, mutual understanding, and human development.");

  const objectivesBadge = t("vision_mission.objectives_badge", "STRATEGIC GOALS");
  const objectivesTitle = t("vision_mission.objectives_title", "Our Key Objectives");
  const objectivesSubtitle = t("vision_mission.objectives_subtitle", "Working systematically to advance scholarly excellence, youth leadership, and societal harmony.");
  const objectivesItems = t("vision_mission.objectives_items", []);

  const identityBadge = t("vision_mission.identity_badge", "OUR IDENTITY");
  const identityTitle = t("vision_mission.identity_title", "Grounded in the Noble Al-Azhar Heritage");
  const identityDesc = t("vision_mission.identity_desc", "For more than a thousand years, Al-Azhar Al-Sharif has been the world's preeminent beacon of balanced Islamic learning, scholarly moderation, and service to humanity. Rabbi Association (India Branch) proudly reflects this living legacy.");
  const identityItems = t("vision_mission.identity_items", [
    {
      title: "Scholarly Excellence & Heritage",
      desc: "Rooted in over a millennium of authentic Islamic scholarship, intellectual integrity, and reverence for classic learning."
    },
    {
      title: "The Path of Moderation (Wasatiyyah)",
      desc: "Upholding balance, constructive dialogue, and mutual respect while firmly rejecting all forms of extremism and sectarianism."
    },
    {
      title: "Universal Service to Humanity",
      desc: "Translating sacred knowledge into compassionate action, social upliftment, and human dignity for all sections of society."
    }
  ]);

  const philosophyBadge = t("vision_mission.philosophy_badge", "CORE PHILOSOPHY");
  const philosophyTitle = t("vision_mission.philosophy_title", "Education with Purpose");
  const philosophyDesc = t("vision_mission.philosophy_desc", "Excellence with values. We believe education must empower minds, build righteous character, and inspire people to serve humanity:");
  const philosophySteps = t("vision_mission.philosophy_steps", [
    { num: "1", title: "LEARN", subtitle: "Acquiring Knowledge", desc: "Acquire authentic knowledge, deep scholarly understanding, and intellectual depth." },
    { num: "2", title: "GROW", subtitle: "Character & Competence", desc: "Develop strong moral character, spiritual consciousness, and professional competence." },
    { num: "3", title: "LEAD", subtitle: "Responsible Leadership", desc: "Accept societal responsibility with humility and lead through wisdom and integrity." },
    { num: "4", title: "SERVE", subtitle: "Serving Humanity", desc: "Dedicate skills and resources for the upliftment, welfare, and dignity of humanity." },
    { num: "5", title: "TRANSFORM", subtitle: "Positive Change", desc: "Become active agents of positive change, peaceful coexistence, and lasting progress." }
  ]);

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        title={pageTitle}
        description={tagline}
        breadcrumbItems={[
          { label: t("nav.home", "Home"), href: "/" },
          { label: t("nav.about", "About Us"), href: "/about" },
          { label: pageTitle, href: "/vision-mission" },
        ]}
      />

      {/* Primary Mission & Vision Cards Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            
            {/* Vision Card */}
            <Reveal>
              <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-200/80 flex flex-col items-center text-center h-full hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-accent via-amber-500 to-accent" />
                
                <div className="flex size-16 md:size-20 items-center justify-center rounded-2xl bg-accent/10 mb-6 text-accent group-hover:scale-110 transition-transform">
                  <Eye className="size-8 md:size-10" />
                </div>
                
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent mb-3 border border-accent/20">
                  {visionBadge}
                </span>

                <h2 className="text-2xl md:text-3xl font-extrabold text-navy mb-4 tracking-tight">
                  {visionTitle}
                </h2>

                <div className="text-slate-600 leading-relaxed text-base md:text-lg font-medium mb-8 flex-1">
                  <SafeHtmlRenderer content={dynamicVision} fallback={visionFallback} />
                </div>

                <div className="pt-6 border-t border-slate-100 w-full mt-auto">
                  <p className="text-sm md:text-base font-bold text-accent italic">
                    "{tagline}"
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Mission Card */}
            <Reveal delay={0.15}>
              <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-200/80 flex flex-col items-center text-center h-full hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary via-emerald-600 to-primary" />
                
                <div className="flex size-16 md:size-20 items-center justify-center rounded-2xl bg-primary/10 mb-6 text-primary group-hover:scale-110 transition-transform">
                  <Target className="size-8 md:size-10" />
                </div>
                
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-3 border border-primary/20">
                  {missionBadge}
                </span>

                <h2 className="text-2xl md:text-3xl font-extrabold text-navy mb-4 tracking-tight">
                  {missionTitle}
                </h2>

                <div className="text-slate-600 leading-relaxed text-base md:text-lg font-medium mb-8 flex-1">
                  <SafeHtmlRenderer content={dynamicMission} fallback={missionFallback} />
                </div>

                <div className="pt-6 border-t border-slate-100 w-full mt-auto">
                  <p className="text-sm md:text-base font-bold text-navy italic">
                    "{motto}"
                  </p>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* Identity & Core Philosophy Section */}
      <section className="py-20 md:py-28 bg-white border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left: Identity & Heritage */}
            <Reveal>
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4 border border-accent/20">
                  <Compass className="size-3.5" />
                  {identityBadge}
                </span>
                
                <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight mb-6">
                  {identityTitle}
                </h2>
                
                <p className="text-slate-600 font-medium text-base md:text-lg leading-relaxed mb-8">
                  {identityDesc}
                </p>

                <div className="space-y-6">
                  {Array.isArray(identityItems) && identityItems.map((item, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-accent/40 hover:bg-slate-50/80 transition-colors"
                    >
                      <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent shrink-0 mt-0.5">
                        {idx === 0 && <BookOpen className="size-5" />}
                        {idx === 1 && <Scale className="size-5" />}
                        {idx === 2 && <HeartHandshake className="size-5" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-navy text-lg mb-1">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Right: Core Philosophy (5 Progressive Steps) */}
            <Reveal delay={0.2}>
              <div className="bg-slate-50/80 p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-4 border border-primary/20">
                  <Sparkles className="size-3.5" />
                  {philosophyBadge}
                </span>

                <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight mb-4">
                  {philosophyTitle}
                </h2>

                <p className="text-slate-600 font-medium text-base md:text-lg leading-relaxed mb-8">
                  {philosophyDesc}
                </p>

                <div className="grid gap-3.5">
                  {Array.isArray(philosophySteps) && philosophySteps.map((step, idx) => (
                    <div 
                      key={idx} 
                      className="flex gap-4 p-4 md:p-5 rounded-2xl bg-white border border-slate-200/70 items-center shadow-xs hover:border-primary/40 hover:shadow-sm transition-all"
                    >
                      <div className="size-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 text-navy flex items-center justify-center shrink-0 font-black text-lg border border-accent/30">
                        {step.num || idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <h3 className="font-bold text-navy text-base md:text-lg">
                            {step.title}
                          </h3>
                          {step.subtitle && (
                            <span className="text-xs font-semibold text-slate-400">
                              • {step.subtitle}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* Strategic Objectives Section */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent mb-4 border border-accent/20">
              <ShieldCheck className="size-3.5" />
              {objectivesBadge}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight mb-4">
              {objectivesTitle}
            </h2>
            <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed">
              {objectivesSubtitle}
            </p>
          </div>

          {/* If dynamic objectives are provided via CMS, display them safely */}
          {dynamicObjectives ? (
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm max-w-4xl mx-auto">
              <SafeHtmlRenderer 
                content={dynamicObjectives} 
                fallback="" 
                className="text-slate-700 text-base md:text-lg leading-relaxed space-y-4"
              />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(objectivesItems) && objectivesItems.map((obj, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="bg-white p-6 md:p-7 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-accent/40 transition-all flex items-start gap-4 h-full">
                    <div className="size-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">
                      {i + 1}
                    </div>
                    <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">
                      {obj}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {/* Bottom CTA to learn more or join */}
          <div className="mt-16 text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-navy text-white font-semibold text-sm hover:bg-navy/90 shadow-md hover:shadow-lg transition-all"
            >
              {t("nav.about", "Learn More About Our Journey")}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Motto & Distinctive Character Banner */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="mx-auto max-w-5xl px-4 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent mb-6 border border-accent/20">
            <Sparkles className="size-3.5" />
            {t("home.motto_title", "OUR MOTTO")}
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-navy tracking-tight mb-8">
            "{motto}"
          </h2>
          <div className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-200 text-base md:text-lg text-slate-700 leading-relaxed font-medium">
            <h3 className="text-xl font-bold text-navy mb-4">
              {t("about.distinctive_title", "Our Distinctive Character")}
            </h3>
            <p>{t("about.distinctive_text")}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
