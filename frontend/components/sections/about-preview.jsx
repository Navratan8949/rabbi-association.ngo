"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Target, Eye, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/shared/reveal"
import { useSelector } from "react-redux"

export function AboutPreview() {
  const { data: siteContent } = useSelector((state) => state.siteContent)

  let title = "ABOUT US"
  let description = "Rabbi Association is an education consultancy and institutional development organisation committed to advancing quality education, human empowerment, institutional excellence, and sustainable social development.\n\nFounded on 5 September 2026, Rabbi Association was established with a vision to make a meaningful contribution to individuals, educational institutions, and communities through professional expertise guided by strong human, ethical, and social values.\n\nWe believe that education is more than the transmission of knowledge. True education forms the mind, shapes character, strengthens values, develops leadership, and inspires people to serve humanity."
  let mission = "Rabbi Association exists to serve humanity through Christ-centred education, guided by Christ the Rabbi—our Teacher, Model, and Guide—and led by the Holy Spirit, the Advocate. We are committed to making life better through quality education, empowering people, strengthening educational institutions, creating equal opportunities, and supporting sustainable social development."
  let vision = "Witnessing Christ Through Education. Rabbi Association exists to witness to the teachings of Christ the Rabbi—our Teacher, Model, and Guide, led by the Holy Spirit, the Advocate. We envision a society where education forms minds, shapes character, inspires responsible leadership, upholds human dignity, and transforms lives through love, truth, justice, compassion, and service."
  let image = "/rabbi-context/about_us_classroom.jpg"

  if (siteContent?.about_preview?.content) {
    try {
      const parsed = JSON.parse(siteContent.about_preview.content)
      if (siteContent.about_preview.title) title = siteContent.about_preview.title
      if (parsed.description) description = parsed.description
      if (parsed.mission) mission = parsed.mission
      if (parsed.vision) vision = parsed.vision
      if (parsed.image) image = parsed.image
    } catch (e) { }
  }

  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 lg:py-32 border-b border-gray-100">
      {/* Subtle Background Element */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-slate-50/50 pointer-events-none" />

      <div className="mx-auto max-w-[1440px] grid items-center gap-16 lg:grid-cols-2 relative z-10 lg:px-8">

        {/* Left: Clean Modern Image */}
        <Reveal className="relative mx-auto w-full">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-lg border border-gray-100">
            <Image
              src={image}
              alt="Rabbi Association"
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Simple Gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
          
          {/* Minimal Tag */}
          <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm shadow-md rounded-2xl px-5 py-3 flex items-center gap-3">
             <div className="h-10 w-10 flex items-center justify-center rounded-full bg-accent/10">
               <BookOpen className="w-5 h-5 text-accent" />
             </div>
             <div>
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Established</span>
                <span className="block text-primary font-bold text-lg leading-none mt-1">2026</span>
             </div>
          </div>
        </Reveal>

        {/* Right: Clean Text content */}
        <div className="lg:pl-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
              <span className="text-sm font-bold uppercase tracking-widest text-accent">{title}</span>
            </div>

            <h2 className="font-bold leading-[1.2] text-slate-900 text-4xl sm:text-5xl mb-8">
              Making Life Better Through <span className="text-accent">Education.</span>
            </h2>

            <div className="space-y-6">
              {description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-slate-600 text-[17px] leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Clean Mission & Vision Blocks */}
          <div className="mt-10 grid gap-8 sm:grid-cols-2 pt-10 border-t border-gray-100">
            <Reveal delay={0.1}>
              <div className="pl-5 border-l-4 border-accent">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-lg mb-3">
                  <Target className="w-5 h-5 text-accent" />
                  Our Mission
                </div>
                <p className="text-[15px] leading-relaxed text-slate-600">
                  {mission}
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="pl-5 border-l-4 border-accent">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-lg mb-3">
                  <Eye className="w-5 h-5 text-accent" />
                  Our Vision
                </div>
                <p className="text-[15px] leading-relaxed text-slate-600">
                  {vision}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.3} className="mt-12">
            <Button 
              asChild 
              size="lg"
              className="h-14 rounded-full bg-accent px-8 text-base font-bold text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:-translate-y-1 hover:bg-accent/90 hover:shadow-accent/40"
            >
              <Link href="/about">
                Explore About Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
