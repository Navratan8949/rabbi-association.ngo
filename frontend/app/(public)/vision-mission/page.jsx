import { PageHero } from "@/components/pages/page-hero";
import { Target, Eye } from "lucide-react";

import { getSiteContentById } from "@/service/site-content.service";

export const metadata = {
  title: "Mission & Vision | Rabbi Association",
  description: "Witnessing Christ Through Education. Making Life Better Through Education.",
};

export default async function VisionMissionPage() {
  let contentHtml = null;
  let pageTitle = "Mission & Vision";

  try {
    const res = await getSiteContentById("vision_mission");
    if (res?.success && res?.content) {
      if (res.content.content) contentHtml = res.content.content;
      if (res.content.title) pageTitle = res.content.title;
    }
  } catch (error) {
    // Content not found or error fetching. Fallback will be used.
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        title={pageTitle}
        description="Education with Purpose. Excellence with Values."
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Mission & Vision", href: "/vision-mission" },
        ]}
      />

      <div className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          
          {contentHtml ? (
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 prose prose-lg prose-slate max-w-none prose-a:text-primary">
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12">
              
              {/* Vision */}
              <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-accent/10 mb-8">
                  <Eye className="size-8 text-accent" />
                </div>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent mb-4">OUR VISION</h2>
                <h3 className="text-2xl font-bold text-navy mb-6">Witnessing Christ Through Education</h3>
                <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                  Rabbi Association exists to witness to the teachings of Christ the Rabbi—our Teacher, Model, and Guide, led by the Holy Spirit, the Advocate.
                </p>
                <p className="text-slate-600 leading-relaxed font-medium">
                  We envision a society where education forms minds, shapes character, inspires responsible leadership, upholds human dignity, and transforms lives through love, truth, justice, compassion, and service.
                </p>
                <div className="mt-8 pt-8 border-t border-slate-100 w-full">
                  <p className="text-lg font-bold text-navy italic">"Making Life Better Through Education."</p>
                </div>
              </div>

              {/* Mission */}
              <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 mb-8">
                  <Target className="size-8 text-primary" />
                </div>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">OUR MISSION</h2>
                <h3 className="text-2xl font-bold text-navy mb-6">Christ-Centred Education & Service</h3>
                <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                  Rabbi Association exists to serve humanity through Christ-centred education, guided by Christ the Rabbi—our Teacher, Model, and Guide—and led by the Holy Spirit, the Advocate.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                  We are committed to making life better through quality education, empowering people, strengthening educational institutions, creating equal opportunities, and supporting sustainable social development.
                </p>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Through professional consultancy, institutional development, capacity building, and meaningful partnerships, we strive to transform lives, build stronger communities, and create lasting positive impact—rooted in faith, love, integrity, excellence, and service.
                </p>
                <div className="mt-8 pt-8 border-t border-slate-100 w-full">
                  <p className="text-lg font-bold text-primary italic">"Educate with Purpose. Empower with Values. Serve with Love."</p>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </main>
  );
}
