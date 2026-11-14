import type { CSSProperties, ReactNode } from "react";

/** Borde de picos de un color dado (la maqueta solo trae el crema). Tira horizontal con picos hacia afuera. */
export function ThornStrip({ color, id, height = 22, style }: { color: string; id: string; height?: number; style?: CSSProperties }) {
  return (
    <svg aria-hidden width="100%" height={height} style={{ display: "block", pointerEvents: "none", ...style }}>
      <defs>
        <pattern id={id} width="46" height="24" patternUnits="userSpaceOnUse" patternTransform={`scale(${height / 24})`}>
          <g fill={color}>
            <rect y="9" width="46" height="5" />
            <polygon points="3,10 6,0 9,10" />
            <polygon points="13,13 16,24 19,13" />
            <polygon points="22,10 27,1 30,10" />
            <polygon points="32,13 36,22 39,13" />
            <polygon points="40,10 42,4 45,10" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height={height} fill={`url(#${id})`} />
    </svg>
  );
}

/** Marco con tira de picos arriba (y opcionalmente abajo): el escenario de las remeras y los cuadros. */
export function ThornBox({
  color,
  id,
  bottom = false,
  children,
  style,
}: {
  color: string;
  id: string;
  bottom?: boolean;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div style={{ position: "relative", ...style }}>
      <ThornStrip color={color} id={`${id}-t`} style={{ position: "absolute", left: 0, top: -20, width: "100%" }} height={22} />
      {children}
      {bottom && <ThornStrip color={color} id={`${id}-b`} style={{ position: "absolute", left: 0, bottom: -20, width: "100%", transform: "scaleY(-1)" }} height={22} />}
    </div>
  );
}
