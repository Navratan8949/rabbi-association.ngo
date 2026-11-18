"use client";

import { useState, useEffect } from "react";
import { PageHero } from "@/components/pages/page-hero";
import {
  Image as ImageIcon,
  Video,
  Play,
  Eye,
  X,
  ExternalLink,
  Sparkles,
  Calendar,
  Layers,
  Film,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getGalleryItems } from "@/service/gallery.service";

function toEmbedUrl(url) {
  if (!url) return "";
  if (url.includes("/embed/")) return url;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
  }
  return url;
}

function getYoutubeThumbnail(url) {
  if (!url) return "";
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  if (match && match[1]) {
    return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  }
  return "";
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [previewItem, setPreviewItem] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getGalleryItems({ status: "active" });
        if (data?.success) {
          const list = data.galleryItems || data.data || data.gallery || [];
          setGallery(list);
        }
      } catch (error) {
        console.error("Failed to load gallery items", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const categories = [
    "All",
    "Conferences",
    "Seminars",
    "Educational Programs",
    "Community Initiatives",
    "Organizational Activities",
    "Lectures",
    "Interviews",
  ];

  const filteredItems = gallery.filter((item) => {
    if (filterType !== "all" && item.type !== filterType) return false;
    if (filterCategory !== "all" && item.category !== filterCategory) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        eyebrow="Media Gallery"
        title="Photo & Video Gallery"
        description="Glimpses of our impact, educational initiatives, school setups, and community development programs."
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Media & Reports", href: "/news" },
          { label: "Gallery", href: "/gallery" },
        ]}
      />

      <div className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Header & Controls */}
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-accent/15 text-accent text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="size-3.5" />
              Media Gallery
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy">
              Photo & Video Gallery
            </h2>
            <p className="mt-3 text-slate-600 text-sm md:text-base leading-relaxed">
              Explore photo highlights and watch recorded video coverage of association activities and programs.
            </p>
          </div>

          {/* Type Filter Buttons */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            <Button
              type="button"
              variant={filterType === "all" ? "default" : "outline"}
              onClick={() => setFilterType("all")}
              className={`rounded-full px-5 font-bold text-xs ${
                filterType === "all" ? "bg-navy text-white hover:bg-navy/90" : "bg-white text-navy border-slate-200"
              }`}
            >
              <Layers className="size-3.5 mr-1.5" />
              All Media ({gallery.length})
            </Button>
            <Button
              type="button"
              variant={filterType === "photo" ? "default" : "outline"}
              onClick={() => setFilterType("photo")}
              className={`rounded-full px-5 font-bold text-xs ${
                filterType === "photo" ? "bg-navy text-white hover:bg-navy/90" : "bg-white text-navy border-slate-200"
              }`}
            >
              <ImageIcon className="size-3.5 mr-1.5" />
              Photos ({gallery.filter((g) => g.type === "photo").length})
            </Button>
            <Button
              type="button"
              variant={filterType === "video" ? "default" : "outline"}
              onClick={() => setFilterType("video")}
              className={`rounded-full px-5 font-bold text-xs ${
                filterType === "video" ? "bg-navy text-white hover:bg-navy/90" : "bg-white text-navy border-slate-200"
              }`}
            >
              <Film className="size-3.5 mr-1.5" />
              Videos ({gallery.filter((g) => g.type === "video").length})
            </Button>
          </div>

          {/* Category Filter Pills */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isActive = (cat === "All" && filterCategory === "all") || filterCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilterCategory(cat === "All" ? "all" : cat)}
                  className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-accent text-navy shadow-xs font-bold"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Gallery Items Grid */}
          {loading ? (
            <div className="text-center py-24 text-muted-foreground font-semibold">
              <div className="size-10 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              Loading gallery...
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => {
                const title = item.title;
                const description = item.description;
                const isVideo = item.type === "video";
                const imageUrl =
                  item.image?.url ||
                  item.imageUrl ||
                  (typeof item.image === "string" ? item.image : null) ||
                  (isVideo ? getYoutubeThumbnail(item.videoUrl) : null);

                return (
                  <div
                    key={item._id || index}
                    onClick={() => setPreviewItem({ ...item, title, description, imageUrl })}
                    className="group relative flex flex-col rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-accent transition-all duration-300 cursor-pointer"
                  >
                    {/* Media Display Container: Fills entire card space edge-to-edge */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={title || "Gallery"}
                          fill
                          priority={index < 4}
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                          {isVideo ? <Video className="size-12" /> : <ImageIcon className="size-12" />}
                        </div>
                      )}

                      {/* Type Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center gap-1 rounded-full bg-navy/85 backdrop-blur-xs px-3 py-1 text-[11px] font-bold text-white shadow-xs border border-white/20 uppercase tracking-wider">
                          {isVideo ? (
                            <>
                              <Play className="size-3 fill-accent text-accent" /> Video
                            </>
                          ) : (
                            <>
                              <ImageIcon className="size-3 text-accent" /> Photo
                            </>
                          )}
                        </span>
                      </div>

                      {/* Category Badge */}
                      {item.category && (
                        <div className="absolute top-3 right-3 z-10">
                          <span className="inline-flex items-center rounded-full bg-accent text-navy px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                            {item.category}
                          </span>
                        </div>
                      )}

                      {/* Video Play Overlay */}
                      {isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="size-14 rounded-full bg-accent text-navy flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                            <Play className="size-6 fill-navy ml-1" />
                          </div>
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5 pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/95 px-3.5 py-1.5 text-xs font-bold text-navy shadow-sm backdrop-blur-xs">
                          <Eye className="size-3.5 text-accent" />
                          {isVideo ? "Play Video" : "View Full Size"}
                        </span>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-bold text-navy leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                          {title}
                        </h3>
                        {description && (
                          <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {description}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3 text-accent" />
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "Recent"}
                        </span>
                        <span className="text-accent font-bold group-hover:underline">
                          {isVideo ? "Watch →" : "View →"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 shadow-xs max-w-2xl mx-auto p-8">
              <div className="size-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                <ImageIcon className="size-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-navy">No media items found</h3>
              <p className="text-slate-500 text-sm mt-1">
                There are no active media items matching the selected filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Lightbox / Modal for Photos & Videos */}
      {previewItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl bg-white shadow-2xl overflow-hidden flex flex-col ring-1 ring-black/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-navy px-6 py-4 text-white">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-accent uppercase tracking-wider">
                  {previewItem.type === "video" ? "Video" : "Photo"}
                </span>
                <h3 className="text-base sm:text-lg font-bold truncate text-white">
                  {previewItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="size-9 rounded-full bg-white/10 hover:bg-rose-500 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 ml-4"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Media Body */}
            <div className="relative flex-1 bg-slate-950 flex items-center justify-center min-h-[300px] max-h-[65vh] overflow-hidden">
              {previewItem.type === "video" && previewItem.videoUrl ? (
                <div className="w-full aspect-video max-h-[65vh]">
                  <iframe
                    src={toEmbedUrl(previewItem.videoUrl)}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    title={previewItem.title}
                  />
                </div>
              ) : previewItem.imageUrl ? (
                <div className="relative size-full flex items-center justify-center p-4">
                  <img
                    src={previewItem.imageUrl}
                    alt={previewItem.title}
                    className="max-h-[62vh] max-w-full object-contain rounded-xl shadow-lg"
                  />
                </div>
              ) : (
                <div className="text-slate-400 p-12 text-center">
                  <ImageIcon className="size-16 mx-auto mb-2 opacity-40" />
                  <p>No preview media available</p>
                </div>
              )}
            </div>

            {/* Footer Details */}
            <div className="p-5 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="max-w-xl">
                {previewItem.category && (
                  <span className="text-[11px] font-bold uppercase tracking-wider text-accent mb-1 block">
                    {previewItem.category}
                  </span>
                )}
                <h4 className="text-base font-bold text-navy leading-snug">
                  {previewItem.title}
                </h4>
                {previewItem.description && (
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {previewItem.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                {previewItem.imageUrl && (
                  <a
                    href={previewItem.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 px-4 py-2 text-xs font-bold text-navy transition-all"
                  >
                    <ExternalLink className="size-3.5" /> Open Original
                  </a>
                )}
                <Button
                  type="button"
                  variant="default"
                  onClick={() => setPreviewItem(null)}
                  className="bg-navy text-white hover:bg-navy/90 rounded-xl text-xs font-bold"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
