"use client";

import Link from "next/link";
import { Car, Clock, CreditCard, MapPin, Phone, Shield, Star, ChevronRight } from "lucide-react";
import { FORFAITS, getCategoryLabel } from "@/lib/pricing";

const FEATURES = [
  { icon: Clock, title: "Disponible 7j/7", desc: "Soirs et week-ends, quand vous en avez besoin" },
  { icon: Shield, title: "Sécurité garantie", desc: "Chauffeur professionnel certifié VTC" },
  { icon: CreditCard, title: "Paiement en ligne", desc: "Réservez et payez en quelques clics" },
  { icon: MapPin, title: "Tout l'Audomarois", desc: "Saint-Omer, Calais, Boulogne, Dunkerque, Lille" },
];

const TESTIMONIALS = [
  { name: "Léa M.", text: "Super service ! Morgan est ponctuel et le véhicule est impeccable. On réserve chaque week-end pour sortir.", stars: 5 },
  { name: "Thomas D.", text: "Enfin un VTC fiable dans la région. Prix clairs, pas de surprises. Je recommande à 100%.", stars: 5 },
  { name: "Chloé R.", text: "Parfait pour les soirées en discothèque. On rentre en sécurité et le tarif est fixe. Top !", stars: 5 },
];

const categories = [...new Set(FORFAITS.map((f) => f.category))];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#262626]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <span className="text-xl font-bold text-gold-gradient tracking-tight">AUDOVTC</span>
          <div className="flex items-center gap-6">
            <a href="tel:+33600000000" className="hidden sm:flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition">
              <Phone className="w-4 h-4" />
              06 XX XX XX XX
            </a>
            <Link href="/reservation" className="btn-gold !py-2 !px-5 !text-xs">
              Réserver
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen pt-20 hero-gradient">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#141414] border border-[#262626] text-sm text-zinc-400 mb-8">
              <Car className="w-4 h-4 text-[#C9A84C]" />
              VTC Premium — Audomarois
            </div>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] animate-fade-in-up animate-delay-1">
            Votre chauffeur privé{" "}
            <span className="text-gold-gradient">dans l&apos;Audomarois</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-xl mx-auto leading-relaxed animate-fade-in-up animate-delay-2">
            Morgan vous conduit en toute sécurité. Discothèques, soirées, gares, aéroports — réservez en 30 secondes.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-3">
            <Link href="/reservation" className="btn-gold flex items-center gap-2">
              Réserver maintenant
              <ChevronRight className="w-4 h-4" />
            </Link>
            <a href="#tarifs" className="px-6 py-3 text-sm font-medium text-zinc-400 hover:text-white transition">
              Voir les tarifs
            </a>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-zinc-500 animate-fade-in-up animate-delay-4">
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-[#C9A84C] fill-[#C9A84C]" /> 5.0 sur Google
            </span>
            <span>+200 courses</span>
            <span>Paiement sécurisé</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Pourquoi choisir <span className="text-gold-gradient">AudoVTC</span> ?</h2>
          <p className="text-center text-zinc-500 mb-16 max-w-lg mx-auto">Un service premium pensé pour vous. Simple, fiable, transparent.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="card-dark p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center">
                  <f.icon className="w-6 h-6 text-[#C9A84C]" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section id="tarifs" className="py-24 px-6 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Tarifs <span className="text-gold-gradient">forfaitaires</span></h2>
          <p className="text-center text-zinc-500 mb-16 max-w-lg mx-auto">Prix fixes, pas de surprises. Tarif depuis Saint-Omer, aller simple.</p>
          {categories.map((cat) => (
            <div key={cat} className="mb-12">
              <h3 className="text-lg font-semibold text-[#C9A84C] mb-4 uppercase tracking-wider text-sm">
                {getCategoryLabel(cat)}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {FORFAITS.filter((f) => f.category === cat).map((f) => (
                  <Link
                    key={f.id}
                    href={`/reservation?forfait=${f.id}`}
                    className="card-dark p-5 flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <p className="font-medium">{f.to}</p>
                      <p className="text-sm text-zinc-500">{f.km} km</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-[#C9A84C]">{f.price}€</p>
                      <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-[#C9A84C] transition ml-auto mt-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <p className="text-center text-zinc-600 text-sm mt-8">
            Trajet personnalisé ? 1,80€/km — minimum 15€.{" "}
            <Link href="/reservation" className="text-[#C9A84C] hover:underline">Demander un devis</Link>
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Ce qu&apos;ils <span className="text-gold-gradient">disent</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="card-dark p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#C9A84C] fill-[#C9A84C]" />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <p className="text-sm font-medium text-zinc-500">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#0D0D0D]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Prêt à <span className="text-gold-gradient">réserver</span> ?</h2>
          <p className="text-zinc-400 mb-8">En 30 secondes, votre trajet est confirmé. Morgan s&apos;occupe du reste.</p>
          <Link href="/reservation" className="btn-gold inline-flex items-center gap-2">
            Réserver mon VTC
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#262626] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-gold-gradient">AUDOVTC</span>
            <span className="text-zinc-600 text-sm ml-3">Chauffeur VTC — Saint-Omer & Audomarois</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <a href="tel:+33600000000" className="hover:text-white transition">06 XX XX XX XX</a>
            <Link href="/reservation" className="hover:text-white transition">Réserver</Link>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-[#1A1A1A] text-center text-xs text-zinc-700">
          &copy; {new Date().getFullYear()} AudoVTC — Tous droits réservés — SIRET XX XXX XXX XXXXX
        </div>
      </footer>
    </div>
  );
}
