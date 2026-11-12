import { useEffect } from "react";

const SITE = "BADDER";
const DEFAULT_DESCRIPTION =
  "BADDER — espacio creativo y plataforma cultural independiente nacida de la música electrónica underground. La Plata, Argentina.";
const DEFAULT_IMAGE = "/badder-icon.png";

const setMeta = (attr: "name" | "property", key: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
};

interface PageMeta {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
}

/** Título, descripción y Open Graph por página (SPA: se actualiza al navegar). */
export function usePageMeta({ title, description, image, type = "website" }: PageMeta) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE}` : `${SITE} — Independent creative culture`;
    const desc = description ?? DEFAULT_DESCRIPTION;
    const img = new URL(image ?? DEFAULT_IMAGE, window.location.origin).href;
    document.title = fullTitle;
    setMeta("name", "description", desc);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:image", img);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", window.location.href);
    setMeta("name", "twitter:image", img);
  }, [title, description, image, type]);
}
