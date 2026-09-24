"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteBranding } from "@/hooks/useSiteBranding";

export function Logo({ variant = "dark", showText = true, className = "" }) {
  const { siteName, shortName, logo } = useSiteBranding();

  const textColor =
    variant === "light" ? "text-navy-foreground" : "text-foreground";
  const subColor =
    variant === "light" ? "text-navy-foreground/70" : "text-muted-foreground";

  // Attempt to split the shortName into two lines for visual appeal if possible, or just render it
  const words = shortName.split(" ");
  const topText = words.slice(0, Math.ceil(words.length / 2)).join(" ");
  const bottomText = words.slice(Math.ceil(words.length / 2)).join(" ");

  return (
    <Link
      href="/"
      className={`flex items-center gap-2 sm:gap-3 shrink-0 ${className}`}
      aria-label={`${shortName} home`}
    >
      <img
        src={logo || "/placeholder.svg"}
        alt={`${shortName} logo`}
        className="size-12 sm:size-16 shrink-0 object-contain"
        fetchPriority="high"
      />
      {showText && (
        <span className="flex flex-col leading-tight min-w-0">
          <span
            className={` text-[10px] sm:text-[14px] font-bold tracking-tight ${textColor} truncate uppercase`}
          >
            {topText}
          </span>
          <span
            className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-[0.14em] ${subColor} truncate`}
          >
            {bottomText}
          </span>
        </span>
      )}
    </Link>
  );
}
