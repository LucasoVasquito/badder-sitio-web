import { type ElementType, type ReactNode } from "react";
import { DISPLAY_FONTS, type DisplayFontKey } from "./fonts";
import { useFontTransition } from "./useFontTransition";

// font-family real de cada clase (para precargarla antes de mostrarla).
const FAMILY: Record<DisplayFontKey, string> = {
  doto: "900 1em 'Doto'",
  seagram: "1em 'Seagram'",
  hitme: "1em 'HitMePunk'",
  akira: "1em 'Akira'",
  ethno: "1em 'Ethnocentric'",
  wet: "1em 'Rubik Wet Paint'",
  micro: "1em 'Microgramma'",
  anton: "1em 'Anton'",
  rye: "1em 'Rye'",
  unifraktur: "1em 'UnifrakturMaguntia'",
  pirata: "1em 'Pirata One'",
  bowlby: "1em 'Bowlby One'",
  dash: "1em 'DashEarly'",
};
const KEYS = DISPLAY_FONTS.map((f) => f.key);
const family = (k: DisplayFontKey) => FAMILY[k];

/**
 * Título display: al hacer click (o tap) rota su tipografía por el set de 13 con la transición "impresión mala"
 * (useFontTransition) y recuerda la elección (localStorage, por id).
 * El título es un botón dentro del encabezado, así que también funciona con teclado.
 */
export default function FontCycleTitle({
  id,
  font,
  as: Tag = "h2",
  className = "",
  children,
}: {
  id: string;
  /** Tipografía de origen del título. */
  font: DisplayFontKey;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const t = useFontTransition({ options: KEYS, initial: Math.max(0, KEYS.indexOf(font)), storageKey: `badder-font:${id}`, family });
  const cls = DISPLAY_FONTS.find((f) => f.key === t.value)?.cls ?? "f-anton";

  return (
    <Tag ref={t.ref} className={`${cls} ${className}`}>
      <button type="button" onClick={t.cycle} title="Click: cambiar tipografía" className="block text-left w-full cursor-pointer [font:inherit] [letter-spacing:inherit] [text-transform:inherit] [line-height:inherit]">
        {children}
      </button>
    </Tag>
  );
}
