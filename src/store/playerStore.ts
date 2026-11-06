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
  /** Salta a un track aleatorio distinto del actual (y que no haya fallado). */
  next: () => void;
  markFailed: (index: number) => void;
}

const randomOther = (current: number, failed: number[]) => {
  const options = playlist.map((_, i) => i).filter((i) => i !== current && !failed.includes(i));
  if (options.length === 0) return current;
  return options[Math.floor(Math.random() * options.length)];
};

// Arranca en un track al azar, pero nunca reproduce solo: siempre espera un clic.
export const usePlayerStore = create<PlayerState>((set, get) => ({
  index: Math.floor(Math.random() * playlist.length),
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
  next: () => set({ index: randomOther(get().index, get().failed), error: null }),
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
