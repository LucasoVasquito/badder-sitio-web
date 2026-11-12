import { useEffect, useRef, useState, type CSSProperties } from "react";
import SmartImage from "@/components/site/SmartImage";
import { thumbOf } from "@/lib/thumbs";

/**
 * Imagen desenfocada que se enfoca al hover/foco del contenedor.
 * En pantallas sin hover se enfoca al entrar en el viewport (nada esencial depende del hover).
 */
export function BlurImage({
  src,
  alt = "",
  blur = 4,
  thumb = true,
  className = "",
  hostClassName = "",
  style,
}: {
  src: string;
  alt?: string;
  blur?: number;
  thumb?: boolean;
  className?: string;
  hostClassName?: string;
  style?: CSSProperties;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [clear, setClear] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches || !host.current) return;
    const io = new IntersectionObserver(
      ([e]) => setClear(e.isIntersecting),
      { threshold: 0.6 }
    );
    io.observe(host.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} data-clear={clear ? "" : undefined} className={`blur-host overflow-hidden ${hostClassName}`}>
      <SmartImage
        src={src}
        thumb={thumb}
        alt={alt}
        className={`blur-img ${className}`}
        style={{ ["--blur" as string]: `${blur}px`, ...style }}
      />
    </div>
  );
}

/**
 * Imagen intervenida con el color de acento.
 *  bitmap: umbral de 1 bit (filtro #bitmap) sobre --a → negro + acento
 *  duo:    escala de grises con contraste sobre --a
 * Rinde bien con fotografías; las gráficas conservan su color y no pasan por aquí.
 */
export function Duotone({
  src,
  alt = "",
  mode = "duo",
  className = "",
  hostClassName = "",
  accent = "a",
}: {
  src: string;
  alt?: string;
  mode?: "bitmap" | "duo";
  className?: string;
  hostClassName?: string;
  accent?: "a" | "b";
}) {
  return (
    <div className={`overflow-hidden ${hostClassName}`} style={{ background: `hsl(var(--${accent}))`, isolation: "isolate" }}>
      <img
        src={thumbOf(src)}
        onError={(e) => {
          if (e.currentTarget.src.indexOf(src) === -1) e.currentTarget.src = src;
        }}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={className}
        style={{
          mixBlendMode: "multiply",
          filter: mode === "bitmap" ? "url(#bitmap)" : "grayscale(1) contrast(1.35)",
        }}
      />
    </div>
  );
}
