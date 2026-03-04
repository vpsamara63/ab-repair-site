import { Phone, CalendarCheck, Shield, Clock, Wrench, Star } from "lucide-react";
import { SITE_CONFIG } from "@/lib/utils";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

const trustBadges = [
  { icon: Clock, label: "Same-Day Service" },
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Wrench, label: "All Major Brands" },
  { icon: Star, label: `${SITE_CONFIG.googleRating}★ Google Rating` },
];

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="relative bg-brand-dark-green py-16 md:py-24">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark-green/90 to-brand-dark-green/70" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Rating badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-light-green/50 px-4 py-2 text-sm text-brand-gold">
            <Star className="h-4 w-4 fill-brand-orange text-brand-orange" />
            {SITE_CONFIG.googleRating} stars · {SITE_CONFIG.googleReviewCount} Google Reviews
          </div>

          <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl lg:text-6xl">
            {title ?? (
              <>
                Fast &amp; Reliable{" "}
                <span className="text-brand-orange">Appliance Repair</span> in
                Bayonne, NJ
              </>
            )}
          </h1>

          <p className="mb-8 text-lg text-gray-300 md:text-xl">
            {subtitle ??
              "We fix refrigerators, washers, dryers, ovens, dishwashers and more across Hudson County and surrounding areas."}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-brand-orange-hover sm:w-auto"
            >
              <Phone className="h-5 w-5" />
              Call {SITE_CONFIG.phone}
            </a>
            <a
              href="#contact"
              className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-brand-gold px-8 py-4 text-lg font-bold text-brand-gold transition-colors hover:bg-brand-gold hover:text-brand-dark-green sm:w-auto"
            >
              <CalendarCheck className="h-5 w-5" />
              Schedule Service
            </a>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex flex-col items-center gap-2 rounded-lg bg-brand-light-green/30 p-4 text-center"
            >
              <badge.icon className="h-6 w-6 text-brand-orange" />
              <span className="text-xs font-medium text-gray-200">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
