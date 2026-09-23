"use client";

import Link from "next/link";
import { HandHeart, Heart, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { motion } from "framer-motion";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-navy pt-16 md:pt-24">
      <div className="absolute inset-0 bg-hero-grid opacity-30" />
      <div className="absolute -left-20 top-0 size-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 size-72 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 pb-16 text-center md:pb-20">
        <Reveal>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-flex cursor-default items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300 backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <HandHeart className="size-3.5" />
            PARTNER WITH US
          </motion.span>
          <h2 className="mt-6 text-balance text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Have an Educational Vision? <br />
            <span className="text-accent">Let's Build It Together.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-xl">
            Whether you are planning to establish a new school, strengthen an existing institution, develop academic systems, improve administration, build your team, or create a new educational initiative, Rabbi Association is ready to explore the possibilities with you.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 font-medium md:text-lg">
            Better Institutions. Stronger Educators. Empowered Learners. Transformed Communities.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="group h-14 rounded-full bg-accent px-8 text-base font-semibold text-accent-foreground shadow-[0_0_20px_rgba(255,209,102,0.3)] transition-all hover:-translate-y-1 hover:text-white hover:bg-accent hover:shadow-[0_0_25px_rgba(255,209,102,0.5)]"
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
