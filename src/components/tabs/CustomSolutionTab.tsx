import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wrench, Zap, Cpu, Settings, Workflow, ArrowRight, 
  Target, DollarSign, Clock, Lightbulb, CheckCircle2, ArrowUpRight,
  ChevronDown, Sparkles, Phone, Code, Database, BrainCircuit,
  Plus, Minus, X, FileText, BarChart, Globe, MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CustomSolutionTabProps {
  onRequestCustomSolution: () => void;
}

export function CustomSolutionTab({ onRequestCustomSolution }: CustomSolutionTabProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [budget, setBudget] = useState(5000);
  const [projectDescription, setProjectDescription] = useState('');
  const [integrations, setIntegrations] = useState<string[]>(['']);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const budgetRef = useRef<HTMLDivElement>(null);

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

  const handleAddIntegration = () => {
    setIntegrations([...integrations, '']);
  };

  const handleRemoveIntegration = (index: number) => {
    const newIntegrations = [...integrations];
    newIntegrations.splice(index, 1);
    setIntegrations(newIntegrations);
  };

  const handleIntegrationChange = (index: number, value: string) => {
    const newIntegrations = [...integrations];
    newIntegrations[index] = value;
    setIntegrations(newIntegrations);
  };

  const formatBudget = (value: number) => {
    return `€${value.toLocaleString()}`;
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
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
              <Wrench className="w-4 h-4" />
              <span>Premium Custom Solutions</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Tailored Automation for Your Business
            </h1>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              The future of business is automation—companies that embrace AI will dominate, while others fall behind. No matter how complex or time-consuming the task, AI can automate it. From planning and tracking systems to advanced data gathering, we create tailored solutions that integrate seamlessly with your existing software.
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
                href="#configuration"
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
              >
                Configure Your Solution
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md relative p-6 rounded-xl bg-gray-900/70 border border-purple-500/30 h-[300px] overflow-hidden">
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-xl opacity-50">
                <div className="absolute inset-0 rounded-xl border border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]" />
              </div>
              
              {/* Energy wave effects */}
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)] animate-[energyFlow_30s_ease-in-out_infinite]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05),transparent_80%)] animate-[energyFlow_40s_ease-in-out_infinite_reverse]" />
              </div>
              
              <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-xl font-bold mb-4 text-white">Endless Possibilities</h3>
                <div className="space-y-4 flex-grow">
                  {[
                    { icon: Cpu, text: "Advanced AI Integration" },
                    { icon: Database, text: "Custom Database Solutions" },
                    { icon: Workflow, text: "End-to-End Workflow Automation" },
                    { icon: BrainCircuit, text: "Intelligent Decision Systems" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-purple-400" />
                      </div>
                      <span className="text-gray-200">{item.text}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center text-gray-400 mt-4">
                  If you can imagine it, we can automate it.
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Key Message Section */}
      <motion.div variants={itemVariants} className="mb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-6">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Why Automation Matters
            </h2>
          </div>
          <p className="text-gray-400 max-w-3xl mx-auto mt-4">
            AI is transforming industries at a rapid pace—are you ready to take advantage, or will you be left behind?
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Clock,
              title: "Save Time",
              description: "Automate repetitive tasks and free up your team to focus on high-value activities that drive growth.",
              color: "from-purple-500/20 to-blue-500/20"
            },
            {
              icon: DollarSign,
              title: "Reduce Costs",
              description: "Cut operational expenses by up to 60% through intelligent automation of manual processes.",
              color: "from-blue-500/20 to-cyan-500/20"
            },
            {
              icon: Target,
              title: "Gain Competitive Edge",
              description: "Stay ahead of competitors by leveraging AI to optimize every aspect of your business.",
              color: "from-cyan-500/20 to-teal-500/20"
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

      {/* Configuration Section */}
      <motion.div variants={itemVariants} className="mb-16" id="configuration">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-6">
            <Settings className="w-5 h-5 text-purple-400" />
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Custom Solution Configuration
            </h2>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4">
            Tell us about your needs and we'll create a tailored automation solution that perfectly fits your business.
          </p>
        </div>
        
        <div className="relative p-8 rounded-2xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 backdrop-blur-sm overflow-hidden">
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
          
          <div className="relative z-10">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Budget & Description */}
              <div className="space-y-8">
                {/* Budget Slider */}
                <div ref={budgetRef}>
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-purple-400" /> Budget Range
                  </h3>
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">€500</span>
                      <span className="text-white font-semibold">{formatBudget(budget)}</span>
                      <span className="text-gray-400">€20,000+</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="20000"
                      step="500"
                      value={budget}
                      onChange={(e) => setBudget(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                      <p className="text-sm text-gray-300">
                        Our solutions start at €500 for simple automations and scale based on complexity. 
                        For enterprise-level solutions, we offer custom pricing beyond €20,000.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Project Description */}
                <div>
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-400" /> Project Description
                  </h3>
                  <textarea
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Describe what you'd like to automate. The more details you provide, the better we can understand your needs."
                    className="w-full h-40 px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                  />
                </div>
              </div>
              
              {/* Right Column - Integrations & CTA */}
              <div className="space-y-8">
                {/* Integration Systems */}
                <div>
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Workflow className="w-5 h-5 text-purple-400" /> Current Systems & Integrations
                  </h3>
                  <div className="space-y-3">
                    {integrations.map((integration, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={integration || ''}
                          onChange={(e) => handleIntegrationChange(index, e.target.value.trim())}
                          placeholder={`System/Software ${index + 1}`}
                          className="flex-grow px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        />
                        {index === 0 ? (
                          <button
                            onClick={handleAddIntegration}
                            className="p-3 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-colors"
                            aria-label="Add integration"
                          >
                            <Plus className="w-5 h-5 text-purple-400" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRemoveIntegration(index)}
                            className="p-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors group"
                            aria-label="Remove integration"
                          >
                            <X className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
                          </button>
                        )}
                      </div>
                    ))}
                    <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                        <p className="text-sm text-gray-300">
                          List the software and systems you currently use. This helps us design a solution that integrates seamlessly with your existing workflow.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* CTA */}
                <div className="mt-8">
                  <button
                    onClick={onRequestCustomSolution}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 flex items-center justify-center gap-2 group"
                  >
                    Schedule a Call
                    <Phone className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-center text-gray-400 mt-4">
                    We'd love to explore your business with you, identifying processes or tasks that can be automated. 
                    Whether you have a clear vision or need expert input, we're here to help bring automation into your workflow.
                  </p>
                  <p className="text-center text-gray-400 mt-2">
                    <span className="text-purple-400">Note:</span> Scheduling a call is completely non-binding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Expandable Sections */}
      <motion.div variants={itemVariants} className="mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Techniques Section */}
          <div className="relative p-6 rounded-xl bg-gray-900/50 border-2 border-[#2A0A29] overflow-hidden">
            <button 
              onClick={() => toggleSection('techniques')}
              className="w-full flex items-center justify-between"
            >
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Code className="w-5 h-5 text-purple-400" /> Our Techniques
              </h3>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeSection === 'techniques' ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {activeSection === 'techniques' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      The possibilities are endless—if you can imagine it, we can automate it. We use cutting-edge technologies to create custom solutions that perfectly fit your business needs.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "AI & Machine Learning",
                        "Natural Language Processing",
                        "Computer Vision",
                        "Process Automation",
                        "Data Integration",
                        "Custom API Development",
                        "Workflow Optimization",
                        "Predictive Analytics"
                      ].map((technique, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-gray-800/50">
                          <CheckCircle2 className="w-4 h-4 text-purple-400" />
                          <span className="text-sm">{technique}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Past Projects Section */}
          <div className="relative p-6 rounded-xl bg-gray-900/50 border-2 border-[#2A0A29] overflow-hidden">
            <button 
              onClick={() => toggleSection('projects')}
              className="w-full flex items-center justify-between"
            >
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-400" /> Past Projects
              </h3>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeSection === 'projects' ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {activeSection === 'projects' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      AI is transforming industries at a rapid pace—our clients are already taking advantage. Here are some examples of custom solutions we've built:
                    </p>
                    <div className="space-y-3">
                      {[
                        {
                          title: "Automated Document Processing",
                          description: "Reduced processing time by 85% for a legal firm"
                        },
                        {
                          title: "Inventory Management System",
                          description: "Cut inventory costs by 32% for a retail chain"
                        },
                        {
                          title: "Customer Support Automation",
                          description: "Handled 78% of inquiries without human intervention"
                        }
                      ].map((project, index) => (
                        <div key={index} className="p-3 rounded-lg bg-gray-800/50">
                          <h4 className="font-medium text-purple-300">{project.title}</h4>
                          <p className="text-sm text-gray-400">{project.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Use Cases Grid */}
      <motion.div variants={itemVariants} className="mb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-6">
            <Lightbulb className="w-5 h-5 text-purple-400" />
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Potential Use Cases
            </h2>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4">
            From administration to advanced data gathering, we can automate entire workflows with solutions that integrate seamlessly with your existing software.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: MessageSquare,
              title: "Customer Communication",
              description: "Automate responses to common inquiries while maintaining a personal touch.",
              color: "from-purple-500/20 to-blue-500/20"
            },
            {
              icon: Database,
              title: "Data Processing & Analysis",
              description: "Transform raw data into actionable insights automatically.",
              color: "from-blue-500/20 to-cyan-500/20"
            },
            {
              icon: Globe,
              title: "Web Scraping & Monitoring",
              description: "Gather and analyze data from websites to inform business decisions.",
              color: "from-cyan-500/20 to-teal-500/20"
            },
            {
              icon: BarChart,
              title: "Reporting & Analytics",
              description: "Generate comprehensive reports automatically on your schedule.",
              color: "from-teal-500/20 to-green-500/20"
            },
            {
              icon: Workflow,
              title: "Business Process Automation",
              description: "Streamline complex workflows across departments and systems.",
              color: "from-green-500/20 to-yellow-500/20"
            },
            {
              icon: Settings,
              title: "System Integration",
              description: "Connect disparate systems for seamless data flow and operations.",
              color: "from-yellow-500/20 to-orange-500/20"
            }
          ].map((useCase, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="relative p-6 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/30 transition-all duration-300 group"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
              
              {/* Animated glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300"></div>
              
              <div className="relative flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 transition-colors duration-300 backdrop-blur-sm">
                  <useCase.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-300 transition-colors duration-300">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {useCase.description}
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
            Our streamlined approach ensures a smooth transition to custom automation
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

      {/* Final CTA Section */}
      <motion.div 
        variants={itemVariants}
        className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20 mb-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.15),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Companies that embrace AI will dominate, while others fall behind. Don't get left behind—start your automation journey today.
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