import { useState, useEffect, useRef } from 'react';
import { 
  motion, useScroll, useTransform, AnimatePresence 
} from 'framer-motion';
import { 
  Globe, CheckCircle2, ArrowUpRight, Settings, Workflow, Zap, 
  ArrowRight, MessageSquare, Database, Shield, Sparkles, 
  Laptop, BrainCircuit, Lightbulb, Layers, Target, Phone,
  Code, Server, LayoutGrid, FileText, Users, CreditCard, 
  Lock, BarChart, Boxes, Building, PanelRight, Bot,
  CloudCog, Store, ShoppingCart, UserPlus, LineChart,
  Crown, Gift, Award
} from 'lucide-react';
import { Solution } from '../../types/solutions';
import { FeatureShowcase } from './features/FeatureShowcase';
import { TechStack } from './features/TechStack';
import { ProcessTimeline } from './features/ProcessTimeline';
import { IntegrationShowcase as Testimonials } from './features/Testimonials';
import { ParallaxCards } from './features/ParallaxCards';
import { WebsiteNavDock } from '../ui/WebsiteNavDock';
import { WebsiteOfferClaimForm } from '../WebsiteOfferClaimForm';

interface WebsiteSolutionTabProps {
  solution: Solution;
  onRequestCustomSolution: () => void;
}

