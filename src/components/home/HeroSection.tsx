import { useRef } from 'react';
import { AnimatedHero } from '../ui/animated-hero';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  scrollToSolutions: () => void;
}

export function HeroSection({ scrollToSolutions }: HeroSectionProps) {
  return (
    <div className="relative" style={{ height: '600px' }}>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f] via-[#0f1629] to-[#0a0a1f] opacity-90 z-0" />
      
      {/* Animated Hero Section */}
      <div className="relative z-10 h-full w-full">
        <AnimatedHero scrollToSolutions={scrollToSolutions} />
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-10 h-10 text-purple-400 opacity-70" />
      </motion.div>
      
      {/* Bottom gradient fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a1f] to-transparent z-10"></div>
    </div>
  );
}