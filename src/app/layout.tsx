import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  openGraph: {
    title: "AudoVTC — Votre chauffeur privé dans l'Audomarois",
    description: "Réservez votre VTC premium à Saint-Omer. Discothèques, gares, aéroports.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}<WhatsAppButton /></body>
    </html>
  );
}
