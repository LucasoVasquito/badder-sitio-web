import { useRef, useEffect } from "react";
import { Play, Pause, SkipForward } from "lucide-react";
import { usePlayerStore } from "@/store/playerStore";
import { playlist } from "@/data/audio";

// Se monta una sola vez en App (fuera de <Routes>), así el audio sigue sonando entre páginas.
// Barra rectangular oscura abajo; el Footer reserva su altura para que no tape contenido.
export default function FloatingPlayer() {
  const { index: currentIndex, isPlaying, toggle: togglePlay, next: nextTrack, setPlaying, markFailed, error } = usePlayerStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = playlist[currentIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.play().catch(() => setPlaying(false));
    else audio.pause();
  }, [currentIndex, isPlaying, setPlaying]);

  return (
    <div
      role="region"
      aria-label="Reproductor BADDER"
      className="surface-dark fixed bottom-0 left-0 right-0 md:right-auto md:left-6 md:bottom-6 md:w-[460px] z-50 flex items-stretch border-t border-foreground/50 md:border md:border-foreground/50"
    >
      <audio
        ref={audioRef}
        src={currentTrack.audio}
        onEnded={nextTrack}
        onError={() => {
          if (audioRef.current?.currentSrc) markFailed(currentIndex);
        }}
        preload="none"
      />

      <img
        src={currentTrack.cover}
        alt=""
        className="w-16 h-16 shrink-0 object-cover"
        onError={(e) => {
          e.currentTarget.style.visibility = "hidden";
        }}
      />

      <div className="flex-1 min-w-0 flex flex-col justify-center px-3 py-1">
        <span className="label text-muted-foreground !text-xs">{isPlaying ? "Sonando" : "Escuchar"}</span>
        <span className="text-sm font-semibold truncate">
          {currentTrack.artist} — {currentTrack.title}
        </span>
        {error && !isPlaying && (
          <span role="status" className="text-xs text-muted-foreground truncate">
            {error}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pausar" : `Reproducir ${currentTrack.artist} — ${currentTrack.title}`}
        className="w-16 shrink-0 flex items-center justify-center bg-accent text-accent-foreground hover:brightness-95 focus-visible:outline-paper"
      >
        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
      </button>
      <button
        type="button"
        onClick={nextTrack}
        aria-label="Siguiente track"
        className="w-14 shrink-0 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
      >
        <SkipForward className="w-5 h-5" />
      </button>
    </div>
  );
}