export function WebsiteSolutionTab({ solution, onRequestCustomSolution }: WebsiteSolutionTabProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [activeNavItem, setActiveNavItem] = useState<string>('overview');
  
  // State for the offer claim form
  const [isOfferFormOpen, setIsOfferFormOpen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Scroll effects
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerTranslateY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Add scroll trigger for animations
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll('[data-section]');
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25) {
          const sectionId = section.getAttribute('data-section');
          if (sectionId) {
            setActiveSection(sectionId);
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Navigation items for the hero section
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'process', label: 'Process' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'testimonials', label: 'Testimonials' }
  ];

  // Interactive 3D Website Preview
  const WebsitePreview = () => {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isHovering) return;
      
      const container = e.currentTarget;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation based on mouse position
      const rotX = ((y - rect.height / 2) / rect.height) * 10;
      const rotY = ((x - rect.width / 2) / rect.width) * 10;
      
      setRotateX(-rotX);
      setRotateY(rotY);
    };
    
    return (
      <div 
        className="w-full h-full perspective-1000 p-4"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setRotateX(0);
          setRotateY(0);
        }}
      >
        <motion.div 
          className="w-full h-[400px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-indigo-500/30 shadow-xl relative"
          animate={{
            rotateX: rotateX,
            rotateY: rotateY,
            z: isHovering ? 50 : 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Browser Header */}
          <div className="h-10 bg-gray-800 border-b border-gray-700 flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 h-6 w-64 bg-gray-700 rounded-full flex items-center px-3">
              <div className="text-xs text-gray-400 truncate">https://example.com</div>
            </div>
          </div>
          
          {/* Website Content */}
          <div className="p-4">
            {/* Website header */}
            <div className="h-12 flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-500 rounded-md"></div>
                <div className="h-3 w-20 bg-gray-600 rounded"></div>
              </div>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-2 w-10 bg-gray-600 rounded"></div>
                ))}
              </div>
            </div>
            
            {/* Hero section */}
            <div className="h-40 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-lg mb-4 flex p-4">
              <div className="w-1/2 flex flex-col justify-center">
                <div className="h-6 w-36 bg-indigo-500/50 rounded mb-2"></div>
                <div className="h-3 w-48 bg-gray-600 rounded mb-1"></div>
                <div className="h-3 w-40 bg-gray-600 rounded mb-1"></div>
                <div className="h-3 w-44 bg-gray-600 rounded mb-3"></div>
                <div className="h-8 w-24 bg-indigo-500 rounded"></div>
              </div>
              <div className="w-1/2 flex items-center justify-center">
                <div className="h-28 w-28 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                  <div className="h-14 w-14 rounded-full bg-indigo-500/30"></div>
                </div>
              </div>
            </div>
            
            {/* Content blocks */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-800 rounded-lg p-3">
                  <div className="h-4 w-10 bg-indigo-500/40 rounded mb-2"></div>
                  <div className="h-2 w-full bg-gray-700 rounded mb-1"></div>
                  <div className="h-2 w-2/3 bg-gray-700 rounded mb-1"></div>
                  <div className="h-2 w-5/6 bg-gray-700 rounded mb-1"></div>
                </div>
              ))}
            </div>
            
            {/* Admin Dashboard Preview (appears when hovering) */}
            <AnimatePresence>
              {isHovering && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm flex flex-col items-center justify-center p-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Admin Dashboard</h3>
                  <div className="grid grid-cols-2 gap-3 w-full mb-4">
                    <div className="h-20 bg-gray-800 rounded p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded bg-indigo-500/30 flex items-center justify-center">
                          <Users className="w-3 h-3 text-indigo-400" />
                        </div>
                        <div className="h-3 w-16 bg-gray-700 rounded"></div>
                      </div>
                      <div className="flex justify-between">
                        <div className="h-6 w-10 bg-indigo-500/30 rounded flex items-center justify-center">
                          <span className="text-xs text-indigo-400">42</span>
                        </div>
                        <div className="h-8 w-12 rounded">
                          <LineChart className="w-full h-full text-indigo-500/50" />
                        </div>
                      </div>
                    </div>
                    <div className="h-20 bg-gray-800 rounded p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded bg-purple-500/30 flex items-center justify-center">
                          <ShoppingCart className="w-3 h-3 text-purple-400" />
                        </div>
                        <div className="h-3 w-16 bg-gray-700 rounded"></div>
                      </div>
                      <div className="flex justify-between">
                        <div className="h-6 w-16 bg-purple-500/30 rounded flex items-center justify-center">
                          <span className="text-xs text-purple-400">128</span>
                        </div>
                        <div className="h-8 w-12 rounded">
                          <LineChart className="w-full h-full text-purple-500/50" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-24 bg-gray-800 rounded mb-4 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded bg-blue-500/30 flex items-center justify-center">
                        <BarChart className="w-3 h-3 text-blue-400" />
                      </div>
                      <div className="h-3 w-20 bg-gray-700 rounded"></div>
                    </div>
                    <div className="flex items-end gap-1 h-10">
                      {[40, 25, 60, 30, 45, 75, 50, 35, 65, 55].map((h, i) => (
                        <div key={i} className="flex-1 bg-blue-500/40 rounded-sm" style={{ height: `${h}%` }}></div>
                      ))}
                    </div>
                  </div>
                  <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                    Explore Admin Features
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Floating elements animated in 3D space */}
          <motion.div
            className="absolute top-20 right-16 w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center"
            animate={{
              z: 30,
              rotateY: isHovering ? 45 : 0,
              rotateX: isHovering ? 15 : 0,
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Users className="w-6 h-6 text-indigo-400" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-20 left-16 w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center"
            animate={{
              z: 30,
              rotateY: isHovering ? -45 : 0,
              rotateX: isHovering ? -15 : 0,
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Database className="w-6 h-6 text-purple-400" />
          </motion.div>
        </motion.div>
      </div>
    );
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="animate-fadeIn relative"
    >
      {/* Hero Section with 3D effect and parallax scrolling */}
      <motion.div 
        variants={itemVariants}
        className="relative w-full bg-gradient-to-r from-[#0f172a] to-[#1e1b4b] rounded-2xl overflow-hidden mb-16"
        style={{
          opacity: headerOpacity,
          y: headerTranslateY,
        }}
      >
        {/* Animated glowing border */}
        <div className="absolute inset-0 rounded-2xl border border-indigo-500/30 z-10 overflow-hidden">
          <motion.div 
            className="absolute h-[4px] w-[30%] bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
            animate={{ 
              left: ['-30%', '130%'],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ top: 0 }}
          />
          <motion.div 
            className="absolute w-[4px] h-[30%] bg-gradient-to-b from-transparent via-indigo-500 to-transparent"
            animate={{ 
              top: ['-30%', '130%'],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: 1
            }}
            style={{ right: 0 }}
          />
          <motion.div 
            className="absolute h-[4px] w-[30%] bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
            animate={{ 
              right: ['-30%', '130%'],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
            style={{ bottom: 0 }}
          />
          <motion.div 
            className="absolute w-[4px] h-[30%] bg-gradient-to-b from-transparent via-indigo-500 to-transparent"
            animate={{ 
              bottom: ['-30%', '130%'],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: 3
            }}
            style={{ left: 0 }}
          />
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0">
          {/* Animated gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(124,58,237,0.1),transparent_70%)]"></div>
          
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-indigo-500/30"
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  top: `${Math.random() * 100}%`,
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{
                  y: [0, Math.random() * -30 - 10],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
          
          {/* Animated lines */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(99,102,241,0)" />
                <stop offset="50%" stopColor="rgba(99,102,241,0.5)" />
                <stop offset="100%" stopColor="rgba(99,102,241,0)" />
              </linearGradient>
            </defs>
            {[...Array(5)].map((_, i) => (
              <motion.path
                key={i}
                d={`M0,${100 + i * 50} C${200 + i * 20},${150 + i * 10} ${400 - i * 30},${50 + i * 20} ${window.innerWidth},${120 + i * 30}`}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0, opacity: 0.3 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: [0.1, 0.3, 0.1],
                  pathOffset: [0, 1]
                }}
                transition={{ 
                  duration: 10 + i * 2, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </svg>
        </div>
        
        {/* Animated Navigation Menu */}
        <div className="relative z-20 pt-8 px-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <WebsiteNavDock 
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </motion.div>
        </div>
        
        {/* Content Grid */}
        <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-12 min-h-[600px]">
          <div className="flex flex-col justify-center">
            <div className="relative mb-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium"
              >
                <Globe className="w-4 h-4" />
                <span>Premium Website Solutions</span>
              </motion.div>
              
              {/* Floating badges */}
              <motion.div
                className="absolute -top-6 -right-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-emerald-300 text-xs font-medium px-2 py-1 rounded-full border border-green-500/20 flex items-center gap-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <span>99.9% Uptime</span>
                <CheckCircle2 className="w-3 h-3" />
              </motion.div>
            </div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Powerful Web Solutions <br className="hidden md:block"/> for Your Business
            </motion.h1>
            
            <motion.p 
              className="text-gray-300 text-lg mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              We design and develop custom, high-performance websites with advanced functionality, seamless integrations, and intuitive user experiences that drive growth and streamline operations.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <button 
                onClick={onRequestCustomSolution}
                className="relative overflow-hidden group bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 flex items-center gap-2"
              >
                <span className="relative z-10">Schedule a Call</span>
                <Phone className="w-5 h-5 relative z-10" />
                
                {/* Button hover effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                />
                <motion.div 
                  className="absolute -inset-1 rounded-lg scale-[1.15] bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-40 blur transition-opacity duration-300" 
                />
              </button>
              
              <a 
                href="#interactive-demo"
                className="relative group bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 border border-gray-700 hover:border-indigo-500/30"
              >
                <span>Interactive Demo</span>
                <motion.div
                  animate={{
                    x: [0, 5, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </motion.div>
              </a>
            </motion.div>
            
            {/* Stats Badges */}
            <motion.div
              className="flex flex-wrap gap-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.1 }}
            >
              {[
                { label: "Avg. Load Time", value: "<1.5s" },
                { label: "Mobile Optimized", value: "100%" },
                { label: "Customer Satisfaction", value: "97%" }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="bg-indigo-900/20 backdrop-blur-sm border border-indigo-500/20 rounded-lg px-3 py-1.5 flex items-center gap-2"
                >
                  <span className="text-xs text-gray-400">{stat.label}</span>
                  <span className="text-sm font-semibold text-indigo-300">{stat.value}</span>
                </div>
              ))}
            </motion.div>
          </div>
          
          <div className="relative h-full flex items-center justify-center">
            <WebsitePreview />
            
            {/* Floating technology icons */}
            <motion.div 
              className="absolute -top-6 -right-6 w-16 h-16 bg-indigo-900/30 backdrop-blur-md border border-indigo-500/20 rounded-xl flex items-center justify-center"
              initial={{ opacity: 0, y: 20, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
            >
              <Code className="w-8 h-8 text-indigo-400" />
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-6 -left-6 w-16 h-16 bg-purple-900/30 backdrop-blur-md border border-purple-500/20 rounded-xl flex items-center justify-center"
              initial={{ opacity: 0, y: -20, rotate: 10 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
            >
              <Database className="w-8 h-8 text-purple-400" />
            </motion.div>
          </div>
        </div>
        
        {/* Oscillating bottom glow */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            scaleY: [1, 1.5, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>

      {/* Special Deal Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mb-16 relative"
      >
        <div className="relative p-6 rounded-2xl overflow-hidden">
          {/* Golden gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 via-yellow-500/20 to-amber-700/30 rounded-2xl border-2 border-amber-500/50"></div>
          
          {/* Animated glow effect */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-300 opacity-20 blur-xl"
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 5, 0],
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-r from-amber-500/20 via-yellow-400/40 to-amber-500/20"></div>
          <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-r from-amber-500/20 via-yellow-400/40 to-amber-500/20"></div>
          
          {/* Corner decorations */}
          <div className="absolute top-2 left-2 w-6 h-6">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-amber-400/70">
              <path d="M12 2L2 12M2 2L2 12L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}