import type { ReactNode } from "react";
import { FontCycleTitle, Halftone, Sticker, BarbedWire, type DisplayFontKey } from "@/components/flyer";

interface PageHeaderProps {
  /** Línea de metadata sobre el título (sección / subtítulo). */
  kicker: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
}

// Cada ruta abre con su propia tipografía display (click = rota por las 13). Las anchas bajan el tamaño para no cortarse a 390 px.
const FONT_BY_TITLE: Record<string, DisplayFontKey> = {
  Archivo: "hitme",
  Notas: "seagram",
  Música: "doto",
  Indumentaria: "ethno",
  Estudio: "micro",
  Participar: "wet",
  Contacto: "bowlby",
  Carrito: "dash",
  Gracias: "dash",
  Sistema: "akira",
};
const WIDE: DisplayFontKey[] = ["akira", "ethno", "micro", "bowlby", "doto"];

// Encabezado de páginas interiores: abre como un flyer (display gigante, semitono, alambre y sticker), con lectura calma debajo.
export default function PageHeader({ kicker, title, intro, children }: PageHeaderProps) {
  const font = FONT_BY_TITLE[title] ?? "anton";
  const wide = WIDE.includes(font);
  const size = wide ? "text-[clamp(1.6rem,6.4vw,6.5rem)]" : "text-[clamp(2.75rem,11vw,9rem)]";

  return (
    <header className="relative mb-12 md:mb-16 pb-12 md:pb-16">
      <Halftone className="-z-0" size={8} opacity={0.22} />
      <div className="relative">
        <Sticker tone="a" rotate={-3} className="mb-4">{kicker}</Sticker>
        <FontCycleTitle id={`page:${title}`} font={font} as="h1" className={`${size} leading-[0.9] [overflow-wrap:anywhere] t-glitch`}>
          {title}
        </FontCycleTitle>
        {intro && <div className="mt-6 text-xl leading-relaxed max-w-[56ch] relative">{intro}</div>}
        {children}
      </div>
      <BarbedWire variant="light" rotate={-2} className="bottom-0" />
    </header>
  );
}
