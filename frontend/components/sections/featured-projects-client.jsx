"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ProjectCard } from "@/components/shared/project-card";
import { useLanguage } from "@/context/LanguageContext";

export function FeaturedProjectsClient({ projects = [] }) {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  if (projects.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20" dir={isRTL ? "rtl" : "ltr"}>
        <div className="flex flex-col items-center justify-center text-center gap-6">
          <SectionHeading
            align="center"
            eyebrow={t("featured_projects.eyebrow", "Our Work")}
            title={t("featured_projects.title", "Featured projects")}
            description={t("featured_projects.description", "Ongoing initiatives creating real change in the lives of thousands across India.")}
            className="mx-auto"
          />
        </div>
        <div className="mt-12 rounded-2xl border border-dashed border-border/80 bg-card p-12 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-navy">
            {t("featured_projects.empty", "No featured projects published yet.")}
          </h3>
          <div className="mt-2 text-muted-foreground text-center">
            {t("featured_projects.empty_desc", "We will highlight our ongoing initiatives here soon.")}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-20" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex flex-col items-center justify-center text-center gap-6">
        <SectionHeading
          align="center"
          eyebrow={t("featured_projects.eyebrow", "Our Work")}
          title={t("featured_projects.title", "Featured projects")}
          description={t("featured_projects.description", "Ongoing initiatives creating real change in the lives of thousands across India.")}
          className="mx-auto"
        />
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p._id} delay={i * 0.1}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Button asChild variant="outline" className="shrink-0 border-navy/20 font-bold">
          <Link href="/projects" className="inline-flex items-center gap-2">
            <span>{t("featured_projects.view_all", "View All Projects")}</span>
            <ArrowIcon className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

