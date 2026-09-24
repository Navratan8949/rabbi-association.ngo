import { PageHero } from "@/components/pages/page-hero";
import { CheckCircle2, ShieldCheck, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { getSiteContentById } from "@/service/site-content.service";

export const metadata = {
  title: "12A / 80G Information | Rabbi Association",
  description:
    "Learn about the tax benefits of donating to Rabbi Association under Section 80G.",
};

export default async function TaxInfoPage() {
  let contentHtml = null;
  let pageTitle = "12A & 80G Information";

  try {
    const res = await getSiteContentById("tax_exemptions");
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
        description="Your contributions are eligible for tax deductions under the Income Tax Act, 1961."
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "12A / 80G Information", href: "/80g-12a" },
        ]}
      />

      <div className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {contentHtml ? (
              <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 prose prose-lg prose-slate max-w-none prose-a:text-primary">
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                <div className="pt-8">
                  <Button
                    asChild
                    size="lg"
                    className="bg-accent text-navy hover:bg-accent/90 rounded-full font-bold px-8"
                  >
                    <Link href="/donate">
                      <Heart className="mr-2 size-5" />
                      Donate Now
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/20 p-3 rounded-xl shrink-0">
                    <ShieldCheck className="size-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2">
                      12A Registration
                    </h3>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      Rabbi Association is a recognized charitable organization
                      registered under Section 12A of the Income Tax Act, 1961.
                      This certifies our non-profit status and ensures our income
                      is exempt from tax, meaning 100% of our funds go towards our
                      mission.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="size-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2">
                      80G Tax Deduction
                    </h3>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      All donations made to Rabbi Association are eligible for a
                      50% tax deduction under Section 80G of the Income Tax Act,
                      1961. When you donate, you not only change lives but also
                      save on your taxes.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-navy mb-4">
                    How to claim your deduction?
                  </h4>
                  <ol className="list-decimal list-inside text-sm text-slate-600 space-y-2 font-medium">
                    <li>
                      Make a donation via bank transfer, cheque, or online
                      payment.
                    </li>
                    <li>Provide your PAN Card number and contact details.</li>
                    <li>
                      Receive an 80G receipt automatically via email or post.
                    </li>
                    <li>
                      Submit the receipt to your CA or during your ITR filing.
                    </li>
                  </ol>
                </div>

                <div className="pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-accent text-navy hover:bg-accent/90 rounded-full font-bold px-8"
                  >
                    <Link href="/donate">
                      <Heart className="mr-2 size-5" />
                      Donate Now
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            <div className="bg-navy p-10 rounded-3xl text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <h3 className="text-2xl font-bold mb-6 relative z-10">
                Account Details
              </h3>
              <div className="space-y-6 relative z-10 font-medium">
                <div>
                  <p className="text-white/60 text-sm mb-1 uppercase tracking-wider font-bold">
                    Account Name
                  </p>
                  <p className="text-lg">Rabbi Association</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1 uppercase tracking-wider font-bold">
                    Bank Name
                  </p>
                  <p className="text-lg">State Bank of India (Example)</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1 uppercase tracking-wider font-bold">
                    Account Number
                  </p>
                  <p className="text-lg font-mono">XXXX-XXXX-XXXX-1234</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1 uppercase tracking-wider font-bold">
                    IFSC Code
                  </p>
                  <p className="text-lg font-mono">SBIN000XXXX</p>
                </div>
                <div className="pt-6 border-t border-white/20">
                  <p className="text-white/80 text-sm italic">
                    Note: Please email the transaction reference to
                    rabbi.association16@gmail.com along with your PAN details to
                    receive your 80G receipt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
