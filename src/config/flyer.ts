// Los 4 "tweaks" de la maqueta como configuración (también editables en vivo en /sistema).
export const PALETAS: { a: string; b: string; aHsl: string; bHsl: string; aFg: string; bFg: string }[] = [
  { a: "#FF2B1C", b: "#9BFF2E", aHsl: "4 100% 55.5%", bHsl: "88.7 100% 59%", aFg: "60 5.3% 3.7%", bFg: "60 5.3% 3.7%" },
  { a: "#9BFF2E", b: "#FF2B1C", aHsl: "88.7 100% 59%", bHsl: "4 100% 55.5%", aFg: "60 5.3% 3.7%", bFg: "60 5.3% 3.7%" },
  { a: "#FFE600", b: "#3346FF", aHsl: "54 100% 50%", bHsl: "233 100% 60%", aFg: "60 5.3% 3.7%", bFg: "45 31.6% 92.5%" },
  { a: "#3346FF", b: "#FF2B1C", aHsl: "233 100% 60%", bHsl: "4 100% 55.5%", aFg: "45 31.6% 92.5%", bFg: "60 5.3% 3.7%" },
];

export const flyerDefaults = {
  /** índice en PALETAS */
  paleta: 0,
  /** opacidad del grano, 0–0.8 */
  textura: 0.35,
  /** warp on/off */
  distorsion: true,
  /** fotos difusas (blur 4px) o nítidas (0px) */
  difusas: true,
};
export type FlyerConfig = typeof flyerDefaults;
