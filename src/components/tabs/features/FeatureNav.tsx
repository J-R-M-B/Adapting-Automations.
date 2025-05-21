import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { FeatureItem } from './types';

interface FeatureNavProps {
  features: FeatureItem[];
  activeFeature: number;
  setActiveFeature: (index: number) => void;
}

export function FeatureNav({ features, activeFeature, setActiveFeature }: FeatureNavProps) {
  return (
    <div className="space-y-4">
      {features.map((feature, index) => (
        <motion.button
          key={index}
          onClick={() => setActiveFeature(index)}
          className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-start gap-3 ${
            activeFeature === index
              ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30'
              : 'hover:bg-gray-800/50'
          }`}
          whileHover={{ x: activeFeature === index ? 0 : 5 }}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
              activeFeature === index
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                : 'bg-gray-800'
            }`}
          >
            {activeFeature === index ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <span className="text-xs">{index + 1}</span>
            )}
          </div>
          <div>
            <h3
              className={`font-medium ${
                activeFeature === index ? 'text-white' : 'text-gray-300'
              }`}
            >
              {feature.title}
            </h3>
            <p className="text-sm text-gray-400 mt-1">{feature.description}</p>
          </div>
        </motion.button>
      ))}
    </div>
  );
}