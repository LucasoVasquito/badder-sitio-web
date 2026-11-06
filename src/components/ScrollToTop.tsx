import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Al cambiar de página vuelve arriba; si la URL trae #ancla, baja hasta esa sección.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // Esperar un frame a que la página nueva esté montada
    const id = requestAnimationFrame(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) el.scrollIntoView({ block: "start" });
      else window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);

  return null;
}
