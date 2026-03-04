export interface Appliance {
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  commonIssues: string[];
}

export const appliances: Appliance[] = [
  {
    slug: "refrigerator",
    name: "Refrigerator Repair",
    shortName: "Refrigerator",
    icon: "🧊",
    description:
      "Expert refrigerator repair for all major brands. We fix cooling issues, ice maker problems, water leaks, strange noises, and more.",
    commonIssues: [
      "Not cooling properly",
      "Ice maker not working",
      "Water dispenser issues",
      "Strange noises",
      "Leaking water",
      "Door seal problems",
      "Compressor failure",
      "Thermostat malfunction",
    ],
  },
  {
    slug: "washer",
    name: "Washer Repair",
    shortName: "Washer",
    icon: "🫧",
    description:
      "Professional washer repair service. We handle spin cycle problems, drainage issues, leaks, vibration, and error codes for all brands.",
    commonIssues: [
      "Not spinning",
      "Not draining",
      "Leaking water",
      "Excessive vibration",
      "Error codes",
      "Door latch problems",
      "Agitator issues",
      "Water temperature problems",
    ],
  },
  {
    slug: "dryer",
    name: "Dryer Repair",
    shortName: "Dryer",
    icon: "🌀",
    description:
      "Fast dryer repair for gas and electric models. We fix heating issues, drum problems, ventilation, and unusual noises.",
    commonIssues: [
      "Not heating",
      "Not tumbling",
      "Takes too long to dry",
      "Unusual noises",
      "Overheating",
      "Drum not spinning",
      "Gas igniter issues",
      "Ventilation problems",
    ],
  },
  {
    slug: "oven",
    name: "Oven & Stove Repair",
    shortName: "Oven & Stove",
    icon: "🔥",
    description:
      "Reliable oven and stove repair. We service gas and electric ranges, fixing temperature issues, igniter problems, and faulty burners.",
    commonIssues: [
      "Not heating evenly",
      "Igniter not working",
      "Burner problems",
      "Temperature inaccuracy",
      "Self-clean malfunction",
      "Door won't close",
      "Gas smell",
      "Control panel issues",
    ],
  },
  {
    slug: "dishwasher",
    name: "Dishwasher Repair",
    shortName: "Dishwasher",
    icon: "🍽️",
    description:
      "Expert dishwasher repair service. We fix drainage issues, cleaning problems, leaks, and noisy operation for all brands.",
    commonIssues: [
      "Not draining",
      "Not cleaning properly",
      "Leaking water",
      "Noisy operation",
      "Door latch problems",
      "Detergent dispenser issues",
      "Water not filling",
      "Error codes",
    ],
  },
  {
    slug: "microwave",
    name: "Microwave Repair",
    shortName: "Microwave",
    icon: "📡",
    description:
      "Professional microwave repair for countertop and built-in models. We fix heating issues, turntable problems, and door mechanisms.",
    commonIssues: [
      "Not heating",
      "Turntable not spinning",
      "Sparking inside",
      "Door won't close",
      "Display malfunction",
      "Unusual noises",
      "Light not working",
      "Buttons unresponsive",
    ],
  },
];

export function getApplianceBySlug(slug: string): Appliance | undefined {
  return appliances.find((a) => a.slug === slug);
}

export function isApplianceSlug(slug: string): boolean {
  if (!slug.endsWith("-repair")) return false;
  const base = slug.replace("-repair", "");
  return appliances.some((a) => a.slug === base);
}

export function extractApplianceSlug(slug: string): string {
  return slug.replace("-repair", "");
}
