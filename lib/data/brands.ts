export interface Brand {
  slug: string;
  name: string;
}

export const featuredBrands: Brand[] = [
  { slug: "whirlpool", name: "Whirlpool" },
  { slug: "lg", name: "LG" },
  { slug: "samsung", name: "Samsung" },
  { slug: "ge", name: "GE" },
  { slug: "maytag", name: "Maytag" },
  { slug: "kenmore", name: "Kenmore" },
  { slug: "frigidaire", name: "Frigidaire" },
  { slug: "kitchenaid", name: "KitchenAid" },
  { slug: "bosch", name: "Bosch" },
  { slug: "electrolux", name: "Electrolux" },
  { slug: "amana", name: "Amana" },
  { slug: "hotpoint", name: "Hotpoint" },
  { slug: "speed-queen", name: "Speed Queen" },
  { slug: "sub-zero", name: "Sub-Zero" },
];

export const allBrands: Brand[] = [
  ...featuredBrands,
  { slug: "thermador", name: "Thermador" },
  { slug: "viking", name: "Viking" },
  { slug: "wolf", name: "Wolf" },
  { slug: "miele", name: "Miele" },
  { slug: "jennair", name: "Jenn-Air" },
  { slug: "fisher-paykel", name: "Fisher & Paykel" },
  { slug: "dacor", name: "Dacor" },
  { slug: "haier", name: "Haier" },
  { slug: "insignia", name: "Insignia" },
  { slug: "magic-chef", name: "Magic Chef" },
  { slug: "danby", name: "Danby" },
  { slug: "avanti", name: "Avanti" },
  { slug: "bertazzoni", name: "Bertazzoni" },
  { slug: "blomberg", name: "Blomberg" },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return allBrands.find((b) => b.slug === slug);
}

export function isBrandSlug(slug: string): boolean {
  return allBrands.some((b) => b.slug === slug);
}
