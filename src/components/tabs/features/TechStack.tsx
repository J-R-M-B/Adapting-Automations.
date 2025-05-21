import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Database, 
  Lock, 
  LineChart, 
  Globe, 
  Smartphone, 
  Code, 
  CloudCog 
} from 'lucide-react';

export function TechStack() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const technologies = [
    {
      title: "React & Vue.js",
      icon: Code,
      description: "Modern frontend frameworks for building responsive, interactive user interfaces",
      details: "Create dynamic and responsive user interfaces that provide seamless user experiences across all devices.",
      color: "bg-blue-500/20",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-400"
    },
    {
      title: "Node.js & PHP",
      icon: Server,
      description: "Powerful backend technologies for building scalable server-side applications",
      details: "Build robust server-side applications that can handle high traffic volumes while maintaining excellent performance.",
      color: "bg-green-500/20",
      borderColor: "border-green-500/30",
      iconColor: "text-green-400"
    },
    {
      title: "MySQL & PostgreSQL",
      icon: Database,
      description: "Reliable and scalable database solutions for data storage and retrieval",
      details: "Store and manage your data with industry-standard relational databases that ensure data integrity and security.",
      color: "bg-indigo-500/20",
      borderColor: "border-indigo-500/30",
      iconColor: "text-indigo-400"
    },
    {
      title: "AWS & Google Cloud",
      icon: CloudCog,
      description: "Cloud hosting and infrastructure for reliable, scalable deployment",
      details: "Deploy your applications to world-class cloud infrastructure that ensures high availability and scalability.",
      color: "bg-orange-500/20",
      borderColor: "border-orange-500/30",
      iconColor: "text-orange-400"
    },
    {
      title: "Authentication & Security",
      icon: Lock,
      description: "Industry-standard security protocols and authentication systems",
      details: "Protect your users and data with robust security measures including encryption, secure authentication, and more.",
      color: "bg-red-500/20",
      borderColor: "border-red-500/30",
      iconColor: "text-red-400"
    },
    {
      title: "Analytics Integration",
      icon: LineChart,
      description: "Data tracking and visualization tools for business intelligence",
      details: "Gain valuable insights into user behavior and business performance with comprehensive analytics solutions.",
      color: "bg-purple-500/20",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-400"
    },
    {
      title: "SEO Optimization",
      icon: Globe,
      description: "Search engine optimization techniques for better visibility",
      details: "Improve your search engine rankings and drive more organic traffic with our SEO-optimized website development.",
      color: "bg-teal-500/20",
      borderColor: "border-teal-500/30",
      iconColor: "text-teal-400"
    },
    {
      title: "Responsive Design",
      icon: Smartphone,
      description: "Mobile-first approach for perfect display on all devices",
      details: "Ensure your website looks and functions flawlessly on every device, from desktops to smartphones.",
      color: "bg-amber-500/20",
      borderColor: "border-amber-500/30",
      iconColor: "text-amber-400"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {technologies.map((tech, index) => (
        <motion.div
          key={index}
          className="relative group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          whileHover={{ y: -5 }}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className={`relative p-6 rounded-xl ${tech.color} ${tech.borderColor} h-full z-10 overflow-hidden`}>
            {/* Tech info */}
            <div className="flex flex-col h-full">
              <div className={`w-12 h-12 rounded-xl ${tech.iconColor} bg-indigo-900/30 flex items-center justify-center mb-4`}>
                <tech.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{tech.title}</h3>
              <p className="text-sm text-gray-300">{tech.description}</p>
              
              {/* Expanded details on hover */}
              <motion.div
                className="mt-4 overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: hoveredCard === index ? "auto" : 0,
                  opacity: hoveredCard === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-gray-300 border-t border-indigo-500/30 pt-3">
                  {tech.details}
                </p>
                <button className="mt-3 text-xs flex items-center gap-1.5 text-indigo-300">
                  <span>Learn more</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </motion.div>
            </div>
            
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              <motion.div 
                className="absolute w-16 h-16 rounded-full bg-white/5"
                style={{ top: '10%', right: '10%' }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              />
              <motion.div 
                className="absolute w-12 h-12 rounded-full bg-white/5"
                style={{ bottom: '15%', left: '15%' }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.15, 0.1],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  delay: index * 0.7 + 1
                }}
              />
            </div>
          </div>
          
          {/* Glow effect on hover */}
          <motion.div 
            className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-50 blur-lg -z-10 transition-opacity duration-300"
            animate={{
              opacity: hoveredCard === index ? [0.3, 0.5, 0.3] : 0,
            }}
            transition={{ 
              duration: 2, 
              repeat: hoveredCard === index ? Infinity : 0,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}