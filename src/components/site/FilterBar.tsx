interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterBarProps {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

// Filtros tipo pestaña: estado activo con subrayado de 2 px. Scroll horizontal en móvil.
export default function FilterBar({ label, options, value, onChange }: FilterBarProps) {
  return (
    <div role="group" aria-label={label} className="-mx-5 px-5 md:mx-0 md:px-0 overflow-x-auto border-b border-border">
      <div className="flex gap-6 w-max md:w-auto md:flex-wrap">
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              aria-pressed={active}
              className={`label h-11 whitespace-nowrap border-b-2 -mb-px transition-colors ${
                active ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground hover:border-foreground/40"
              }`}
            >
              {o.label}
              {typeof o.count === "number" && <span className="ml-2 font-normal">{o.count}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
