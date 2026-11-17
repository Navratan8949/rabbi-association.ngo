import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"

// Shared helper — exported so other components can use it
export function formatINR(amount = 0) {
  return "₹" + Number(amount).toLocaleString("en-IN")
}

export function CampaignCard({ campaign }) {
  const id = campaign._id || campaign.id
  const raised = campaign.raisedAmount || 0
  const target = campaign.targetAmount || 1
  const pct = Math.min(100, Math.round((raised / target) * 100))
  const imageUrl = campaign.image?.url || (typeof campaign.image === 'string' ? campaign.image : null) || "/placeholder.svg"

  return (
    <Link href={`/crowdfunding/${id}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lift">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-border/50">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={campaign.title || "Campaign"}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-bold leading-snug group-hover:text-navy">{campaign.title}</h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">{campaign.description}</p>
          <div className="mt-4">
            <div className="mb-2 flex justify-between text-xs font-semibold">
              <span className="text-muted-foreground">Raised</span>
              <span className="text-navy">
                {formatINR(raised)} / {formatINR(target)}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
              <Heart className="size-3.5" />
              Support this campaign
            </p>
          </div>
        </div>
      </article>
    </Link>
  )
}
