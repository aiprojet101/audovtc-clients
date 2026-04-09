import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { sendTelegramNotification, formatReservationMessage } from "@/lib/telegram";
import { FORFAITS } from "@/lib/pricing";

// Stockage fichier JSON en attendant la base de données
const DATA_DIR = path.join(process.cwd(), "data");
const RESERVATIONS_FILE = path.join(DATA_DIR, "reservations.json");

interface Reservation {
  id: string;
  createdAt: string;
  status: "pending" | "confirmed" | "cancelled";
  mode: "forfait" | "custom";
  forfaitId: string | null;
  allerRetour: boolean;
  customFrom: string | null;
  customTo: string | null;
  customKm: number | null;
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

async function getReservations(): Promise<Reservation[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const data = await fs.readFile(RESERVATIONS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveReservations(reservations: Reservation[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(RESERVATIONS_FILE, JSON.stringify(reservations, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const reservation: Reservation = {
      id: `RES-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      status: "pending",
      mode: body.mode,
      forfaitId: body.forfaitId,
      allerRetour: body.allerRetour || false,
      customFrom: body.customFrom,
      customTo: body.customTo,
      customKm: body.customKm,
      date: body.date,
      time: body.time,
      passengers: body.passengers || 1,
      name: body.name,
      phone: body.phone,
      email: body.email || "",
      notes: body.notes || "",
      price: body.price,
      deposit: body.deposit,
    };

    const reservations = await getReservations();
    reservations.push(reservation);
    await saveReservations(reservations);

    // Notification Telegram à Morgan
    const forfait = reservation.forfaitId
      ? FORFAITS.find((f) => f.id === reservation.forfaitId)
      : null;
    const trajet = forfait
      ? `${forfait.from} → ${forfait.to}`
      : `${reservation.customFrom} → ${reservation.customTo}`;

    await sendTelegramNotification(
      formatReservationMessage({
        id: reservation.id,
        name: reservation.name,
        phone: reservation.phone,
        date: reservation.date,
        time: reservation.time,
        passengers: reservation.passengers,
        trajet,
        allerRetour: reservation.allerRetour,
        price: reservation.price,
        notes: reservation.notes,
      })
    );

    return NextResponse.json({ success: true, reservation });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  const reservations = await getReservations();
  return NextResponse.json(reservations);
}
