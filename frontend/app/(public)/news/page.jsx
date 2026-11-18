import Link from "next/link"
import Image from "next/image"
import { Newspaper, ChevronRight, Calendar, ArrowRight } from "lucide-react"
import { PageHero } from "@/components/pages/page-hero"
import { getNews } from "@/service/news.service"

export const metadata = {
  title: "News & Updates",
  description: "Stay updated with the latest news, announcements, and articles from Rabbi Association."
}

export default async function NewsPage() {
  let news = []
  
  try {
    const data = await getNews()
    if (data?.success) {
      news = data.data || data.news || []
    }
  } catch (error) {
    // silently fallback
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero 
        eyebrow="Updates" 
        title="News & Announcements" 
        description="Stay informed about our recent activities, upcoming programs, and success stories." 
        image="/hero-community-education-india.png" 
      />

      <div className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          
          {news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item, index) => (
                <Link 
                  href={`/news/${item._id}`} 
                  key={item._id || index}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all flex flex-col"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 flex items-center justify-center">
                    {item.image?.url ? (
                      <>
                        {/* Ambient blurred backdrop to eliminate harsh empty letterbox bars */}
                        <Image 
                          src={item.image.url} 
                          alt="" 
                          fill 
                          aria-hidden="true"
                          className="object-cover blur-lg scale-110 opacity-30 select-none pointer-events-none"
                        />
                        {/* Crisp foreground image fitted completely without any cutting off */}
                        <Image 
                          src={item.image.url} 
                          alt={item.title} 
                          fill 
                          priority={index < 3}
                          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105 relative z-[1]"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <Newspaper className="size-12" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="bg-accent text-navy text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                        {item.category || "News"}
                      </span>
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold">
                        <Calendar className="size-3.5 text-accent" />
                        {new Date(item.publishedAt || item.createdAt).toLocaleDateString("en-US", {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 line-clamp-3 mb-6">
                      {item.description}
                    </p>
                    <div className="mt-auto flex items-center text-primary font-bold text-sm">
                      Read Full Article <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-[2rem] shadow-sm border border-slate-100 text-center max-w-4xl mx-auto">
              <div className="flex size-20 items-center justify-center rounded-full bg-accent/10 mb-6 mx-auto">
                <Newspaper className="size-10 text-accent" />
              </div>
              <h2 className="text-3xl font-bold text-navy mb-4">News Room</h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                We're setting up our news desk! Check back soon for the latest updates, press releases, and articles on our ongoing educational programs.
              </p>
            </div>
          )}

        </div>
      </div>
    </main>
  )
}
