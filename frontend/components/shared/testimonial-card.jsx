import Image from "next/image"
import { Quote, Star } from "lucide-react"

export function TestimonialCard({ item }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white text-foreground p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
      <div className="absolute right-5 top-5 text-slate-50">
        <Quote className="size-16" />
      </div>

      <div className="mb-5 flex items-center gap-3 relative z-10">
        <Image
          src={item.image?.url || item.image || "/placeholder-user.jpg"}
          alt={item.name}
          width={60}
          height={60}
          className="size-14 rounded-full border object-cover"
        />
        <div>
          <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
          <span className="mt-1 inline-block rounded bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary uppercase tracking-wider">
            {item.designation || item.role || "Supporter"}
          </span>
        </div>
      </div>

      <p className="flex-1 leading-8 text-muted-foreground font-medium">
        "{item.message}"
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <div className="flex gap-1">
          {[...Array(item.rating || 5)].map((_, i) => (
            <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <span className="rounded bg-green-50 px-2 py-0.5 text-[11px] font-bold text-green-700 uppercase tracking-wider">
          Verified
        </span>
      </div>
    </div>
  )
}
