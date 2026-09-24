import { PageHero } from "@/components/pages/page-hero";
import { ImpactStats } from "@/components/sections/impact-stats";
import { FocusAreas } from "@/components/sections/focus-areas";
import { CtaBand } from "@/components/sections/cta-band";
import { getSiteContentById } from "@/service/site-content.service";
import Image from "next/image";

export const metadata = {
  title: "About Us | Rabbi Association",
  description:
    "Connecting Rabbi Association across India and promoting the scholarly, intellectual and humanitarian values of Rabbi Association.",
};

export default async function Page() {
  let contentHtml = null;
  let title = "Rabbi Association";
  let image = "/placeholder.svg";

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
        eyebrow="Love & Service"
        title={title}
        description="Love God and Serve Humanity"
        image={image}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg prose-slate prose-a:text-primary max-w-none">
              {contentHtml ? (
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              ) : (
                <>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-2">
                    Education with Purpose. Excellence with Values.
                  </h2>
                  <h3 className="text-3xl font-bold text-navy mb-6">
                    Rabbi Association
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium mb-4">
                    Rabbi Association is an education consultancy and
                    institutional development organisation committed to
                    advancing quality education, human empowerment,
                    institutional excellence, and sustainable social
                    development.
                  </p>
                  <p className="text-slate-600 leading-relaxed font-medium mb-4">
                    Founded on 5 September 2026, Rabbi Association was
                    established with a vision to make a meaningful contribution
                    to individuals, educational institutions, and communities
                    through professional expertise guided by strong human,
                    ethical, and social values.
                  </p>
                  <p className="text-slate-600 leading-relaxed font-medium mb-4">
                    We believe that education is more than the transmission of
                    knowledge. True education forms the mind, shapes character,
                    strengthens values, develops leadership, and inspires people
                    to serve humanity.
                  </p>
                  <p className="text-slate-600 leading-relaxed font-medium mb-4">
                    Our inspiration comes from the life and teachings of Christ
                    the Rabbi—our Teacher, Model, and Guide, and from the legacy
                    of our beloved father, Late Shri Chandra Pal Singh, a
                    dedicated teacher whose life reflected a deep commitment to
                    education and service.
                  </p>
                  <p className="text-slate-600 leading-relaxed font-medium mb-6">
                    At Rabbi Association, we seek to combine professional
                    excellence with compassion, integrity, responsibility, and
                    service—helping institutions and individuals realise their
                    potential and create lasting positive impact.
                  </p>
                </>
              )}
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-square lg:aspect-auto lg:h-[600px]">
              <Image src={image} alt="About Us" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Rabbi Association Section */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-3">
              Why Rabbi Association?
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Experience with Purpose
            </h3>
            <p className="text-lg text-slate-600 font-medium">
              We believe educational consultancy should go beyond advice. Our
              approach is built around core values that ensure lasting impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "INTEGRITY",
                desc: "Honest, transparent, and responsible professional guidance.",
              },
              {
                title: "EXCELLENCE",
                desc: "A commitment to quality and continuous improvement in every educational initiative.",
              },
              {
                title: "INNOVATION",
                desc: "Encouraging modern ideas, appropriate technology, and effective educational practices.",
              },
              {
                title: "PEOPLE FIRST",
                desc: "Keeping students, educators, families, and communities at the heart of our work.",
              },
              {
                title: "SUSTAINABILITY",
                desc: "Building systems and capacities that can grow, adapt, and succeed over the long term.",
              },
              {
                title: "SOCIAL RESPONSIBILITY",
                desc: "Using education as an instrument for human development and positive social transformation.",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow"
              >
                <h4 className="text-lg font-bold text-navy mb-3">
                  {value.title}
                </h4>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="py-24 bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
        <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-3">
                Who We Serve
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Partners
              </h3>
              <p className="text-lg text-white/80 font-medium mb-10 leading-relaxed max-w-xl">
                We work collaboratively with various stakeholders in the
                education sector to build stronger institutions and communities.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {[
                "School founders and promoters",
                "Educational trusts and societies",
                "Existing schools",
                "New educational institutions",
                "School management teams",
                "Principals and academic leaders",
                "Teachers and educators",
                "Students and families",
                "Social organisations",
                "Education-focused institutions",
                "Community-based initiatives",
              ].map((partner, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="size-2 rounded-full bg-accent mt-2 shrink-0"></div>
                  <span className="text-white/90 font-medium">{partner}</span>
                </div>
              ))}
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
