import { Link } from "react-router-dom";

interface SectionHeaderProps {
  title: string;
  kicker?: string;
  link?: { to: string; label: string };
}

// Encabezado de módulo: filete de 2 px, título condensado y un único acceso. Sin numeración decorativa.
export default function SectionHeader({ title, kicker, link }: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 mb-8 md:mb-12 pt-4 border-t-2 border-border">
      <div>
        {kicker && <div className="label text-muted-foreground mb-2">{kicker}</div>}
        <h2 className="font-display text-title">{title}</h2>
      </div>
      {link && (
        <Link to={link.to} className="label inline-flex items-center min-h-[44px] underline underline-offset-4 decoration-2 hover:bg-accent hover:text-accent-foreground">
          {link.label} <span aria-hidden className="ml-2">→</span>
        </Link>
      )}
    </div>
  );
}
