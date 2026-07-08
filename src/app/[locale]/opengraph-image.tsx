import { ImageResponse } from "next/og";

/**
 * Branded OG image (1200x630) — auto-applied to every page under [locale]
 * unless a route provides its own. Per wb-seo method §4.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "EventPartner — 340,000+ venues across 175 countries";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const sv = locale === "sv";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0a0a0a 0%, #131318 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row: brand + mono label */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 9999,
                background: "#6AD8D2",
                display: "flex",
              }}
            />
            <div style={{ fontSize: 34, fontWeight: 700, color: "#ffffff", display: "flex" }}>
              EventPartner
            </div>
          </div>
          <div
            style={{
              fontSize: 19,
              letterSpacing: 4,
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            eventpartner.io
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 76, fontWeight: 700, color: "#ffffff", lineHeight: 1.04, display: "flex" }}>
            {sv ? "Allt ditt event behöver." : "Everything your event needs."}
          </div>
          <div style={{ fontSize: 76, fontWeight: 300, color: "#6AD8D2", lineHeight: 1.04, display: "flex" }}>
            {sv ? "En partner, EventPartner." : "One partner, EventPartner."}
          </div>
        </div>

        {/* Bottom stats row */}
        <div style={{ display: "flex", gap: 56 }}>
          {(sv
            ? [
                ["340 000+", "Venues"],
                ["175", "Länder"],
                ["Snabb", "Leverans"],
              ]
            : [
                ["340,000+", "Venues"],
                ["175", "Countries"],
                ["Fast", "Delivery"],
              ]
          ).map(([value, label]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 40, fontWeight: 700, color: "#ffffff", display: "flex" }}>{value}</div>
              <div
                style={{
                  fontSize: 17,
                  letterSpacing: 3,
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  display: "flex",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
