import type { CSSProperties, ReactNode } from "react";

const deco = "absolute inset-0 pointer-events-none";

/** Semitono: puntos que se desvanecen con una máscara radial. */
export function Halftone({ color = "hsl(var(--paper))", size = 7, opacity = 0.35, className = "", style }: { color?: string; size?: number; opacity?: number; className?: string; style?: CSSProperties }) {
  const mask = "radial-gradient(ellipse at 30% 40%, #000 0%, transparent 72%)";
  return (
    <div
      aria-hidden
      className={`${deco} ${className}`}
      style={{
        backgroundImage: `radial-gradient(${color} 1.1px, transparent 1.7px)`,
        backgroundSize: `${size}px ${size}px`,
        opacity,
        WebkitMaskImage: mask,
        maskImage: mask,
        ...style,
      }}
    />
  );
}

/** Damero oscuro. */
export function Checker({ size = 96, className = "" }: { size?: number; className?: string }) {
  return <div aria-hidden className={`${deco} ${className}`} style={{ background: "repeating-conic-gradient(#141413 0 25%, #1f1f1d 0 50%)", backgroundSize: `${size}px ${size}px` }} />;
}

/** Op-art: anillos concéntricos en --a, enmascarados. */
export function OpArt({ className = "", style }: { className?: string; style?: CSSProperties }) {
  const mask = "radial-gradient(circle at 60% 50%, #000 0%, #000 35%, transparent 75%)";
  return (
    <div
      aria-hidden
      className={`${deco} ${className}`}
      style={{ backgroundImage: "repeating-radial-gradient(circle at 60% 50%, hsl(var(--a)) 0 9px, hsl(var(--ink)) 9px 22px)", WebkitMaskImage: mask, maskImage: mask, ...style }}
    />
  );
}

/** Líneas de barrido. */
export function Scanlines({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`${deco} ${className}`} style={{ background: "repeating-linear-gradient(0deg, rgba(0,0,0,.45) 0 2px, transparent 2px 4px)" }} />;
}

/** Marco de espinas: 4 tiras SVG alrededor del contenido. */
export function ThornFrame({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const strip = "absolute pointer-events-none";
  return (
    <div className={`relative p-[22px] ${className}`} style={style}>
      <svg aria-hidden className={`${strip} top-0 left-0 w-full h-[22px]`}><rect width="100%" height="22" fill="url(#thornH)" /></svg>
      <svg aria-hidden className={`${strip} bottom-0 left-0 w-full h-[22px]`} style={{ transform: "scaleY(-1)" }}><rect width="100%" height="22" fill="url(#thornH)" /></svg>
      <svg aria-hidden className={`${strip} top-0 left-0 h-full w-[22px]`}><rect width="22" height="100%" fill="url(#thornV)" /></svg>
      <svg aria-hidden className={`${strip} top-0 right-0 h-full w-[22px]`} style={{ transform: "scaleX(-1)" }}><rect width="22" height="100%" fill="url(#thornV)" /></svg>
      {children}
    </div>
  );
}

/** Alambre de púas: tira de 30 px, 110 % de ancho y rotada; atraviesa secciones. */
export function BarbedWire({ variant = "light", rotate = -4, className = "", style }: { variant?: "light" | "dark"; rotate?: number; className?: string; style?: CSSProperties }) {
  return (
    <svg aria-hidden className={`absolute pointer-events-none left-[-5%] w-[110%] h-[30px] ${className}`} style={{ transform: `rotate(${rotate}deg)`, ...style }}>
      <rect width="100%" height="30" fill={variant === "light" ? "url(#barbW)" : "url(#barbK)"} />
    </svg>
  );
}

/** Cinta adhesiva sobre el borde superior de una tarjeta. */
export function Tape({ rotate = -4, className = "" }: { rotate?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute -top-3 left-1/2 -ml-12 w-24 h-[26px] z-10 pointer-events-none ${className}`}
      style={{ background: "var(--tape)", transform: `rotate(${rotate}deg)`, boxShadow: "0 1px 0 rgba(0,0,0,.2)" }}
    />
  );
}

type Tone = "a" | "b" | "paper" | "ink";
const TONES: Record<Tone, string> = {
  a: "bg-[hsl(var(--a))] text-[hsl(var(--a-fg))]",
  b: "bg-[hsl(var(--b))] text-[hsl(var(--b-fg))]",
  paper: "bg-[hsl(var(--paper))] text-[hsl(var(--ink))]",
  ink: "bg-[hsl(var(--ink))] text-[hsl(var(--paper))] border border-[hsl(var(--paper))]",
};

/** Etiqueta mono rotada, encimada al borde de una imagen. Con `onClick` es el sello circular (botón real). */
export function Sticker({
  children,
  tone = "a",
  rotate = -4,
  className = "",
  onClick,
  ariaLabel,
  pressed,
}: {
  children: ReactNode;
  tone?: Tone;
  rotate?: number;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  pressed?: boolean;
}) {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        aria-pressed={pressed}
        className={`${TONES[tone]} w-32 h-32 flex items-center justify-center label !text-sm text-center border-2 border-[hsl(var(--ink))] transition-transform hover:scale-105 ${className}`}
        style={{ transform: `rotate(${rotate}deg)`, borderRadius: "9999px" }}
      >
        {children}
      </button>
    );
  }
  return (
    <span className={`${TONES[tone]} label inline-block px-2.5 py-1.5 ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
      {children}
    </span>
  );
}
