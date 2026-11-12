import { useFontCycle } from "./useFontCycle";

// 07 Join the Frequency — tal cual la maqueta (fondo --b). "Escribinos" abre el mail; la sección vive en /community.
export default function JoinFrequency() {
  const title = useFontCycle("join");
  return (
    <section id="join" data-screen-label="07 Join the Frequency" style={{ position: "relative", overflow: "hidden", background: "var(--b-c,#9BFF2E)", color: "#0A0A09", padding: "clamp(60px,8vw,120px) clamp(16px,3vw,40px)" }}>
      <div style={{ position: "absolute", right: "-4%", top: "8%", width: "clamp(200px,34vw,520px)", transform: "rotate(6deg)", opacity: 0.9 }}>
        <img src="/img/p-sesion.webp" alt="" aria-hidden loading="lazy" style={{ width: "100%", display: "block", mixBlendMode: "multiply", filter: "url(#bitmap)" }} />
      </div>
      <div style={{ position: "absolute", left: "-5%", width: "110%", top: "46%", height: 30, transform: "rotate(3deg)" }}>
        <svg aria-hidden width="100%" height="30" style={{ display: "block" }}><rect width="100%" height="30" fill="url(#barbK)" /></svg>
      </div>
      <h2 onClick={title.onClick} style={{ position: "relative", margin: 0, cursor: "pointer", fontFamily: title.fontFamily, fontWeight: 400, fontSize: "clamp(60px,10vw,176px)", lineHeight: 0.88, textTransform: "uppercase", maxWidth: "11ch", transform: "rotate(-3deg)" }}>Join the frequency</h2>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 22, marginTop: "clamp(40px,5vw,72px)", maxWidth: 520 }}>
        <p style={{ margin: 0, fontFamily: "'Newsreader',serif", fontSize: 22, lineHeight: 1.4, textWrap: "pretty" }}>Mandanos tu música, tu fotografía o tu gráfica. Buscamos gente para sumar a sesiones, eventos y proyectos.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="https://instagram.com/badder.experience" target="_blank" rel="noreferrer" className="hv-ig" style={{ background: "#0A0A09", color: "#F2EFE6", fontFamily: "'Anton',sans-serif", fontSize: 24, textTransform: "uppercase", padding: "12px 20px" }}>@badder.experience</a>
          <a href="mailto:contact@badderexperience.com" className="hv-mail" style={{ border: "3px solid #0A0A09", fontFamily: "'Anton',sans-serif", fontSize: 24, textTransform: "uppercase", padding: "9px 18px" }}>Escribinos</a>
        </div>
      </div>
    </section>
  );
}
