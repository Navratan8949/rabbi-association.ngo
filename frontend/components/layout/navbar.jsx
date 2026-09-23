"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { ChevronDown, Heart, Lock, Mail, Menu, Phone, User, X } from "lucide-react"
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

// Social icons as inline SVG (no extra package needed)
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

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`group flex items-center gap-1 px-3 py-2 text-[13.5px] font-bold tracking-wide transition-colors outline-none relative ${isGroupActive(item)
          ? "text-foreground after:absolute after:bottom-0 after:left-3 after:right-9 after:h-0.5 after:bg-primary after:rounded-full"
          : "text-foreground/80 hover:text-primary"
          }`}
      >
        {item.label}
        <ChevronDown className={`size-3.5 opacity-50 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={2}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-60 rounded-2xl border border-border/60 bg-white p-2 shadow-xl"
      >
        {item.children.map((child) => (
          <DropdownMenuItem key={child.href} className="rounded-xl p-0 focus:bg-primary focus:text-white">
            <Link
              href={child.href}
              className={`block w-full rounded-xl px-3 py-2.5 text-sm transition ${isActive(child.href)
                ? "bg-primary/10 font-semibold text-primary"
                : "text-foreground/80"
                }`}
            >
              {child.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

import { useSelector, useDispatch } from "react-redux"
import { selectUser, clearUser } from "@/redux/features/userSlice"
import { LayoutDashboard, LogOut } from "lucide-react"
import api from "@/service/api"
import { toast } from "sonner"

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
    <div className="hidden bg-primary text-white md:block border-b border-primary/20">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 lg:px-12 py-2.5 text-[12px] font-medium tracking-wide">
        <div className="flex items-center gap-6">
          {site.phones.map((phone, idx) => (
            <a
              key={idx}
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-1.5 text-white transition hover:text-white/80"
            >
              <Phone className="size-3.5 opacity-80" />
              {phone}
            </a>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-1.5 text-white transition hover:text-white/80"
          >
            <Mail className="size-3.5 opacity-80" />
            {site.email}
          </a>
          <span className="hidden text-white/40 xl:inline">|</span>
          <span className="hidden text-white/90 xl:inline">
            {site.address}
          </span>
        </div>
        {/* Social icons + Auth links */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 pr-4 border-r border-white/20">
            <a href={`https://wa.me/${site.whatsapp?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
              className="text-white transition hover:scale-110" aria-label="WhatsApp">
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            <a href={site.socials.facebook} target="_blank" rel="noreferrer"
              className="text-white transition hover:scale-110" aria-label="Facebook">
              <FacebookIcon className="size-4" />
            </a>
            <a href={site.socials.instagram} target="_blank" rel="noreferrer"
              className="text-white transition hover:scale-110" aria-label="Instagram">
              <InstagramIcon className="size-4" />
            </a>
            <a href={site.socials.youtube} target="_blank" rel="noreferrer"
              className="text-white transition hover:scale-110" aria-label="YouTube">
              <YoutubeIcon className="size-4" />
            </a>
          </div>

          <GoogleTranslate variant="dark" />
          <span className="h-4 w-px bg-white/20" />

          {user ? (
            <div className="flex items-center gap-3">
              <Link href={user.role === "admin" ? '/admin' : user.role === "volunteer" ? '/volunteer-portal' : '/member'} className="inline-flex items-center gap-1.5 text-primary bg-white transition hover:bg-white/90 px-3 py-1 rounded-[4px] text-[11px] font-bold">
                <LayoutDashboard className="size-3.5" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1 text-white hover:text-white/80 text-[11px] font-semibold transition-colors"
              >
                <LogOut className="size-3" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="inline-flex items-center gap-1.5 text-white transition hover:text-white/80 text-[11px] font-semibold tracking-wide">
                <User className="size-3.5 opacity-80" />
                Member/Volunteer Login
              </Link>
              <Link href="/admin-login" className="inline-flex items-center gap-1.5 text-white transition hover:text-white/80 text-[11px] font-semibold tracking-wide">
                <Lock className="size-3.5 opacity-80" />
                Admin Login
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

  if (pathname.startsWith("/admin") || pathname === "/member" || pathname.startsWith("/member/")) {
    return null
  }

  return (
    <header className="sticky top-0 z-50">
      <TopBar />

      <div
        className={`transition-all duration-300 ${scrolled
          ? "border-b border-border bg-white shadow-sm"
          : "border-b border-border bg-white"
          }`}
      >
        <nav className="mx-auto flex h-16 sm:h-[72px] max-w-[1440px] items-center justify-between gap-2 sm:gap-3 px-3 sm:px-6 xl:px-8">
          <Logo />

          {/* Desktop nav */}
          <div className="hidden items-center gap-2 lg:flex">
            {MAIN_NAV.map((item) =>
              isGroup(item) ? (
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
                  className={`relative px-3 py-2 text-[13.5px] font-bold tracking-wide transition-colors ${isActive(item.href)
                    ? "text-foreground after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-primary after:rounded-full"
                    : "text-foreground/80 hover:text-primary"
                    }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>

          <div className="flex items-center gap-2">

            <Button
              asChild
              size="sm"
              className="hidden h-10 rounded-md bg-primary px-5 text-[13px] font-bold text-white shadow-sm hover:bg-primary/90 transition-all md:inline-flex"
            >
              <Link href="/donate">
                <Heart className="mr-1.5 size-3.5" />
                Donate Now
              </Link>
            </Button>

            {/* Mobile menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-white text-foreground transition hover:bg-secondary lg:hidden"
                aria-label="Open menu"
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </SheetTrigger>

              <SheetContent side="right" className="w-[90vw] max-w-sm overflow-y-auto p-0">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>

                <div className="flex items-center justify-between border-b border-border/70 bg-secondary/40 p-4">
                  <Logo />
                  <GoogleTranslate variant="light" />
                </div>

                <div className="p-3">
                  <Accordion type="multiple" className="w-full">
                    {MAIN_NAV.map((item) =>
                      isGroup(item) ? (
                        <AccordionItem key={item.label} value={item.label} className="border-border/60">
                          <AccordionTrigger className="px-2 py-3 text-sm font-semibold hover:no-underline hover:text-navy">
                            {item.label}
                          </AccordionTrigger>
                          <AccordionContent className="pb-2">
                            <div className="flex flex-col gap-0.5">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className={`rounded-lg px-3 py-2.5 text-sm transition ${isActive(child.href)
                                    ? "bg-navy/5 font-semibold text-navy"
                                    : "text-foreground/75 hover:bg-secondary hover:text-navy"
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
                          className={`block rounded-lg px-2 py-3 text-sm font-semibold transition ${isActive(item.href)
                            ? "bg-navy/5 text-navy"
                            : "text-foreground/80 hover:bg-secondary hover:text-navy"
                            }`}
                        >
                          {item.label}
                        </Link>
                      ),
                    )}
                  </Accordion>

                  <div className="mt-5 space-y-2 border-t border-border/70 pt-5">
                    <Button asChild className="h-11 w-full rounded-lg bg-primary font-bold text-white hover:bg-primary/90">
                      <Link href="/donate">
                        <Heart className="mr-2 size-4" />
                        Donate Now
                      </Link>
                    </Button>
                    {user ? (
                      <>
                        <Button asChild variant="outline" className="h-11 w-full rounded-lg font-semibold border-foreground/20 text-foreground hover:bg-secondary">
                          <Link href={user.role === "admin" ? '/admin' : user.role === "volunteer" ? '/volunteer-portal' : '/member'}>
                            <LayoutDashboard className="mr-2 size-4" />
                            Go to Dashboard
                          </Link>
                        </Button>
                        <Button onClick={handleLogout} variant="ghost" className="h-10 w-full rounded-lg text-rose-600 hover:bg-rose-50 hover:text-rose-700 font-semibold">
                          <LogOut className="mr-2 size-4" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button asChild variant="outline" className="h-11 w-full rounded-lg font-semibold border-foreground/20 text-foreground hover:bg-secondary">
                          <Link href="/login">
                            <User className="mr-2 size-4" />
                            Member/Volunteer Login
                          </Link>
                        </Button>
                        <Button asChild variant="ghost" className="h-10 w-full rounded-lg text-muted-foreground hover:text-foreground">
                          <Link href="/admin-login">
                            <Lock className="mr-2 size-4" />
                            Admin Login
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>

                  <div className="mt-6 rounded-lg bg-[#222222] p-4 text-white">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Need help?
                    </p>
                    {site.phones.map((phone, idx) => (
                      <a key={idx} href={`tel:${phone.replace(/\s/g, "")}`} className="mt-2 block text-sm font-medium hover:text-primary transition-colors">
                        {phone}
                      </a>
                    ))}
                    <a href={`mailto:${site.email}`} className="mt-1 block text-sm text-white/70 hover:text-primary transition-colors">
                      {site.email}
                    </a>
                    {/* Social icons in mobile menu */}
                    <div className="mt-3 flex items-center gap-4">
                      <a href={site.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="text-white/50 hover:text-primary transition-colors">
                        <FacebookIcon className="size-4" />
                      </a>
                      <a href={site.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-white/50 hover:text-primary transition-colors">
                        <InstagramIcon className="size-4" />
                      </a>
                      <a href={site.socials.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="text-white/50 hover:text-primary transition-colors">
                        <YoutubeIcon className="size-4" />
                      </a>
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