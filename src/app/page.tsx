"use client";

import { useState } from "react";
import Link from "next/link";
import { Car, Clock, CreditCard, MapPin, Phone, Shield, Star, ChevronRight, ArrowRight, Sparkles, Users, MessageCircle } from "lucide-react";
import { FORFAITS, getCategoryLabel } from "@/lib/pricing";

const FEATURES = [
  { icon: Clock, title: "Disponible 7j/7", desc: "Soirs et week-ends, quand vous en avez besoin" },
  { icon: Shield, title: "Sécurité garantie", desc: "Chauffeur professionnel certifié VTC" },
  { icon: CreditCard, title: "Prix transparents", desc: "Tarifs fixes, pas de mauvaises surprises" },
  { icon: MapPin, title: "Tout l'Audomarois", desc: "Saint-Omer, Calais, Boulogne, Dunkerque, Lille" },
  { icon: Users, title: "Jusqu'à 7 places", desc: "Parfait pour les groupes et soirées entre amis" },
  { icon: MessageCircle, title: "Confirmation immédiate", desc: "Réponse rapide par SMS ou appel" },
];

const TESTIMONIALS = [
  { name: "Léa M.", text: "Super service ! Le chauffeur est ponctuel et le véhicule est impeccable. On réserve chaque week-end pour sortir.", stars: 5, tag: "Sortie discothèque" },
  { name: "Thomas D.", text: "Enfin un VTC fiable dans la région. Prix clairs, pas de surprises. Je recommande à 100%.", stars: 5, tag: "Trajet aéroport" },
  { name: "Chloé R.", text: "Parfait pour les soirées en discothèque. On rentre en sécurité et le tarif est fixe. Top !", stars: 5, tag: "Soirée entre amis" },
  { name: "Maxime L.", text: "Véhicule propre et confortable, chauffeur très sympa. Le meilleur VTC du coin, loin devant.", stars: 5, tag: "Client régulier" },
];

const STEPS = [
  { num: "01", title: "Choisissez", desc: "Sélectionnez votre trajet ou entrez vos adresses" },
  { num: "02", title: "Réservez", desc: "Indiquez date, heure et nombre de passagers" },
  { num: "03", title: "Roulez", desc: "Votre chauffeur vous prend en charge, détendez-vous" },
];

