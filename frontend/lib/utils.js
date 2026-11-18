import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function toAbsoluteFileUrl(url) {
  if (!url || typeof url !== 'string') return ""
  if (url.startsWith("blob:") || url.startsWith("data:")) return url
  
  const cleanUrl = url.trim()
  
  if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")) {
    if (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
      if (cleanUrl.includes("localhost:8000") || cleanUrl.includes("127.0.0.1:8000")) {
        const prodBackendBase = process.env.NEXT_PUBLIC_API_URL 
          ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/v1\/?$/, "")
          : `http://${window.location.hostname}:8000`
        return cleanUrl.replace(/https?:\/\/(localhost|127\.0\.0\.1):8000/, prodBackendBase)
      }
    }
    return cleanUrl
  }

  const base = process.env.NEXT_PUBLIC_API_URL 
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/v1\/?$/, "") 
    : (typeof window !== "undefined" && window.location.hostname 
        ? `http://${window.location.hostname}:8000` 
        : "http://localhost:8000")

  const path = cleanUrl.startsWith("/") ? cleanUrl : `/${cleanUrl}`
  return `${base}${path}`
}
