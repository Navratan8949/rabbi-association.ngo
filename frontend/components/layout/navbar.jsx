"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import {
  ChevronDown, Heart, Lock, Mail, Menu, Phone, User, X, LayoutDashboard, LogOut,
  Home, Info, Briefcase, Newspaper, Users, PhoneCall, ChevronRight, Activity, ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Logo } from "@/components/shared/logo"
import { MAIN_NAV, isGroup } from "@/constants/nav"
import { SITE } from "@/constants/site"
import { GoogleTranslate } from "@/components/shared/google-translate"
import { useSelector, useDispatch } from "react-redux"
import { selectUser, clearUser } from "@/redux/features/userSlice"
import api from "@/service/api"
import { toast } from "sonner"

// Social icons as inline SVG
function FacebookIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.563 9.872v-6.988H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988A10 10 0 0 0 22 12z" />
    </svg>
  )
}
function InstagramIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.775.131 4.602.44 3.635 1.408 2.667 2.375 2.358 3.548 2.3 4.826 2.241 6.106 2.228 6.514 2.228 12s.013 5.894.072 7.174c.058 1.278.367 2.451 1.335 3.418.967.968 2.14 1.277 3.418 1.335C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.073c1.278-.058 2.451-.367 3.418-1.335.968-.967 1.277-2.14 1.335-3.418.059-1.28.072-1.688.072-7.174s-.013-5.894-.072-7.174c-.058-1.278-.367-2.451-1.335-3.418C19.398.44 18.225.131 16.947.072 15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
}
function YoutubeIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

const NAV_ICONS = {
  "Home": Home,
  "About Us": Info,
  "Our Work": Briefcase,
  "Media & Reports": Newspaper,
  "Get Involved": Users,
  "Contact Us": PhoneCall
}

