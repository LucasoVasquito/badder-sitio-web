import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, X } from "lucide-react";
import badderLogo from "@/assets/badder_logo_original.webp";
import { mainSections, communitySection, isSectionActive } from "@/data/site";
import { useCartCount } from "@/store/cartStore";

// Cabecera fija con mix-blend-mode: difference: se invierte sola sobre secciones tinta, papel o de acento.
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const cartCount = useCartCount();
  const communityActive = isSectionActive(communitySection, pathname);
  const cartActive = pathname === "/cart";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape cierra el menú; mientras está abierto no se desplaza el fondo.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const link = (active: boolean) =>
    `label relative inline-flex items-center h-11 px-1 border-b-2 transition-colors ${
      active ? "border-white" : "border-transparent hover:border-white/50"
    }`;

  return (
    <>
      <header className="sticky top-0 z-[70] text-white mix-blend-difference">
        <nav aria-label="Principal" className="flex items-center justify-between gap-6 px-5 md:px-12 h-16 max-w-[1440px] mx-auto">
          <Link to="/" aria-label="BADDER — Inicio" className="shrink-0 flex items-center tap">
            <img src={badderLogo} alt="Badder" className="h-12 w-auto object-contain -my-2" />
          </Link>

          {/* Escritorio */}
          <div className="hidden lg:flex items-center gap-7">
            <ul className="flex items-center gap-6">
              {mainSections.map((item) => {
                const active = isSectionActive(item, pathname);
                return (
                  <li key={item.path}>
                    <Link to={item.path} aria-current={active ? "page" : undefined} className={link(active)}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              to={communitySection.path}
              aria-current={communityActive ? "page" : undefined}
              className={`label inline-flex items-center h-11 px-4 border-2 border-white transition-colors ${
                communityActive ? "bg-white text-black" : "hover:bg-white hover:text-black"
              }`}
            >
              {communitySection.label}
            </Link>
            <Link
              to="/cart"
              aria-label={`Carrito${cartCount > 0 ? ` (${cartCount})` : ""}`}
              aria-current={cartActive ? "page" : undefined}
              className={`relative tap inline-flex items-center justify-center border-b-2 ${cartActive ? "border-white" : "border-transparent hover:border-white/50"}`}
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.75} />
              {cartCount > 0 && (
                <span className="label absolute -top-0.5 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-white text-black !text-[11px]">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Móvil / tablet */}
          <div className="lg:hidden flex items-center gap-1">
            <Link to="/cart" aria-label={`Carrito${cartCount > 0 ? ` (${cartCount})` : ""}`} className="relative tap inline-flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" strokeWidth={1.75} />
              {cartCount > 0 && (
                <span className="label absolute top-1 right-0 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-white text-black !text-[11px]">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="label tap inline-flex items-center px-3 border-2 border-white"
            >
              {open ? "Cerrar" : "Menú"}
            </button>
          </div>
        </nav>
      </header>

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
            className="fixed inset-0 z-[80] bg-background text-foreground flex flex-col lg:hidden"
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-border shrink-0">
              <span className="label">Menú</span>
              <button type="button" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} aria-label="Cerrar menú" className="w-11 h-11 inline-flex items-center justify-center border-2 border-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pb-8">
              <ul className="flex flex-col">
                {mainSections.map((item) => {
                  const active = isSectionActive(item, pathname);
                  return (
                    <li key={item.path} className="border-b border-border">
                      <Link
                        to={item.path}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className="flex items-center justify-between min-h-[56px] py-2"
                      >
                        <span className={`font-display f-akira !text-[1.6rem] ${active ? "bg-accent text-accent-foreground px-2 -mx-2" : ""}`}>{item.label}</span>
                        <span aria-hidden className="label">→</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <Link
                to={communitySection.path}
                onClick={() => setOpen(false)}
                className={`mt-6 label flex items-center justify-between min-h-[52px] px-4 border-2 border-foreground ${communityActive ? "bg-accent text-accent-foreground" : ""}`}
              >
                <span>{communitySection.label}</span>
                <span aria-hidden>→</span>
              </Link>

              <div className="mt-8 flex justify-between label text-muted-foreground">
                <Link to="/contact" onClick={() => setOpen(false)} className="underline underline-offset-4 hover:text-foreground">
                  Contacto
                </Link>
                <span>La Plata, Argentina</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
