import { useState, useEffect } from 'react';
import { 
  Mail, CheckCircle2, ArrowUpRight, Settings, Workflow, Zap, 
  ArrowRight, MessageSquare, Globe, Database, Shield, Sparkles, 
  Laptop, BrainCircuit, Lightbulb, Layers, Target, 
  Users, Send, Search, Filter, Phone, Plus
} from 'lucide-react';
import { Solution } from '../../types/solutions';
import { motion } from 'framer-motion';
import { BarChart } from '../ui/bar-chart';

interface OutreachSolutionTabProps {
  solution: Solution;
  onRequestCustomSolution: () => void;
}

export function OutreachSolutionTab({ solution, onRequestCustomSolution }: OutreachSolutionTabProps) {
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

  // Outreach Dashboard Animation
  const OutreachAnimation = () => {
    const [animationStage, setAnimationStage] = useState(0);
    
    useEffect(() => {
      if (!isVisible) return;
      
      // Start animation sequence
      const timer1 = setTimeout(() => setAnimationStage(1), 1000);
      const timer2 = setTimeout(() => setAnimationStage(2), 2000);
      const timer3 = setTimeout(() => setAnimationStage(3), 3000);
      const timer4 = setTimeout(() => setAnimationStage(4), 4000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }, [isVisible]);

    return (
      <div className="bg-gray-900/70 rounded-xl p-4 h-[300px] overflow-hidden">
        {/* Dashboard header */}
        <div className="flex items-center justify-between border-b border-gray-700 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Mail className="text-purple-400 w-5 h-5" />
            <span className="font-medium">Outreach Dashboard</span>
          </div>
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
              <BarChart className="w-3 h-3 text-purple-400" />
            </div>
            <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Settings className="w-3 h-3 text-purple-400" />
            </div>
          </div>
        </div>
        
        {/* Dashboard content */}
        <div className="grid grid-cols-3 gap-3 h-[calc(100%-40px)]">
          {/* Left column - Targeting */}
          <div className="col-span-1 space-y-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: animationStage >= 1 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800/50 rounded-lg p-3 h-1/2"
            >
              <div className="text-xs font-medium mb-2 flex items-center gap-1">
                <Target className="w-3 h-3 text-purple-400" />
                <span>Target Finder</span>
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                <Search className="w-3 h-3 text-gray-400" />
                <div className="flex-grow h-5 bg-gray-700/50 rounded"></div>
                <Filter className="w-3 h-3 text-purple-400" />
              </div>
              <div className="space-y-1.5">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-gray-700/50"></div>
                    <div className="flex-grow h-4 bg-gray-700/30 rounded"></div>
                    <div className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Plus className="w-2 h-2 text-purple-400" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: animationStage >= 2 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800/50 rounded-lg p-3 h-1/2"
            >
              <div className="text-xs font-medium mb-2 flex items-center gap-1">
                <Users className="w-3 h-3 text-purple-400" />
                <span>Decision Makers</span>
              </div>
              <div className="space-y-1.5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-gray-700/50"></div>
                    <div className="flex-grow">
                      <div className="h-1.5 w-full bg-gray-700/50 rounded mb-1"></div>
                      <div className="h-1.5 w-2/3 bg-gray-700/30 rounded"></div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${i === 1 || i === 3 ? 'bg-green-500/50' : 'bg-gray-600/50'}`}></div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Middle column - Email Composer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: animationStage >= 3 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-1 bg-gray-800/30 rounded-lg p-3"
          >
            <div className="text-xs font-medium mb-2 flex items-center gap-1">
              <Mail className="w-3 h-3 text-purple-400" />
              <span>Email Composer</span>
            </div>
            <div className="space-y-2">
              <div className="h-5 bg-gray-700/30 rounded px-2 flex items-center">
                <div className="text-[10px] text-gray-400">To:</div>
                <div className="ml-1 px-1.5 py-0.5 bg-purple-500/20 rounded text-[10px] text-purple-300">CEO@company.com</div>
              </div>
              <div className="h-5 bg-gray-700/30 rounded px-2 flex items-center">
                <div className="text-[10px] text-gray-400">Subject:</div>
                <div className="ml-1 text-[10px] text-gray-300">Personalized Outreach</div>
              </div>
              <div className="h-24 bg-gray-700/30 rounded p-2">
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-gray-600/50 rounded"></div>
                  <div className="h-1.5 w-3/4 bg-gray-600/50 rounded"></div>
                  <div className="h-1.5 w-full bg-gray-600/50 rounded"></div>
                  <div className="h-1.5 w-5/6 bg-gray-600/50 rounded"></div>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="w-16 h-6 bg-purple-500/30 rounded flex items-center justify-center">
                  <Send className="w-3 h-3 text-purple-400" />
                  <span className="text-[10px] ml-1">Send</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right column - Analytics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: animationStage >= 4 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-1 bg-gray-800/30 rounded-lg p-3"
          >
            <div className="text-xs font-medium mb-2 flex items-center gap-1">
              <BarChart className="w-3 h-3 text-purple-400" />
              <span>Campaign Analytics</span>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                <span>Open Rate</span>
                <span>95%</span>
              </div>
              <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500/50 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                <span>Response Rate</span>
                <span>45%</span>
              </div>
              <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500/50 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                <span>Conversion</span>
                <span>12%</span>
              </div>
              <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500/50 rounded-full" style={{ width: '12%' }}></div>
              </div>
            </div>
            <div className="mt-3 p-2 bg-gray-700/30 rounded">
              <div className="text-[10px] text-gray-400 mb-1">Daily Sent: 120/150</div>
              <div className="w-full h-1.5 bg-gray-600/50 rounded-full overflow-hidden">
                <div className="h-full bg-green-500/50 rounded-full" style={{ width: '80%' }}></div>
              </div>
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
        
        {/* Animated particles or lines could be added here */}
        <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-12">
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
              <Mail className="w-4 h-4" />
              <span>AI-Powered Solution</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Outreach Automation
            </h1>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              AI-driven outreach is the future of sales, and those who fail to adopt it will struggle to compete. Our system automates email outreach up to over 1,000 emails per day precisely targeted at high-ranking decision-makers. By gathering data from sources like Google and LinkedIn, the system crafts highly personalized emails with tailored compliments and offers based on the recipient's industry, business model, and other key factors. With a 95% inbox placement rate, this is the most efficient way to grow your business.
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
              <OutreachAnimation />
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
            Our AI outreach automation delivers measurable improvements to your sales and marketing efforts
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {
              icon: Sparkles,
              title: "Fully Personalized Emails",
              description: "AI-crafted messages tailored to each recipient's background, interests, and business needs",
              color: "from-purple-500/20 to-blue-500/20"
            },
            {
              icon: Target,
              title: "95% Inbox Placement",
              description: "Industry-leading deliverability ensures your messages reach their intended recipients",
              color: "from-blue-500/20 to-cyan-500/20"
            },
            {
              icon: Zap,
              title: "Scalable (100+/day)",
              description: "Send hundreds of personalized outreach emails daily without sacrificing quality",
              color: "from-cyan-500/20 to-teal-500/20"
            },
            {
              icon: MessageSquare,
              title: "Centralized Inbox",
              description: "Manage all responses in one place for streamlined follow-up and conversation tracking",
              color: "from-teal-500/20 to-green-500/20"
            },
            {
              icon: Filter,
              title: "Precise Targeting",
              description: "Reach decision-makers with pinpoint accuracy based on role, industry, and company size",
              color: "from-green-500/20 to-yellow-500/20"
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
            Comprehensive capabilities designed to transform your outreach efforts
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: "Precision Targeting",
              description: "Identify and reach high-ranking decision-makers within companies, delivering messages directly to their personal inboxes",
              color: "from-purple-500/20 to-blue-500/20"
            },
            {
              icon: Send,
              title: "Automated Follow-ups",
              description: "Schedule strategic follow-up sequences that trigger based on recipient behavior and optimal timing",
              color: "from-blue-500/20 to-cyan-500/20"
            },
            {
              icon: Sparkles,
              title: "Personalized Emails",
              description: "AI-powered system gathers data and crafts perfectly tailored emails with personalized offers for each prospect",
              color: "from-cyan-500/20 to-teal-500/20"
            },
            {
              icon: BarChart,
              title: "Comprehensive Analytics",
              description: "Track open rates, response rates, and conversion metrics to continuously optimize your campaigns",
              color: "from-teal-500/20 to-green-500/20"
            },
            {
              icon: Search,
              title: "Data Enrichment",
              description: "Automatically gather and analyze prospect information from multiple online sources to enhance personalization",
              color: "from-green-500/20 to-yellow-500/20"
            },
            {
              icon: Database,
              title: "Lead Management",
              description: "Organize and prioritize prospects with an intelligent system that learns from engagement patterns",
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
            Our streamlined approach ensures a smooth transition to AI-powered outreach
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
                icon: Send,
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
            After deployment, we offer continued support, maintenance, and system adjustments to ensure your outreach automation remains effective and up-to-date. This includes performance monitoring, targeting optimization, and updates to accommodate your evolving business needs.
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Outreach Strategy?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the AI revolution and stay ahead of your competition with our cutting-edge outreach automation.
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