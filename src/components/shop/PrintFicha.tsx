import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "framer-motion";
import { PRINT_SIZES_CM, type PrintFrame, type PrintSize, type Product } from "@/data/products";
import { formatPrice, isForSale } from "@/lib/commerce";
import { useCartStore } from "@/store/cartStore";
import { contact } from "@/data/site";
import { FontCycleTitle } from "@/components/flyer";
import Photocopy from "./Photocopy";
import { slugOf } from "./LineUp";

const MONO = "'IBM Plex Mono',monospace";
const INK = "#0A0A09";
const PAPER = "#F2EFE6";
const RED = "#FF2B1C";
const LENS = 180;
const ZOOM = 2.5;
const VINYL_CM = 31; // LP de 12"

export const techniqueOf = (p: Product) => (p.printing && !/^todo/i.test(p.printing) ? p.printing : "técnica a confirmar");

const frameBox = (frame: PrintFrame) =>
  frame === "negro" ? { border: `14px solid #000`, outline: `2px solid ${PAPER}` } : frame === "blanco" ? { border: `14px solid ${PAPER}` } : {};

/** Comparación de escala real: A4, A3, 50×70 y un vinilo de 12" (31 cm), todo en contorno mono. El elegido va relleno de rojo. */
function ScaleCompare({ sizes, size }: { sizes: PrintSize[]; size: PrintSize }) {
  const gap = 6;
  const items: { key: string; w: number; h: number; vinyl?: boolean }[] = [
    ...sizes.map((s) => ({ key: s as string, w: PRINT_SIZES_CM[s][0], h: PRINT_SIZES_CM[s][1] })),
    { key: '12"', w: VINYL_CM, h: VINYL_CM, vinyl: true },
  ];
  const total = items.reduce((n, it) => n + it.w, 0) + gap * (items.length - 1);
  const H = Math.max(...items.map((i) => i.h));
  let x = 0;
  return (
    <svg viewBox={`0 0 ${total} ${H + 9}`} role="img" aria-label={`Comparación de escala: ${items.map((i) => i.key).join(", ")}. Vinilo de 12 pulgadas de 31 centímetros como referencia.`} style={{ width: "100%", display: "block" }}>
      {items.map((it) => {
        const cx = x;
        x += it.w + gap;
        const sel = it.key === size;
        const y = H - it.h;
        return (
          <g key={it.key}>
            {it.vinyl ? (
              <>
                <circle cx={cx + it.w / 2} cy={y + it.h / 2} r={it.w / 2 - 0.3} fill="none" stroke={PAPER} strokeWidth={0.5} strokeDasharray="1.6 1.2" />
                <circle cx={cx + it.w / 2} cy={y + it.h / 2} r={it.w / 2 - 0.3 - 11} fill="none" stroke={PAPER} strokeWidth={0.35} strokeDasharray="1.6 1.2" />
                <circle cx={cx + it.w / 2} cy={y + it.h / 2} r={1.6} fill="none" stroke={PAPER} strokeWidth={0.35} />
              </>
            ) : (
              <rect x={cx} y={y} width={it.w} height={it.h} fill={sel ? RED : "none"} stroke={sel ? RED : PAPER} strokeWidth={0.5} />
            )}
            <text x={cx + it.w / 2} y={H + 5} textAnchor="middle" fontFamily={MONO} fontSize={3.2} fill={sel ? RED : PAPER}>
              {it.key}
            </text>
            <text x={cx + it.w / 2} y={H + 8.6} textAnchor="middle" fontFamily={MONO} fontSize={2.4} fill={PAPER} opacity={0.6}>
              {it.vinyl ? "31 cm" : `${it.w}×${it.h}`}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const choice = (on: boolean): React.CSSProperties => ({
  all: "unset",
  cursor: "pointer",
  minHeight: 44,
  padding: "0 18px",
  display: "inline-flex",
  alignItems: "center",
  border: `2px solid ${PAPER}`,
  background: on ? RED : "transparent",
  color: on ? INK : PAPER,
  boxShadow: on ? `4px 4px 0 ${PAPER}` : "none",
  fontFamily: MONO,
  fontSize: 13,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  fontWeight: on ? 600 : 400,
});

function Ficha({ print, onClose }: { print: Product; onClose: () => void }) {
  const reduced = useReducedMotion();
  const sizes = print.sizes ?? ["A3"];
  const frames = print.frames ?? ["negro"];
  const [size, setSize] = useState<PrintSize>(sizes[0]);
  const [frame, setFrame] = useState<PrintFrame>(frames[0]);
  const [tab, setTab] = useState<"obra" | "pared">("obra");
  const [lens, setLens] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [zoom, setZoom] = useState({ s: 1, ox: 50, oy: 50 });
  const [msg, setMsg] = useState("");
  const [ratio, setRatio] = useState("1 / 1.414");
  const [closing, setClosing] = useState(false);

  // Proporción real de la imagen: así no se recorta y la lupa coincide con lo que está bajo el cursor.
  useEffect(() => {
    const s = print.images[0];
    if (!s) return;
    const im = new Image();
    im.onload = () => im.naturalWidth && setRatio(`${im.naturalWidth} / ${im.naturalHeight}`);
    im.src = s;
  }, [print]);
  const root = useRef<HTMLDivElement>(null);
  const sweep = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const pinch = useRef<{ d: number; s: number } | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  const price = print.sizePrices?.[size];
  const forSale = isForSale(print) && !!price;
  const [wcm, hcm] = PRINT_SIZES_CM[size];

  const close = () => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(onClose, reduced ? 150 : 260);
  };

  // Entrada: barrido de fotocopia sobre toda la ficha. Escape cierra. Se bloquea el scroll de fondo.
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    if (reduced) root.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 150 });
    else {
      root.current?.animate([{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0 0)" }], { duration: 350, easing: "linear" });
      sweep.current?.animate([{ top: "0%", opacity: 1 }, { top: "100%", opacity: 1 }], { duration: 350, easing: "linear" });
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    setLens({ x: e.clientX - r.left, y: e.clientY - r.top, w: r.width, h: r.height });
  };

  // Pinch-zoom (táctil): dos dedos escalan la imagen de 1× a 4×.
  const dist = (t: React.TouchList) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const r = e.currentTarget.getBoundingClientRect();
      const cx = ((e.touches[0].clientX + e.touches[1].clientX) / 2 - r.left) / r.width;
      const cy = ((e.touches[0].clientY + e.touches[1].clientY) / 2 - r.top) / r.height;
      pinch.current = { d: dist(e.touches), s: zoom.s };
      setZoom((z) => ({ ...z, ox: cx * 100, oy: cy * 100 }));
    }
  };
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && pinch.current) {
      const s = Math.min(4, Math.max(1, (pinch.current.s * dist(e.touches)) / pinch.current.d));
      setZoom((z) => ({ ...z, s }));
    }
  };
  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length < 2) {
      pinch.current = null;
      setZoom((z) => (z.s < 1.08 ? { s: 1, ox: 50, oy: 50 } : z));
    }
  };

  const add = () => {
    if (!forSale) return;
    const r = addItem(print.id);
    setMsg(r.ok ? "Agregado al carrito." : r.reason ?? "No se pudo agregar.");
  };

  const slug = slugOf(print.name);
  const src = print.images[0];
  const row: React.CSSProperties = { display: "flex", justifyContent: "space-between", gap: 16, padding: "10px 0", borderTop: `2px solid ${PAPER}`, fontFamily: MONO, fontSize: 13, letterSpacing: ".06em", textTransform: "uppercase" };

  return createPortal(
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={`Ficha: ${print.name}`}
      style={{ position: "fixed", inset: 0, zIndex: 200, background: INK, color: PAPER, overflowY: "auto", opacity: closing ? 0 : 1, transition: `opacity ${reduced ? 0.15 : 0.26}s` }}
    >
      <div ref={sweep} aria-hidden style={{ position: "fixed", left: 0, right: 0, top: 0, height: 6, marginTop: -3, background: PAPER, filter: "blur(2px)", boxShadow: "0 0 14px 4px rgba(242,239,230,.7)", opacity: 0, pointerEvents: "none", zIndex: 2 }} />
      <button ref={closeBtn} type="button" onClick={close} aria-label="Cerrar ficha" style={{ all: "unset", cursor: "pointer", position: "fixed", right: 16, top: 12, width: 48, height: 48, display: "grid", placeItems: "center", fontFamily: MONO, fontSize: 28, color: PAPER, zIndex: 3 }}>
        ×
      </button>

      <div className="grid md:grid-cols-2" style={{ gap: "clamp(24px,4vw,64px)", padding: "clamp(56px,6vw,72px) clamp(16px,4vw,56px) 56px", maxWidth: 1400, margin: "0 auto", alignItems: "start" }}>
        {/* Izquierda: el cuadro */}
        <div>
          {print.imageInSitu && (
            <div role="tablist" style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              <button role="tab" aria-selected={tab === "obra"} type="button" onClick={() => setTab("obra")} style={choice(tab === "obra")}>
                Cuadro
              </button>
              <button role="tab" aria-selected={tab === "pared"} type="button" onClick={() => setTab("pared")} style={choice(tab === "pared")}>
                Visto en la pared
              </button>
            </div>
          )}

          {tab === "pared" && print.imageInSitu ? (
            <Photocopy src={print.imageInSitu} alt={`${print.name} colgado`} slug={`${slug}-in-situ`} playOnMount style={{ width: "100%", aspectRatio: "4/5" }} />
          ) : (
            <div style={{ position: "relative", width: "min(100%, 560px)", margin: "0 auto", ...frameBox(frame), background: INK }}>
             {/* La lupa se mide sobre la imagen (sin el marco) y respeta su proporción real, sin recortes. */}
             <div
              onPointerMove={onMove}
              onPointerLeave={() => setLens(null)}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              style={{ position: "relative", touchAction: "pan-y", cursor: "crosshair", overflow: "hidden" }}
             >
              <div style={{ transform: `scale(${zoom.s})`, transformOrigin: `${zoom.ox}% ${zoom.oy}%`, transition: pinch.current ? "none" : "transform .2s" }}>
                <Photocopy src={src} alt={print.name} slug={slug} playOnMount style={{ width: "100%", aspectRatio: ratio }} />
              </div>
              {lens && src && (
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: lens.x - LENS / 2,
                    top: lens.y - LENS / 2,
                    width: LENS,
                    height: LENS,
                    borderRadius: "9999px",
                    border: `3px solid ${RED}`,
                    backgroundColor: INK,
                    backgroundImage: `url("${src}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: `${lens.w * ZOOM}px ${lens.h * ZOOM}px`,
                    backgroundPosition: `${LENS / 2 - lens.x * ZOOM}px ${LENS / 2 - lens.y * ZOOM}px`,
                    pointerEvents: "none",
                  }}
                />
              )}
             </div>
            </div>
          )}
          <p style={{ margin: "12px 0 0", textAlign: "center", fontFamily: MONO, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(242,239,230,.6)" }}>
            <span className="hidden md:inline">Lupa 2.5× con el cursor</span>
            <span className="md:hidden">Pellizcá para ampliar</span>
          </p>
        </div>

        {/* Derecha: ficha técnica */}
        <div>
          <FontCycleTitle id={`print:${print.id}`} font="anton" className="text-[clamp(2.75rem,7vw,6rem)] leading-[0.9]">
            {print.name}
          </FontCycleTitle>
          <p className="f-news" style={{ fontStyle: "italic", fontSize: 20, lineHeight: 1.5, margin: "14px 0 22px", maxWidth: "46ch", color: "rgba(242,239,230,.85)" }}>
            {print.collection ? `Afiche de ${print.collection.name} (${print.collection.season}).` : "Afiche BADDER."} {print.todo ? "Datos de impresión a confirmar." : ""}
          </p>

          <div style={{ marginBottom: 24 }}>
            <div style={row}><span>Temporada</span><span>{print.collection?.season ?? "a confirmar"}</span></div>
            <div style={row}><span>Técnica</span><span>{techniqueOf(print)}</span></div>
            <div style={row}><span>Medida</span><span>{size} · {wcm}×{hcm} cm</span></div>
            <div style={row}><span>Marco</span><span>{frame}</span></div>
            {print.credits && <div style={row}><span>Diseño</span><span>{print.credits}</span></div>}
            <div style={{ ...row, borderBottom: `2px solid ${PAPER}` }}><span>Colección</span><span>{print.collection?.name ?? "BADDER"}</span></div>
          </div>

          <div role="group" aria-label="Marco" style={{ marginBottom: 18 }}>
            <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 8 }}>Marco</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {frames.map((f) => (
                <button key={f} type="button" aria-pressed={frame === f} onClick={() => setFrame(f)} style={choice(frame === f)}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div role="group" aria-label="Medida" style={{ marginBottom: 14 }}>
            <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 8 }}>Medida</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {sizes.map((s) => (
                <button key={s} type="button" aria-pressed={size === s} onClick={() => setSize(s)} style={choice(size === s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <ScaleCompare sizes={sizes} size={size} />

          <div style={{ fontFamily: "'Anton',sans-serif", fontSize: "clamp(3rem,6vw,5rem)", lineHeight: 1, color: RED, margin: "22px 0 14px", textTransform: "uppercase" }}>{price ? formatPrice(price) : "Consultar"}</div>

          {forSale ? (
            <button type="button" onClick={add} style={{ all: "unset", cursor: "pointer", boxSizing: "border-box", width: "100%", minHeight: 56, display: "grid", placeItems: "center", background: RED, color: INK, fontFamily: "'Anton',sans-serif", fontSize: 26, textTransform: "uppercase" }}>
              Agregar
            </button>
          ) : (
            <a href={contact.instagramUrl} target="_blank" rel="noreferrer" style={{ boxSizing: "border-box", width: "100%", minHeight: 56, display: "grid", placeItems: "center", background: RED, color: INK, fontFamily: "'Anton',sans-serif", fontSize: 26, textTransform: "uppercase" }}>
              Consultar por Instagram
            </a>
          )}
          <p role="status" style={{ margin: "10px 0 0", minHeight: 22, fontFamily: MONO, fontSize: 13 }}>{msg}</p>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function PrintFicha({ print, onClose }: { print: Product | null; onClose: () => void }) {
  return print ? <Ficha key={print.id} print={print} onClose={onClose} /> : null;
}
