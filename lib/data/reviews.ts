export interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
  service: string;
}

export const reviews: Review[] = [
  {
    name: "Maria S.",
    rating: 5,
    text: "Excellent service! They fixed my refrigerator the same day I called. Very professional and affordable. Highly recommend!",
    date: "2025-12",
    service: "Refrigerator Repair",
  },
  {
    name: "John D.",
    rating: 5,
    text: "My washer stopped spinning and they diagnosed the problem quickly. Fair pricing and the repair has held up perfectly.",
    date: "2025-11",
    service: "Washer Repair",
  },
  {
    name: "Lisa T.",
    rating: 5,
    text: "Called about my oven not heating. They came the next day and fixed it right away. Great communication throughout.",
    date: "2025-10",
    service: "Oven Repair",
  },
  {
    name: "Robert K.",
    rating: 5,
    text: "Had an issue with my dishwasher leaking. They were on time, professional, and the price was very reasonable.",
    date: "2025-11",
    service: "Dishwasher Repair",
  },
  {
    name: "Jennifer M.",
    rating: 5,
    text: "Our dryer was making a terrible noise. Quick diagnosis and repair. Been working perfectly since. Great service!",
    date: "2025-12",
    service: "Dryer Repair",
  },
  {
    name: "David P.",
    rating: 5,
    text: "Very knowledgeable technicians. They fixed our Samsung refrigerator that another company couldn't figure out. Will call again!",
    date: "2026-01",
    service: "Refrigerator Repair",
  },
];
