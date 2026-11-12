import { useState } from "react";

// Rotación de fuentes al click, igual a la maqueta (FONTS / KEYS).
export const FONTS = ["'Seagram'", "'Doto'", "'Akira'", "'HitMePunk'", "'Rubik Wet Paint'", "'Rye'", "'Anton'", "'Ethnocentric'", "'Microgramma'", "'UnifrakturMaguntia'", "'Pirata One'", "'Bowlby One'", "'DashEarly'"];
export const KEYS = { trans: 1, culture: 0, archive: 3, motion: 2, drop: 7, join: 4, about: 8 } as const;

export function useFontCycle(key: keyof typeof KEYS) {
  const [i, setI] = useState<number>(KEYS[key]);
  return { fontFamily: FONTS[i % FONTS.length], onClick: () => setI((n) => (n + 1) % FONTS.length) };
}
