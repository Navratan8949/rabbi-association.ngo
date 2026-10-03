"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSiteContent } from "@/redux/features/siteContentSlice";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { SITE as DEFAULT_SITE } from "@/constants/site";
import { Reveal } from "@/components/shared/reveal";
import { FaqSection } from "@/components/sections/faq-section";

function FacebookIcon({ className }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M22 12a10 10 0 1 0-11.563 9.872v-6.988H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988A10 10 0 0 0 22 12z" />
    </svg>
  );
}
function InstagramIcon({ className }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.775.131 4.602.44 3.635 1.408 2.667 2.375 2.358 3.548 2.3 4.826 2.241 6.106 2.228 6.514 2.228 12s.013 5.894.072 7.174c.058 1.278.367 2.451 1.335 3.418.967.968 2.14 1.277 3.418 1.335C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.073c1.278-.058 2.451-.367 3.418-1.335.968-.967 1.277-2.14 1.335-3.418.059-1.28.072-1.688.072-7.174s-.013-5.894-.072-7.174c-.058-1.278-.367-2.451-1.335-3.418C19.398.44 18.225.131 16.947.072 15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}
function YoutubeIcon({ className }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Page() {
  const dispatch = useDispatch();
  const { data: siteContent } = useSelector((state) => state.siteContent);

  useEffect(() => {
    dispatch(fetchSiteContent());
  }, [dispatch]);

  let SITE = { ...DEFAULT_SITE };
  if (siteContent?.contact_info?.content) {
    try {
      const parsed = JSON.parse(siteContent.contact_info.content);
      if (parsed.address) SITE.address = parsed.address;
      if (parsed.email) SITE.email = parsed.email;
      if (parsed.phones && Array.isArray(parsed.phones)) {
        const contactPhones = parsed.phones
          .filter((p) => p.showInContact)
          .map((p) => p.number)
          .filter(Boolean);
        if (contactPhones.length > 0) SITE.phones = contactPhones;
      } else if (parsed.phone) {
        SITE.phones = [parsed.phone];
      }
      if (parsed.facebook) SITE.socials.facebook = parsed.facebook;
      if (parsed.instagram) SITE.socials.instagram = parsed.instagram;
      if (parsed.twitter) SITE.socials.twitter = parsed.twitter;
      if (parsed.youtube) SITE.socials.youtube = parsed.youtube;
    } catch (e) {}
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden flex flex-col justify-center min-h-[400px]">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed scale-105"
          style={{ backgroundImage: `url('/rabbi-context/focus_3.jpg')` }}
        />
        
        {/* Premium Dark Overlay */}
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[1px]" />
        
        {/* Subtle Gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/90" />

        {/* Subtle bottom border */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center mt-4">
          <Reveal>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-500 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)] animate-pulse" />
              Get In Touch
            </span>
            <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-[4rem] drop-shadow-xl">
              Contact <span className="text-amber-500">Us</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 font-medium drop-shadow-lg">
              We're here to assist you with membership, events, academic
              programs, collaborations, or any general inquiries.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative z-20 bg-slate-50 pt-16 pb-24 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
          {/* Left Column: Contact Cards */}
          <div className="space-y-6 lg:col-span-1">
            <Reveal delay={0.1}>
              <div className="group rounded-3xl bg-white p-8 shadow-soft border border-border/50 transition-all hover:shadow-lift hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <MapPin className="size-24 text-navy" />
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-accent shadow-lg mb-6">
                  <MapPin className="size-6" />
                </div>
                <h3 className="text-2xl font-bold text-navy">
                  Head Office
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Rabbi Association – India Branch
                  <br />
                  New Delhi, India
                </p>
                <a
                  href={SITE.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center text-sm font-bold text-accent hover:text-navy uppercase tracking-wider transition-colors"
                >
                  Get Directions <ArrowRight className="ml-2 size-4" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="group rounded-3xl bg-white p-8 shadow-soft border border-border/50 transition-all hover:shadow-lift hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Phone className="size-24 text-navy" />
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-accent shadow-lg mb-6">
                  <Phone className="size-6" />
                </div>
                <h3 className="text-2xl font-bold text-navy">
                  Phone & Email
                </h3>
                <div className="mt-4 space-y-3">
                  {SITE.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="block text-base font-medium text-muted-foreground hover:text-navy transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                  <div className="h-px w-full bg-border/60 my-4" />
                  <a
                    href={`mailto:${SITE.email}`}
                    className="block text-base font-medium text-muted-foreground hover:text-navy transition-colors break-all"
                  >
                    {SITE.email}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="rounded-3xl bg-navy p-8 shadow-soft relative overflow-hidden">

                <h3 className="text-2xl font-bold text-white relative z-10">
                  Follow Us
                </h3>
                <p className="mt-2 text-white/70 relative z-10">
                  Stay updated with our latest activities.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 relative z-10">
                  <a
                    href={SITE.socials?.facebook || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 items-center justify-center gap-2 rounded-xl bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-accent hover:text-navy"
                  >
                    <FacebookIcon className="size-4" />
                    Facebook
                  </a>
                  <a
                    href={SITE.socials?.youtube || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 items-center justify-center gap-2 rounded-xl bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-accent hover:text-navy"
                  >
                    <YoutubeIcon className="size-4" />
                    YouTube
                  </a>
                  <a
                    href={SITE.socials?.instagram || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 items-center justify-center gap-2 rounded-xl bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-accent hover:text-navy"
                  >
                    <InstagramIcon className="size-4" />
                    Instagram
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-2">
            <Reveal delay={0.2} className="h-full">
              <div className="h-full rounded-[2.5rem] bg-white p-8 sm:p-12 shadow-lift border border-border/40 flex flex-col justify-center relative overflow-hidden">
                {/* Decorative corner element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-[100px] -z-0"></div>

                <div className="relative z-10 mb-10 text-center flex flex-col items-center">
                  <h2 className="text-3xl sm:text-4xl font-bold text-navy">
                    Send us a Message
                  </h2>
                  <p className="mt-3 text-muted-foreground text-lg">
                    Fill out the form below and we will get back to you shortly.
                  </p>
                </div>

                <div className="relative z-10">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
          </div>
        </div>
      </section>

      <FaqSection />
    </div>
  );
}
