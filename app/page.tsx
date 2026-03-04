import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { BrandsSection } from "@/components/BrandsSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ServiceAreaSection } from "@/components/ServiceAreaSection";
import { ContactSection } from "@/components/ContactSection";
import { StructuredData } from "@/components/StructuredData";
import { getLocalBusinessSchema } from "@/lib/seo/schema";
import { getHomeMetadata } from "@/lib/seo/metadata";

export const metadata = getHomeMetadata();

export default function HomePage() {
  return (
    <>
      <StructuredData data={getLocalBusinessSchema()} />
      <Hero />
      <ServicesSection />
      <WhyChooseUs />
      <BrandsSection />
      <ReviewsSection />
      <ServiceAreaSection />
      <ContactSection />
    </>
  );
}
