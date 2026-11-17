"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ArrowLeft, HeartHandshake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCrowdfundings } from "@/service/crowdfunding.service"
import { CardsGrid } from "@/components/pages/cards-grid"
import { useLanguage } from "@/context/LanguageContext"

export function CrowdfundingPreview() {
  const { t, isRTL } = useLanguage()
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

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
    <section className="bg-slate-50 py-20 border-t border-border/60" dir={isRTL ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 flex flex-col items-center justify-center text-center gap-6">
          <div className="max-w-2xl flex flex-col items-center">
            <div className="inline-flex items-center gap-2 rounded-sm border border-border bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 shadow-sm">
              <HeartHandshake className="size-4 text-accent" />
              {t("crowdfunding_section.badge", "Support Our Cause")}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              {t("crowdfunding_section.title", "Crowdfunding & Campaigns")}
            </h2>
            <p className="mt-4 text-lg text-slate-600 font-medium">
              {t("crowdfunding_section.description", "Join hands with us to make a lasting impact. Your contributions help provide educational opportunities and welfare to those in need.")}
            </p>
          </div>
        </div>

        {/* Use CardsGrid but without the padding padding wrappers */}
        <div className="-mx-4 md:-mx-0 -my-12 md:-my-16">
          <CardsGrid items={campaigns} type="campaign" />
        </div>
        
        <div className="mt-20 flex justify-center">
          <Button asChild size="lg" className="h-12 rounded-full bg-navy px-8 font-bold text-white shadow-lg hover:bg-navy/90 hover:shadow-xl transition-all">
            <Link href="/crowdfunding" className="inline-flex items-center gap-2">
              <span>{t("crowdfunding_section.view_all", "View All Campaigns")}</span>
              <ArrowIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
