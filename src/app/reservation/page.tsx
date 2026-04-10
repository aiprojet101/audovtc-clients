"use client";

import { Suspense, useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import {
  ArrowLeft, Calendar, Clock, Users, CreditCard,
  ChevronRight, Check, Phone, Loader2, Navigation, MessageCircle,
} from "lucide-react";
import { FORFAITS, PRICE_PER_KM, MIN_PRICE, calculateDeposit } from "@/lib/pricing";
import { calculateDistance } from "@/lib/distance";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import { buildWhatsAppUrl, buildReservationMessage } from "@/components/WhatsAppButton";

type Step = "trajet" | "details" | "confirm";

export default function ReservationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-zinc-500">Chargement...</div>}>
      <ReservationContent />
    </Suspense>
  );
}

function ReservationContent() {
  const searchParams = useSearchParams();
  const prefillForfait = searchParams.get("forfait");

  const [step, setStep] = useState<Step>("trajet");
  const [mode, setMode] = useState<"forfait" | "custom">(prefillForfait ? "forfait" : "custom");
  const [selectedForfait, setSelectedForfait] = useState<string>(prefillForfait || "");
  const [allerRetour, setAllerRetour] = useState(false);
  const [mapsLoaded, setMapsLoaded] = useState(false);

  // Custom
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [customKm, setCustomKm] = useState("");
  const [customDuration, setCustomDuration] = useState("");
  const [calculating, setCalculating] = useState(false);

  // Details
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  // Success
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const forfait = useMemo(() => FORFAITS.find((f) => f.id === selectedForfait), [selectedForfait]);

  const price = useMemo(() => {
    if (mode === "forfait" && forfait) {
      return allerRetour ? forfait.price * 2 : forfait.price;
    }
    if (mode === "custom" && customKm) {
      const km = parseFloat(customKm);
      const base = Math.max(km * PRICE_PER_KM, MIN_PRICE);
      return allerRetour ? Math.round(base * 2) : Math.round(base);
    }
    return 0;
  }, [mode, forfait, customKm, allerRetour]);

  const deposit = useMemo(() => calculateDeposit(price), [price]);

  useEffect(() => {
    if (prefillForfait) {
      setSelectedForfait(prefillForfait);
      setMode("forfait");
    }
  }, [prefillForfait]);

  // Auto-calculate distance when both addresses are set
  const computeDistance = useCallback(async (from: string, to: string) => {
    if (!from || !to || !mapsLoaded) return;
    setCalculating(true);
    try {
      const result = await calculateDistance(from, to);
      if (result) {
        setCustomKm(String(result.distanceKm));
        setCustomDuration(result.duration);
      }
    } finally {
      setCalculating(false);
    }
  }, [mapsLoaded]);

  const handleFromSelected = useCallback((value: string) => {
    setCustomFrom(value);
    if (customTo && value) computeDistance(value, customTo);
  }, [customTo, computeDistance]);

  const handleToSelected = useCallback((value: string) => {
    setCustomTo(value);
    if (customFrom && value) computeDistance(customFrom, value);
  }, [customFrom, computeDistance]);

  const canProceedTrajet =
    (mode === "forfait" && selectedForfait) ||
    (mode === "custom" && customFrom && customTo && customKm);

  const canProceedDetails = date && time && name && phone;

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const body = {
        mode,
        forfaitId: selectedForfait || null,
        allerRetour,
        customFrom: mode === "custom" ? customFrom : null,
        customTo: mode === "custom" ? customTo : null,
        customKm: mode === "custom" ? parseFloat(customKm) : null,
        date,
        time,
        passengers: parseInt(passengers),
        name,
        phone,
        email,
        notes,
        price,
        deposit,
      };
      await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      // Ouvrir WhatsApp avec le récap
      const trajet = forfait
        ? `${forfait.from} → ${forfait.to}`
        : `${customFrom} → ${customTo}`;
      const whatsappUrl = buildWhatsAppUrl(
        buildReservationMessage({
          trajet,
          allerRetour,
          date,
          time,
          passengers,
          name,
          phone,
          price,
          notes,
        })
      );
      window.open(whatsappUrl, "_blank");

      setSubmitted(true);
    } catch {
      alert("Erreur lors de la réservation. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="card-dark p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Réservation confirmée !</h1>
          <p className="text-zinc-400 mb-6">
            Votre demande a été envoyée via WhatsApp. Morgan vous confirmera rapidement.
          </p>
          <div className="card-dark p-4 text-left text-sm space-y-2 mb-6">
            <p><span className="text-zinc-500">Trajet :</span> {forfait ? `${forfait.from} → ${forfait.to}` : `${customFrom} → ${customTo}`}{allerRetour ? " (A/R)" : ""}</p>
            <p><span className="text-zinc-500">Date :</span> {date} à {time}</p>
            <p><span className="text-zinc-500">Prix total :</span> <span className="text-[#C9A84C] font-bold">{price}€</span></p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={buildWhatsAppUrl(buildReservationMessage({
                trajet: forfait ? `${forfait.from} → ${forfait.to}` : `${customFrom} → ${customTo}`,
                allerRetour, date, time, passengers, name, phone, price, notes,
              }))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold rounded-lg transition"
            >
              Renvoyer via WhatsApp
            </a>
            <Link href="/" className="btn-gold inline-block text-center">Retour à l&apos;accueil</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`}
        onLoad={() => setMapsLoaded(true)}
      />

      {/* Header */}
      <div className="bg-[#0A0A0A] border-b border-[#262626] px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition text-sm">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
          <span className="text-gold-gradient font-bold">AUDOVTC</span>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-10">
          {(["trajet", "details", "confirm"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-3 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition ${
                  step === s
                    ? "bg-[#C9A84C] text-black"
                    : (["trajet", "details", "confirm"].indexOf(step) > i)
                    ? "bg-[#C9A84C]/20 text-[#C9A84C]"
                    : "bg-[#262626] text-zinc-600"
                }`}
              >
                {["trajet", "details", "confirm"].indexOf(step) > i ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              {i < 2 && <div className="flex-1 h-px bg-[#262626]" />}
            </div>
          ))}
        </div>

        {/* Step 1: Trajet */}
        {step === "trajet" && (
          <div className="animate-fade-in-up">
            <h1 className="text-2xl font-bold mb-2">Choisissez votre trajet</h1>
            <p className="text-zinc-500 mb-8">Entrez vos adresses ou choisissez un forfait</p>

            <div className="flex gap-3 mb-8">
              <button
                onClick={() => setMode("custom")}
                className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${
                  mode === "custom" ? "bg-[#C9A84C] text-black" : "bg-[#141414] border border-[#262626] text-zinc-400"
                }`}
              >
                Trajet libre
              </button>
              <button
                onClick={() => setMode("forfait")}
                className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${
                  mode === "forfait" ? "bg-[#C9A84C] text-black" : "bg-[#141414] border border-[#262626] text-zinc-400"
                }`}
              >
                Forfait
              </button>
            </div>

            {mode === "custom" && (
              <div className="space-y-4">
                <AddressAutocomplete
                  label="Départ"
                  placeholder="Tapez votre adresse de départ..."
                  onPlaceSelected={handleFromSelected}
                  iconColor="text-zinc-600"
                />
                <AddressAutocomplete
                  label="Arrivée"
                  placeholder="Tapez votre destination..."
                  onPlaceSelected={handleToSelected}
                  iconColor="text-[#C9A84C]"
                />

                {/* Distance result */}
                {calculating && (
                  <div className="flex items-center gap-2 text-sm text-zinc-500 py-3">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Calcul de la distance...
                  </div>
                )}
                {customKm && !calculating && mode === "custom" && (
                  <div className="card-dark p-4 flex items-center gap-4">
                    <Navigation className="w-5 h-5 text-[#C9A84C]" />
                    <div>
                      <p className="text-sm font-medium">{customKm} km</p>
                      {customDuration && <p className="text-xs text-zinc-500">Environ {customDuration}</p>}
                    </div>
                  </div>
                )}
              </div>
            )}

            {mode === "forfait" && (
              <div className="space-y-3">
                {FORFAITS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedForfait(f.id)}
                    className={`w-full card-dark p-4 flex items-center justify-between text-left ${
                      selectedForfait === f.id ? "!border-[#C9A84C]" : ""
                    }`}
                  >
                    <div>
                      <p className="font-medium">{f.from} → {f.to}</p>
                      <p className="text-sm text-zinc-500">{f.km} km</p>
                    </div>
                    <p className="text-lg font-bold text-[#C9A84C]">{f.price}€</p>
                  </button>
                ))}
              </div>
            )}

            {/* Aller-retour */}
            <div className="mt-6">
              <button
                onClick={() => setAllerRetour(!allerRetour)}
                className={`flex items-center gap-3 p-4 w-full card-dark ${allerRetour ? "!border-[#C9A84C]" : ""}`}
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center ${allerRetour ? "bg-[#C9A84C] border-[#C9A84C]" : "border-[#262626]"}`}>
                  {allerRetour && <Check className="w-3 h-3 text-black" />}
                </div>
                <span className="text-sm">Aller-retour</span>
                {allerRetour && price > 0 && <span className="ml-auto text-sm text-[#C9A84C] font-medium">x2</span>}
              </button>
            </div>

            {/* Price summary */}
            {price > 0 && (
              <div className="mt-6 card-dark p-5 bg-[#C9A84C]/5 border-[#C9A84C]/20">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Prix total</span>
                  <span className="text-2xl font-bold text-[#C9A84C]">{price}€</span>
                </div>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-zinc-500">Acompte à la réservation</span>
                  <span className="text-zinc-300">{deposit}€</span>
                </div>
              </div>
            )}

            <button
              onClick={() => setStep("details")}
              disabled={!canProceedTrajet}
              className="btn-gold w-full mt-8 flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continuer <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Details */}
        {step === "details" && (
          <div className="animate-fade-in-up">
            <h1 className="text-2xl font-bold mb-2">Vos informations</h1>
            <p className="text-zinc-500 mb-8">Date, heure et coordonnées</p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-zinc-500 mb-1 block">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-zinc-600" />
                    <input className="input-dark pl-10" type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-zinc-500 mb-1 block">Heure</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-4 h-4 text-zinc-600" />
                    <input className="input-dark pl-10" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-zinc-500 mb-1 block">Nombre de passagers</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-4 h-4 text-zinc-600" />
                  <select className="input-dark pl-10 appearance-none" value={passengers} onChange={(e) => setPassengers(e.target.value)}>
                    {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                      <option key={n} value={n}>{n} passager{n > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                </div>
              </div>

              <hr className="border-[#262626]" />

              <div>
                <label className="text-sm text-zinc-500 mb-1 block">Nom complet *</label>
                <input className="input-dark" placeholder="Jean Dupont" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-zinc-500 mb-1 block">Téléphone *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-zinc-600" />
                  <input className="input-dark pl-10" type="tel" placeholder="06 12 34 56 78" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="text-sm text-zinc-500 mb-1 block">Email</label>
                <input className="input-dark" type="email" placeholder="jean@email.com (optionnel)" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-zinc-500 mb-1 block">Notes pour Morgan</label>
                <textarea className="input-dark" rows={3} placeholder="Précisions sur le lieu, nombre de bagages..." value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep("trajet")} className="flex-1 py-3 rounded-lg bg-[#141414] border border-[#262626] text-zinc-400 text-sm font-medium hover:text-white transition">
                Retour
              </button>
              <button
                onClick={() => setStep("confirm")}
                disabled={!canProceedDetails}
                className="btn-gold flex-[2] flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Confirmer <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === "confirm" && (
          <div className="animate-fade-in-up">
            <h1 className="text-2xl font-bold mb-2">Récapitulatif</h1>
            <p className="text-zinc-500 mb-8">Vérifiez et confirmez votre réservation</p>

            <div className="card-dark p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-zinc-500">Trajet</span>
                <span className="font-medium text-right">
                  {forfait ? `${forfait.from} → ${forfait.to}` : `${customFrom} → ${customTo}`}
                  {allerRetour ? " (A/R)" : ""}
                </span>
              </div>
              {customDuration && mode === "custom" && (
                <div className="flex justify-between">
                  <span className="text-zinc-500">Distance / Durée</span>
                  <span>{customKm} km — {customDuration}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-zinc-500">Date & heure</span>
                <span>{date} à {time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Passagers</span>
                <span>{passengers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Nom</span>
                <span>{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Téléphone</span>
                <span>{phone}</span>
              </div>
              <hr className="border-[#262626]" />
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Prix total</span>
                <span className="text-2xl font-bold text-[#C9A84C]">{price}€</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5" /> Acompte maintenant
                </span>
                <span className="font-medium">{deposit}€</span>
              </div>
            </div>

            <div className="mt-4 card-dark p-4 border-green-900/30 bg-green-900/5 flex items-start gap-3">
              <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
              <p className="text-sm text-zinc-400">
                En confirmant, votre réservation sera envoyée à Morgan via WhatsApp. Paiement en véhicule (carte, espèces ou SumUp).
              </p>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep("details")} className="flex-1 py-3 rounded-lg bg-[#141414] border border-[#262626] text-zinc-400 text-sm font-medium hover:text-white transition">
                Retour
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="btn-gold flex-[2] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? "Envoi en cours..." : "Confirmer la réservation"}
                {!submitting && <Check className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
