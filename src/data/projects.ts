// ARCHIVE organizado por proyectos / acontecimientos.
// Se arma a partir de los datos existentes (archive.ts, collections.ts, visuals.ts) sin duplicarlos.
// Solo se agrupa material que corresponde al mismo proyecto (mismo nombre o descripción explícita).
// Para sumar un proyecto nuevo: agregá un objeto en `projects` (ver CONTENIDO.md → "Archive").

import { photos, flyers, moodboards } from "./archive";
import { collections } from "./collections";
import { videos, motionProjects } from "./visuals";

export type ArchiveCategory = "photography" | "graphic-design" | "video" | "collections" | "processes";

export const categoryLabels: Record<ArchiveCategory, string> = {
  photography: "Photography",
  "graphic-design": "Graphic design",
  video: "Video",
  collections: "Collections",
  processes: "Processes",
};

export interface ArchiveImage {
  src: string;
  title?: string;
  credit?: string;
}

export interface PhotoSet {
  /** id del álbum original (compatibilidad con /archive?album=) */
  albumId: string;
  title: string;
  credit?: string;
  images: ArchiveImage[];
}

export interface ArchiveVideo {
  title: string;
  url: string;
  thumb: string;
  date?: string;
  duration?: string;
  kind: "DJ set" | "Motion" | "Entrevista" | "Visualizer";
  credit?: string;
  description?: string;
}

export interface ArchiveProject {
  id: string;
  title: string;
  year: number;
  kind: "Evento" | "Drop" | "Serie fotográfica" | "Video" | "Gráfica";
  location?: string;
  season?: string;
  summary?: string;
  cover: string;
  credits: { role: string; names: string }[];
  photoSets: PhotoSet[];
  graphics: ArchiveImage[];
  videos: ArchiveVideo[];
  /** Drops: diseños terminados y material de proceso (bocetos, conceptos, mockups, referencias). */
  designs: ArchiveImage[];
  process: ArchiveImage[];
}

// ---------- helpers que leen los datos existentes ----------

const yearOf = (s: string) => Number(s.match(/20\d\d/)?.[0] ?? 0);

const album = (id: string): PhotoSet => {
  const p = photos.find((x) => x.id === id)!;
  const credit = p.meta.split("/")[0].trim();
  return {
    albumId: p.id,
    title: p.title,
    credit: credit && credit !== "-" ? credit : undefined,
    images: Array.from({ length: p.imageCount }, (_, i) => ({ src: `/${p.folder}/foto (${i + 1}).webp` })),
  };
};

const flyer = (id: string): ArchiveImage => {
  const f = flyers.find((x) => x.id === id)!;
  return { src: f.thumb, title: f.title, credit: f.meta.split("/")[0].trim() };
};

const motionVideo = (id: number): ArchiveVideo => {
  const m = motionProjects.find((x) => x.id === id)!;
  return { title: m.title, url: m.link, thumb: m.thumb, date: m.date, kind: "Motion", credit: m.designer, description: m.desc };
};

const setVideo = (id: number, kind: ArchiveVideo["kind"] = "DJ set"): ArchiveVideo => {
  const v = videos.find((x) => x.id === id)!;
  const credit = [v.master && `Master: ${v.master}`, v.edition && `Edición: ${v.edition}`].filter(Boolean).join(" · ");
  return { title: v.title, url: v.url, thumb: v.thumb, date: v.date, duration: v.duration, kind, credit: credit || undefined };
};

// Bocetos, conceptos, mockups y versiones beta = proceso
const PROCESS = /concepto|ccncepto|mockup|beta|descartado|prototipo/i;
const moodboardSrcs = new Set(moodboards.map((m) => m.thumb));

const drop = (collectionId: number) => {
  const c = collections.find((x) => x.id === collectionId)!;
  const items = c.lookbook.map((l) => ({ src: `/${c.folder}/${l.file}`, title: l.title, credit: l.designers }));
  return {
    c,
    designs: items.filter((i) => !PROCESS.test(i.title) && !moodboardSrcs.has(i.src)),
    process: items.filter((i) => PROCESS.test(i.title) || moodboardSrcs.has(i.src)),
  };
};

const thumbOfAlbum = (id: string) => photos.find((p) => p.id === id)!.thumb;

const base = { credits: [], photoSets: [], graphics: [], videos: [], designs: [], process: [] } as Pick<
  ArchiveProject,
  "credits" | "photoSets" | "graphics" | "videos" | "designs" | "process"
>;

const dropProject = (collectionId: number, id: string, extra: Partial<ArchiveProject> = {}): ArchiveProject => {
  const { c, designs, process } = drop(collectionId);
  const designers = [...new Set(c.lookbook.flatMap((l) => (l.designers ? l.designers.split(" - ") : [])).map((s) => s.trim()))];
  return {
    ...base,
    id,
    title: c.name,
    year: 2000 + Number(c.season.slice(2)),
    season: c.season,
    kind: "Drop",
    summary: c.description,
    cover: c.img,
    designs,
    process,
    credits: designers.length ? [{ role: "Diseño", names: designers.join(", ") }] : [],
    ...extra,
  };
};

// ---------- proyectos ----------

