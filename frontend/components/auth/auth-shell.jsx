"use client"

import Image from "next/image"
import Link from "next/link"
import { Logo } from "@/components/shared/logo"
import { useSiteBranding } from "@/hooks/useSiteBranding"
import { ArrowLeft, Sparkles, GraduationCap } from "lucide-react"

export function AuthShell({ title, subtitle, children, footer, image = "/hero-community-education-india.png" }) {
  const { siteName } = useSiteBranding()
  
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 p-4 sm:p-8">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-100" />
        <div className="absolute -top-[20%] -left-[10%] h-[60%] w-[60%] animate-pulse rounded-full bg-amber-400/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] h-[60%] w-[60%] animate-pulse rounded-full bg-[#051e57]/10 blur-[120px]" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50 lg:grid lg:grid-cols-[1.1fr_1fr]">
        {/* Left Side - Visual */}
        <div className="relative hidden lg:block overflow-hidden bg-[#051e57] p-12 lg:p-14">
          <Image src={image} alt="Background" fill priority className="object-cover opacity-50 mix-blend-overlay scale-105 transition-transform duration-[20s] hover:scale-110" sizes="50vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#051e57]/95 via-[#051e57]/80 to-amber-900/60" />
          
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <div className="inline-flex rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/10 w-fit shadow-xl shadow-black/10">
                <Logo variant="light" />
              </div>
              
              <div className="mt-12">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">
                  <Sparkles className="size-3.5" />
                  Empowering Minds
                </div>
                <h2 className="text-4xl lg:text-[2.6rem] leading-[1.15] font-black tracking-tight text-white mb-6 drop-shadow-sm">
                  Connected by <span className="text-amber-400">{siteName}</span>.<br /> United for Service.
                </h2>
                <p className="text-lg font-medium leading-relaxed text-white/80 max-w-md">
                  Join our community of professionals and educators committed to advancing quality education and human empowerment.
                </p>
              </div>
            </div>

            <div className="mt-16 flex max-w-sm items-center gap-4 bg-white/5 px-6 py-4 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-400">
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-medium italic text-white/90 leading-relaxed">
                  "Education is the most powerful weapon which you can use to change the world."
                </p>
                <p className="text-[10px] font-bold text-amber-400 mt-1.5 uppercase tracking-widest">
                  — Nelson Mandela
                </p>
              </div>
            </div>
          </div>
          
          {/* Decorative huge icon */}
          <GraduationCap className="absolute -bottom-24 -right-24 size-[400px] text-white/5 -rotate-12 pointer-events-none" />
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center bg-white p-8 sm:p-12 md:p-14 relative">
          <div className="mx-auto w-full max-w-[420px]">
            <div className="mb-10 flex justify-center lg:hidden">
              <Logo />
            </div>

            <div className="mb-10 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#051e57]">{title}</h1>
              {subtitle && <p className="mt-3 text-[15px] font-medium text-slate-500">{subtitle}</p>}
            </div>

            <div className="[&_label]:text-slate-700 [&_label]:font-bold [&_label]:mb-1.5 [&_label]:block [&_input]:h-12 [&_input]:rounded-xl [&_input]:bg-slate-50 [&_input]:border-slate-200 focus:[&_input]:bg-white focus:[&_input]:border-amber-400 focus:[&_input]:ring-4 focus:[&_input]:ring-amber-400/10 [&_input]:shadow-sm [&_input]:transition-all [&_button]:h-12 [&_button]:rounded-xl [&_button]:text-[15px] [&_button]:shadow-md hover:[&_button]:shadow-lg hover:[&_button]:-translate-y-0.5 [&_button]:transition-all">
              {children}
            </div>

            {footer && (
              <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center text-[15px] font-medium text-slate-600 shadow-inner">
                {footer}
              </div>
            )}

            <div className="mt-10 text-center lg:text-left">
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition-colors hover:text-amber-500">
                <ArrowLeft className="size-4" />
                Back to website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
