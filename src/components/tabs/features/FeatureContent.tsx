import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { FeatureItem } from './types';

interface FeatureContentProps {
  features: FeatureItem[];
  activeFeature: number;
}

export function FeatureContent({ features, activeFeature }: FeatureContentProps) {
  const feature = features[activeFeature];

  return (
    <div className="md:col-span-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFeature}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-xl border border-indigo-500/20 p-6 h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
            </div>

            <div className="space-y-6">
              <p className="text-gray-300">{feature.fullDescription}</p>

              {feature.image && (
                <div className="rounded-lg overflow-hidden border border-indigo-500/20">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-auto"
                  />
                </div>
              )}

              {feature.bulletPoints && (
                <div className="space-y-3">
                  <h4 className="font-medium text-indigo-300">Key Features:</h4>
                  <ul className="space-y-2">
                    {feature.bulletPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {feature.cta && (
                <div className="pt-4">
                  <a
                    href={feature.cta.url}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                  >
                    {feature.cta.text}
                    <feature.cta.icon className="w-5 h-5" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}