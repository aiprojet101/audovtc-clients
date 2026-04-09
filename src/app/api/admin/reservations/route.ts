import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const RESERVATIONS_FILE = path.join(DATA_DIR, "reservations.json");

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();
    const data = await fs.readFile(RESERVATIONS_FILE, "utf-8");
    const reservations = JSON.parse(data);

    const index = reservations.findIndex((r: { id: string }) => r.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Réservation introuvable" }, { status: 404 });
    }

    reservations[index].status = status;
    await fs.writeFile(RESERVATIONS_FILE, JSON.stringify(reservations, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
