import { Play, Square } from "lucide-react";
import { usePlayerStore } from "@/store/playerStore";
import { playlist } from "@/data/audio";

interface PlayButtonProps {
  trackIndex: number;
  className?: string;
}

// Reproduce el track en el reproductor flotante (no crea otro <audio>).
export default function PlayButton({ trackIndex, className = "" }: PlayButtonProps) {
  const isCurrent = usePlayerStore((s) => s.index === trackIndex && s.isPlaying);
  const playTrack = usePlayerStore((s) => s.playTrack);
  const failed = usePlayerStore((s) => s.failed.includes(trackIndex));
  const track = playlist[trackIndex];
  if (!track) return null;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        playTrack(trackIndex);
      }}
      aria-label={isCurrent ? `Pausar ${track.title}` : `Escuchar ${track.title}`}
      aria-pressed={isCurrent}
      disabled={failed}
      title={failed ? "Audio no disponible" : undefined}
      className={`flex items-center justify-center w-11 h-11 shrink-0 border transition-colors duration-200 disabled:opacity-30 disabled:pointer-events-none ${
        isCurrent
          ? "bg-foreground text-background border-foreground"
          : "bg-background/60 border-foreground/40 text-foreground hover:bg-foreground hover:text-background"
      } ${className}`}
    >
      {isCurrent ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
    </button>
  );
}
