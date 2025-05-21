"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface HomeBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export function HomeBackground({
  className,
  children,
}: HomeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full overflow-hidden", className)}
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1629] via-[#17255A] to-[#0a0a1f]" />

      {/* Animated gradient overlays */}
      <div className="absolute inset-0">
        {/* Primary energy waves */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.15),transparent_70%)]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.15),transparent_70%)]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Secondary pulses */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_70%)]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Animated lines */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(147,51,234,0)" />
              <stop offset="50%" stopColor="rgba(147,51,234,0.5)" />
              <stop offset="100%" stopColor="rgba(147,51,234,0)" />
            </linearGradient>
          </defs>
          {[...Array(15)].map((_, i) => (
            <motion.line
              key={i}
              x1="-100%"
              y1={100 + i * 200}
              x2="200%"
              y2={200 + i * 200}
              stroke="url(#line-gradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, pathOffset: -1 }}
              animate={{ pathLength: 1, pathOffset: 1 }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 2,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Particle effect */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          {[...Array(50)].map((_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 100 + "%"}
              cy={Math.random() * 100 + "%"}
              r="1"
              fill="rgba(147,51,234,0.3)"
              initial={{ opacity: 0.1, scale: 0 }}
              animate={{
                opacity: [0.1, 0.5, 0.1],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            />
          ))}
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}