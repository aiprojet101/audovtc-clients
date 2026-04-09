const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

export async function sendTelegramNotification(message: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("Telegram not configured, skipping notification");
    return;
  }

  await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    }
  );
}

export function formatReservationMessage(r: {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  passengers: number;
  trajet: string;
  allerRetour: boolean;
  price: number;
  notes: string;
}) {
  return `🚗 <b>Nouvelle réservation !</b>

📋 <b>${r.id}</b>
👤 ${r.name}
📞 <a href="tel:${r.phone}">${r.phone}</a>

🗓 ${r.date} à ${r.time}
👥 ${r.passengers} passager${r.passengers > 1 ? "s" : ""}
📍 ${r.trajet}${r.allerRetour ? " (A/R)" : ""}

💰 <b>${r.price}€</b>
${r.notes ? `\n📝 ${r.notes}` : ""}

✅ /confirm_${r.id}
❌ /cancel_${r.id}`;
}
