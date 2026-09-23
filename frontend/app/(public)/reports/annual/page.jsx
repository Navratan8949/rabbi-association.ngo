import { PageHero } from "@/components/pages/page-hero";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getReports } from "@/service/report.service";

export const metadata = {
  title: "Annual Reports | Rabbi Association",
  description: "Download our annual reports and explore our yearly impact.",
};

export default async function AnnualReportsPage() {
  let reports = [];

  try {
    const data = await getReports({ type: "annual", status: "active" });
    if (data?.success) {
      reports = data.data || data.reports || [];
      reports = reports.filter(r => r.type === "annual" && r.status !== "inactive");
    }
  } catch (error) {
    // silently fallback
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        title="Annual Reports"
        description="A transparent look at our activities, progress, and impact over the years."
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Media & Reports", href: "/news" },
          { label: "Annual Reports", href: "/reports/annual" },
        ]}
      />

      <div className="py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          
          <div className="bg-white p-12 rounded-[2rem] shadow-sm border border-slate-100 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-accent/10 mb-6 mx-auto">
              <FileText className="size-10 text-accent-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-navy mb-4">Annual Reports Archive</h2>
            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
              We are committed to maintaining the highest standards of transparency and accountability. Our annual reports provide a comprehensive overview of our programs, financial health, and the lives we've touched.
            </p>
            
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
                          <Download className="mr-2 size-4" /> Download PDF
                        </a>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 border-dashed mt-8">
                <p className="text-slate-500 font-medium italic">
                  Our latest annual report for the current financial year is being compiled and will be available for download soon.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
