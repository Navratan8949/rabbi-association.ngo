import { PageHero } from "@/components/pages/page-hero";
import { Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getGalleryItems } from "@/service/gallery.service";

export const metadata = {
  title: "Photo & Video Gallery | Rabbi Association",
  description: "Browse photos and videos of our educational initiatives, school setups, and community development programs.",
};

export default async function GalleryPage() {
  let gallery = [];
  try {
    const data = await getGalleryItems({ type: "image", status: "active" }); // Assuming backend uses type 'image' or returns all photos
    if (data?.success) {
      gallery = data.data || data.gallery || [];
      // Filter out only images just in case
      gallery = gallery.filter(item => item.type === "image" || !item.type);
    }
  } catch (error) {
    // error ignored
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        title="Photo & Video Gallery"
        description="Glimpses of our impact and activities across various initiatives."
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Media & Reports", href: "/news" },
          { label: "Gallery", href: "/gallery/photos" },
        ]}
      />

      <div className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          
          {gallery.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {gallery.map((item, index) => (
                <div key={item._id || index} className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-200 shadow-sm border border-slate-100">
                  <Image
                    src={item.image?.url || item.url || "/placeholder-image.jpg"}
                    alt={item.title || "Gallery Image"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <h3 className="text-white font-bold text-lg">{item.title || "Media Event"}</h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-[2rem] shadow-sm border border-slate-100 text-center max-w-4xl mx-auto">
              <div className="flex size-20 items-center justify-center rounded-full bg-accent/10 mb-6 mx-auto">
                <ImageIcon className="size-10 text-accent-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-navy mb-4">Media Gallery</h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                We are currently organizing our media library. Check back soon for high-quality photos and videos of our recent workshops, school setup projects, and community events.
              </p>
              
              <div className="pt-4">
                <Button asChild size="lg" className="bg-navy text-white hover:bg-navy/90 rounded-full font-bold px-10">
                  <Link href="/news">
                    Read Our Latest News
                  </Link>
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
