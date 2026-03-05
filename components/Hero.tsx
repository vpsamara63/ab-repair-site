import Image from "next/image";
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
      {/* Background image */}
      <Image
        src="/images/hero-appliance.jpg"
        alt="Home appliance repair"
        fill
        className="object-cover"
        priority
        quality={85}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-brand-dark-green/75" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Google Ratings button */}
          <a
            href="https://share.google/XlGRh7wVLLNaoFcgI"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/20 hover:scale-105"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${i < Math.floor(SITE_CONFIG.googleRating) ? "fill-yellow-400 text-yellow-400" : "fill-yellow-400/50 text-yellow-400/50"}`}
                />
              ))}
            </div>
            <span className="font-semibold">{SITE_CONFIG.googleRating}</span>
            <span className="text-white/70">Google Ratings</span>
          </a>

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
              className="flex flex-col items-center gap-2 rounded-lg bg-brand-light-green/30 backdrop-blur-sm p-4 text-center"
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
