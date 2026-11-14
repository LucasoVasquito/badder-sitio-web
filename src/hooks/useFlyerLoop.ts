import { useEffect } from "react";
import { useFlyerStore } from "@/store/flyerStore";
import { isIOS } from "@/lib/device";

export const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Un solo requestAnimationFrame global, igual al `loop` de la maqueta:
 * cursor (lerp .35), parallax de [data-depth] (lerp .06), cinta [data-marquee] (acelera con la velocidad de scroll),
 * grano (salto cada 70 ms) y escala del warp. Todo con DOM directo: sin setState por frame.
 * Se pausa con la pestaña oculta. Con reduced-motion: sin warp, parallax ni marquees; grano estático.
 */
export function useFlyerLoop() {
  useEffect(() => {
    const m = { x: 0, y: 0, cx: 0, cy: 0, px: 0, py: 0 };
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const ios = isIOS();
    let vel = 0;
    let lastY = window.scrollY;
    let marq = 0;
    let t0 = 0;
    let gT = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      m.x = e.clientX;
      m.y = e.clientY;
      const c = document.getElementById("flyer-cursor");
      if (c) {
        const big = !!(e.target as Element | null)?.closest?.("img,button,a,h2");
        c.style.width = c.style.height = big ? "64px" : "18px";
        c.style.margin = big ? "-32px 0 0 -32px" : "-9px 0 0 -9px";
      }
    };
    if (finePointer) window.addEventListener("mousemove", onMove);

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) {
        t0 = 0;
        return;
      }
      const reduced = reducedMotion();
      const dt = Math.min(50, t - (t0 || t));
      t0 = t;

      const cursor = document.getElementById("flyer-cursor");
      m.cx += (m.x - m.cx) * 0.35;
      m.cy += (m.y - m.cy) * 0.35;
      if (cursor) cursor.style.transform = `translate(${m.cx}px,${m.cy}px)`;

      const sy = window.scrollY || document.documentElement.scrollTop;
      vel += (Math.abs(sy - lastY) - vel) * 0.15;
      lastY = sy;

      if (!reduced) {
        const nx = m.x / window.innerWidth - 0.5;
        const ny = m.y / window.innerHeight - 0.5;
        m.px += (nx - m.px) * 0.06;
        m.py += (ny - m.py) * 0.06;
        if (finePointer) {
          document.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
            const d = +(el.dataset.depth ?? 0);
            el.style.translate = `${m.px * d}px ${m.py * d}px`;
          });
        }
        marq += dt * 0.06 * (1 + vel * 0.15);
        document.querySelectorAll<HTMLElement>("[data-marquee]").forEach((el) => {
          const s = +(el.dataset.marquee ?? 0);
          const w = el.scrollWidth / 2 || 1;
          let x = (marq * s) % w;
          if (x > 0) x -= w;
          el.style.translate = `${x}px 0`;
        });
        const grain = document.getElementById("flyer-grain");
        if (t - gT > 70 && grain) {
          gT = t;
          grain.style.transform = `translate(${(Math.random() * 20 - 10).toFixed(1)}%,${(Math.random() * 20 - 10).toFixed(1)}%)`;
        }
      }

      // Distorsión por scroll: en iOS el filtro está apagado por CSS (html.is-ios); en táctil se baja la intensidad.
      const wm = document.getElementById("warpMap");
      if (wm && !ios) {
        const on = useFlyerStore.getState().distorsion && !reduced;
        const k = finePointer ? 1 : 0.4;
        const next = on ? ((10 + Math.sin(t / 700) * 6 + Math.min(80, vel * 3)) * k).toFixed(1) : "0";
        if (wm.getAttribute("scale") !== next) wm.setAttribute("scale", next);
      }
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
}