const categories = [...new Set(FORFAITS.map((f) => f.category))];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A84C] to-[#A07D2E] flex items-center justify-center">
              <Car className="w-4 h-4 text-black" />
            </div>
            <span className="text-lg font-bold tracking-tight">AUDO<span className="text-[#C9A84C]">VTC</span></span>
          </div>
          <div className="flex items-center gap-5">
            <a href="tel:+33743289393" className="hidden sm:flex items-center gap-2 text-sm text-zinc-400 hover:text-[#C9A84C] transition">
              <Phone className="w-4 h-4" />
              07 43 28 93 93
            </a>
            <Link href="/reservation" className="btn-gold !py-2.5 !px-6 !text-xs">
              Réserver
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen pt-20">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#C9A84C]/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C9A84C]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-sm text-[#C9A84C] mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              Service VTC Premium — Saint-Omer & Audomarois
            </div>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] animate-fade-in-up animate-delay-1">
            Votre chauffeur
            <br />
            <span className="text-gold-gradient">privé</span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-delay-2">
            Votre chauffeur privé, en toute sécurité, 7j/7.
            <br className="hidden sm:block" />
            Discothèques, soirées, gares, aéroports — réservez en 30 secondes.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-3">
            <Link href="/reservation" className="btn-gold flex items-center gap-2 text-base !py-4 !px-8">
              Réserver maintenant
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+33743289393" className="flex items-center gap-2 px-8 py-4 text-sm font-medium text-zinc-400 hover:text-white transition border border-[#262626] rounded-lg hover:border-[#C9A84C]/30">
              <Phone className="w-4 h-4" />
              Appeler
            </a>
          </div>

          <div className="mt-16 flex items-center justify-center gap-6 sm:gap-10 animate-fade-in-up animate-delay-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#C9A84C]">5.0</p>
              <div className="flex gap-0.5 justify-center mt-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-[#C9A84C] fill-[#C9A84C]" />)}
              </div>
              <p className="text-xs text-zinc-600 mt-1">Google</p>
            </div>
            <div className="w-px h-10 bg-[#262626]" />
            <div className="text-center">
              <p className="text-2xl font-bold">200+</p>
              <p className="text-xs text-zinc-600 mt-1">Courses</p>
            </div>
            <div className="w-px h-10 bg-[#262626]" />
            <div className="text-center">
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-xs text-zinc-600 mt-1">Disponible</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0D0D] to-transparent" />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-[#C9A84C] text-sm font-medium uppercase tracking-widest text-center mb-3">Comment ça marche</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">Réservez en <span className="text-gold-gradient">3 étapes</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <div key={s.num} className="relative group">
                <div className="text-6xl font-black text-[#C9A84C]/10 group-hover:text-[#C9A84C]/20 transition absolute -top-4 -left-2">{s.num}</div>
                <div className="relative pt-8 pl-2">
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
                {i < 2 && <div className="hidden sm:block absolute top-12 -right-4 text-[#262626]"><ChevronRight className="w-6 h-6" /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#C9A84C] text-sm font-medium uppercase tracking-widest text-center mb-3">Nos avantages</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Pourquoi choisir <span className="text-gold-gradient">AudoVTC</span></h2>
          <p className="text-center text-zinc-500 mb-16 max-w-lg mx-auto">Un service premium pensé pour vous.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="group card-dark p-6 hover:bg-[#1A1A1A] transition-all duration-300">
                <div className="w-11 h-11 mb-4 rounded-xl bg-[#C9A84C]/10 group-hover:bg-[#C9A84C]/20 flex items-center justify-center transition">
                  <f.icon className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <h3 className="font-semibold mb-1.5">{f.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section id="tarifs" className="py-24 px-6 bg-[#080808] relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />
        <div className="max-w-6xl mx-auto">
          <p className="text-[#C9A84C] text-sm font-medium uppercase tracking-widest text-center mb-3">Tarifs</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Prix <span className="text-gold-gradient">forfaitaires</span></h2>
          <p className="text-center text-zinc-500 mb-12 max-w-lg mx-auto">Prix fixes depuis Saint-Omer, aller simple. Pas de surprises.</p>

          {/* Category tabs */}
          <div className="flex justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition ${
                  activeCategory === cat
                    ? "bg-[#C9A84C] text-black"
                    : "bg-[#141414] border border-[#262626] text-zinc-500 hover:text-white"
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FORFAITS.filter((f) => f.category === activeCategory).map((f) => (
              <Link
                key={f.id}
                href={`/reservation?forfait=${f.id}`}
                className="group card-dark p-5 flex items-center justify-between hover:bg-[#1A1A1A] transition-all duration-300"
              >
                <div>
                  <p className="font-medium group-hover:text-[#C9A84C] transition">{f.to}</p>
                  <p className="text-sm text-zinc-600 mt-0.5">{f.km} km — ~{Math.round(f.km / 80 * 60)} min</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-xl font-bold text-[#C9A84C]">{f.price}€</p>
                  <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:text-[#C9A84C] group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/reservation"
              className="inline-flex items-center gap-2 text-sm text-[#C9A84C] hover:text-[#E8D48B] transition font-medium"
            >
              Trajet personnalisé ? 1,80€/km
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#C9A84C] text-sm font-medium uppercase tracking-widest text-center mb-3">Avis clients</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">Ils nous font <span className="text-gold-gradient">confiance</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="card-dark p-6 flex flex-col">
                <div className="flex gap-0.5 mb-1">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[#C9A84C] fill-[#C9A84C]" />
                  ))}
                </div>
                <span className="text-xs text-[#C9A84C]/60 mb-3">{t.tag}</span>
                <p className="text-zinc-300 text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                <p className="text-sm font-medium text-zinc-600 mt-4">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C9A84C]/3 to-transparent" />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#C9A84C] to-[#A07D2E] flex items-center justify-center">
            <Car className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">Prêt à <span className="text-gold-gradient">partir</span> ?</h2>
          <p className="text-zinc-400 mb-10 text-lg">En 30 secondes, votre trajet est confirmé.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/reservation" className="btn-gold flex items-center gap-2 text-base !py-4 !px-8">
              Réserver mon VTC
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+33743289393" className="flex items-center gap-2 px-8 py-4 text-sm font-medium text-zinc-400 hover:text-white transition">
              <Phone className="w-4 h-4" />
              07 43 28 93 93
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 bg-[#080808]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A84C] to-[#A07D2E] flex items-center justify-center">
                <Car className="w-4 h-4 text-black" />
              </div>
              <div>
                <span className="font-bold">AUDO<span className="text-[#C9A84C]">VTC</span></span>
                <p className="text-xs text-zinc-700">Chauffeur VTC — Saint-Omer & Audomarois</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <a href="tel:+33743289393" className="hover:text-[#C9A84C] transition flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> 07 43 28 93 93
              </a>
              <a href="mailto:contact@audovtc.fr" className="hover:text-[#C9A84C] transition">contact@audovtc.fr</a>
              <Link href="/reservation" className="hover:text-[#C9A84C] transition">Réserver</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-700">
            <span>&copy; {new Date().getFullYear()} AudoVTC — Tous droits réservés</span>
            <div className="flex gap-4">
              <Link href="/mentions-legales" className="hover:text-zinc-400 transition">Mentions légales</Link>
              <Link href="/cgv" className="hover:text-zinc-400 transition">CGV</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
