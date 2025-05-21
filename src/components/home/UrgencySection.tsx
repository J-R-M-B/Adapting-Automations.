import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Brain, Clock, ArrowRight, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export function UrgencySection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add intersection observer to animate the section when it comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative overflow-hidden opacity-0">
      {/* Connecting element to create smooth transition from hero section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a1f] to-transparent -mt-32 pointer-events-none"></div>
      
      {/* Wave separator */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden -mt-10 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path 
            fill="#0a0a1f" 
            fillOpacity="1" 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z">
          </path>
        </svg>
      </div>
      
      <div className="pt-16 pb-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden"
        >
          {/* Main content section */}
          <div className="relative p-8 md:p-12 bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30">
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.15),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_70%)]" />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Header with animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center gap-3 mb-8"
              >
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                  The AI Revolution Is Here
                </h2>
              </motion.div>

              {/* Initial text */}
              <div className="max-w-3xl mx-auto text-center mb-8">
                <p className="text-xl text-gray-300 leading-relaxed">
                  AI is here, and it's here to stay. The world is changing faster than ever, and artificial intelligence is at the heart of this transformation. Businesses that embrace AI are streamlining operations, automating tasks, and unlocking new opportunities—while those that hesitate risk falling behind.
                </p>
              </div>

              {/* Expandable content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="max-w-3xl mx-auto text-center space-y-6 mb-8">
                      <p className="text-xl text-gray-300 leading-relaxed">
                        We are at a turning point. AI is evolving at an unprecedented pace, with breakthroughs happening every day. From advanced automation and machine learning to AI-driven decision-making, the technology is no longer a distant vision—it's shaping industries, redefining efficiency, and changing the way we work. The gap between companies that adapt and those that resist is growing. Those who leverage AI gain a competitive edge, while others struggle to keep up.
                      </p>
                      <p className="text-xl text-gray-300 leading-relaxed">
                        And we're only just getting started. AGI (Artificial General Intelligence) is on the horizon—a future where AI doesn't just assist but understands, reasons, and innovates. Businesses that integrate AI today are preparing for a world where automation, intelligence, and adaptability will determine success.
                      </p>
                      <p className="text-2xl font-semibold text-white">
                        The question is no longer if AI will change business—it already has. The only question that remains is: Will you evolve with it?
                      </p>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="p-6 rounded-xl bg-purple-500/10 border border-purple-500/20">
                        <Clock className="w-8 h-8 text-purple-400 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Time is Critical</h3>
                        <p className="text-gray-300">Every day without AI automation is a missed opportunity for growth and efficiency</p>
                      </div>
                      <div className="p-6 rounded-xl bg-purple-500/10 border border-purple-500/20">
                        <Target className="w-8 h-8 text-purple-400 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Stay Competitive</h3>
                        <p className="text-gray-300">Your competitors are already implementing AI solutions. Don't get left behind</p>
                      </div>
                      <div className="p-6 rounded-xl bg-purple-500/10 border border-purple-500/20">
                        <Zap className="w-8 h-8 text-purple-400 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Future-Proof</h3>
                        <p className="text-gray-300">Prepare your business for the next wave of technological advancement</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expand/Collapse button */}
              <div className="flex flex-col items-center gap-6">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-all duration-300"
                >
                  <span className="text-purple-400">{isExpanded ? 'Read Less' : 'Read More'}</span>
                  <ChevronDown 
                    className={`w-4 h-4 text-purple-400 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                <Link
                  to="/solutions"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group"
                >
                  Explore AI Solutions
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Animated border effect */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 rounded-2xl border border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)] group-hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-shadow duration-300" />
          </div>
        </motion.div>
      </div>
      </div>
    </div>
  );
}