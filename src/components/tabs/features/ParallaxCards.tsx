import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Database, 
  Users, 
  CreditCard, 
  BarChart, 
  Settings, 
  Globe, 
  Bot,
  Code
} from 'lucide-react';

export function ParallaxCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [100, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  
  // Feature cards data
  const features = [
    {
      icon: Users,
      title: "User Authentication",
      description: "Secure login and registration systems with role-based access control.",
      gradient: "from-indigo-500/20 to-blue-500/20",
      border: "border-indigo-500/30"
    },
    {
      icon: Database,
      title: "Database Integration",
      description: "Powerful data storage with SQL databases and efficient querying.",
      gradient: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/30"
    },
    {
      icon: CreditCard,
      title: "Payment Processing",
      description: "Secure payment gateways with multiple provider options.",
      gradient: "from-emerald-500/20 to-green-500/20",
      border: "border-emerald-500/30"
    },
    {
      icon: BarChart,
      title: "Advanced Analytics",
      description: "Comprehensive insights into website performance and user behavior.",
      gradient: "from-amber-500/20 to-yellow-500/20",
      border: "border-amber-500/30"
    },
    {
      icon: Bot,
      title: "AI-Powered Features",
      description: "Smart automations and personalized user experiences with AI.",
      gradient: "from-purple-500/20 to-fuchsia-500/20",
      border: "border-purple-500/30"
    },
    {
      icon: Code,
      title: "Custom Development",
      description: "Bespoke features and functionality built to your specifications.",
      gradient: "from-rose-500/20 to-pink-500/20",
      border: "border-rose-500/30"
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Content localization and language switching capabilities.",
      gradient: "from-sky-500/20 to-blue-500/20", 
      border: "border-sky-500/30"
    },
    {
      icon: Settings,
      title: "Third-Party Integrations",
      description: "Seamless connections with your existing tools and services.",
      gradient: "from-teal-500/20 to-green-500/20",
      border: "border-teal-500/30"
    }
  ];
  
  // Split features into 3 columns for parallax effect
  const column1 = features.slice(0, 3);
  const column2 = features.slice(3, 5);
  const column3 = features.slice(5, 8);

  return (
    <div ref={containerRef} className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 mb-6">
          <Code className="w-5 h-5 text-indigo-400" />
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
            Featured Capabilities
          </h2>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
          Explore our range of powerful features to enhance your website
        </p>
      </motion.div>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Column 1 with parallax effect */}
        <motion.div 
          className="space-y-6"
          style={{ y: y1, opacity }}
        >
          {column1.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </motion.div>
        
        {/* Column 2 with opposite parallax effect */}
        <motion.div 
          className="space-y-6 md:mt-16"
          style={{ y: y2, opacity }}
        >
          {column2.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index + 3} />
          ))}
        </motion.div>
        
        {/* Column 3 with parallax effect */}
        <motion.div 
          className="space-y-6"
          style={{ y: y3, opacity }}
        >
          {column3.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index + 5} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  feature: {
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    gradient: string;
    border: string;
  };
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, x: 0 }}
      className="group"
    >
      <div className={`p-6 rounded-xl bg-gradient-to-br ${feature.gradient} ${feature.border} backdrop-blur-sm relative overflow-hidden`}>
        {/* Background animations */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full opacity-30 blur-3xl transition-opacity duration-300 group-hover:opacity-50"
            style={{ 
              background: `linear-gradient(135deg, ${feature.border.replace('border-', '#').replace('-500/30', '')}, ${feature.border.replace('border-', '#').replace('-500/30', '')}80)`,
            }}
          />
        </div>
        
        <div className="relative">
          <div className="w-12 h-12 rounded-lg bg-indigo-900/30 flex items-center justify-center mb-4">
            <feature.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white group-hover:scale-105 transform transition-transform duration-300">
            {feature.title}
          </h3>
          <p className="text-gray-300">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}