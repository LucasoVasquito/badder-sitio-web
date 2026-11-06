// Las miniaturas viven en /public/_thumbs con la misma ruta que el original
// (se generan con `npm run thumbs`). Los originales no se tocan.
export const thumbOf = (src: string) => {
  if (!src.startsWith("/") || src.startsWith("/_thumbs/")) return src;
  // Imágenes importadas desde src/assets: /src/assets/goro.webp (dev) o /assets/goro-AbC123xy.webp (build)
  const asset = src.match(/^\/(?:src\/)?assets\/(.+?)(?:-[A-Za-z0-9_-]{8})?\.(webp|png|jpe?g)$/i);
  if (asset) return `/_thumbs/assets/${asset[1]}.${asset[2]}`;
  return `/_thumbs${src}`;
};
