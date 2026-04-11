"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Calendar, Clock, MapPin, Users, Phone, Mail,
  Check, X, RefreshCw, Car, Euro, ChevronDown, Lock,
} from "lucide-react";
import { FORFAITS } from "@/lib/pricing";

interface Reservation {
  id: string;
  createdAt: string;
  status: "pending" | "confirmed" | "cancelled";
  mode: "forfait" | "custom";
  forfaitId: string | null;
  allerRetour: boolean;
  customFrom: string | null;
  customTo: string | null;
  date: string;
  time: string;
  passengers: number;
  name: string;
  phone: string;
  email: string;
  notes: string;
  price: number;
  deposit: number;
}

export default function AdminPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPwdModal, setShowPwdModal] = useState(false);
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);

  // Auto-login si mot de passe sauvegardé
  useEffect(() => {
    const saved = localStorage.getItem("admin_pwd");
    if (saved) {
      setPassword(saved);
      fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: saved }),
      }).then(res => {
        if (res.ok) { setAuthenticated(true); }
        else { localStorage.removeItem("admin_pwd"); }
      });
    }
  }, []);

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reservation");
      const data = await res.json();
      setReservations(data.sort((a: Reservation, b: Reservation) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    } catch {
      console.error("Erreur chargement");
    } finally {
      setLoading(false);
    }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuthenticated(true);
        setAuthError(false);
        if (rememberMe) localStorage.setItem("admin_pwd", password);
        fetchReservations();
      } else {
        setAuthError(true);
        localStorage.removeItem("admin_pwd");
      }
    } catch {
      setAuthError(true);
    }
  }

  useEffect(() => { if (authenticated) fetchReservations(); }, [authenticated, fetchReservations]);

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="card-dark p-8 max-w-sm w-full">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center">
            <Lock className="w-6 h-6 text-[#C9A84C]" />
          </div>
          <h1 className="text-xl font-bold text-center mb-2">Administration</h1>
          <p className="text-xs text-zinc-500 text-center mb-6">Entrez votre mot de passe</p>
          {authError && <p className="text-xs text-red-400 text-center mb-3">Mot de passe incorrect</p>}
          <input
            type="password"
            className="input-dark mb-4"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <label className="flex items-center gap-2 mb-4 cursor-pointer">
            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 accent-[#C9A84C]" />
            <span className="text-xs text-zinc-500">Rester connecté</span>
          </label>
          <button type="submit" className="btn-gold w-full">Connexion</button>
        </form>
      </div>
    );
  }

  async function changePassword() {
    if (newPwd.length < 6) { setPwdMsg("6 caractères minimum"); return; }
    if (newPwd !== confirmPwd) { setPwdMsg("Les mots de passe ne correspondent pas"); return; }
    setPwdLoading(true);
    setPwdMsg("");
    try {
      const domain = window.location.hostname;
      const slug = domain.replace(".vtc-site.fr", "");
      const res = await fetch("https://vtc-site.fr/api/client/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, currentPassword: password, newPassword: newPwd }),
      });
      const data = await res.json();
      if (res.ok) {
        setPwdMsg("Mot de passe mis à jour. Rechargez la page dans 1 minute.");
        setPassword(newPwd);
        localStorage.setItem("admin_pwd", newPwd);
        setTimeout(() => setShowPwdModal(false), 3000);
      } else {
        setPwdMsg(data.error || "Erreur");
      }
    } catch {
      setPwdMsg("Erreur de connexion");
    } finally {
      setPwdLoading(false);
    }
  }

  async function updateStatus(id: string, status: "confirmed" | "cancelled") {
    await fetch("/api/admin/reservations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchReservations();
  }

  const filtered = reservations.filter((r) => filter === "all" || r.status === filter);

  const stats = {
    total: reservations.length,
    pending: reservations.filter((r) => r.status === "pending").length,
    confirmed: reservations.filter((r) => r.status === "confirmed").length,
    ca: reservations.filter((r) => r.status === "confirmed").reduce((sum, r) => sum + r.price, 0),
  };

  function getTrajetLabel(r: Reservation) {
    if (r.mode === "forfait" && r.forfaitId) {
      const f = FORFAITS.find((f) => f.id === r.forfaitId);
      return f ? `${f.from} → ${f.to}` : r.forfaitId;
    }
    return `${r.customFrom} → ${r.customTo}`;
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-[#0A0A0A] border-b border-[#262626] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-gold-gradient font-bold text-lg">AUDOVTC Admin</h1>
            <p className="text-xs text-zinc-600">Tableau de bord</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowPwdModal(true)} className="p-2 rounded-lg bg-[#141414] border border-[#262626] text-zinc-400 hover:text-white transition" title="Changer le mot de passe">
              <Lock className="w-4 h-4" />
            </button>
            <button onClick={fetchReservations} className="p-2 rounded-lg bg-[#141414] border border-[#262626] text-zinc-400 hover:text-white transition">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <Link href="/" className="text-sm text-zinc-500 hover:text-white transition">Site</Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total, icon: Car, color: "text-zinc-300" },
            { label: "En attente", value: stats.pending, icon: Clock, color: "text-yellow-500" },
            { label: "Confirmées", value: stats.confirmed, icon: Check, color: "text-green-500" },
            { label: "CA confirmé", value: `${stats.ca}€`, icon: Euro, color: "text-[#C9A84C]" },
          ].map((s) => (
            <div key={s.label} className="card-dark p-4">
              <div className="flex items-center gap-2 mb-2">
                <s.icon className={`w-4 h-4 ${s.color}`} />
                <span className="text-xs text-zinc-500">{s.label}</span>
              </div>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          {(["all", "pending", "confirmed", "cancelled"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                filter === f ? "bg-[#C9A84C] text-black font-medium" : "bg-[#141414] border border-[#262626] text-zinc-500"
              }`}
            >
              {f === "all" ? "Toutes" : f === "pending" ? "En attente" : f === "confirmed" ? "Confirmées" : "Annulées"}
            </button>
          ))}
        </div>

        {/* Reservations */}
        {loading ? (
          <div className="text-center py-20 text-zinc-600">Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-zinc-600">Aucune réservation</div>
        ) : (
          <div className="space-y-4">
            {filtered.map((r) => (
              <div key={r.id} className={`card-dark p-5 ${r.status === "pending" ? "border-yellow-800/40" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        r.status === "pending" ? "bg-yellow-500/10 text-yellow-500" :
                        r.status === "confirmed" ? "bg-green-500/10 text-green-500" :
                        "bg-red-500/10 text-red-500"
                      }`}>
                        {r.status === "pending" ? "En attente" : r.status === "confirmed" ? "Confirmée" : "Annulée"}
                      </span>
                      <span className="text-xs text-zinc-600">{r.id}</span>
                    </div>
                    <p className="font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#C9A84C]" />
                      {getTrajetLabel(r)}{r.allerRetour ? " (A/R)" : ""}
                    </p>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-zinc-400">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {r.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {r.time}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {r.passengers}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm">
                      <span className="text-zinc-300 font-medium">{r.name}</span>
                      <a href={`tel:${r.phone}`} className="flex items-center gap-1 text-[#C9A84C] hover:underline">
                        <Phone className="w-3.5 h-3.5" /> {r.phone}
                      </a>
                      {r.email && (
                        <a href={`mailto:${r.email}`} className="flex items-center gap-1 text-zinc-500 hover:text-white">
                          <Mail className="w-3.5 h-3.5" /> {r.email}
                        </a>
                      )}
                    </div>
                    {r.notes && <p className="mt-2 text-sm text-zinc-600 italic">{r.notes}</p>}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xl font-bold text-[#C9A84C]">{r.price}€</p>
                    {r.status === "pending" && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => updateStatus(r.id, "confirmed")}
                          className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition"
                          title="Confirmer"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateStatus(r.id, "cancelled")}
                          className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition"
                          title="Annuler"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modale changement mot de passe */}
      {showPwdModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4" onClick={() => setShowPwdModal(false)}>
          <div className="card-dark p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-bold mb-4 flex items-center gap-2"><Lock className="w-4 h-4 text-[#C9A84C]" /> Changer le mot de passe</h2>
            <div className="space-y-3">
              <input type="password" className="input-dark" placeholder="Nouveau mot de passe" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} />
              <input type="password" className="input-dark" placeholder="Confirmer le mot de passe" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
              {pwdMsg && <p className={`text-xs ${pwdMsg.includes("mis à jour") ? "text-green-500" : "text-red-400"}`}>{pwdMsg}</p>}
              <div className="flex gap-3">
                <button onClick={() => setShowPwdModal(false)} className="flex-1 py-2 rounded-lg bg-[#141414] border border-[#262626] text-zinc-400 text-sm">Annuler</button>
                <button onClick={changePassword} disabled={pwdLoading} className="btn-gold flex-1 !py-2 !text-xs">{pwdLoading ? "..." : "Valider"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
