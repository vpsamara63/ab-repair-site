import type { MetadataRoute } from "next";
import { appliances } from "@/lib/data/appliances";
import { allBrands } from "@/lib/data/brands";
import { cities } from "@/lib/data/cities";
import { getBrandsForAppliance } from "@/lib/data/serviceBrands";
import { SITE_CONFIG } from "@/lib/utils";

const baseUrl = SITE_CONFIG.siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Homepage
  entries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  });

  // Appliance pages: /[appliance]-repair
  for (const appliance of appliances) {
    entries.push({
      url: `${baseUrl}/${appliance.slug}-repair`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    });

    // Brand-specific: /[appliance]-repair/[brand]
    for (const brandSlug of getBrandsForAppliance(appliance.slug)) {
      entries.push({
        url: `${baseUrl}/${appliance.slug}-repair/${brandSlug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // City service pages: /[city]/[appliance]-repair
  for (const city of cities) {
    for (const appliance of appliances) {
      entries.push({
        url: `${baseUrl}/${city.slug}/${appliance.slug}-repair`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
