import { PageHero } from "@/components/pages/page-hero";
import { ImpactStats } from "@/components/sections/impact-stats";
import { FocusAreas } from "@/components/sections/focus-areas";
import { CtaBand } from "@/components/sections/cta-band";
import { getSiteContentById } from "@/service/site-content.service";
import Image from "next/image";

export const metadata = {
  title: "About Us | Rabbi Association",
  description: "Connecting Rabbi Association across India and promoting the scholarly, intellectual and humanitarian values of Rabbi Association."
}

export default async function Page() {
  let contentHtml = null;
  let title = "Rabbi Association";
  let image = "/rabbi-context/image copy 4.png";

  try {
    const res = await getSiteContentById("about_us");
    if (res?.success && res?.content) {
      const siteData = res.content;
      if (siteData.content) contentHtml = siteData.content;
      if (siteData.title) title = siteData.title;
      if (siteData.image?.url) image = siteData.image.url;
    }
  } catch (e) {
    console.error("Failed to fetch about content", e);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        eyebrow="About Us"
        title={title}
        description="Connecting Rabbi Association across India and promoting the scholarly, intellectual and humanitarian values of Rabbi Association."
        image="/rabbi-context/image copy 4.png"
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg prose-slate prose-a:text-primary max-w-none">
              {contentHtml ? (
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-navy mb-6">Rabbi Association</h2>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    The Rabbi Association was established to strengthen the relationship between Rabbi Association and its graduates around the world and to provide a global platform for cooperation and engagement.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    The organization is non-political and non-partisan. We welcome individuals from diverse backgrounds and seek to build a culture of fraternity, cooperation, academic exchange, and mutual respect.
                  </p>
                </>
              )}
            </div>
            
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-square lg:aspect-auto lg:h-[600px]">
              <Image 
                src={image} 
                alt="About Us" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <ImpactStats />
      <FocusAreas />
      <CtaBand />
    </main>
  );
}
