import { Link } from "react-router-dom";

const MONO14 = { fontFamily: "'IBM Plex Mono',monospace", fontSize: 14, letterSpacing: ".08em" };

// Footer de la maqueta: borde superior 2px --a, logo con warp min(60vw,420px), contacto mono 14px, padding inferior 120px (por el reproductor).
// Agregados funcionales fuera de la maqueta (ver DISENO.md): enlace a /contact y crédito de desarrollo con ancla a la crew.
export default function Footer() {
  return (
    <footer style={{ position: "relative", background: "#0A0A09", padding: "48px clamp(16px,3vw,40px) 120px", borderTop: "2px solid var(--a-c,#FF2B1C)", color: "#F2EFE6" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32, flexWrap: "wrap" }}>
        <img src="/img/logo.webp" alt="Badder" loading="lazy" style={{ width: "min(60vw,420px)", display: "block", filter: "url(#warp)" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 8, ...MONO14 }}>
          <a href="mailto:contact@badderexperience.com">contact@badderexperience.com</a>
          <a href="https://instagram.com/badder.experience" target="_blank" rel="noreferrer">@badder.experience</a>
          <span>La Plata, Argentina — Est. 2024</span>
          <Link to="/contact" className="inline-flex items-center min-h-[44px]">Contacto →</Link>
        </div>
      </div>
      <div style={{ marginTop: 32, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: ".1em", opacity: 0.7, textTransform: "uppercase" }}>
        © 2026 Badder Experience · Diseño y desarrollo web: Lucas Nicolas Bengochea ·{" "}
        <Link to="/#crew" className="underline underline-offset-4">Créditos</Link>
      </div>
    </footer>
  );
}
