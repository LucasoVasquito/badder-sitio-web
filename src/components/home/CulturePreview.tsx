import { Link } from "react-router-dom";
import { useFontCycle } from "./useFontCycle";

const MONO = "'IBM Plex Mono',monospace";
const A = "var(--a-c,#FF2B1C)";
const B = "var(--b-c,#9BFF2E)";
const TAPE = "rgba(214,206,180,.85)";
const tagStyle = (bg: string, color: string) => ({ display: "inline-block", marginTop: 16, background: bg, color, fontFamily: MONO, fontSize: 12, letterSpacing: ".14em", padding: "4px 8px", textTransform: "uppercase" as const });
const linkStyle = { color: "inherit" };

// 03 Culture — tal cual la maqueta. Cada nota enlaza a su artículo real (/culture/:id) con un enlace que cubre la tarjeta.
export default function CulturePreview() {
  const title = useFontCycle("culture");
  return (
    <section id="culture" data-screen-label="03 Culture" style={{ position: "relative", background: "#F2EFE6", color: "#0A0A09", padding: "clamp(60px,8vw,120px) clamp(16px,3vw,40px) clamp(80px,9vw,140px)", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: "-10%", top: "-10%", width: "70%", height: "90%", backgroundImage: "radial-gradient(#0A0A09 1.2px,transparent 1.8px)", backgroundSize: "8px 8px", WebkitMaskImage: "radial-gradient(circle at 70% 30%,#000 0,transparent 65%)", maskImage: "radial-gradient(circle at 70% 30%,#000 0,transparent 65%)", opacity: 0.55 }} />
      <div style={{ position: "relative", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
        <h2 {...title.bind} className="hv-culture" style={{ margin: 0, cursor: "pointer", fontFamily: title.fontFamily, fontWeight: 400, fontSize: "clamp(84px,15vw,250px)", lineHeight: 0.8, color: A, transform: "rotate(-4deg)", transformOrigin: "left bottom", maxWidth: "100%" }}>Culture</h2>
        <p style={{ margin: 0, maxWidth: "34ch", fontFamily: "'Newsreader',serif", fontStyle: "italic", fontSize: "clamp(20px,1.8vw,26px)", lineHeight: 1.3, textWrap: "pretty" }}>Notas, referencias y documentación de la escena. Sonido, diseño, flyers y la historia detrás de la pista.</p>
      </div>
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: "clamp(28px,4vw,56px)", marginTop: "clamp(40px,5vw,72px)", alignItems: "start" }}>
        <article className="hv-card" style={{ position: "relative", transform: "rotate(-2.5deg)", background: "#0A0A09", color: "#F2EFE6", padding: "14px 14px 22px" }}>
          <div style={{ position: "absolute", left: "38%", top: -14, width: 96, height: 26, background: TAPE, transform: "rotate(3deg)" }} />
          <div style={{ background: A, aspectRatio: "4/3", overflow: "hidden" }}><img src="/img/cover-club-motion.webp" width={500} height={500} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", mixBlendMode: "multiply", filter: "url(#bitmap)" }} /></div>
          <span style={tagStyle(A, "#0A0A09")}>Sound</span>
          <h3 style={{ margin: "10px 0 0", fontFamily: "'Newsreader',serif", fontWeight: 600, fontSize: "clamp(26px,2.4vw,34px)", lineHeight: 1.08, textWrap: "pretty" }}>
            <Link to="/culture/post-01" className="stretch" style={linkStyle}>5 tracks de la semana</Link>
          </h3>
        </article>
        <article className="hv-card" style={{ position: "relative", transform: "rotate(1.8deg)", marginTop: "clamp(0px,6vw,90px)", background: "#F2EFE6", border: "2px solid #0A0A09", padding: "14px 14px 22px" }}>
          <div style={{ position: "absolute", right: "16%", top: -14, width: 90, height: 26, background: TAPE, transform: "rotate(-5deg)" }} />
          <div style={{ aspectRatio: "4/3", overflow: "hidden", background: "#F2EFE6" }}><img src="/img/p-tom.webp" width={720} height={540} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "url(#bitmap)" }} /></div>
          <span style={tagStyle("#0A0A09", "#F2EFE6")}>Culture</span>
          <h3 style={{ margin: "10px 0 0", fontFamily: "'UnifrakturMaguntia',serif", fontWeight: 400, fontSize: "clamp(30px,2.8vw,40px)", lineHeight: 1.05, textWrap: "pretty" }}>
            <Link to="/culture/post-02" className="stretch" style={linkStyle}>Los orígenes del techno de Detroit</Link>
          </h3>
        </article>
        <article className="hv-card" style={{ position: "relative", transform: "rotate(-1deg)", marginTop: "clamp(0px,2vw,30px)", background: "#0A0A09", color: "#F2EFE6", padding: "14px 14px 22px" }}>
          <div style={{ position: "absolute", left: "10%", top: -14, width: 100, height: 26, background: TAPE, transform: "rotate(-2deg)" }} />
          <div style={{ aspectRatio: "4/3", overflow: "hidden" }}><img src="/img/f-2.webp" width={720} height={1018} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block", filter: "contrast(1.3) saturate(1.3)" }} /></div>
          <span style={tagStyle(B, "#0A0A09")}>Design</span>
          <h3 style={{ margin: "10px 0 0", fontFamily: "'Rye',serif", fontWeight: 400, fontSize: "clamp(28px,2.6vw,38px)", lineHeight: 1.05, textTransform: "uppercase", textWrap: "pretty" }}>
            <Link to="/culture/post-03" className="stretch" style={linkStyle}>Flyers rave</Link>
          </h3>
        </article>
      </div>
    </section>
  );
}
