import { Star } from "lucide-react";
import { reviews } from "@/lib/data/reviews";
import { SITE_CONFIG } from "@/lib/utils";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < count
              ? "fill-brand-orange text-brand-orange"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section className="bg-white py-16" id="reviews">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold text-brand-dark-green md:text-4xl">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-2">
            <Stars count={5} />
            <span className="text-sm text-gray-600">
              {SITE_CONFIG.googleRating} out of 5 · {SITE_CONFIG.googleReviewCount} reviews on Google
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <Stars count={review.rating} />
              <p className="my-4 text-gray-700">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-brand-dark-green">
                  {review.name}
                </span>
                <span className="text-gray-400">{review.service}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
