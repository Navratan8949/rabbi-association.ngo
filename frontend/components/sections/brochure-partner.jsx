"use client";

import Image from "next/image";
import Link from "next/link";
import { Handshake, ShieldCheck, Target, Users, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";

const reasons = [
  {
    title: "Trusted Partner",
    desc: "Transparent, professional and value-driven.",
    icon: Handshake,
  },
  {
    title: "100% Compliant",
    desc: "Follows legal and regulatory requirements including CSR, FCRA, 12A/80G.",
    icon: ShieldCheck,
  },
  {
    title: "Measurable Impact",
    desc: "Clear goals, reports and real change on ground.",
    icon: Target,
  },
  {
    title: "Long-Term Partnership",
    desc: "Working together for sustainable development.",
    icon: Users,
  },
];

export function BrochurePartner() {
  return (
    <section className="bg-secondary py-24 relative border-t border-border">
      
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        
        {/* Why Partner Section - Split Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-24">
          
          {/* Left: Heading & Context */}
          <div className="lg:col-span-5 flex flex-col items-start text-left pr-0 lg:pr-10">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-sm border border-border bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
                Collaborate with us
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Why Partner with <br /> <span className="text-primary">Rabbi Association?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
                We believe in creating strong, transparent, and compliant partnerships that lead to measurable impact on the ground. Partnering with us means investing in a sustainable future.
              </p>
              <Button
                asChild
                size="lg"
                className="h-14 rounded-md bg-primary px-8 text-base font-bold text-white transition-colors hover:bg-primary/90"
              >
                <Link href="/csr">
                  Become a Partner
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
            </Reveal>
          </div>

          {/* Right: Clean 2x2 Cards */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-6 relative">
              
              {reasons.map((r, i) => (
                <Reveal key={r.title} delay={i * 0.1} className={`flex ${i % 2 !== 0 ? 'sm:mt-10' : ''}`}>
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-border w-full transition-shadow hover:shadow-md">
                    <div className="relative">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-secondary border border-border text-foreground mb-6">
                        <r.icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="font-bold text-foreground mb-3 text-xl">{r.title}</h3>
                      <p className="text-muted-foreground text-[15px] font-medium leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* CSR Support Section - Classic Classic */}
        <div className="relative bg-navy rounded-lg overflow-hidden shadow-lg border border-navy/20">
          
          <div className="grid lg:grid-cols-2 items-stretch min-h-[500px]">
            <Reveal className="p-10 lg:p-16 text-white flex flex-col justify-center relative z-10">
              <div className="inline-flex items-center gap-2 rounded-sm border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white mb-6 self-start">
                Corporate Social Responsibility
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Create Lasting <br /> <span className="text-primary">Impact</span>
              </h2>
              <p className="text-white/80 font-medium leading-relaxed mb-8 text-lg">
                Rabbi Association works closely with corporate partners to design and implement CSR projects in education and community development. We bring your CSR vision to life with transparency, professionalism and genuine impact.
              </p>
              <div className="bg-white/5 p-6 rounded-lg border-l-4 border-l-primary">
                <p className="italic text-lg text-white">
                  "Together, we can build stronger schools, brighter futures and a better tomorrow."
                </p>
              </div>
            </Reveal>
            
            <Reveal className="relative h-64 lg:h-full w-full lg:min-h-[500px]">
              <Image 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80" 
                alt="Plant in hands representing sustainable impact" 
                fill 
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/50 to-transparent lg:w-1/2" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent lg:hidden" />
            </Reveal>
          </div>
        </div>

      </div>
    </section>
  );
}
