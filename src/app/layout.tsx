import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import { config } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${config.brand} — Votre chauffeur privé dans le ${config.region}`;
const description = `Service VTC premium à ${config.city} et dans le ${config.region}. Transport discothèque, gare, aéroport. Réservez en ligne votre chauffeur privé.`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    `VTC ${config.city}`,
    `chauffeur privé ${config.region}`,
    `VTC ${config.department}`,
    `transport discothèque ${config.city}`,
    ...config.zones.map(z => `VTC ${z}`),
    `taxi ${config.city}`,
  ],
  manifest: "/manifest.json",
  themeColor: config.colorPrimary,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: config.brand,
  },
  openGraph: {
    title,
    description: `Réservez votre VTC premium à ${config.city}. Discothèques, gares, aéroports.`,
    locale: "fr_FR",
    type: "website",
    siteName: config.brand,
    url: `https://${config.domain}`,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: `Réservez votre VTC premium à ${config.city}. Discothèques, gares, aéroports.`,
  },
  alternates: {
    canonical: `https://${config.domain}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: config.brand,
    description,
    url: `https://${config.domain}`,
    telephone: config.phoneIntl,
    email: config.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: config.city,
      postalCode: config.postalCode,
      addressRegion: config.department,
      addressCountry: "FR",
    },
    areaServed: config.zones.map(z => ({ "@type": "City", name: z })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "€€",
    image: `https://${config.domain}/opengraph-image`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "12",
    },
    sameAs: [],
  };

  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="apple-touch-icon" href="/icon-192" />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <WhatsAppButton />
        <Script id="sw-register" strategy="lazyOnload">
          {`if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js')}`}
        </Script>
      </body>
    </html>
  );
}
