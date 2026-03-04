"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/utils";
import { appliances } from "@/lib/data/appliances";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-dark-green shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.webp"
            alt={SITE_CONFIG.name}
            width={180}
            height={60}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm text-brand-gold hover:text-white transition-colors">
            Home
          </Link>
          <div className="group relative">
            <button className="text-sm text-brand-gold hover:text-white transition-colors">
              Services
            </button>
            <div className="invisible absolute left-0 top-full z-50 min-w-[220px] rounded-md bg-brand-dark-green p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
              {appliances.map((a) => (
                <Link
                  key={a.slug}
                  href={`/${a.slug}-repair`}
                  className="block rounded px-3 py-2 text-sm text-brand-gold hover:bg-brand-light-green hover:text-white transition-colors"
                >
                  {a.name}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/#brands" className="text-sm text-brand-gold hover:text-white transition-colors">
            Brands
          </Link>
          <Link href="/#reviews" className="text-sm text-brand-gold hover:text-white transition-colors">
            Reviews
          </Link>
          <Link href="/#contact" className="text-sm text-brand-gold hover:text-white transition-colors">
            Contact
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${SITE_CONFIG.phoneRaw}`}
            className="flex items-center gap-2 rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-hover"
          >
            <Phone className="h-4 w-4" />
            {SITE_CONFIG.phone}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-brand-gold md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-brand-light-green bg-brand-dark-green px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="rounded px-3 py-2 text-brand-gold hover:bg-brand-light-green"
            >
              Home
            </Link>
            {appliances.map((a) => (
              <Link
                key={a.slug}
                href={`/${a.slug}-repair`}
                onClick={() => setMobileOpen(false)}
                className="rounded px-3 py-2 text-sm text-brand-gold hover:bg-brand-light-green"
              >
                {a.name}
              </Link>
            ))}
            <Link
              href="/#reviews"
              onClick={() => setMobileOpen(false)}
              className="rounded px-3 py-2 text-brand-gold hover:bg-brand-light-green"
            >
              Reviews
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="rounded px-3 py-2 text-brand-gold hover:bg-brand-light-green"
            >
              Contact
            </Link>
          </nav>
          <a
            href={`tel:${SITE_CONFIG.phoneRaw}`}
            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-brand-orange px-5 py-3 font-semibold text-white"
          >
            <Phone className="h-4 w-4" />
            Call {SITE_CONFIG.phone}
          </a>
        </div>
      )}
    </header>
  );
}
