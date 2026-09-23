"use client";

import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { useSelector } from "react-redux";

const DEFAULT_AREAS = [
  {
    icon: "Building",
    title: "01 — NEW SCHOOL SETUP CONSULTANCY",
    desc: "From Vision to Institution. Strategic guidance for establishing new educational institutions—from initial concept to commencement.",
    image: "/rabbi-context/focus_1.jpg",
  },
  {
    icon: "ClipboardCheck",
    title: "02 — AFFILIATION & UPGRADATION SUPPORT",
    desc: "Professional consultancy, guidance, and documentation support to institutions seeking appropriate educational board affiliation.",
    image: "/rabbi-context/focus_2.jpg",
  },
  {
    icon: "Users",
    title: "03 — SCHOOL MANAGEMENT & ADMINISTRATION",
    desc: "Building Efficient Educational Systems. Help educational institutions develop effective systems for day-to-day administration and long-term growth.",
    image: "/rabbi-context/focus_3.jpg",
  },
  {
    icon: "BookOpen",
    title: "04 — ACADEMIC EXCELLENCE",
    desc: "Strengthening Teaching and Learning. Support schools in developing effective teaching-learning practices and academic systems.",
    image: "/rabbi-context/focus_4.jpg",
  },
  {
    icon: "GraduationCap",
    title: "05 — TEACHER TRAINING & CAPACITY BUILDING",
    desc: "Empowering Educators to Inspire the Next Generation. Support the professional development of educators through training, orientation, and capacity-building programmes.",
    image: "/rabbi-context/focus_5.jpg",
  },
  {
    icon: "Megaphone",
    title: "06 — SCHOOL BRANDING & MARKETING",
    desc: "Helping Institutions Communicate Their Identity. Build a clear, professional, and meaningful identity.",
    image: "/rabbi-context/focus_6.jpg",
  },
  {
    icon: "Settings",
    title: "07 — INFRASTRUCTURE & CAMPUS DEVELOPMENT",
    desc: "Creating Better Learning Environments. Planning and development guidance for safe, functional, modern, and inspiring educational spaces.",
    image: "/rabbi-context/focus_7.jpg",
  },
  {
    icon: "UserSearch",
    title: "08 — RECRUITMENT & MANPOWER SOLUTIONS",
    desc: "The Right People Build the Right Institution. We support educational institutions with manpower planning, recruitment, and staff development.",
    image: "/rabbi-context/focus_8.jpg",
  },
];

export function FocusAreas() {
  const { data: siteContent } = useSelector((state) => state.siteContent);

  let areas = DEFAULT_AREAS;
  if (siteContent?.focus_areas?.content) {
    try {
      const parsed = JSON.parse(siteContent.focus_areas.content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        areas = parsed;
      }
    } catch (e) {}
  }

  return (
    <section className="relative bg-secondary py-24 md:py-32 overflow-hidden border-t border-border">
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12">
        <Reveal>
          <SectionHeading
            eyebrow="What We Do"
            title="Our Educational Solutions"
            description="Professional guidance and support from vision to impact for educational institutions."
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((a, i) => {
            const Icon = LucideIcons[a.icon] || LucideIcons.Heart;

            return (
               <Reveal key={i} delay={(i % 3) * 0.1}>
                 <div className="group flex flex-col h-full bg-white rounded-lg shadow-sm hover:shadow-md border border-border overflow-hidden transition-all duration-300">
                   {/* Image Container */}
                   <div className="relative h-56 w-full overflow-hidden bg-muted">
                     <Image
                       src={a.image}
                       alt={a.title}
                       fill
                       priority={i < 3}
                       unoptimized={true}
                       className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     />
                   </div>
 
                   {/* Content Container */}
                   <div className="relative flex-1 p-6 pt-8 flex flex-col bg-white">
                     {/* Clean Icon Badge Overlapping Image */}
                     <div className="absolute -top-7 left-6 flex h-14 w-14 items-center justify-center rounded-md bg-primary text-white shadow-sm border-2 border-white">
                       <Icon className="h-6 w-6" />
                     </div>
 
                     <h3 className="mb-3 text-lg font-bold text-foreground tracking-wide">
                       {a.title}
                     </h3>
                     <p className="text-muted-foreground leading-relaxed flex-1 font-medium text-[15px]">
                       {a.desc}
                     </p>
 
                     {/* Learn More link */}
                     <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary transition-colors group-hover:text-foreground">
                       Explore Program
                       <ArrowRight className="h-4 w-4" />
                     </div>
                   </div>
                 </div>
               </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
