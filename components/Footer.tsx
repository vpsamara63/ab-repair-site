import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/lib/utils";
import { appliances } from "@/lib/data/appliances";
import { primaryCities, serviceCounties } from "@/lib/data/cities";

export function Footer() {
  return (
    <footer className="bg-brand-dark-green text-brand-gold">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <Image
              src="/logo.webp"
              alt={SITE_CONFIG.name}
              width={160}
              height={50}
              className="mb-4 h-10 w-auto"
            />
            <p className="mb-4 text-sm text-gray-300">
              {SITE_CONFIG.tagline}
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 text-brand-orange" />
                {SITE_CONFIG.phone}
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 text-brand-orange" />
                {SITE_CONFIG.email}
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-brand-orange" />
                Bayonne, NJ &amp; Surrounding Areas
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-brand-orange" />
                {SITE_CONFIG.hours}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Our Services</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {appliances.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/${a.slug}-repair`}
                    className="hover:text-white transition-colors"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Service Areas</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {primaryCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}/refrigerator-repair`}
                    className="hover:text-white transition-colors"
                  >
                    {c.name}, {c.state}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-gray-400">
              Serving {serviceCounties.join(", ")} counties
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Get a Repair</h3>
            <p className="mb-4 text-sm text-gray-300">
              Need appliance repair? Call us or fill out the contact form below for
              fast, reliable service.
            </p>
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-orange-hover"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-brand-light-green pt-6 text-center text-xs text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.legalName}. All rights
            reserved.
          </p>
          <p className="mt-1">
            Independent appliance repair service. Not affiliated with any appliance manufacturer.
          </p>
        </div>
      </div>
    </footer>
  );
}
