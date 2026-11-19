import { PageHero } from "@/components/pages/page-hero"
import { FounderMessageSection } from "@/components/sections/founder-message"
import { getSiteContentById } from "@/service/site-content.service"
import { getTrustees } from "@/service/trustee.service"
import { toAbsoluteFileUrl } from "@/lib/utils"
import { Sparkles, ShieldCheck, Mail, Phone, Globe, Quote } from "lucide-react"

export const dynamic = "force-dynamic"
export const metadata = { title: "Founder & Trustees" }

function PersonShowcaseCard({ person, fallbackImage }) {
  const photoUrl = toAbsoluteFileUrl(person.photo?.url) || fallbackImage || "/placeholder-user.png"
  const designation = person.designation || (person.category === "inspirational_person" ? "Inspiration & Guiding Light" : "Board of Trustees")
  const subtext = designation ? (designation.includes("Rabbi Association") ? designation : `${designation} | Rabbi Association`) : "Rabbi Association"

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-8 sm:p-12 lg:p-14 border border-slate-200/80 shadow-xl transition-all duration-300 hover:shadow-2xl">
      {/* Decorative ambient blurred shapes */}
      <div className="absolute -left-20 -top-20 size-80 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 size-80 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-12 relative z-10">
        {/* Photo Container with offset orange accent frame */}
        <div className="lg:col-span-5 relative mx-auto w-full max-w-[320px] sm:max-w-[360px] lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-border bg-slate-100">
            <img
              src={photoUrl}
              alt={person.name}
              className="size-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent pointer-events-none" />
          </div>
          {/* Signature offset orange accent frame */}
          <div className="absolute -bottom-5 -right-5 -z-10 h-full w-full rounded-3xl border-4 border-accent hidden sm:block" />
        </div>

        {/* Content Side */}
        <div className="lg:col-span-7 relative flex flex-col justify-between text-center sm:text-left">
          <div>
            {/* Orange Quote Icon Badge */}
            <div className="mb-6 inline-flex size-12 md:size-14 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/20">
              <Quote className="size-6 fill-current" />
            </div>

            {/* Title / Role */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-navy">
              {designation}
            </h3>

            {/* Message / Description */}
            {person.description && (
              <div className="mt-5 text-sm md:text-base text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                <p>{person.description}</p>
              </div>
            )}
          </div>

          {/* Signature / Author Footer Block */}
          <div className="mt-8 border-t border-slate-200/80 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-extrabold text-navy text-lg md:text-xl uppercase tracking-wider">
                {person.name}
              </p>
              <p className="text-sm font-semibold text-slate-500 mt-1">
                {subtext}
              </p>
            </div>

            {/* Contact Links */}
            {(person.email || person.phone || person.website) && (
              <div className="flex items-center gap-2 self-center sm:self-auto">
                {person.email && (
                  <a
                    href={`mailto:${person.email}`}
                    className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-accent hover:text-white transition-all shadow-xs"
                    title={person.email}
                  >
                    <Mail className="size-4" />
                  </a>
                )}
                {person.phone && (
                  <a
                    href={`tel:${person.phone}`}
                    className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-accent hover:text-white transition-all shadow-xs"
                    title={person.phone}
                  >
                    <Phone className="size-4" />
                  </a>
                )}
                {person.website && (
                  <a
                    href={person.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-accent hover:text-white transition-all shadow-xs"
                    title={person.website}
                  >
                    <Globe className="size-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

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
    if (resTrustees?.success && Array.isArray(resTrustees.trustees)) {
      trusteesList = resTrustees.trustees
    }
  } catch (error) {
    console.error("Failed to fetch trustees:", error)
  }

  // Fallback data if DB has no records yet
  if (!Array.isArray(trusteesList) || !trusteesList.length) {
    trusteesList = [
      {
        _id: "default-1",
        name: "Late Shri Chandra Pal Singh",
        category: "inspirational_person",
        designation: "Inspiration & Guiding Light",
        description:
          "A dedicated teacher whose life reflected a deep commitment to education, ethical values, and service. Our organizational philosophy and commitment to humanity are inspired by his enduring legacy.",
        photo: { url: "/placeholder-user.png" },
      },
      {
        _id: "default-2",
        name: "Board of Trustees",
        category: "trustee",
        designation: "Managing Trustee",
        description:
          "Stewarding the strategic direction, ethical governance, and social initiatives of the Rabbi Association with integrity and dedication to community upliftment.",
        photo: { url: "/placeholder-user.png" },
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
          
          <div className="mx-auto max-w-6xl px-4 lg:px-8 relative z-10">
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

            <div className="space-y-12">
              {inspirationalPersons.map((person) => (
                <PersonShowcaseCard
                  key={person._id}
                  person={person}
                  fallbackImage="/placeholder-user.png"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Board of Trustees Section */}
      {trustees.length > 0 && (
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
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

            <div className="space-y-12">
              {trustees.map((trustee) => (
                <PersonShowcaseCard
                  key={trustee._id}
                  person={trustee}
                  fallbackImage="/placeholder-user.png"
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
