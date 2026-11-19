"use client";
import Image from "next/image";
import { Quote } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { toAbsoluteFileUrl } from "@/lib/utils";

export function FounderMessageSection({ data }) {
  let title = "Founder & CEO";
  let name = "AJAY PAUL";
  let designation = "Founder";
  let message =
    "Dear Friends, Well-Wishers and Partners,\n\nEvery community has people who need opportunities, support and someone willing to stand beside them. Education may change the future of a child, timely information may help a family access a welfare benefit, and appropriate legal assistance may help a person seek justice.\n\nThese realities inspire the mission of RABBI ASSOCIATION.\n\nOur vision is to build an organisation that responds to the genuine needs of poor and marginalised communities through education, social welfare, institutional development, citizen empowerment and humanitarian service.\n\nWe aspire to support the transformation of schools, strengthen educational institutions, promote skill development, improve awareness of government schemes, facilitate access to appropriate legal services and stand for the dignity and rights of vulnerable people.\n\nWe also seek to work with government authorities, corporate organisations, charitable foundations, educational institutions, healthcare institutions, NGOs and individuals who share our commitment to social development.\n\nWe understand that lasting change requires sincerity, responsible leadership, professional collaboration and accountability. We therefore aim to develop our programmes carefully, use resources for their intended charitable purposes and measure our progress through meaningful outcomes.\n\nI invite institutions, organisations, professionals, volunteers and well-wishers to join us in this mission.\n\nTogether, let us turn compassion into action, opportunities into progress and service into lasting social change.\n\nWith gratitude and commitment.";
  let image = "/founder-ajay-paul.jpg";

  if (data?.content) {
    try {
      const parsed = JSON.parse(data.content);
      const rawText = `${parsed.name || ""} ${parsed.designation || ""} ${parsed.message || ""}`.toLowerCase();
      if (!rawText.includes("mubeen") && !rawText.includes("azhar")) {
        if (parsed.name) name = parsed.name;
        if (parsed.designation) designation = parsed.designation;
        if (parsed.message) message = parsed.message;
        if (parsed.image) {
          image = typeof parsed.image === "string" ? parsed.image : (parsed.image.url || "/founder-ajay-paul.jpg");
        }
      }
    } catch (e) {
      if (!data.content.toLowerCase().includes("mubeen") && !data.content.toLowerCase().includes("azhar")) {
        message = data.content;
      }
    }
  }

  if (data?.title && !data.title.toLowerCase().includes("azhar")) {
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
    image = "/founder-ajay-paul.jpg";
  }

  const finalImage = toAbsoluteFileUrl(image) || image;

  const displayDesignation = designation
    ? (designation.includes("Rabbi Association") ? designation : `${designation} | Rabbi Association`)
    : "Rabbi Association";

  return (
    <section className="relative overflow-hidden bg-muted/30 py-16 md:py-20">
      {/* Decorative background elements */}
      <div className="absolute -left-32 -top-32 size-[500px] rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 size-[500px] rounded-full bg-accent/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image Side */}
          <Reveal className="relative mx-auto w-full max-w-md lg:mx-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-border bg-slate-100">
              <img
                src={finalImage}
                alt={name}
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent pointer-events-none" />
            </div>
            {/* Accent decoration */}
            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-3xl border-4 border-accent hidden md:block" />
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
