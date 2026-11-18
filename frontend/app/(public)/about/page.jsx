import { PageHero } from "@/components/pages/page-hero";
import { ImpactStats } from "@/components/sections/impact-stats";
import { FocusAreas } from "@/components/sections/focus-areas";
import { CtaBand } from "@/components/sections/cta-band";
import { getSiteContentById } from "@/service/site-content.service";
import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";
import { Target } from "lucide-react";

export const metadata = {
  title: "About Us",
  description:
    "Connecting Rabbi Association across India and promoting the scholarly, intellectual and humanitarian values of Rabbi Association.",
};

export default async function Page() {
  let contentHtml = null;
  let title = "Rabbi Association";
  let image = "/rabbi-context/about_us_classroom.jpg";

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

      <section className="relative py-24 bg-white overflow-hidden">
        {/* Subtle Background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content Area */}
            <div className="order-2 lg:order-1">
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <h2 className="text-sm font-bold uppercase tracking-widest text-accent text-left">
                    Education with Purpose. Excellence with Values.
                  </h2>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-extrabold text-navy mb-8 leading-[1.15] text-left">
                  Transforming Lives Through <span className="text-accent">Education</span>
                </h3>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="prose prose-lg prose-slate prose-a:text-primary max-w-none text-justify border-l-0 pl-0 md:border-l-4 md:border-accent/20 md:pl-6">
                  {contentHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                  ) : (
                    <>
                      <p className="text-slate-600 leading-relaxed font-medium mb-5">
                        Rabbi Association is an education consultancy and
                        institutional development organisation committed to
                        advancing quality education, human empowerment,
                        institutional excellence, and sustainable social
                        development.
                      </p>
                      <p className="text-slate-600 leading-relaxed font-medium mb-5">
                        Founded on 5 September 2026, Rabbi Association was
                        established with a vision to make a meaningful contribution
                        to individuals, educational institutions, and communities
                        through professional expertise guided by strong human,
                        ethical, and social values.
                      </p>
                      <p className="text-slate-600 leading-relaxed font-medium mb-5">
                        We believe that education is more than the transmission of
                        knowledge. True education forms the mind, shapes character,
                        strengthens values, develops leadership, and inspires people
                        to serve humanity.
                      </p>
                      <p className="text-slate-600 leading-relaxed font-medium mb-5">
                        Our inspiration comes from the life and teachings of Christ
                        the Rabbi—our Teacher, Model, and Guide, and from the legacy
                        of our beloved father, Late Shri Chandra Pal Singh, a
                        dedicated teacher whose life reflected a deep commitment to
                        education and service.
                      </p>
                      <p className="text-slate-600 leading-relaxed font-medium">
                        At Rabbi Association, we seek to combine professional
                        excellence with compassion, integrity, responsibility, and
                        service—helping institutions and individuals realise their
                        potential and create lasting positive impact.
                      </p>
                    </>
                  )}
                </div>
              </Reveal>
            </div>

            {/* Right Image Area - Premium Design */}
            <div className="order-1 lg:order-2">
              <Reveal delay={0.2} className="relative">
                {/* Decorative Box Behind */}
                <div className="absolute -inset-4 bg-accent/10 rounded-[2.5rem] transform rotate-3 scale-105 transition-transform duration-500 hover:rotate-6 hidden md:block" />
                
                {/* Main Image Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-auto lg:h-[650px] border-8 border-white group">
                  <Image 
                    src={image} 
                    alt="About Us" 
                    fill 
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-10 bg-white p-3 md:p-5 rounded-xl md:rounded-2xl shadow-xl flex items-center gap-2 md:gap-4 border border-slate-100 z-20">
                  <div className="h-8 w-8 md:h-12 md:w-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Target className="h-4 w-4 md:h-6 md:w-6 text-accent" />
                  </div>
                  <div className="pr-2 md:pr-4">
                    <div className="text-lg md:text-2xl font-black text-navy leading-none mb-0.5 md:mb-1">2026</div>
                    <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500 leading-none">Established</div>
                  </div>
                </div>
              </Reveal>
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
            <div className="flex flex-col items-center text-center">
              <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-3">
                Who We Serve
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Partners
              </h3>
              <p className="text-lg text-white/80 font-medium mb-10 leading-relaxed max-w-xl mx-auto">
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
