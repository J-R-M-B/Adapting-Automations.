import { useState } from 'react';
import { 
  Wrench, Zap, Cpu, Settings, Workflow, ArrowRight, 
  Target, DollarSign, Clock, Lightbulb, CheckCircle2, ArrowUpRight,
  ChevronDown, Sparkles, Phone, Database, BrainCircuit, Code
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionSeparator } from '../ui/section-separator';

export function CustomAutomationsSection() {
  const [activeProcess, setActiveProcess] = useState<number | null>(null);

  const processes = [
    {
      icon: Lightbulb,
      title: "Discovery & Planning",
      description: "Initial consultation to understand your needs, goals, and requirements. We work together to identify the perfect automation solution for your business."
    },
    {
      icon: Target,
      title: "Research & Design",
      description: "Our team researches and designs a tailored solution, creating detailed sketches and plans to ensure the automation perfectly fits your needs."
    },
    {
      icon: Code,
      title: "Beta Development",
      description: "We create a beta version of your automation solution, implementing core functionalities while maintaining flexibility for adjustments."
    },
    {
      icon: Workflow,
      title: "Demo & Feedback",
      description: "We demonstrate the solution's capabilities, gather your feedback, and make any necessary adjustments to ensure it meets your expectations."
    },
    {
      icon: BrainCircuit,
      title: "Implementation & Training",
      description: "Final implementation of your solution, followed by comprehensive training to ensure your team can effectively utilize all features."
    }
  ];

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6"
          >
            <Wrench className="w-4 h-4" />
            <span>Premium Custom Solutions</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Custom-Built for Your Business Needs
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
          >
            The future of business is automation—companies that embrace AI will dominate, while others fall behind. No matter how complex or time-consuming the task, AI can automate it. From planning and tracking systems to advanced data gathering, we create tailored solutions that integrate seamlessly with your existing software.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Cpu,
              title: "AI Integration",
              description: "Custom AI models and machine learning solutions tailored to your specific business needs and data requirements.",
              features: [
                "Custom AI models",
                "Machine learning integration",
                "Natural language processing",
                "Predictive analytics"
              ]
            },
            {
              icon: Code,
              title: "Custom Development",
              description: "Bespoke automation solutions built from the ground up to match your exact specifications and workflow.",
              features: [
                "Custom workflows",
                "API development",
                "System integration",
                "Data processing"
              ]
            },
            {
              icon: Database,
              title: "Data Solutions",
              description: "Comprehensive data management and analytics systems that turn information into actionable insights.",
              features: [
                "Data collection",
                "Analytics dashboards",
                "Automated reporting",
                "Real-time monitoring"
              ]
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-2xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 transition-all duration-300 backdrop-blur-sm overflow-hidden hover:scale-[1.02] border-2 border-[#2A0A29]"
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-2xl border border-purple-500/0 group-hover:border-purple-500/50 transition-colors duration-300" />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-2xl border border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.5)] group-hover:shadow-[0_0_20px_rgba(147,51,234,0.7)] transition-shadow duration-300" />
              </div>

              <div className="relative z-10">
                <feature.icon className="w-12 h-12 text-purple-500 mb-4 transform group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Implementation Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-12">Our Implementation Process</h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {processes.map((process, index) => (
              <div
                key={index}
                className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/60 to-[#0a0a1f]/60 border border-purple-500/20 group hover:border-purple-500/40 transition-all duration-300"
                onMouseEnter={() => setActiveProcess(index)}
                onMouseLeave={() => setActiveProcess(null)}
              >
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                  <process.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{process.title}</h4>
                <p className="text-gray-400 text-sm">{process.description}</p>
                
                {index < processes.length - 1 && (
                  <ArrowRight 
                    className={`absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-purple-400 transition-opacity duration-300 hidden lg:block ${
                      activeProcess === index ? 'opacity-100' : 'opacity-30'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/solutions#custom"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 flex items-center gap-2 mx-auto w-fit"
          >
            Schedule a Call
            <Phone className="w-5 h-5" />
          </Link>
          <p className="text-gray-400 mt-4 mb-16 max-w-xl mx-auto">
            Everyone is welcome to schedule a call to discuss your needs and explore how our solutions can benefit your company. There are no strings attached, and scheduling a call is completely non-binding.
          </p>
        </motion.div>
      </div>
      
      <SectionSeparator position="bottom" />
    </div>
  );
}