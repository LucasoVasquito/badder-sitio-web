// Las 13 tipografías display (clases en index.css). Orden = rotación al hacer click en un título.
export const DISPLAY_FONTS = [
  { key: "doto", cls: "f-doto", name: "Doto" },
  { key: "seagram", cls: "f-seagram", name: "Seagram" },
  { key: "hitme", cls: "f-hitme", name: "HitMePunk" },
  { key: "akira", cls: "f-akira", name: "Akira" },
  { key: "ethno", cls: "f-ethno", name: "Ethnocentric" },
  { key: "wet", cls: "f-wet", name: "Rubik Wet Paint" },
  { key: "micro", cls: "f-micro", name: "Microgramma" },
  { key: "anton", cls: "f-anton", name: "Anton" },
  { key: "rye", cls: "f-rye", name: "Rye" },
  { key: "unifraktur", cls: "f-unifraktur", name: "UnifrakturMaguntia" },
  { key: "pirata", cls: "f-pirata", name: "Pirata One" },
  { key: "bowlby", cls: "f-bowlby", name: "Bowlby One" },
  { key: "dash", cls: "f-dash", name: "DASH Early" },
] as const;

export type DisplayFontKey = (typeof DISPLAY_FONTS)[number]["key"];
export const fontClass = (key: DisplayFontKey) => DISPLAY_FONTS.find((f) => f.key === key)?.cls ?? "f-anton";
