import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ProjectCard({ project }) {
  return (
    <Link href={`/projects/${project._id}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white text-slate-800 shadow-sm border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-50 flex items-center justify-center border-b border-slate-100">
          {(project.image?.url || (typeof project.image === 'string' && project.image)) ? (
            <Image
              src={project.image?.url || project.image}
              alt={project.title}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <span className="text-muted-foreground">No Image</span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
          {project.category && (
            <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground hover:bg-accent">
              {project.category}
            </Badge>
          )}
          {/* {project.status && (
            <span
              className={`absolute right-3 top-3 rounded-md px-2.5 py-1 text-[11px] font-semibold capitalize ${
                project.status === "active"
                  ? "bg-navy text-navy-foreground"
                  : "bg-card text-muted-foreground ring-1 ring-border"
              }`}
            >
              {project.status}
            </span>
          )} */}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-bold leading-snug text-navy group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="mt-3 flex-1 line-clamp-2 text-sm leading-relaxed text-slate-600 font-medium">{project.description}</p>
          

          <div className="mt-6 border-t border-slate-100 pt-5">
            <span className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest text-navy transition-colors group-hover:text-accent">
              View project
              <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
