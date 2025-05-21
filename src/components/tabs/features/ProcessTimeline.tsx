import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Lightbulb, 
  Target, 
  Brush,
  Code, 
  Search,
  Rocket,
  Headphones,
  CheckCircle2
} from 'lucide-react';

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  const steps = [
    {
      icon: Lightbulb,
      title: "Discovery & Planning",
      description: "We begin by understanding your business goals, audience, and requirements to create a strategic plan for your website.",
      details: [
        "Business goals identification",
        "Target audience analysis",
        "Competitor research",
        "Project scope definition",
        "Technical requirements gathering"
      ],
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-500/20",
      borderColor: "border-amber-500/30"
    },
    {
      icon: Target,
      title: "Strategy & Architecture",
      description: "Creating a comprehensive blueprint for your website's structure, content organization, and user flows.",
      details: [
        "Information architecture development",
        "User flow mapping",
        "Content strategy planning",
        "Technical stack selection",
        "Integration planning"
      ],
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-500/20",
      borderColor: "border-indigo-500/30"
    },
    {
      icon: Brush,
      title: "Design & Prototyping",
      description: "Designing the visual identity and user interface of your website with a focus on user experience.",
      details: [
        "UI/UX design creation",
        "Brand integration",
        "Responsive design implementation",
        "Interactive prototyping",
        "Design system development"
      ],
      color: "from-purple-500 to-fuchsia-500",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/30"
    },
    {
      icon: Code,
      title: "Development",
      description: "Building your website with clean, efficient code and integrating all required functionality and features.",
      details: [
        "Frontend development",
        "Backend systems implementation",
        "Database architecture setup",
        "API integrations",
        "Custom functionality development"
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      icon: Search,
      title: "Testing & QA",
      description: "Comprehensive testing to ensure functionality, compatibility, and performance across devices and browsers.",
      details: [
        "Cross-browser compatibility testing",
        "Mobile responsiveness validation",
        "Performance optimization",
        "Security testing",
        "User acceptance testing"
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30"
    },
    {
      icon: Rocket,
      title: "Deployment",
      description: "Launching your website with careful attention to server configuration, SEO, and analytics setup.",
      details: [
        "Server configuration",
        "Domain and DNS setup",
        "SSL certificate installation",
        "SEO implementation",
        "Analytics integration"
      ],
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-rose-500/20",
      borderColor: "border-rose-500/30"
    },
    {
      icon: Headphones,
      title: "Support & Maintenance",
      description: "Ongoing support and maintenance to ensure your website remains secure, up-to-date, and performing optimally.",
      details: [
        "Regular security updates",
        "Performance monitoring",
        "Content updates and additions",
        "Feature enhancements",
        "24/7 technical support"
      ],
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-500/20",
      borderColor: "border-teal-500/30"
    }
  ];

  return (
    <div ref={containerRef} className="relative">
      {/* Progress Line */}
      <div className="absolute left-[28px] top-0 bottom-0 w-px bg-gray-800/70 md:left-1/2 md:-translate-x-[1px]">
        <motion.div 
          className="absolute top-0 left-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500"
          style={{ height: progressHeight }}
        />
      </div>
      
      <div className="space-y-24 py-8">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          const isOdd = !isEven;
          
          return (
            <div key={index} className="relative">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`md:grid md:grid-cols-2 md:gap-8 items-center ${isEven ? '' : 'md:grid-cols-[1fr,auto,1fr] md:grid-rows-1'}`}
              >
                {/* Content - Left side for even, right side for odd */}
                <div className={`relative ${isEven ? 'md:text-right md:pr-8' : 'md:col-start-3 md:text-left md:pl-8'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`p-6 rounded-xl ${step.bgColor} ${step.borderColor} relative overflow-hidden`}
                    onMouseEnter={() => setHoveredStep(index)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 md:justify-start">
                      {isOdd && <step.icon className={`w-6 h-6 ${step.borderColor.replace('border-', 'text-').replace('-500/30', '-400')}`} />}
                      <span>{step.title}</span>
                      {isEven && <step.icon className={`w-6 h-6 ${step.borderColor.replace('border-', 'text-').replace('-500/30', '-400')}`} />}
                    </h3>
                    <p className="text-gray-300 mb-4">{step.description}</p>
                    
                    {/* Expanded details on hover */}
                    <motion.div
                      className="space-y-2 overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: hoveredStep === index ? "auto" : 0,
                        opacity: hoveredStep === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ul className={`space-y-1 text-sm ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                    
                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden opacity-20">
                      <motion.div 
                        className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full"
                        style={{ 
                          background: `linear-gradient(${step.color})`,
                          filter: 'blur(40px)',
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity,
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
                
                {/* Center timeline with icon - this is a fixed column for odd rows */}
                <div className={`absolute left-0 top-0 md:relative ${isOdd ? 'md:col-start-2' : ''}`}>
                  <div className="flex md:justify-center">
                    <div className={`w-14 h-14 rounded-full ${step.bgColor} ${step.borderColor} flex items-center justify-center z-10 relative ml-6 md:ml-0`}>
                      <motion.div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${step.color.replace('from-', '').replace('to-', '')} flex items-center justify-center`}
                        animate={{ 
                          boxShadow: hoveredStep === index 
                            ? [
                                `0 0 0 0 rgba(99, 102, 241, 0)`,
                                `0 0 20px 0 rgba(99, 102, 241, 0.5)`,
                                `0 0 0 0 rgba(99, 102, 241, 0)`
                              ]
                            : `0 0 0 0 rgba(99, 102, 241, 0)`
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: hoveredStep === index ? Infinity : 0
                        }}
                      >
                        <step.icon className="w-5 h-5 text-white" />
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                {/* Placeholder div for even rows to maintain grid layout */}
                {isOdd ? null : <div className="hidden md:block" />}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}