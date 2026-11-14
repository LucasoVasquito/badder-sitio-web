import { useRef, useEffect } from "react";
import { usePlayerStore } from "@/store/playerStore";
import { playlist } from "@/data/audio";

// Un solo reproductor para todo el sitio (fuera de <Routes>). Aspecto de la maqueta: bloque negro abajo a la izquierda,
// borde 1px de --a, portada 46 px, artista mono en --a, título Roboto Condensed Bold con ellipsis, ▶/II y ».
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
      style={{ position: "fixed", left: "calc(16px + env(safe-area-inset-left, 0px))", bottom: "calc(16px + env(safe-area-inset-bottom, 0px))", zIndex: 85, display: "flex", alignItems: "center", gap: 10, background: "#0A0A09", border: "1px solid var(--a-c,#FF2B1C)", padding: 6, maxWidth: "calc(100vw - 32px - env(safe-area-inset-left, 0px) - env(safe-area-inset-right, 0px))", color: "#F2EFE6" }}
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
      <img src={currentTrack.cover} alt="" style={{ width: 46, height: 46, objectFit: "cover", display: "block" }} onError={(e) => (e.currentTarget.style.visibility = "hidden")} />
      <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0, maxWidth: 200 }}>
        <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--a-c,#FF2B1C)" }}>{currentTrack.artist.replace(/\s+/g, " ")}</span>
        <span style={{ fontFamily: "'Roboto Condensed Bold',sans-serif", fontSize: 17, textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{currentTrack.title}</span>
        {error && !isPlaying && (
          <span role="status" style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, opacity: 0.7 }}>
            {error}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pausar" : `Reproducir ${currentTrack.artist.replace(/\s+/g, " ")} — ${currentTrack.title}`}
        style={{ all: "unset", cursor: "pointer", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--a-c,#FF2B1C)", color: "#0A0A09", fontFamily: "'Roboto Condensed Bold',sans-serif", fontSize: 16 }}
      >
        {isPlaying ? "II" : "▶"}
      </button>
      <button
        type="button"
        onClick={nextTrack}
        aria-label="Siguiente track"
        style={{ all: "unset", cursor: "pointer", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #F2EFE6", fontFamily: "'Roboto Condensed Bold',sans-serif", fontSize: 16 }}
      >
        »
      </button>
    </div>
  );
}
