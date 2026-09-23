import { PageHero } from "@/components/pages/page-hero";
import { Users } from "lucide-react";
import { MembershipFormClient } from "@/components/forms/membership-form";
import { getSiteContentById } from "@/service/site-content.service";

export const metadata = {
  title: "Membership Registration | Rabbi Association",
  description: "Join our global network of educational professionals.",
};

export default async function MembershipPage() {
  let contentData = null;
  
  try {
    const res = await getSiteContentById("membership_info");
    if (res?.success) {
      contentData = res.data || res.content;
    }
  } catch (error) {
    // silently fallback
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        title={contentData?.title || "Membership Registration"}
        description="Join a community dedicated to educational excellence and social development."
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Get Involved", href: "/volunteer" },
          { label: "Membership", href: "/membership" },
        ]}
      />

      <div className="py-20">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          
          <div className="mb-12 text-center">
            <div className="flex size-20 mx-auto items-center justify-center rounded-full bg-accent/10 mb-6">
              <Users className="size-10 text-accent-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-navy mb-4">Become a Member</h2>
            
            {contentData?.content ? (
              <div 
                className="text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto prose prose-slate" 
                dangerouslySetInnerHTML={{ __html: contentData.content }} 
              />
            ) : (
              <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
                We welcome educators, administrators, philanthropists, and individuals who share our vision of making life better through education. As a member, you will have the opportunity to participate in our initiatives, attend training sessions, and contribute to our educational projects.
              </p>
            )}
          </div>
          
          {/* Form Section */}
          <div className="relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
            
            <div className="relative z-10">
              <MembershipFormClient />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
