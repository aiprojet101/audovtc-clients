import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.searchParams.get("origin") || "";
  const destination = request.nextUrl.searchParams.get("destination") || "";

  if (!origin || !destination) {
    return NextResponse.json({ error: "origin and destination required" }, { status: 400 });
  }

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&mode=driving&language=fr&key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (
    data.status === "OK" &&
    data.rows?.[0]?.elements?.[0]?.status === "OK"
  ) {
    const el = data.rows[0].elements[0];
    return NextResponse.json({
      distanceKm: Math.round(el.distance.value / 1000),
      duration: el.duration.text,
    });
  }

  return NextResponse.json({ error: "Could not calculate distance" }, { status: 400 });
}
