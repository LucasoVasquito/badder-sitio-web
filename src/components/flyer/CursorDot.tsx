import { useEffect, useState } from "react";

// Cursor: círculo 18 px de --a, difference, z 300 (por encima de la ficha de cuadros, z 200). Solo se renderiza con puntero fino; el lazo global lo mueve.
export default function CursorDot() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    // Desactivado en táctil (pointer: coarse) y en dispositivos híbridos sin hover real.
    const ok = window.matchMedia("(pointer: fine) and (hover: hover)").matches && !window.matchMedia("(pointer: coarse)").matches;
    setFine(ok);
    if (ok) document.documentElement.classList.add("has-cursor-dot");
    return () => document.documentElement.classList.remove("has-cursor-dot");
  }, []);
  if (!fine) return null;
  return (
    <div
      id="flyer-cursor"
      aria-hidden
      style={{ position: "fixed", left: 0, top: 0, width: 18, height: 18, margin: "-9px 0 0 -9px", borderRadius: "50%", background: "var(--a-c,#FF2B1C)", mixBlendMode: "difference", pointerEvents: "none", zIndex: 300, transition: "width .2s,height .2s,margin .2s" }}
    />
  );
}
