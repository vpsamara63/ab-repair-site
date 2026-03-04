import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import {
  appliances,
  getApplianceBySlug,
  isApplianceSlug,
  extractApplianceSlug,
} from "@/lib/data/appliances";
import { allBrands, getBrandBySlug, isBrandSlug } from "@/lib/data/brands";
import { cities, getCityBySlug, isCitySlug } from "@/lib/data/cities";
import { getBrandsForAppliance, getAppliancesForBrand } from "@/lib/data/serviceBrands";
import { SITE_CONFIG } from "@/lib/utils";
import { getBrandServiceMetadata, getCityServiceMetadata } from "@/lib/seo/metadata";
import {
  getLocalBusinessSchema,
  getServiceSchema,
  getBreadcrumbSchema,
  getFAQSchema,
} from "@/lib/seo/schema";
import { StructuredData } from "@/components/StructuredData";
import { ContactSection } from "@/components/ContactSection";

interface PageProps {
  params: Promise<{ slug: string; sub: string }>;
}

type PageType =
  | { kind: "brand"; applianceSlug: string; brandSlug: string }
  | { kind: "city"; citySlug: string; applianceSlug: string };

function resolvePageType(slug: string, sub: string): PageType | null {
  // /refrigerator-repair/lg → brand page
  if (isApplianceSlug(slug) && isBrandSlug(sub)) {
    return { kind: "brand", applianceSlug: extractApplianceSlug(slug), brandSlug: sub };
  }
  // /bayonne/refrigerator-repair → city service page
  if (isCitySlug(slug) && isApplianceSlug(sub)) {
    return { kind: "city", citySlug: slug, applianceSlug: extractApplianceSlug(sub) };
  }
  return null;
}

