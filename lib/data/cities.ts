export interface City {
  slug: string;
  name: string;
  county: string;
  state: string;
}

export const cities: City[] = [
  // Primary service areas
  { slug: "bayonne", name: "Bayonne", county: "Hudson", state: "NJ" },
  { slug: "jersey-city", name: "Jersey City", county: "Hudson", state: "NJ" },
  { slug: "hoboken", name: "Hoboken", county: "Hudson", state: "NJ" },
  { slug: "union-city", name: "Union City", county: "Hudson", state: "NJ" },
  { slug: "north-bergen", name: "North Bergen", county: "Hudson", state: "NJ" },
  { slug: "secaucus", name: "Secaucus", county: "Hudson", state: "NJ" },
  // Hudson County - additional
  { slug: "west-new-york", name: "West New York", county: "Hudson", state: "NJ" },
  { slug: "kearny", name: "Kearny", county: "Hudson", state: "NJ" },
  { slug: "harrison", name: "Harrison", county: "Hudson", state: "NJ" },
  { slug: "guttenberg", name: "Guttenberg", county: "Hudson", state: "NJ" },
  { slug: "east-newark", name: "East Newark", county: "Hudson", state: "NJ" },
  { slug: "weehawken", name: "Weehawken", county: "Hudson", state: "NJ" },
  // Surrounding areas
  { slug: "newark", name: "Newark", county: "Essex", state: "NJ" },
  { slug: "elizabeth", name: "Elizabeth", county: "Union", state: "NJ" },
  { slug: "clifton", name: "Clifton", county: "Passaic", state: "NJ" },
  { slug: "passaic", name: "Passaic", county: "Passaic", state: "NJ" },
  { slug: "hackensack", name: "Hackensack", county: "Bergen", state: "NJ" },
  { slug: "fort-lee", name: "Fort Lee", county: "Bergen", state: "NJ" },
  { slug: "perth-amboy", name: "Perth Amboy", county: "Middlesex", state: "NJ" },
  { slug: "new-brunswick", name: "New Brunswick", county: "Middlesex", state: "NJ" },
  { slug: "edison", name: "Edison", county: "Middlesex", state: "NJ" },
  { slug: "woodbridge", name: "Woodbridge", county: "Middlesex", state: "NJ" },
  { slug: "somerville", name: "Somerville", county: "Somerset", state: "NJ" },
  { slug: "long-branch", name: "Long Branch", county: "Monmouth", state: "NJ" },
  { slug: "freehold", name: "Freehold", county: "Monmouth", state: "NJ" },
];

export const primaryCities = cities.slice(0, 6);

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function isCitySlug(slug: string): boolean {
  return cities.some((c) => c.slug === slug);
}

export function getCitiesByCounty(county: string): City[] {
  return cities.filter((c) => c.county === county);
}

export const serviceCounties = [
  "Hudson",
  "Essex",
  "Union",
  "Bergen",
  "Passaic",
  "Middlesex",
  "Somerset",
  "Monmouth",
];
