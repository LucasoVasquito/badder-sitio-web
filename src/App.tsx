import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import Navigation from "./components/Navigation";
import FloatingPlayer from "./components/FloatingPlayer";
import Footer from "./components/Footer";
import { SvgDefs, GrainOverlay, CursorDot } from "./components/flyer";
import TouchBlur from "./components/flyer/TouchBlur";
import { useFlyerLoop } from "./hooks/useFlyerLoop";
import { useFlyerStore } from "./store/flyerStore";
import { PALETAS } from "./config/flyer";
import { lazy, Suspense, useEffect } from "react";

// Páginas interiores: se cargan por ruta (code-splitting).
const NotFound = lazy(() => import("./pages/NotFound"));
const Music = lazy(() => import("./pages/Music"));
const Shop = lazy(() => import("./pages/Shop"));
const Archivo = lazy(() => import("./pages/Archivo"));
const Journal = lazy(() => import("./pages/Journal"));
const CultureArticle = lazy(() => import("./pages/CultureArticle"));
const ArchiveProject = lazy(() => import("./pages/ArchiveProject"));
const Services = lazy(() => import("./pages/Services"));
const Community = lazy(() => import("./pages/Community"));
const Contact = lazy(() => import("./pages/Contact"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Sistema = lazy(() => import("./pages/Sistema"));

// Redirige conservando ?query y #hash (ej: /journal?post=post-01 → /culture?post=post-01)
function Redirect({ to }: { to: string }) {
  const { search, hash } = useLocation();
  return <Navigate to={{ pathname: to, search, hash }} replace />;
}

function App() {
  useFlyerLoop();
  // Aplica los tweaks (paleta, grano, difusas) como variables CSS en <html>.
  const { paleta, textura, difusas } = useFlyerStore();
  useEffect(() => {
    const p = PALETAS[paleta] ?? PALETAS[0];
    const s = document.documentElement.style;
    s.setProperty("--a", p.aHsl); s.setProperty("--b", p.bHsl);
    s.setProperty("--a-c", p.a); s.setProperty("--b-c", p.b);
    s.setProperty("--a-fg", p.aFg); s.setProperty("--b-fg", p.bFg);
    s.setProperty("--grain", String(textura));
    s.setProperty("--blur", difusas ? "4px" : "0px");
  }, [paleta, textura, difusas]);
  return (
    // reducedMotion="user": Framer Motion respeta prefers-reduced-motion en todo el sitio
    <MotionConfig reducedMotion="user">
      <Router>
        <SvgDefs />
        <GrainOverlay />
        <CursorDot />
        <TouchBlur />
        <ScrollToTop />
        <Navigation />

        {/* Las páginas interiores se cargan por ruta (code-splitting): la home baja menos JS. */}
        <Suspense fallback={<div className="min-h-svh-fb" aria-busy="true" />}>
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

          {/* Referencia interna del sistema visual (no enlazada desde el menú) */}
          <Route path="/sistema" element={<Sistema />} />

          {/* Rutas anteriores: redirigen a la sección nueva */}
          <Route path="/journal" element={<Redirect to="/culture" />} />
          <Route path="/archivo" element={<Redirect to="/archive" />} />
          <Route path="/services" element={<Redirect to="/studio" />} />
          {/* Visuals y Colecciones se consolidaron en ARCHIVE (los archivos siguen en el repo) */}
          <Route path="/visuals" element={<Navigate to="/archive?filter=video" replace />} />
          <Route path="/colecciones" element={<Navigate to="/archive?filter=collections" replace />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>

        {/* Persistentes: un solo reproductor para todo el sitio */}
        <FloatingPlayer />
        <Footer />
      </Router>
    </MotionConfig>
  );
}

export default App;
