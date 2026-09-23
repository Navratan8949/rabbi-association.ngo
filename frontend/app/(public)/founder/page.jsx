import { PageHero } from "@/components/pages/page-hero"
import { FounderMessageSection } from "@/components/sections/founder-message"
import { getSiteContentById } from "@/service/site-content.service";

export const metadata = { title: "Founder & Trustee Profile | Rabbi Association" }

export default async function Page() {
  let founderData = null;

  try {
    const res = await getSiteContentById("founder_message");
    if (res?.success && res?.content) {
      founderData = res.content;
    }
  } catch (error) {
    // Content not found or error fetching. Fallback will be used.
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        eyebrow="Founder & Trustee Profile"
        title="Leadership, Vision, and Service."
        description="Learn more about the visionaries behind Rabbi Association."
        image="/hero-community-education-india.png"
      />

      <FounderMessageSection data={founderData} />
    </main>
  )
}
