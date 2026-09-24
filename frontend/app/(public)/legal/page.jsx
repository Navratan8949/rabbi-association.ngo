import { PageHero } from "@/components/pages/page-hero";
import { Shield, FileText, CheckCircle2, Building, Scale } from "lucide-react";

import { getSiteContentById } from "@/service/site-content.service";

export const metadata = {
  title: "Registration & Legal Details | Rabbi Association",
  description:
    "Legal documentation, 12A, 80G, and CSR registration details for Rabbi Association.",
};

export default async function LegalPage() {
  let contentHtml = null;
  let pageTitle = "Registration & Legal Details";

  try {
    const res = await getSiteContentById("legal_details");
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
        description="We are committed to complete transparency, legal compliance, and accountability in all our operations."
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Legal Details", href: "/legal" },
        ]}
      />

      <div className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-accent/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              Transparency
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Our Legal & Statutory Compliances
            </h2>
            <p className="text-lg text-slate-600">
              Rabbi Association is a registered non-profit organization
              complying with all the necessary legal frameworks mandated by the
              Government of India.
            </p>
          </div>

          {contentHtml ? (
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 prose prose-lg prose-slate max-w-none prose-a:text-primary mx-auto">
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Trust Registration */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-navy/5 text-navy rounded-full flex items-center justify-center mb-6">
                  <Building className="size-8" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">
                  Trust Registration
                </h3>
                <p className="text-slate-600 mb-6 flex-grow">
                  Registered under the Indian Trusts Act, 1882. We are legally
                  recognized to carry out educational and social welfare
                  activities.
                </p>
                <div className="w-full pt-6 border-t border-slate-100">
                  <div className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                    Status: Active
                  </div>
                </div>
              </div>

              {/* 12A Registration */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-accent/10 text-[#c0783d] rounded-full flex items-center justify-center mb-6">
                  <Shield className="size-8" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">
                  12A Registration
                </h3>
                <p className="text-slate-600 mb-6 flex-grow">
                  Registered under Section 12A of the Income Tax Act, 1961,
                  recognizing our organization as a legitimate non-profit entity.
                </p>
                <div className="w-full pt-6 border-t border-slate-100">
                  <div className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                    Exempted Entity
                  </div>
                </div>
              </div>

              {/* 80G Registration */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-[#c0783d]/10 text-[#c0783d] rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="size-8" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">
                  80G Tax Exemption
                </h3>
                <p className="text-slate-600 mb-6 flex-grow">
                  Donations made to Rabbi Association are eligible for 50% tax
                  exemption under Section 80G of the Income Tax Act, 1961.
                </p>
                <div className="w-full pt-6 border-t border-slate-100">
                  <div className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                    Tax Deductible
                  </div>
                </div>
              </div>

              {/* CSR Registration */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center md:col-span-2 lg:col-span-1">
                <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                  <FileText className="size-8" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">
                  CSR-1 Certified
                </h3>
                <p className="text-slate-600 mb-6 flex-grow">
                  Registered with the Ministry of Corporate Affairs (MCA) to
                  undertake CSR activities for corporates.
                </p>
                <div className="w-full pt-6 border-t border-slate-100">
                  <div className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                    Eligible for CSR
                  </div>
                </div>
              </div>

              {/* FCRA (Optional/Future) */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center md:col-span-2">
                <div className="h-16 w-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-6">
                  <Scale className="size-8" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">
                  Commitment to Law & Order
                </h3>
                <p className="text-slate-600 mb-6 flex-grow">
                  We strictly adhere to all national guidelines, auditing norms,
                  and reporting standards to ensure every rupee is utilized
                  correctly for the betterment of society. All our financial
                  records are audited annually by certified Chartered Accountants.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
