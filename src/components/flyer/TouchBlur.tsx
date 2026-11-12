import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// En pantallas sin hover, las fotos difusas (.fx-blur) se enfocan al entrar en el viewport.
export default function TouchBlur() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? e.target.setAttribute("data-clear", "") : e.target.removeAttribute("data-clear"))),
      { threshold: 0.6 }
    );
    const id = requestAnimationFrame(() => document.querySelectorAll(".fx-blur").forEach((el) => io.observe(el)));
    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
    };
  }, [pathname]);
  return null;
}
