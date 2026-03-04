import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { appliances } from "@/lib/data/appliances";

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
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-brand-orange hover:shadow-md"
            >
              <div className="mb-3 text-4xl">{a.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-brand-dark-green group-hover:text-brand-orange transition-colors">
                {a.name}
              </h3>
              <p className="mb-4 text-sm text-gray-600">{a.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-orange">
                Learn more <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
