import { useState, useEffect } from 'react';
import { 
  Share2, CheckCircle2, ArrowUpRight, Settings, Workflow, Zap, 
  ArrowRight, MessageSquare, Globe, Database, Shield, Sparkles, 
  Laptop, BrainCircuit, Lightbulb, Layers, Calendar, Clock,
  Instagram, Facebook, Twitter, Linkedin, Phone, Image, FileVideo,
  X, Target
} from 'lucide-react';
import { Solution } from '../../types/solutions';
import { motion } from 'framer-motion';
import { BarChart } from '../ui/bar-chart';

interface SocialMediaSolutionTabProps {
  solution: Solution;
  onRequestCustomSolution: () => void;
}

// Define animation variants
const containerVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export function SocialMediaSolutionTab({ solution, onRequestCustomSolution }: SocialMediaSolutionTabProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Social Media Dashboard Animation
  const SocialMediaDashboard = () => {
    const [animationStage, setAnimationStage] = useState(0);
    
    useEffect(() => {
      if (!isVisible) return;
      
      // Start animation sequence
      const timer1 = setTimeout(() => setAnimationStage(1), 1000);
      const timer2 = setTimeout(() => setAnimationStage(2), 2000);
      const timer3 = setTimeout(() => setAnimationStage(3), 3000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }, [isVisible]);

    return (
      <div className="bg-gray-900/70 rounded-xl p-4 h-[300px] overflow-hidden">
        {/* Dashboard header */}
        <div className="flex items-center justify-between border-b border-gray-700 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Share2 className="text-purple-400 w-5 h-5" />
            <span className="font-medium">Social Media Dashboard</span>
          </div>
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Calendar className="w-3 h-3 text-purple-400" />
            </div>
            <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Settings className="w-3 h-3 text-purple-400" />
            </div>
          </div>
        </div>
        
        {/* Dashboard content */}
        <div className="grid grid-cols-3 gap-3 h-[calc(100%-40px)]">
          {/* Left column - Platform selection */}
          <div className="col-span-1 space-y-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: animationStage >= 1 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800/50 rounded-lg p-2"
            >
              <div className="flex items-center gap-2 p-1.5 rounded bg-purple-500/20">
                <Instagram className="w-4 h-4 text-pink-400" />
                <span className="text-xs">Instagram</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: animationStage >= 1 ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-800/50 rounded-lg p-2"
            >
              <div className="flex items-center gap-2 p-1.5">
                <Facebook className="w-4 h-4 text-blue-400" />
                <span className="text-xs">Facebook</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: animationStage >= 1 ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800/50 rounded-lg p-2"
            >
              <div className="flex items-center gap-2 p-1.5">
                <Twitter className="w-4 h-4 text-blue-400" />
                <span className="text-xs">Twitter</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: animationStage >= 1 ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-800/50 rounded-lg p-2"
            >
              <div className="flex items-center gap-2 p-1.5">
                <Linkedin className="w-4 h-4 text-blue-600" />
                <span className="text-xs">LinkedIn</span>
              </div>
            </motion.div>
          </div>
          
          {/* Middle column - Content Creator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: animationStage >= 2 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-1 bg-gray-800/30 rounded-lg p-3"
          >
            <div className="text-xs font-medium mb-2 flex items-center gap-1">
              <FileVideo className="w-3 h-3 text-purple-400" />
              <span>Content Creator</span>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-gray-700/30 rounded flex items-center justify-center">
                <Image className="w-6 h-6 text-gray-500" />
              </div>
              <div className="h-16 bg-gray-700/30 rounded p-2">
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-gray-600/50 rounded"></div>
                  <div className="h-1.5 w-3/4 bg-gray-600/50 rounded"></div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-1">
                  <div className="w-6 h-6 bg-gray-700/50 rounded flex items-center justify-center">
                    <Image className="w-3 h-3 text-gray-400" />
                  </div>
                  <div className="w-6 h-6 bg-gray-700/50 rounded flex items-center justify-center">
                    <FileVideo className="w-3 h-3 text-gray-400" />
                  </div>
                </div>
                <div className="w-16 h-6 bg-purple-500/30 rounded flex items-center justify-center">
                  <span className="text-[10px] text-purple-300">Schedule</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right column - Calendar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: animationStage >= 3 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-1 bg-gray-800/30 rounded-lg p-3"
          >
            <div className="text-xs font-medium mb-2 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-purple-400" />
              <span>Content Calendar</span>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div key={i} className="text-[8px] text-center text-gray-400">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {[...Array(28)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-full aspect-square rounded-sm flex items-center justify-center text-[8px] ${
                    [3, 8, 12, 17, 22, 26].includes(i) 
                      ? 'bg-purple-500/30 text-purple-300' 
                      : 'bg-gray-700/30 text-gray-400'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="animate-fadeIn"
    >
      {/* Hero Section */}
      <motion.div 
        variants={itemVariants}
        className="relative w-full bg-gradient-to-r from-[#0f172a] to-[#1e1b4b] rounded-2xl overflow-hidden mb-16"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.15),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        
        <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-12">
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
              <Share2 className="w-4 h-4" />
              <span>AI-Powered Solution</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Social Media Automation
            </h1>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Revolutionize your social media presence with our AI-powered automation platform. Our system creates engaging, platform-optimized content, schedules posts at peak engagement times, and interacts with your audience—all automatically. With advanced analytics and trend monitoring, you'll stay ahead of the competition while saving countless hours of manual work. In today's digital landscape, businesses without automated social media strategies are falling behind. Don't get left in the dust.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onRequestCustomSolution}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 flex items-center gap-2"
              >
                Schedule a Call
                <Phone className="w-5 h-5" />
              </button>
              
              <a 
                href="#features"
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
              >
                Explore Features
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <SocialMediaDashboard />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Key Benefits Section */}
      <motion.div variants={itemVariants} className="mb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-6">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Key Benefits
            </h2>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4">
            Our AI social media automation delivers measurable improvements to your digital presence
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Clock,
              title: "Save 20+ Hours Weekly",
              description: "Reclaim valuable time by automating content creation, scheduling, and engagement",
              color: "from-purple-500/20 to-blue-500/20"
            },
            {
              icon: Target,
              title: "Consistent Posting",
              description: "Maintain a regular posting schedule across all platforms without manual effort",
              color: "from-blue-500/20 to-cyan-500/20"
            },
            {
              icon: Sparkles,
              title: "AI-Generated Content",
              description: "Create engaging, platform-optimized content tailored to your brand voice and audience",
              color: "from-cyan-500/20 to-teal-500/20"
            },
            {
              icon: BarChart,
              title: "Performance Analytics",
              description: "Gain valuable insights with comprehensive performance tracking and reporting",
              color: "from-teal-500/20 to-green-500/20"
            }
          ].map((benefit, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="relative p-6 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/30 transition-all duration-300 group"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
              
              {/* Animated glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300"></div>
              
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors duration-300 backdrop-blur-sm">
                  <benefit.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-300 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div variants={itemVariants} className="mb-16" id="features">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-6">
            <Zap className="w-5 h-5 text-purple-400" />
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Powerful Features
            </h2>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4">
            Comprehensive capabilities designed to transform your social media strategy
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Sparkles,
              title: "AI Content Creation",
              description: "Generate platform-specific content that resonates with your audience and aligns with your brand voice",
              color: "from-purple-500/20 to-blue-500/20"
            },
            {
              icon: Calendar,
              title: "Smart Scheduling",
              description: "Automatically post at optimal times for maximum engagement based on platform analytics",
              color: "from-blue-500/20 to-cyan-500/20"
            },
            {
              icon: MessageSquare,
              title: "Automated Engagement",
              description: "Respond to comments and messages with AI-powered responses that sound natural and on-brand",
              color: "from-cyan-500/20 to-teal-500/20"
            },
            {
              icon: Globe,
              title: "Multi-Platform Management",
              description: "Manage all your social media accounts from a single, intuitive dashboard",
              color: "from-teal-500/20 to-green-500/20"
            },
            {
              icon: BarChart,
              title: "Advanced Analytics",
              description: "Track performance metrics and gain actionable insights to continuously improve your strategy",
              color: "from-green-500/20 to-yellow-500/20"
            },
            {
              icon: Target,
              title: "Trend Monitoring",
              description: "Stay ahead of the curve with AI-powered trend detection and content recommendations",
              color: "from-yellow-500/20 to-orange-500/20"
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="relative p-6 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/30 transition-all duration-300 group"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
              
              {/* Animated glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300"></div>
              
              <div className="relative flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 transition-colors duration-300 backdrop-blur-sm">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Implementation Process */}
      <motion.div variants={itemVariants} className="mb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Workflow className="w-6 h-6 text-purple-400" />
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Development & Implementation Process
            </h2>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our streamlined approach ensures a smooth transition to AI-powered social media management
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 to-blue-500/50 -translate-x-1/2 hidden md:block">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-purple-500 to-blue-500 animate-pulse"></div>
          </div>

          <div className="space-y-12 relative">
            {[
              {
                icon: Lightbulb,
                title: "Communication & Goals",
                description: "We begin with an introductory call to understand your needs, establish clear objectives, and provide a preliminary outline of costs and requirements."
              },
              {
                icon: Target,
                title: "Analysis & Planning",
                description: "Our team conducts a thorough analysis of your project requirements, developing a comprehensive plan and calculating the necessary resources and timeframe."
              },
              {
                icon: BrainCircuit,
                title: "Communication & Agreement",
                description: "We schedule a follow-up call to discuss possibilities, finalize pricing for the complete system, and address any potential ongoing costs before proceeding."
              },
              {
                icon: Workflow,
                title: "Development",
                description: "Once agreed, we provide a detailed document outlining all required information, establish communication guidelines, and immediately begin designing and developing your solution."
              },
              {
                icon: Share2,
                title: "Feedback & Improvements",
                description: "After development, we provide a demo for testing and analysis, collect your feedback, implement necessary adjustments, and repeat this process until perfection is achieved."
              },
              {
                icon: Settings,
                title: "Final Delivery",
                description: "We deliver and set up the system, provide comprehensive documentation, and explain the maintenance process if included in your agreement, along with ongoing support options."
              }
            ].map((step, index) => (
              <div key={index} className="md:grid md:grid-cols-2 gap-8 relative">
                <div className={`${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                  <div className={`flex items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} gap-4`}>
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center relative z-10 border border-purple-500/30">
                      <step.icon className="w-6 h-6 text-purple-400" />
                      <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping"></div>
                    </div>
                    <div className="hidden md:block w-12 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                  </div>
                  <motion.div 
                    className="mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </motion.div>
                </div>
                {index % 2 === 1 && <div></div>}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Support Section */}
      <motion.div 
        variants={itemVariants}
        className="relative p-8 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 mb-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05),transparent_80%)]" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-semibold">Ongoing Support & Maintenance</h3>
          </div>
          <p className="text-gray-300 leading-relaxed">
            After deployment, we offer continued support, maintenance, and system adjustments to ensure your social media automation remains effective and up-to-date. This includes content optimization, performance monitoring, and updates to accommodate your evolving social media strategy.
          </p>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        variants={itemVariants}
        className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20 mb-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.15),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Social Media Strategy?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the AI revolution and stay ahead of your competition with our cutting-edge social media automation.
          </p>
          <button
            onClick={onRequestCustomSolution}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-10 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 flex items-center gap-2 mx-auto"
          >
            Schedule a Call
            <Phone className="w-5 h-5" />
          </button>
          <p className="text-gray-400 mt-4">
            Everyone is welcome to schedule a call to discuss your needs and explore how our solutions can benefit your company. 
            There are no strings attached, and scheduling a call is completely non-binding.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}