import type { ReactNode } from "react";

interface PageHeaderProps {
  /** Línea de metadata sobre el título (sección / subtítulo). */
  kicker: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
}

// Encabezado de páginas interiores: etiqueta, titular condensado de impacto y una introducción de lectura.
export default function PageHeader({ kicker, title, intro, children }: PageHeaderProps) {
  return (
    <header className="mb-10 md:mb-14 border-b-2 border-border pb-8 md:pb-10">
      <div className="label text-muted-foreground mb-4">{kicker}</div>
      <h1 className="font-display text-hero break-normal [text-wrap:balance]">{title}</h1>
      {intro && <div className="mt-6 text-lg leading-relaxed max-w-[56ch]">{intro}</div>}
      {children}
    </header>
  );
}
