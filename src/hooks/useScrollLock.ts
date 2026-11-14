import { useEffect } from "react";

/**
 * Bloquea el scroll del body de forma compatible con iOS Safari.
 * overflow:hidden solo no alcanza en iOS: se fija el body con position:fixed y se guarda/restaura el scrollY.
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const y = window.scrollY;
    const b = document.body.style;
    const prev = { position: b.position, top: b.top, left: b.left, right: b.right, width: b.width, overflow: b.overflow };
    b.position = "fixed";
    b.top = `-${y}px`;
    b.left = "0";
    b.right = "0";
    b.width = "100%";
    b.overflow = "hidden";
    return () => {
      Object.assign(b, prev);
      window.scrollTo(0, y);
    };
  }, [locked]);
}
