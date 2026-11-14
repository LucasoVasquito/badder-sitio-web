import { Fragment, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import type { Product } from "@/data/products";
import { formatPrice, isForSale } from "@/lib/commerce";
import { useIsMobile } from "@/hooks/use-mobile";
import { FontCycleTitle, Marquee, Scanlines } from "@/components/flyer";
import Photocopy from "./Photocopy";
import { ThornBox } from "./Thorns";

const MONO = "'IBM Plex Mono',monospace";
const INK = "#0A0A09";
const PAPER = "#F2EFE6";
const RED = "#FF2B1C";
const SEPS = ["/", "★", "×"];

export const slugOf = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const priceText = (p: Product) => (isForSale(p) && p.price ? formatPrice(p.price) : "ARCHIVO");
const dropText = (p: Product) => (p.collection ? p.collection.name.toUpperCase() : "BADDER");

/** El escenario: foto real de la remera activa, marco negro con picos rojos, cinta y sticker de precio. Gira frente/espalda. */
function Stage({ p, flipped, onClick, playOnMount = false }: { p: Product; flipped: boolean; onClick: () => void; playOnMount?: boolean }) {
  const reduced = useReducedMotion();
  const slug = slugOf(p.name);
  const front = p.imageFront ?? p.images[0];
  const back = p.imageBack ?? p.images[1];
  const face = { position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" } as const;
  return (
    <div style={{ position: "relative", transform: "rotate(-2deg)", padding: "28px 8px 8px" }}>
      <ThornBox color={RED} id={`lu-${p.id}`} style={{ background: INK, border: `3px solid ${PAPER}`, padding: 10 }}>
        <button
          type="button"
          onClick={onClick}
          aria-label={`${p.name}: ${flipped ? "abrir producto" : "ver espalda"}`}
          style={{ all: "unset", cursor: "pointer", display: "block", position: "relative", width: "100%", aspectRatio: "4/5", perspective: 1400 }}
        >
          <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", transform: `rotateY(${flipped ? 180 : 0}deg)`, transition: reduced ? "none" : "transform .6s cubic-bezier(.2,.8,.2,1)" }}>
            <div style={face}>
              <Photocopy src={front} alt={`${p.name}, frente`} slug={`${slug}-frente`} playOnMount={playOnMount} style={{ position: "absolute", inset: 0 }} />
            </div>
            <div style={{ ...face, transform: "rotateY(180deg)" }}>
              <Photocopy src={back} alt={`${p.name}, espalda`} slug={`${slug}-espalda`} style={{ position: "absolute", inset: 0 }} />
            </div>
          </div>
        </button>
      </ThornBox>
      <span aria-hidden style={{ position: "absolute", top: 14, right: -6, width: 96, height: 24, background: "var(--tape)", transform: "rotate(38deg)", zIndex: 3 }} />
      <span
        aria-hidden
        style={{ position: "absolute", left: -10, bottom: 28, width: 92, height: 92, borderRadius: "9999px", background: RED, color: INK, border: `2px solid ${INK}`, display: "grid", placeItems: "center", textAlign: "center", fontFamily: "'Anton',sans-serif", fontSize: 20, lineHeight: 1, transform: "rotate(-8deg)", zIndex: 3, padding: 6 }}
      >
        {priceText(p)}
      </span>
    </div>
  );
}

/**
 * Remeras (v4): "Line-up". El catálogo es el cartel de una fiesta; cada remera es un artista.
 * Desktop: lista a la izquierda, escenario sticky a la derecha. Hover/foco la activa; click gira; segundo click abre.
 * Mobile (y táctil): el escenario se expande en línea bajo el nombre (acordeón). Tocar activa; tocar de nuevo abre.
 * Teclado: ↑ ↓ recorren, Enter abre.
 */
export default function LineUp({ items }: { items: Product[] }) {
  const navigate = useNavigate();
  const mobile = useIsMobile();
  const reduced = useReducedMotion();
  const sorted = useMemo(() => [...items].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)), [items]);
  const [active, setActive] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const pointer = useRef("mouse");
  const listRef = useRef<HTMLUListElement>(null);

  if (!sorted.length) return null;
  const open = (p: Product) => navigate(`/shop/${p.id}`);
  const activate = (i: number) => {
    if (i === active) return;
    setActive(i);
    setFlipped(false);
  };
  const touchLike = mobile || pointer.current !== "mouse";

  // Click/tap en un nombre
  const onName = (i: number) => {
    const p = sorted[i];
    if (touchLike) {
      if (i !== active) activate(i);
      else open(p);
      return;
    }
    activate(i);
    if (i === active && flipped) open(p);
    else setFlipped(true);
  };
  // Click/tap en la foto
  const onPhoto = (p: Product) => {
    if (flipped) open(p);
    else setFlipped(true);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const n = Math.max(0, Math.min(sorted.length - 1, active + (e.key === "ArrowDown" ? 1 : -1)));
      activate(n);
      listRef.current?.querySelectorAll<HTMLButtonElement>("button[data-name]")[n]?.focus();
    } else if (e.key === "Enter") {
      e.preventDefault();
      open(sorted[active]);
    }
  };

  const ticker = (
    <span style={{ fontFamily: "'Doto',monospace", fontWeight: 900, color: RED, fontSize: 22, letterSpacing: ".08em", textTransform: "uppercase", whiteSpace: "nowrap", paddingRight: 24 }}>
      {"BADDER SHOP / DROP 3 / LINE-UP / ".repeat(6)}
    </span>
  );

  return (
    <div style={{ position: "relative", background: INK, color: PAPER, overflow: "hidden", padding: "0 0 clamp(48px,6vw,96px)" }}>
      <Scanlines className="opacity-40" />
      <div aria-hidden style={{ margin: "28px -4% 0", transform: "rotate(-2deg)", background: INK, borderTop: `2px solid ${RED}`, borderBottom: `2px solid ${RED}`, overflow: "hidden", padding: "6px 0" }}>
        <Marquee speed={reduced ? 0 : 0.6}>{ticker}</Marquee>
      </div>

      <div style={{ position: "relative", padding: mobile ? "28px 16px 0" : "clamp(32px,4vw,64px) clamp(16px,3vw,40px) 0", maxWidth: 1440, margin: "0 auto" }}>
        <FontCycleTitle id="shop:lineup" font="seagram" className="text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9]">
          <span style={{ color: RED, display: "inline-block", transform: "rotate(-2deg)" }}>Line-up</span>
        </FontCycleTitle>
        <p style={{ margin: "10px 0 0", fontFamily: MONO, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(242,239,230,.7)" }}>
          {mobile ? "Tocá un nombre · tocá otra vez para abrirlo" : "Pasá por un nombre · click gira · click otra vez abre · ↑ ↓ Enter"}
        </p>

        <div style={{ display: mobile ? "block" : "grid", gridTemplateColumns: "60% 40%", gap: "clamp(24px,3vw,56px)", marginTop: mobile ? 20 : 36, alignItems: "start" }}>
          <ul
            ref={listRef}
            onKeyDown={onKeyDown}
            onPointerEnter={(e) => {
              pointer.current = e.pointerType;
              if (e.pointerType === "mouse") setEngaged(true);
            }}
            onPointerLeave={() => setEngaged(false)}
            onFocus={() => setEngaged(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setEngaged(false);
            }}
            style={{ listStyle: "none", margin: 0, padding: 0 }}
          >
            {sorted.map((p, i) => {
              const on = i === active;
              const y = mobile ? 0 : Math.max(72, 120 - i * 16);
              const fontSize = mobile ? "clamp(40px,14vw,64px)" : `clamp(${Math.round(y * 0.6)}px, ${(y / 14.4).toFixed(2)}vw, ${y}px)`;
              const outline = i % 2 === 1;
              const hot = on && (engaged || mobile);
              const color = hot ? RED : outline ? "transparent" : PAPER;
              return (
                <Fragment key={p.id}>
                  {i > 0 && (
                    <li aria-hidden style={{ color: RED, fontFamily: "'Anton',sans-serif", fontSize: mobile ? 22 : 30, lineHeight: 1, margin: mobile ? "2px 0" : "4px 0", paddingLeft: "6%" }}>
                      {SEPS[(i - 1) % SEPS.length]}
                    </li>
                  )}
                  <li style={{ opacity: engaged && !mobile && !on ? 0.35 : 1, transition: "opacity .25s" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
                      <button
                        type="button"
                        data-name
                        aria-current={on ? "true" : undefined}
                        onPointerDown={(e) => (pointer.current = e.pointerType)}
                        onPointerEnter={(e) => {
                          if (e.pointerType === "mouse" && !mobile) activate(i);
                        }}
                        onFocus={() => activate(i)}
                        onClick={() => onName(i)}
                        className="f-anton"
                        style={{
                          all: "unset",
                          cursor: "pointer",
                          minHeight: 44,
                          fontFamily: "'Anton',sans-serif",
                          textTransform: "uppercase",
                          fontSize,
                          lineHeight: 0.95,
                          color,
                          WebkitTextStroke: !hot && outline ? `2px ${PAPER}` : "0",
                          textShadow: hot ? "-3px 0 #00E5FF, 3px 0 #2B40FF" : "none",
                          transition: "color .2s",
                        }}
                      >
                        {p.name}
                      </button>
                      <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: ".12em", color: "rgba(242,239,230,.75)", whiteSpace: "nowrap" }}>
                        {dropText(p)} — {priceText(p)}
                      </span>
                    </div>

                    {mobile && on && (
                      <div style={{ maxWidth: 360, margin: "10px auto 18px" }}>
                        <Stage key={p.id} p={p} flipped={flipped} onClick={() => onPhoto(p)} playOnMount />
                      </div>
                    )}
                  </li>
                </Fragment>
              );
            })}
          </ul>

          {!mobile && (
            <div style={{ position: "sticky", top: 96 }}>
              <Stage p={sorted[active]} flipped={flipped} onClick={() => onPhoto(sorted[active])} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
