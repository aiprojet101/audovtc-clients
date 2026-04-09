"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Calendar, Clock, MapPin, Users, CreditCard,
  ChevronRight, Check, Phone, AlertCircle,
} from "lucide-react";
import { FORFAITS, PRICE_PER_KM, MIN_PRICE, calculateDeposit } from "@/lib/pricing";

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
  const [mode, setMode] = useState<"forfait" | "custom">(prefillForfait ? "forfait" : "forfait");
  const [selectedForfait, setSelectedForfait] = useState<string>(prefillForfait || "");
  const [allerRetour, setAllerRetour] = useState(false);

  // Custom
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [customKm, setCustomKm] = useState("");

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
            Morgan a bien reçu votre demande. Vous recevrez une confirmation par SMS et email sous peu.
          </p>
          <div className="card-dark p-4 text-left text-sm space-y-2 mb-6">
            <p><span className="text-zinc-500">Trajet :</span> {forfait ? `${forfait.from} → ${forfait.to}` : `${customFrom} → ${customTo}`}{allerRetour ? " (A/R)" : ""}</p>
            <p><span className="text-zinc-500">Date :</span> {date} à {time}</p>
            <p><span className="text-zinc-500">Prix total :</span> <span className="text-[#C9A84C] font-bold">{price}€</span></p>
          </div>
          <Link href="/" className="btn-gold inline-block">Retour à l&apos;accueil</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
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
            <p className="text-zinc-500 mb-8">Forfait ou trajet personnalisé</p>

            <div className="flex gap-3 mb-8">
              <button
                onClick={() => setMode("forfait")}
                className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${
                  mode === "forfait" ? "bg-[#C9A84C] text-black" : "bg-[#141414] border border-[#262626] text-zinc-400"
                }`}
              >
                Forfait
              </button>
              <button
                onClick={() => setMode("custom")}
                className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${
                  mode === "custom" ? "bg-[#C9A84C] text-black" : "bg-[#141414] border border-[#262626] text-zinc-400"
                }`}
              >
                Trajet libre
              </button>
            </div>

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

            {mode === "custom" && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-zinc-500 mb-1 block">Départ</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-zinc-600" />
                    <input className="input-dark pl-10" placeholder="Adresse de départ" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-zinc-500 mb-1 block">Arrivée</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#C9A84C]" />
                    <input className="input-dark pl-10" placeholder="Adresse d'arrivée" value={customTo} onChange={(e) => setCustomTo(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-zinc-500 mb-1 block">Distance estimée (km)</label>
                  <input className="input-dark" type="number" placeholder="Ex: 35" value={customKm} onChange={(e) => setCustomKm(e.target.value)} />
                  <p className="text-xs text-zinc-600 mt-1">Utilisez Google Maps pour estimer la distance. Morgan confirmera le tarif exact.</p>
                </div>
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

            <div className="mt-4 card-dark p-4 border-yellow-900/30 bg-yellow-900/5 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
              <p className="text-sm text-zinc-400">
                Le paiement en ligne sera disponible prochainement. Pour l&apos;instant, Morgan vous contactera pour confirmer la réservation et le paiement se fera en véhicule (carte ou espèces).
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
