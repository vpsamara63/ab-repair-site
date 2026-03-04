import { Phone, Clock, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/utils";
import { LeadForm } from "./LeadForm";

export function ContactSection() {
  return (
    <section className="bg-gray-50 py-16" id="contact">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Info side */}
          <div>
            <h2 className="mb-4 text-3xl font-bold text-brand-dark-green md:text-4xl">
              Need Appliance Repair?
            </h2>
            <p className="mb-8 text-gray-600">
              Fill out the form or give us a call. We&apos;ll get back to you as
              soon as possible to schedule your repair.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                  <Phone className="h-6 w-6 text-brand-orange" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-dark-green">Call Us</h3>
                  <a
                    href={`tel:${SITE_CONFIG.phoneRaw}`}
                    className="text-lg font-bold text-brand-orange"
                  >
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                  <Clock className="h-6 w-6 text-brand-orange" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-dark-green">
                    Business Hours
                  </h3>
                  <p className="text-gray-600">{SITE_CONFIG.hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                  <MapPin className="h-6 w-6 text-brand-orange" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-dark-green">
                    Service Area
                  </h3>
                  <p className="text-gray-600">
                    Bayonne, Jersey City, Hoboken, Union City, North Bergen,
                    Secaucus &amp; surrounding areas
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form side */}
          <div>
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
