import { useState, type ElementType, type ReactNode } from "react";
import { DISPLAY_FONTS, type DisplayFontKey } from "./fonts";

const read = (id: string): DisplayFontKey | null => {
  try {
    const v = localStorage.getItem(`badder-font:${id}`);
    return DISPLAY_FONTS.some((f) => f.key === v) ? (v as DisplayFontKey) : null;
  } catch {
    return null;
  }
};

/**
 * Título display: al hacer click rota su tipografía por el set de 13 y recuerda la elección (localStorage, por id).
 * El título es un botón dentro del encabezado, así que también funciona con teclado.
 */
export default function FontCycleTitle({
  id,
  font,
  as: Tag = "h2",
  className = "",
  children,
}: {
  id: string;
  /** Tipografía de origen del título. */
  font: DisplayFontKey;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const [key, setKey] = useState<DisplayFontKey>(() => read(id) ?? font);
  const cls = DISPLAY_FONTS.find((f) => f.key === key)?.cls ?? "f-anton";

  const cycle = () => {
    const i = DISPLAY_FONTS.findIndex((f) => f.key === key);
    const next = DISPLAY_FONTS[(i + 1) % DISPLAY_FONTS.length].key;
    setKey(next);
    try {
      localStorage.setItem(`badder-font:${id}`, next);
    } catch {
      /* sin almacenamiento: el cambio vale igual para esta visita */
    }
  };

  return (
    <Tag className={`${cls} ${className}`}>
      <button type="button" onClick={cycle} title="Click: cambiar tipografía" className="block text-left w-full cursor-pointer [font:inherit] [letter-spacing:inherit] [text-transform:inherit] [line-height:inherit]">
        {children}
      </button>
    </Tag>
  );
}
