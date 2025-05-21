import { useRef } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { UrgencySection } from '../components/home/UrgencySection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { CustomAutomationsSection } from '../components/home/CustomAutomationsSection';
import { AboutSection } from '../components/home/AboutSection';
import { HomeBackground } from '../components/ui/home-background';

export function Home() {
  const solutionsRef = useRef<HTMLDivElement>(null);

  const scrollToSolutions = () => {
    solutionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <HeroSection scrollToSolutions={scrollToSolutions} />

      {/* Main content with animated background */}
      <HomeBackground>
      {/* Urgency Section */}
      <UrgencySection />

      {/* Features Grid */}
      <div ref={solutionsRef}>
        <FeaturesSection />
      </div>

      {/* Custom Automations Section */}
      <CustomAutomationsSection />

      {/* About Section */}
      <AboutSection />
      </HomeBackground>
    </div>
  );
}