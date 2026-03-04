import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE_CONFIG = {
  name: "All Brand Repair",
  legalName: "AB Repair LLC",
  phone: "(929) 417-8035",
  phoneRaw: "+19294178035",
  email: "apprepair.llc@gmail.com",
  address: {
    street: "Bayonne",
    city: "Bayonne",
    state: "NJ",
    zip: "07002",
    country: "US",
  },
  hours: "Monday - Friday: 11:00 AM — 3:00 PM",
  hoursShort: "Mon–Fri 11AM–3PM",
  googleRating: 4.6,
  googleReviewCount: 47,
  tagline: "Your trusted appliance repair company",
  description:
    "Fast & reliable home appliance repair in Bayonne, NJ and surrounding areas. We fix refrigerators, washers, dryers, ovens, dishwashers and more.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://allbrandrepair.com",
} as const;

export function formatPhone(phone: string): string {
  return phone.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
}

export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
