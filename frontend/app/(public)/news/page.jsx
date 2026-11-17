"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Newspaper, Calendar, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { PageHero } from "@/components/pages/page-hero";
import { getNews } from "@/service/news.service";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedField } from "@/lib/localized-field";

export default function NewsPage() {
  const { t, isRTL, language } = useLanguage();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        if (data?.success) {
          setNews(data.data || data.news || []);
        }
      } catch (error) {
        console.error("Failed to load news", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const categories = t("news.categories", [
    "Islamic Thought",
    "Moderation & Balance",
    "Arabic Language",
    "Islamic Scholarship",
    "Contemporary Issues",
    "Education & Research",
    "Interfaith Dialogue",
    "Society & Culture",
  ]);

  return (
    <main className="min-h-screen bg-slate-50" dir={isRTL ? "rtl" : "ltr"}>
      <PageHero
        eyebrow={t("news.latest_title", "Latest News")}
        title={t("news.title", "News & Articles")}
        description={t("news.latest_desc", "Stay updated with the latest news, activities, announcements, and events of the India Branch.")}
        image="/hero-community-education-india.png"
      />

      {/* Topics / Article Categories Pills */}
      <section className="bg-slate-100 py-10 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-2">
              {t("news.articles_title", "Topics")}:
            </span>
            {Array.isArray(categories) &&
              categories.map((cat, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-navy font-semibold text-xs border border-slate-200 shadow-xs"
                >
                  <Sparkles className="size-3 text-accent" />
                  {cat}
                </span>
              ))}
          </div>
        </div>
      </section>

      <div className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {loading ? (
            <div className="text-center py-20 text-muted-foreground font-medium">
              {t("common.loading", "Loading...")}
            </div>
          ) : news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item, index) => {
                const title = getLocalizedField(item, "title", language) || item.title;
                const summary =
                  getLocalizedField(item, "summary", language) ||
                  getLocalizedField(item, "description", language) ||
                  item.summary ||
                  item.description;
                const category = item.category?.replace("_", " ") || "Article";

                return (
                  <Link
                    href={`/news/${item._id}`}
                    key={item._id || index}
                    className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-xl hover:border-accent transition-all flex flex-col"
                  >
                    {/* Image Container: Edge-to-edge full container display */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                      {item.image?.url ? (
                        <Image
                          src={item.image.url}
                          alt={title || "News"}
                          fill
                          priority={index < 3}
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-400">
                          <Newspaper className="size-10" />
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className={`absolute top-3 ${isRTL ? "right-3" : "left-3"} z-10`}>
                        <span className="bg-accent text-navy text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs border border-white/40">
                          {category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 font-semibold">
                          <Calendar className="size-3.5 text-accent" />
                          <span>
                            {item.publishedAt || item.createdAt
                              ? new Date(item.publishedAt || item.createdAt).toLocaleDateString(
                                  isRTL ? "ar-EG" : "en-IN",
                                  { day: "numeric", month: "short", year: "numeric" }
                                )
                              : "Recent"}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-navy group-hover:text-accent transition-colors line-clamp-2">
                          {title}
                        </h3>
                        {summary && (
                          <p className="mt-3 text-sm text-slate-600 line-clamp-3 leading-relaxed font-medium">
                            {summary}
                          </p>
                        )}
                      </div>
                      <div className="mt-6 flex items-center gap-2 text-sm font-bold text-accent group-hover:text-navy transition-colors">
                        <span>{t("news.read_full", "Read Full Article")}</span>
                        <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
              <Newspaper className="mx-auto size-12 text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-navy">No news updates yet</h3>
              <p className="text-slate-500 mt-1">Check back later for announcements and articles.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
