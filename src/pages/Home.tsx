import HeroSection from "../components/HeroSection";
import LatestTransmissions from "../components/home/LatestTransmissions";
import CulturePreview from "../components/home/CulturePreview";
import FromTheArchive from "../components/home/FromTheArchive";
import InMotion from "../components/home/InMotion";
import CurrentDrop from "../components/home/CurrentDrop";
import JoinFrequency from "../components/home/JoinFrequency";
import AboutSection from "../components/AboutSection";
import { usePageMeta } from "@/lib/usePageMeta";

// Home "flyer vivo". Ritmo de fondos: negro → cinta → papel → damero → foto a sangre → op-art → acento B → papel → negro (footer).
export default function Home() {
  usePageMeta({});
  return (
    <main className="bg-background text-foreground">
      <HeroSection />
      <LatestTransmissions />
      <CulturePreview />
      <FromTheArchive />
      <InMotion />
      <CurrentDrop />
      <JoinFrequency />
      <AboutSection />
    </main>
  );
}
