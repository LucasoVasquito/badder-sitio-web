import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { studioAreas } from "@/data/studio";
import { useFontCycle } from "./useFontCycle";

const MONO = "'IBM Plex Mono',monospace";
const INK = "#0A0A09";
const PAPER = "#F2EFE6";
const TAPE = "rgba(214,206,180,.85)";

/**
 * Imagen de trabajo por servicio (de public/). null = TODO: falta una imagen propia del servicio.
 * Los servicios salen de src/data/studio.ts (solo los confirmados).
 */
const WORK: Record<string, string | null> = {
  mixing: "/img/cover-not-rules.webp",
  mastering: "/img/cover-beeacks.webp",
  "dj-set-recording": "/img/p-emergent.webp",
  "music-production": "/img/cover-club-motion.webp",
  photography: "/img/p-capital.webp",
  "event-coverage": "/img/p-rosset.webp",
  "video-editing": "/img/p-verano2025.webp",
  motion: "/img/p-flash.webp",
  flyers: "/img/f-4.webp",
  presskits: "/_thumbs/presskits/presskit (1).png",
  identity: "/img/p-drop3.webp",
  web: null, // TODO: captura del sitio o de un proyecto web
};

const services = studioAreas.flatMap((a) => a.services.filter((s) => s.confirmed).map((s) => ({ ...s, area: a.title })));

