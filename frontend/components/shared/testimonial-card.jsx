"use client";
import { useState } from "react";
import { Quote, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedField } from "@/lib/localized-field";

export function TestimonialCard({ item }) {
  const { language, isRTL } = useLanguage();
  const [imgError, setImgError] = useState(false);

  const name = getLocalizedField(item, "name", language) || "Member";
  const designation = getLocalizedField(item, "designation", language) || getLocalizedField(item, "role", language) || "Supporter";
  const message = getLocalizedField(item, "message", language);

  // Safely extract image URL
  const rawUrl = typeof item?.image === "string" ? item.image : item?.image?.url;
  const hasValidUrl = rawUrl && typeof rawUrl === "string" && rawUrl.trim() !== "" && rawUrl !== "[object Object]";

  // Fallback: If image URL is missing or fails, show ui-avatar with initials or dummy placeholder
  const avatarSrc = (!imgError && hasValidUrl)
    ? rawUrl
    : (name
        ? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=051e57&color=fff&size=256`
        : "/placeholder-user.svg");

  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-[12px] border border-border bg-white text-foreground p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className={`absolute ${isRTL ? 'left-5' : 'right-5'} top-5 text-slate-100`}>
        <Quote className="size-16" />
      </div>

      <div className="mb-5 flex items-center gap-3 relative z-10">
        <div className="size-14 shrink-0 overflow-hidden rounded-full border border-border bg-slate-100 shadow-xs">
          <img
            src={avatarSrc}
            alt={name}
            className="size-full object-cover"
            onError={() => {
              if (!imgError) {
                setImgError(true);
              }
            }}
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">{name}</h3>
          <span className="mt-1 inline-block rounded bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary uppercase tracking-wider">
            {designation}
          </span>
        </div>
      </div>

      <p className="flex-1 leading-8 text-muted-foreground font-medium">
        "{message}"
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <div className="flex gap-1">
          {[...Array(item?.rating || 5)].map((_, i) => (
            <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <span className="rounded bg-green-50 px-2 py-0.5 text-[11px] font-bold text-green-700 uppercase tracking-wider">
          Verified
        </span>
      </div>
    </div>
  );
}
