import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  // Import all required icons at the top
  Settings, 
  Code, 
  Workflow, 
  DollarSign, 
  Building2, 
  CheckCircle2, 
  Cpu, 
  Database, 
  Lock, 
  Globe, 
  Users,
  Plus, 
  Minus, 
  X,
  Zap,
  Brain,
  FileText,
  Laptop,
  ArrowRight,
  Shield as ShieldIcon, // Note: renamed to avoid naming conflict
  Sliders
} from 'lucide-react';

export function CustomizationPanel() {
  const [budget, setBudget] = useState(5000);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [systemDescription, setSystemDescription] = useState('');
  const [currentSystems, setCurrentSystems] = useState<string[]>(['']);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [showDetailsFor, setShowDetailsFor] = useState<string | null>(null);
  
  const systemRef = useRef<HTMLDivElement>(null);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(parseInt(e.target.value));
  };

  const handleAddSystem = () => {
    setCurrentSystems([...currentSystems, '']);
  };

  const handleRemoveSystem = (index: number) => {
    const newSystems = [...currentSystems];
    newSystems.splice(index, 1);
    setCurrentSystems(newSystems);
  };

  const handleSystemChange = (index: number, value: string) => {
    const newSystems = [...currentSystems];
    newSystems[index] = value;
    setCurrentSystems(newSystems);
  };

  const toggleTool = (tool: string) => {
    if (selectedTools.includes(tool)) {
      setSelectedTools(selectedTools.filter(t => t !== tool));
    } else {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const formatBudget = (value: number) => {
    return value >= 20000 ? '$20,000+' : `$${value.toLocaleString()}`;
  };

  const tools = [
    { 
      id: 'cms', 
      name: 'Content Management System', 
      icon: FileText,
      description: 'Dynamic content management for easy updates',
      category: 'admin',
      color: 'bg-blue-500/20',
      border: 'border-blue-500/30',
      iconColor: 'text-blue-400'
    },
    { 
      id: 'crm', 
      name: 'Customer Relationship Management', 
      icon: Users,
      description: 'Track and manage customer interactions',
      category: 'admin',
      color: 'bg-green-500/20',
      border: 'border-green-500/30',
      iconColor: 'text-green-400'
    },
    { 
      id: 'ecommerce', 
      name: 'E-Commerce System', 
      icon: Laptop,
      description: 'Online store with payment processing',
      category: 'sales',
      color: 'bg-purple-500/20',
      border: 'border-purple-500/30',
      iconColor: 'text-purple-400'
    },
    { 
      id: 'booking', 
      name: 'Booking & Scheduling', 
      icon: Globe,
      description: 'Appointment booking and calendar management',
      category: 'user',
      color: 'bg-amber-500/20',
      border: 'border-amber-500/30',
      iconColor: 'text-amber-400'
    },
    { 
      id: 'auth', 
      name: 'Authentication System', 
      icon: ShieldIcon, // Using the renamed import
      description: 'Secure user accounts and permissions',
      category: 'security',
      color: 'bg-red-500/20',
      border: 'border-red-500/30',
      iconColor: 'text-red-400'
    },
    { 
      id: 'payment', 
      name: 'Payment Processing', 
      icon: DollarSign,
      description: 'Secure payment gateway integrations',
      category: 'sales',
      color: 'bg-emerald-500/20',
      border: 'border-emerald-500/30',
      iconColor: 'text-emerald-400'
    },
    { 
      id: 'analytics', 
      name: 'Custom Analytics', 
      icon: Sliders,
      description: 'Track user behavior and business metrics',
      category: 'admin',
      color: 'bg-cyan-500/20',
      border: 'border-cyan-500/30',
      iconColor: 'text-cyan-400'
    },
    { 
      id: 'ai', 
      name: 'AI-Powered Features', 
      icon: Brain,
      description: 'Smart automation and recommendation systems',
      category: 'advanced',
      color: 'bg-fuchsia-500/20',
      border: 'border-fuchsia-500/30',
      iconColor: 'text-fuchsia-400'
    }
  ];
  
  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="mb-20"
      data-section="interactive-demo"
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 mb-6">
          <Settings className="w-5 h-5 text-indigo-400" />
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
            Interactive System Configurator
          </h2>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
          Customize your website with powerful functions and systems to automate processes, handle customer support, and streamline operations
        </p>
      </div>
      
      <div className="relative">
        <div className="relative p-8 rounded-2xl bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          </div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8">
            {/* Left Panel - Configuration Options */}
            <div className="space-y-6">
              <div ref={systemRef}>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-400" />
                  Describe Your System
                </h3>
                <textarea
                  value={systemDescription}
                  onChange={(e) => setSystemDescription(e.target.value)}
                  placeholder="Describe what you want your website to do. What processes should it automate? What customer interactions should it handle? What business problems should it solve?"
                  className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-indigo-500/30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all min-h-[150px] resize-none"
                ></textarea>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  Budget Range
                </h3>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">$500</span>
                    <span className="font-medium text-indigo-300">{formatBudget(budget)}</span>
                    <span className="text-gray-400">$20,000+</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="20000"
                    step="500"
                    value={budget}
                    onChange={handleBudgetChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {[2000, 5000, 10000].map((value) => (
                    <button
                      key={value}
                      onClick={() => setBudget(value)}
                      className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                        budget === value
                          ? 'bg-indigo-500 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      ${value.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-blue-400" />
                  Current Systems
                </h3>
                <div className="space-y-3">
                  {currentSystems.map((system, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={system}
                        onChange={(e) => handleSystemChange(index, e.target.value)}
                        placeholder={`System/Software ${index + 1}`}
                        className="flex-grow px-4 py-3 rounded-lg bg-gray-900/50 border border-indigo-500/30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      />
                      {index === 0 ? (
                        <button
                          onClick={handleAddSystem}
                          className="p-3 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 transition-colors"
                          aria-label="Add system"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRemoveSystem(index)}
                          className="p-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                          aria-label="Remove system"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Panel - Available Tools */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Select Custom Functions
                </h3>
                
                {/* Category filters */}
                <div className="flex flex-wrap gap-2 text-sm">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'admin', label: 'Admin' },
                    { id: 'sales', label: 'Sales' },
                    { id: 'user', label: 'User' },
                    { id: 'security', label: 'Security' },
                    { id: 'advanced', label: 'Advanced' }
                  ].map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-3 py-1 rounded-full transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-indigo-500 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Tools grid */}
              <div className="grid grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-2">
                {filteredTools.map((tool) => (
                  <motion.div
                    key={tool.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative"
                  >
                    <button
                      onClick={() => toggleTool(tool.id)}
                      className={`w-full p-4 rounded-xl text-left ${tool.color} ${tool.border} transition-all relative overflow-hidden ${
                        selectedTools.includes(tool.id)
                          ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-lg shadow-indigo-500/10'
                          : 'hover:border-indigo-500/30 hover:shadow hover:shadow-indigo-500/5'
                      }`}
                      onMouseEnter={() => setShowDetailsFor(tool.id)}
                      onMouseLeave={() => setShowDetailsFor(null)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tool.color} ${tool.border} ${tool.iconColor}`}>
                          <tool.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{tool.name}</h4>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300">{tool.description}</p>
                      
                      {/* Selection indicator */}
                      {selectedTools.includes(tool.id) && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      {/* Subtle animated background */}
                      <div className="absolute inset-0 overflow-hidden opacity-30">
                        <div className="absolute bottom-0 right-0 bg-gradient-to-tl from-white to-transparent opacity-5 w-32 h-32 -rotate-45 transform translate-x-8 translate-y-8 rounded-full"></div>
                      </div>
                    </button>
                    
                    {/* Animated glow effect */}
                    <motion.div
                      className="absolute -inset-0.5 bg-indigo-500 rounded-xl opacity-0 blur-lg transition-opacity duration-300"
                      animate={{
                        opacity: selectedTools.includes(tool.id) ? [0.1, 0.2, 0.1] : 0
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'reverse'
                      }}
                    />
                  </motion.div>
                ))}
              </div>
              
              {/* Summary of selections */}
              <div className="mt-6 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-indigo-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Selected Functions
                  </h4>
                  <span className="text-sm bg-indigo-500/20 px-2 py-0.5 rounded text-indigo-300">
                    {selectedTools.length} of {tools.length}
                  </span>
                </div>
                {selectedTools.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedTools.map(toolId => {
                      const tool = tools.find(t => t.id === toolId);
                      return tool ? (
                        <div key={toolId} className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center gap-1.5">
                          <tool.icon className="w-3 h-3" />
                          <span>{tool.name}</span>
                          <button 
                            onClick={() => toggleTool(toolId)}
                            className="text-indigo-400 hover:text-indigo-300"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
              
              {/* CTA button */}
              <div className="mt-6">
                <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20">
                  <span>Request Custom Solution</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Preview illustration - simple abstract representation of systems */}
          <div className="mt-8 pt-8 border-t border-indigo-500/20">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" />
              System Architecture Preview
            </h3>
            
            <div className="h-60 relative">
              {/* Central system node */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-indigo-500/30 border-4 border-indigo-500/50 flex items-center justify-center">
                <Globe className="w-10 h-10 text-indigo-300" />
                <div className="absolute inset-0 rounded-full animate-pulse bg-indigo-500/10"></div>
              </div>
              
              {/* Connection lines and nodes for selected tools */}
              {selectedTools.map((toolId, index) => {
                const tool = tools.find(t => t.id === toolId);
                if (!tool) return null;
                
                const angle = (index * (360 / selectedTools.length)) * (Math.PI / 180);
                const radius = 120; // Distance from center
                
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <div key={toolId}>
                    {/* Connection line */}
                    <div 
                      className="absolute left-1/2 top-1/2 w-1 bg-indigo-500/40 origin-bottom"
                      style={{
                        transform: `translate(-50%, -100%) rotate(${angle}rad)`,
                        height: `${radius}px`,
                      }}
                    />
                    
                    {/* Tool node */}
                    <div 
                      className={`absolute w-16 h-16 rounded-full ${tool.color} ${tool.border} flex items-center justify-center`}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <tool.icon className={`w-8 h-8 ${tool.iconColor}`} />
                      <div className="absolute -inset-0.5 rounded-full animate-pulse opacity-50" style={{ background: `linear-gradient(135deg, ${tool.border.replace('border-', '#').replace('-500/30', '')}, transparent)` }}></div>
                    </div>
                    
                    {/* Tool name label */}
                    <div 
                      className="absolute text-xs font-medium px-2 py-1 bg-gray-800/80 rounded-lg backdrop-blur-sm text-white"
                      style={{
                        left: `calc(50% + ${x * 1.2}px)`,
                        top: `calc(50% + ${y * 1.2}px)`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      {tool.name.split(' ')[0]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}