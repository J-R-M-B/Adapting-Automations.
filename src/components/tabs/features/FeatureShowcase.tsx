import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, PanelRight, DollarSign, CreditCard, LayoutGrid, FileText,
  BarChart, Sliders, Zap, Globe, Database, Lock, Boxes, 
  Laptop, Settings, MessageSquare, Upload
} from 'lucide-react';

export function FeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  
  // All available features
  const allFeatures = [
    {
      id: 'user-accounts',
      icon: Users,
      name: 'User Account System',
      description: 'Secured sign-up and sign-in system with comprehensive user management.',
      details: [
        'Supports up to 100,000+ users',
        'Sign-up on website or by invitation only',
        'User roles with granular access control',
        'Admin user management tools',
        'Employee system with leave requests and document sharing',
        'Optional chat system between users and groups'
      ],
      color: 'from-indigo-500/20 to-indigo-600/20',
      borderColor: 'border-indigo-500/30',
      iconColor: 'text-indigo-400'
    },
    {
      id: 'admin-dashboard',
      icon: PanelRight,
      name: 'Admin Dashboard',
      description: 'Main operating center for your website and the base for future developments.',
      details: [
        'Customizable admin panels and widgets',
        'User management and permission controls',
        'Content moderation tools',
        'System status monitoring',
        'Action logs and audit trails'
      ],
      color: 'from-purple-500/20 to-purple-600/20',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400'
    },
    {
      id: 'financial-system',
      icon: DollarSign,
      name: 'Financial System',
      description: 'Full company financial administration system with secured database.',
      details: [
        'Manual cost and income entry',
        'Automatic data extraction from uploaded invoices',
        'Built-in invoice creation and sending',
        'Custom graphs for all financial metrics',
        'Automated tax return preparation for specified terms'
      ],
      color: 'from-green-500/20 to-green-600/20',
      borderColor: 'border-green-500/30',
      iconColor: 'text-green-400'
    },
    {
      id: 'payment-integration',
      icon: CreditCard,
      name: 'Payment Integration',
      description: 'Integrate with Stripe to receive payments directly from your website.',
      details: [
        'Secure payment processing',
        'One-time payment options',
        'Subscription payment options',
        'Seamless checkout experience',
        'Payment analytics and reporting'
      ],
      color: 'from-blue-500/20 to-blue-600/20',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400'
    },
    {
      id: 'dynamic-content',
      icon: LayoutGrid,
      name: 'Dynamic Content',
      description: 'Edit website content yourself directly from your admin dashboard.',
      details: [
        'Edit text on your website anytime',
        'Update images on your website anytime',
        'Manage job applications shown on your website',
        'Content scheduling capabilities',
        'No technical knowledge required'
      ],
      color: 'from-amber-500/20 to-amber-600/20',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400'
    },
    {
      id: 'copywriting',
      icon: FileText,
      name: 'Professional Copywriting',
      description: 'We write clear, engaging texts based on minimal input from you.',
      details: [
        'Provide simple facts and information',
        'We craft perfect texts to fit your pages',
        'SEO-optimized content writing',
        'Brand voice consistency',
        'Multilingual content options'
      ],
      color: 'from-cyan-500/20 to-cyan-600/20',
      borderColor: 'border-cyan-500/30',
      iconColor: 'text-cyan-400'
    },
    {
      id: 'custom-widgets',
      icon: Sliders,
      name: 'Custom Widgets',
      description: 'Custom UI widgets and interactive elements for your website front-end.',
      details: [
        'Custom product designers for users',
        'Interactive animations',
        'Custom configuration menus',
        'Interactive calculators',
        'Booking and scheduling widgets'
      ],
      color: 'from-rose-500/20 to-rose-600/20',
      borderColor: 'border-rose-500/30',
      iconColor: 'text-rose-400'
    },
    {
      id: 'integrations',
      icon: Zap,
      name: '3rd Party Integrations',
      description: 'Integrate with any software, system or technology with API access.',
      details: [
        'Connect with existing business systems',
        'Integrate email, storage, documents, and spreadsheets',
        'Connect with reservation and scheduling systems',
        'Real-life hardware integrations with API access',
        'Unified data flow between all systems'
      ],
      color: 'from-fuchsia-500/20 to-fuchsia-600/20',
      borderColor: 'border-fuchsia-500/30',
      iconColor: 'text-fuchsia-400'
    }
  ];
  
  // Show only 5 features at a time in the list
  const visibleFeatures = allFeatures;

  // Auto-rotate through features
  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev === visibleFeatures.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRotate, visibleFeatures.length]);

  // Pause auto-rotation when user interacts
  const handleFeatureChange = (index: number) => {
    setActiveFeature(index);
    setAutoRotate(false);
    
    // Resume auto-rotation after 20 seconds of inactivity
    const timeout = setTimeout(() => {
      setAutoRotate(true);
    }, 20000);

    return () => clearTimeout(timeout);
  };

  const getActiveFeature = () => visibleFeatures[activeFeature];
  
  // Get background color for the feature list based on active feature
  const getFeatureListBackground = () => {
    const feature = getActiveFeature();
    return `bg-gradient-to-br ${feature.color.replace('/20', '/10')}`;
  };

  return (
    <div className="grid md:grid-cols-5 gap-6 relative">
      {/* Side nav */}
      <div className="md:col-span-2 flex flex-col p-1">
        <div className={`h-[400px] overflow-y-auto scrollbar-hide rounded-xl transition-colors duration-300 ${getFeatureListBackground()}`}>
          <div className="flex flex-col gap-3 p-3">
            {visibleFeatures.map((feature, idx) => (
              <motion.button
                key={feature.id}
                onClick={() => handleFeatureChange(idx)}
                className={`relative group p-4 rounded-xl text-left transition-all duration-300 overflow-hidden ${
                  activeFeature === idx 
                    ? `bg-gradient-to-r ${feature.color} ${feature.borderColor}` 
                    : 'hover:bg-gray-800/50'
                }`}
                whileHover={{ x: 5 }}
                animate={{ 
                  boxShadow: activeFeature === idx 
                    ? '0 0 25px 0 rgba(99, 102, 241, 0.2)' 
                    : '0 0 0 0 rgba(0, 0, 0, 0)' 
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activeFeature === idx 
                      ? `bg-indigo-500/20 ${feature.iconColor}` 
                      : 'bg-gray-800/50 text-gray-400'
                  }`}>
                    {/* Render the icon component */}
                    {React.createElement(feature.icon, { className: "w-5 h-5" })}
                  </div>
                  <div>
                    <h3 className={`font-medium transition-colors ${
                      activeFeature === idx ? 'text-white' : 'text-gray-300'
                    }`}>
                      {feature.name}
                    </h3>
                    <p className={`text-sm transition-colors mt-0.5 ${
                      activeFeature === idx ? 'text-indigo-100/80' : 'text-gray-500'
                    }`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
                
                {/* Progress indicator for auto-rotate */}
                {activeFeature === idx && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-indigo-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ 
                      duration: 5, 
                      ease: "linear",
                      repeat: autoRotate ? Infinity : 0
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Feature details */}
      <div className="md:col-span-3 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`p-6 rounded-xl h-full bg-gradient-to-br ${getActiveFeature().color} ${getActiveFeature().borderColor} min-h-[400px] flex flex-col`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-indigo-500/20 ${getActiveFeature().iconColor}`}>
                {/* Render the icon component */}
                {React.createElement(getActiveFeature().icon, { className: "w-6 h-6" })}
              </div>
              <h3 className="text-2xl font-semibold text-white">
                {getActiveFeature().name}
              </h3>
            </div>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              {getActiveFeature().description}
            </p>
            
            <div className="space-y-4 mt-auto">
              <h4 className="font-medium text-indigo-300 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Key Features
              </h4>
              <ul className="space-y-2">
                {getActiveFeature().details.map((detail, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8">
              <button className="text-sm bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 border border-indigo-500/30">
                <span>Explore {getActiveFeature().name} Features</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* Add custom scrollbar-hide class */
/* This will be added to the global CSS through the component */
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }
`;
document.head.appendChild(style);