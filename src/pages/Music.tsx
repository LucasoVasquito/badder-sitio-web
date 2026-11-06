import { motion } from "framer-motion";
import PresskitsSection from "../components/PresskitsSection";

const latestReleases = [
  { title: "Not Rules EP", artist: "Uriel Galeano", cover: "/audio/cover (6).webp", type: "RELEASE" },
  { title: "Club Motion", artist: "Anguis", cover: "/audio/cover (1).webp", type: "TRACK" },
  { title: "Dope Energy", artist: "Anguis", cover: "/audio/cover (2).webp", type: "TRACK" },
  { title: "Power Up", artist: "Anguis", cover: "/audio/cover (3).webp", type: "TRACK" },
];

const urielTracks = [
  { title: "Not Rules EP", artist: "Uriel Galeano", cover: "/audio/cover (6).webp", type: "EP" },
  { title: "Psychokiller Remix", artist: "Uriel Galeano", cover: "/audio/cover (5).webp", type: "REMIX" },
  { title: "Devil Voice", artist: "Uriel Galeano", cover: "/audio/cover (4).webp", type: "TRACK" },
  { title: "Uesa", artist: "Uriel Galeano", cover: "/audio/cover (3).webp", type: "TRACK" },
];

const anguisTracks = [
  { title: "Club Motion", artist: "Anguis", cover: "/audio/cover (1).webp", type: "TRACK" },
  { title: "Dope Energy", artist: "Anguis", cover: "/audio/cover (2).webp", type: "TRACK" },
  { title: "Power Up", artist: "Anguis", cover: "/audio/cover (3).webp", type: "TRACK" },
  { title: "Talk Like That", artist: "Anguis", cover: "/audio/cover (4).webp", type: "TRACK" },
];

const recommendedPlaylists = [
  { title: "Badder Selects", desc: "Curated techno, industrial, and experimental loops.", cover: "/flyers/foto 5.webp" },
  { title: "Club Trax", desc: "High-energy club tools for the late hours.", cover: "/flyers/foto 6.webp" },
  { title: "Audio Archive Sessions", desc: "Live sets, podcast guest mixes, and soundscapes.", cover: "/flyers/foto 7.webp" },
];

export default function Music() {
  return (
    <main className="bg-background min-h-screen pt-32 pb-16 overflow-hidden">
      <div className="px-6 md:px-16 max-w-6xl mx-auto mb-32 flex flex-col gap-32">
        
        {/* Encabezado */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-border pb-16 mb-8"
        >
          <div className="font-mono-tight text-muted-foreground tracking-widest uppercase mb-4 text-xs">
            Badder Records / Audio Archive
          </div>
          <h1 className="font-ethnocentric text-5xl md:text-8xl text-foreground tracking-wider leading-none">
            Music
          </h1>
        </motion.div>

        {/* Releases / Tracks Grid */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl md:text-5xl text-foreground mb-12 tracking-wide"
          >
            Latest Releases
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {latestReleases.map((release, i) => (
              <motion.a
                href="#"
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group block cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden border border-border bg-black mb-4">
                  <img 
                    src={release.cover} 
                    alt={release.title} 
                    className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-80 transition-all duration-700" 
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  {/* Etiqueta de tipo */}
                  <div className="absolute top-2 right-2 z-10 bg-background/90 backdrop-blur-sm border border-border px-2 py-1">
                    <span className="font-mono-tight text-[9px] text-foreground tracking-[0.2em] uppercase">
                      {release.type}
                    </span>
                  </div>
                </div>

                <h3 className="font-serif text-xl tracking-wide uppercase truncate text-foreground group-hover:text-muted-foreground transition-colors">
                  {release.title}
                </h3>
                <p className="font-mono-tight text-[11px] text-muted-foreground tracking-[0.15em] uppercase mt-2">
                  {release.artist}
                </p>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Sección Uriel Galeano */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-dash text-4xl md:text-5xl text-foreground tracking-wide"
            >
              Uriel Galeano
            </motion.h2>
            <motion.a
              href="#"
              onClick={(e) => e.preventDefault()}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground hover:text-muted-foreground transition-colors sm:mb-2"
            >
              [ VER MAS CONTENIDO ↗ ]
            </motion.a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {urielTracks.map((track, i) => (
              <motion.a
                href="#"
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group block cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden border border-border bg-black mb-4">
                  <img 
                    src={track.cover} 
                    alt={track.title} 
                    className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-80 transition-all duration-700" 
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="absolute top-2 right-2 z-10 bg-background/90 backdrop-blur-sm border border-border px-2 py-1">
                    <span className="font-mono-tight text-[9px] text-foreground tracking-[0.2em] uppercase">
                      {track.type}
                    </span>
                  </div>
                </div>

                <h3 className="font-serif text-xl tracking-wide uppercase truncate text-foreground group-hover:text-muted-foreground transition-colors">
                  {track.title}
                </h3>
                <p className="font-mono-tight text-[11px] text-muted-foreground tracking-[0.15em] uppercase mt-2">
                  {track.artist}
                </p>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Sección Anguis */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-righteous text-4xl md:text-5xl text-foreground tracking-wide"
            >
              Anguis
            </motion.h2>
            <motion.a
              href="#"
              onClick={(e) => e.preventDefault()}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground hover:text-muted-foreground transition-colors sm:mb-2"
            >
              [ VER MAS CONTENIDO ↗ ]
            </motion.a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {anguisTracks.map((track, i) => (
              <motion.a
                href="#"
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group block cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden border border-border bg-black mb-4">
                  <img 
                    src={track.cover} 
                    alt={track.title} 
                    className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-80 transition-all duration-700" 
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="absolute top-2 right-2 z-10 bg-background/90 backdrop-blur-sm border border-border px-2 py-1">
                    <span className="font-mono-tight text-[9px] text-foreground tracking-[0.2em] uppercase">
                      {track.type}
                    </span>
                  </div>
                </div>

                <h3 className="font-serif text-xl tracking-wide uppercase truncate text-foreground group-hover:text-muted-foreground transition-colors">
                  {track.title}
                </h3>
                <p className="font-mono-tight text-[11px] text-muted-foreground tracking-[0.15em] uppercase mt-2">
                  {track.artist}
                </p>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Playlists Recomendadas */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl md:text-5xl text-foreground mb-12 tracking-wide"
          >
            Playlists Recomendadas
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {recommendedPlaylists.map((playlist, i) => (
              <motion.a
                href="#"
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group block cursor-pointer border border-border bg-secondary/10 p-6 hover:border-foreground/30 transition-colors"
              >
                <div className="relative aspect-video overflow-hidden border border-border bg-black mb-6">
                  <img 
                    src={playlist.cover} 
                    alt={playlist.title} 
                    className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-80 transition-all duration-700" 
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <h3 className="font-serif text-2xl tracking-wide uppercase text-foreground group-hover:text-muted-foreground transition-colors mb-3">
                  {playlist.title}
                </h3>
                <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                  {playlist.desc}
                </p>
              </motion.a>
            ))}
          </div>
        </section>

      </div>

      {/* BOOKINGS / PRESSKITS */}
      <div className="bg-muted/5 border-t border-border pt-16 pb-16" id="bookings">
        <PresskitsSection />
      </div>
    </main>
  );
}