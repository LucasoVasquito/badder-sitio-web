import HeroSection from "../components/HeroSection";
import LatestTransmissions from "../components/home/LatestTransmissions";
import CulturePreview from "../components/home/CulturePreview";
import FromTheArchive from "../components/home/FromTheArchive";
import InMotion from "../components/home/InMotion";
import CurrentDrop from "../components/home/CurrentDrop";
import JoinFrequency from "../components/home/JoinFrequency";
import AboutSection from "../components/AboutSection";
import { usePageMeta } from "@/lib/usePageMeta";

// ExtendedHero, QuickAccess y CreditsSection ya no se usan en la Home
// (los archivos siguen en el repo; los créditos se integraron en AboutSection).
export default function Home() {
  usePageMeta({});
  return (
    <main className="bg-background text-foreground overflow-hidden">
      {/* 01 — Hero / identidad */}
      <HeroSection />
      {/* 02 — Latest transmissions */}
      <LatestTransmissions />
      {/* 03 — Culture / editorial */}
      <CulturePreview />
      {/* 04 — From the archive */}
      <FromTheArchive />
      {/* 05 — Badder in motion / music */}
      <InMotion />
      {/* 06 — Current drop / shop */}
      <CurrentDrop />
      {/* 07 — Join the frequency / community */}
      <JoinFrequency />
      {/* 08 — About / manifesto (09 — Footer vive en App) */}
      <AboutSection />
    </main>
  );
}
