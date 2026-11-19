import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function toAbsoluteFileUrl(url) {
  if (!url || typeof url !== 'string') return ""
  if (url.startsWith("blob:") || url.startsWith("data:")) return url
  
  let cleanUrl = url.trim()
  
  // Determine the correct backend origin based on environment and browser location
  let backendOrigin = ""
  if (typeof window !== "undefined" && window.location) {
    const { hostname, protocol } = window.location
    if (hostname.includes("rabbi.co.in") || hostname.includes("rabbi-association.ngo")) {
      backendOrigin = "https://api.rabbi.co.in"
    } else if (hostname === "localhost" || hostname === "127.0.0.1") {
      backendOrigin = "http://localhost:8000"
    } else {
      const apiEnv = process.env.NEXT_PUBLIC_API_URL
      if (apiEnv && !apiEnv.includes("localhost")) {
        backendOrigin = apiEnv.replace(/\/api\/v1\/?$/, "")
      } else {
        backendOrigin = `${protocol}//${hostname}:8000`
      }
    }
  } else {
    const apiEnv = process.env.NEXT_PUBLIC_API_URL
    backendOrigin = (apiEnv && !apiEnv.includes("localhost"))
      ? apiEnv.replace(/\/api\/v1\/?$/, "")
      : "http://localhost:8000"
  }

  // If already an absolute URL
  if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")) {
    if (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
      // 1. Replace localhost / 127.0.0.1:8000
      if (cleanUrl.includes("localhost:8000") || cleanUrl.includes("127.0.0.1:8000")) {
        cleanUrl = cleanUrl.replace(/https?:\/\/(localhost|127\.0\.0\.1):8000/, backendOrigin)
      } else if (cleanUrl.includes("rabbi.co.in") && !cleanUrl.includes("api.rabbi.co.in")) {
        // e.g. http://rabbi.co.in:8000 or http://rabbi.co.in/public -> https://api.rabbi.co.in
        cleanUrl = cleanUrl.replace(/https?:\/\/(?:www\.)?rabbi\.co\.in(?::8000)?/, "https://api.rabbi.co.in")
      }
    }
    
    // 2. Ensure HTTPS when the client page is served over HTTPS to avoid mixed-content blocks
    if (typeof window !== "undefined" && window.location.protocol === "https:" && cleanUrl.startsWith("http://") && !cleanUrl.includes("localhost")) {
      cleanUrl = cleanUrl.replace(/^http:\/\//, "https://")
    }
    
    return cleanUrl
  }

  // Relative path (e.g., /public/uploads/...)
  const path = cleanUrl.startsWith("/") ? cleanUrl : `/${cleanUrl}`
  return `${backendOrigin}${path}`
}
