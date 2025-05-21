import { useState, useRef, useEffect } from 'react';
import { 
  Bot, Phone, Share2, Globe, Mail, ChevronRight, 
  Sparkles, ChevronDown, ChevronLeft, CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionSeparator } from '../ui/section-separator';

interface Feature {
  id: string;
  icon: React.FC<any>;
  title: string;
  description: string;
  benefits: string[];
  functions: string[];
}

export function FeaturesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const features: Feature[] = [
    {
      id: 'chatbot',
      icon: Bot,
      title: 'AI Chat Bots',
      description: 'AI-powered chatbots that handle customer inquiries, process requests, and automate tasks. They integrate with your systems and use a company-specific knowledge base to provide fast and accurate responses.',
      benefits: [
        '80% reduction in customer service workload',
        '24/7 availability without added staffing costs',
        'Consistent brand experience across all interactions',
        'Seamless handoff to human agents when needed'
      ],
      functions: [
        'Custom knowledge base integration',
        'Third-party system connections',
        'Multi-channel support',
        'Analytics and reporting'
      ]
    },
    {
      id: 'phone-agent',
      icon: Phone,
      title: 'AI Phone Agents',
      description: 'An AI-driven phone system that answers calls, provides support, makes reservations, and takes orders. It can transcribe and analyze conversations for insights.',
      benefits: [
        'No waiting time for callers',
        'Handles multiple calls simultaneously',
        'Detailed call transcriptions and analytics',
        'Significant reduction in operational costs'
      ],
      functions: [
        'Call handling and routing',
        'Appointment scheduling',
        'Order processing',
        'Sentiment analysis'
      ]
    },
    {
      id: 'website',
      icon: Globe,
      title: 'Website Design',
      description: 'Custom-built websites optimized for performance, automation, and business integrations. Designed for speed, scalability, and a seamless user experience.',
      benefits: [
        'High-performance, conversion-focused design',
        'Seamless integration with business systems',
        'Built-in automation capabilities',
        'Mobile-optimized user experience'
      ],
      functions: [
        'E-commerce functionality',
        'Custom backend development',
        'API integrations',
        'Analytics and tracking'
      ]
    },
    {
      id: 'social-media',
      icon: Share2,
      title: 'Social Media Automation',
      description: 'Automates content creation, scheduling, and engagement across platforms. Ensures consistent posting and interaction without manual effort.',
      benefits: [
        'Consistent posting schedule across platforms',
        'AI-generated content tailored to your brand',
        'Automated engagement with followers',
        'Comprehensive performance analytics'
      ],
      functions: [
        'Content creation and scheduling',
        'Cross-platform publishing',
        'Engagement automation',
        'Performance tracking'
      ]
    },
    {
      id: 'outreach',
      icon: Mail,
      title: 'Outreach Automations',
      description: 'An AI-powered system that finds decision-makers, gathers data, and sends personalized outreach emails at scale. Automates lead generation and follow-ups.',
      benefits: [
        'Highly personalized outreach at scale',
        '95% inbox placement rate',
        'Automated follow-up sequences',
        'Detailed engagement analytics'
      ],
      functions: [
        'Lead identification and verification',
        'Personalized email generation',
        'Automated follow-up sequences',
        'Response tracking and analysis'
      ]
    }
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
    resetAutoPlay();
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? features.length - 1 : prev - 1));
    resetAutoPlay();
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, features.length]);

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  // Get the current feature
  const currentFeature = features[currentSlide];

  return (
    <div className="py-24">
      <SectionSeparator position="top" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mt-16 mb-24 flex items-center justify-center gap-2">
          Our Solutions <Sparkles className="text-purple-500" />
        </h2>

        {/* Slider Container */}
        <div className="relative mb-16">
          {/* Slider Navigation */}
          <div className="absolute top-1/2 left-4 -translate-y-1/2 z-20">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-gray-900/70 border border-purple-500/30 flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          
          <div className="absolute top-1/2 right-4 -translate-y-1/2 z-20">
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-gray-900/70 border border-purple-500/30 flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Slider Content */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 backdrop-blur-sm border-2 border-[#2A0A29] h-[500px]">
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-2xl border border-purple-500/30" />
            <div className="absolute inset-0 rounded-2xl opacity-50">
              <div className="absolute inset-0 rounded-2xl border border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]" />
            </div>

            {/* Energy wave effects */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)] animate-[energyFlow_30s_ease-in-out_infinite]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05),transparent_80%)] animate-[energyFlow_40s_ease-in-out_infinite_reverse]" />
            </div>

            {/* Slide Content */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0 p-8 md:p-12"
              >
                <div className="h-full grid md:grid-cols-2 gap-8">
                  <div className="flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6 w-fit">
                      {/* Render the icon component properly */}
                      {currentFeature && <currentFeature.icon className="w-4 h-4" />}
                      <span>AI-Powered Solution</span>
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-4">{currentFeature.title}</h3>
                    <p className="text-gray-300 mb-6">{currentFeature.description}</p>
                    
                    <Link
                      to={`/solutions#${currentFeature.id}`}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 flex items-center gap-2 w-fit"
                    >
                      Explore This Solution
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                  
                  <div className="flex flex-col justify-center space-y-6">
                    <div>
                      <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-purple-400" /> Key Benefits
                      </h4>
                      <ul className="space-y-2">
                        {currentFeature.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-purple-400 mt-1" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-purple-400" /> Core Functions
                      </h4>
                      <ul className="space-y-2">
                        {currentFeature.functions.map((func, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-purple-400 mt-1" />
                            <span>{func}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'bg-purple-500 w-6' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for CheckCircle icon
function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}

// Helper component for Zap icon
function Zap(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  );
}