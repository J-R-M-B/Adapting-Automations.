"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "gradient" | "particles";
  intensity?: "subtle" | "medium" | "strong";
}

export function AnimatedBackground({
  className,
  children,
  variant = "default",
  intensity = "medium",
}: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Intensity mappings
  const intensityMap = {
    subtle: {
      opacity: 0.3,
      scale: 1.1,
      duration: 20,
    },
    medium: {
      opacity: 0.5,
      scale: 1.2,
      duration: 15,
    },
    strong: {
      opacity: 0.7,
      scale: 1.3,
      duration: 10,
    },
  };

  const currentIntensity = intensityMap[intensity];

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden bg-black",
        className
      )}
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1629] to-black" />

      {/* Animated gradient overlays */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.15),transparent_70%)]"
        animate={{
          scale: [1, currentIntensity.scale, 1],
          opacity: [0.3, currentIntensity.opacity, 0.3],
        }}
        transition={{
          duration: currentIntensity.duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.15),transparent_70%)]"
        animate={{
          scale: [1, currentIntensity.scale, 1],
          opacity: [0.3, currentIntensity.opacity, 0.3],
        }}
        transition={{
          duration: currentIntensity.duration * 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Animated lines */}
      <div className="absolute inset-0">
        {variant === "default" && (
          <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(147,51,234,0)" />
                <stop offset="50%" stopColor="rgba(147,51,234,0.5)" />
                <stop offset="100%" stopColor="rgba(147,51,234,0)" />
              </linearGradient>
            </defs>
            {[...Array(10)].map((_, i) => (
              <motion.line
                key={i}
                x1="-100%"
                y1={100 + i * 150}
                x2="200%"
                y2={200 + i * 150}
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
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}