import { useEffect, useRef } from "react";
import { reducedMotion } from "@/hooks/motion";

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Grano de impresión: ruido fijo al 200 % del viewport que salta de lugar cada ~70 ms (sin re-render). Estático con reduced-motion. */
export default function GrainOverlay() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    let raf = 0;
    let last = 0;
    const loop = (t: number) => {
      if (!document.hidden && t - last > 70 && ref.current) {
        last = t;
        ref.current.style.transform = `translate(${-Math.random() * 50}%, ${-Math.random() * 50}%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 z-[60] overflow-hidden pointer-events-none">
      <div
        ref={ref}
        className="absolute"
        style={{ width: "200%", height: "200%", backgroundImage: NOISE, mixBlendMode: "overlay", opacity: 0.24, willChange: "transform" }}
      />
    </div>
  );
}
