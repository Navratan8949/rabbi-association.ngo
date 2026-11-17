"use client";

import { PageHero } from "@/components/pages/page-hero";
import { Users, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { MembershipFormClient } from "@/components/forms/membership-form";
import { useLanguage } from "@/context/LanguageContext";

export default function MembershipPage() {
  const { t, isRTL } = useLanguage();

  const benefits = t("membership.benefits", [
    "Connect with Al-Azhar graduates across India.",
    "Participate in academic and intellectual programs.",
    "Priority updates on conferences and seminars.",
    "Contribute to educational and community initiatives.",
    "Build scholarly and professional relationships.",
    "Active involvement in association activities.",
    "Access to global Al-Azhar alumni platforms.",
  ]);

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        title={t("membership.title", "Membership Registration")}
        description={t("membership.question", "Are you an Al-Azhar graduate residing in India?")}
        breadcrumbItems={[
          { label: t("nav.home", "Home"), href: "/" },
          { label: t("nav.membership", "Membership"), href: "/membership" },
        ]}
      />

      <div className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          {/* Header intro */}
          <div className="mb-14 text-center">
            <div className="flex size-20 mx-auto items-center justify-center rounded-3xl bg-accent/10 mb-6 text-accent shadow-sm">
              <Users className="size-10" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">
              {t("membership.become_title", "Become a Member")}
            </h2>
            <p className="text-lg text-slate-700 font-medium leading-relaxed max-w-3xl mx-auto">
              {t("membership.desc", "Join the World Association for Al-Azhar Graduates – India Branch and become part of a prestigious national network of scholars, academicians, researchers, and professionals.")}
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="mb-16 bg-white rounded-3xl p-8 md:p-10 border border-slate-200/80 shadow-md">
            <h3 className="text-xl md:text-2xl font-bold text-navy mb-6 text-center">
              {t("membership.why_join_title", "Why Join Us?")}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {Array.isArray(benefits) &&
                benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <CheckCircle2 className="size-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-slate-800 text-sm md:text-base font-medium">
                      {benefit}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Application Form */}
          <div className="relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

            <div className="relative z-10 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 md:p-10">
              <div className="mb-8 border-b border-slate-100 pb-6 text-center sm:text-start">
                <h3 className="text-2xl font-bold text-navy">
                  {t("membership.app_title", "Membership Application Form")}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {t("membership.declaration_text", "Please complete all required fields accurately.")}
                </p>
              </div>

              <MembershipFormClient />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
