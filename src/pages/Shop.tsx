import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "@/data/products";

export default function Shop() {
  return (
    <main className="bg-background min-h-screen pt-32 pb-32 overflow-hidden">
      <div className="px-6 md:px-16 max-w-6xl mx-auto">

        {/* ENCABEZADO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 border-b border-border pb-16"
        >
          <div className="font-mono-tight text-muted-foreground tracking-widest uppercase mb-4 text-xs">
            Commercial Universe / Objects & Digital
          </div>
          <h1 className="font-akira text-5xl md:text-8xl text-foreground tracking-wider leading-none">
            Shop
          </h1>
        </motion.div>

        {/* GRILLA EDITORIAL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16">
          {products.map((product, i) => (
            <Link to={`/shop/${product.id}`} key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex flex-col cursor-pointer"
              >
                {/* Imagen del Producto */}
                <div className="aspect-[3/4] overflow-hidden bg-black border border-border relative mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />

                  {/* Etiqueta de Estado */}
                  <div className="absolute top-2 right-2 z-10 bg-background/90 backdrop-blur-sm border border-border px-3 py-1">
                    <span className="font-mono-tight text-[9px] text-foreground tracking-[0.2em] uppercase">
                      {product.status.replace("_", " ")}
                    </span>
                  </div>
                </div>

                {/* Info del Producto */}
                <div className="flex flex-col flex-grow text-center md:text-left">
                  <div className="font-mono-tight text-[10px] text-muted-foreground tracking-[0.15em] uppercase mb-1">
                    {product.category}
                  </div>
                  <h3 className="font-serif text-xl tracking-wider uppercase text-foreground">
                    {product.name}
                  </h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}