"use client"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Loader2, Download, BookOpen, FileText, Sparkles } from "lucide-react"
import { getDownloads } from "@/service/download.service"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/LanguageContext"

function PublicationsContent() {
  const { t, isRTL } = useLanguage()
  const searchParams = useSearchParams()
  const initialType = searchParams?.get("type") || "all"
  
  const [filter, setFilter] = useState(initialType)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true)
      try {
        const data = await getDownloads()
        if (data.success && data.downloads) {
          const active = data.downloads.filter(d => d.status === "active")
          setItems(active)
        }
      } catch (err) {
        console.error("Failed to fetch publications", err)
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [])

  const categories = t("publications.categories", [
    "Articles & Essays",
    "Research Papers & Studies",
    "Scholarly Magazines",
    "Academic Books",
    "Periodical Newsletters",
    "Annual Reports",
    "Conference Proceedings",
    "Educational Materials"
  ])

  const filteredItems = items.filter(item => {
    if (filter === "all") return true
    if (filter === "fatwa") return item.category === "fatwa"
    if (filter === "book") return item.category === "book" || item.category === "article"
    return true
  })

  return (
    <>
      {/* Premium Hero Section */}
      <section className="relative isolate overflow-hidden bg-navy py-20 text-white sm:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,153,51,0.15),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(19,136,8,0.12),transparent_55%)]" />
        
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur-md">
            <BookOpen className="size-4 text-accent" /> {t("publications.subtitle", "Knowledge & Publications")}
          </span>
          
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl text-white">
            {t("publications.title", "Publications & Resources")}
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 leading-relaxed font-medium">
            {t("publications.desc", "Facilitating access to scholarly publications, research papers, newsletters, and educational literature.")}
          </p>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="bg-slate-100 py-12 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4">
          <h3 className="text-center text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6">
            {t("publications.subtitle", "Knowledge & Publication Categories")}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {Array.isArray(categories) && categories.map((cat, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-navy font-semibold text-xs md:text-sm border border-slate-200/80 shadow-xs">
                <Sparkles className="size-3.5 text-accent" />
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        {/* Filters */}
        <div className="mb-10 flex flex-wrap gap-3 justify-center">
          <Button 
            variant={filter === "all" ? "default" : "outline"} 
            className={filter === "all" ? "bg-navy" : ""}
            onClick={() => setFilter("all")}
          >
            All Resources
          </Button>
          <Button 
            variant={filter === "fatwa" ? "default" : "outline"}
            className={filter === "fatwa" ? "bg-navy" : ""}
            onClick={() => setFilter("fatwa")}
          >
            Fatwas & Guidance
          </Button>
          <Button 
            variant={filter === "book" ? "default" : "outline"}
            className={filter === "book" ? "bg-navy" : ""}
            onClick={() => setFilter("book")}
          >
            Books & Articles
          </Button>
        </div>

        {/* List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="size-10 animate-spin text-navy/50" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border/80">
            <BookOpen className="mx-auto size-10 text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-bold text-navy">No publications found</h3>
            <p className="text-sm text-muted-foreground mt-1">Check back later for new uploads.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map(item => (
              <div key={item._id} className="group relative flex flex-col rounded-2xl border border-border/70 bg-card p-6 shadow-soft transition-all hover:border-accent/40 hover:shadow-md">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-navy/10 text-navy shrink-0">
                    {item.category === "fatwa" ? <FileText className="size-5" /> : <BookOpen className="size-5" />}
                  </div>
                  <span className="inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-navy">
                    {item.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-navy transition-colors">
                  {item.title}
                </h3>
                
                {item.description && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                )}
                
                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">
                    {item.year || "Resource"}
                  </span>
                  
                  {item.file?.url && (
                    <a 
                      href={item.file.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-navy transition-colors"
                    >
                      <Download className="size-3.5" /> Download
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}

export default function PublicationsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="size-10 animate-spin text-navy/50" /></div>}>
      <PublicationsContent />
    </Suspense>
  )
}
