import { useState } from 'react';
import { 
  Target, Zap, Clock, DollarSign, Sparkles, Brain, 
  CheckCircle2, LayoutGrid, ArrowRight, Bot, Phone, Globe,
  Share2, Mail, Wrench
} from 'lucide-react';
import { Solution } from '../../types/solutions';
import { motion } from 'framer-motion';

interface OverviewTabProps {
  solutions: Solution[];
  onSelectSolution: (id: string) => void;
}

export function OverviewTab({ solutions, onSelectSolution }: OverviewTabProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="animate-fadeIn"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants} className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Solutions</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Transform Your Business with AI</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Our comprehensive suite of AI solutions is designed to streamline operations, enhance customer experiences, and drive growth across your entire business.
        </p>
      </motion.div>

      {/* Solutions Grid */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {solutions.map((solution) => (
          <motion.div
            key={solution.id}
            className="group relative"
            onMouseEnter={() => setHoveredCard(solution.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => onSelectSolution(solution.id)}
          >
            <div className="relative p-6 rounded-2xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border-2 border-[#2A0A29] transition-all duration-300 cursor-pointer overflow-hidden group-hover:scale-[1.02]">
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-2xl border border-purple-500/0 group-hover:border-purple-500/50 transition-colors duration-300" />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-2xl border border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.5)] group-hover:shadow-[0_0_20px_rgba(147,51,234,0.7)] transition-shadow duration-300" />
              </div>

              {/* Energy wave effects */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)] animate-[energyFlow_30s_ease-in-out_infinite]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05),transparent_80%)] animate-[energyFlow_40s_ease-in-out_infinite_reverse]" />
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                  <solution.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-300 transition-colors">
                  {solution.title}
                </h3>
                <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                  {solution.description}
                </p>
                <div className="flex items-center gap-2 text-purple-400 group-hover:translate-x-2 transition-transform">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Custom Solutions Card */}
        <motion.div
          variants={itemVariants}
          className="group relative"
          onClick={() => onSelectSolution('custom')}
        >
          <div className="relative p-6 rounded-2xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border-2 border-[#2A0A29] transition-all duration-300 cursor-pointer overflow-hidden group-hover:scale-[1.02]">
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-2xl border border-purple-500/0 group-hover:border-purple-500/50 transition-colors duration-300" />
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 rounded-2xl border border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.5)] group-hover:shadow-[0_0_20px_rgba(147,51,234,0.7)] transition-shadow duration-300" />
            </div>

            {/* Energy wave effects */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)] animate-[energyFlow_30s_ease-in-out_infinite]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05),transparent_80%)] animate-[energyFlow_40s_ease-in-out_infinite_reverse]" />
            </div>

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                <Wrench className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-300 transition-colors">
                Custom Solutions
              </h3>
              <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                Custom designed and build for your business needs. Seamlesly intergrate with current systems and flows to reduce cost, save time and scale your business.
              </p>
              <div className="flex items-center gap-2 text-purple-400 group-hover:translate-x-2 transition-transform">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="relative p-6 rounded-xl bg-gray-900/50 border-2 border-[#2A0A29]">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-400" /> Why Choose Our Solutions
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 mt-1" />
              <span>Custom-tailored to your specific business needs</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 mt-1" />
              <span>Seamless integration with your existing systems</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 mt-1" />
              <span>Continuous improvement through machine learning</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 mt-1" />
              <span>Scalable solutions that grow with your business</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 mt-1" />
              <span>Dedicated support and regular updates</span>
            </li>
          </ul>
        </div>

        <div className="relative p-6 rounded-xl bg-gray-900/50 border-2 border-[#2A0A29]">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-400" /> Key Benefits
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-purple-400 mt-1" />
              <div>
                <span className="font-medium">Time Efficiency</span>
                <p className="text-sm text-gray-400">Automate repetitive tasks and save up to 70% of operational time</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <DollarSign className="w-4 h-4 text-purple-400 mt-1" />
              <div>
                <span className="font-medium">Cost Reduction</span>
                <p className="text-sm text-gray-400">Lower operational costs by 40-60% through intelligent automation</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 mt-1" />
              <div>
                <span className="font-medium">Enhanced Customer Experience</span>
                <p className="text-sm text-gray-400">Provide 24/7 support and personalized interactions</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Brain className="w-4 h-4 text-purple-400 mt-1" />
              <div>
                <span className="font-medium">Data-Driven Insights</span>
                <p className="text-sm text-gray-400">Gain valuable business intelligence from automated data analysis</p>
              </div>
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}