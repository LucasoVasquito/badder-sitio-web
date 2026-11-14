import HeroSection from "../components/HeroSection";
import CurrentDrop from "../components/home/CurrentDrop";
import CulturePreview from "../components/home/CulturePreview";
import StudioSection from "../components/home/StudioSection";
import LatestTransmissions from "../components/home/LatestTransmissions";
import FromTheArchive from "../components/home/FromTheArchive";
import InMotion from "../components/home/InMotion";
import JoinFrequency from "../components/home/JoinFrequency";
import AboutSection from "../components/AboutSection";
import { usePageMeta } from "@/lib/usePageMeta";

// Home "flyer vivo" — jerarquía v3 con la intro BADDER de vuelta al principio:
// Intro → Drop 3 → Culture → Studio → Latest Transmissions → From the Archive → Badder in Motion → Join → About.
// Fondos: negro (intro) → negro + anillos (Drop 3) → papel → acento A → negro → damero negro (Archive) → foto oscura → acento B → papel → negro (footer).
export default function Home() {
  usePageMeta({});
  return (
    <main className="bg-background text-foreground">
      <HeroSection />
      <CurrentDrop />
      <CulturePreview />
      <StudioSection />
      <LatestTransmissions />
      <FromTheArchive />
      <InMotion />
      <JoinFrequency />
      <AboutSection />
    </main>
  );
}
