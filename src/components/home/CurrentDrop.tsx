import { Link } from "react-router-dom";
import { useFontCycle } from "./useFontCycle";

const MONO = "'IBM Plex Mono',monospace";
const A = "var(--a-c,#FF2B1C)";
const THORN = (
  <>
    <svg aria-hidden style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 24 }}><rect width="100%" height="24" fill="url(#thornH)" /></svg>
    <svg aria-hidden style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 24, transform: "scaleY(-1)" }}><rect width="100%" height="24" fill="url(#thornH)" /></svg>
    <svg aria-hidden style={{ position: "absolute", left: 0, top: 0, width: 24, height: "100%" }}><rect width="24" height="100%" fill="url(#thornV)" /></svg>
    <svg aria-hidden style={{ position: "absolute", right: 0, top: 0, width: 24, height: "100%", transform: "scaleX(-1)" }}><rect width="24" height="100%" fill="url(#thornV)" /></svg>
  </>
);
const thumb = (bg: string, rot: number, src: string, alt: string) => (
  <div key={alt} className="hv-thumb" style={{ aspectRatio: "1/1", background: bg, overflow: "hidden", transform: `rotate(${rot}deg)` }}>
    <img src={src} alt={alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
  </div>
);

// 06 Current Drop — tal cual la maqueta. Estado "Archivo": sin precio y con compras deshabilitadas (reglas de datos).
export default function CurrentDrop() {
  const title = useFontCycle("drop");
  return (
    <section id="drop" data-screen-label="06 Current Drop" style={{ position: "relative", overflow: "hidden", padding: "clamp(60px,8vw,120px) clamp(16px,3vw,40px)", background: "#0A0A09" }}>
      <div style={{ position: "absolute", left: "-20%", top: "-20%", width: "90%", height: "140%", background: `repeating-radial-gradient(circle at 50% 50%,${A} 0 9px,#0A0A09 9px 22px)`, opacity: 0.9, WebkitMaskImage: "radial-gradient(circle,#000 35%,transparent 70%)", maskImage: "radial-gradient(circle,#000 35%,transparent 70%)" }} />
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,400px),1fr))", gap: "clamp(32px,5vw,72px)", alignItems: "center" }}>
        <div style={{ position: "relative", maxWidth: 620 }}>
          <div data-depth="14" style={{ position: "relative", padding: 24, background: "#0A0A09", transform: "rotate(-4deg)" }}>
            {THORN}
            <img src="/img/d3-perrito.webp" alt="Gráfica Drop 3" loading="lazy" style={{ width: "100%", display: "block" }} />
          </div>
          <img data-depth="-30" src="/img/d3-blue-clifford.webp" alt="" aria-hidden loading="lazy" style={{ position: "absolute", right: "-12%", bottom: "-14%", width: "62%", display: "block", transform: "rotate(-8deg)" }} />
        </div>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 20 }}>
          <span aria-hidden style={{ fontFamily: "'Pinyon Script',cursive", fontSize: "clamp(44px,5vw,80px)", lineHeight: 0.8, color: A }}>current</span>
          <h2 onClick={title.onClick} className="hv-red" style={{ margin: "-10px 0 0", cursor: "pointer", fontFamily: title.fontFamily, fontWeight: 400, fontSize: "clamp(64px,9vw,160px)", lineHeight: 0.85, textTransform: "uppercase", color: "#F2EFE6", WebkitTextStroke: "1px #0A0A09" }}>Drop 3</h2>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", fontFamily: MONO, fontSize: 13, letterSpacing: ".14em", textTransform: "uppercase" }}>
            <span style={{ background: "#F2EFE6", color: "#0A0A09", padding: "5px 9px" }}>SS25</span>
            <span style={{ border: "1px solid #F2EFE6", padding: "5px 9px" }}>Archivo</span>
            <span style={{ border: `1px dashed ${A}`, color: A, padding: "5px 9px" }}>Compras online deshabilitadas</span>
          </div>
          <p style={{ margin: 0, maxWidth: "44ch", fontFamily: "'Newsreader',serif", fontSize: 20, lineHeight: 1.45, textWrap: "pretty" }}>Bunker 001, Noise for the Dancefloor, The Showcase y Blue Clifford. Diseño de Lucas Nicolas Bengochea y Juan Francisco Arias.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 10, marginTop: 8 }}>
            {thumb("#1a1a18", -3, "/img/d3-bunker.webp", "Bunker 001")}
            {thumb("#F2EFE6", 2, "/img/d3-noise.webp", "Noise for the Dancefloor")}
            {thumb("#F2EFE6", -1, "/img/d3-showcase.webp", "The Showcase")}
            {thumb("#1a1a18", 3, "/img/d3-blue-clifford-front.webp", "Blue Clifford Knit")}
          </div>
          <Link to="/shop" className="hv-cta" style={{ alignSelf: "flex-start", marginTop: 10, background: A, color: "#0A0A09", fontFamily: "'Anton',sans-serif", fontSize: 26, textTransform: "uppercase", padding: "12px 22px", transform: "rotate(-2deg)" }}>Ver colección →</Link>
        </div>
      </div>
    </section>
  );
}
