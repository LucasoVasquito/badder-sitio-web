import { Play, Pause } from "lucide-react";
import { usePlayerStore } from "@/store/playerStore";
import { playlist } from "@/data/audio";

interface PlayButtonProps {
  trackIndex: number;
  className?: string;
  /** Con texto ("Escuchar EP") en vez de solo el ícono. */
  label?: string;
}

// Reproduce el track en el reproductor global (no crea otro <audio>).
export default function PlayButton({ trackIndex, className = "", label }: PlayButtonProps) {
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
      className={`inline-flex items-center justify-center gap-3 shrink-0 min-h-[44px] min-w-[44px] border-2 border-foreground label transition-colors disabled:opacity-40 disabled:pointer-events-none ${
        isCurrent ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
      } ${label ? "px-5 py-3 min-h-[48px]" : ""} ${className}`}
    >
      {isCurrent ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
      {label && <span>{isCurrent ? "Pausar" : label}</span>}
    </button>
  );
}
