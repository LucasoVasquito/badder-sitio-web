import LatestTransmissions from "../components/home/LatestTransmissions";
import CulturePreview from "../components/home/CulturePreview";
import FromTheArchive from "../components/home/FromTheArchive";
import InMotion from "../components/home/InMotion";
import CurrentDrop from "../components/home/CurrentDrop";
import JoinFrequency from "../components/home/JoinFrequency";
import AboutSection from "../components/AboutSection";
import { usePageMeta } from "@/lib/usePageMeta";

// Home: publicación protagonista + índice reciente, y un bloque por actividad
// (música, notas, archivo, indumentaria, participar).
export default function Home() {
  usePageMeta({});
  return (
    <main data-accent="lime" className="bg-background text-foreground">
      <LatestTransmissions />
      <InMotion />
      <CulturePreview />
      <FromTheArchive />
      <CurrentDrop />
      <JoinFrequency />
      <AboutSection />
    </main>
  );
}
