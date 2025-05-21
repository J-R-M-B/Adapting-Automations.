import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Bot, Brain, Cpu, Database, Globe, Laptop, MessageSquare, Phone, Share2, Zap, ChevronRight } from 'lucide-react';

interface AnimatedHeroProps {
  scrollToSolutions: () => void;
}

export function AnimatedHero({ scrollToSolutions }: AnimatedHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: custom * 0.1,
        ease: "easeOut" 
      }
    })
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 1.2,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.8 + custom * 0.1,
        ease: "easeOut",
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    })
  };

  const floatingIconsData = [
    { icon: Bot, color: "text-purple-400", x: "10%", y: "20%", size: "w-8 h-8", delay: 0 },
    { icon: Brain, color: "text-blue-400", x: "85%", y: "15%", size: "w-10 h-10", delay: 0.2 },
    { icon: Database, color: "text-green-400", x: "75%", y: "75%", size: "w-9 h-9", delay: 0.4 },
    { icon: Globe, color: "text-cyan-400", x: "15%", y: "80%", size: "w-12 h-12", delay: 0.6 },
    { icon: Laptop, color: "text-yellow-400", x: "90%", y: "60%", size: "w-7 h-7", delay: 0.8 },
    { icon: MessageSquare, color: "text-pink-400", x: "20%", y: "40%", size: "w-6 h-6", delay: 1 },
    { icon: Phone, color: "text-indigo-400", x: "80%", y: "30%", size: "w-8 h-8", delay: 1.2 },
    { icon: Share2, color: "text-orange-400", x: "30%", y: "70%", size: "w-9 h-9", delay: 1.4 },
    { icon: Cpu, color: "text-red-400", x: "60%", y: "85%", size: "w-10 h-10", delay: 1.6 },
    { icon: Zap, color: "text-teal-400", x: "40%", y: "10%", size: "w-7 h-7", delay: 1.8 }
  ];

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/80 via-[#0f1629]/90 to-[#0a0a1f]/95"></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-600/10 blur-[100px] animate-[pulse_8s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-[100px] animate-[pulse_10s_ease-in-out_infinite_1s]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-600/10 blur-[100px] animate-[pulse_12s_ease-in-out_infinite_2s]"></div>
      
      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#232323_1px,transparent_1px),linear-gradient(to_bottom,#232323_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>
      
      {/* Floating icons */}
      {floatingIconsData.map((item, index) => (
        <motion.div
          key={index}
          custom={item.delay}
          variants={iconVariants}
          initial="hidden"
          animate={controls}
          className={`absolute ${item.size} ${item.color}`}
          style={{ 
            left: item.x, 
            top: item.y,
            filter: "drop-shadow(0 0 8px currentColor)"
          }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <item.icon />
          </motion.div>
        </motion.div>
      ))}
      
      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="relative z-10 text-center px-4 overflow-visible"
      >
        {/* Animated title - "Adapting" */}
        <motion.div 
          variants={titleVariants}
          className="flex justify-center mb-2 overflow-visible"
        >
          {Array.from("Adapting").map((letter, index) => (
            <motion.span
              key={`adapting-${index}`}
              custom={index}
              variants={letterVariants}
              className="text-7xl md:text-8xl lg:text-9xl font-bold inline-block overflow-visible"
              style={{
                background: "linear-gradient(to right, #4f46e5, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 15px rgba(139, 92, 246, 0.6))",
                textShadow: "0 0 20px rgba(139, 92, 246, 0.4)"
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
        
        {/* Animated title - "Automations" */}
        <motion.div 
          variants={titleVariants}
          className="flex justify-center overflow-visible"
        >
          {Array.from("Automations").map((letter, index) => (
            <motion.span
              key={`automations-${index}`}
              custom={index + 0.5}
              variants={letterVariants}
              className="text-7xl md:text-8xl lg:text-9xl font-bold inline-block overflow-visible"
              style={{
                background: "linear-gradient(to right, #8b5cf6, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 15px rgba(59, 130, 246, 0.6))",
                textShadow: "0 0 20px rgba(59, 130, 246, 0.4)"
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
        
        {/* Subtitle */}
        <motion.p
          variants={subtitleVariants}
          className="mt-8 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
        >
          The AI revolution is here—will you keep up?
        </motion.p>
        
        {/* Explore button */}
        <motion.button
          variants={subtitleVariants}
          onClick={scrollToSolutions}
          className="mt-12 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold text-lg shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
        >
          <span className="flex items-center gap-2">
            Explore Our Solutions
            <Zap className="w-5 h-5" />
          </span>
        </motion.button>
      </motion.div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 rounded-full bg-white/50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Animated lines connecting elements */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(79, 70, 229, 0)" />
            <stop offset="50%" stopColor="rgba(79, 70, 229, 1)" />
            <stop offset="100%" stopColor="rgba(79, 70, 229, 0)" />
          </linearGradient>
        </defs>
        {floatingIconsData.map((_, i) => {
          const nextIndex = (i + 1) % floatingIconsData.length;
          return (
            <motion.path
              key={i}
              d={`M ${floatingIconsData[i].x} ${floatingIconsData[i].y} Q ${Math.random() * 100}% ${Math.random() * 100}% ${floatingIconsData[nextIndex].x} ${floatingIconsData[nextIndex].y}`}
              stroke="url(#lineGradient)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1],
                opacity: [0, 0.3, 0]
              }}
              transition={{ 
                duration: 8,
                delay: i * 0.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}