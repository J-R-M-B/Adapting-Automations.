import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Boxes, ArrowRight, Zap, Bot, Phone, Share2, Mail, Globe, Database, Laptop, Settings } from 'lucide-react';

export function IntegrationShowcase() {
  const [activeSystem, setActiveSystem] = useState<string | null>(null);

  const systems = [
    { id: 'chatbot', name: 'AI Chatbot', icon: Bot, color: 'from-blue-400 to-blue-600' },
    { id: 'phone', name: 'Phone Agent', icon: Phone, color: 'from-blue-500 to-blue-700' },
    { id: 'social', name: 'Social Media', icon: Share2, color: 'from-blue-600 to-blue-800' },
    { id: 'outreach', name: 'Outreach', icon: Mail, color: 'from-blue-700 to-blue-900' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="mb-20 relative"
      data-section="integrations"
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 mb-6">
          <Boxes className="w-5 h-5 text-blue-400" />
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Unified System Integration
          </h2>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
          Control all your AI systems from a single, powerful admin dashboard
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="relative p-8 rounded-2xl bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-500/30 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
              animate={{ 
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
              animate={{ 
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left side - Text content */}
              <div>
                <h3 className="text-2xl font-bold mb-4 text-blue-100">Unified Control Center</h3>
                <p className="text-gray-300 mb-6">
                  Our website solutions are designed to integrate seamlessly with all our other AI systems, creating a centralized hub for your business automation needs.
                </p>
                <p className="text-gray-300 mb-6">
                  From a single admin dashboard, you can manage your chatbots, phone agents, social media automation, and outreach campaigns—all with consistent branding and unified data flow.
                </p>
                
                <div className="space-y-4">
                  {[
                    "Centralized user management and permissions",
                    "Unified analytics across all systems",
                    "Seamless data sharing between platforms",
                    "Consistent branding and user experience"
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1 p-1 rounded-full bg-blue-500/20 text-blue-400">
                        <Zap className="w-4 h-4" />
                      </div>
                      <p className="text-gray-300">{benefit}</p>
                    </div>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  <span>Explore Integration Options</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
              
              {/* Right side - Interactive visualization */}
              <div>
                <motion.div 
                  className="relative h-[400px] rounded-xl bg-gradient-to-br from-blue-900/50 to-blue-800/30 border border-blue-500/30 p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Central website node */}
                  <motion.div 
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-blue-500/30 border-4 border-blue-500/50 flex items-center justify-center z-20"
                    animate={{ 
                      boxShadow: ['0 0 0 rgba(59, 130, 246, 0)', '0 0 30px rgba(59, 130, 246, 0.5)', '0 0 0 rgba(59, 130, 246, 0)']
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <div className="text-center">
                      <Globe className="w-12 h-12 text-blue-300 mx-auto mb-1" />
                      <p className="text-sm font-medium text-blue-100">Website</p>
                    </div>
                  </motion.div>
                  
                  {/* Admin dashboard label */}
                  <motion.div
                    className="absolute left-1/2 top-[15%] -translate-x-1/2 bg-blue-800/50 px-3 py-1 rounded-full border border-blue-500/30 text-blue-100 text-sm font-medium"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      <span>Admin Dashboard</span>
                    </div>
                  </motion.div>
                  
                  {/* Connection lines and nodes for systems */}
                  {systems.map((system, index) => {
                    // Calculate position around the circle
                    const angle = (index * (360 / systems.length) + 45) * (Math.PI / 180);
                    const radius = 120; // Distance from center
                    
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    
                    const isActive = activeSystem === system.id;
                    
                    return (
                      <div key={system.id}>
                        {/* Connection line */}
                        <motion.div 
                          className="absolute left-1/2 top-1/2 w-1 bg-blue-500/40 origin-bottom"
                          style={{
                            transform: `translate(-50%, -100%) rotate(${angle}rad)`,
                            height: `${radius}px`,
                          }}
                          animate={{ 
                            opacity: isActive ? 1 : 0.4,
                            backgroundColor: isActive ? 'rgba(59, 130, 246, 0.6)' : 'rgba(59, 130, 246, 0.4)'
                          }}
                        />
                        
                        {/* System node */}
                        <motion.div 
                          className={`absolute w-20 h-20 rounded-full bg-gradient-to-r ${system.color} flex flex-col items-center justify-center cursor-pointer border-2 border-blue-500/50`}
                          style={{
                            left: `calc(50% + ${x}px)`,
                            top: `calc(50% + ${y}px)`,
                            transform: 'translate(-50%, -50%)'
                          }}
                          whileHover={{ scale: 1.1 }}
                          animate={{ 
                            scale: isActive ? 1.1 : 1,
                            boxShadow: isActive 
                              ? ['0 0 0 rgba(59, 130, 246, 0)', '0 0 20px rgba(59, 130, 246, 0.7)', '0 0 0 rgba(59, 130, 246, 0)']
                              : 'none'
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: isActive ? Infinity : 0,
                            repeatType: "loop"
                          }}
                          onClick={() => setActiveSystem(isActive ? null : system.id)}
                        >
                          <system.icon className="w-8 h-8 text-white mb-1" />
                          <span className="text-xs text-white font-medium">{system.name}</span>
                        </motion.div>
                        
                        {/* Data flow animation */}
                        {isActive && (
                          <motion.div
                            className="absolute w-3 h-3 rounded-full bg-blue-400"
                            initial={{ 
                              left: `calc(50% + ${x * 0.8}px)`,
                              top: `calc(50% + ${y * 0.8}px)`,
                              opacity: 0
                            }}
                            animate={{ 
                              left: ['calc(50% + 0px)', `calc(50% + ${x * 0.8}px)`],
                              top: ['calc(50% + 0px)', `calc(50% + ${y * 0.8}px)`],
                              opacity: [0, 1, 0]
                            }}
                            transition={{ 
                              duration: 1.5,
                              repeat: Infinity,
                              repeatType: "loop",
                              ease: "easeInOut"
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                  
                  {/* Central data hub animation */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-blue-500/10 z-10"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                  
                  {/* Database icon at bottom */}
                  <motion.div
                    className="absolute left-1/2 bottom-6 -translate-x-1/2 flex flex-col items-center"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <Database className="w-8 h-8 text-blue-400 mb-1" />
                    <span className="text-xs text-blue-300">Unified Database</span>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export { IntegrationShowcase as Testimonials };