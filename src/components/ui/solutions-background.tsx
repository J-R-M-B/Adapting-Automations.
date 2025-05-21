import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SolutionsBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function SolutionsBackground({ children, className }: SolutionsBackgroundProps) {
  return (
    <div className={cn("relative min-h-screen text-white overflow-hidden", className)}>
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1629] via-[#17255A] to-[#1a1a2e]" />

      {/* Animated background effects */}
      <div className="absolute inset-0">
        {/* Animated gradient overlays */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.15),transparent_70%)]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
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
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Geometric shapes with enhanced visibility */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [360, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Animated lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
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

        {/* Enhanced depth layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black/20" />
      </div>

      {/* Content wrapper with enhanced contrast */}
      <div className="relative z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        {children}
      </div>
    </div>
  );
}