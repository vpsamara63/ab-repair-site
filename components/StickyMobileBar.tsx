"use client";

import { useEffect, useState } from "react";
import { Phone, CalendarCheck } from "lucide-react";
import { SITE_CONFIG } from "@/lib/utils";

export function StickyMobileBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden">
      <a
        href={`tel:${SITE_CONFIG.phoneRaw}`}
        className="flex flex-1 items-center justify-center gap-2 bg-brand-dark-green py-4 font-semibold text-white"
      >
        <Phone className="h-5 w-5" />
        Call Now
      </a>
      <a
        href="#contact"
        className="flex flex-1 items-center justify-center gap-2 bg-brand-orange py-4 font-semibold text-white"
      >
        <CalendarCheck className="h-5 w-5" />
        Book Service
      </a>
    </div>
  );
}
