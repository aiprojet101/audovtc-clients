"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "33743289393";

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildReservationMessage(r: {
  trajet: string;
  allerRetour: boolean;
  date: string;
  time: string;
  passengers: string;
  name: string;
  phone: string;
  price: number;
  notes: string;
}) {
  let msg = `Bonjour Morgan, je souhaite réserver un VTC :\n\n`;
  msg += `📍 Trajet : ${r.trajet}${r.allerRetour ? " (Aller-retour)" : ""}\n`;
  msg += `🗓 Date : ${r.date} à ${r.time}\n`;
  msg += `👥 Passagers : ${r.passengers}\n`;
  msg += `💰 Prix estimé : ${r.price}€\n\n`;
  msg += `👤 Nom : ${r.name}\n`;
  msg += `📞 Tél : ${r.phone}\n`;
  if (r.notes) {
    msg += `📝 Notes : ${r.notes}\n`;
  }
  msg += `\nMerci !`;
  return msg;
}

export default function WhatsAppButton() {
  return (
    <a
      href={buildWhatsAppUrl("Bonjour Morgan, j'aimerais réserver un VTC.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/20 hover:scale-105 transition-all duration-300 group"
      aria-label="Contacter sur WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white fill-white" />
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-white text-black text-xs font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
        Contacter Morgan
      </span>
    </a>
  );
}
