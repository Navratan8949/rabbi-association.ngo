"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { ArrowRight, Users, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const defaultSlides = [
  {
    title: "Making Life Better",
    highlight: "Through Education",
    desc: "Building Better Schools. Empowering Educators. Transforming Lives. Rabbi Association is committed to strengthening education and sustainable human development.",
    motto: "Love & Service",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80",
  },
  {
    title: "Education With",
    highlight: "Purpose",
    desc: "We work with schools, educational institutions, educators, and communities to create better learning environments and stronger educational systems.",
    motto: "Excellence With Values",
    image: "https://images.unsplash.com/photo-1427504494785-319ce224ce02?auto=format&fit=crop&q=80",
  },
  {
    title: "Partner With",
    highlight: "Rabbi Association",
    desc: "Whether you are planning to establish a new school, strengthen an existing institution, or build your team, we are ready to explore the possibilities.",
    motto: "Christ the Rabbi — Our Teacher, Model & Guide",
    image: "https://images.unsplash.com/photo-1524185962737-ea7c028a12cd?auto=format&fit=crop&q=80",
  }
];

export function Hero() {
  const { data: siteContent } = useSelector((state) => state.siteContent);
  const [currentSlide, setCurrentSlide] = useState(0);

  let slides = defaultSlides;

  if (siteContent?.home_hero?.content) {
    try {
      const parsed = JSON.parse(siteContent.home_hero.content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        slides = parsed;
      }
    } catch (e) {}
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const activeSlide = slides[currentSlide];

  return (
    <section className="relative overflow-hidden w-full h-[85vh] min-h-[600px] flex items-center justify-center bg-navy">
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentSlide}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={activeSlide.image || activeSlide.image_url || defaultSlides[0].image}
            alt={activeSlide.title || "Hero Background"}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-navy/70" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 lg:px-12 text-center pt-20">
        
        {/* Navigation Arrows */}
        <button onClick={prevSlide} className="absolute left-2 md:-left-10 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors hidden md:block z-50">
          <ChevronLeft className="size-12" />
        </button>
        <button onClick={nextSlide} className="absolute right-2 md:-right-10 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors hidden md:block z-50">
          <ChevronRight className="size-12" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white mb-8">
              <Heart className="size-3.5 text-accent" />
              Est. 2026 · Registered NGO
            </div>

            <h1 className="font-bold leading-tight tracking-tight text-5xl md:text-6xl lg:text-7xl text-white mb-6">
              {activeSlide.title} <br />
              <span className="text-accent">{activeSlide.highlight}</span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed text-white/90 max-w-2xl mx-auto font-medium mb-10">
              {activeSlide.desc}
            </p>

            {activeSlide.motto && (
              <div className="flex justify-center mb-10">
                <p className="text-base md:text-lg italic text-white/70 font-medium">
                  "{activeSlide.motto}"
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-14 w-full sm:w-auto rounded-md bg-accent px-8 text-base font-bold text-white transition-colors hover:bg-accent/90"
              >
                <Link href="/projects">
                  <Users className="mr-2 size-5" />
                  Our Impact
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 w-full sm:w-auto rounded-md border-white bg-transparent px-8 text-base font-bold text-white transition-colors hover:bg-white hover:text-navy"
              >
                <Link href="/csr">
                  Partner With Us
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-8 bg-accent" : "w-2 bg-white/50 hover:bg-white/80"}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
