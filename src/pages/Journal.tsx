import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const posts = [
  {
    id: "post-01",
    date: "2025.10.24",
    title: "5 Tracks of the Week",
    subtitle: "Electro / House / Underground Selection",
    image: "/audio/cover (5).webp",
    body: "Selección curada desde las trincheras. Esta semana el sonido se inclina hacia los bajos pesados y ritmos rotos. El electro crudo de Detroit se encuentra con las frecuencias oscuras de los clubes europeos. \n\n1. Unknown Artist - White Label 001\n2. Uriel Galeano - Not Rules EP\n3. Anguis - Club Motion\n4. Detroit In Effect - Move It\n5. DJ Stingray - Serotonin",
    comments: [{ user: "lucas_b", text: "El track 3 rompe todo en la pista." }]
  },
  {
    id: "post-02",
    date: "2025.09.18",
    title: "Orígenes del Techno — Detroit",
    subtitle: "Industria, futuro y música electrónica",
    image: "/drop3/foto (26).webp",
    body: "Detroit a mediados de los 80. Fábricas de autos cerrando, decadencia urbana y el nacimiento del sonido del futuro. Los pioneros de Belleville Three (Juan Atkins, Derrick May y Kevin Saunderson) tomaron la estética fría de Kraftwerk, el funk de Parliament y le inyectaron el alma de una ciudad en ruinas.\n\nEl techno no nació para ser música de fiesta, nació como la banda sonora de un futuro distópico, la máquina adquiriendo alma.",
    comments: []
  },
  {
    id: "post-03",
    date: "2025.08.05",
    title: "Por qué los flyers rave eran tan extremos",
    subtitle: "Diseño como identidad cultural",
    image: "/flyers/foto 2.webp",
    body: "Antes de las redes sociales, un flyer era la única conexión entre un raver y una locación secreta. Diseños fotocopiados, saturados, tipografías caóticas e ilegibles. No estaban diseñados para ser 'lindos' o corporativos, estaban diseñados para filtrar: si no entendías el flyer, no pertenecías a la fiesta.\n\nHoy, en la era de la información limpia y pulida, recuperar el ruido y el glitch visual es casi un acto de resistencia editorial.",
    comments: [{ user: "wachoph", text: "Excelente archivo, la fotocopia es arte." }, { user: "anonymous", text: "Totalmente de acuerdo." }]
  }
];

export default function Journal() {
  const [activePost, setActivePost] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    activePost.comments.push({ user: "badder_user", text: commentText });
    setCommentText("");
  };

  return (
    <main className="bg-background min-h-screen pt-32 pb-32 overflow-hidden">
      <div className="px-6 md:px-16 max-w-6xl mx-auto">
        
        <AnimatePresence mode="wait">
          {!activePost ? (
            <motion.div 
              key="feed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-24 border-b border-border pb-16">
                <div className="font-mono-tight text-muted-foreground tracking-widest uppercase mb-4 text-xs">
                  Editorial / Artículos & Cultura
                </div>
                <h1 className="font-pure-energy text-6xl md:text-9xl text-foreground tracking-wider leading-none">
                  Journal
                </h1>
              </div>

              <div className="flex flex-col gap-16">
                {posts.map((post, i) => (
                  <motion.article 
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group cursor-pointer border-t border-border/40 pt-8 flex flex-col md:flex-row gap-8"
                    onClick={() => setActivePost(post)}
                  >
                    <div className="md:w-1/4 shrink-0 font-mono-tight text-xs tracking-widest text-muted-foreground uppercase pt-2">
                      {post.date}
                    </div>
                    <div className="md:w-3/4">
                      <h2 className="font-serif text-3xl md:text-5xl text-foreground tracking-wide group-hover:text-muted-foreground transition-colors mb-4">
                        {post.title}
                      </h2>
                      <h3 className="font-mono text-sm tracking-[0.15em] uppercase text-muted-foreground mb-6">
                        {post.subtitle}
                      </h3>
                      
                      <div className="aspect-video w-full overflow-hidden bg-black mt-8 border border-border">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-all duration-700"
                        />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="post"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <button 
                onClick={() => setActivePost(null)}
                className="mb-16 font-mono-tight text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Volver al Journal
              </button>

              <article>
                <div className="font-mono-tight text-xs tracking-widest text-muted-foreground uppercase mb-6">
                  {activePost.date}
                </div>
                <h1 className="font-serif text-5xl md:text-7xl text-foreground tracking-wide leading-tight mb-6">
                  {activePost.title}
                </h1>
                <h2 className="font-mono text-base tracking-[0.1em] text-muted-foreground uppercase mb-12 pb-12 border-b border-border">
                  {activePost.subtitle}
                </h2>

                <div className="aspect-video w-full bg-black mb-16 border border-border">
                  <img src={activePost.image} alt={activePost.title} className="w-full h-full object-cover" />
                </div>

                <div className="prose prose-invert max-w-none font-mono text-sm md:text-base leading-relaxed text-muted-foreground mb-24 whitespace-pre-line">
                  {activePost.body}
                </div>
              </article>

              <section className="border-t border-border pt-16">
                <h3 className="font-serif text-3xl uppercase mb-8">Comentarios ({activePost.comments.length})</h3>
                
                <div className="mb-12">
                  {!isLoggedIn ? (
                    <div className="bg-muted/10 border border-border p-8 text-center flex flex-col items-center">
                      <p className="font-mono-tight text-xs uppercase tracking-widest text-muted-foreground mb-6">Inicia sesión para participar</p>
                      <button onClick={handleLogin} className="border border-foreground px-6 py-3 font-mono-tight text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors flex items-center gap-2">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                        Mock Login Google
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleCommentSubmit} className="flex flex-col items-end gap-4">
                      <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Escribe un comentario..." className="w-full bg-transparent border border-border p-4 font-mono text-sm focus:outline-none focus:border-foreground transition-colors resize-none h-32" />
                      <button type="submit" disabled={!commentText.trim()} className="border border-foreground px-6 py-2 font-mono-tight text-xs uppercase tracking-widest bg-foreground text-background hover:opacity-80 disabled:opacity-50 transition-all">Publicar</button>
                    </form>
                  )}
                </div>

                <div className="flex flex-col gap-6">
                  {activePost.comments.map((c: any, i: number) => (
                    <div key={i} className="border border-border/50 p-6"><div className="font-mono-tight text-[10px] tracking-widest uppercase text-foreground mb-4">→ {c.user}</div><p className="font-mono text-sm text-muted-foreground">{c.text}</p></div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}