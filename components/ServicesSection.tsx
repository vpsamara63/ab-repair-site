import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { appliances } from "@/lib/data/appliances";

const serviceImages: Record<string, string> = {
  refrigerator: "/images/refrigerator-repair.jpg",
  washer: "/images/washer-repair.jpg",
  dryer: "/images/dryer-repair.jpg",
  oven: "/images/oven-repair.jpg",
  dishwasher: "/images/dishwasher-repair.jpg",
  microwave: "/images/microwave-repair.jpg",
};

export function ServicesSection() {
  return (
    <section className="bg-white py-16" id="services">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold text-brand-dark-green md:text-4xl">
            Our Repair Services
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            We provide expert repair services for all major home appliances.
            Same-day service available in Hudson County and surrounding areas.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {appliances.map((a) => (
            <Link
              key={a.slug}
              href={`/${a.slug}-repair`}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-brand-orange hover:shadow-md"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={serviceImages[a.slug] || "/images/hero-appliance.jpg"}
                  alt={a.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-brand-dark-green group-hover:text-brand-orange transition-colors">
                  {a.name}
                </h3>
                <p className="mb-4 text-sm text-gray-600">{a.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-orange">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
