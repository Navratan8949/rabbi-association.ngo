"use client";
import Image from "next/image";
import { Quote } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { useLanguage } from "@/context/LanguageContext";

export function FounderMessageSection({ data }) {
  const { t, isRTL } = useLanguage();

  let title = t("president_message.section_title", "President's Message");
  let name = t("president_message.signatory_name", "Prof. Dr. Mohammad Mubeen Saleem Al-Azhari");
  let designation = t("president_message.signatory_title", "President, World Association for Al-Azhar Graduates – India");
  
  const docMessage = [
    t("president_message.bismillah", ""),
    t("president_message.salutation", ""),
    t("president_message.p1", ""),
    t("president_message.p2", ""),
    t("president_message.p3", ""),
    t("president_message.p4", ""),
    t("president_message.p5", ""),
    t("president_message.closing", "")
  ].filter(Boolean).join("\n\n");

  let message = docMessage ||
    "Welcome to the official website of the World Association for Al-Azhar Graduates – India.\n\nOur organisation was established with a vision to make a meaningful contribution to individuals, educational institutions, and communities through professional expertise guided by strong human, ethical, and social values.";
  let image = "/placeholder.svg";

  if (data?.content) {
    try {
      const parsed = JSON.parse(data.content);
      if (parsed.name) name = parsed.name;
      if (parsed.designation) designation = parsed.designation;
      if (parsed.message) message = parsed.message;
      if (parsed.image) {
        image = typeof parsed.image === "string" ? parsed.image : (parsed.image.url || "/placeholder.svg");
      }
    } catch (e) {
      // Fallback if not JSON
      message = data.content;
    }
  }

  if (data?.title) {
    title = data.title;
  }

  if (data?.image) {
    if (typeof data.image === "string" && data.image.trim()) {
      image = data.image;
    } else if (data.image.url) {
      image = data.image.url;
    }
  }

  if (!image || typeof image !== "string" || !image.trim()) {
    image = "/placeholder.svg";
  }

  const displayDesignation = designation
    ? designation.replace(/,\s*/g, " | ")
    : "";

  return (
    <section className="relative overflow-hidden bg-muted/30 py-16 md:py-20">
      {/* Decorative background elements */}
      <div className="absolute -left-32 -top-32 size-[500px] rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 size-[500px] rounded-full bg-accent/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image Side */}
          <Reveal className="relative mx-auto w-full max-w-md lg:mx-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-border">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            </div>
            {/* Accent decoration */}
            <div className={`absolute -bottom-6 -z-10 h-full w-full rounded-3xl border-4 border-accent hidden sm:block ${isRTL ? "-left-6" : "-right-6"}`} />
          </Reveal>

          {/* Text Side */}
          <div className="relative text-center md:text-left">
            <Reveal>
              <div className="flex flex-col items-center md:items-start text-center md:text-left mb-6">
                <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/20">
                  <Quote className="size-6 fill-current" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-navy md:text-4xl lg:text-5xl">
                  {title}
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="prose prose-lg prose-p:leading-relaxed prose-p:text-muted-foreground max-w-none">
                <p className="whitespace-pre-wrap">{message}</p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 border-t border-border pt-6">
                <p className="font-bold text-navy text-lg">{name}</p>
                <p className="text-sm font-medium text-muted-foreground mt-0.5">
                  {displayDesignation}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
