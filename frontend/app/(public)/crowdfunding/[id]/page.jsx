import { getCrowdfundingById } from "@/service/crowdfunding.service"
import { CampaignDetailClient } from "@/components/pages/campaign-detail-client"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function generateMetadata({ params }) {
  const { id } = await params
  try {
    const res = await getCrowdfundingById(id)
    if (res?.success && res.campaign) {
      return { title: `${res.campaign.title} | Crowdfunding` }
    }
  } catch (error) {}
  return { title: "Campaign Details | Crowdfunding" }
}

export default async function CampaignDetailPage({ params }) {
  const { id } = await params

  let initialCampaign = null
  try {
    const res = await getCrowdfundingById(id)
    if (res?.success && res.campaign) {
      initialCampaign = res.campaign
    }
  } catch (error) {
    console.error("Initial campaign fetch error on server:", error)
  }

  return <CampaignDetailClient id={id} initialCampaign={initialCampaign} />
}
