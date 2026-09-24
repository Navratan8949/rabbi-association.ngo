import { PageHero } from "@/components/pages/page-hero";
import Image from "next/image";
import { Mail, Phone, Globe } from "lucide-react";
import { getTeams } from "@/service/team.service";

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export const metadata = {
  title: "Team Members | Rabbi Association",
  description:
    "Meet the dedicated team behind Rabbi Association's mission to make life better through education.",
};

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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow"
              >
                <div className="relative h-72 w-full bg-slate-100 overflow-hidden flex items-center justify-center">
                  {member.photo?.url || member.image ? (
                    <Image
                      src={member.photo?.url || member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-slate-400 font-medium">No Image</span>
                  )}

                  {/* Social Links Overlay */}
                  {member.socialLinks &&
                    (member.socialLinks.facebook ||
                      member.socialLinks.instagram ||
                      member.socialLinks.linkedin ||
                      member.socialLinks.twitter) && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        {member.socialLinks.facebook && (
                          <a
                            href={member.socialLinks.facebook}
                            target="_blank"
                            rel="noreferrer"
                            className="flex size-10 items-center justify-center rounded-full bg-white text-navy hover:text-accent shadow-md transition-colors"
                          >
                            <FacebookIcon className="size-4" />
                          </a>
                        )}
                        {member.socialLinks.instagram && (
                          <a
                            href={member.socialLinks.instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="flex size-10 items-center justify-center rounded-full bg-white text-navy hover:text-accent shadow-md transition-colors"
                          >
                            <InstagramIcon className="size-4" />
                          </a>
                        )}
                        {member.socialLinks.twitter && (
                          <a
                            href={member.socialLinks.twitter}
                            target="_blank"
                            rel="noreferrer"
                            className="flex size-10 items-center justify-center rounded-full bg-white text-navy hover:text-accent shadow-md transition-colors"
                          >
                            <TwitterIcon className="size-4" />
                          </a>
                        )}
                        {member.socialLinks.linkedin && (
                          <a
                            href={member.socialLinks.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="flex size-10 items-center justify-center rounded-full bg-white text-navy hover:text-accent shadow-md transition-colors"
                          >
                            <LinkedinIcon className="size-4" />
                          </a>
                        )}
                      </div>
                    )}
                </div>

                <div className="p-8 text-center">
                  <h3 className="text-xl font-bold text-navy mb-2">
                    {member.name}
                  </h3>
                  <div className="text-sm font-bold uppercase tracking-wider text-accent mb-4">
                    {member.designation || member.role}
                  </div>

                  {member.description && (
                    <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6">
                      {member.description}
                    </p>
                  )}

                  {/* Contact Info */}
                  {(member.email || member.phone || member.website) && (
                    <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2 items-center text-sm text-slate-500 font-medium">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                          <Mail className="size-3.5" />
                          <span className="truncate max-w-[200px]">
                            {member.email}
                          </span>
                        </a>
                      )}
                      {member.phone && (
                        <a
                          href={`tel:${member.phone.replace(/\s/g, "")}`}
                          className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                          <Phone className="size-3.5" />
                          {member.phone}
                        </a>
                      )}
                      {member.website && (
                        <a
                          href={member.website}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                          <Globe className="size-3.5" />
                          <span className="truncate max-w-[200px]">
                            {member.website.replace(/^https?:\/\//, "")}
                          </span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
