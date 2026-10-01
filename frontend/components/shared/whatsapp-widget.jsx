"use client"
import { useEffect, useState } from "react"

import { useSelector } from "react-redux"
import { SITE } from "@/constants/site"

export function WhatsAppWidget() {
  const [show, setShow] = useState(false)
  const { data: siteContent } = useSelector((state) => state.siteContent)
  
  let phoneNumber = SITE.whatsapp ? SITE.whatsapp.replace(/\D/g, "") : "919999999999"
  if (siteContent?.contact_info?.content) {
    try {
      const parsed = JSON.parse(siteContent.contact_info.content)
      let rawNum = ""
      if (parsed.phones && Array.isArray(parsed.phones) && parsed.phones.length > 0) {
        rawNum = parsed.phones[0].number
      } else if (parsed.phone) {
        rawNum = parsed.phone
      }
      
      if (rawNum) {
        rawNum = rawNum.replace(/[\s\-\(\)]/g, "")
        if (rawNum.startsWith("+")) {
          rawNum = rawNum.substring(1)
        } else if (rawNum.length === 10) {
          rawNum = "91" + rawNum
        }
        phoneNumber = rawNum
      }
    } catch (e) {}
  }

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
      className="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-all hover:-translate-y-1 hover:scale-110 hover:shadow-2xl hover:shadow-[#25D366]/50 group"
      aria-label="Chat with us on WhatsApp"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        className="h-8 w-8 text-white"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
      </svg>
      <span className="absolute right-full mr-4 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-sm font-bold text-slate-800 shadow-md opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
        Chat with us
      </span>
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
      </span>
    </a>
  )
}
