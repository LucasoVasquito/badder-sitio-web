import { motion } from "framer-motion";

export default function BadderForeverSection() {
  return (
    <section className="relative overflow-hidden bg-secondary/40 py-24 md:py-32 px-6 md:px-16">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsla(var(--foreground),0.05),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,hsla(var(--foreground),0.02),transparent)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-screen"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.22'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45 }}
          className="font-serif text-5xl leading-none text-foreground sm:text-6xl md:text-8xl"
        >
          BADDER 4EVER
        </motion.h2>

        {/* EL TEXTO NUEVO ACÁ */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mt-8 max-w-2xl font-mono-tight text-muted-foreground"
        >
          El drop final de una era. Una curaduría con lo mejor de nuestras colecciones y material inédito. Cerramos nuestra etapa inicial para expandirnos definitivamente como colectivo multimedia. El archivo físico definitivo antes de mutar el sistema.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          href="https://badder.mitiendanube.com/" // <--- ACÁ PEGAS TU LINK DE TIENDA NUBE
          target="_blank"
          rel="noreferrer"
          className="mt-12 inline-flex rounded-none border border-foreground bg-foreground px-12 py-6 font-mono text-sm font-bold uppercase tracking-[0.35em] text-background transition-all duration-75 hover:-translate-x-1 hover:-translate-y-1 hover:border-cobalt hover:bg-cobalt hover:text-accent-foreground hover:shadow-[6px_6px_0px_hsl(var(--foreground))]"
        >
          [ ACCESS THE DROP ↗ ]
        </motion.a>
      </div>
    </section>
  );
}
