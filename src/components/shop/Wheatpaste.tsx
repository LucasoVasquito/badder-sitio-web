import { useRef, useState } from "react";
import { PRINT_SIZES_CM, type Product } from "@/data/products";
import { formatPrice } from "@/lib/commerce";
import { useIsMobile } from "@/hooks/use-mobile";
import { Checker, FontCycleTitle, Halftone } from "@/components/flyer";
import Photocopy from "./Photocopy";
import PrintFicha, { techniqueOf } from "./PrintFicha";
import { ThornBox } from "./Thorns";
import { slugOf } from "./LineUp";

const MONO = "'IBM Plex Mono',monospace";
const INK = "#0A0A09";
const PAPER = "#F2EFE6";
const RED = "#FF2B1C";
const PX_PER_CM = 8; // 50×70 ≈ 400 px, A3 ≈ 238 px, A4 ≈ 168 px

// Cuadros pegados: rotación (−4°…4°), caída vertical, solape con el vecino y profundidad de parallax (±8 px).
const HANG = [
  { rot: -3, dy: 30, ml: 0, depth: 14, tape: [-6, 10] },
  { rot: 2, dy: -6, ml: -28, depth: -12, tape: [5, -8] },
  { rot: -1.5, dy: 70, ml: -18, depth: 16, tape: [-3, 6] },
  { rot: 4, dy: 12, ml: -30, depth: -16, tape: [7, -4] },
  { rot: -4, dy: 54, ml: -22, depth: 10, tape: [-5, 8] },
  { rot: 1, dy: 0, ml: -26, depth: -10, tape: [4, -6] },
] as const;

// Restos de afiches arrancados: recortes irregulares de los propios cuadros, en bitmap a baja opacidad.
const SCRAPS = [
  { left: "-3%", top: "4%", w: "34%", rot: -6, clip: "polygon(4% 0,96% 6%,100% 38%,91% 100%,48% 94%,0 100%,6% 52%)" },
  { left: "62%", top: "2%", w: "30%", rot: 5, clip: "polygon(0 8%,38% 0,100% 12%,94% 62%,100% 100%,22% 92%,8% 54%)" },
  { left: "30%", top: "46%", w: "28%", rot: 3, clip: "polygon(10% 0,100% 4%,92% 48%,100% 96%,40% 100%,0 86%,6% 30%)" },
  { left: "70%", top: "58%", w: "32%", rot: -4, clip: "polygon(0 0,86% 8%,100% 30%,90% 100%,18% 90%,6% 44%)" },
] as const;

const priceFor = (p: Product, size: keyof typeof PRINT_SIZES_CM) => {
  const v = p.sizePrices?.[size];
  return v ? formatPrice(v) : "CONSULTAR";
};

