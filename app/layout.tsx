import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { ReCaptchaProvider } from "@/components/ReCaptchaProvider";
import { SITE_CONFIG } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: `${SITE_CONFIG.name} — Home Appliance Repair in Bayonne, NJ`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <ReCaptchaProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <StickyMobileBar />
        </ReCaptchaProvider>
      </body>
    </html>
  );
}
