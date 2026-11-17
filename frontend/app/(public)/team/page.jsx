import { PageHero } from "@/components/pages/page-hero";
import { getTeams } from "@/service/team.service";
import { TeamListClient } from "@/components/pages/team-list-client";

export const metadata = {
  title: "Team Members",
  description: "Meet the dedicated team behind the Rabbi Association.",
};

export default async function TeamPage() {
  let team = [];
  try {
    const data = await getTeams({ status: "active" });
    if (data?.success) {
      team = data.data || data.team || [];
    }
  } catch (error) {
    console.error("Failed to fetch team members:", error);
  }

  // Fallback if empty (for UI testing)
  if (!team.length) {
    team = [
      {
        name: "Late Shri Chandra Pal Singh",
        designation: "Inspiration & Guiding Light",
        description:
          "A dedicated teacher whose life reflected a deep commitment to education and service. Our inspiration comes from his legacy.",
        photo: { url: "/placeholder.svg" },
        socialLinks: {},
      },
      {
        name: "Founder / President",
        designation: "Founder",
        description:
          "Leading the vision to make a meaningful contribution to individuals, educational institutions, and communities through professional expertise.",
        photo: { url: "/placeholder.svg" },
        socialLinks: {},
      },
    ];
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        title="Our Team"
        description="Meet the dedicated individuals who make our mission possible."
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Team Members", href: "/team" },
        ]}
      />

      <div className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-accent/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Guided by Strong Values
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              Our team consists of passionate educators, administrators, and
              professionals committed to advancing quality education and human
              empowerment.
            </p>
          </div>

          <TeamListClient team={team} />
        </div>
      </div>
    </main>
  );
}
