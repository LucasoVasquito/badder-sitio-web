import { create } from "zustand";
import { playlist } from "@/data/audio";

interface PlayerState {
  index: number;
  isPlaying: boolean;
  /** Índices de tracks cuyo archivo no se pudo cargar. */
  failed: number[];
  error: string | null;
  /** Reproduce un track concreto; si ya está sonando, lo pausa. */
  playTrack: (index: number) => void;
  toggle: () => void;
  setPlaying: (playing: boolean) => void;
  /** Pasa al siguiente track en el orden de la maqueta. */
  next: () => void;
  markFailed: (index: number) => void;
}

// Orden de la maqueta: Not Rules, Beeacks, Club Motion, Dope Energy, Power Up, Talk Like That.
export const ORDER = ["Not Rules EP", "Beeacks Breck Me", "Club Motion", "Dope Energy", "Power Up", "Talk Like That"]
  .map((t) => playlist.findIndex((p) => p.title.toLowerCase().startsWith(t.toLowerCase())))
  .filter((i) => i >= 0);

// Siguiente en orden (con vuelta al inicio), salteando los que fallaron. Si el actual no está en la lista, arranca en el primero.
const nextInOrder = (current: number, failed: number[]) => {
  const pool = ORDER.filter((i) => !failed.includes(i));
  if (pool.length === 0) return current;
  const pos = pool.indexOf(current);
  return pool[(pos + 1) % pool.length];
};

// Arranca en el primer track (Not Rules EP), pero nunca reproduce solo: siempre espera un clic.
export const usePlayerStore = create<PlayerState>((set, get) => ({
  index: ORDER[0] ?? 0,
  isPlaying: false,
  failed: [],
  error: null,
  playTrack: (index) => {
    const { index: current, isPlaying, failed } = get();
    if (failed.includes(index)) return set({ error: "Este track no está disponible." });
    if (current === index) set({ isPlaying: !isPlaying, error: null });
    else set({ index, isPlaying: true, error: null });
  },
  toggle: () => set({ isPlaying: !get().isPlaying, error: null }),
  setPlaying: (isPlaying) => set({ isPlaying }),
  next: () => set({ index: nextInOrder(get().index, get().failed), error: null }),
  markFailed: (index) =>
    set({
      failed: [...new Set([...get().failed, index])],
      isPlaying: false,
      error: "No se pudo cargar el audio.",
    }),
}));

/** Índice en la playlist del reproductor a partir del inicio del título. */
export const findTrackIndex = (titleStart: string) =>
  playlist.findIndex((t) => t.title.toLowerCase().startsWith(titleStart.toLowerCase()));

/** Índice en la playlist a partir de la ruta del archivo. */
export const findTrackByAudio = (audio?: string) => (audio ? playlist.findIndex((t) => t.audio === audio) : -1);
