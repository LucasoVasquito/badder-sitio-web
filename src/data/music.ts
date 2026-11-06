import { videos, type VideoEntry } from "./visuals";

// Estructura reutilizable para MUSIC. Para sumar un release, agregá un objeto a `releases`.
// `audio` debe coincidir con un archivo de /public/audio cargado en src/data/audio.ts (reproductor).
// `links` solo con URLs verificadas (Bandcamp, Spotify, Beatport, etc.).

export type ReleaseType = "EP" | "TRACK" | "ALBUM" | "REMIX";

export interface ReleaseTrack {
  title: string;
  audio?: string;
  /** Preview = fragmento, no el track completo. */
  preview?: boolean;
}

export interface Release {
  id: string;
  title: string;
  artist: string;
  type: ReleaseType;
  year?: number;
  cover: string;
  note?: string;
  tracks: ReleaseTrack[];
  links: { label: string; url: string }[];
}

export const releases: Release[] = [
  {
    id: "not-rules-ep",
    title: "Not Rules EP",
    artist: "Uriel Galeano",
    type: "EP",
    cover: "/audio/cover (6).webp",
    note: "Incl. Agustin Barbei Psychokiller Remix",
    tracks: [
      {
        title: "Not Rules EP (Incl. Agustin Barbei Psychokiller Remix)",
        audio: "/audio/Uriel Galeano - Not Rules EP (Incl. Agustin Barbei Psychokiller Remix).mp3",
      },
    ],
    links: [],
  },
  {
    id: "beeacks-breck-me-ep",
    title: "Beeacks Breck Me EP",
    artist: "Uriel Galeano",
    type: "EP",
    cover: "/audio/cover (5).webp",
    // Tracklist según la tapa; "Dark Intentions" no tiene audio cargado en el sitio.
    tracks: [
      { title: "Beeacks Breck Me", audio: "/audio/Beeacks Breck Me.mp3" },
      { title: "Dark Intentions" },
      { title: "Devil Voice", audio: "/audio/Devil Voice.mp3" },
      { title: "Uesa", audio: "/audio/Uesa.mp3" },
    ],
    links: [],
  },
  { id: "club-motion", title: "Club Motion", artist: "Anguis", type: "TRACK", cover: "/audio/cover (1).webp", tracks: [{ title: "Club Motion", audio: "/audio/Anguis - Club Motion (Preview).mp3", preview: true }], links: [] },
  { id: "dope-energy", title: "Dope Energy", artist: "Anguis", type: "TRACK", cover: "/audio/cover (2).webp", tracks: [{ title: "Dope Energy", audio: "/audio/Anguis - Dope Energy (Preview).mp3", preview: true }], links: [] },
  { id: "power-up", title: "Power Up", artist: "Anguis", type: "TRACK", cover: "/audio/cover (3).webp", tracks: [{ title: "Power Up", audio: "/audio/Anguis - Power Up (Preview).mp3", preview: true }], links: [] },
  { id: "talk-like-that", title: "Talk Like That", artist: "Anguis", type: "TRACK", cover: "/audio/cover (4).webp", tracks: [{ title: "Talk Like That", audio: "/audio/Anguis - Talk Like That (Preview).mp3", preview: true }], links: [] },
];

const byId = (ids: number[]) => ids.map((id) => videos.find((v) => v.id === id)).filter(Boolean) as VideoEntry[];

/** Sets grabados (showcases y Emergent x Badder). */
export const djSets = byId([2, 3, 4, 5, 6]);

/** Sesiones y registros producidos por BADDER. */
export const sessions = byId([1]);
