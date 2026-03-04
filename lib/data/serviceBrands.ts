const applianceBrandMapping: Record<string, string[]> = {
  refrigerator: [
    "whirlpool", "lg", "samsung", "ge", "maytag", "kenmore", "frigidaire",
    "kitchenaid", "bosch", "electrolux", "amana", "hotpoint", "sub-zero",
    "thermador", "viking", "miele", "jennair", "fisher-paykel", "dacor",
    "haier", "insignia", "magic-chef", "danby", "avanti",
  ],
  washer: [
    "whirlpool", "lg", "samsung", "ge", "maytag", "kenmore", "frigidaire",
    "electrolux", "amana", "hotpoint", "speed-queen", "bosch", "blomberg",
    "fisher-paykel", "haier", "insignia",
  ],
  dryer: [
    "whirlpool", "lg", "samsung", "ge", "maytag", "kenmore", "frigidaire",
    "electrolux", "amana", "hotpoint", "speed-queen", "bosch", "blomberg",
    "fisher-paykel", "haier", "insignia",
  ],
  oven: [
    "whirlpool", "lg", "samsung", "ge", "maytag", "kenmore", "frigidaire",
    "kitchenaid", "bosch", "electrolux", "amana", "hotpoint", "thermador",
    "viking", "wolf", "miele", "jennair", "dacor", "bertazzoni",
  ],
  dishwasher: [
    "whirlpool", "lg", "samsung", "ge", "maytag", "kenmore", "frigidaire",
    "kitchenaid", "bosch", "electrolux", "amana", "hotpoint", "thermador",
    "miele", "fisher-paykel", "blomberg",
  ],
  microwave: [
    "whirlpool", "lg", "samsung", "ge", "maytag", "kenmore", "frigidaire",
    "kitchenaid", "bosch", "electrolux", "amana", "hotpoint", "thermador",
    "viking", "wolf", "magic-chef", "insignia", "danby", "avanti",
  ],
};

export function getBrandsForAppliance(applianceSlug: string): string[] {
  return applianceBrandMapping[applianceSlug] ?? [];
}

export function getAppliancesForBrand(brandSlug: string): string[] {
  return Object.entries(applianceBrandMapping)
    .filter(([, brands]) => brands.includes(brandSlug))
    .map(([appliance]) => appliance);
}
