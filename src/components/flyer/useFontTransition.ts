import { useCallback, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { prefersReducedMotion } from "@/lib/device";

/**
 * Rotación de tipografía con transición "impresión mala" (~450 ms):
 *  1. Salida 180 ms: blur 0→6 px, glitch RGB 4→14 px y saltos en X de ±6 px (steps).
 *  2. Cambio en el punto de máximo blur, recién cuando la fuente nueva está cargada (document.fonts.load):
 *     nunca se ve la fuente de reemplazo del navegador.
 *  3. Entrada 270 ms: blur→0, glitch se cierra, sobreescala 1.04→1 y rebote de rotación ±1°.
 * Sin saltos de layout: el alto se fija antes del cambio y se anima al alto nuevo.
 * Clicks durante la animación se ignoran. Con reducir movimiento: fundido de 150 ms.
 * Se usan las propiedades individuales `translate`/`scale`/`rotate`, que se suman al transform propio del título.
 */
export function useFontTransition<T>({
  options,
  initial,
  storageKey,
  family,
}: {
  options: readonly T[];
  initial: number;
  /** Clave de localStorage (por id de título). */
  storageKey: string;
  /** Shorthand CSS de la fuente a precargar para la opción (ej. "900 1em 'Doto'"). */
  family: (o: T) => string;
}) {
  const [index, setIndex] = useState<number>(() => {
    try {
      const v = localStorage.getItem(storageKey);
      const i = options.findIndex((o) => String(o) === v);
      if (i >= 0) return i;
    } catch {
      /* sin almacenamiento */
    }
    return initial % options.length;
  });
  const ref = useRef<HTMLElement | null>(null);
  const busy = useRef(false);

  const setRef = useCallback((el: HTMLElement | null) => {
    ref.current = el;
  }, []);

  const cycle = useCallback(async () => {
    if (busy.current) return; // clicks seguidos: se ignoran mientras dura la animación
    busy.current = true;
    const el = ref.current;
    const next = (index + 1) % options.length;
    const fam = family(options[next]);
    const save = () => {
      try {
        localStorage.setItem(storageKey, String(options[next]));
      } catch {
        /* el cambio vale igual para esta visita */
      }
    };
    const fontReady = Promise.race([
      document.fonts?.load(fam).catch(() => undefined) ?? Promise.resolve(),
      new Promise((r) => setTimeout(r, 1500)),
    ]);

    if (!el || typeof el.animate !== "function") {
      await fontReady;
      setIndex(next);
      save();
      busy.current = false;
      return;
    }

    try {
      if (prefersReducedMotion()) {
        await el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 75, fill: "forwards" }).finished;
        await fontReady;
        flushSync(() => setIndex(next));
        await el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 75 }).finished;
        el.getAnimations().forEach((a) => a.cancel());
      } else {
        const g = (n: number) => `${n}px 0 0 rgba(0,255,240,.6), ${-n}px 0 0 rgba(255,0,90,.6)`;
        const h0 = el.offsetHeight;
        el.style.height = `${h0}px`;

        const out = el.animate(
          [
            { filter: "blur(0px)", textShadow: g(4), translate: "0px 0px" },
            { filter: "blur(3px)", textShadow: g(8), translate: "6px 0px" },
            { filter: "blur(5px)", textShadow: g(11), translate: "-6px 0px" },
            { filter: "blur(6px)", textShadow: g(14), translate: "4px 0px" },
          ],
          { duration: 180, easing: "steps(3, jump-none)", fill: "forwards" }
        );
        await Promise.all([out.finished, fontReady]);

        flushSync(() => setIndex(next));

        // Alto nuevo con la fuente nueva; se anima desde el alto anterior.
        el.style.height = "auto";
        const h1 = el.offsetHeight;
        el.style.height = `${h0}px`;
        out.cancel();

        const enter = el.animate(
          [
            { filter: "blur(6px)", textShadow: g(14), scale: "1.04", rotate: "1deg", translate: "4px 0px" },
            { filter: "blur(2px)", textShadow: g(6), scale: "1.01", rotate: "-1deg", translate: "0px 0px", offset: 0.6 },
            { filter: "blur(0px)", textShadow: g(4), scale: "1", rotate: "0deg", translate: "0px 0px" },
          ],
          { duration: 270, easing: "cubic-bezier(.2,.8,.2,1)" }
        );
        const grow = h0 !== h1 ? el.animate([{ height: `${h0}px` }, { height: `${h1}px` }], { duration: 270, easing: "ease-out" }) : null;
        await Promise.all([enter.finished, grow?.finished]);
        el.style.height = "";
      }
    } catch {
      // animación cancelada (p. ej. el título se desmontó): se garantiza el cambio igual
      setIndex(next);
      if (el) el.style.height = "";
    }
    save();
    busy.current = false;
  }, [index, options, family, storageKey]);

  return { index, value: options[index], ref: setRef, cycle };
}
