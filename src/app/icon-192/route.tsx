import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 192,
          height: 192,
          borderRadius: 40,
          background: "linear-gradient(135deg, #C9A84C, #A07D2E)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 90,
          fontWeight: 900,
          color: "#0A0A0A",
        }}
      >
        V
      </div>
    ),
    { width: 192, height: 192 }
  );
}
