import { PageHero } from "@/components/pages/page-hero";
import { Search, ClipboardList, PenTool, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

export const metadata = {
  title: "Our Approach | Rabbi Association",
  description: "From Vision to Impact: We follow a structured and collaborative approach designed to create practical and sustainable results.",
};

const steps = [
  {
    id: "01",
    title: "UNDERSTAND",
    desc: "We understand your institution, vision, objectives, needs, and challenges.",
    icon: Search,
    color: "bg-blue-500",
    shadow: "shadow-blue-500/20"
  },
  {
    id: "02",
    title: "ASSESS",
    desc: "We analyse the existing situation and identify strengths, gaps, and opportunities.",
    icon: ClipboardList,
    color: "bg-indigo-500",
    shadow: "shadow-indigo-500/20"
  },
  {
    id: "03",
    title: "PLAN",
    desc: "We develop practical, customised, and sustainable solutions.",
    icon: PenTool,
    color: "bg-violet-500",
    shadow: "shadow-violet-500/20"
  },
  {
    id: "04",
    title: "IMPLEMENT",
    desc: "We provide professional support during implementation and development.",
    icon: Rocket,
    color: "bg-fuchsia-500",
    shadow: "shadow-fuchsia-500/20"
  },
  {
    id: "05",
    title: "STRENGTHEN",
    desc: "We help institutions monitor progress, improve systems, and build long-term capacity.",
    icon: ShieldCheck,
    color: "bg-rose-500",
    shadow: "shadow-rose-500/20"
  },
  {
    id: "06",
    title: "TRANSFORM",
    desc: "Our ultimate purpose is meaningful educational improvement that contributes to the development of individuals, institutions, and communities.",
    icon: Sparkles,
    color: "bg-amber-500",
    shadow: "shadow-amber-500/20"
  }
];

export default function ApproachPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        eyebrow="Our Approach"
        title="From Vision to Impact"
        description="We follow a structured and collaborative approach designed to create practical and sustainable results."
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Our Approach", href: "/approach" },
        ]}
      />

      <section className="py-24 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-slate-200 via-accent/50 to-slate-200 hidden md:block"></div>
        
        <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
          <div className="flex flex-col gap-12 md:gap-24">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 !== 0;
              
              return (
                <div key={step.id} className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  {/* Content Side */}
                  <div className={`flex-1 ${isEven ? 'md:text-left' : 'md:text-right'} w-full md:w-1/2`}>
                    <Reveal delay={0.1}>
                      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} w-2 h-full ${step.color}`}></div>
                        
                        <div className={`flex items-center gap-4 mb-4 ${!isEven ? 'md:flex-row-reverse' : ''}`}>
                          <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Step {step.id}</span>
                          <div className="h-px flex-1 bg-slate-100"></div>
                        </div>
                        
                        <h2 className="text-3xl font-bold text-navy mb-4 group-hover:text-accent transition-colors">{step.title}</h2>
                        <p className="text-lg text-slate-600 font-medium leading-relaxed">{step.desc}</p>
                      </div>
                    </Reveal>
                  </div>
                  
                  {/* Center Node */}
                  <div className="hidden md:flex flex-col items-center justify-center relative shrink-0 w-24">
                    <Reveal delay={0.2}>
                      <div className={`size-16 rounded-full ${step.color} ${step.shadow} shadow-xl flex items-center justify-center text-white ring-8 ring-slate-50 z-10`}>
                        <Icon className="size-6" />
                      </div>
                    </Reveal>
                  </div>
                  
                  {/* Empty Side for layout */}
                  <div className="hidden md:block flex-1"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
