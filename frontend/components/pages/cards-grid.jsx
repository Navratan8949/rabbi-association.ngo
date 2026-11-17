"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowRight, ArrowLeft, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedField } from "@/lib/localized-field";

function hrefFor(type, id) {
  if (type === "project") return `/projects/${id}`;
  if (type === "event") return `/events/${id}`;
  if (type === "campaign") return `/crowdfunding/${id}`;
  if (type === "news") return `/news/${id}`;
  return "#";
}

export function CardsGrid({ items = [], type }) {
  const { language, isRTL, t } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  if (items.length === 0) {
    return (
      <div
        className="mx-auto max-w-7xl px-4 py-20 text-center"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="rounded-2xl border border-dashed border-border/80 bg-card p-12 shadow-sm">
          <h3 className="text-xl font-semibold text-navy">
            {t("common.nothing_to_show", "Nothing to show yet")}
          </h3>
          <p className="mt-2 text-muted-foreground">
            {t(
              "common.check_back_later",
              "Check back later for updates in this section.",
            )}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="mx-auto max-w-7xl px-4 py-12 md:py-16"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const title = getLocalizedField(item, "title", language);
          const description =
            getLocalizedField(item, "description", language) ||
            getLocalizedField(item, "content", language);
          const location = getLocalizedField(item, "location", language);
          const hasProgressBar =
            type === "campaign" &&
            (item.targetAmount > 0 || item.goalAmount > 0);
          const goal = item.targetAmount || item.goalAmount || 1;
          const raised = item.raisedAmount || 0;
          const progress = Math.min(100, (raised / goal) * 100);

          return (
            <Link
              key={item._id || item.id}
              href={hrefFor(type, item._id || item.id)}
              className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-primary/20 bg-primary text-white shadow-soft transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 hover:shadow-2xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900/30">
                {item.image?.url ||
                (typeof item.image === "string" && item.image) ? (
                  <Image
                    src={item.image?.url || item.image}
                    alt={title || "Image"}
                    fill
                    priority={index < 3}
                    className="object-cover object-center transition duration-500 group-hover:scale-105"
                    sizes="(min-width:1024px) 33vw, 100vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-white/60 text-xs font-semibold">
                      {t("common.no_image", "No Image")}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent opacity-0 transition group-hover:opacity-100 pointer-events-none" />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className="text-[11px] font-bold uppercase tracking-wider text-accent">
                  {item.category || item.type || item.status || "Trust"}
                </p>
                <h2 className="mt-2 text-2xl font-bold leading-snug transition-colors">
                  {title}
                </h2>
                <p className="mt-3 flex-1 line-clamp-3 text-base leading-relaxed text-white/80 font-medium">
                  {description}
                </p>

                {type === "event" && (
                  <div className="mt-4 flex flex-wrap gap-3 text-sm font-medium text-white/80">
                    {item.eventDate && (
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="size-4 text-accent" />
                        {new Date(item.eventDate).toLocaleDateString(
                          isRTL ? "ar-EG" : "en-IN",
                          { day: "numeric", month: "short", year: "numeric" },
                        )}
                      </span>
                    )}
                    {location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="size-4 text-accent" />
                        {location}
                      </span>
                    )}
                  </div>
                )}

                {hasProgressBar && (
                  <div className="mt-6 rounded-xl bg-white/5 p-4 border border-white/10">
                    <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-wider">
                      <span className="text-white/70">Raised</span>
                      <span className="text-white">
                        ₹{raised.toLocaleString("en-IN")} / ₹
                        {goal.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-accent transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="mt-6 border-t border-white/15 pt-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all group-hover:bg-accent group-hover:text-accent-foreground shadow-xs">
                    {type === "campaign"
                      ? t("common.know_more", "Know More")
                      : t("common.read_more", "Read more")}
                    <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>

                  {type === "campaign" && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-200 group-hover:text-white transition-colors">
                      {t("common.donate_now", "Donate")} &rarr;
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
