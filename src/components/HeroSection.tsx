import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import badderLogo from "@/assets/badder_logo_blanco_sin_fondo.webp";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 30 });

  useEffect(() => {
    if (reduceMotion) return;
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseX.set(nx * 7.5);
      mouseY.set(ny * 7.5);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY, reduceMotion]);

  return (
    <section
      ref={containerRef}
      aria-label="BADDER"
      className="relative h-[88svh] md:h-[80vh] min-h-[480px] max-h-[900px] w-full flex items-center justify-center overflow-hidden "
    >
      {/* Logo original con parallax */}
      <motion.img
        src={badderLogo}
        alt="Badder"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[260px] sm:max-w-[340px] md:max-w-[410px] w-full h-auto select-none"
        style={{ x: springX, y: springY }}
      />

      {/* Identificación editorial */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-6 md:bottom-8 left-6 right-6 md:left-16 md:right-16 flex items-end justify-between gap-6 label text-muted-foreground"
      >
        <p className="leading-relaxed">
          <span className="text-foreground">Independent creative culture</span>
          <br />
          La Plata, Argentina
        </p>

        {/* Indicador para seguir explorando */}
        <a href="#latest" className="hidden sm:flex flex-col items-center gap-2 hover:text-foreground transition-colors">
          <span>Scroll</span>
          <motion.span
            aria-hidden
            animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="block w-px h-6 bg-current"
          />
        </a>

        <p className="text-right leading-relaxed">
          Music · Archive · Culture
          <br />
          Est. 2024
        </p>
      </motion.div>
    </section>
  );
}
