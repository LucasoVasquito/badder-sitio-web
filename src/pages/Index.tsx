import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import BadderForeverSection from "@/components/BadderForeverSection";
import VideoSection from "@/components/VideoSection";
import FlyerSection from "@/components/FlyerSection";
import PhotoSection from "@/components/PhotoSection";
import CollectionsSection from "@/components/CollectionsSection";
import CreditsSection from "@/components/CreditsSection";
import FloatingPlayer from "@/components/FloatingPlayer";
import PresskitsSection from "@/components/PresskitsSection";
import { press } from "framer-motion";

const sectionMap: Record<string, string> = {
  INDEX: "hero",
  ACERCA: "about",
  BADDER4EVER: "badder-4ever",
  VIDEO: "video",
  VISUALS: "visuals",
  FOTOS: "photo",
  COLECCIONES: "collections",
  PRESSKITS: "presskits",
  CREDITOS: "credits",
};

const reverseSectionMap: Record<string, string> = {
  hero: "INDEX",
  about: "ACERCA",
 "badder-4ever": "BADDER4EVER",
  video: "VIDEO",
  visuals: "VISUALS",
  photo: "FOTOS",
  collections: "COLECCIONES",
  presskits: "PRESSKITS",
  credits: "CREDITOS",
};

const observerThresholds = Array.from({ length: 11 }, (_, index) => index / 10);

const Index = () => {
  const [activeSection, setActiveSection] = useState("INDEX");

  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const badderForeverRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLElement>(null);
  const flyersRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLElement>(null);
  const collectionsRef = useRef<HTMLElement>(null);
  const presskitsRef = useRef<HTMLElement>(null);
  const creditsRef = useRef<HTMLElement>(null);

  const refs: Record<string, React.RefObject<HTMLElement>> = {
    hero: heroRef,
    about: aboutRef,
 "badder-4ever": badderForeverRef,
    video: videoRef,
    photo: photoRef,
    visuals: flyersRef,
    collections: collectionsRef,
    presskits: presskitsRef,
    credits: creditsRef,
  };

  useEffect(() => {
    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;

          if (entry.isIntersecting) {
            visibleSections.set(sectionId, entry.intersectionRatio);
          } else {
            visibleSections.delete(sectionId);
          }
        });

        const mostVisibleSection = [...visibleSections.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];

        if (mostVisibleSection && reverseSectionMap[mostVisibleSection]) {
          setActiveSection(reverseSectionMap[mostVisibleSection]);
        }
      },
      {
        threshold: observerThresholds,
        rootMargin: "-20% 0px -35% 0px",
      },
    );

    Object.values(refs).forEach((sectionRef) => {
      if (sectionRef.current) observer.observe(sectionRef.current);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const key = sectionMap[section];
    refs[key]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="noise-overlay bg-background min-h-screen">
      <Navigation /> {/* el menú ya no recibe props (Index.tsx no tiene ruta) */}
      <section id="hero" ref={heroRef}><HeroSection /></section>
      <section id="about" ref={aboutRef}><AboutSection /></section>
      <section id="badder-4ever" ref={badderForeverRef}><BadderForeverSection /></section>
      <section id="video" ref={videoRef}><VideoSection /></section>
      <section id="visuals" ref={flyersRef}><FlyerSection /></section>
      <section id="photo" ref={photoRef}><PhotoSection /></section>
      <section id="collections" ref={collectionsRef}><CollectionsSection /></section>
      <section id="presskits" ref={presskitsRef}><PresskitsSection /></section>
      <section id="credits" ref={creditsRef}><CreditsSection /></section>
      <FloatingPlayer />

      {/* Footer */}
      <div className="mt-32 border-t border-border pt-8 mx-6 md:mx-16 max-w-6xl lg:mx-auto flex flex-col md:flex-row justify-between gap-4 pb-12">
        <span className="font-serif text-lg text-foreground">Badder</span>
        <span className="label text-muted-foreground">© 2026 BADDER EXPERIENCE. Diseñado y desarrollado por Lucas Nicolas Bengochea.</span>
        <span className="label text-muted-foreground">LA PLATA, ARG</span>
      </div>
    </div>
  );
};

export default Index;

