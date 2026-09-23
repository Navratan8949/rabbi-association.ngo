"use client";

import { CheckCircle2, Heart, Lightbulb, BookOpen, Scale, Sparkles, BookHeart, UserCheck, Droplet, Crown } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import Image from "next/image";

const approaches = [
  { title: "Education with Purpose", icon: Lightbulb },
  { title: "Excellence with Values", icon: BookOpen },
  { title: "Human dignity", icon: UserCheck },
  { title: "Equal opportunities", icon: Scale },
  { title: "Responsible leadership", icon: Crown },
];

const identities = [
  { title: "Christ the Rabbi — Teacher, Model & Guide", icon: BookHeart },
  { title: "Holy Spirit — the Advocate", icon: Sparkles },
  { title: "Love & Service", icon: Heart },
  { title: "Faith expressed through service", icon: Droplet },
];

export function IdentityAndApproach() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left Side: Our Approach */}
          <Reveal>
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 h-full shadow-sm">
              <SectionHeading 
                title="Our Approach"
                description="The core principles that guide our educational initiatives and institutional development."
                className="mb-8"
              />
              
              <div className="space-y-6 mt-8">
                {approaches.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-accent/30 transition-colors group">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy/5 text-navy group-hover:bg-navy group-hover:text-white transition-colors">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <span className="font-bold text-lg text-slate-700">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right Side: Our Christian Identity */}
          <Reveal delay={0.2}>
            <div className="bg-navy p-10 rounded-3xl h-full shadow-xl relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-3">Who We Are</h2>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Our Christian Identity
                </h3>
                <p className="text-white/70 font-medium mb-10 leading-relaxed">
                  Our foundation is built upon deep faith, guiding every action we take to transform communities through education and service.
                </p>

                <div className="space-y-6">
                  {identities.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-accent group-hover:bg-accent group-hover:text-navy transition-colors mt-1">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="font-bold text-lg leading-snug">{item.title}</span>
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
