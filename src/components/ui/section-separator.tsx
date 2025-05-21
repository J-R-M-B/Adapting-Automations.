import { motion } from 'framer-motion';

interface SectionSeparatorProps {
  position: 'top' | 'bottom';
  className?: string;
}

export function SectionSeparator({ position, className = '' }: SectionSeparatorProps) {
  return (
    <div className={`relative w-full h-32 overflow-hidden pointer-events-none ${className}`}>
      {/* Gradient line */}
      <div 
        className={`absolute inset-x-0 h-px ${
          position === 'top' ? 'bottom-0' : 'top-0'
        } bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60`}
      />

      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-40 h-40 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(147,51,234,0.4) 0%, transparent 70%)`,
              left: `${30 + i * 20}%`,
              [position === 'top' ? 'bottom' : 'top']: '-100px',
            }}
            animate={{
              y: position === 'top' ? [0, 20, 0] : [0, -20, 0],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Animated lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={i}
            d={`M-100 ${position === 'top' ? 96 - i * 2 : i * 2} Q ${400 + i * 100} ${
              position === 'top' ? 60 + i * 2 : 36 - i * 2
            } 900 ${position === 'top' ? 96 - i * 2 : i * 2}`}
            stroke="url(#separator-gradient)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0.1 }}
            animate={{ pathLength: 1, opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
        <defs>
          <linearGradient id="separator-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(147,51,234,0)" />
            <stop offset="50%" stopColor="rgba(147,51,234,0.8)" />
            <stop offset="100%" stopColor="rgba(147,51,234,0)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Energy orbs */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32"
          style={{
            background: `radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)`,
            left: `${20 + i * 60}%`,
            [position === 'top' ? 'bottom' : 'top']: '-80px',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}