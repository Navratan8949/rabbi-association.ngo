import { PageHero } from "@/components/pages/page-hero";
import { VolunteerFormClient } from "@/components/forms/volunteer-form";
import { HandHeart, Users, GraduationCap, CheckCircle2 } from "lucide-react";
import { getSiteContentById } from "@/service/site-content.service";

export const metadata = {
  title: "Volunteer with Us | Rabbi Association",
  description: "Join our volunteer network to make a lasting impact in education.",
};

export default async function VolunteerPage() {
  let contentData = null;
  
  try {
    const res = await getSiteContentById("volunteer_info");
    if (res?.success) {
      contentData = res.data || res.content;
    }
  } catch (error) {
    // silently fallback
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        title={contentData?.title || "Volunteer with Us"}
        description="Contribute your time, skills, and passion to empower educators and build better schools."
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Get Involved", href: "/csr" },
          { label: "Volunteer", href: "/volunteer" },
        ]}
      />

      <div className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left side: Information */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-accent/10 p-3 rounded-2xl">
                    <HandHeart className="size-6 text-accent-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold text-navy">Make an Impact</h2>
                </div>
                
                {contentData?.content ? (
                  <div 
                    className="text-slate-600 font-medium prose prose-slate max-w-none mb-6" 
                    dangerouslySetInnerHTML={{ __html: contentData.content }} 
                  />
                ) : (
                  <>
                    <p className="text-slate-600 font-medium leading-relaxed mb-6">
                      Volunteers are the backbone of Rabbi Association. By volunteering with us, you directly contribute to shaping the future of education in underprivileged areas.
                    </p>
                    
                    <h3 className="font-bold text-navy mb-4">Current Opportunities:</h3>
                    <ul className="space-y-4 mb-6">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="size-5 text-accent mt-0.5 shrink-0" />
                        <span className="text-slate-600 text-sm font-medium">Guest Lecturers & Mentors</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="size-5 text-accent mt-0.5 shrink-0" />
                        <span className="text-slate-600 text-sm font-medium">Event Coordination (Health Camps, Seminars)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="size-5 text-accent mt-0.5 shrink-0" />
                        <span className="text-slate-600 text-sm font-medium">Fundraising & Campaign Ambassadors</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="size-5 text-accent mt-0.5 shrink-0" />
                        <span className="text-slate-600 text-sm font-medium">Digital Marketing & Content Creation</span>
                      </li>
                    </ul>
                  </>
                )}

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mt-6">
                  <p className="text-sm text-slate-500 font-medium italic">
                    Note: A certificate of appreciation will be provided upon successful completion of your volunteering tenure.
                  </p>
                </div>
              </div>

              {/* Stats */}
              {!contentData?.content && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-navy p-6 rounded-3xl text-center text-white">
                    <Users className="size-8 mx-auto text-accent mb-3" />
                    <div className="text-3xl font-bold mb-1">500+</div>
                    <div className="text-white/80 text-sm font-medium">Active Volunteers</div>
                  </div>
                  <div className="bg-white p-6 rounded-3xl text-center border border-slate-100 shadow-sm">
                    <GraduationCap className="size-8 mx-auto text-navy mb-3" />
                    <div className="text-3xl font-bold text-navy mb-1">10k+</div>
                    <div className="text-slate-500 text-sm font-medium">Lives Impacted</div>
                  </div>
                </div>
              )}

            </div>

            {/* Right side: Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-lg border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                
                <div className="relative z-10 mb-8 text-center sm:text-left">
                  <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2">Volunteer Application</h2>
                  <p className="text-slate-500 font-medium">Fill out the form below and our team will get in touch with you shortly.</p>
                </div>

                <div className="relative z-10">
                  <VolunteerFormClient />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
