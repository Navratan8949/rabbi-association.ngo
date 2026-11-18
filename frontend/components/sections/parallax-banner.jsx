"use client"

import { useSelector } from "react-redux"
import { Reveal } from "@/components/shared/reveal"
import { Quote } from "lucide-react"

export function ParallaxBanner() {
  const { data: siteContent } = useSelector((state) => state.siteContent)

  let author = "RABBI ASSOCIATION"

  if (siteContent?.parallax_banner?.content) {
    try {
      const parsed = JSON.parse(siteContent.parallax_banner.content)
      if (parsed.author) author = parsed.author
    } catch (e) { }
  }

  return (
    <section className="relative py-24 md:py-32 w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Fixed Attachment for Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ 
          backgroundImage: "url('/rabbi-context/focus_7.jpg')",
          transform: "translateZ(0)" // Hardware acceleration hint
        }} 
      />
      
      {/* Classic Dark Overlay */}
      <div className="absolute inset-0 bg-navy/80" />

      {/* Content */}
      <Reveal className="relative z-10 px-6 text-center max-w-4xl mx-auto">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-transparent">
          <Quote className="size-6 text-white" />
        </div>
        
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-snug text-white mb-8 tracking-tight">
          <span className="block mb-2">Education with Purpose.</span>
          <span className="block mb-2 text-white/90">Excellence with Values.</span>
          <span className="block text-accent">Making Life Better.</span>
        </h2>
        
        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="h-[1px] w-12 bg-white/30" />
          <p className="text-sm font-bold tracking-[0.2em] text-white uppercase">
            {author}
          </p>
          <div className="h-[1px] w-12 bg-white/30" />
        </div>
      </Reveal>
    </section>
  )
}
