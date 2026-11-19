"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, Globe, Loader2 } from "lucide-react";
import { getTeams } from "@/service/team.service";
import { toAbsoluteFileUrl } from "@/lib/utils";

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

export function TeamClient({ initialTeam = [] }) {
  const [team, setTeam] = useState(initialTeam);
  const [loading, setLoading] = useState(initialTeam.length === 0);

  useEffect(() => {
    let isMounted = true;
    async function fetchFreshTeam() {
      try {
        const res = await getTeams({ status: "active" });
        if (isMounted && res?.success) {
          const freshData = res.data || res.team || [];
          if (Array.isArray(freshData) && freshData.length > 0) {
            setTeam(freshData);
          }
        }
      } catch (err) {
        console.error("Failed to fetch client team members:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchFreshTeam();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading && team.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-accent" />
      </div>
    );
  }

  if (team.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 max-w-xl mx-auto p-8 shadow-sm">
        <p className="text-lg font-bold text-navy">Leadership & Team Members</p>
        <p className="text-sm text-slate-500 mt-2">
          Official member listings are being updated. Please check back shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
      {team.map((member, index) => {
        const rawPhoto = member.photo?.url || member.image;
        const photoUrl = toAbsoluteFileUrl(rawPhoto) || "/placeholder-user.png";

        return (
          <div
            key={member._id || index}
            className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Image Container with aspect-square */}
              <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                <img
                  src={photoUrl}
                  alt={member.name}
                  className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-user.png";
                  }}
                />

                {/* Social Links Overlay */}
                {member.socialLinks &&
                  (member.socialLinks.facebook ||
                    member.socialLinks.instagram ||
                    member.socialLinks.linkedin ||
                    member.socialLinks.twitter) && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
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

              {/* Text Info */}
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
              </div>
            </div>

            {/* Contact Info Footer */}
            {(member.email || member.phone || member.mobile || member.website) && (
              <div className="px-8 pb-6 border-t border-slate-100 pt-4 flex flex-col gap-2 items-center text-sm text-slate-500 font-medium">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <Mail className="size-3.5" />
                    <span className="truncate max-w-[220px]">
                      {member.email}
                    </span>
                  </a>
                )}
                {(member.phone || member.mobile) && (
                  <a
                    href={`tel:${member.phone || member.mobile}`}
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <Phone className="size-3.5" />
                    <span>{member.phone || member.mobile}</span>
                  </a>
                )}
                {member.website && (
                  <a
                    href={
                      member.website.startsWith("http")
                        ? member.website
                        : `https://${member.website}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <Globe className="size-3.5" />
                    <span className="truncate max-w-[220px]">
                      {member.website.replace(/^https?:\/\//, "")}
                    </span>
                  </a>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

