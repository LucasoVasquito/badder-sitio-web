import { useEffect, useState } from "react";
import { isIOS } from "@/lib/device";

const GRAIN = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><filter id="grainF"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 1.4 -0.2"/></filter><rect width="100%" height="100%" filter="url(#grainF)"/></svg>`;

// Grano: capa fixed z 90, overlay, opacidad var(--grain). El lazo global la traslada cada 70 ms.
// En iOS el feTurbulence a pantalla completa es caro: se usa un PNG de ruido estático (public/img/noise.png) en mosaico.
export default function GrainOverlay() {
  const [ios, setIos] = useState(false);
  useEffect(() => {
    const v = isIOS();
    setIos(v);
    if (v) document.documentElement.classList.add("is-ios");
  }, []);
  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 90, overflow: "hidden", opacity: "var(--grain,.35)", mixBlendMode: "overlay" }}>
      {ios ? (
        <div id="flyer-grain" style={{ position: "absolute", left: "-50%", top: "-50%", width: "200%", height: "200%", backgroundImage: "url(/img/noise.png)", backgroundSize: "256px 256px" }} />
      ) : (
        <div id="flyer-grain" style={{ position: "absolute", left: "-50%", top: "-50%", width: "200%", height: "200%" }} dangerouslySetInnerHTML={{ __html: GRAIN }} />
      )}
    </div>
  );
}
