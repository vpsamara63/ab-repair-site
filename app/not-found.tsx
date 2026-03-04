import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-brand-dark-green">404</h1>
      <p className="mb-8 text-lg text-gray-600">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-orange-hover"
      >
        <Home className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