function Cartela({ p, rot }: { p: Product; rot: number }) {
  const size = p.sizes?.[0] ?? "A3";
  const [w, h] = PRINT_SIZES_CM[size];
  return (
    <div style={{ position: "relative", zIndex: 3, transform: `rotate(${-rot * 1.6}deg)`, background: INK, color: PAPER, padding: "12px 16px 12px", marginTop: -16, marginLeft: 14, marginRight: 14 }}>
      <div style={{ fontFamily: "'Roboto Condensed Bold',sans-serif", fontSize: 30, lineHeight: 1, textTransform: "uppercase" }}>{p.name}</div>
      <div style={{ marginTop: 6, fontFamily: MONO, fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase" }}>
        {p.collection?.season ?? "—"} · {techniqueOf(p)} · {size} {w}×{h}
      </div>
      <span style={{ position: "absolute", right: -8, top: -14, background: RED, color: INK, fontFamily: MONO, fontSize: 11, fontWeight: 600, letterSpacing: ".1em", padding: "4px 8px", transform: "rotate(5deg)" }}>{priceFor(p, size)}</span>
    </div>
  );
}

/**
 * Cuadros (v4): "Wheatpaste". Afiches pegados en una pared de papel, con restos de afiches viejos detrás.
 * Hover/tap endereza el cuadro (sombra dura) y pasa a bitmap a los demás. Click abre la FICHA a pantalla completa.
 * Mobile: una columna, uno por pantalla; el primer toque abre directo.
 */
export default function Wheatpaste({ prints }: { prints: Product[] }) {
  const mobile = useIsMobile();
  const [hover, setHover] = useState<number | null>(null);
  const [open, setOpen] = useState<Product | null>(null);
  const pointer = useRef("mouse");

  if (!prints.length) return null;
  const onActivate = (p: Product) => {
    // Táctil en pantalla ancha: el primer toque endereza, el segundo abre. En mobile se abre directo.
    if (!mobile && pointer.current !== "mouse" && hover !== p.id) {
      setHover(p.id);
      return;
    }
    setOpen(p);
  };

  return (
    <div style={{ position: "relative", overflow: "hidden", background: PAPER, color: INK, padding: mobile ? "56px 16px 120px" : "clamp(90px,8vw,130px) clamp(16px,3vw,40px) 170px" }}>
      {/* Restos de afiches viejos */}
      {SCRAPS.map((s, i) => (
        <img
          key={i}
          aria-hidden
          alt=""
          src={prints[i % prints.length].images[0]}
          loading="lazy"
          decoding="async"
          style={{ position: "absolute", left: s.left, top: s.top, width: s.w, opacity: 0.12, filter: "url(#bitmap)", transform: `rotate(${s.rot}deg)`, clipPath: s.clip, pointerEvents: "none" }}
        />
      ))}
      <Halftone color={INK} size={8} opacity={0.35} style={{ WebkitMaskImage: "radial-gradient(ellipse at 100% 0%, #000 0%, transparent 60%)", maskImage: "radial-gradient(ellipse at 100% 0%, #000 0%, transparent 60%)" }} />
      <div aria-hidden style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 72, overflow: "hidden" }}>
        <Checker size={36} />
      </div>

      {/* Título montado sobre el primer cuadro */}
      <div style={{ position: "relative", zIndex: 6, transform: "rotate(-4deg)", transformOrigin: "left bottom", marginBottom: mobile ? -18 : -34, color: RED, maxWidth: 1440, marginLeft: "auto", marginRight: "auto", pointerEvents: "none" }}>
        <FontCycleTitle id="shop:wheatpaste" font="seagram" className="text-[clamp(3rem,9vw,7.5rem)] leading-[0.9]">
          <span style={{ pointerEvents: "auto" }}>Cuadros</span>
        </FontCycleTitle>
      </div>

      <ul
        onPointerLeave={() => setHover(null)}
        style={{ position: "relative", listStyle: "none", margin: "0 auto", padding: 0, maxWidth: 1440, display: "flex", flexDirection: mobile ? "column" : "row", flexWrap: "wrap", justifyContent: "center", alignItems: mobile ? "center" : "flex-start", rowGap: mobile ? 56 : 90 }}
      >
        {prints.map((p, i) => {
          const h = HANG[i % HANG.length];
          const size = p.sizes?.[0] ?? "A3";
          const [wcm] = PRINT_SIZES_CM[size];
          const w = mobile ? "min(78vw,340px)" : Math.round(wcm * PX_PER_CM);
          const on = hover === p.id;
          const dim = hover !== null && !on;
          const rot = mobile ? h.rot * 0.7 : h.rot;
          return (
            <li key={p.id} data-depth={mobile ? undefined : h.depth} style={{ position: "relative", marginLeft: mobile || i === 0 ? 0 : h.ml, marginTop: mobile ? 0 : h.dy, zIndex: on ? 5 : 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <button
                type="button"
                aria-label={`${p.name}: abrir ficha`}
                onPointerDown={(e) => (pointer.current = e.pointerType)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setHover(p.id)}
                onFocus={() => setHover(p.id)}
                onBlur={() => setHover(null)}
                onClick={() => onActivate(p)}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  position: "relative",
                  display: "block",
                  width: w,
                  transform: on ? "rotate(0deg) translateY(-8px)" : `rotate(${rot}deg)`,
                  boxShadow: on ? `10px 10px 0 ${INK}` : "none",
                  transition: "transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s",
                }}
              >
                <ThornBox color={INK} id={`wp-${p.id}`} style={{ background: INK, padding: 14 }}>
                  <div style={{ filter: dim ? "url(#bitmap)" : "none" }}>
                    <Photocopy src={p.images[0]} alt={p.name} slug={slugOf(p.name)} style={{ width: "100%", aspectRatio: "1/1.414" }} />
                  </div>
                </ThornBox>
                <span aria-hidden style={{ position: "absolute", top: -12, left: "12%", width: 78, height: 24, background: "var(--tape)", transform: `rotate(${h.tape[0]}deg)`, zIndex: 2 }} />
                <span aria-hidden style={{ position: "absolute", bottom: 10, right: -16, width: 70, height: 22, background: "var(--tape)", transform: `rotate(${h.tape[1]}deg)`, zIndex: 2 }} />
              </button>
              <div style={{ width: mobile ? w : `max(${typeof w === "number" ? w : 0}px, 220px)`, transform: `rotate(${-rot * 0.4}deg)` }}>
                <Cartela p={p} rot={rot} />
              </div>
            </li>
          );
        })}
      </ul>

      <PrintFicha print={open} onClose={() => setOpen(null)} />
    </div>
  );
}