export async function generateStaticParams() {
  const params: { slug: string; sub: string }[] = [];

  // Brand pages: /refrigerator-repair/lg
  for (const appliance of appliances) {
    for (const brandSlug of getBrandsForAppliance(appliance.slug)) {
      params.push({ slug: `${appliance.slug}-repair`, sub: brandSlug });
    }
  }

  // City service pages: /bayonne/refrigerator-repair
  for (const city of cities) {
    for (const appliance of appliances) {
      params.push({ slug: city.slug, sub: `${appliance.slug}-repair` });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, sub } = await params;
  const pageType = resolvePageType(slug, sub);
  if (!pageType) return {};

  if (pageType.kind === "brand") {
    const appliance = getApplianceBySlug(pageType.applianceSlug);
    const brand = getBrandBySlug(pageType.brandSlug);
    if (!appliance || !brand) return {};
    return getBrandServiceMetadata(appliance, brand);
  }

  const city = getCityBySlug(pageType.citySlug);
  const appliance = getApplianceBySlug(pageType.applianceSlug);
  if (!city || !appliance) return {};
  return getCityServiceMetadata(city, appliance);
}

export default async function DynamicSubPage({ params }: PageProps) {
  const { slug, sub } = await params;
  const pageType = resolvePageType(slug, sub);
  if (!pageType) notFound();

  if (pageType.kind === "brand") {
    return <BrandPage applianceSlug={pageType.applianceSlug} brandSlug={pageType.brandSlug} />;
  }

  return <CityServicePage citySlug={pageType.citySlug} applianceSlug={pageType.applianceSlug} />;
}

/* ── Brand Page ── */

function BrandPage({ applianceSlug, brandSlug }: { applianceSlug: string; brandSlug: string }) {
  const appliance = getApplianceBySlug(applianceSlug);
  const brand = getBrandBySlug(brandSlug);
  if (!appliance || !brand) notFound();

  const otherAppliances = getAppliancesForBrand(brandSlug)
    .filter((s) => s !== applianceSlug)
    .map((s) => getApplianceBySlug(s))
    .filter((a): a is NonNullable<typeof a> => a != null);

  const faqs = [
    {
      question: `How much does ${brand.name} ${appliance.shortName.toLowerCase()} repair cost?`,
      answer: `Repair costs depend on the specific issue. Contact us at ${SITE_CONFIG.phone} for a free estimate on your ${brand.name} ${appliance.shortName.toLowerCase()}.`,
    },
    {
      question: `Are your technicians certified to repair ${brand.name} appliances?`,
      answer: `Yes, our technicians are experienced in servicing ${brand.name} ${appliance.shortName.toLowerCase()}s and all other major brands.`,
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
          { name: brand.name, url: `/${appliance.slug}-repair/${brand.slug}` },
        ])}
      />
      <StructuredData data={getFAQSchema(faqs)} />

      <section className="bg-brand-dark-green py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-brand-orange">
            {brand.name} Specialist
          </p>
          <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl">
            <span className="text-brand-orange">{brand.name}</span>{" "}
            {appliance.name} in Bayonne, NJ
          </h1>
          <p className="mb-8 text-lg text-gray-300">
            Expert {brand.name} {appliance.shortName.toLowerCase()} repair
            service. Our certified technicians diagnose and fix {brand.name}{" "}
            appliances quickly and affordably.
          </p>
          <a
            href={`tel:${SITE_CONFIG.phoneRaw}`}
            className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-brand-orange-hover"
          >
            <Phone className="h-5 w-5" />
            Call {SITE_CONFIG.phone}
          </a>
        </div>
      </section>

      {/* Common issues */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-brand-dark-green">
            Common {brand.name} {appliance.shortName} Issues
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

      {/* Other services for this brand */}
      {otherAppliances.length > 0 && (
        <section className="bg-brand-cream py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-8 text-center text-3xl font-bold text-brand-dark-green">
              Other {brand.name} Repairs
            </h2>
            <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
              {otherAppliances.map((a) => (
                <Link
                  key={a.slug}
                  href={`/${a.slug}-repair/${brand.slug}`}
                  className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md"
                >
                  <span className="font-medium text-brand-dark-green">
                    {brand.name} {a.name}
                  </span>
                  <ArrowRight className="h-4 w-4 text-brand-orange" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-brand-dark-green">
            FAQ
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-lg bg-gray-50 p-6">
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

/* ── City + Service Page ── */

function CityServicePage({
  citySlug,
  applianceSlug,
}: {
  citySlug: string;
  applianceSlug: string;
}) {
  const city = getCityBySlug(citySlug);
  const appliance = getApplianceBySlug(applianceSlug);
  if (!city || !appliance) notFound();

  const brandSlugs = getBrandsForAppliance(appliance.slug);
  const brands = brandSlugs
    .map((s) => getBrandBySlug(s))
    .filter((b): b is NonNullable<typeof b> => b != null);

  const faqs = [
    {
      question: `Do you offer ${appliance.shortName.toLowerCase()} repair in ${city.name}?`,
      answer: `Yes! We provide professional ${appliance.shortName.toLowerCase()} repair in ${city.name}, ${city.state} and surrounding areas. Call ${SITE_CONFIG.phone} for same-day service.`,
    },
    {
      question: `How fast can you get to ${city.name} for a repair?`,
      answer: `We serve ${city.name} and all of ${city.county} County. Most repairs are scheduled same-day or next business day.`,
    },
  ];

  return (
    <>
      <StructuredData data={getLocalBusinessSchema()} />
      <StructuredData data={getServiceSchema(appliance, city)} />
      <StructuredData
        data={getBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: appliance.name, url: `/${appliance.slug}-repair` },
          {
            name: `${city.name}`,
            url: `/${city.slug}/${appliance.slug}-repair`,
          },
        ])}
      />
      <StructuredData data={getFAQSchema(faqs)} />

      <section className="bg-brand-dark-green py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-brand-orange">
            {city.name}, {city.state}
          </p>
          <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl">
            <span className="text-brand-orange">{appliance.name}</span> in{" "}
            {city.name}, {city.state}
          </h1>
          <p className="mb-8 text-lg text-gray-300">
            Fast &amp; reliable {appliance.shortName.toLowerCase()} repair in{" "}
            {city.name} and {city.county} County. Our certified technicians
            service all major brands.
          </p>
          <a
            href={`tel:${SITE_CONFIG.phoneRaw}`}
            className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-brand-orange-hover"
          >
            <Phone className="h-5 w-5" />
            Call {SITE_CONFIG.phone}
          </a>
        </div>
      </section>

      {/* Common Issues */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-brand-dark-green">
            {appliance.shortName} Problems We Fix in {city.name}
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

      {/* Brands */}
      <section className="bg-brand-cream py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-brand-dark-green">
            {appliance.shortName} Brands We Service in {city.name}
          </h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {brands.slice(0, 12).map((brand) => (
              <Link
                key={brand.slug}
                href={`/${appliance.slug}-repair/${brand.slug}`}
                className="flex items-center justify-center rounded-lg bg-white p-3 text-center text-sm font-medium text-brand-dark-green shadow-sm transition-all hover:shadow-md"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-brand-dark-green">
            FAQ — {appliance.name} in {city.name}
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-lg bg-gray-50 p-6">
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
