import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";

const MONO = "'IBM Plex Mono',monospace";

/** Bloque negro para un archivo que todavía no existe (regla de la sección: nunca se inventa la imagen). */
export function Missing({ slug, style }: { slug: string; style?: CSSProperties }) {
  return (
    <div
      role="img"
      aria-label={`Falta archivo: ${slug}`}
      style={{ background: "#0A0A09", color: "#FF2B1C", display: "grid", placeItems: "center", textAlign: "center", padding: 16, fontFamily: MONO, fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", ...style }}
    >
      FALTA ARCHIVO: {slug}
    </div>
  );
}

/**
 * Imagen con efecto "fotocopia" al cambiar `src` (y al montar si `playOnMount`):
 * 1) una barra de luz crema de 6 px barre de arriba hacia abajo en 350 ms;
 * 2) detrás de la barra la foto nueva aparece primero en bitmap 1-bit (filtro #bitmap de SvgDefs);
 * 3) 200 ms después pasa a color con un fundido.
 * Con "reducir movimiento": solo un fundido de 150 ms.
 * El contenedor toma su tamaño de `style` / `className` (la imagen lo llena).
 */
export default function Photocopy({
  src,
  alt,
  slug,
  fit = "cover",
  playOnMount = false,
  className,
  style,
}: {
  src?: string;
  alt: string;
  slug: string;
  fit?: "cover" | "contain";
  playOnMount?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion();
  const [cur, setCur] = useState(src);
  const [prev, setPrev] = useState<string | undefined>();
  const played = useRef<string | undefined>(playOnMount ? undefined : src);
  const bit = useRef<HTMLImageElement>(null);
  const col = useRef<HTMLImageElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (src !== cur) {
      setPrev(cur);
      setCur(src);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  useLayoutEffect(() => {
    if (!cur || played.current === cur) return;
    played.current = cur;
    const c = col.current;
    if (!c) return;
    if (reduced) {
      c.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 150, fill: "both" }).onfinish = () => setPrev(undefined);
      return;
    }
    bit.current?.animate([{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0 0)" }], { duration: 350, easing: "linear", fill: "both" });
    bar.current?.animate([{ top: "0%", opacity: 1 }, { top: "100%", opacity: 1 }], { duration: 350, easing: "linear" });
    c.animate([{ opacity: 0 }, { opacity: 1 }], { delay: 550, duration: 300, fill: "both" }).onfinish = () => setPrev(undefined);
  }, [cur, reduced]);

  if (!cur) return <Missing slug={slug} style={style} />;

  const img: CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: fit, display: "block" };
  return (
    <div className={className} style={{ position: "relative", overflow: "hidden", background: "#0A0A09", ...style }}>
      {prev && <img src={prev} alt="" aria-hidden draggable={false} style={img} />}
      <img ref={bit} src={cur} alt="" aria-hidden draggable={false} style={{ ...img, filter: "url(#bitmap)" }} />
      <img ref={col} src={cur} alt={alt} draggable={false} decoding="async" style={img} />
      <div ref={bar} aria-hidden style={{ position: "absolute", left: 0, right: 0, top: 0, height: 6, marginTop: -3, background: "#F2EFE6", filter: "blur(2px)", boxShadow: "0 0 14px 4px rgba(242,239,230,.7)", opacity: 0, pointerEvents: "none" }} />
    </div>
  );
}
