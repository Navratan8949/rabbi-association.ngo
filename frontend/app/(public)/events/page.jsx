import { PageHero } from "@/components/pages/page-hero"
import { CardsGrid } from "@/components/pages/cards-grid"
import { getEvents } from "@/service/event.service"

export const metadata = {
  title: "Events & Forums | Rabbi Association",
  description: "Conferences, seminars, and intellectual gatherings."
}

export default async function Page() {
  let events = []
  
  try {
    const res = await getEvents()
    if (res?.success) {
      events = res.events || res.data || []
    }
  } catch (err) {
    // Silently handle error, fallback to empty array
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero 
        eyebrow="Events" 
        title="Events & Forums" 
        description="Conferences, seminars, and intellectual gatherings." 
        image="/community-health-camp-india.png" 
      />
      {events.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground font-medium">No upcoming events found.</div>
      ) : (
        <CardsGrid items={events} type="event" />
      )}
    </main>
  )
}
