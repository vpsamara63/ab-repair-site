import Link from "next/link";
import { MapPin } from "lucide-react";
import { primaryCities, serviceCounties } from "@/lib/data/cities";

export function ServiceAreaSection() {
  return (
    <section className="bg-brand-cream py-16" id="service-areas">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold text-brand-dark-green md:text-4xl">
            Service Areas
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            We provide home appliance repair services throughout Hudson County
            and surrounding areas in New Jersey.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {primaryCities.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}/refrigerator-repair`}
              className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md"
            >
              <MapPin className="h-5 w-5 shrink-0 text-brand-orange" />
              <div>
                <span className="font-semibold text-brand-dark-green">
                  {city.name}, {city.state}
                </span>
                <span className="block text-xs text-gray-500">
                  {city.county} County
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Also serving: {serviceCounties.filter((c) => c !== "Hudson").join(", ")} counties
        </p>
      </div>
    </section>
  );
}
