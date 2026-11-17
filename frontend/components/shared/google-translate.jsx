"use client";

import { Globe, ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/context/LanguageContext";

export function LanguageSwitcher({ variant = "dark" }) {
  const { language, setLanguage, supportedLanguages } = useLanguage();

  const currentObj =
    supportedLanguages.find((l) => l.code === language) || supportedLanguages[0];

  const triggerClassName =
    variant === "light"
      ? "group flex items-center gap-1.5 rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-semibold text-foreground transition-all hover:bg-secondary focus:outline-none shadow-xs"
      : "group flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white transition-all hover:bg-white/20 focus:outline-none backdrop-blur-xs";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className={triggerClassName}>
        <Globe
          className={`size-3.5 opacity-90 ${
            variant === "light" ? "text-navy" : "text-accent"
          }`}
        />
        <span className="font-medium tracking-wide">{currentObj.nativeName}</span>
        <ChevronDown className="size-3 opacity-60 transition-transform group-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="min-w-[155px] rounded-xl border border-border/60 bg-white p-1.5 shadow-xl z-[150]"
      >
        {supportedLanguages.map((item) => {
          const isSelected = language === item.code;
          return (
            <DropdownMenuItem
              key={item.code}
              onClick={() => setLanguage(item.code)}
              className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-semibold cursor-pointer transition-colors ${
                isSelected
                  ? "bg-navy/10 text-navy font-bold"
                  : "text-foreground/80 hover:bg-navy/5 hover:text-navy"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{item.flag}</span>
                <span>{item.nativeName}</span>
                <span className="text-[10px] text-muted-foreground font-normal">
                  ({item.name})
                </span>
              </div>
              {isSelected && <Check className="size-3.5 text-navy font-bold shrink-0 ml-1" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Alias for backwards compatibility with existing imports
export const GoogleTranslate = LanguageSwitcher;
export default LanguageSwitcher;
