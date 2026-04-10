import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AudoVTC — Votre chauffeur privé dans l'Audomarois";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
          position: "relative",
        }}
      >
        {/* Gold glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)",
          }}
        />
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #C9A84C, #A07D2E)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 900,
              color: "#0A0A0A",
            }}
          >
            V
          </div>
          <div style={{ display: "flex", fontSize: 48, fontWeight: 800, color: "#FFFFFF" }}>
            AUDO
            <span style={{ color: "#C9A84C" }}>VTC</span>
          </div>
        </div>
        {/* Title */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "#FFFFFF",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          Votre chauffeur privé
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            background: "linear-gradient(135deg, #E8D48B, #C9A84C, #A07D2E)",
            backgroundClip: "text",
            color: "transparent",
            textAlign: "center",
          }}
        >
          dans l&apos;Audomarois
        </div>
        {/* Subtitle */}
        <div
          style={{
            fontSize: 20,
            color: "#888",
            marginTop: 24,
            textAlign: "center",
          }}
        >
          Saint-Omer • Calais • Boulogne • Dunkerque • Lille
        </div>
        {/* CTA */}
        <div
          style={{
            marginTop: 40,
            padding: "14px 40px",
            background: "linear-gradient(135deg, #C9A84C, #A07D2E)",
            borderRadius: 10,
            fontSize: 18,
            fontWeight: 700,
            color: "#0A0A0A",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Réserver maintenant
        </div>
      </div>
    ),
    { ...size }
  );
}