export const projects: ArchiveProject[] = [
  {
    ...base,
    id: "rosset",
    title: "Badder Showcase — Rosset Club",
    year: 2025,
    kind: "Evento",
    location: "Rosset Club",
    cover: thumbOfAlbum("rosset"),
    photoSets: [album("rosset")],
    graphics: [flyer("f8"), flyer("f9"), flyer("f10"), flyer("f11")],
    videos: [motionVideo(7)],
    credits: [
      { role: "Fotografía", names: "Juan Francisco Arias" },
      { role: "Flyers y motion", names: "Lucas Nicolas Bengochea" },
    ],
  },
  {
    ...base,
    id: "emergent",
    title: "Emergent x Badder",
    year: 2024,
    kind: "Evento",
    cover: thumbOfAlbum("emergent"),
    photoSets: [album("emergent")],
    graphics: [flyer("f4")],
    videos: [motionVideo(3), setVideo(5), setVideo(6)],
    credits: [
      { role: "Flyer y teaser", names: "Lucas Nicolas Bengochea" },
      { role: "Master sets", names: "Uriel Galeano - Francisco Anguis" },
      { role: "Edición sets", names: "Lucas Nicolas Bengochea" },
    ],
  },
  {
    ...base,
    id: "tom",
    title: "Badder Showcase — Tom",
    year: 2024,
    kind: "Evento",
    cover: thumbOfAlbum("tom"),
    photoSets: [album("tom")],
    graphics: [flyer("f2")],
    videos: [motionVideo(1)],
    credits: [
      { role: "Fotografía", names: "Juan Francisco Arias" },
      { role: "Flyer y motion", names: "Lucas Nicolas Bengochea" },
    ],
  },
  {
    ...base,
    id: "capital",
    title: "011 — Capital Federal",
    year: 2025,
    kind: "Serie fotográfica",
    location: "Capital Federal",
    cover: thumbOfAlbum("capital"),
    photoSets: [album("capital")],
    credits: [{ role: "Fotografía", names: "Arias - Anguis - Galeano - Sessa" }],
  },
  {
    ...base,
    id: "cuchate.esta",
    title: "Uriel Galeano — Cuchate.esta",
    year: 2025,
    kind: "Serie fotográfica",
    cover: thumbOfAlbum("cuchate.esta"),
    photoSets: [album("cuchate.esta")],
    credits: [{ role: "Fotografía", names: "Juan Francisco Arias" }],
  },
  {
    ...base,
    id: "lpsport1",
    title: "Evento — La Plata Sport 1",
    year: 2025,
    kind: "Evento",
    location: "La Plata",
    cover: thumbOfAlbum("lpsport1"),
    photoSets: [album("lpsport1")],
    credits: [{ role: "Fotografía", names: "Arias - Anguis - Cubilla" }],
  },
  {
    ...base,
    id: "lpsport2",
    title: "Evento — La Plata Sport 2",
    year: 2025,
    kind: "Evento",
    location: "La Plata",
    cover: thumbOfAlbum("lpsport2"),
    photoSets: [album("lpsport2")],
    credits: [{ role: "Fotografía", names: "Arias - Ariotti - @Tripa.sbk" }],
  },
  {
    ...base,
    id: "verano2025",
    title: "Secuencias: Verano 2025",
    year: 2025,
    kind: "Serie fotográfica",
    cover: thumbOfAlbum("verano2025"),
    photoSets: [album("verano2025")],
    credits: [{ role: "Fotografía", names: "Juan Francisco Arias" }],
  },
  {
    ...base,
    id: "flash",
    title: "Ediciones Flash",
    year: 2025,
    kind: "Serie fotográfica",
    cover: thumbOfAlbum("flash"),
    photoSets: [album("flash")],
    credits: [{ role: "Fotografía", names: "Juan Francisco Arias" }],
  },
  {
    ...base,
    id: "levels",
    title: "Levels",
    year: 2025,
    kind: "Gráfica",
    cover: flyer("f6").src,
    graphics: [flyer("f6")],
    credits: [{ role: "Flyer", names: "Lucas Nicolas Bengochea" }],
  },

  // Drops (colección + sesiones de fotos + promo)
  dropProject(4, "drop-4", { title: "DROP 4 (Unreleased)", summary: collections.find((c) => c.id === 4)!.description }),
  dropProject(3, "drop-3", { photoSets: [album("sesion")] }),
  dropProject(2, "drop-2", { photoSets: [album("nahu"), album("goro")], videos: [motionVideo(5)] }),
  dropProject(1, "drop-1"),

  // Videos sueltos (sin otro material asociado de forma comprobable)
  ...[2, 3, 4].map((id): ArchiveProject => {
    const v = setVideo(id);
    return { ...base, id: `video-${id}`, title: v.title, year: yearOf(v.date ?? ""), kind: "Video", cover: v.thumb, videos: [v] };
  }),
  { ...base, id: "video-1", title: setVideo(1).title, year: 2024, kind: "Video", cover: setVideo(1).thumb, videos: [setVideo(1, "Entrevista")] },
  {
    ...base,
    id: "you-look-at-me",
    title: "You Look At Me (Original Mix) — Visual concept",
    year: 2024,
    kind: "Video",
    cover: motionVideo(12).thumb,
    videos: [{ ...motionVideo(12), kind: "Visualizer" }],
    credits: [{ role: "Dirección de arte / motion", names: "Lucas Nicolas Bengochea" }],
  },
];

export const categoriesOf = (p: ArchiveProject): ArchiveCategory[] => {
  const c: ArchiveCategory[] = [];
  if (p.photoSets.length) c.push("photography");
  if (p.graphics.length || p.designs.length) c.push("graphic-design");
  if (p.videos.length) c.push("video");
  if (p.kind === "Drop") c.push("collections");
  if (p.process.length) c.push("processes");
  return c;
};

export const photoCount = (p: ArchiveProject) => p.photoSets.reduce((n, s) => n + s.images.length, 0);

export const getProject = (id: string) => projects.find((p) => p.id === id);

/** Compatibilidad con los enlaces viejos /archive?album=<id> */
export const projectForAlbum = (albumId: string) => projects.find((p) => p.photoSets.some((s) => s.albumId === albumId));

export const archiveYears = [...new Set(projects.map((p) => p.year).filter(Boolean))].sort((a, b) => b - a);
