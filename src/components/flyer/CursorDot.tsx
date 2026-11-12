import { useEffect, useRef } from "react";

/** Círculo de --a con mix-blend-mode: difference. Solo con puntero fino; crece sobre enlaces, botones, imágenes y títulos. */
export default function CursorDot() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = dot.current;
    if (!el) return;
    document.documentElement.classList.add("has-cursor-dot");
    let x = -100;
    let y = -100;
    let cx = x;
    let cy = y;
    let scale = 1;
    let target = 1;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as Element | null;
      target = t?.closest("a, button, [role='button'], img, h1, h2, h3, summary, label, input, textarea, select") ? 2.6 : 1;
      el.style.opacity = "1";
    };
    const onLeave = () => (el.style.opacity = "0");
    const loop = () => {
      cx += (x - cx) * 0.25;
      cy += (y - cy) * 0.25;
      scale += (target - scale) * 0.2;
      if (!document.hidden) el.style.transform = `translate3d(${cx - 9}px, ${cy - 9}px, 0) scale(${scale.toFixed(3)})`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      document.documentElement.classList.remove("has-cursor-dot");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden
      className="fixed top-0 left-0 z-[100] w-[18px] h-[18px] rounded-full pointer-events-none opacity-0 hidden [@media(pointer:fine)]:block"
      style={{ background: "hsl(var(--a))", mixBlendMode: "difference" }}
    />
  );
}
