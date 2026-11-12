import { useRef, useEffect } from "react";
import { Play, Square, SkipForward, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartCount } from "@/store/cartStore";
import { usePlayerStore } from "@/store/playerStore";
import { playlist } from "@/data/audio";

// Se monta una sola vez en App (fuera de <Routes>), así el audio sigue sonando entre páginas.
export default function FloatingPlayer() {
  const { index: currentIndex, isPlaying, toggle: togglePlay, next: nextTrack, setPlaying, markFailed, error } = usePlayerStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  const cartItemCount = useCartCount();
  const currentTrack = playlist[currentIndex];

  // El estado manda; el <audio> lo sigue. Si el navegador bloquea play(), volvemos a pausa.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.play().catch(() => setPlaying(false));
    else audio.pause();
  }, [currentIndex, isPlaying, setPlaying]);

  return (
    <>
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 flex items-center gap-2 md:gap-3" role="region" aria-label="Reproductor BADDER">
      
      <audio 
        ref={audioRef} 
        src={currentTrack.audio} 
        onEnded={nextTrack} 
        onError={() => {
          // Solo cuenta como fallo si se intentó cargar (preload="none" no dispara error al montar)
          if (audioRef.current?.currentSrc) markFailed(currentIndex);
        }}
        preload="none" 
      />

      <button 
        onClick={togglePlay}
        aria-label={isPlaying ? "Pausar" : `Reproducir ${currentTrack.artist} — ${currentTrack.title}`}
        className="flex items-center justify-center w-12 h-12 shrink-0 bg-background/40 border border-foreground/30 text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
      >
        {isPlaying ? (
          <Square className="w-4 h-4 fill-current" />
        ) : (
          <Play className="w-5 h-5 fill-current ml-1" />
        )}
      </button>

      {error && !isPlaying && (
        <span role="status" className="label text-muted-foreground bg-background/70 border border-border px-2 py-1 max-w-[calc(100vw-9.5rem)] truncate">
          {error}
        </span>
      )}

      {/* En celu deja libre el lugar del botón del carrito; en PC hasta 400px */}
      <div 
        className={`overflow-hidden transition-all duration-500 flex items-center gap-2 md:gap-3 ${
          isPlaying ? "max-w-[calc(100vw-9.5rem)] md:max-w-[400px] opacity-100" : "max-w-0 opacity-0"
        }`}
      >
        <img
          src={currentTrack.cover}
          alt={currentTrack.title}
          className="w-12 h-12 shrink-0 object-cover border border-foreground/30 bg-background/40 "
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />

        <div className="flex flex-col justify-center gap-1 overflow-hidden min-w-0 pr-2 md:pr-4">
          <div className="label text-[10px] tracking-[0.2em] uppercase text-muted-foreground flex items-center gap-2 shrink-0">
            <span>NOW PLAYING</span>
            <span className="w-1.5 h-1.5 bg-foreground rounded-full animate-pulse"></span>
          </div>
          
          <div className="flex items-center gap-2 w-full">
            <span className="font-serif text-sm text-foreground truncate">
              {currentTrack.artist} — {currentTrack.title}
            </span>
            
            {/* Le sumamos p-2 (padding) para que el área táctil sea más grande en el celu */}
            <button 
              onClick={nextTrack}
              className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors shrink-0"
              title="Siguiente Track Random"
              aria-label="Siguiente track"
              tabIndex={isPlaying ? 0 : -1}
            >
              <SkipForward className="w-5 h-5 md:w-4 md:h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* BOTÓN DEL CARRITO FLOTANTE (Esquina inferior derecha) */}
    <Link 
      to="/cart"
      aria-label={`Carrito${cartItemCount > 0 ? ` (${cartItemCount})` : ""}`}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center justify-center w-12 h-12 shrink-0 bg-background/40 border border-foreground/30 text-foreground hover:bg-foreground hover:text-background transition-all duration-300 group"
    >
      <ShoppingBag className="w-5 h-5 fill-transparent group-hover:fill-current transition-colors" strokeWidth={1.5} />
      {cartItemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-foreground text-background text-[9px] label w-4 h-4 flex items-center justify-center rounded-none border border-background">
          {cartItemCount}
        </span>
      )}
    </Link>
    </>
  );
}