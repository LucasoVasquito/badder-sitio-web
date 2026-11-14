import { motionProjects } from "@/data/visuals";
import { useFontCycle } from "./useFontCycle";

const MONO = "'IBM Plex Mono',monospace";
const link = (id: number) => motionProjects.find((m) => m.id === id)?.link ?? "https://www.youtube.com/@badder.experience";
const card = { display: "flex", flexDirection: "column" as const, gap: 10, background: "rgba(10,10,9,.7)", padding: 10, border: "1px solid rgba(242,239,230,.4)" };
const kicker = { fontFamily: MONO, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase" as const };
const name = { fontFamily: "'Newsreader',serif", fontSize: 22, lineHeight: 1.15 };

// 05 Badder in Motion — tal cual la maqueta. Las tarjetas abren el video real (YouTube) de src/data/visuals.ts.
export default function InMotion() {
  const title = useFontCycle("motion");
  const cards = [
    { href: link(3), img: "/img/p-emergent.webp", k: "Motion · 2024", t: "Emergent x Badder — Teaser" },
    { href: link(7), img: "/img/p-rosset.webp", k: "Motion · 2025", t: "Badder Showcase — Rosset Club" },
    { href: link(12), img: "/img/p-verano2025.webp", k: "Visualizer · 2024", t: "You Look At Me (Original Mix) — Visual concept" },
  ];
  return (
    <section data-screen-label="05 Badder in Motion" style={{ position: "relative", minHeight: "90svh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "clamp(60px,8vw,120px) clamp(16px,3vw,40px)" }}>
      <img data-depth="-18" src="/img/p-flash.webp" width={720} height={480} alt="" aria-hidden loading="lazy" style={{ position: "absolute", inset: "-6%", width: "112%", height: "112%", objectFit: "cover", filter: "blur(10px) saturate(1.4) contrast(1.2)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(10,10,9,.2),rgba(10,10,9,.85))" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg,rgba(0,0,0,.45) 0 2px,transparent 2px 4px)", mixBlendMode: "multiply" }} />
      <h2 {...title.bind} style={{ position: "relative", margin: "0 0 clamp(28px,4vw,56px)", cursor: "pointer", fontFamily: title.fontFamily, fontWeight: 400, fontSize: "clamp(46px,8.4vw,150px)", lineHeight: 0.9, textTransform: "uppercase", color: "#F2EFE6", mixBlendMode: "difference", filter: "url(#warp)" }}>
        <span style={{ display: "block" }}>Badder</span>
        <span style={{ display: "block", paddingLeft: "clamp(30px,20vw,380px)" }}>in motion</span>
      </h2>
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", gap: 20 }}>
        {cards.map((c) => (
          <a key={c.t} href={c.href} target="_blank" rel="noopener noreferrer" className="hv-motion" style={card}>
            <div style={{ aspectRatio: "16/9", overflow: "hidden" }}><img src={c.img} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /></div>
            <span style={kicker}>{c.k}</span>
            <span style={name}>{c.t}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
