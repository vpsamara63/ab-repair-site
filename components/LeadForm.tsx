"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/utils";
import { appliances } from "@/lib/data/appliances";

const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  service: z.string().optional(),
  message: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadFormData) => {
    setError(null);
    try {
      let recaptchaToken = "bypass";
      if (executeRecaptcha) {
        recaptchaToken = await executeRecaptcha("lead_form_submit");
      }

      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? "Failed to submit. Please call us instead.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-lg">
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
        <h3 className="mb-2 text-xl font-bold text-brand-dark-green">
          Thank you!
        </h3>
        <p className="text-gray-600">
          We&apos;ll get back to you shortly. For immediate assistance, call{" "}
          <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="font-semibold text-brand-orange">
            {SITE_CONFIG.phone}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl bg-white p-6 shadow-lg md:p-8"
    >
      <h3 className="mb-6 text-2xl font-bold text-brand-dark-green">
        Schedule a Repair
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <input
            {...register("name")}
            placeholder="Full Name *"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-brand-dark-green placeholder:text-gray-400 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("phone")}
            type="tel"
            placeholder="Phone Number *"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-brand-dark-green placeholder:text-gray-400 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Email *"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-brand-dark-green placeholder:text-gray-400 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <select
            {...register("service")}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-brand-dark-green focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
            defaultValue=""
          >
            <option value="" disabled>
              Select a service
            </option>
            {appliances.map((a) => (
              <option key={a.slug} value={a.name}>
                {a.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <textarea
            {...register("message")}
            rows={3}
            placeholder="Describe your issue (optional)"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-brand-dark-green placeholder:text-gray-400 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
          />
        </div>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-500">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-6 py-4 text-lg font-bold text-white transition-colors hover:bg-brand-orange-hover disabled:opacity-60"
      >
        {isSubmitting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Send className="h-5 w-5" />
        )}
        {isSubmitting ? "Submitting..." : "Request Service"}
      </button>

      <p className="mt-3 text-center text-xs text-gray-400">
        By submitting, you agree to be contacted about your repair request.
      </p>
    </form>
  );
}
