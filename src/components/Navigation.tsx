import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import badderLogo from "@/assets/badder_logo_original.webp";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Music", path: "/music" },
  { label: "Visuals", path: "/visuals" },
  { label: "Colecciones", path: "/colecciones" },
  { label: "Shop", path: "/shop" },
  { label: "Archivo", path: "/archivo" },
  { label: "Journal", path: "/journal" },
  { label: "Services", path: "/services" },
  { label: "Community", path: "/community" },
  { label: "Contact", path: "/contact" }
];

interface NavigationProps {
  activeSection?: string;
  onNavigate?: (section: string) => void;
}

export default function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Fixed nav bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 mix-blend-difference">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center justify-center transition-opacity hover:opacity-80">
            <img 
              src={badderLogo} 
              alt="Badder" 
              className="h-8 w-auto object-contain relative -top-[2px]" 
            />
          </Link>
          <span className="hidden sm:inline font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
            2024 | La Plata, Buenos Aires, ARG
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => {
            // En la página de inicio, usamos activeSection. En otras, el path.
            const isActive = location.pathname === "/" 
              ? activeSection === item.label 
              : location.pathname === item.path;

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`font-mono-tight tracking-[0.2em] transition-all duration-200 ${
                  isActive
                    ? "text-foreground opacity-100 underline underline-offset-8 decoration-current"
                    : "text-muted-foreground opacity-70 hover:text-foreground hover:opacity-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile burger */}
        <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-1.5">
          <span className={`block w-6 h-px bg-foreground transition-transform duration-300 ${open ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`block w-6 h-px bg-foreground transition-transform duration-300 ${open ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, i) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setOpen(false)}
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="font-serif text-4xl tracking-wider text-foreground block"
                >
                  {item.label}
                </motion.span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
