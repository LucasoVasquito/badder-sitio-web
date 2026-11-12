import { motion } from "framer-motion";

export default function ExtendedHero() {
  return (
    <section className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden border-t border-foreground/20">
      {/* Background and visual loop elements */}
      <div className="absolute inset-0 bg-secondary z-0 select-none pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-foreground/5 to-background opacity-50" />
        <div className="absolute inset-0 mix-blend-overlay opacity-30" />
        
        {/* Disruptive background digital flashes */}
        <div className="absolute inset-0 bg-cobalt/5 opacity-0 animate-[glitch-bg_5s_infinite_steps(1)] pointer-events-none" />
        <div className="absolute inset-0 bg-red-aggressive/5 opacity-0 animate-[glitch-bg_3s_infinite_steps(1)] pointer-events-none" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 text-center flex flex-col items-center justify-center gap-12 pointer-events-auto"
      >
        {/* Glitch Title with DASH Early font */}
        <h2 className="font-dash text-5xl md:text-8xl tracking-widest uppercase text-foreground/95 relative select-none flex flex-col items-center leading-none">
          <span className="relative glitch-text inline-block" data-text="BADDER">BADDER</span>
          <span className="relative glitch-text inline-block" data-text="EXPERIENCE">EXPERIENCE</span>
        </h2>

        {/* Brutalist Instagram Button */}
        <a
          href="https://instagram.com/badder.experience"
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-none border border-foreground bg-foreground px-12 py-6 font-mono text-xs font-bold uppercase tracking-[0.35em] text-background transition-all duration-75 hover:-translate-x-1 hover:-translate-y-1 hover:border-accent hover:bg-cobalt hover:text-foreground hover:shadow-[6px_6px_0px_rgba(255,255,255,1)]"
        >
          [  SEGUINOS  EN  INSTAGRAM  ↗  ]
        </a>
      </motion.div>
    </section>
  );
}