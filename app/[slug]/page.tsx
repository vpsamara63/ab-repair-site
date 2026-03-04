import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { appliances, getApplianceBySlug, isApplianceSlug, extractApplianceSlug } from "@/lib/data/appliances";
import { allBrands, getBrandBySlug } from "@/lib/data/brands";
import { getBrandsForAppliance } from "@/lib/data/serviceBrands";
import { primaryCities } from "@/lib/data/cities";
import { SITE_CONFIG } from "@/lib/utils";
import { getApplianceMetadata } from "@/lib/seo/metadata";
import { getLocalBusinessSchema, getServiceSchema, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo/schema";
import { StructuredData } from "@/components/StructuredData";
import { ContactSection } from "@/components/ContactSection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return appliances.map((a) => ({ slug: `${a.slug}-repair` }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isApplianceSlug(slug)) return {};
  const appliance = getApplianceBySlug(extractApplianceSlug(slug));
  if (!appliance) return {};
  return getApplianceMetadata(appliance);
}

export default async function AppliancePage({ params }: PageProps) {
  const { slug } = await params;
  if (!isApplianceSlug(slug)) notFound();

  const appliance = getApplianceBySlug(extractApplianceSlug(slug));
  if (!appliance) notFound();

  const brandSlugs = getBrandsForAppliance(appliance.slug);
  const brands = brandSlugs
    .map((s) => getBrandBySlug(s))
    .filter((b): b is NonNullable<typeof b> => b != null);

  const faqs = [
    {
      question: `How much does ${appliance.shortName.toLowerCase()} repair cost in Bayonne, NJ?`,
      answer: `${appliance.shortName} repair costs vary depending on the issue. Contact us at ${SITE_CONFIG.phone} for a free estimate. We offer transparent pricing with no hidden fees.`,
    },
    {
      question: `Do you offer same-day ${appliance.shortName.toLowerCase()} repair?`,
      answer: `Yes! We offer same-day ${appliance.shortName.toLowerCase()} repair service in Bayonne and surrounding areas. Call us before 1 PM for same-day service.`,
    },
    {
      question: `What ${appliance.shortName.toLowerCase()} brands do you repair?`,
      answer: `We repair all major brands including ${brands.slice(0, 6).map(b => b.name).join(", ")}, and more.`,
    },
  ];

  return (
    <>
      <StructuredData data={getLocalBusinessSchema()} />
      <StructuredData data={getServiceSchema(appliance)} />
      <StructuredData
        data={getBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: appliance.name, url: `/${appliance.slug}-repair` },
        ])}
      />
      <StructuredData data={getFAQSchema(faqs)} />

      {/* Hero */}
      <section className="bg-brand-dark-green py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-brand-orange">
              Expert Service
            </p>
            <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl">
              Professional{" "}
              <span className="text-brand-orange">{appliance.name}</span> in
              Bayonne, NJ
            </h1>
            <p className="mb-8 text-lg text-gray-300">{appliance.description}</p>
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-brand-orange-hover"
            >
              <Phone className="h-5 w-5" />
              Call {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-brand-dark-green">
            Common {appliance.shortName} Problems We Fix
          </h2>
          <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
            {appliance.commonIssues.map((issue) => (
              <div
                key={issue}
                className="flex items-center gap-3 rounded-lg border border-gray-200 p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-sm text-brand-orange">
                  ✓
                </span>
                <span className="text-brand-dark-green">{issue}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands we service for this appliance */}
      <section className="bg-brand-cream py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-brand-dark-green">
            {appliance.shortName} Brands We Repair
          </h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/${appliance.slug}-repair/${brand.slug}`}
                className="flex items-center justify-center rounded-lg bg-white p-4 text-center text-sm font-medium text-brand-dark-green shadow-sm transition-all hover:shadow-md hover:border-brand-orange"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-brand-dark-green">
            {appliance.name} Near You
          </h2>
          <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {primaryCities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}/${appliance.slug}-repair`}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-all hover:border-brand-orange"
              >
                <span className="font-medium text-brand-dark-green">
                  {city.name}, {city.state}
                </span>
                <ArrowRight className="h-4 w-4 text-brand-orange" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-cream py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-brand-dark-green">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-brand-dark-green">
                  {faq.question}
                </h3>
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
