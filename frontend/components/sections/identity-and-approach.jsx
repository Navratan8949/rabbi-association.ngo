"use client";

import { 
  HeartHandshake, 
  BookOpen, 
  Scale, 
  Sparkles, 
  GraduationCap, 
  Users, 
  ShieldCheck, 
  Compass, 
  Globe 
} from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { useLanguage } from "@/context/LanguageContext";

export function IdentityAndApproach() {
  const { t } = useLanguage();

  const approaches = [
    { title: t("vision_mission.approaches.item1", "Scholarly Excellence & Authentic Knowledge"), icon: GraduationCap },
    { title: t("vision_mission.approaches.item2", "Moral Character & Ethical Integrity"), icon: ShieldCheck },
    { title: t("vision_mission.approaches.item3", "Upholding Human Dignity & Equality"), icon: Users },
    { title: t("vision_mission.approaches.item4", "Constructive Dialogue & Societal Harmony"), icon: Scale },
    { title: t("vision_mission.approaches.item5", "Dedicated Leadership & Social Welfare"), icon: Compass },
  ];

  const identities = [
    { title: t("vision_mission.identities.item1", "Al-Azhar Al-Sharif Scholarly Heritage"), icon: BookOpen },
    { title: t("vision_mission.identities.item2", "Manhaj al-Wasatiyyah (The Path of Moderation)"), icon: Scale },
    { title: t("vision_mission.identities.item3", "Universal Compassion & Service to Humanity"), icon: HeartHandshake },
    { title: t("vision_mission.identities.item4", "Fraternity, Respect & Peaceful Coexistence"), icon: Globe },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left Side: Our Approach */}
          <Reveal>
            <div className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-100 h-full shadow-sm">
              <div className="flex flex-col items-center text-center">
                <SectionHeading 
                  align="center"
                  title={t("vision_mission.approach_heading", "Our Approach")}
                  description={t("vision_mission.approach_desc", "The core principles guiding our educational initiatives and community development.")}
                  className="mb-8 mx-auto"
                />
              </div>
              
              <div className="space-y-4 mt-6">
                {approaches.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-xs border border-slate-100 hover:border-accent/30 transition-colors group">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 text-navy group-hover:bg-navy group-hover:text-white transition-colors shrink-0">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <span className="font-bold text-base md:text-lg text-slate-700">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right Side: Our Identity & Methodology */}
          <Reveal delay={0.2}>
            <div className="bg-navy p-8 sm:p-10 rounded-3xl h-full shadow-xl relative overflow-hidden text-white flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <h2 className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
                  {t("vision_mission.identity_badge", "WHO WE ARE")}
                </h2>
                <h3 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-tight">
                  {t("vision_mission.identity_title", "Grounded in the Noble Al-Azhar Heritage")}
                </h3>
                <p className="text-white/70 font-medium mb-8 leading-relaxed text-sm md:text-base">
                  {t("vision_mission.identity_desc", "For more than a thousand years, Al-Azhar Al-Sharif has been a global beacon of balanced scholarship and human values. Our India Branch proudly reflects this living legacy.")}
                </p>

                <div className="space-y-4">
                  {identities.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/5 p-3.5 rounded-xl border border-white/10 group hover:bg-white/10 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent group-hover:bg-accent group-hover:text-navy transition-colors">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="font-bold text-sm md:text-base leading-snug">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
          
        </div>
      </div>
    </section>
  );
}
