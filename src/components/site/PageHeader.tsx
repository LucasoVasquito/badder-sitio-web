import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageHeaderProps {
  /** Línea de metadata sobre el título (sección / subtítulo). */
  kicker: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
}

// Encabezado común de páginas interiores: misma jerarquía que la Home
// (mono para metadata, Playfair para el titular, sans para el texto).
export default function PageHeader({ kicker, title, intro, children }: PageHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-12 md:mb-16 border-b border-border pb-10 md:pb-12"
    >
      <div className="font-mono-tight text-muted-foreground mb-4">{kicker}</div>
      <h1 className="font-serif uppercase text-foreground leading-[0.9] tracking-tight text-[clamp(2.75rem,9vw,6.5rem)] break-words">
        {title}
      </h1>
      {intro && <div className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-xl">{intro}</div>}
      {children}
    </motion.header>
  );
}
