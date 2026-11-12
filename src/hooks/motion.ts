import { useEffect } from "react";

/** ¿El usuario pidió menos movimiento? (se lee en el momento: puede cambiar mientras la página está abierta) */
export const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---- Velocidad de scroll, suavizada (lerp). Un solo lazo compartido; nada de setState por frame. ----
export const scrollVelocity = { value: 0 };
let subscribers = 0;
let raf = 0;
let lastY = 0;

const tick = () => {
  const y = window.scrollY;
  const raw = Math.abs(y - lastY);
  lastY = y;
  scrollVelocity.value += (raw - scrollVelocity.value) * 0.12;
  if (scrollVelocity.value < 0.01) scrollVelocity.value = 0;
  raf = requestAnimationFrame(tick);
};
const start = () => {
  if (raf || document.hidden) return;
  lastY = window.scrollY;
  raf = requestAnimationFrame(tick);
};
const stop = () => {
  cancelAnimationFrame(raf);
  raf = 0;
};
const onVisibility = () => (document.hidden ? stop() : subscribers > 0 && start());

/** Mantiene vivo el lazo de velocidad de scroll mientras el componente esté montado. Leer `scrollVelocity.value` en rAF. */
export function useScrollVelocity() {
  useEffect(() => {
    subscribers++;
    if (subscribers === 1) {
      document.addEventListener("visibilitychange", onVisibility);
      start();
    }
    return () => {
      subscribers--;
      if (subscribers === 0) {
        document.removeEventListener("visibilitychange", onVisibility);
        stop();
        scrollVelocity.value = 0;
      }
    };
  }, []);
  return scrollVelocity;
}

/**
 * Mueve los elementos con `data-depth` según el mouse (positivo = acompaña, negativo = contrario).
 * Usa la propiedad `translate` para no pisar las rotaciones que vienen por `transform`.
 */
export function useMouseParallax() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || reducedMotion()) return;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      if (!frame && !document.hidden) frame = requestAnimationFrame(loop);
    };
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      document.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
        const d = Number(el.dataset.depth) || 0;
        el.style.translate = `${(cx * d).toFixed(2)}px ${(cy * d).toFixed(2)}px`;
      });
      frame = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.0005 ? requestAnimationFrame(loop) : 0;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
}
