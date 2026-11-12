import { Link } from "react-router-dom";

interface SectionHeaderProps {
  index: string;
  title: string;
  kicker?: string;
  link?: { to: string; label: string };
}

// Encabezado común de los módulos de la Home: número, titular y un único acceso.
export default function SectionHeader({ index, title, kicker, link }: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 mb-10 md:mb-14">
      <div>
        <div className="label text-muted-foreground mb-3">
          <span className="text-foreground">{index}</span> — {kicker}
        </div>
        <h2 className="font-display text-4xl md:text-6xl text-foreground leading-[0.95] tracking-tight">
          {title}
        </h2>
      </div>
      {link && (
        <Link
          to={link.to}
          className="group label text-foreground border-b border-foreground/40 pb-1 hover:border-foreground transition-colors"
        >
          {link.label} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </Link>
      )}
    </div>
  );
}
