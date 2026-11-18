"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      // Show after scrolling 240px
      if (scrollTop > 240) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      // Calculate scroll progress percentage (0 - 100)
      if (scrollHeight > 0) {
        const pct = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        setProgress(pct);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Circular progress calculation
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`fixed z-[99] transition-all duration-300 right-6 bottom-24 ${
        visible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-90 pointer-events-none"
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="group relative flex size-13 items-center justify-center rounded-full bg-navy/95 text-white shadow-xl shadow-navy/30 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-navy hover:shadow-2xl hover:shadow-accent/40 active:scale-95 cursor-pointer border border-white/20"
      >
        {/* SVG Circular Progress Ring */}
        <svg
          className="absolute inset-0 size-full -rotate-90 pointer-events-none p-0.5"
          viewBox="0 0 52 52"
        >
          {/* Track Circle */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            className="stroke-white/15 fill-none"
            strokeWidth="2.5"
          />
          {/* Progress Circle */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            className="stroke-accent fill-none transition-all duration-150 group-hover:stroke-navy"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>

        {/* Up Arrow Icon */}
        <ArrowUp className="size-5 transition-transform duration-300 group-hover:-translate-y-1 drop-shadow-sm" />

        {/* Hover Tooltip */}
        <span
          className="absolute right-full mr-3 hidden sm:group-hover:inline-flex items-center rounded-xl bg-navy/90 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-md whitespace-nowrap pointer-events-none transition-opacity duration-200 border border-white/10"
        >
          Back to top
        </span>
      </button>
    </div>
  );
}

