/** Botones rectangulares, borde de 2 px, 44 px mínimo de alto. */
export const btn = {
  primary:
    "inline-flex items-center justify-center gap-3 min-h-[48px] border-2 border-foreground bg-foreground text-background px-6 py-3 label transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:pointer-events-none",
  secondary:
    "inline-flex items-center justify-center gap-3 min-h-[48px] border-2 border-foreground text-foreground px-6 py-3 label transition-colors hover:bg-foreground hover:text-background disabled:opacity-40 disabled:pointer-events-none",
  accent:
    "inline-flex items-center justify-center gap-3 min-h-[48px] border-2 border-foreground bg-accent text-accent-foreground px-6 py-3 label transition-colors hover:bg-foreground hover:text-background disabled:opacity-40 disabled:pointer-events-none",
  link: "label text-foreground underline underline-offset-4 decoration-2 hover:bg-accent hover:text-accent-foreground",
};