// Hover-enabled dropdown wrapper
function HoverDropdown({ item, isGroupActive, isActive }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef(null)

  const handleMouseEnter = () => {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150)
  }

  const Icon = NAV_ICONS[item.label] || Activity;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`group flex items-center gap-1.5 px-3 py-2 text-[13px] font-bold tracking-wide transition-all outline-none relative rounded-lg ${isGroupActive(item)
          ? "text-primary bg-primary/5"
          : "text-foreground/80 hover:text-primary hover:bg-primary/5"
          }`}
      >
        <Icon className="size-4" />
        {item.label}
        <ChevronDown className={`size-3.5 opacity-50 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={8}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-64 rounded-2xl border border-border/40 bg-white/95 backdrop-blur-xl p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        {item.children.map((child) => (
          <DropdownMenuItem 
            key={child.href} 
            className="group/item rounded-xl p-0 focus:bg-transparent data-[highlighted]:bg-transparent outline-none border-none"
          >
            <Link
              href={child.href}
              className={`group/link flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm transition-all ${isActive(child.href)
                ? "bg-primary/10 font-bold text-primary hover:bg-primary hover:text-white group-data-[highlighted]/item:bg-primary group-data-[highlighted]/item:!text-white group-focus/item:bg-primary group-focus/item:!text-white"
                : "text-foreground/70 hover:bg-primary hover:text-white hover:shadow-sm group-data-[highlighted]/item:bg-primary group-data-[highlighted]/item:!text-white group-focus/item:bg-primary group-focus/item:!text-white"
                }`}
            >
              <span className="font-medium">{child.label}</span>
              <ChevronRight className={`size-4 transition-transform duration-300 ${isActive(child.href) ? "translate-x-0 opacity-100 group-hover/link:text-white group-data-[highlighted]/item:text-white group-focus/item:text-white" : "-translate-x-2 opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100"}`} />
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function TopBar() {
  const user = useSelector(selectUser)
  const { data: siteContent } = useSelector((state) => state.siteContent)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout")
      dispatch(clearUser())
      toast.success("Logged out successfully")
    } catch (err) {
      toast.error("Error logging out")
    }
  }

  let site = { ...SITE }
  if (siteContent?.contact_info?.content) {
    try {
      const parsed = JSON.parse(siteContent.contact_info.content)
      if (parsed.email) site.email = parsed.email
      if (parsed.phones && Array.isArray(parsed.phones)) {
        const navbarPhones = parsed.phones.filter(p => p.showInNavbar).map(p => p.number).filter(Boolean)
        if (navbarPhones.length > 0) site.phones = navbarPhones
      } else if (parsed.phone) {
        site.phones = [parsed.phone]
      }
      if (parsed.facebook) site.socials.facebook = parsed.facebook
      if (parsed.instagram) site.socials.instagram = parsed.instagram
      if (parsed.twitter) site.socials.twitter = parsed.twitter
      if (parsed.youtube) site.socials.youtube = parsed.youtube
    } catch(e) {}
  }

  return (
    <div className="hidden bg-[#051e57] text-white/90 md:block border-b border-white/10">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 lg:px-12 py-2 text-[12px] font-medium tracking-wide">
        <div className="flex items-center gap-6">
          {site.phones.map((phone, idx) => (
            <a
              key={idx}
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-1.5 text-white/80 transition hover:text-white"
            >
              <Phone className="size-3.5 opacity-80 text-amber-400" />
              {phone}
            </a>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-1.5 text-white/80 transition hover:text-white"
          >
            <Mail className="size-3.5 opacity-80 text-amber-400" />
            {site.email}
          </a>
          <span className="hidden text-white/30 xl:inline">|</span>
          <span className="hidden text-white/70 xl:inline flex-1 truncate max-w-sm">
            {site.address}
          </span>
        </div>
        
        {/* Social icons + Auth links */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 pr-4 border-r border-white/20">
            <a href={`https://wa.me/${site.whatsapp?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
              className="text-white/80 transition hover:text-white hover:scale-110" aria-label="WhatsApp">
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            <a href={site.socials.facebook} target="_blank" rel="noreferrer"
              className="text-white/80 transition hover:text-white hover:scale-110" aria-label="Facebook">
              <FacebookIcon className="size-4" />
            </a>
            <a href={site.socials.instagram} target="_blank" rel="noreferrer"
              className="text-white/80 transition hover:text-white hover:scale-110" aria-label="Instagram">
              <InstagramIcon className="size-4" />
            </a>
            <a href={site.socials.youtube} target="_blank" rel="noreferrer"
              className="text-white/80 transition hover:text-white hover:scale-110" aria-label="YouTube">
              <YoutubeIcon className="size-4" />
            </a>
          </div>

          <GoogleTranslate variant="dark" />
          <span className="h-4 w-px bg-white/20" />

          {user ? (
            <div className="flex items-center gap-3">
              <Link href={user.role === "admin" ? '/admin' : user.role === "volunteer" ? '/volunteer-portal' : '/member'} className="inline-flex items-center gap-1.5 text-[#051e57] bg-white transition hover:bg-white/90 px-3 py-1 rounded-full text-[11px] font-bold shadow-sm">
                <LayoutDashboard className="size-3.5" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1 text-white/80 hover:text-rose-400 text-[11px] font-semibold transition-colors"
              >
                <LogOut className="size-3" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="inline-flex items-center gap-1.5 text-white/90 transition hover:text-white text-[11px] font-semibold tracking-wide">
                <User className="size-3.5 text-amber-400" />
                Login
              </Link>
              <Link href="/admin-login" className="inline-flex items-center gap-1.5 text-white/90 transition hover:text-white text-[11px] font-semibold tracking-wide">
                <Lock className="size-3.5 text-amber-400" />
                Admin
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const user = useSelector(selectUser)
  const { data: siteContent } = useSelector((state) => state.siteContent)
  const dispatch = useDispatch()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout")
      dispatch(clearUser())
      toast.success("Logged out successfully")
    } catch (err) {
      toast.error("Error logging out")
    }
  }

  let site = { ...SITE }
  if (siteContent?.contact_info?.content) {
    try {
      const parsed = JSON.parse(siteContent.contact_info.content)
      if (parsed.email) site.email = parsed.email
      if (parsed.phones && Array.isArray(parsed.phones)) {
        const navbarPhones = parsed.phones.filter(p => p.showInNavbar).map(p => p.number).filter(Boolean)
        if (navbarPhones.length > 0) site.phones = navbarPhones
      } else if (parsed.phone) {
        site.phones = [parsed.phone]
      }
      if (parsed.facebook) site.socials.facebook = parsed.facebook
      if (parsed.instagram) site.socials.instagram = parsed.instagram
      if (parsed.twitter) site.socials.twitter = parsed.twitter
      if (parsed.youtube) site.socials.youtube = parsed.youtube
    } catch(e) {}
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/")

  const isGroupActive = (item) => item.children?.some((c) => isActive(c.href))

  if (pathname.startsWith("/admin") || pathname === "/member" || pathname.startsWith("/member/") || pathname.startsWith("/volunteer-portal")) {
    return null
  }

  return (
    <header className="sticky top-0 z-50">
      <TopBar />

      <div
        className={`transition-all duration-300 ${scrolled
          ? "border-b border-border bg-white/90 backdrop-blur-xl shadow-sm"
          : "border-b border-border/50 bg-white"
          }`}
      >
        <nav className="mx-auto flex h-16 sm:h-[80px] max-w-[1440px] items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 xl:px-8">
          <Logo />

          {/* Desktop nav */}
          <div className="hidden items-center gap-2 lg:flex">
            {MAIN_NAV.map((item) => {
              const Icon = NAV_ICONS[item.label] || Activity;
              return isGroup(item) ? (
                <HoverDropdown
                  key={item.label}
                  item={item}
                  isGroupActive={isGroupActive}
                  isActive={isActive}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-bold tracking-wide transition-all ${isActive(item.href)
                    ? "bg-primary/5 text-primary"
                    : "text-foreground/80 hover:bg-primary/5 hover:text-primary"
                    }`}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <Button
              asChild
              className="hidden h-11 rounded-full bg-primary px-6 text-[13px] font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:bg-primary/95 transition-all md:inline-flex"
            >
              <Link href="/donate">
                <Heart className="mr-2 size-4 animate-pulse text-white" />
                Donate Now
              </Link>
            </Button>

            {/* Mobile menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                className="inline-flex size-11 items-center justify-center rounded-2xl border border-border bg-secondary/50 text-foreground transition hover:bg-secondary hover:shadow-sm lg:hidden"
                aria-label="Open menu"
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </SheetTrigger>

              <SheetContent side="right" className="w-[90vw] max-w-sm overflow-y-auto p-0">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>

                <div className="flex items-center justify-between border-b border-border/70 bg-secondary/40 p-5">
                  <Logo />
                  <GoogleTranslate variant="light" />
                </div>

                <div className="p-4">
                  <Accordion type="multiple" className="w-full">
                    {MAIN_NAV.map((item) => {
                      const Icon = NAV_ICONS[item.label] || Activity;
                      return isGroup(item) ? (
                        <AccordionItem key={item.label} value={item.label} className="border-border/60">
                          <AccordionTrigger className="px-2 py-3.5 text-[15px] font-bold hover:no-underline hover:text-primary transition-colors">
                            <span className="flex items-center gap-3">
                              <Icon className="size-5 text-primary/70" />
                              {item.label}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="pb-3 pl-8">
                            <div className="flex flex-col gap-1 border-l-2 border-border/60 ml-2 pl-4">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${isActive(child.href)
                                    ? "bg-primary/10 text-primary translate-x-1"
                                    : "text-foreground/75 hover:bg-primary hover:text-white hover:translate-x-1"
                                    }`}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-3 rounded-xl px-2 py-3.5 text-[15px] font-bold transition-all ${isActive(item.href)
                            ? "bg-primary/5 text-primary"
                            : "text-foreground/80 hover:bg-secondary hover:text-primary"
                            }`}
                        >
                          <Icon className="size-5 text-primary/70" />
                          {item.label}
                        </Link>
                      )
                    })}
                  </Accordion>

                  <div className="mt-6 space-y-3 border-t border-border/70 pt-6">
                    <Button asChild className="h-12 w-full rounded-xl bg-primary font-bold text-white shadow-md hover:bg-primary/95">
                      <Link href="/donate">
                        <Heart className="mr-2 size-5 text-white" />
                        Make a Donation
                      </Link>
                    </Button>
                    
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {user ? (
                        <>
                          <Button asChild variant="outline" className="h-11 rounded-xl font-bold border-border shadow-sm text-foreground hover:bg-secondary">
                            <Link href={user.role === "admin" ? '/admin' : user.role === "volunteer" ? '/volunteer-portal' : '/member'}>
                              <LayoutDashboard className="mr-2 size-4" />
                              Portal
                            </Link>
                          </Button>
                          <Button onClick={handleLogout} variant="ghost" className="h-11 rounded-xl text-rose-600 bg-rose-50 hover:bg-rose-100 hover:text-rose-700 font-bold">
                            <LogOut className="mr-2 size-4" />
                            Logout
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button asChild variant="outline" className="h-11 rounded-xl font-bold border-border shadow-sm text-foreground hover:bg-secondary">
                            <Link href="/login">
                              <User className="mr-2 size-4 text-primary" />
                              Login
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="h-11 rounded-xl font-bold border-border shadow-sm text-foreground hover:bg-secondary">
                            <Link href="/admin-login">
                              <Lock className="mr-2 size-4 text-primary" />
                              Admin
                            </Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 overflow-hidden rounded-2xl bg-[#051e57] text-white relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <PhoneCall className="size-24" />
                    </div>
                    <div className="relative p-6">
                      <p className="text-[11px] font-black uppercase tracking-widest text-amber-400 mb-1">
                        Need help?
                      </p>
                      <h4 className="text-lg font-bold mb-4">Contact Support</h4>
                      
                      {site.phones.map((phone, idx) => (
                        <a key={idx} href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-3 mt-3 text-[15px] font-bold hover:text-amber-400 transition-colors">
                          <div className="flex size-8 items-center justify-center rounded-full bg-white/10">
                            <Phone className="size-4" />
                          </div>
                          {phone}
                        </a>
                      ))}
                      <a href={`mailto:${site.email}`} className="flex items-center gap-3 mt-3 text-[13px] font-medium text-white/80 hover:text-amber-400 transition-colors">
                        <div className="flex size-8 items-center justify-center rounded-full bg-white/10">
                          <Mail className="size-4" />
                        </div>
                        {site.email}
                      </a>
                      
                      <div className="mt-6 flex items-center gap-3">
                        <a href={site.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary transition-colors">
                          <FacebookIcon className="size-5" />
                        </a>
                        <a href={site.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary transition-colors">
                          <InstagramIcon className="size-5" />
                        </a>
                        <a href={site.socials.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary transition-colors">
                          <YoutubeIcon className="size-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}
