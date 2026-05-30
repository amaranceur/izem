import { useRef } from 'react';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import Highlights from './components/Highlights';
import FlavorCarousel from './components/FlavorCarousel';
import EnergyStrip from './components/EnergyStrip';
import LifestyleSection from './components/LifestyleSection';
import ZeroSpotlight from './components/ZeroSpotlight';
import Distribution from './components/Distribution';
import Footer from './components/Footer';
import { useGsapScrollText } from './hooks/useGsapScrollText';

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  useGsapScrollText(appRef);

  return (
    <div ref={appRef} className="min-h-screen w-full bg-[#FFF8E7] text-[#1A1208]">
      <Navbar />
      <main>
        <Hero3D />
        <Highlights />
        <FlavorCarousel />
        <EnergyStrip />
        <LifestyleSection />
        <ZeroSpotlight />
        <Distribution />
      </main>
      <Footer />
    </div>
  );
}

export default App;
