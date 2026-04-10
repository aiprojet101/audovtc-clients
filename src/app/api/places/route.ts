import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") || "";
  if (query.length < 3) {
    return NextResponse.json([]);
  }

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&components=country:fr&types=geocode|establishment&language=fr&key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.status === "OK") {
    return NextResponse.json(
      data.predictions.map((p: { description: string; place_id: string }) => ({
        description: p.description,
        place_id: p.place_id,
      }))
    );
  }

  return NextResponse.json([]);
}
