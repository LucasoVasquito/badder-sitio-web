import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, X } from "lucide-react";
import { useCartCount } from "@/store/cartStore";

// Rutas reales para los anclas de la maqueta: #top→/, #music→/music, #culture→/culture, #archive→/archive, #drop→/shop, #about→/studio, #join→/community.
const NAV = [
  { label: "Home", path: "/" },
  { label: "Music", path: "/music" },
  { label: "Culture", path: "/culture" },
  { label: "Archive", path: "/archive" },
  { label: "Shop", path: "/shop" },
  { label: "Studio", path: "/studio" },
];
const COMMUNITY = { label: "↳ Community", path: "/community" };

const MONO = { fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, letterSpacing: ".14em", textTransform: "uppercase" as const };
const isActive = (path: string, pathname: string) => (path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`));

// Nav fija (z 80, mix-blend-mode: difference), logo 30 px, mono 13 px .14em. Menú móvil a pantalla completa con Escape y cierre 44×44.
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const cartCount = useCartCount();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const cart = () => (
    <Link to="/cart" aria-label={`Carrito${cartCount > 0 ? ` (${cartCount})` : ""}`} className="relative inline-flex items-center justify-center min-w-[44px] min-h-[44px]">
      <ShoppingBag className="w-5 h-5" strokeWidth={1.75} />
      {cartCount > 0 && (
        <span style={{ ...MONO, fontSize: 11, letterSpacing: 0 }} className="absolute top-1 right-0 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-white text-black">
          {cartCount}
        </span>
      )}
    </Link>
  );

  return (
    <>
      <nav aria-label="Principal" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 80, mixBlendMode: "difference", color: "#F2EFE6" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "16px clamp(16px,3vw,40px)" }}>
          <Link to="/" aria-label="BADDER — Inicio" style={{ color: "inherit" }}>
            <img src="/img/logo.webp" alt="Badder" style={{ height: 30, width: "auto", display: "block" }} />
          </Link>

          {/* Escritorio */}
          <div className="hidden lg:flex" style={{ alignItems: "center", gap: "clamp(10px,2vw,28px)", flexWrap: "wrap", justifyContent: "flex-end", ...MONO }}>
            {NAV.map((n) => (
              <Link key={n.path} to={n.path} aria-current={isActive(n.path, pathname) ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
            <Link to={COMMUNITY.path} aria-current={isActive(COMMUNITY.path, pathname) ? "page" : undefined} style={{ border: "1px solid #F2EFE6", padding: "8px 12px" }}>
              {COMMUNITY.label}
            </Link>
            {cart()}
          </div>

          {/* Móvil / tablet */}
          <div className="lg:hidden flex items-center gap-1" style={MONO}>
            {cart()}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex items-center px-3 min-h-[44px]"
              style={{ border: "1px solid #F2EFE6", ...MONO }}
            >
              {open ? "Cerrar" : "Menú"}
            </button>
          </div>
        </div>
      </nav>

      {/* La nav es fija: en las páginas interiores se reserva su alto. En Home el hero arranca debajo de ella. */}
      {pathname !== "/" && <div aria-hidden style={{ height: 64 }} />}

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[88] flex flex-col lg:hidden"
            style={{ background: "#0A0A09", color: "#F2EFE6" }}
          >
            <div className="flex items-center justify-between px-4 h-16 shrink-0" style={{ borderBottom: "1px solid rgba(242,239,230,.4)" }}>
              <span style={MONO}>Menú</span>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  toggleRef.current?.focus();
                }}
                aria-label="Cerrar menú"
                className="w-11 h-11 inline-flex items-center justify-center"
                style={{ border: "1px solid #F2EFE6" }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-8">
              <ul className="flex flex-col">
                {NAV.map((n) => {
                  const on = isActive(n.path, pathname);
                  return (
                    <li key={n.path} style={{ borderBottom: "1px solid rgba(242,239,230,.4)" }}>
                      <Link to={n.path} onClick={() => setOpen(false)} aria-current={on ? "page" : undefined} className="flex items-center justify-between min-h-[56px] py-2">
                        <span style={{ fontFamily: "'Akira',sans-serif", fontSize: "1.6rem", textTransform: "uppercase", background: on ? "var(--a-c,#FF2B1C)" : undefined, color: on ? "#0A0A09" : undefined, padding: on ? "0 8px" : undefined }}>
                          {n.label}
                        </span>
                        <span aria-hidden style={MONO}>→</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link
                to={COMMUNITY.path}
                onClick={() => setOpen(false)}
                className="mt-6 flex items-center justify-between min-h-[52px] px-4"
                style={{ border: "1px solid #F2EFE6", ...MONO, background: isActive(COMMUNITY.path, pathname) ? "var(--a-c,#FF2B1C)" : undefined, color: isActive(COMMUNITY.path, pathname) ? "#0A0A09" : undefined }}
              >
                <span>{COMMUNITY.label}</span>
                <span aria-hidden>→</span>
              </Link>
              <div className="mt-8 flex justify-between" style={MONO}>
                <Link to="/contact" onClick={() => setOpen(false)} className="underline underline-offset-4 min-h-[44px] inline-flex items-center">
                  Contacto
                </Link>
                <span className="self-center">La Plata, Argentina</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
