import { Award, Clock, DollarSign, ShieldCheck } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Certified & Experienced",
    description:
      "Our technicians are factory-trained and certified to work on all major brands.",
  },
  {
    icon: Clock,
    title: "Same Day Repairs",
    description:
      "We understand urgency. Most repairs are completed the same day you call.",
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    description:
      "Transparent, upfront pricing with no hidden fees. We offer warranty on all repairs.",
  },
  {
    icon: ShieldCheck,
    title: "All Major Brands",
    description:
      "Whirlpool, LG, Samsung, GE, Maytag, Kenmore, and many more — we fix them all.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-brand-green py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-10 text-center text-3xl font-bold text-brand-orange md:text-4xl">
          Why Choose Us?
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div key={r.title} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-light-green/30">
                <r.icon className="h-8 w-8 text-brand-gold" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{r.title}</h3>
              <p className="text-sm text-gray-300">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
