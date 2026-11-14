import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, X } from "lucide-react";
import { useCartCount } from "@/store/cartStore";
import { useScrollLock } from "@/hooks/useScrollLock";

// Jerarquía v3: Home · Culture · Shop · Studio · Music · Archive · Community (Community con borde, al final).
const NAV = [
  { label: "Home", path: "/" },
  { label: "Culture", path: "/culture" },
  { label: "Shop", path: "/shop" },
  { label: "Studio", path: "/studio" },
  { label: "Music", path: "/music" },
  { label: "Archive", path: "/archive" },
];
const COMMUNITY = { label: "↳ Community", path: "/community" };
const MOBILE = [...NAV, COMMUNITY];

const MONO = { fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, letterSpacing: ".14em", textTransform: "uppercase" as const };
const isActive = (path: string, pathname: string) => (path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`));
const SAFE_L = "max(clamp(16px,3vw,40px), env(safe-area-inset-left, 0px))";
const SAFE_R = "max(clamp(16px,3vw,40px), env(safe-area-inset-right, 0px))";

// Nav fija (z 80, mix-blend-mode: difference), logo 30 px, mono 13 px .14em, respeta el notch (safe-area).
// Mobile: menú a pantalla completa en Roboto Condensed 48–64 px, un ítem por línea con rotación alternada; la bolsa sigue en la barra.
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const cartCount = useCartCount();

  useScrollLock(open);
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
      <nav aria-label="Principal" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 80, mixBlendMode: "difference", color: "#F2EFE6", paddingTop: "env(safe-area-inset-top, 0px)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: `10px ${SAFE_R} 10px ${SAFE_L}` }}>
          <Link to="/" aria-label="BADDER — Inicio" className="inline-flex items-center min-h-[44px]" style={{ color: "inherit" }}>
            <img src="/img/logo.webp" alt="Badder" style={{ height: 30, width: "auto", display: "block" }} />
          </Link>

          {/* Escritorio */}
          <div className="hidden lg:flex" style={{ alignItems: "center", gap: "clamp(8px,1.6vw,24px)", flexWrap: "wrap", justifyContent: "flex-end", ...MONO }}>
            {NAV.map((n) => {
              const on = isActive(n.path, pathname);
              return (
                <Link key={n.path} to={n.path} aria-current={on ? "page" : undefined} className="inline-flex items-center min-h-[44px]" style={on ? { textDecoration: "underline", textUnderlineOffset: 6 } : undefined}>
                  {n.label}
                </Link>
              );
            })}
            <Link to={COMMUNITY.path} aria-current={isActive(COMMUNITY.path, pathname) ? "page" : undefined} className="inline-flex items-center min-h-[44px]" style={{ border: "1px solid #F2EFE6", padding: "0 12px" }}>
              {COMMUNITY.label}
            </Link>
            {cart()}
          </div>

          {/* Móvil / tablet: la bolsa queda en la barra, fuera del menú */}
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

      {/* La nav es fija: en las páginas interiores se reserva su alto. En Home la primera sección arranca debajo de ella. */}
      {pathname !== "/" && <div aria-hidden style={{ height: "calc(64px + env(safe-area-inset-top, 0px))" }} />}

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
            style={{ background: "#0A0A09", color: "#F2EFE6", paddingTop: "env(safe-area-inset-top, 0px)", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          >
            <div className="flex items-center justify-between h-16 shrink-0" style={{ padding: `0 ${SAFE_R} 0 ${SAFE_L}`, borderBottom: "1px solid rgba(242,239,230,.4)" }}>
              <span style={MONO}>Menú</span>
              <div className="flex items-center gap-1">
                {cart()}
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
            </div>

            <div className="flex-1 overflow-y-auto" style={{ padding: `16px ${SAFE_R} 32px ${SAFE_L}`, overscrollBehavior: "contain" }}>
              <ul className="flex flex-col">
                {MOBILE.map((n, i) => {
                  const on = isActive(n.path, pathname);
                  const community = n.path === COMMUNITY.path;
                  return (
                    <motion.li
                      key={n.path}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 * i, duration: 0.2 }}
                      style={{ rotate: i % 2 === 0 ? -2 : 1.5, transformOrigin: "left center" }}
                    >
                      <Link
                        to={n.path}
                        onClick={() => setOpen(false)}
                        aria-current={on ? "page" : undefined}
                        className="inline-flex items-center min-h-[56px] my-1"
                        style={{
                          fontFamily: "'Roboto Condensed Bold',sans-serif",
                          fontSize: "clamp(48px,14vw,64px)",
                          lineHeight: 1,
                          textTransform: "uppercase",
                          padding: on || community ? "2px 10px" : "2px 0",
                          background: on ? "var(--a-c,#FF2B1C)" : undefined,
                          color: on ? "#0A0A09" : undefined,
                          border: community && !on ? "2px solid #F2EFE6" : undefined,
                          marginTop: community ? 16 : undefined,
                        }}
                      >
                        {n.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <div className="mt-10 flex justify-between gap-4" style={MONO}>
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
