import { useEffect, useRef } from "react";
import { reducedMotion, useScrollVelocity } from "@/hooks/motion";

/**
 * Definiciones SVG compartidas (se monta una vez en App):
 *  #warp    desplazamiento por ruido; su escala oscila y sube con la velocidad de scroll
 *  #bitmap  umbral de 1 bit: sobre fondo --a con la imagen en multiply = duotono negro + acento
 *  #thornH/#thornV  línea con triángulos irregulares (marco de espinas, en --a)
 *  #barbW/#barbK    alambre de púas blanco / negro
 */
export default function SvgDefs() {
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const vel = useScrollVelocity();

  useEffect(() => {
    if (reducedMotion()) {
      disp.current?.setAttribute("scale", "0");
      return;
    }
    let raf = 0;
    const loop = (t: number) => {
      if (!document.hidden) {
        const s = 10 + Math.sin(t / 900) * 7 + Math.min(vel.value * 2.2, 40);
        disp.current?.setAttribute("scale", s.toFixed(1));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [vel]);

  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute", pointerEvents: "none" }}>
      <defs>
        <filter id="warp" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.04" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap ref={disp} in="SourceGraphic" in2="n" scale="12" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter id="bitmap" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feColorMatrix type="saturate" values="0" result="g" />
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="7" result="noise" />
          <feComposite in="g" in2="noise" operator="arithmetic" k1="0" k2="0.85" k3="0.3" k4="-0.06" result="mix" />
          <feComponentTransfer in="mix">
            <feFuncR type="discrete" tableValues="0 1" />
            <feFuncG type="discrete" tableValues="0 1" />
            <feFuncB type="discrete" tableValues="0 1" />
          </feComponentTransfer>
        </filter>

        <pattern id="thornH" width="48" height="22" patternUnits="userSpaceOnUse">
          <rect y="10" width="48" height="2" style={{ fill: "hsl(var(--a))" }} />
          <path d="M5 10 L10 1 L14 10Z M26 10 L29 3 L35 10Z M15 12 L18 20 L22 12Z M38 12 L42 21 L46 12Z" style={{ fill: "hsl(var(--a))" }} />
        </pattern>
        <pattern id="thornV" width="22" height="48" patternUnits="userSpaceOnUse">
          <rect x="10" width="2" height="48" style={{ fill: "hsl(var(--a))" }} />
          <path d="M10 5 L1 10 L10 14Z M10 26 L3 29 L10 35Z M12 15 L20 18 L12 22Z M12 38 L21 42 L12 46Z" style={{ fill: "hsl(var(--a))" }} />
        </pattern>

        <pattern id="barbW" width="60" height="30" patternUnits="userSpaceOnUse">
          <path d="M0 15 C15 2 15 2 30 15 S45 28 60 15 M0 15 C15 28 15 28 30 15 S45 2 60 15" fill="none" stroke="#F2EFE6" strokeWidth="2.4" />
          <path d="M23 8 L37 22 M37 8 L23 22 M-7 8 L7 22 M7 8 L-7 22 M53 8 L67 22 M67 8 L53 22" stroke="#F2EFE6" strokeWidth="2" strokeLinecap="round" />
        </pattern>
        <pattern id="barbK" width="60" height="30" patternUnits="userSpaceOnUse">
          <path d="M0 15 C15 2 15 2 30 15 S45 28 60 15 M0 15 C15 28 15 28 30 15 S45 2 60 15" fill="none" stroke="#0A0A09" strokeWidth="2.4" />
          <path d="M23 8 L37 22 M37 8 L23 22 M-7 8 L7 22 M7 8 L-7 22 M53 8 L67 22 M67 8 L53 22" stroke="#0A0A09" strokeWidth="2" strokeLinecap="round" />
        </pattern>
      </defs>
    </svg>
  );
}
