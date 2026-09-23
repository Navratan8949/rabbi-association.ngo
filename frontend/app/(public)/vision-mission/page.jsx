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

      {/* Christ-Centred Identity & Education With Purpose */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Christ-Centred Identity */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-3">Identity</h2>
              <h3 className="text-3xl font-bold text-navy mb-8">Christ-Centred Identity</h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-bold text-navy mb-2">Christ the Rabbi — Our Teacher, Model & Guide</h4>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    The name Rabbi reflects the meaning of Teacher or Master. For Rabbi Association, this identity is inspired by Christ the Rabbi, who taught not only through words but through His life, compassion, truth, humility, and service. We seek to place education within a wider human purpose: forming people who know, understand, care, lead responsibly, and serve others.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-navy mb-2">Led by the Holy Spirit — the Advocate</h4>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    We believe that genuine transformation requires not only knowledge and professional competence, but also wisdom, conscience, compassion, and a commitment to the common good.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-navy mb-2">Love God and Serve Humanity</h4>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    This expresses the spirit behind our work: to combine professional excellence with compassion and to place knowledge and education at the service of human dignity and social development.
                  </p>
                </div>
              </div>
            </div>

            {/* Education With Purpose */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Core Philosophy</h2>
              <h3 className="text-3xl font-bold text-navy mb-8">Education with Purpose</h3>
              <p className="text-lg text-slate-600 font-medium mb-8">
                Excellence With Values. At Rabbi Association, we believe that education should help people:
              </p>
              
              <div className="grid gap-4">
                {[
                  { title: "LEARN", desc: "Gain knowledge and understanding." },
                  { title: "GROW", desc: "Develop character, confidence, and competence." },
                  { title: "LEAD", desc: "Accept responsibility and serve others." },
                  { title: "SERVE", desc: "Use knowledge for the good of society." },
                  { title: "TRANSFORM", desc: "Become agents of positive change." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 items-center">
                    <div className="size-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <span className="text-lg font-black text-accent">{idx + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy text-lg">{item.title}</h4>
                      <p className="text-slate-600 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
