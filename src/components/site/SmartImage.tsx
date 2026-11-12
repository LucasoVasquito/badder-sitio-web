import { useState, type ImgHTMLAttributes } from "react";

import { thumbOf } from "@/lib/thumbs";

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  /** true = usar la miniatura (grillas). Si falta, cae al original. */
  thumb?: boolean;
}

/** Imagen con lazy loading, miniatura opcional y fondo mientras carga. */
export default function SmartImage({ src, thumb = false, className = "", alt = "", ...rest }: SmartImageProps) {
  const [current, setCurrent] = useState(thumb ? thumbOf(src) : src);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-secondary label text-muted-foreground ${className}`}>
        Imagen no disponible
      </div>
    );
  }

  return (
    <img
      {...rest}
      src={current}
      alt={alt}
      loading={rest.loading ?? "lazy"}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => {
        if (current !== src) setCurrent(src);
        else setFailed(true);
      }}
      className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
    />
  );
}
