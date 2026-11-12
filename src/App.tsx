import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Navigation from "./components/Navigation";
import FloatingPlayer from "./components/FloatingPlayer";
import Footer from "./components/Footer";
import Music from "./pages/Music";
import Shop from "./pages/Shop";
import Archivo from "./pages/Archivo";
import Journal from "./pages/Journal";
import CultureArticle from "./pages/CultureArticle";
import ArchiveProject from "./pages/ArchiveProject";
import Services from "./pages/Services";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

// Redirige conservando ?query y #hash (ej: /journal?post=post-01 → /culture?post=post-01)
function Redirect({ to }: { to: string }) {
  const { search, hash } = useLocation();
  return <Navigate to={{ pathname: to, search, hash }} replace />;
}

function App() {
  return (
    // reducedMotion="user": Framer Motion respeta prefers-reduced-motion en todo el sitio
    <MotionConfig reducedMotion="user">
      <Router>
        <ScrollToTop />
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />

          {/* Secciones principales */}
          <Route path="/culture" element={<Journal />} />
          <Route path="/culture/:postId" element={<CultureArticle />} />
          <Route path="/music" element={<Music />} />
          <Route path="/archive" element={<Archivo />} />
          <Route path="/archive/:projectId" element={<ArchiveProject />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:productId" element={<ProductDetail />} />
          <Route path="/studio" element={<Services />} />
          <Route path="/community" element={<Community />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />

          {/* Rutas anteriores: redirigen a la sección nueva */}
          <Route path="/journal" element={<Redirect to="/culture" />} />
          <Route path="/archivo" element={<Redirect to="/archive" />} />
          <Route path="/services" element={<Redirect to="/studio" />} />
          {/* Visuals y Colecciones se consolidaron en ARCHIVE (los archivos siguen en el repo) */}
          <Route path="/visuals" element={<Navigate to="/archive?filter=video" replace />} />
          <Route path="/colecciones" element={<Navigate to="/archive?filter=collections" replace />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Persistentes: un solo reproductor para todo el sitio */}
        <FloatingPlayer />
        <Footer />
      </Router>
    </MotionConfig>
  );
}

export default App;
