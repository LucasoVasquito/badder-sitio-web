import { useFontCycle } from "./home/useFontCycle";

const MONO = "'IBM Plex Mono',monospace";
const CREW: [string, string][] = [
  ["Lucas Nicolas Bengochea", "Diseño · flyers · motion"],
  ["Juan Francisco Arias", "Fotografía · diseño"],
  ["Uriel Galeano", "Música"],
  ["Francisco Anguis", "Música"],
  ["Javier Almiron", "Diseño"],
];

// 08 About + Crew — tal cual la maqueta. El bloque Crew conserva el ancla #crew (enlaces de créditos).
export default function AboutSection() {
  const title = useFontCycle("about");
  return (
    <section id="about" data-screen-label="08 About + Crew" style={{ position: "relative", background: "#F2EFE6", color: "#0A0A09", padding: "clamp(60px,8vw,120px) clamp(16px,3vw,40px)", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", backgroundImage: "radial-gradient(#0A0A09 1px,transparent 1.5px)", backgroundSize: "6px 6px", WebkitMaskImage: "linear-gradient(90deg,transparent 55%,#000)", maskImage: "linear-gradient(90deg,transparent 55%,#000)", opacity: 0.4 }} />
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))", gap: "clamp(32px,6vw,96px)", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <h2 onClick={title.onClick} style={{ margin: 0, cursor: "pointer", fontFamily: title.fontFamily, fontWeight: 400, fontSize: "clamp(54px,7vw,120px)", lineHeight: 0.9, textTransform: "uppercase" }}>About</h2>
          <p style={{ margin: 0, fontFamily: "'Newsreader',serif", fontSize: "clamp(24px,2.3vw,34px)", lineHeight: 1.3, maxWidth: "30ch", textWrap: "pretty" }}>
            Espacio creativo multidisciplinario nacido alrededor de la música electrónica underground. <i>Música, cultura de club, diseño, fotografía, audiovisual e indumentaria</i> desde La Plata.
          </p>
        </div>
        <div id="crew" style={{ display: "flex", flexDirection: "column", borderTop: "3px solid #0A0A09", scrollMarginTop: 96 }}>
          <span style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".16em", textTransform: "uppercase", padding: "14px 0", borderBottom: "1px solid #0A0A09" }}>Crew</span>
          {CREW.map(([n, r]) => (
            <div key={n} className="hv-crew" style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "14px 0", borderBottom: "1px solid #0A0A09" }}>
              <span style={{ fontFamily: "'Anton',sans-serif", fontSize: 26, textTransform: "uppercase" }}>{n}</span>
              <span style={{ fontFamily: MONO, fontSize: 13, textAlign: "right" }}>{r}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
