"use client";

import { useState, useEffect } from "react";
import { PageHero } from "@/components/pages/page-hero";
import { CardsGrid } from "@/components/pages/cards-grid";
import { getEvents } from "@/service/event.service";
import { useLanguage } from "@/context/LanguageContext";
import { Award, Calendar, MapPin, Sparkles } from "lucide-react";

export default function EventsPage() {
  const { t, isRTL } = useLanguage();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getEvents();
        if (res?.success) {
          setEvents(res.events || res.data || []);
        }
      } catch (err) {
        console.error("Failed to load events", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        eyebrow={t("conferences.title", "Conferences & Events")}
        title={t("conferences.title", "Events & Forums")}
        description={t("conferences.upcoming_subtitle", "Conferences, seminars, and intellectual gatherings.")}
        image="/community-health-camp-india.png"
      />

      <div className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Landmark Event Highlight: International Peace Conference 2017 */}
          <div className="mb-16 bg-gradient-to-br from-navy to-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 size-80 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent mb-6 border border-accent/30">
                <Sparkles className="size-3.5" />
                {t("conferences.peace_conf_title", "International Peace Conference – 2017")}
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                {t("conferences.peace_conf_subtitle", "The Need and Importance of Peace and Peaceful Coexistence in the Contemporary World")}
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6 font-medium">
                {t("conferences.peace_conf_desc")}
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-white/10 text-sm md:text-base font-semibold text-accent">
                <div className="flex items-center gap-2">
                  <Award className="size-5 shrink-0" />
                  <span>{t("conferences.peace_conf_guest")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="size-5 shrink-0" />
                  <span>{t("conferences.peace_conf_focus")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events Heading */}
          <div className="mb-10 text-center sm:text-start">
            <h3 className="text-2xl md:text-3xl font-bold text-navy">
              {t("conferences.upcoming_title", "Upcoming Events")}
            </h3>
            <p className="text-muted-foreground mt-1">
              {t("conferences.upcoming_subtitle", "Explore upcoming conferences, seminars, lectures, and workshops.")}
            </p>
          </div>

          {loading ? (
            <div className="py-20 text-center text-muted-foreground font-medium">
              Loading events...
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/60 text-muted-foreground font-medium">
              No upcoming events scheduled at this moment. Please check back soon.
            </div>
          ) : (
            <CardsGrid items={events} type="event" />
          )}
        </div>
      </div>
    </main>
  );
}
