import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import badderLogo from "@/assets/badder_logo_original.webp";
import { Link, useLocation } from "react-router-dom";
import { mainSections, communitySection, isSectionActive } from "@/data/site";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const communityActive = isSectionActive(communitySection, pathname);

  // Cerrar el menú al navegar
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape para cerrar + bloquear el scroll del fondo mientras está abierto
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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[70] mix-blend-difference">
        <nav aria-label="Principal" className="flex items-center justify-between gap-6 px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4 shrink-0">
            <Link to="/" aria-label="BADDER — Home" className="flex items-center justify-center transition-opacity hover:opacity-80">
              <img src={badderLogo} alt="Badder" className="h-8 w-auto object-contain relative -top-[2px]" />
            </Link>
            <span className="hidden xl:inline font-mono-tight text-muted-foreground">
              Est. 2024 · La Plata, ARG
            </span>
          </div>

          {/* Desktop: desde lg, así las 7 opciones no se pisan en tablet */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            <ul className="flex items-center gap-6 xl:gap-8">
              {mainSections.map((item) => {
                const active = isSectionActive(item, pathname);
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      aria-current={active ? "page" : undefined}
                      className={`relative block font-mono-tight !text-[11px] !tracking-[0.2em] py-2 transition-colors duration-200 ${
                        active ? "text-foreground" : "text-foreground/55 hover:text-foreground"
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={`absolute left-0 bottom-0.5 h-px bg-foreground transition-all duration-300 ${
                          active ? "w-full" : "w-0"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <span aria-hidden className="h-4 w-px bg-foreground/30" />

            <Link
              to={communitySection.path}
              aria-current={communityActive ? "page" : undefined}
              className={`font-mono-tight !text-[11px] !tracking-[0.2em] border px-3 py-1.5 transition-colors duration-200 ${
                communityActive
                  ? "bg-foreground text-background border-foreground"
                  : "border-foreground/50 text-foreground hover:bg-foreground hover:text-background"
              }`}
            >
              ↳ {communitySection.label}
            </Link>
          </div>

          {/* Mobile / tablet */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 -mr-2"
          >
            <span className={`block w-6 h-px bg-foreground transition-transform duration-300 ${open ? "rotate-45 translate-y-[3.5px]" : ""}`} />
            <span className={`block w-6 h-px bg-foreground transition-transform duration-300 ${open ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
          </button>
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col justify-between px-6 pt-24 pb-10 overflow-y-auto lg:hidden"
          >
            <ul className="flex flex-col">
              {mainSections.map((item, i) => {
                const active = isSectionActive(item, pathname);
                return (
                  <motion.li
                    key={item.path}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                    className="border-b border-border"
                  >
                    <Link
                      to={item.path}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className="flex items-baseline justify-between py-3"
                    >
                      <span className={`font-serif text-4xl sm:text-5xl uppercase tracking-wide ${active ? "text-foreground" : "text-foreground/55"}`}>
                        {item.label}
                      </span>
                      <span className={`font-mono-tight ${active ? "text-cobalt" : "text-muted-foreground"}`}>
                        {active ? "● " : ""}
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-10 flex flex-col gap-6"
            >
              <Link
                to={communitySection.path}
                onClick={() => setOpen(false)}
                className="border border-foreground px-5 py-4 font-mono-tight !text-xs !tracking-[0.25em] text-foreground flex justify-between"
              >
                <span>↳ {communitySection.label}</span>
                <span aria-hidden>→</span>
              </Link>
              <div className="flex justify-between font-mono-tight text-muted-foreground">
                <Link to="/contact" onClick={() => setOpen(false)} className="hover:text-foreground">
                  Contacto
                </Link>
                <span>La Plata, ARG</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
