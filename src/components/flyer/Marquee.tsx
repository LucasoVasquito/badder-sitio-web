import type { CSSProperties, ReactNode } from "react";

// Cinta [data-marquee]: contenido duplicado 2 veces; el lazo global la desplaza y acelera con el scroll.
export default function Marquee({ speed, children, className = "", style }: { speed: number; children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div data-marquee={speed} className={className} style={{ display: "inline-flex", ...style }}>
      {children}
      <span aria-hidden style={{ display: "contents" }}>{children}</span>
    </div>
  );
}
