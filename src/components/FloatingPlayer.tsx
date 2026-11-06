import { useState, useRef, useEffect } from "react";
import { Play, Square, SkipForward, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";

// 🎧 1. TU PLAYLIST:
const playlist = [
  {
    artist: "Anguis",
    title: "Club Motion",
    audio: "/audio/Anguis - Club Motion (Preview).mp3",
    cover: "/audio/cover (1).webp"
  },
  {
    artist: "Anguis",
    title: "Dope Energy",
    audio: "/audio/Anguis - Dope Energy (Preview).mp3",
    cover: "/audio/cover (2).webp"
  },
  {
    artist: "Anguis",
    title: "Power Up",
    audio: "/audio/Anguis - Power Up (Preview).mp3",
    cover: "/audio/cover (3).webp"
  },
  {
    artist: "Anguis",
    title: "Talk Like That",
    audio: "/audio/Anguis - Talk Like That (Preview).mp3",
    cover: "/audio/cover (4).webp"
  },
  {
    artist: "Uriel  Galeano",
    title: "Beeacks Breck Me",
    audio: "/audio/Beeacks Breck Me.mp3",
    cover: "/audio/cover (5).webp"
  },
  {
    artist: "Uriel  Galeano",
    title: "Devil Voice",
    audio: "/audio/Devil Voice.mp3",
    cover: "/audio/cover (5).webp"
  },
  {
    artist: "Uriel  Galeano",
    title: "Uesa",
    audio: "/audio/Uesa.mp3",
    cover: "/audio/cover (5).webp"
  },
  {
    artist: "Uriel  Galeano",
    title: "Not Rules EP (Incl. Agustin Barbei Psychokiller Remix)",
    audio: "/audio/Uriel Galeano - Not Rules EP (Incl. Agustin Barbei Psychokiller Remix).mp3",
    cover: "/audio/cover (6).webp"
  },
];

export default function FloatingPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // EL PRIMER CAMBIO MÁGICO: Cuando entrás a la web, elige un número al azar de entrada
  const [currentIndex, setCurrentIndex] = useState(() => 
    Math.floor(Math.random() * playlist.length)
  ); 
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const cartItemCount = useCartStore((state) => state.items.length);
  const currentTrack = playlist[currentIndex];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // EL SEGUNDO CAMBIO MÁGICO: El botón Next ahora tira los dados
  const nextTrack = () => {
    setCurrentIndex((prevIndex) => {
      // Si solo hay un tema en la lista, no hacemos el loop infinito
      if (playlist.length <= 1) return prevIndex;
      
      let newIndex;
      // Sigue tirando los dados hasta que toque un tema DISTINTO al actual
      do {
        newIndex = Math.floor(Math.random() * playlist.length);
      } while (newIndex === prevIndex);
      
      return newIndex;
    });
  };

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [currentIndex, isPlaying]);

  return (
    <>
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 flex items-center gap-2 md:gap-3">
      
      <audio 
        ref={audioRef} 
        src={currentTrack.audio} 
        onEnded={nextTrack} 
        preload="none" 
      />

      <button 
        onClick={togglePlay}
        className="flex items-center justify-center w-12 h-12 shrink-0 bg-background/40 backdrop-blur-md border border-foreground/30 text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
      >
        {isPlaying ? (
          <Square className="w-4 h-4 fill-current" />
        ) : (
          <Play className="w-5 h-5 fill-current ml-1" />
        )}
      </button>

      {/* ACÁ ESTÁ EL MEDIA QUERY MÁGICO: max-w-[65vw] en celu, md:max-w-[400px] en PC */}
      <div 
        className={`overflow-hidden transition-all duration-500 flex items-center gap-2 md:gap-3 ${
          isPlaying ? "max-w-[65vw] md:max-w-[400px] opacity-100" : "max-w-0 opacity-0"
        }`}
      >
        <img
          src={currentTrack.cover}
          alt={currentTrack.title}
          className="w-12 h-12 shrink-0 object-cover border border-foreground/30 bg-background/40 backdrop-blur-md"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />

        <div className="flex flex-col justify-center gap-1 overflow-hidden min-w-0 pr-2 md:pr-4">
          <div className="font-mono-tight text-[10px] tracking-[0.2em] uppercase text-muted-foreground flex items-center gap-2 shrink-0">
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
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center justify-center w-12 h-12 shrink-0 bg-background/40 backdrop-blur-md border border-foreground/30 text-foreground hover:bg-foreground hover:text-background transition-all duration-300 group"
    >
      <ShoppingBag className="w-5 h-5 fill-transparent group-hover:fill-current transition-colors" strokeWidth={1.5} />
      {cartItemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-foreground text-background text-[9px] font-mono-tight w-4 h-4 flex items-center justify-center rounded-none border border-background">
          {cartItemCount}
        </span>
      )}
    </Link>
    </>
  );
}