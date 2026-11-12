import { photoCount, type ArchiveProject } from "@/data/projects";

/** Resumen de material de un proyecto de archivo ("48 fotos · 2 videos"). */
export const summaryLine = (p: ArchiveProject) =>
  [
    photoCount(p) && `${photoCount(p)} fotos`,
    p.graphics.length && `${p.graphics.length} ${p.graphics.length === 1 ? "pieza gráfica" : "piezas gráficas"}`,
    p.designs.length && `${p.designs.length} diseños`,
    p.process.length && `${p.process.length} procesos`,
    p.videos.length && `${p.videos.length} video${p.videos.length === 1 ? "" : "s"}`,
  ]
    .filter(Boolean)
    .join(" · ");
