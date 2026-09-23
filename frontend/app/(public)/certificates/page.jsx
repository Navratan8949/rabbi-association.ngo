"use client";

import { useEffect, useState } from "react";
import { PageHero } from "@/components/pages/page-hero";
import { getDownloads } from "@/service/download.service";
import { FileText, Download, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function CertificatesPage() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const res = await getDownloads({ status: "active" });
        if (res && res.success && res.downloads) {
          setDownloads(res.downloads);
        } else {
            // fallback if it just returns array directly
            if(Array.isArray(res)) setDownloads(res);
            else if (res.data) setDownloads(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch certificates:", error);
        toast.error("Failed to load certificates and documents.");
      } finally {
        setLoading(false);
      }
    };
    fetchDownloads();
  }, []);

  return (
    <>
      <PageHero
        title="Certificates & Documents"
        description="View and download our official NGO certificates, legal documents, and publications."
        image="/logo.png"
      />

      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="size-10 animate-spin text-primary" />
            <p className="mt-4 text-lg font-medium">Loading documents...</p>
          </div>
        ) : downloads.length === 0 ? (
          <div className="mx-auto max-w-2xl text-center py-20">
            <div className="rounded-3xl border border-dashed border-border/80 bg-card p-12 shadow-sm">
              <h3 className="text-xl font-bold text-navy">No documents available</h3>
              <p className="mt-2 text-muted-foreground">Please check back later for updates.</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {downloads.map((doc) => (
              <div
                key={doc._id}
                className="group flex flex-col overflow-hidden rounded-[2rem] border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <FileText className="size-6" />
                  </div>
                  
                  <span className="mb-2 inline-flex max-w-fit items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-foreground/80">
                    {doc.category || "Document"}
                  </span>
                  
                  <h3 className="mb-2 line-clamp-2 text-lg font-bold text-navy group-hover:text-primary transition-colors">
                    {doc.title}
                  </h3>
                  
                  {doc.description && (
                    <p className="mb-6 line-clamp-3 text-sm font-medium text-muted-foreground">
                      {doc.description}
                    </p>
                  )}
                  
                  <div className="mt-auto pt-4 border-t border-border/50">
                    <a
                      href={doc.file?.url || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-secondary py-3 text-sm font-bold text-foreground transition-colors hover:bg-primary hover:text-white"
                    >
                      View Certificate
                      <ExternalLink className="size-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
