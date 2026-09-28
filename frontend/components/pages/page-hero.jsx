import Image from "next/image"

export function PageHero({ eyebrow, title, description, image }) {
  // Sanitize missing mock images from old template
  const isMockImage = typeof image === 'string' && (
    image.includes("hero-") || 
    image.includes("community-") || 
    image.includes("women-") || 
    image.includes("rural-")
  );
  
  // Fallback beautiful educational image if none is provided or if it's a mock
  const bgImage = (!image || isMockImage) ? "/rabbi-context/focus_3.jpg" : image;

  return (
    <section className="relative overflow-hidden pt-28 pb-24 md:pt-36 md:pb-32 flex items-center justify-center min-h-[400px]">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      {/* Premium Dark Overlay */}
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[1px]" />
      
      {/* Subtle Gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/80" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center mt-4">
        {eyebrow && (
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-500 backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)] animate-pulse" />
            {eyebrow}
          </span>
        )}
        
        <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-white md:text-5xl lg:text-[3.5rem] text-balance drop-shadow-xl">
          {title}
        </h1>
        
        {description && (
          <p className="mt-6 mx-auto max-w-2xl text-lg leading-relaxed text-slate-300 font-medium text-pretty drop-shadow-lg">
            {description}
          </p>
        )}
      </div>
      
      {/* Premium subtle bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
    </section>
  )
}
