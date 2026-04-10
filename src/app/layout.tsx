import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AudoVTC — Votre chauffeur privé dans l'Audomarois",
  description:
    "Service VTC premium à Saint-Omer et dans l'Audomarois. Transport discothèque, gare, aéroport. Réservez en ligne votre chauffeur privé.",
  keywords: [
    "VTC Saint-Omer",
    "chauffeur privé Audomarois",
    "VTC Pas-de-Calais",
    "transport discothèque Saint-Omer",
    "VTC Calais",
    "VTC Boulogne",
    "VTC Dunkerque",
    "taxi Saint-Omer",
  ],
  manifest: "/manifest.json",
  themeColor: "#C9A84C",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AudoVTC",
  },
  openGraph: {
    title: "AudoVTC — Votre chauffeur privé dans l'Audomarois",
    description: "Réservez votre VTC premium à Saint-Omer. Discothèques, gares, aéroports.",
    locale: "fr_FR",
    type: "website",
    siteName: "AudoVTC",
    url: "https://audovtc.fr",
  },
  twitter: {
    card: "summary_large_image",
    title: "AudoVTC — Votre chauffeur privé dans l'Audomarois",
    description: "Réservez votre VTC premium à Saint-Omer. Discothèques, gares, aéroports.",
  },
  alternates: {
    canonical: "https://audovtc.fr",
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
    name: "AudoVTC",
    description: "Service VTC premium à Saint-Omer et dans l'Audomarois. Transport discothèque, gare, aéroport.",
    url: "https://audovtc.fr",
    telephone: "+33743289393",
    email: "contact@audovtc.fr",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Saint-Omer",
      postalCode: "62500",
      addressRegion: "Pas-de-Calais",
      addressCountry: "FR",
    },
    areaServed: [
      { "@type": "City", name: "Saint-Omer" },
      { "@type": "City", name: "Calais" },
      { "@type": "City", name: "Boulogne-sur-Mer" },
      { "@type": "City", name: "Dunkerque" },
      { "@type": "City", name: "Hazebrouck" },
      { "@type": "City", name: "Béthune" },
      { "@type": "City", name: "Lille" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "€€",
    image: "https://audovtc.fr/opengraph-image",
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
