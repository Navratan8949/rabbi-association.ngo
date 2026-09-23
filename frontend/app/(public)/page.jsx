import { Hero } from "@/components/sections/hero";
import { AboutPreview } from "@/components/sections/about-preview";
import { IdentityAndApproach } from "@/components/sections/identity-and-approach";
import { FocusAreas } from "@/components/sections/focus-areas";
import { BrochurePartner } from "@/components/sections/brochure-partner";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ParallaxBanner } from "@/components/sections/parallax-banner";
import { Testimonials } from "@/components/sections/testimonials";
import { LatestUpdates } from "@/components/sections/latest-updates";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = {
  title: "Rabbi Association | Education | Empowerment | Equal Opportunities",
  description: "Rabbi Association is committed to making life better through education.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <FocusAreas />
      <BrochurePartner />
      <FeaturedProjects />
      <ParallaxBanner />
      <Testimonials />
      <LatestUpdates />
      <CtaBand />
    </>
  );
}
