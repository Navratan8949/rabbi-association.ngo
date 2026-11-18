import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Heart, ShieldCheck, Users, Building2, Calendar, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCrowdfundings, getCrowdfundingById } from "@/service/crowdfunding.service"

export const dynamic = "force-dynamic"

export async function generateStaticParams() {
  try {
    const res = await getCrowdfundings()
    if (res && res.success && res.campaigns) {
      return res.campaigns.map((c) => ({ id: c._id }))
    }
  } catch (error) {
    console.error("Failed to fetch campaigns for static params", error)
  }
  return []
}

export async function generateMetadata({ params }) {
  const { id } = await params
  try {
    const res = await getCrowdfundingById(id)
    if (res && res.success && res.campaign) {
      return { title: res.campaign.title }
    }
  } catch (error) {
    console.error("Failed to fetch campaign metadata", error)
  }
  return { title: "Campaign" }
}

export default async function CampaignDetailPage({ params }) {
  const { id } = await params
  
  let campaign = null
  try {
    const res = await getCrowdfundingById(id)
    if (res && res.success && res.campaign) {
      campaign = res.campaign
    }
  } catch (error) {
    console.error("Failed to fetch campaign details", error)
  }

  if (!campaign) notFound()

  const raised = campaign.raisedAmount || 0
  const target = campaign.targetAmount || 1
  const pct = Math.min(100, Math.round((raised / target) * 100))
  const imageUrl = campaign.image?.url || (typeof campaign.image === 'string' ? campaign.image : null)

  return (
    <article className="min-h-screen bg-slate-50">
      <div className="relative isolate min-h-[46vh] overflow-hidden bg-navy text-white">
        {imageUrl && <Image src={imageUrl} alt={campaign.title} fill className="object-cover opacity-40" priority sizes="100vw" />}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/40" />
        <div className="relative mx-auto flex min-h-[46vh] max-w-7xl flex-col justify-end px-4 pb-12 pt-28">
          <Link href="/crowdfunding" className="mb-6 inline-flex w-fit items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="size-4" /> All campaigns
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex w-fit rounded-full bg-accent/20 border border-accent/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-accent">
              {campaign.category || "General Welfare"}
            </span>
            <span className="inline-flex w-fit rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white/80">
              {campaign.status || "active"}
            </span>
          </div>
          <h1 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">{campaign.title}</h1>
          <p className="mt-4 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed">{campaign.description}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          {/* Detailed Story / Utilization Plan */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <h2 className="text-2xl font-bold text-navy mb-4">Why This Campaign Matters</h2>
            <div className="text-base text-slate-700 leading-relaxed whitespace-pre-wrap">
              {campaign.story || campaign.description}
            </div>
            
            {campaign.story && campaign.description && campaign.story !== campaign.description && (
              <div className="mt-6 pt-6 border-t border-slate-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Campaign Overview</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{campaign.description}</p>
              </div>
            )}
          </div>

          {/* Key Beneficiary & Organizer Info Cards */}
          {(campaign.beneficiary || campaign.organizer) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {campaign.beneficiary && (
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-start gap-3.5">
                  <div className="size-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="size-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Direct Beneficiaries</p>
                    <p className="text-sm font-bold text-navy leading-snug">{campaign.beneficiary}</p>
                  </div>
                </div>
              )}
              {campaign.organizer && (
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-start gap-3.5">
                  <div className="size-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0 mt-0.5">
                    <Building2 className="size-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Campaign Lead / Organizer</p>
                    <p className="text-sm font-bold text-navy leading-snug">{campaign.organizer}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Transparency & Audit Guarantee */}
          <div className="rounded-3xl bg-emerald-50/70 border border-emerald-200/70 p-6 text-sm text-slate-700 leading-relaxed shadow-xs">
            <p className="font-bold text-emerald-950 mb-2 flex items-center gap-2 text-base">
              <ShieldCheck className="size-5 text-emerald-600" /> 100% Verified Transparency & Tax Benefits
            </p>
            <p className="text-emerald-900/85">
              Funds collected for this initiative are audited and directly allocated toward verified relief milestones. Donors are eligible for Indian Income Tax exemptions under Section 80G and receive official digital receipts and utilization updates.
            </p>
          </div>
        </div>

        {/* Sidebar Donation Box */}
        <aside className="h-fit rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-md sticky top-28 space-y-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Raised</p>
              <p className="mt-1 text-3xl font-extrabold text-navy">₹{raised.toLocaleString("en-IN")}</p>
            </div>
            <p className="text-sm font-bold text-slate-500">Goal: ₹{target.toLocaleString("en-IN")}</p>
          </div>
          
          <div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs font-bold text-slate-500">
              <span>{pct}% funded</span>
              <span>₹{(Math.max(0, target - raised)).toLocaleString("en-IN")} remaining</span>
            </div>
          </div>
          
          {campaign.startDate && campaign.endDate && (
            <div className="border-t pt-4 border-slate-100 text-xs text-slate-500 flex justify-between font-semibold">
              <span className="flex items-center gap-1"><Calendar className="size-3.5 text-accent" /> Start: {new Date(campaign.startDate).toLocaleDateString()}</span>
              <span>End: {new Date(campaign.endDate).toLocaleDateString()}</span>
            </div>
          )}

          <Button asChild className="h-12 w-full rounded-2xl bg-accent text-base font-extrabold text-navy hover:bg-accent/90 shadow-md transition-all">
            <Link href={`/donate?campaignId=${campaign._id}&title=${encodeURIComponent(campaign.title)}`}>
              <Heart className="mr-2 size-5 fill-navy" />
              Donate to this Campaign
            </Link>
          </Button>

          <div className="text-center">
            <Link href="/crowdfunding" className="text-xs font-bold text-slate-500 hover:text-navy transition-colors">
              &larr; Explore Other Campaigns
            </Link>
          </div>
        </aside>
      </div>
    </article>
  )
}
