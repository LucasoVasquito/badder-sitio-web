import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Elementos que tienen un efecto de hover en escritorio (ver index.css). En táctil se activan con un tap.
const HOVERABLE = "[class*='hv-'],.fx-blur,.cut,.blur-host,.t-glitch";

/**
 * Equivalentes táctiles del hover (pantallas sin hover):
 * - Las fotos difusas (.fx-blur) se enfocan al entrar en el viewport.
 * - Tocar un elemento con hover le pone [data-active]; tocar otra cosa se lo saca.
 *   El tap no bloquea la navegación: si el elemento es un link, navega igual.
 */
export default function TouchBlur() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? e.target.setAttribute("data-clear", "") : e.target.removeAttribute("data-clear"))),
      { threshold: 0.6 }
    );
    const id = requestAnimationFrame(() => document.querySelectorAll(".fx-blur").forEach((el) => io.observe(el)));
    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    let active: Element[] = [];
    const clear = () => {
      active.forEach((el) => el.removeAttribute("data-active"));
      active = [];
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      const t = e.target as Element | null;
      const next: Element[] = [];
      let el = t?.closest?.(HOVERABLE) ?? null;
      while (el) {
        next.push(el);
        el = el.parentElement?.closest(HOVERABLE) ?? null;
      }
      active.filter((a) => !next.includes(a)).forEach((a) => a.removeAttribute("data-active"));
      next.forEach((a) => a.setAttribute("data-active", ""));
      active = next;
    };
    document.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onDown);
      clear();
    };
  }, []);

  useEffect(() => {
    document.querySelectorAll("[data-active]").forEach((el) => el.removeAttribute("data-active"));
  }, [pathname]);

  return null;
}
