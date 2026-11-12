import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}

// Visor de imágenes a pantalla completa: flechas, Escape y swipe en mobile.
export default function Lightbox({ images, index, onClose, onIndex }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const open = index !== null && images[index];

  const go = (d: number) => {
    if (index === null) return;
    onIndex((index + d + images.length) % images.length);
  };

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index]);

  if (!open || index === null) return null;
  const img = images[index];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visor de imágenes"
      className="fixed inset-0 z-[80] bg-background/95 flex flex-col"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 md:px-6 py-4 font-mono-tight text-muted-foreground">
        <span>
          {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Cerrar visor" className="p-2 -mr-2 text-foreground hover:opacity-70">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="relative flex-1 min-h-0 flex items-center justify-center px-2 md:px-16">
        <img key={img.src} src={img.src} alt={img.alt} className="max-h-full max-w-full object-contain" />
        {images.length > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Imagen anterior" className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 p-3 bg-background/60 border border-border text-foreground hover:bg-foreground hover:text-background transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Imagen siguiente" className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 p-3 bg-background/60 border border-border text-foreground hover:bg-foreground hover:text-background transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      <div className="px-4 md:px-6 py-4 min-h-[64px] border-t border-border">
        {img.caption && <div className="font-serif text-lg uppercase text-foreground">{img.caption}</div>}
        {img.credit && <div className="font-mono-tight text-muted-foreground mt-1">{img.credit}</div>}
      </div>
    </div>,
    document.body
  );
}
