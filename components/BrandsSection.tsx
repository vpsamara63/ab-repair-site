import Image from "next/image";
import { featuredBrands } from "@/lib/data/brands";

export function BrandsSection() {
  return (
    <section className="bg-brand-cream py-16" id="brands">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold text-brand-dark-green md:text-4xl">
            Brands We Service
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Our certified technicians are trained to repair all major appliance
            brands. No matter the make or model, we can fix it.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-7">
          {featuredBrands.map((brand) => (
            <div
              key={brand.slug}
              className="flex items-center justify-center rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <Image
                src={`/brands/${brand.slug}.png`}
                alt={brand.name}
                width={120}
                height={60}
                className="h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
