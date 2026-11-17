"use client";

import { PageHero } from "@/components/pages/page-hero";
import { BookOpen, Languages, Scroll, GraduationCap, Users, Heart, Award, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { useLanguage } from "@/context/LanguageContext";
import { CtaBand } from "@/components/sections/cta-band";
import { ImpactStats } from "@/components/sections/impact-stats";

export default function ServicesPage() {
  const { t, isRTL } = useLanguage();

  const outreachItems = t("activities.outreach_items", [
    "Academic Seminars",
    "Intellectual Forums",
    "National Conferences",
    "Training Workshops",
    "Youth Empowerment Programs",
    "Online Interactive Lectures",
    "Interfaith Harmony Dialogues",
    "Cultural & Literary Programs",
    "Educational & Awareness Campaigns",
    "Community Service Initiatives",
  ]);

  const programs = [
    {
      id: "01",
      title: t("activities.academic_title", "Academic & Educational Programs"),
      desc: t("activities.academic_text", "Organizing academic and educational programs to spread knowledge, encourage scholarly research, and promote continuous learning."),
      icon: BookOpen,
      color: "from-blue-600 to-indigo-700",
    },
    {
      id: "02",
      title: t("activities.arabic_title", "Arabic Language Programs"),
      desc: t("activities.arabic_text", "Conducting specialized courses and workshops in Arabic language both offline and online."),
      icon: Languages,
      color: "from-emerald-600 to-teal-700",
    },
    {
      id: "03",
      title: t("activities.hadith_title", "Hadith & Tafsir Programs"),
      desc: t("activities.hadith_text", "Holding specialized academic programs in Hadith studies, Quranic interpretation, and Islamic sciences."),
      icon: Scroll,
      color: "from-amber-600 to-orange-700",
    },
    {
      id: "04",
      title: t("activities.lectures_title", "Lectures from Al-Azhar"),
      desc: t("activities.lectures_text", "Organizing academic webinars and interactive sessions featuring distinguished professors from Al-Azhar University, Cairo."),
      icon: GraduationCap,
      color: "from-purple-600 to-pink-700",
    },
    {
      id: "05",
      title: t("activities.outreach_title", "Intellectual & Outreach Programs"),
      desc: t("activities.academic_text", "Comprehensive scholarly symposiums, youth guidance, and dialogue initiatives:"),
      items: Array.isArray(outreachItems) ? outreachItems : [],
      icon: Users,
      color: "from-navy to-slate-800",
    },
    {
      id: "06",
      title: t("activities.humanitarian_title", "Humanitarian & Community Initiatives"),
      desc: t("activities.humanitarian_text", "Dedicated to community service, supporting underserved families, healthcare drives, and humanitarian relief."),
      icon: Heart,
      color: "from-rose-600 to-red-700",
    },
    {
      id: "07",
      title: t("activities.empowerment_title", "Scholar Empowerment"),
      desc: t("activities.empowerment_text", "Empowering Indian scholars through international academic exposure, teacher training, and scholarly publication opportunities."),
      icon: Award,
      color: "from-amber-500 to-yellow-600",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        eyebrow={t("nav.our_work", "Our Work")}
        title={t("activities.title", "Activities & Programs")}
        description={t("activities.academic_text", "Comprehensive academic, educational, and community initiatives.")}
        image="/rabbi-context/focus_3.jpg"
      />

      <div className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-bold uppercase tracking-widest text-accent mb-3 block">
              {t("org.tagline", "Knowledge | Moderation | Unity | Service to Humanity")}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight">
              {t("activities.title", "Our Activities & Programs")}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-7" />
                    </div>
                    <span className="text-2xl font-black text-slate-200 group-hover:text-accent/30 transition-colors">
                      {p.id}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy mb-4 group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-slate-600 text-base leading-relaxed flex-1 font-medium">
                    {p.desc}
                  </p>

                  {p.items && p.items.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-slate-100 space-y-2">
                      {p.items.slice(0, 5).map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <CheckCircle2 className="size-3.5 text-accent shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ImpactStats />
      <CtaBand />
    </main>
  );
}
