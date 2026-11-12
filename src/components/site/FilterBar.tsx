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

// Filtros tipo pestaña, con scroll horizontal en mobile en vez de romper la línea.
export default function FilterBar({ label, options, value, onChange }: FilterBarProps) {
  return (
    <div role="group" aria-label={label} className="-mx-6 px-6 md:mx-0 md:px-0 overflow-x-auto">
      <div className="flex gap-2 w-max md:w-auto md:flex-wrap">
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              aria-pressed={active}
              className={`label px-3 py-2 border whitespace-nowrap transition-colors duration-200 ${
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground"
              }`}
            >
              {o.label}
              {typeof o.count === "number" && <span className="ml-2 opacity-60">{o.count}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
