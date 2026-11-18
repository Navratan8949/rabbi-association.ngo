import Image from "next/image"
import Link from "next/link"
import { CalendarDays, ArrowRight } from "lucide-react"

function hrefFor(type, id) {
  if (type === "project") return `/projects/${id}`
  if (type === "event") return `/events/${id}`
  if (type === "campaign") return `/crowdfunding/${id}`
  if (type === "news") return `/news/${id}`
  return "#"
}

export function CardsGrid({ items = [], type }) {
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <div className="rounded-2xl border border-dashed border-border/80 bg-card p-12 shadow-sm">
          <h3 className="text-xl font-semibold text-navy">Nothing to show yet</h3>
          <p className="mt-2 text-muted-foreground">Check back later for updates in this section.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const hasProgressBar = type === "campaign" && (item.targetAmount > 0 || item.goalAmount > 0);
          const goal = item.targetAmount || item.goalAmount || 1;
          const raised = item.raisedAmount || 0;
          const progress = Math.min(100, (raised / goal) * 100);

          return (
            <Link key={item._id} href={hrefFor(type, item._id)} className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-primary/20 bg-primary text-white shadow-soft transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 hover:shadow-2xl">
              <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-slate-900/10">
                {(item.image?.url || (typeof item.image === 'string' && item.image)) ? (
                  <>
                    <Image 
                      src={item.image?.url || item.image} 
                      alt="" 
                      fill 
                      aria-hidden="true"
                      className="object-cover blur-lg scale-110 opacity-30 select-none pointer-events-none" 
                    />
                    <Image 
                      src={item.image?.url || item.image} 
                      alt={item.title || "Card image"} 
                      fill 
                      priority={index < 4}
                      className="object-contain p-2 transition duration-500 group-hover:scale-105 relative z-[1]" 
                      sizes="(min-width:1024px) 33vw, 100vw" 
                    />
                  </>
                ) : (
                  <span className="text-muted-foreground">No Image</span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent opacity-0 transition group-hover:opacity-100 z-[2]" />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white border border-white/20">
                    {item.category || item.type || item.status || "Campaign"}
                  </span>
                  {item.status && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                      {item.status}
                    </span>
                  )}
                </div>
                <h2 className="mt-3 text-2xl font-bold leading-snug text-white group-hover:text-amber-100 transition-colors">{item.title}</h2>
                <p className="mt-3 flex-1 line-clamp-3 text-base leading-relaxed text-white/90 font-medium">{item.description || item.content}</p>
                
                {type === "event" && item.eventDate && (
                  <p className="mt-4 flex items-center gap-2 text-sm font-medium text-white/80">
                    <CalendarDays className="size-4 text-accent" />
                    {new Date(item.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                )}
                
                {hasProgressBar && (
                  <div className="mt-6 rounded-xl bg-black/15 p-4 border border-white/20">
                    <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-wider">
                      <span className="text-white/80">Raised</span>
                      <span className="text-white font-extrabold">₹{raised.toLocaleString("en-IN")} / ₹{goal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-black/25">
                      <div className="h-full rounded-full bg-white transition-all duration-1000" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                )}

                <div className="mt-6 border-t border-white/20 pt-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all group-hover:bg-white group-hover:text-navy shadow-xs">
                    {type === "campaign" ? "Know More" : "Read more"}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                  {type === "campaign" && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-white hover:underline transition-all">
                      Support Cause &rarr;
                    </span>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