// 03 Studio — sección nueva (v3). Menú de flyer con los servicios reales; al pasar (o tocar) un servicio aparece
// una imagen de trabajo pegada con cinta que sigue levemente al cursor. Fondo acento A (alternancia de la home).
export default function StudioSection() {
  const title = useFontCycle("studio");
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lastPointer = useRef("mouse");
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 22 });
  const sy = useSpring(y, { stiffness: 160, damping: 22 });

  const place = (clientX: number, clientY: number) => {
    const r = listRef.current?.getBoundingClientRect();
    if (!r) return;
    x.set(clientX - r.left);
    y.set(clientY - r.top);
  };
  const placeAtRow = (el: HTMLElement) => {
    const r = listRef.current?.getBoundingClientRect();
    const e = el.getBoundingClientRect();
    if (!r) return;
    x.set(Math.min(e.right - r.left - 90, r.width - 120));
    y.set(e.top - r.top + e.height / 2);
  };

  const current = services.find((s) => s.id === active);
  const img = current ? WORK[current.id] : null;
  const rot = current ? ((services.indexOf(current) % 3) - 1) * 4 : 0;

  return (
    <section id="studio" data-screen-label="03 Studio" style={{ position: "relative", overflow: "hidden", background: "var(--a-c,#FF2B1C)", color: INK, padding: "clamp(60px,8vw,120px) clamp(16px,3vw,40px)" }}>
      {/* Halftone en una esquina */}
      <div aria-hidden style={{ position: "absolute", left: "-8%", bottom: "-12%", width: "60%", height: "70%", backgroundImage: `radial-gradient(${INK} 1.2px,transparent 1.8px)`, backgroundSize: "8px 8px", WebkitMaskImage: "radial-gradient(circle at 20% 80%,#000 0,transparent 65%)", maskImage: "radial-gradient(circle at 20% 80%,#000 0,transparent 65%)", opacity: 0.5 }} />

      <div style={{ position: "relative", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
        <h2 {...title.bind} style={{ margin: 0, cursor: "pointer", fontFamily: title.fontFamily, fontWeight: 400, fontSize: "clamp(64px,12vw,210px)", lineHeight: 0.85, textTransform: "uppercase", color: PAPER, textShadow: `6px 6px 0 ${INK}`, transform: "rotate(-2deg)", transformOrigin: "left bottom" }}>Studio</h2>
        <p style={{ margin: 0, maxWidth: "34ch", fontFamily: "'Newsreader',serif", fontStyle: "italic", fontSize: "clamp(20px,1.8vw,26px)", lineHeight: 1.3, textWrap: "pretty" }}>
          Sonido, imagen y diseño para artistas, sellos y proyectos: lo mismo que hacemos para BADDER.
        </p>
      </div>

      <div
        ref={listRef}
        onPointerMove={(e) => e.pointerType === "mouse" && place(e.clientX, e.clientY)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
        style={{ position: "relative", marginTop: "clamp(36px,5vw,64px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", columnGap: "clamp(24px,4vw,64px)", borderTop: `3px solid ${INK}` }}
      >
        {services.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className="hv-svc"
            aria-pressed={active === s.id}
            aria-label={`${s.name}: ${s.brief}`}
            onPointerEnter={(e) => e.pointerType === "mouse" && setActive(s.id)}
            onFocus={(e) => {
              // Solo foco de teclado: el tap también enfoca en Android y ya lo resuelve onClick.
              if (!e.currentTarget.matches(":focus-visible")) return;
              setActive(s.id);
              placeAtRow(e.currentTarget);
            }}
            onPointerDown={(e) => (lastPointer.current = e.pointerType)}
            onClick={(e) => {
              // Táctil: tocar activa, tocar de nuevo desactiva. (Safari iOS no expone pointerType en el click.)
              if (lastPointer.current !== "mouse") {
                setActive((a) => (a === s.id ? null : s.id));
                placeAtRow(e.currentTarget);
              }
            }}
            style={{ all: "unset", cursor: "pointer", display: "grid", gridTemplateColumns: "auto 1fr", columnGap: 14, alignItems: "baseline", padding: "14px 0", minHeight: 44, borderBottom: `1px solid ${INK}`, transition: "transform .15s" }}
          >
            <span style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".1em" }}>{String(i + 1).padStart(2, "0")}</span>
            <span>
              <span className="hv-svc-name" style={{ display: "block", fontFamily: "'Anton',sans-serif", fontSize: "clamp(26px,2.6vw,40px)", lineHeight: 1, textTransform: "uppercase", color: active === s.id ? PAPER : INK }}>{s.name}</span>
              <span style={{ display: "block", marginTop: 4, fontFamily: "'Newsreader',serif", fontStyle: "italic", fontSize: 18, lineHeight: 1.3 }}>{s.brief}</span>
            </span>
          </button>
        ))}

        {/* Imagen de trabajo pegada con cinta */}
        <motion.div aria-hidden style={{ position: "absolute", left: 0, top: 0, x: sx, y: sy, pointerEvents: "none", zIndex: 4 }}>
          <AnimatePresence>
            {current && (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.85, rotate: rot - 6 }}
                animate={{ opacity: 1, scale: 1, rotate: rot }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                style={{ position: "absolute", left: 24, top: -110, width: "clamp(150px,18vw,240px)", background: PAPER, padding: 8, boxShadow: `6px 6px 0 ${INK}` }}
              >
                <div style={{ position: "absolute", left: "30%", top: -12, width: 80, height: 22, background: TAPE, transform: "rotate(-4deg)" }} />
                {img ? (
                  <img src={img} alt="" decoding="async" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" }} />
                ) : (
                  <div style={{ aspectRatio: "4/5", display: "flex", alignItems: "center", justifyContent: "center", background: INK, color: PAPER, fontFamily: MONO, fontSize: 12, letterSpacing: ".12em", textAlign: "center", padding: 12 }}>TODO: imagen de {current.name}</div>
                )}
                <span style={{ display: "block", marginTop: 6, fontFamily: MONO, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase" }}>{current.area}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div style={{ position: "relative", display: "flex", justifyContent: "flex-end", marginTop: "clamp(40px,5vw,72px)" }}>
        <Link
          to="/studio"
          className="hv-sello"
          aria-label="Ir a Studio"
          style={{ width: "clamp(150px,16vw,190px)", aspectRatio: "1/1", borderRadius: "50%", background: PAPER, color: INK, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Anton',sans-serif", fontSize: "clamp(30px,3vw,40px)", textTransform: "uppercase", transform: "rotate(-10deg)", boxShadow: `6px 6px 0 ${INK}`, border: `3px solid ${INK}` }}
        >
          Studio →
        </Link>
      </div>
    </section>
  );
}
