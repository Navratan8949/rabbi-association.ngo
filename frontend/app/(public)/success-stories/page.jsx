import { PageHero } from "@/components/pages/page-hero";
import { Star, Quote, Heart } from "lucide-react";
import { getTestimonials } from "@/service/testimonial.service";

export const metadata = {
  title: "Success Stories | Rabbi Association",
  description:
    "Read inspiring success stories and testimonials from individuals and communities whose lives have been transformed.",
};

export default async function SuccessStoriesPage() {
  let stories = [];
  
  try {
    const res = await getTestimonials();
    if (res?.success) {
      stories = res.testimonials || res.data || [];
    }
  } catch (error) {
    // Error silently handled, fallback to empty array or default static ones if you want
    // But since it's dynamic, we'll just show what's in DB
  }

  // Fallback stories if DB is empty
  if (stories.length === 0) {
    stories = [
      {
        name: "Rural School Renovation",
        designation: "School Principal",
        message:
          "The new classrooms have completely changed the way our children learn. Attendance has doubled!",
      },
      {
        name: "Women Empowerment Program",
        designation: "Program Beneficiary",
        message:
          "I can now support my family and send my children to school with the income I earn from my tailoring business.",
      },
    ];
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        title="Success Stories"
        description="Discover the real-world impact of our initiatives through the inspiring stories of those we've helped."
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Our Work", href: "/projects" },
          { label: "Success Stories", href: "/success-stories" },
        ]}
      />

      <div className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <div
                key={story._id || index}
                className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col"
              >
                <div className="p-8 flex-grow">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="size-5 text-accent" fill="currentColor" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#edc12d] bg-accent/10 px-3 py-1 rounded-full">
                      Success Story
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-navy mb-4">
                    {story.name}
                  </h3>

                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative mt-auto">
                    <Quote className="absolute top-4 right-4 size-8 text-slate-200" />
                    <p className="text-slate-700 italic font-medium relative z-10 mb-4 whitespace-pre-wrap">
                      "{story.message}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="bg-navy/10 p-2 rounded-full shrink-0">
                        <Heart className="size-4 text-navy" />
                      </div>
                      <span className="text-sm font-bold text-navy">
                        {story.designation || "Beneficiary"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
