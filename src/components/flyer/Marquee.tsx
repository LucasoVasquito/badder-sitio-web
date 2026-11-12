import { useEffect, useRef, type ReactNode } from "react";
import { reducedMotion, scrollVelocity, useScrollVelocity } from "@/hooks/motion";

/**
 * Cinta de texto en bucle. Velocidad base + aceleración con la velocidad de scroll.
 * Se pausa fuera del viewport y con la pestaña oculta; estática con reduced-motion.
 */
export default function Marquee({
  items,
  className = "",
  itemClassName = "",
  speed = 60,
  rotate = 0,
  separator = "✕",
  reverse = false,
}: {
  items: ReactNode[];
  className?: string;
  itemClassName?: string;
  /** px por segundo */
  speed?: number;
  rotate?: number;
  separator?: ReactNode;
  reverse?: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useScrollVelocity();

  useEffect(() => {
    const el = track.current;
    const root = host.current;
    if (!el || !root || reducedMotion()) return;
    let x = 0;
    let last = performance.now();
    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(root);
    const loop = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      if (visible && !document.hidden) {
        const half = el.scrollWidth / 2;
        x += (speed + scrollVelocity.value * 42) * dt * (reverse ? -1 : 1);
        if (half > 0) x = ((x % half) + half) % half;
        el.style.transform = `translate3d(${-x}px,0,0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [speed, reverse]);

  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b" ? true : undefined}>
      {items.map((it, i) => (
        <span key={i} className={`flex items-center whitespace-nowrap ${itemClassName}`}>
          <span className="px-[0.45em]">{it}</span>
          <span aria-hidden className="px-[0.2em]">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div ref={host} className={`overflow-hidden w-[104%] -ml-[2%] ${className}`} style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}>
      <div ref={track} className="flex w-max will-change-transform">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
