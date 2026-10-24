import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "radial-gradient(ellipse at 50% 55%, #0d2a8a 0%, #050505 62%)",
          color: "#ededf0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>
          {profile.initials}
          <span style={{ color: "#2f6bff" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>
            {profile.name.toUpperCase()}
          </div>
          <div style={{ marginTop: 24, fontSize: 36, color: "#7aa2ff" }}>{profile.role}</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#9b9ba6" }}>
          GeneXus · SQL Server · Automatización de pruebas · Next.js
        </div>
      </div>
    ),
    size,
  );
}
