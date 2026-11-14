import type React from "react";
import { useFontTransition } from "@/components/flyer/useFontTransition";

// Rotación de fuentes al click, igual a la maqueta (FONTS / KEYS), con la transición "impresión mala"
// (ver useFontTransition) y la elección guardada en localStorage por id de título.
export const FONTS = ["'Seagram'", "'Doto'", "'Akira'", "'HitMePunk'", "'Rubik Wet Paint'", "'Rye'", "'Anton'", "'Ethnocentric'", "'Microgramma'", "'UnifrakturMaguntia'", "'Pirata One'", "'Bowlby One'", "'DashEarly'"] as const;
export const KEYS = { drop: 7, culture: 0, studio: 8, trans: 1, archive: 3, motion: 2, join: 4, about: 8 } as const;

// Doto es variable: se precarga el peso que usan los títulos.
const family = (f: string) => (f === "'Doto'" ? `900 1em ${f}` : `1em ${f}`);

export function useFontCycle(key: keyof typeof KEYS) {
  const t = useFontTransition({ options: FONTS, initial: KEYS[key], storageKey: `badder-font:home-${key}`, family });
  return {
    fontFamily: t.value as string,
    onClick: t.cycle,
    ref: t.ref,
    /** Props para el título: click/tap, Enter/Espacio con teclado y ref para la animación. */
    bind: {
      ref: t.ref,
      onClick: t.cycle,
      tabIndex: 0,
      title: "Click: cambiar tipografía",
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          t.cycle();
        }
      },
    },
  };
}
