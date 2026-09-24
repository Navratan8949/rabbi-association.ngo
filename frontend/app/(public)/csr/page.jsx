import { PageHero } from "@/components/pages/page-hero";
import { Handshake, Target, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSiteContentById } from "@/service/site-content.service";

export const metadata = {
  title: "CSR Partnership | Rabbi Association",
  description: "Partner with Rabbi Association for meaningful Corporate Social Responsibility (CSR) initiatives.",
};

export default async function CSRPage() {
  let contentData = null;
  
  try {
    const res = await getSiteContentById("csr_partnership");
    if (res?.success) {
      contentData = res.data || res.content;
    }
  } catch (error) {
    // silently fallback
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        title={contentData?.title || "CSR Partnership"}
        description="Collaborate with us to create sustainable social impact through education."
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Get Involved", href: "/volunteer" },
          { label: "CSR Partnership", href: "/csr" },
        ]}
      />

      <div className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-accent/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              Corporate Social Responsibility
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              {contentData?.title || "Aligning Corporate Goals with Social Good"}
            </h2>
            
            {contentData?.content ? (
              <div 
                className="text-lg text-slate-600 font-medium prose prose-lg max-w-none text-left" 
                dangerouslySetInnerHTML={{ __html: contentData.content }} 
              />
            ) : (
              <p className="text-lg text-slate-600 font-medium">
                Rabbi Association is registered with the Ministry of Corporate Affairs (MCA) and is eligible to undertake CSR activities. We offer transparent, impactful, and measurable projects in the education sector.
              </p>
            )}
          </div>

          {!contentData?.content && (
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-navy/10 p-3 rounded-xl">
                    <Target className="size-6 text-navy" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy">Why Partner With Us?</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-slate-600 font-medium">Alignment with Schedule VII of the Companies Act, 2013 (Promoting Education).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-slate-600 font-medium">End-to-end project management, from baseline surveys to impact assessment.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-slate-600 font-medium">100% transparency with regular reporting and financial utilization certificates.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-slate-600 font-medium">Registered under 12A, 80G, and CSR-1 (MCA).</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-accent/10 p-3 rounded-xl">
                    <Handshake className="size-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy">Potential Areas of Collaboration</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-navy mt-0.5 shrink-0" />
                    <span className="text-slate-600 font-medium">Infrastructure development in rural schools (Classrooms, Labs, Libraries).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-navy mt-0.5 shrink-0" />
                    <span className="text-slate-600 font-medium">Teacher training and capacity building programs.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-navy mt-0.5 shrink-0" />
                    <span className="text-slate-600 font-medium">Digital literacy and smart classroom setups.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-navy mt-0.5 shrink-0" />
                    <span className="text-slate-600 font-medium">Scholarships and academic support for underprivileged children.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className="bg-navy rounded-3xl p-10 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Let's Discuss Your CSR Strategy</h3>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto relative z-10 font-medium">
              We can design custom CSR projects that align with your corporate values and create a lasting impact in the communities that need it the most.
            </p>
            <Button asChild size="lg" className="bg-accent text-navy hover:bg-accent/90 rounded-full font-bold px-10 relative z-10">
              <Link href="/contact">
                Schedule a Meeting
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </main>
  );
}
