import { Link } from "react-router-dom";
import { Marquee } from "@/components/flyer";
import TeeMockup from "@/components/shop/TeeMockup";
import { useFontCycle } from "./useFontCycle";

const MONO = "'IBM Plex Mono',monospace";
const A = "var(--a-c,#FF2B1C)";
const ITEMS = ["Drop 3", "/", "SS26", "/", "Bunker 001", "/", "Noise for the Dancefloor", "/", "The Showcase", "/", "Blue Clifford", "/", "La Plata — AR", "/"];
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
    <img src={src} alt={alt} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
  </div>
);

// 01 Drop 3 — primera sección de la home (v3). Reemplaza al hero: la remera del Drop 3 es la protagonista y el CTA lleva al shop.
// Estado "Archivo": sin precio y con compras deshabilitadas (reglas de datos).
export default function CurrentDrop() {
  const title = useFontCycle("drop");
  return (
    <section id="drop" data-screen-label="02 Drop 3" className="min-h-svh-fb" style={{ position: "relative", overflow: "hidden", background: "#0A0A09", display: "flex", flexDirection: "column" }}>
      {/* Anillos con tamaño fijo (svh), no relativo al alto de la sección: así no se desplazan al cargar fuentes (CLS). */}
      <div aria-hidden style={{ position: "absolute", left: "-20%", top: "-10svh", width: "90%", height: "130svh", background: `repeating-radial-gradient(circle at 50% 50%,${A} 0 9px,#0A0A09 9px 22px)`, opacity: 0.9, WebkitMaskImage: "radial-gradient(circle,#000 35%,transparent 70%)", maskImage: "radial-gradient(circle,#000 35%,transparent 70%)" }} />

      {/* Cinta superior: separa la intro BADDER del Drop 3 */}
      <div style={{ position: "relative", marginTop: 12, background: A, color: "#0A0A09", overflow: "hidden", whiteSpace: "nowrap", zIndex: 6, transform: "rotate(-1.2deg)", marginInline: "-2%" }}>
        <Marquee speed={0.6} style={{ gap: 28, padding: "7px 0", fontFamily: "'Doto',monospace", fontWeight: 900, fontSize: 22, letterSpacing: ".04em", textTransform: "uppercase" }}>
          {ITEMS.map((t, i) => <span key={i}>{t}</span>)}
        </Marquee>
      </div>

      <div style={{ position: "relative", flex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,400px),1fr))", gap: "clamp(32px,5vw,72px)", alignItems: "center", padding: "clamp(40px,6vw,90px) clamp(16px,3vw,40px) clamp(60px,7vw,100px)" }}>
        {/* Protagonista: la remera Bunker 001 colgada sobre un bloque de acento */}
        <div style={{ position: "relative", maxWidth: 620, width: "100%", justifySelf: "center" }}>
          <div data-depth="14" style={{ position: "absolute", left: "8%", top: "6%", width: "70%", aspectRatio: "1/1", padding: 24, background: "#0A0A09", transform: "rotate(-4deg)" }}>
            {THORN}
            <img src="/img/d3-perrito.webp" width={540} height={472} alt="" aria-hidden loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          <div data-depth="-22" style={{ position: "relative", width: "88%", marginLeft: "12%", paddingTop: "10%" }}>
            <div aria-hidden style={{ position: "absolute", left: "8%", right: "8%", top: "18%", bottom: "4%", background: A, transform: "rotate(5deg)", boxShadow: "8px 8px 0 #F2EFE6" }} />
            <TeeMockup fabric="#151513" print="/img/d3-bunker.webp" style={{ position: "relative", display: "block", width: "100%", filter: "drop-shadow(10px 14px 0 rgba(0,0,0,.55))" }} />
            <span style={{ position: "absolute", right: "-2%", bottom: "10%", background: "#F2EFE6", color: "#0A0A09", fontFamily: MONO, fontSize: 12, letterSpacing: ".12em", padding: "5px 8px", transform: "rotate(-5deg)", textTransform: "uppercase" }}>Bunker 001 Tee</span>
          </div>
          <img data-depth="-30" src="/img/d3-blue-clifford.webp" width={720} height={465} alt="" aria-hidden loading="lazy" decoding="async" style={{ height: "auto", position: "absolute", left: "-8%", bottom: "-6%", width: "46%", display: "block", transform: "rotate(-8deg)" }} />
        </div>

        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 20 }}>
          <span aria-hidden style={{ fontFamily: "'Pinyon Script',cursive", fontSize: "clamp(44px,5vw,80px)", lineHeight: 0.8, color: A }}>current</span>
          <h2 {...title.bind} className="hv-red t-drop" style={{ margin: "-10px 0 0", cursor: "pointer", fontFamily: title.fontFamily, fontWeight: 400, fontSize: "clamp(72px,11vw,190px)", lineHeight: 0.85, textTransform: "uppercase", color: "#F2EFE6", WebkitTextStroke: "1px #0A0A09" }}>Drop 3</h2>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", fontFamily: MONO, fontSize: 13, letterSpacing: ".14em", textTransform: "uppercase" }}>
            <span style={{ background: "#F2EFE6", color: "#0A0A09", padding: "5px 9px" }}>SS26</span>
            <span style={{ border: `1px dashed ${A}`, color: A, background: "#0A0A09", padding: "5px 9px" }}>Disponible en el shop</span>
          </div>
          <p style={{ margin: 0, maxWidth: "44ch", fontFamily: "'Newsreader',serif", fontSize: 20, lineHeight: 1.45, textWrap: "pretty" }}><span style={{ background: "#0A0A09", padding: "2px 6px", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>Bunker 001, Noise for the Dancefloor, The Showcase y Blue Clifford. Diseño de Lucas Nicolas Bengochea y Juan Francisco Arias.</span></p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 10, marginTop: 8, maxWidth: 520 }}>
            {thumb("#1a1a18", -3, "/img/d3-bunker.webp", "Bunker 001")}
            {thumb("#F2EFE6", 2, "/img/d3-noise.webp", "Noise for the Dancefloor")}
            {thumb("#F2EFE6", -1, "/img/d3-showcase.webp", "The Showcase")}
            {thumb("#1a1a18", 3, "/img/d3-blue-clifford-front.webp", "Blue Clifford Knit")}
          </div>
          <Link to="/shop" className="hv-cta inline-flex items-center min-h-[44px]" style={{ alignSelf: "flex-start", marginTop: 10, background: A, color: "#0A0A09", fontFamily: "'Roboto Condensed Bold',sans-serif", fontSize: 28, textTransform: "uppercase", padding: "12px 24px", transform: "rotate(-2deg)", boxShadow: "6px 6px 0 #F2EFE6" }}>Ir al shop →</Link>
        </div>
      </div>
    </section>
  );
}
