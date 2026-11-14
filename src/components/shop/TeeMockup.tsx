import { useId } from "react";

/**
 * Prenda dibujada en SVG con la gráfica real estampada.
 * Provisorio (TODO): se reemplaza por el PNG recortado (imageFront / imageBack) cuando exista.
 * viewBox 400×440: el cuello queda en (200, 30), donde cuelga la percha.
 */
const TEE =
  "M138 30 Q200 82 262 30 L330 54 Q362 92 396 136 L344 172 L316 146 L318 428 Q200 438 82 428 L84 146 L56 172 L4 136 Q38 92 70 54 Z";
const LONG =
  "M138 30 Q200 82 262 30 L330 54 Q350 140 372 330 L384 404 L338 412 L314 252 L318 428 Q200 438 82 428 L86 252 L62 412 L16 404 L28 330 Q50 140 70 54 Z";

const isLight = (hex: string) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return ((n >> 16) & 255) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114 > 150;
};

export default function TeeMockup({
  fabric,
  garment = "tee",
  print,
  side = "front",
  className,
  style,
}: {
  fabric: string;
  garment?: "tee" | "longsleeve";
  print?: string;
  side?: "front" | "back";
  className?: string;
  style?: React.CSSProperties;
}) {
  const uid = useId().replace(/:/g, "");
  const path = garment === "longsleeve" ? LONG : TEE;
  const light = isLight(fabric);
  const line = light ? "rgba(10,10,9,.18)" : "rgba(242,239,230,.14)";
  // Frente: estampa en el pecho. Espalda: estampa grande centrada.
  const box = side === "front" ? { x: 128, y: 104, w: 144, h: 150 } : { x: 104, y: 92, w: 192, h: 230 };

  return (
    <svg viewBox="0 0 400 440" className={className} style={style} aria-hidden>
      <defs>
        <clipPath id={`c${uid}`}>
          <path d={path} />
        </clipPath>
        <linearGradient id={`s${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".28" />
          <stop offset=".22" stopColor="#000" stopOpacity="0" />
          <stop offset=".78" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".3" />
        </linearGradient>
      </defs>
      <path d={path} fill={fabric} />
      <g clipPath={`url(#c${uid})`}>
        {print && (
          <image
            href={print}
            x={box.x}
            y={box.y}
            width={box.w}
            height={box.h}
            preserveAspectRatio="xMidYMin meet"
            style={{ mixBlendMode: light ? "multiply" : "normal" }}
          />
        )}
        {/* Arrugas de tela y sombra lateral */}
        <path d="M110 300 Q150 320 140 380 M290 280 Q262 330 280 400 M180 404 Q200 380 230 410" stroke={line} strokeWidth="3" fill="none" />
        <rect x="0" y="0" width="400" height="440" fill={`url(#s${uid})`} />
      </g>
      {/* Cuello: delantero escotado, espalda recto */}
      {side === "front" ? (
        <path d="M138 30 Q200 82 262 30" stroke={light ? "rgba(10,10,9,.35)" : "rgba(242,239,230,.3)"} strokeWidth="7" fill="none" />
      ) : (
        <path d="M138 30 Q200 46 262 30" stroke={light ? "rgba(10,10,9,.35)" : "rgba(242,239,230,.3)"} strokeWidth="7" fill="none" />
      )}
    </svg>
  );
}
