"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, HeartHandshake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCrowdfundings } from "@/service/crowdfunding.service"
import { CardsGrid } from "@/components/pages/cards-grid"

export function CrowdfundingPreview() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCrowdfundings()
      .then(res => {
        if (res?.success && res.campaigns) {
          // Get up to 3 campaigns
          setCampaigns(res.campaigns.slice(0, 3))
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading || campaigns.length === 0) return null

  return (
    <section className="bg-slate-50 py-20 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-sm border border-border bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 shadow-sm">
              <HeartHandshake className="size-4 text-accent" />
              Support Our Cause
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              Crowdfunding & Campaigns
            </h2>
            <p className="mt-4 text-lg text-slate-600 font-medium">
              Join hands with us to make a lasting impact. Your contributions help us provide better education, healthcare, and welfare to those in need.
            </p>
          </div>
          <Button asChild size="lg" className="h-12 rounded-full bg-navy px-8 font-bold text-white shadow-lg hover:bg-navy/90 hover:shadow-xl transition-all">
            <Link href="/crowdfunding">
              View All Campaigns
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>

        {/* Use CardsGrid but without the padding padding wrappers */}
        <div className="-mx-4 md:-mx-0 -my-12 md:-my-16">
          <CardsGrid items={campaigns} type="campaign" />
        </div>
      </div>
    </section>
  )
}
