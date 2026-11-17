import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { WhatsAppWidget } from "@/components/shared/whatsapp-widget"
import { ScrollToTop } from "@/components/shared/scroll-to-top"

export default function PublicLayout({ children }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
      <WhatsAppWidget />
    </div>
  )
}
