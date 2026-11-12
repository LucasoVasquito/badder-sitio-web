import { usePlayerStore, ORDER } from "@/store/playerStore";
import { useFontCycle } from "./useFontCycle";

const MONO = "'IBM Plex Mono',monospace";

const THORN = (h: number) => (
  <>
    <svg aria-hidden style={{ position: "absolute", left: 0, top: 0, width: "100%", height: h }}><rect width="100%" height={h} fill="url(#thornH)" /></svg>
    <svg aria-hidden style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: h, transform: "scaleY(-1)" }}><rect width="100%" height={h} fill="url(#thornH)" /></svg>
    <svg aria-hidden style={{ position: "absolute", left: 0, top: 0, width: h, height: "100%" }}><rect width={h} height="100%" fill="url(#thornV)" /></svg>
    <svg aria-hidden style={{ position: "absolute", right: 0, top: 0, width: h, height: "100%", transform: "scaleX(-1)" }}><rect width={h} height="100%" fill="url(#thornV)" /></svg>
  </>
);

const A = "var(--a-c,#FF2B1C)";
const ROWS = [
  { i: 0, label: "Not Rules", tag: "EP", ml: undefined, font: "'Anton',sans-serif", size: "clamp(30px,3.6vw,54px)", paper: false, doto: false },
  { i: 1, label: "Beeacks Breck Me", tag: "EP", ml: "clamp(20px,8vw,120px)", font: "'Doto',monospace", size: "clamp(28px,3.3vw,50px)", paper: false, doto: true },
  { i: 2, label: "Club Motion", tag: "Preview", ml: "clamp(8px,3vw,40px)", font: "'Anton',sans-serif", size: "clamp(30px,3.6vw,54px)", paper: true, doto: false },
  { i: 3, label: "Dope Energy", tag: "Preview", ml: "clamp(30px,12vw,200px)", font: "'Doto',monospace", size: "clamp(28px,3.3vw,50px)", paper: false, doto: true },
  { i: 4, label: "Power Up", tag: "Preview", ml: "clamp(14px,5vw,80px)", font: "'Anton',sans-serif", size: "clamp(30px,3.6vw,54px)", paper: false, doto: false },
  { i: 5, label: "Talk Like That", tag: "Preview", ml: "clamp(26px,10vw,160px)", font: "'Doto',monospace", size: "clamp(28px,3.3vw,50px)", paper: true, doto: true },
];

// 02 Latest Transmissions — tal cual la maqueta. El audio sale del reproductor global (un solo <audio>).
export default function LatestTransmissions() {
  const title = useFontCycle("trans");
  const { index, isPlaying, playTrack } = usePlayerStore();
  const playingFirst = isPlaying && index === ORDER[0];

  return (
    <section id="music" data-screen-label="02 Latest Transmissions" style={{ position: "relative", background: "#0A0A09", padding: "clamp(72px,9vw,140px) clamp(16px,3vw,40px) clamp(72px,8vw,120px)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg,rgba(242,239,230,.045) 0 1px,transparent 1px 4px)", pointerEvents: "none" }} />
      <h2
        onClick={title.onClick}
        className="hv-glitch"
        style={{ position: "relative", margin: 0, cursor: "pointer", fontFamily: title.fontFamily, fontWeight: 900, fontSize: "clamp(40px,8.6vw,160px)", lineHeight: 0.86, textTransform: "uppercase", color: A, textShadow: "4px 0 0 rgba(0,255,240,.35),-4px 0 0 rgba(255,0,90,.35)" }}
      >
        <span style={{ display: "block" }}>Latest</span>
        <span style={{ display: "block", paddingLeft: "clamp(12px,8vw,180px)", color: "transparent", WebkitTextStroke: "2px #F2EFE6" }}>Transmissions</span>
      </h2>
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))", gap: "clamp(32px,5vw,80px)", marginTop: "clamp(24px,4vw,56px)", alignItems: "start" }}>
        <div style={{ position: "relative", transform: "rotate(-2.5deg)", maxWidth: 560 }}>
          <div style={{ position: "relative", padding: 22 }}>
            {THORN(24)}
            <img src="/img/cover-not-rules.webp" alt="Not Rules EP" style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block", filter: "contrast(1.15)" }} />
          </div>
          <button
            type="button"
            onClick={() => playTrack(ORDER[0])}
            aria-label={playingFirst ? "Pausar Not Rules EP" : "Escuchar Not Rules EP"}
            aria-pressed={playingFirst}
            className="hv-sello"
            style={{ all: "unset", cursor: "pointer", position: "absolute", right: -18, bottom: -26, width: 128, height: 128, borderRadius: "50%", background: A, color: "#0A0A09", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: "rotate(12deg)", fontFamily: "'Anton',sans-serif", fontSize: 30, lineHeight: 0.9, textTransform: "uppercase", textAlign: "center", boxShadow: `0 0 0 3px #0A0A09,0 0 0 5px ${A}` }}
          >
            <span>{playingFirst ? "Pausa" : "Play"}</span>
            <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: ".14em", marginTop: 6 }}>Not Rules EP</span>
          </button>
          <div style={{ position: "absolute", left: -10, top: -18, background: "#F2EFE6", color: "#0A0A09", padding: "6px 10px", fontFamily: MONO, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", transform: "rotate(-5deg)" }}>Uriel Galeano — EP</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".16em", textTransform: "uppercase", marginBottom: 10 }}>Releases / click para escuchar</span>
          {ROWS.map((r) => {
            const on = isPlaying && index === ORDER[r.i];
            return (
              <button
                key={r.i}
                type="button"
                onClick={() => playTrack(ORDER[r.i])}
                aria-label={`${on ? "Pausar" : "Escuchar"} ${r.label}`}
                aria-pressed={on}
                className="hv-shift"
                style={{ all: "unset", cursor: "pointer", alignSelf: "flex-start", marginLeft: r.ml, display: "flex", alignItems: "flex-start", gap: 8 }}
              >
                <span style={{ background: r.paper ? "#F2EFE6" : A, color: "#0A0A09", fontFamily: r.font, fontWeight: r.doto ? 900 : undefined, fontSize: r.size, lineHeight: 1, padding: "2px 10px", textTransform: "uppercase" }}>{r.label}</span>
                <span style={{ fontFamily: MONO, fontSize: 12, border: `1px solid ${r.paper ? "#F2EFE6" : A}`, color: r.paper ? undefined : A, padding: "2px 6px" }}>{r.tag}</span>
              </button>
            );
          })}
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, marginTop: 22, paddingTop: 14, borderTop: "1px dashed rgba(242,239,230,.5)", fontFamily: MONO, fontSize: 13, letterSpacing: ".12em", textTransform: "uppercase" }}>
            <span>Uriel Galeano</span><span>×</span><span>Anguis</span>
          </div>
        </div>
      </div>
    </section>
  );
}
