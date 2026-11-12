import { Link } from "react-router-dom";
import { Marquee } from "@/components/flyer";
import { useFontCycle } from "./useFontCycle";

const MONO = "'IBM Plex Mono',monospace";
const A = "var(--a-c,#FF2B1C)";
const B = "var(--b-c,#9BFF2E)";
const sticker = { position: "absolute" as const, fontFamily: MONO, fontSize: 12, letterSpacing: ".1em", padding: "6px 8px", textTransform: "uppercase" as const };
const THORN = (
  <>
    <svg aria-hidden style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 24 }}><rect width="100%" height="24" fill="url(#thornH)" /></svg>
    <svg aria-hidden style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 24, transform: "scaleY(-1)" }}><rect width="100%" height="24" fill="url(#thornH)" /></svg>
    <svg aria-hidden style={{ position: "absolute", left: 0, top: 0, width: 24, height: "100%" }}><rect width="24" height="100%" fill="url(#thornV)" /></svg>
    <svg aria-hidden style={{ position: "absolute", right: 0, top: 0, width: 24, height: "100%", transform: "scaleX(-1)" }}><rect width="24" height="100%" fill="url(#thornV)" /></svg>
  </>
);
const MQ = ["From the archive", "Eventos", "Drops", "Series fotográficas", "Gráfica"];

// Cinta Akira + 04 From the Archive — tal cual la maqueta. Cada pieza enlaza a su proyecto real (/archive/:id).
export default function FromTheArchive() {
  const title = useFontCycle("archive");
  return (
    <>
      <div style={{ background: "#0A0A09", borderTop: `2px solid ${A}`, borderBottom: `2px solid ${A}`, overflow: "hidden", whiteSpace: "nowrap" }}>
        <Marquee speed={-0.9} style={{ gap: 40, padding: "12px 0", fontFamily: "'Akira',sans-serif", fontSize: "clamp(22px,2.6vw,38px)", textTransform: "uppercase", color: "#F2EFE6" }}>
          {MQ.flatMap((t, i) => [<span key={`t${i}`}>{t}</span>, <span key={`x${i}`} style={{ color: A }}>✕</span>])}
        </Marquee>
      </div>

      <section id="archive" data-screen-label="04 From the Archive" style={{ position: "relative", padding: "clamp(60px,8vw,120px) clamp(16px,3vw,40px)", background: "repeating-conic-gradient(#0E0E0D 0 25%,#161614 0 50%) 0 0/120px 120px", overflow: "hidden" }}>
        <h2 onClick={title.onClick} className="hv-hard" style={{ position: "relative", zIndex: 3, margin: 0, cursor: "pointer", fontFamily: title.fontFamily, fontWeight: 400, fontSize: "clamp(64px,11vw,190px)", lineHeight: 0.85, color: "#F2EFE6", textShadow: `6px 6px 0 ${A}`, transform: "rotate(2deg)" }}>From the Archive</h2>
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,250px),1fr))", gap: "clamp(20px,3vw,40px)", marginTop: "clamp(32px,4vw,60px)", alignItems: "start" }}>
          <Link to="/archive/rosset" className="hv-arch" style={{ position: "relative", display: "block", transform: "rotate(-3deg)" }}>
            <img src="/img/f-4.webp" alt="Flyer Badder Showcase Rosset" loading="lazy" className="fx-blur" style={{ width: "100%", display: "block", ["--fx" as string]: "saturate(1.2)" }} />
            <span style={{ ...sticker, left: -8, bottom: 14, background: "#0A0A09", color: "#F2EFE6" }}><b style={{ color: A }}>2025</b> Badder Showcase — Rosset Club</span>
          </Link>
          <Link to="/archive/cuchate.esta" className="hv-arch" style={{ position: "relative", display: "block", marginTop: "clamp(0px,7vw,110px)", transform: "rotate(2deg)" }}>
            <div style={{ position: "relative", padding: 22 }}>
              {THORN}
              <img src="/img/p-cuchate.webp" alt="Uriel Galeano — Cuchate.esta" loading="lazy" className="fx-blur" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }} />
            </div>
            <span style={{ ...sticker, right: -6, top: 30, background: A, color: "#0A0A09", transform: "rotate(4deg)" }}>2025 Cuchate.esta</span>
          </Link>
          <Link to="/archive/emergent" className="hv-arch" style={{ position: "relative", display: "block", transform: "rotate(-1.5deg)", marginTop: "clamp(0px,2vw,30px)" }}>
            <img src="/img/f-2.webp" alt="Flyer Emergent x Badder" loading="lazy" className="fx-blur" style={{ width: "100%", display: "block" }} />
            <span style={{ ...sticker, left: 10, top: -12, background: "#F2EFE6", color: "#0A0A09" }}><b>2024</b> Emergent x Badder</span>
          </Link>
          <Link to="/archive/capital" className="hv-arch" style={{ position: "relative", display: "block", transform: "rotate(3deg)", marginTop: "clamp(0px,9vw,140px)" }}>
            <div style={{ background: B }}><img src="/img/p-capital.webp" alt="011 — Capital Federal" loading="lazy" style={{ width: "100%", display: "block", mixBlendMode: "multiply", filter: "url(#bitmap)" }} /></div>
            <span style={{ ...sticker, left: -8, bottom: -14, background: "#0A0A09", color: "#F2EFE6" }}><b style={{ color: B }}>2025</b> 011 — Capital Federal</span>
          </Link>
          <Link to="/archive/levels" className="hv-arch" style={{ position: "relative", display: "block", transform: "rotate(-2deg)" }}>
            <img src="/img/f-6.webp" alt="Flyer Levels" loading="lazy" className="fx-blur" style={{ width: "100%", display: "block" }} />
            <span style={{ ...sticker, right: -8, bottom: 24, background: "#F2EFE6", color: "#0A0A09" }}><b>2025</b> Levels</span>
          </Link>
          <Link to="/archive/tom" className="hv-arch" style={{ position: "relative", display: "block", transform: "rotate(1.5deg)", marginTop: "clamp(0px,4vw,60px)" }}>
            <img src="/img/p-tom.webp" alt="Badder Showcase — Tom" loading="lazy" className="fx-blur" style={{ width: "100%", display: "block", ["--fx" as string]: "contrast(1.3)" }} />
            <span style={{ ...sticker, left: 12, top: -12, background: A, color: "#0A0A09" }}>2024 Badder Showcase — Tom</span>
          </Link>
        </div>
        <div style={{ position: "relative", display: "flex", justifyContent: "flex-end", marginTop: "clamp(40px,5vw,72px)" }}>
          <Link to="/archive" style={{ fontFamily: "'Anton',sans-serif", fontSize: "clamp(28px,3vw,44px)", textTransform: "uppercase", borderBottom: `4px solid ${A}`, paddingBottom: 4 }}>Ver archivo completo →</Link>
        </div>
      </section>
    </>
  );
}
