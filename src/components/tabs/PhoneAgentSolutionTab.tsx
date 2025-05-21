import { useState, useEffect } from 'react';
import { 
  Phone, CheckCircle2, ArrowUpRight, Settings, Workflow, Zap, 
  ArrowRight, MessageSquare, Globe, Database, Shield, Sparkles, 
  Laptop, BrainCircuit, Lightbulb, Layers, Calendar, Clock,
  Headphones, FileText, Mic, Languages, Target
} from 'lucide-react';
import { Solution } from '../../types/solutions';
import { motion } from 'framer-motion';
import { BarChart } from '../ui/bar-chart';

interface PhoneAgentSolutionTabProps {
  solution: Solution;
  onRequestCustomSolution: () => void;
}

export function PhoneAgentSolutionTab({ solution, onRequestCustomSolution }: PhoneAgentSolutionTabProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
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

  // Phone call animation
  const PhoneCallAnimation = () => {
    const [callStage, setCallStage] = useState(0);
    const [isRinging, setIsRinging] = useState(true);
    
    useEffect(() => {
      if (!isVisible) return;
      
      // Start call animation sequence
      const timer1 = setTimeout(() => {
        setIsRinging(false);
        setCallStage(1);
      }, 2000);
      
      const timer2 = setTimeout(() => {
        setCallStage(2);
      }, 4000);
      
      const timer3 = setTimeout(() => {
        setCallStage(3);
      }, 6000);
      
      const timer4 = setTimeout(() => {
        setCallStage(4);
      }, 8000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }, [isVisible]);

    return (
      <div className="bg-gray-900/70 rounded-xl p-6 h-[300px] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between border-b border-gray-700 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Phone className="text-purple-400 w-5 h-5" />
            <span className="font-medium">AI Phone Agent</span>
          </div>
          <div className="text-sm text-gray-400">
            {isRinging ? "Incoming call..." : `Call duration: ${callStage}:${callStage * 15}`}
          </div>
        </div>
        
        <div className="flex-grow flex flex-col justify-center items-center">
          {isRinging ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 animate-pulse">
                <Phone className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-lg font-medium">Incoming call from Customer</p>
              <p className="text-gray-400 text-sm mt-2">AI Agent is answering...</p>
            </div>
          ) : (
            <div className="w-full space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: callStage >= 1 ? 1 : 0 }}
                className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20"
              >
                <p className="text-purple-300 font-medium">AI Agent:</p>
                <p className="text-gray-300">Thank you for calling. How may I assist you today?</p>
              </motion.div>
              
              {callStage >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gray-800/50 p-3 rounded-lg border border-gray-700"
                >
                  <p className="text-blue-300 font-medium">Customer:</p>
                  <p className="text-gray-300">I'd like to schedule an appointment for next Tuesday.</p>
                </motion.div>
              )}
              
              {callStage >= 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20"
                >
                  <p className="text-purple-300 font-medium">AI Agent:</p>
                  <p className="text-gray-300">I'd be happy to help you schedule that. We have openings at 10:00 AM, 2:30 PM, and 4:00 PM on Tuesday. Which time works best for you?</p>
                </motion.div>
              )}
              
              {callStage >= 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gray-800/50 p-3 rounded-lg border border-gray-700"
                >
                  <p className="text-blue-300 font-medium">Customer:</p>
                  <p className="text-gray-300">2:30 PM would be perfect.</p>
                </motion.div>
              )}
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-700 pt-3 mt-auto">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Call transcription active</span>
            <span>Sentiment analysis: Positive</span>
          </div>
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
        
        {/* Animated particles or lines could be added here */}
        <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-12">
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
              <Phone className="w-4 h-4" />
              <span>AI-Powered Solution</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              The Future of Customer Support
            </h1>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Revolutionize your customer interactions with AI-driven phone agents before your competitors do. Available 24/7 and capable of handling conversations in any language, these intelligent systems provide seamless customer service, reservation scheduling, and more. With a custom knowledge base and advanced integrations, they deliver accurate, real-time assistance with a human-like voice. Every call is fully transcribed, offering valuable insights for your business. AI is taking over customer support—if you're not adapting, you're falling behind.
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
              <PhoneCallAnimation />
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
            Our AI phone agents deliver measurable improvements to your business operations and customer experience
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Clock,
              title: "24/7 Availability",
              description: "Provide round-the-clock customer support without increasing staffing costs or resources",
              color: "from-purple-500/20 to-blue-500/20"
            },
            {
              icon: Sparkles,
              title: "No Waiting Time",
              description: "Eliminate customer wait times with instant call answering and efficient service",
              color: "from-blue-500/20 to-cyan-500/20"
            },
            {
              icon: BarChart,
              title: "Clear Analytics",
              description: "Gain valuable insights from detailed call transcriptions and sentiment analysis",
              color: "from-cyan-500/20 to-teal-500/20"
            },
            {
              icon: Laptop,
              title: "Time Saving",
              description: "Free up your team's time by automating routine customer interactions and inquiries",
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
            Comprehensive capabilities designed to transform your customer interactions
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Calendar,
              title: "Appointment Scheduling",
              description: "Takes appointment details, checks availability, offers alternatives, and schedules confirmed appointments directly into your system",
              color: "from-purple-500/20 to-blue-500/20"
            },
            {
              icon: Database,
              title: "Custom Knowledge Base",
              description: "Custom-built knowledge repository with deep understanding of your company, services, and policies to answer complex questions",
              color: "from-blue-500/20 to-cyan-500/20"
            },
            {
              icon: Layers,
              title: "Custom Tools",
              description: "Purpose-built tools that can be used during calls to process, verify, or edit data provided by customers in real-time",
              color: "from-cyan-500/20 to-teal-500/20"
            },
            {
              icon: Workflow,
              title: "Third-Party Integrations",
              description: "Seamlessly connects with your existing software ecosystem to fully automate processes and maintain data consistency",
              color: "from-teal-500/20 to-green-500/20"
            },
            {
              icon: Headphones,
              title: "Listen Mode",
              description: "AI listens to calls, creates transcriptions, and automatically analyzes emotions, decisions, and other key conversation elements",
              color: "from-green-500/20 to-yellow-500/20"
            },
            {
              icon: Languages,
              title: "Multi-Language Support",
              description: "Handles conversations in multiple languages, expanding your ability to serve a diverse customer base",
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

      {/* Performance Metrics */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="relative p-6 rounded-xl bg-gradient-to-b from-gray-900/50 to-gray-800/50 border-2 border-[#2A0A29] overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.1),transparent_70%)] animate-pulse"></div>
          
          <div className="relative">
            <h3 className="text-lg font-semibold mb-8 flex items-center gap-2">
              <Phone className="w-5 h-5 text-purple-400" /> Call Center Metrics
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "System Status", value: "Online", change: "Active", isPositive: true },
                { label: "Voice Models", value: "Ready", change: "Active", isPositive: true },
                { label: "Call Quality", value: "HD", change: "Stable", isPositive: true },
                { label: "AI Response", value: "Real-time", change: "Active", isPositive: true }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-gray-800/50 border border-gray-700"
                >
                  <div className="text-sm text-gray-400 mb-2">{metric.label}</div>
                  <div className="text-2xl font-semibold mb-2">{metric.value}</div>
                  <div className={`flex items-center gap-1 text-sm ${
                    metric.isPositive ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <ArrowUpRight className="w-4 h-4" />
                    <span>{metric.change}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Real-time call volume chart */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-400">Real-time Call Volume</span>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-gray-400">Active Calls</span>
                </div>
              </div>
              <div className="h-24 flex items-end gap-1">
                {[40, 65, 45, 80, 55, 70, 50, 90, 60, 75, 45, 85].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="flex-1 bg-gradient-to-t from-purple-500/20 to-purple-500/40 rounded-t"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div className="relative p-6 rounded-xl bg-gray-900/50 border-2 border-[#2A0A29]">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Workflow className="w-5 h-5 text-purple-400" /> Integrations
          </h3>
          <ul className="space-y-4">
            {solution.integrations.map((integration, index) => (
              <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-200">
                <Zap className="w-5 h-5 text-purple-400 mt-1" />
                <span className="text-lg">{integration}</span>
              </li>
            ))}
          </ul>
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
            From concept to deployment, our structured approach ensures a smooth transition to AI-powered phone support
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
                icon: Phone,
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
            After deployment, we offer continued support, maintenance, and system adjustments to ensure your phone agent remains effective and up-to-date. This includes voice model updates, knowledge base maintenance, and optimization based on call analytics.
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Customer Service?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the AI revolution and stay ahead of your competition with our cutting-edge phone agent solutions.
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