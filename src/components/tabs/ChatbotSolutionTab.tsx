import { useState, useEffect } from 'react';
import { 
  Bot, CheckCircle2, ArrowUpRight, Settings, Workflow, Zap, 
  ArrowRight, MessageSquare, Globe, Database, Shield, Sparkles, 
  Laptop, BrainCircuit, Lightbulb, Layers, Phone, Target
} from 'lucide-react';
import { Solution } from '../../types/solutions';
import { motion } from 'framer-motion';

interface ChatbotSolutionTabProps {
  solution: Solution;
  onRequestCustomSolution: () => void;
}

export function ChatbotSolutionTab({ solution, onRequestCustomSolution }: ChatbotSolutionTabProps) {
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

  // Chat animation
  const ChatAnimation = () => {
    const [messages, setMessages] = useState<{text: string, isBot: boolean, isVisible: boolean}[]>([
      { text: "Hi, I need help with my order #12345", isBot: false, isVisible: false },
      { text: "I'd be happy to help you with your order. Let me check the status for you.", isBot: true, isVisible: false },
      { text: "Your order #12345 has been shipped and will arrive tomorrow by 5 PM.", isBot: true, isVisible: false },
      { text: "Great! Can I change the delivery address?", isBot: false, isVisible: false },
      { text: "Certainly! I can update that for you. What's the new address?", isBot: true, isVisible: false }
    ]);

    useEffect(() => {
      const showMessages = async () => {
        for (let i = 0; i < messages.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          setMessages(prev => prev.map((msg, idx) => 
            idx === i ? { ...msg, isVisible: true } : msg
          ));
        }
      };
      
      if (isVisible) {
        showMessages();
      }
    }, [isVisible]);

    return (
      <div className="bg-gray-900/70 rounded-xl p-4 h-[300px] overflow-hidden">
        <div className="flex items-center gap-2 border-b border-gray-700 pb-3 mb-4">
          <Bot className="text-purple-400 w-5 h-5" />
          <span className="font-medium">AI Assistant</span>
        </div>
        <div className="space-y-3 overflow-y-auto h-[calc(100%-40px)]">
          {messages.map((message, index) => (
            message.isVisible && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.isBot 
                    ? 'bg-gray-800 text-white rounded-tl-none' 
                    : 'bg-purple-600 text-white rounded-tr-none'
                }`}>
                  {message.text}
                </div>
              </motion.div>
            )
          ))}
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
              <Bot className="w-4 h-4" />
              <span>AI-Powered Solution</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Transform Customer Service with AI Chat Bots
            </h1>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              AI is revolutionizing business with smarter, more efficient solutions. Our AI-driven chatbots automate 80% of customer service tasks, delivering instant, accurate responses 24/7. We craft custom functions like product recommendations, order lookups, or bespoke features tailored to your company's unique needs seamlessly integrating with your existing systems. This isn't just an upgrade; it's the future of streamlined operations. Are you ready to lead?
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
              <ChatAnimation />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Key Benefits Section */}
      <motion.div variants={itemVariants} className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Key Benefits</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our AI chatbots deliver measurable improvements to your business operations and customer experience
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Sparkles,
              title: "80% Service Reduction",
              description: "Dramatically reduce customer service workload by automating routine inquiries and support tasks"
            },
            {
              icon: Globe,
              title: "24/7 Availability",
              description: "Provide instant support around the clock without increasing staffing costs or resources"
            },
            {
              icon: Laptop,
              title: "Enhanced Experience",
              description: "Deliver consistent, personalized interactions that improve customer satisfaction"
            },
            {
              icon: Database,
              title: "Cost Efficiency",
              description: "Lower operational expenses while maintaining or improving service quality"
            }
          ].map((benefit, index) => (
            <div 
              key={index}
              className="relative p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/30 transition-all duration-300 group hover:bg-gray-900/70"
            >
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-xl border border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)] group-hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-shadow duration-300" />
              </div>
              
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors duration-300">
                  <benefit.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-300 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div variants={itemVariants} className="mb-16" id="features">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-6">
            <Sparkles className="w-5 h-5 text-purple-400" />
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
              icon: Layers,
              title: "Custom Functions",
              description: "Functions custom designed for your business needs, from order tracking to reservation scheduling and product recommendations",
              color: "from-purple-500/20 to-blue-500/20"
            },
            {
              icon: Globe,
              title: "Multi-Language Support",
              description: "Automatically detects and adapts to different languages, providing seamless communication with customers worldwide",
              color: "from-blue-500/20 to-cyan-500/20"
            },
            {
              icon: Workflow,
              title: "Third-Party Integrations",
              description: "Integrates seamlessly with your existing systems and software through API connections",
              color: "from-cyan-500/20 to-teal-500/20"
            },
            {
              icon: BrainCircuit,
              title: "Custom Knowledge Base",
              description: "Tailored knowledge repository with deep understanding of your company, operations, and policies to answer complex questions",
              color: "from-teal-500/20 to-green-500/20"
            },
            {
              icon: MessageSquare,
              title: "Live Chat Handoff",
              description: "Option for users to start a live call or for an employee to take over a chat when needed",
              color: "from-green-500/20 to-yellow-500/20"
            },
            {
              icon: Laptop,
              title: "Analytics Dashboard",
              description: "Comprehensive dashboard to monitor conversations, view analytics, and receive notifications",
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
              <Bot className="w-5 h-5 text-purple-400" /> Chatbot Performance
            </h3>
            
            <div className="space-y-6">
              {[
                { label: "Response Time", value: "Instant", target: "Real-time", percentage: 100 },
                { label: "Active Sessions", value: "Current", target: "Live", percentage: 100 },
                { label: "System Status", value: "Online", target: "24/7", percentage: 100 },
                { label: "Knowledge Base", value: "Updated", target: "Current", percentage: 100 }
              ].map((metric, index) => (
                <div key={index} className="relative">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">{metric.label}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-purple-400">{metric.value}</span>
                      <span className="text-gray-500 text-sm">Target: {metric.target}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
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
            Our streamlined approach ensures a smooth transition to AI-powered customer service
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
                icon: Bot,
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
            After deployment, we offer continued support, maintenance, and system adjustments to ensure your chatbot remains effective and up-to-date. This includes system monitoring, performance optimization, and updates to accommodate your evolving business needs.
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
            Join the AI revolution and stay ahead of your competition with our cutting-edge chatbot solutions.
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

// Helper function for bar chart
function BarChart(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>;
}