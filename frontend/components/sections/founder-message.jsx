"use client";
import Image from "next/image";
import { Quote } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

export function FounderMessageSection({ data }) {
  let title = "Founder's Message";
  let name = "Founder & Trustee";
  let designation = "Rabbi Association";
  let message =
    "Welcome to the official website of the Rabbi Association.\n\nOur organisation was established with a vision to make a meaningful contribution to individuals, educational institutions, and communities through professional expertise guided by strong human, ethical, and social values.\n\nWe believe that education is more than the transmission of knowledge. True education forms the mind, shapes character, strengthens values, develops leadership, and inspires people to serve humanity.\n\nWe invite you to join this shared journey and contribute your knowledge, experience and expertise to the advancement of society.";
  let image = "/placeholder.svg";

  if (data?.content) {
    try {
      const parsed = JSON.parse(data.content);
      if (parsed.name) name = parsed.name;
      if (parsed.designation) designation = parsed.designation;
      if (parsed.message) message = parsed.message;
      if (parsed.image) image = parsed.image;
    } catch (e) {
      // Fallback if not JSON
      message = data.content;
    }
  }

  if (data?.title) {
    title = data.title;
  }

  if (data?.image?.url) {
    image = data.image.url;
  }

  const initial = name ? name.charAt(0).toUpperCase() : "P";

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
            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-3xl border-4 border-accent hidden md:block" />
          </Reveal>

          {/* Text Side */}
          <div className="relative">
            <Reveal>
              <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/20">
                <Quote className="size-6 fill-current" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-navy md:text-4xl lg:text-5xl mb-6">
                {title}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="prose prose-lg prose-p:leading-relaxed prose-p:text-muted-foreground max-w-none">
                <p className="whitespace-pre-wrap">{message}</p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white">
                  <span className="text-xl font-bold">{initial}</span>
                </div>
                <div>
                  <p className="font-bold text-navy">{name}</p>
                  <p className="text-sm text-muted-foreground max-w-[300px]">
                    {designation}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
