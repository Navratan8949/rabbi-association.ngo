"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ArrowUpLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/context/LanguageContext"
import { getLocalizedField } from "@/lib/localized-field"

export function ProjectCard({ project }) {
  const { language, isRTL, t } = useLanguage()
  const title = getLocalizedField(project, "title", language)
  const description = getLocalizedField(project, "description", language)
  const ArrowIcon = isRTL ? ArrowUpLeft : ArrowUpRight

  return (
    <Link href={`/projects/${project._id}`} className="group block h-full" dir={isRTL ? "rtl" : "ltr"}>
      <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white text-slate-800 shadow-sm border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-100">
          {(project.image?.url || (typeof project.image === 'string' && project.image)) ? (
            <Image
              src={project.image?.url || project.image}
              alt={title || "Project"}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              {t("common.no_image", "No Image")}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100 pointer-events-none" />
          {project.category && (
            <Badge className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-3 bg-accent text-accent-foreground hover:bg-accent`}>
              {project.category}
            </Badge>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-bold leading-snug text-navy group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="mt-3 flex-1 line-clamp-2 text-sm leading-relaxed text-slate-600 font-medium">{description}</p>
          

          <div className="mt-6 border-t border-slate-100 pt-5">
            <span className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest text-navy transition-colors group-hover:text-accent">
              {t("common.view_project", "View project")}
              <ArrowIcon className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
