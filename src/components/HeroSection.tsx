import { Marquee } from "@/components/flyer";

const MONO = "'IBM Plex Mono',monospace";
const ITEMS = ["Badder Experience", "/", "La Plata — AR", "/", "Música", "/", "Cultura de club", "/", "Diseño", "/", "Fotografía", "/", "Indumentaria", "/", "Est. 2024", "/"];

// 01 Hero — introducción BADDER, tal cual la maqueta. Vuelve como primera sección (antes del Drop 3).
export default function HeroSection() {
  return (
    <section id="top" data-screen-label="01 Hero" className="min-h-svh-fb" style={{ position: "relative", overflow: "hidden", background: "#0A0A09" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(242,239,230,.16) 1.1px,transparent 1.7px)", backgroundSize: "7px 7px", WebkitMaskImage: "radial-gradient(ellipse at 50% 45%,#000 20%,transparent 75%)", maskImage: "radial-gradient(ellipse at 50% 45%,#000 20%,transparent 75%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: "calc(68px + env(safe-area-inset-top, 0px))", background: "var(--a-c,#FF2B1C)", color: "#0A0A09", overflow: "hidden", whiteSpace: "nowrap", zIndex: 6, transform: "rotate(-1.2deg)", margin: "0 -2%" }}>
        <Marquee speed={0.6} style={{ gap: 28, padding: "7px 0", fontFamily: "'Doto',monospace", fontWeight: 900, fontSize: 22, letterSpacing: ".04em", textTransform: "uppercase" }}>
          {ITEMS.map((t, i) => <span key={i}>{t}</span>)}
        </Marquee>
      </div>
      <div data-depth="22" style={{ position: "absolute", left: "3%", top: "18%", width: "clamp(170px,25vw,380px)", transform: "rotate(-7deg)", background: "var(--a-c,#FF2B1C)", zIndex: 2 }}>
        <img src="/img/d3-dj-azul.webp" alt="Gráfica DJ del Drop 3" style={{ width: "100%", display: "block", mixBlendMode: "multiply", filter: "url(#bitmap)" }} />
      </div>
      <div data-depth="34" style={{ position: "absolute", right: "4%", top: "14%", width: "clamp(150px,21vw,320px)", transform: "rotate(5deg)", zIndex: 2 }}>
        <img src="/img/p-rosset.webp" alt="Badder Showcase en Rosset Club" className="fx-blur" style={{ width: "100%", display: "block", ["--fx" as string]: "contrast(1.2)" }} />
        <span style={{ position: "absolute", left: -14, bottom: 18, background: "#F2EFE6", color: "#0A0A09", fontFamily: MONO, fontSize: 12, letterSpacing: ".12em", padding: "5px 8px", transform: "rotate(-4deg)", textTransform: "uppercase" }}>Rosset Club — 2025</span>
      </div>
      <div data-depth="-46" style={{ position: "absolute", left: "22%", bottom: "9%", width: "clamp(220px,32vw,500px)", zIndex: 5, pointerEvents: "none" }}>
        <img src="/img/d3-clifford-rojo.webp" alt="Clifford rojo, Drop 3" style={{ width: "100%", display: "block" }} />
      </div>
      <div style={{ position: "absolute", left: "-5%", width: "110%", top: "64%", height: 30, transform: "rotate(-4deg)", zIndex: 4, opacity: 0.9 }}>
        <svg aria-hidden width="100%" height="30" style={{ display: "block" }}><rect width="100%" height="30" fill="url(#barbW)" /></svg>
      </div>
      <div className="min-h-svh-fb" style={{ position: "relative", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 4vw 140px" }}>
        <div data-depth="10" style={{ position: "relative", width: "min(84vw,1040px)" }}>
          <img src="/img/logo.webp" alt="Badder" width={1310} height={535} {...{ fetchpriority: "high" }} style={{ width: "100%", height: "auto", display: "block", filter: "url(#warp)" }} />
          <span aria-hidden style={{ position: "absolute", right: "-2%", bottom: "-24%", fontFamily: "'Pinyon Script',cursive", fontSize: "clamp(54px,10vw,170px)", color: "var(--a-c,#FF2B1C)", transform: "rotate(-8deg)", lineHeight: 1, whiteSpace: "nowrap" }}>experience</span>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 64, background: "repeating-conic-gradient(#141413 0 25%,#1f1f1d 0 50%) 0 0/64px 64px", zIndex: 1 }} />
      <div style={{ position: "absolute", left: "clamp(16px,3vw,40px)", right: "clamp(16px,3vw,40px)", bottom: 20, display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", fontFamily: MONO, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", zIndex: 6 }}>
        <span>Espacio creativo multidisciplinario</span><span>La Plata, Argentina</span><span>@badder.experience</span><span>Scroll ↓</span>
      </div>
    </section>
  );
}
