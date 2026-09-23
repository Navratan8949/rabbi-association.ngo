import { PageHero } from "@/components/pages/page-hero";
import { PieChart, ShieldCheck, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getReports } from "@/service/report.service";

export const metadata = {
  title: "Financial Transparency | Rabbi Association",
  description: "View our financial statements and audit reports. We believe in complete transparency.",
};

export default async function FinancialTransparencyPage() {
  let reports = [];

  try {
    const data = await getReports({ type: "financial", status: "active" });
    if (data?.success) {
      reports = data.data || data.reports || [];
      reports = reports.filter(r => r.type === "financial" && r.status !== "inactive");
    }
  } catch (error) {
    // silently fallback
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        title="Financial Transparency"
        description="Every rupee donated is accounted for and utilized for maximum impact."
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Media & Reports", href: "/news" },
          { label: "Financial Transparency", href: "/reports/financial" },
        ]}
      />

      <div className="py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          
          <div className="bg-white p-12 rounded-[2rem] shadow-sm border border-slate-100 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-green-100 mb-6 mx-auto">
              <PieChart className="size-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-navy mb-4">Financial Statements & Audits</h2>
            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
              We operate with strict financial discipline. Our accounts are audited annually by certified independent Chartered Accountants to ensure your contributions are used effectively.
            </p>
            
            <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex items-center justify-center gap-3 mb-8">
              <ShieldCheck className="size-6 text-green-600" />
              <span className="text-green-800 font-bold">12A & 80G Certified Non-Profit</span>
            </div>

            {reports.length > 0 ? (
              <div className="space-y-4 text-left mt-8">
                {reports.map((report) => (
                  <div key={report._id} className="flex items-center justify-between bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-accent transition-colors">
                    <div>
                      <h3 className="font-bold text-navy text-xl mb-1">{report.title}</h3>
                      <p className="text-slate-500 text-sm">Financial Year {report.year}</p>
                      {report.description && <p className="text-slate-600 mt-2">{report.description}</p>}
                    </div>
                    {report.pdf?.url && (
                      <Button asChild className="bg-navy hover:bg-navy/90 text-white rounded-full">
                        <a href={report.pdf.url} target="_blank" rel="noopener noreferrer">
                          <Download className="mr-2 size-4" /> Download Statement
                        </a>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 border-dashed mt-8">
                <div className="flex justify-center mb-4">
                  <ShieldCheck className="size-8 text-slate-400" />
                </div>
                <p className="text-slate-500 font-medium italic">
                  Financial reports for the current period are undergoing review and will be published upon completion of the annual audit.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
