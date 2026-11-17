"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  ArrowLeft, 
  ArrowRight, 
  Heart, 
  Target, 
  TrendingUp, 
  CalendarDays, 
  Users, 
  ShieldCheck, 
  Building2, 
  Share2, 
  Copy, 
  Check, 
  Loader2,
  FolderOpen
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/LanguageContext"
import { getLocalizedField } from "@/lib/localized-field"
import { getCrowdfundingById } from "@/service/crowdfunding.service"
import { toast } from "sonner"

export function CampaignDetailClient({ id, initialCampaign = null }) {
  const { language, isRTL, t } = useLanguage()
  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft
  const [campaign, setCampaign] = useState(initialCampaign)
  const [loading, setLoading] = useState(!initialCampaign)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!campaign && id) {
      setLoading(true)
      getCrowdfundingById(id)
        .then((res) => {
          if (res?.success && res.campaign) {
            setCampaign(res.campaign)
          } else if (res?.data) {
            setCampaign(res.data)
          }
        })
        .catch((err) => {
          console.error("Failed to load campaign:", err)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [id, campaign])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-slate-50">
        <Loader2 className="size-10 animate-spin text-accent" />
        <p className="mt-4 text-sm font-bold text-navy">
          {t("common.loading", "Loading campaign details...")}
        </p>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center" dir={isRTL ? "rtl" : "ltr"}>
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 shadow-sm">
          <FolderOpen className="size-14 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-navy">{t("common.campaign_not_found", "Campaign Not Found")}</h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            {t("common.campaign_not_found_desc", "This campaign may have ended, been closed, or the link is invalid.")}
          </p>
          <div className="mt-6">
            <Button asChild className="rounded-xl bg-navy px-6 text-white hover:bg-navy/90">
              <Link href="/crowdfunding">
                <ArrowIcon className="mr-2 ml-2 size-4" />
                {t("common.all_campaigns", "Browse All Campaigns")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const title = getLocalizedField(campaign, "title", language) || campaign.title
  const description = getLocalizedField(campaign, "description", language) || campaign.description
  const story = getLocalizedField(campaign, "story", language) || campaign.story
  const category = getLocalizedField(campaign, "category", language) || campaign.category || "General Welfare"
  const beneficiary = getLocalizedField(campaign, "beneficiary", language) || campaign.beneficiary
  const organizer = getLocalizedField(campaign, "organizer", language) || campaign.organizer

  const raised = campaign.raisedAmount || 0
  const target = campaign.targetAmount || 1
  const pct = Math.min(100, Math.round((raised / target) * 100))
  const imageUrl = campaign.image?.url || (typeof campaign.image === "string" ? campaign.image : null)

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      toast.success(t("common.link_copied", "Campaign link copied to clipboard!"))
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <article dir={isRTL ? "rtl" : "ltr"} className="bg-slate-50/50 min-h-screen">
      {/* Hero Header */}
      <div className="relative isolate min-h-[48vh] overflow-hidden bg-navy text-white">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/50" />

        <div className="relative mx-auto flex min-h-[48vh] max-w-7xl flex-col justify-end px-4 pb-12 pt-28">
          <Link
            href="/crowdfunding"
            className="mb-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-white/80 hover:text-white transition-colors"
          >
            <ArrowIcon className="size-4" /> {t("common.all_campaigns", "All campaigns")}
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-accent-foreground shadow-sm">
              {category}
            </span>
            <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              {campaign.status || "Active"}
            </span>
          </div>

          <h1 className="mt-4 max-w-4xl text-3xl font-extrabold tracking-tight md:text-5xl text-balance">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base md:text-lg text-white/80 font-medium leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:py-16 lg:grid-cols-[1.15fr_0.85fr]">
        
        {/* Left Column: Details & Story */}
        <div className="space-y-10">
          {/* Key Information Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Category</p>
              <p className="mt-1 text-sm font-bold text-navy">{category}</p>
            </div>

            {beneficiary && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Beneficiary</p>
                <p className="mt-1 text-sm font-bold text-navy truncate" title={beneficiary}>{beneficiary}</p>
              </div>
            )}

            {organizer && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Organizer</p>
                <p className="mt-1 text-sm font-bold text-navy truncate" title={organizer}>{organizer}</p>
              </div>
            )}

            {campaign.startDate && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Timeline</p>
                <p className="mt-1 text-xs font-bold text-slate-700">
                  {new Date(campaign.startDate).toLocaleDateString(isRTL ? "ar-EG" : "en-IN")}
                  {campaign.endDate && ` - ${new Date(campaign.endDate).toLocaleDateString(isRTL ? "ar-EG" : "en-IN")}`}
                </p>
              </div>
            )}
          </div>

          {/* Overview & Purpose */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs">
            <h2 className="text-2xl font-extrabold text-navy">
              {t("common.why_campaign_matters", "Why This Campaign Matters")}
            </h2>
            <div className="mt-4 prose prose-slate max-w-none text-slate-600 leading-relaxed font-medium">
              <p className="whitespace-pre-wrap text-base">{description}</p>
            </div>
          </div>

          {/* Full Story & Detailed Breakdown */}
          {story && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs">
              <h2 className="text-2xl font-extrabold text-navy">
                {t("common.detailed_story", "Detailed Plan & Fund Utilization")}
              </h2>
              <div className="mt-4 prose prose-slate max-w-none text-slate-600 leading-relaxed font-medium">
                <p className="whitespace-pre-wrap text-base">{story}</p>
              </div>
            </div>
          )}

          {/* Verification & Trust Commitment */}
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 shadow-xs flex items-start gap-4">
            <ShieldCheck className="size-8 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-bold text-emerald-950">
                {t("common.verified_ngo_title", "100% Verified Non-Profit Campaign")}
              </h3>
              <p className="mt-1 text-xs text-emerald-800 leading-relaxed font-medium">
                {t(
                  "common.campaign_funds_note",
                  "Funds are tracked transparently against the published target. Official tax-deductible donation receipts are issued for all contributions."
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Donation Card & Actions */}
        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg sticky top-24">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Raised</p>
                <p className="mt-1 text-3xl font-extrabold text-navy">₹{raised.toLocaleString("en-IN")}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Goal Target</p>
                <p className="text-sm font-bold text-slate-600">₹{target.toLocaleString("en-IN")}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-5 h-3.5 overflow-hidden rounded-full bg-slate-100 p-0.5 border border-slate-200/80">
              <div
                className="h-full rounded-full bg-accent transition-all duration-1000 shadow-xs"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-2.5 flex items-center justify-between text-xs font-bold text-slate-500">
              <span className="text-accent">{pct}% Funded</span>
              <span>₹{(target - raised > 0 ? target - raised : 0).toLocaleString("en-IN")} Remaining</span>
            </div>

            {/* Donate CTA Button */}
            <Button
              asChild
              className="mt-8 h-14 w-full rounded-2xl bg-accent text-base font-extrabold text-accent-foreground shadow-md hover:bg-accent/90 hover:scale-[1.01] transition-all cursor-pointer"
            >
              <Link href={`/donate?campaignId=${campaign._id}`}>
                <Heart className="mr-2 ml-2 size-5 fill-current" />
                {t("common.donate_to_campaign", "Donate to this campaign")}
              </Link>
            </Button>

            {/* Share Campaign Button */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 py-3 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="size-4 text-emerald-600" />
                  <span>{t("common.copied", "Copied to Clipboard!")}</span>
                </>
              ) : (
                <>
                  <Share2 className="size-4 text-slate-500" />
                  <span>{t("common.share_campaign", "Share Campaign Link")}</span>
                </>
              )}
            </button>

            {/* Direct Support / Inquiry */}
            <div className="mt-6 border-t border-slate-100 pt-5 text-center">
              <p className="text-xs text-slate-500 font-medium">
                {t("common.need_assistance", "Have questions about this campaign or want to donate via Bank Transfer?")}
              </p>
              <Link
                href="/contact"
                className="mt-1.5 inline-block text-xs font-bold text-navy hover:text-accent transition-colors underline"
              >
                {t("common.contact_team", "Contact Our NGO Secretariat")}
              </Link>
            </div>
          </div>
        </aside>

      </div>
    </article>
  )
}
