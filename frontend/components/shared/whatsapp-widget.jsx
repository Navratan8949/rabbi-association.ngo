"use client"
import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"

export function WhatsAppWidget() {
  const [show, setShow] = useState(false)
  const phoneNumber = "919999999999" // TODO: Should be fetched from SiteContent
  const message = "Hello Rabbi Association, I would like to know more about your work."

  useEffect(() => {
    // Show after a short delay so it doesn't distract immediately on load
    const timer = setTimeout(() => setShow(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-[100] flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition-all hover:-translate-y-1 hover:scale-110 hover:shadow-2xl hover:shadow-[#25D366]/40 p-3.5 group"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="size-8" />
      <span className="absolute left-full ml-4 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-sm font-bold text-slate-800 shadow-md opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
        Chat with us
      </span>
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
      </span>
    </a>
  )
}
