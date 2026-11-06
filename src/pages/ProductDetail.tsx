import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const [wasAdded, setWasAdded] = useState(false);

  const product = products.find((p) => p.id === Number(productId));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-serif text-5xl text-foreground mb-4">404</h1>
        <p className="font-mono text-muted-foreground mb-8">Producto no encontrado.</p>
        <Link to="/shop" className="border border-foreground bg-transparent text-foreground px-8 py-3 font-mono-tight text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors">
          Volver al Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    setWasAdded(true);
    setTimeout(() => {
      navigate('/cart');
    }, 1000);
  };

  const isAvailable = product.status === "AVAILABLE" || product.status === "COMING SOON";

  return (
    <main className="bg-background min-h-screen pt-32 pb-32 overflow-hidden">
      <div className="px-6 md:px-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Link 
            to="/shop"
            className="mb-16 inline-block font-mono-tight text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Volver al Shop
          </Link>
          <div className="grid md:grid-cols-2 gap-12 md:gap-24">
            {/* Columna de Imagen */}
            <div className="aspect-[3/4] bg-black border border-border">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* Columna de Detalles */}
            <div className="flex flex-col justify-center">
              <div className="font-mono-tight text-xs tracking-[0.2em] text-muted-foreground uppercase mb-4">
                {product.category}
              </div>
              <h1 className="font-serif text-5xl md:text-7xl text-foreground tracking-wider leading-none mb-8">
                {product.name}
              </h1>
              <div className="font-mono text-2xl tracking-widest text-foreground mb-8">
                ${product.price.toLocaleString("es-AR")}
              </div>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-md mb-12">
                {product.description}
              </p>

              {/* Botón de Acción */}
              <div className="flex flex-col items-start">
                <button
                  onClick={handleAddToCart}
                  disabled={!isAvailable || wasAdded}
                  className={`
                    w-full md:w-auto border border-foreground px-12 py-4 font-mono-tight text-xs uppercase tracking-[0.2em] 
                    transition-all duration-300 flex items-center justify-center gap-3
                    ${wasAdded 
                      ? 'bg-green-500 border-green-500 text-background' 
                      : isAvailable 
                        ? 'bg-foreground text-background hover:bg-transparent hover:text-foreground' 
                        : 'bg-muted/40 text-muted-foreground border-border cursor-not-allowed'
                    }
                  `}
                >
                  {wasAdded ? (
                    <>Agregado <Check className="w-4 h-4" /></>
                  ) : isAvailable ? (
                    <>Añadir al Carrito <ShoppingBag className="w-4 h-4" /></>
                  ) : (
                    <>{product.status.replace("_", " ")}</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}