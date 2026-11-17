"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Calendar, Tag, Newspaper } from "lucide-react"
import { getNewsById } from "@/service/news.service"
import { useLanguage } from "@/context/LanguageContext"
import { getLocalizedField } from "@/lib/localized-field"

export default function NewsDetailPage() {
  const params = useParams()
  const { language, isRTL, t } = useLanguage()
  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!params.id) return

    getNewsById(params.id)
      .then(data => {
        if (data.success && data.news) {
          setNews(data.news)
        } else {
          setError("News article not found")
        }
      })
      .catch(err => {
        console.error(err)
        setError("Failed to load news article")
      })
      .finally(() => setLoading(false))
  }, [params.id])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="size-12 animate-spin rounded-full border-4 border-navy border-t-transparent"></div>
      </div>
    )
  }

  if (error || !news) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center" dir={isRTL ? "rtl" : "ltr"}>
        <Newspaper className="size-12 text-slate-400 mb-3" />
        <h2 className="text-xl font-bold text-navy">{error || "Article Not Found"}</h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">The requested news article could not be loaded.</p>
        <Link href="/news" className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy/90">
          <ArrowIcon className="size-4" /> {t("latest_updates.view_all", "Return to News & Press")}
        </Link>
      </div>
    )
  }

  const title = getLocalizedField(news, "title", language) || news.title
  const description = getLocalizedField(news, "description", language) || news.description || ""

  return (
    <article className="min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="bg-navy py-12 text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/news" className="mb-8 inline-flex items-center text-sm font-semibold text-white/70 hover:text-white transition-colors">
            <ArrowIcon className="mr-2 ml-2 size-4" /> {t("common.back_to_news", "Back to News")}
          </Link>
          
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm font-semibold uppercase tracking-wider text-accent">
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1">
              <Tag className="size-4" /> {news.category?.replace("_", " ") || "NEWS"}
            </span>
            <span className="flex items-center gap-1.5 text-white/70">
              <Calendar className="size-4" />
              {new Date(news.publishedAt || news.createdAt || Date.now()).toLocaleDateString(isRTL ? "ar-EG" : "en-IN", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>

          <h1 className="text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
        {news.image?.url && (
          <div className="mb-12 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-md">
            <Image 
              src={news.image.url} 
              alt={title}
              width={1200}
              height={700}
              className="w-full max-h-[550px] object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg prose-slate max-w-none prose-headings:text-navy prose-a:text-accent">
          {description.split('\n').map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed text-slate-700">
              {paragraph}
            </p>
          ))}
        </div>
        
        <div className="mt-16 flex items-center justify-between border-t border-slate-200 pt-8">
          <Link href="/news" className="inline-flex items-center font-bold text-navy hover:text-accent transition-colors">
            <ArrowIcon className="mr-2 ml-2 size-5" /> {t("latest_updates.view_all", "View all news")}
          </Link>
        </div>
      </div>
    </article>
  )
}
