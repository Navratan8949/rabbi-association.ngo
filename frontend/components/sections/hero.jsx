"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import {
  ArrowRight,
  Users,
  ChevronLeft,
  ChevronRight,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const defaultSlides = [
  {
    title: "Making Life Better",
    highlight: "Through Education",
    desc: "Building Better Schools. Empowering Educators. Transforming Lives. Rabbi Association is committed to strengthening education and sustainable human development.",
    motto: "Love & Service",
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80",
  },
  {
    title: "Education With",
    highlight: "Purpose",
    desc: "We work with schools, educational institutions, educators, and communities to create better learning environments and stronger educational systems.",
    motto: "Excellence With Values",
    image:
      "https://images.unsplash.com/photo-1427504494785-319ce224ce02?auto=format&fit=crop&q=80",
  },
  {
    title: "Partner With",
    highlight: "Rabbi Association",
    desc: "Whether you are planning to establish a new school, strengthen an existing institution, or build your team, we are ready to explore the possibilities.",
    motto: "Christ the Rabbi — Our Teacher, Model & Guide",
    image:
      "https://images.unsplash.com/photo-1524185962737-ea7c028a12cd?auto=format&fit=crop&q=80",
  },
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
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const activeSlide = slides[currentSlide];

  return (
    <section className="relative overflow-hidden w-full min-h-[85vh] lg:min-h-[88vh] py-16 sm:py-20 md:py-24 flex items-center justify-center bg-navy">
      {/* Background Images */}
      <AnimatePresence>
        <motion.div
          key={`bg-${currentSlide}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={(() => {
              const url =
                activeSlide.image ||
                activeSlide.image_url ||
                defaultSlides[0].image;
              // Add width param to Unsplash to prevent loading 4000px images which crash the browser
              if (url?.includes("unsplash.com") && !url.includes("&w=")) {
                return `${url}&w=1920`;
              }
              return url;
            })()}
            alt={activeSlide.title || "Hero Background"}
            className="w-full h-full object-cover"
            fetchPriority={currentSlide === 0 ? "high" : "auto"}
          />
          <div className="absolute inset-0 bg-navy/70" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows on Left and Right (Enhanced circular buttons) */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/30 hover:bg-accent text-white hover:text-navy transition-all duration-300 z-40 border border-white/20 backdrop-blur-md shadow-lg"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="size-5 sm:size-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/30 hover:bg-accent text-white hover:text-navy transition-all duration-300 z-40 border border-white/20 backdrop-blur-md shadow-lg"
        aria-label="Next Slide"
      >
        <ChevronRight className="size-5 sm:size-6" />
      </button>

      <div className="relative z-20 mx-auto w-full max-w-5xl px-6 lg:px-12 text-center pt-8 sm:pt-12">
        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white mb-5 sm:mb-6">
              <Heart className="size-3.5 text-accent" />
              Est. 2026 · Registered NGO
            </div>

            <h1 className="font-bold leading-tight tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-2">
              {activeSlide.title}
            </h1>
            <h2 className="font-bold leading-tight tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-accent mb-4 sm:mb-6">
              {activeSlide.highlight}
            </h2>

            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white/90 max-w-2xl mx-auto font-medium mb-5 sm:mb-6">
              {activeSlide.desc}
            </p>

            {activeSlide.motto && (
              <div className="justify-center mb-6 hidden sm:flex">
                <p className="text-base md:text-lg italic text-white/70 font-medium">
                  "{activeSlide.motto}"
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2 sm:mt-4 z-30 relative">
              <Button
                asChild
                size="lg"
                className="h-12 sm:h-14 w-full sm:w-auto rounded-md bg-accent px-8 text-base font-bold text-white transition-colors hover:bg-accent/90 shadow-lg"
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
                className="h-12 sm:h-14 w-full sm:w-auto rounded-md border-white/80 bg-white/10 backdrop-blur-sm px-8 text-base font-bold text-white transition-colors hover:bg-white hover:text-navy shadow-lg"
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

      {/* Slide Indicators (Clean frosted pill, positioned safely with clearance below buttons) */}
      <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-30 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-xl">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentSlide
                ? "w-7 sm:w-8 bg-accent"
                : "w-2.5 bg-white/40 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
