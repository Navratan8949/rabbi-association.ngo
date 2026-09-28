"use client";

import Link from "next/link";
import { HandHeart, Heart, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { motion } from "framer-motion";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden pt-20 pb-4 md:pt-28 md:pb-6 flex items-center justify-center border-t border-slate-800">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: "url('/rabbi-context/focus_3.jpg')",
          transform: "translateZ(0)", // Hardware acceleration hint
        }}
      />

      {/* Premium Dark Overlay */}
      {/* <div className="absolute inset-0 bg-navy/70" /> */}

      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]" />

      {/* Subtle Gradient for depth */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/80" /> */}

      <div className="relative mx-auto max-w-4xl px-4 pb-16 text-center md:pb-20">
        <Reveal>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-flex cursor-default items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 shadow-sm transition-colors hover:border-amber-400/30 hover:bg-slate-800/80"
          >
            <HandHeart className="size-3.5" />
            PARTNER WITH US
          </motion.span>
          <h2 className="mt-6 text-balance text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-xl">
            Have an Educational Vision? <br />
            <span className="text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              Let's Build It Together.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-xl drop-shadow-lg">
            Whether you are planning to establish a new school, strengthen an
            existing institution, develop academic systems, improve
            administration, build your team, or create a new educational
            initiative, Rabbi Association is ready to explore the possibilities
            with you.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-400 font-semibold md:text-lg tracking-wide uppercase drop-shadow-md">
            Better Institutions. Stronger Educators. Empowered Learners.
            Transformed Communities.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="group h-14 rounded-full bg-amber-500 px-8 text-base font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-1 hover:bg-amber-400 hover:shadow-xl hover:shadow-amber-500/30"
            >
              <Link href="/contact">
                <UserPlus className="mr-2 size-5 transition-transform group-hover:scale-110" />
                Let's Start a Conversation
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
