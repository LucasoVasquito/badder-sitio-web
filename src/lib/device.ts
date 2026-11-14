// Detección de dispositivo para los ajustes de iOS (Safari y Chrome iOS usan WebKit).
// iPadOS se presenta como "Macintosh": se distingue por tener pantalla táctil.
export const isIOS = () =>
  typeof navigator !== "undefined" &&
  (/iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.userAgent.includes("Macintosh") && navigator.maxTouchPoints > 1));

export const isCoarse = () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
