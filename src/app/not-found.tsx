import Link from "next/link";

export const metadata = { title: "404 — EventPartner" };

/**
 * Global not-found. Rendered at the ROOT level (outside the [locale] layout),
 * so it MUST provide its own <html>/<body> — otherwise Next throws
 * "Missing <html> and <body> tags in the root layout".
 */
export default function NotFound() {
  return (
    <html lang="sv">
      <body
        style={{
          margin: 0,
          background: "#0a0a0a",
          color: "#fff",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
      >
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "2rem",
            gap: "1.25rem",
          }}
        >
          <span
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6AD8D2",
            }}
          >
            Fel 404
          </span>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 500,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Sidan kunde inte hittas
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              maxWidth: "420px",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Sidan du letar efter finns inte eller har flyttats.
          </p>
          <Link
            href="/"
            style={{
              marginTop: "0.5rem",
              padding: "0.85rem 1.75rem",
              borderRadius: "9999px",
              background: "#fff",
              color: "#0a0a0a",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            Till startsidan
          </Link>
        </main>
      </body>
    </html>
  );
}
