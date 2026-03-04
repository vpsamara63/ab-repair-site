import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/utils";
import { appliances, type Appliance } from "@/lib/data/appliances";
import type { Brand } from "@/lib/data/brands";
import type { City } from "@/lib/data/cities";

const baseUrl = SITE_CONFIG.siteUrl;

export function getHomeMetadata(): Metadata {
  return {
    title: `${SITE_CONFIG.name} — Home Appliance Repair in Bayonne, NJ`,
    description: SITE_CONFIG.description,
    alternates: { canonical: baseUrl },
    openGraph: {
      title: `${SITE_CONFIG.name} — Home Appliance Repair in Bayonne, NJ`,
      description: SITE_CONFIG.description,
      url: baseUrl,
      siteName: SITE_CONFIG.name,
      type: "website",
    },
  };
}

export function getApplianceMetadata(appliance: Appliance): Metadata {
  const title = `${appliance.name} in Bayonne, NJ | ${SITE_CONFIG.name}`;
  const description = `Professional ${appliance.name.toLowerCase()} in Bayonne and Hudson County, NJ. Same-day service, all major brands. Call ${SITE_CONFIG.phone}`;
  const url = `${baseUrl}/${appliance.slug}-repair`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE_CONFIG.name, type: "website" },
  };
}

export function getBrandServiceMetadata(appliance: Appliance, brand: Brand): Metadata {
  const title = `${brand.name} ${appliance.name} in Bayonne, NJ | ${SITE_CONFIG.name}`;
  const description = `Certified ${brand.name} ${appliance.name.toLowerCase()} in Bayonne and surrounding areas. Expert technicians, same-day service. Call ${SITE_CONFIG.phone}`;
  const url = `${baseUrl}/${appliance.slug}-repair/${brand.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE_CONFIG.name, type: "website" },
  };
}

export function getCityServiceMetadata(city: City, appliance: Appliance): Metadata {
  const title = `${appliance.name} in ${city.name}, ${city.state} | ${SITE_CONFIG.name}`;
  const description = `Fast & reliable ${appliance.name.toLowerCase()} in ${city.name}, ${city.state}. Serving ${city.county} County and surrounding areas. Call ${SITE_CONFIG.phone}`;
  const url = `${baseUrl}/${city.slug}/${appliance.slug}-repair`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE_CONFIG.name, type: "website" },
  };
}

export function getAllServiceSlugs(): string[] {
  return appliances.map((a) => `${a.slug}-repair`);
}
