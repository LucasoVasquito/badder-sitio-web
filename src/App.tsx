import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CollectionsSection from "./components/CollectionsSection";
import ScrollToTop from "./components/ScrollToTop";
import Navigation from "./components/Navigation";
import FloatingPlayer from "./components/FloatingPlayer";
import Music from "./pages/Music";
import Visuals from "./pages/Visuals";
import Shop from "./pages/Shop";
import Archivo from "./pages/Archivo";
import Journal from "./pages/Journal";
import Services from "./pages/Services";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

function App() {
  return (
    <Router>
      <ScrollToTop />
      
      {/* Navigation Persistente */}
      <Navigation />
      
      <Routes>
        {/* La nueva HOME conectada */}
        <Route path="/" element={<Home />} />
        
        {/* Secciones que ya existen y fueron refactorizadas/movidas */}
        <Route path="/colecciones" element={<CollectionsSection />} />
        <Route path="/archivo" element={<Archivo />} />
        
        {/* Rutas nuevas conectadas */}
        <Route path="/music" element={<Music />} />
        <Route path="/visuals" element={<Visuals />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:productId" element={<ProductDetail />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/services" element={<Services />} />
        <Route path="/community" element={<Community />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/contact" element={<Contact />} />

        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Player y Footer persistentes */}
      <FloatingPlayer />
      <div className="mt-32 border-t border-border pt-8 mx-6 md:px-16 max-w-6xl lg:mx-auto flex flex-col md:flex-row justify-between gap-4 pb-12 relative z-50">
        <span className="font-serif text-lg text-foreground">Badder</span>
        <span className="font-mono-tight text-muted-foreground">© 2026 BADDER EXPERIENCE. Diseñado y desarrollado por Lucas Nicolas Bengochea.</span>
        <span className="font-mono-tight text-muted-foreground">LA PLATA, ARG</span>
      </div>
    </Router>
  );
}

export default App;