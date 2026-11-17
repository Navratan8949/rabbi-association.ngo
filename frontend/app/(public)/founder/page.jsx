import { PageHero } from "@/components/pages/page-hero"
import { FounderMessageSection } from "@/components/sections/founder-message"
import { getSiteContentById } from "@/service/site-content.service"
import { getTrustees } from "@/service/trustee.service"
import { TrusteesClient } from "@/components/pages/trustees-client"

export const metadata = { title: "Founder & Trustees" }

export default async function Page() {
  let founderData = null
  let trusteesList = []

  try {
    const res = await getSiteContentById("founder_message")
    if (res?.success && res?.content) {
      founderData = res.content
    }
  } catch (error) {
    // Content not found or error fetching
  }

  try {
    const resTrustees = await getTrustees({ status: "active" })
    if (resTrustees?.success && Array.isArray(resTrustees.trustees)) {
      trusteesList = resTrustees.trustees
    }
  } catch (error) {
    console.error("Failed to fetch trustees:", error)
  }

  // Fallback data if DB has no records yet
  if (!Array.isArray(trusteesList) || !trusteesList.length) {
    trusteesList = [
      {
        _id: "default-1",
        name: "Late Shri Chandra Pal Singh",
        category: "inspirational_person",
        designation: "Inspiration & Guiding Light",
        description:
          "A dedicated teacher whose life reflected a deep commitment to education, ethical values, and service. Our organizational philosophy and commitment to humanity are inspired by his enduring legacy.",
        photo: { url: "" },
      },
      {
        _id: "default-2",
        name: "Board of Trustees",
        category: "trustee",
        designation: "Managing Trustee",
        description:
          "Stewarding the strategic direction, ethical governance, and social initiatives of the Rabbi Association.",
        photo: { url: "" },
      }
    ]
  }

  const inspirationalPersons = trusteesList.filter(
    (t) => t.category === "inspirational_person"
  )
  const trustees = trusteesList.filter(
    (t) => t.category !== "inspirational_person"
  )

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        eyebrow="Leadership & Heritage"
        title="Founder & Trustees"
        description="Learn more about the visionaries, trustees, and guiding inspirations behind Rabbi Association."
        image="/hero-community-education-india.png"
      />

      {/* 1. Founder's Message Section */}
      <FounderMessageSection data={founderData} />

      {/* 2 & 3. Inspirational Figures and Board of Trustees */}
      <TrusteesClient
        inspirationalPersons={inspirationalPersons}
        trustees={trustees}
      />
    </main>
  )
}
