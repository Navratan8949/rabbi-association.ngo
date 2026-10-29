import { PageHero } from "@/components/pages/page-hero"
import { FounderMessageSection } from "@/components/sections/founder-message"
import { getSiteContentById } from "@/service/site-content.service"
import { getTrustees } from "@/service/trustee.service"
import { Sparkles, ShieldCheck, Mail, Phone, Globe, Heart, Quote } from "lucide-react"

export const metadata = { title: "Founder & Trustees" }

export default async function Page() {
  let founderData = null
  let trusteesList = []

  try {
    const res = await getSiteContentById("founder_message")
    if (res?.success && res?.content) {
      founderData = res.content
    }
  } catch (error) {
    // Content not found or error fetching
  }

  try {
    const resTrustees = await getTrustees({ status: "active" })
    if (resTrustees?.success && resTrustees.trustees) {
      trusteesList = resTrustees.trustees
    }
  } catch (error) {
    console.error("Failed to fetch trustees:", error)
  }

  // Fallback data if DB has no records yet
  if (!trusteesList.length) {
    trusteesList = [
      {
        _id: "default-1",
        name: "Late Shri Chandra Pal Singh",
        category: "inspirational_person",
        designation: "Inspiration & Guiding Light",
        description:
          "A dedicated teacher whose life reflected a deep commitment to education, ethical values, and service. Our organizational philosophy and commitment to humanity are inspired by his enduring legacy.",
        photo: { url: "" },
      },
      {
        _id: "default-2",
        name: "Board of Trustees",
        category: "trustee",
        designation: "Managing Trustee",
        description:
          "Stewarding the strategic direction, ethical governance, and social initiatives of the Rabbi Association.",
        photo: { url: "" },
      }
    ]
  }

  const inspirationalPersons = trusteesList.filter(
    (t) => t.category === "inspirational_person"
  )
  const trustees = trusteesList.filter(
    (t) => t.category !== "inspirational_person"
  )

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        eyebrow="Leadership & Heritage"
        title="Founder & Trustees"
        description="Learn more about the visionaries, trustees, and guiding inspirations behind Rabbi Association."
        image="/hero-community-education-india.png"
      />

      {/* 1. Founder's Message Section */}
      <FounderMessageSection data={founderData} />

      {/* 2. Inspirational Figures / Guiding Light Section */}
      {inspirationalPersons.length > 0 && (
        <section className="py-16 md:py-24 bg-white border-y border-slate-200/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 size-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
          
          <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 mb-4 border border-amber-200">
                <Sparkles className="size-3.5 text-amber-600" /> Inspiration & Guiding Light
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">
                Honoring Our Guiding Inspirations
              </h2>
              <p className="mt-4 text-base text-slate-600 font-medium">
                Our mission is built upon the timeless principles, sacrifice, and dedication of the visionaries whose values inspire our daily service.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 justify-center max-w-5xl mx-auto">
              {inspirationalPersons.map((person) => (
                <div
                  key={person._id}
                  className="group relative flex flex-col sm:flex-row gap-6 bg-gradient-to-br from-amber-50/40 via-white to-slate-50/80 rounded-3xl p-6 sm:p-8 border border-amber-200/70 shadow-sm hover:shadow-md hover:border-amber-400/60 transition-all duration-300"
                >
                  {/* Portrait */}
                  <div className="size-32 sm:size-36 shrink-0 mx-auto sm:mx-0 overflow-hidden rounded-2xl border-2 border-amber-200 bg-white shadow-md relative">
                    <img
                      src={
                        person.photo?.url ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=d97706&color=fff&size=256`
                      }
                      alt={person.name}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-user.svg"
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-col justify-center text-center sm:text-left flex-1">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/60 px-2.5 py-0.5 rounded-full w-fit mx-auto sm:mx-0 mb-2 border border-amber-200/60">
                      {person.designation || "Inspiration & Guiding Light"}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-navy leading-snug">
                      {person.name}
                    </h3>
                    {person.description && (
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed font-medium">
                        "{person.description}"
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Board of Trustees Section */}
      {trustees.length > 0 && (
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-800 mb-4 border border-blue-200">
                <ShieldCheck className="size-3.5 text-blue-600" /> Governance & Leadership
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">
                Board of Trustees
              </h2>
              <p className="mt-4 text-base text-slate-600 font-medium">
                The distinguished individuals providing governance, leadership, and ethical stewardship to the Rabbi Association.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {trustees.map((trustee) => (
                <div
                  key={trustee._id}
                  className="group flex flex-col bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-lg hover:border-blue-500/30 transition-all duration-300"
                >
                  {/* Photo Banner */}
                  <div className="h-72 w-full bg-slate-100 overflow-hidden relative flex items-center justify-center border-b border-slate-100">
                    <img
                      src={
                        trustee.photo?.url ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(trustee.name)}&background=051e57&color=fff&size=256`
                      }
                      alt={trustee.name}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-user.svg"
                      }}
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md w-fit mb-2 border border-blue-100">
                      {trustee.designation || "Trustee"}
                    </span>
                    <h3 className="text-xl font-bold text-navy">
                      {trustee.name}
                    </h3>
                    
                    {trustee.description && (
                      <p className="mt-3 text-sm text-slate-600 font-medium leading-relaxed line-clamp-4">
                        {trustee.description}
                      </p>
                    )}

                    {/* Contact links if provided */}
                    {(trustee.email || trustee.phone || trustee.website) && (
                      <div className="mt-auto pt-6 border-t border-slate-100 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
                        {trustee.email && (
                          <a
                            href={`mailto:${trustee.email}`}
                            className="inline-flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                            title={trustee.email}
                          >
                            <Mail className="size-3.5 text-slate-400" />
                            <span className="truncate max-w-[150px]">{trustee.email}</span>
                          </a>
                        )}
                        {trustee.phone && (
                          <a
                            href={`tel:${trustee.phone}`}
                            className="inline-flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                          >
                            <Phone className="size-3.5 text-slate-400" />
                            <span>{trustee.phone}</span>
                          </a>
                        )}
                        {trustee.website && (
                          <a
                            href={trustee.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                          >
                            <Globe className="size-3.5 text-slate-400" />
                            <span>Website</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
