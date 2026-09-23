import { PageHero } from "@/components/pages/page-hero";
import Image from "next/image";

export const metadata = {
  title: "Team Members | Rabbi Association",
  description: "Meet the dedicated team behind Rabbi Association's mission to make life better through education.",
};

import { getTeams } from "@/service/team.service";

export default async function TeamPage() {
  let team = [];
  try {
    const data = await getTeams({ status: "active" }); // Fetch active team members
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
        role: "Inspiration & Guiding Light",
        description: "A dedicated teacher whose life reflected a deep commitment to education and service. Our inspiration comes from his legacy.",
        photo: { url: "/rabbi-context/image copy 5.png" } // Backend usually sends photo.url
      },
      {
        name: "Founder / President",
        role: "Founder",
        description: "Leading the vision to make a meaningful contribution to individuals, educational institutions, and communities through professional expertise.",
        photo: { url: "/rabbi-context/image copy 4.png" }
      }
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
            <span className="inline-block rounded-full bg-accent/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground mb-4">
              Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Guided by Strong Values
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              Our team consists of passionate educators, administrators, and professionals committed to advancing quality education and human empowerment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group">
                <div className="relative h-64 w-full bg-slate-100 overflow-hidden flex items-center justify-center">
                  {(member.photo?.url || member.image) ? (
                    <Image
                      src={member.photo?.url || member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-slate-400 font-medium">No Image</span>
                  )}
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-xl font-bold text-navy mb-2">{member.name}</h3>
                  <div className="text-sm font-bold uppercase tracking-wider text-accent mb-4">
                    {member.role || member.designation}
                  </div>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}
