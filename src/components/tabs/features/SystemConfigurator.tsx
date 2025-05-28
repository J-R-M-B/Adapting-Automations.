import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
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
  Shield,
  Sliders,
  Sparkles,
  ChevronRight,
  Bot,
  Phone,
  Share2,
  Mail,
  Rocket,
  Calendar,
  Clock,
  MessageSquare,
  ChevronLeft,
  AlertCircle,
  Check,
  Loader2
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../lib/auth';
import toast from 'react-hot-toast';

// Define types for our configurator
type ConfigStep = 'start' | 'solutions' | 'software' | 'details' | 'schedule' | 'success';
type SelectedSolution = string;
type SelectedSoftware = string[];
type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  date: string;
  time: string;
  idea: string;
  customSolution: string;
  copywriting: boolean;
  branding: boolean;
};

// Animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export function SystemConfigurator() {
  // State for the multi-step configurator
  const [currentStep, setCurrentStep] = useState<ConfigStep>('start');
  const [selectedSolutions, setSelectedSolutions] = useState<SelectedSolution[]>([]);
  const [selectedSoftware, setSelectedSoftware] = useState<SelectedSoftware>([]);
  const [customSoftware, setCustomSoftware] = useState<string[]>(['']);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    date: '',
    time: '',
    idea: '',
    customSolution: '',
    copywriting: false,
    branding: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [configId, setConfigId] = useState<string | null>(null);
  const { user } = useAuth();

  // Available solutions from Standard Systems & Functions and Advanced Systems
  const availableSolutions = [
    { 
      id: 'user-account', 
      name: 'User Account System', 
      icon: Users,
      description: 'Secured sign-up and sign-in system with comprehensive user management',
      category: 'standard'
    },
    { 
      id: 'admin-dashboard', 
      name: 'Admin Dashboard', 
      icon: Laptop,
      description: 'Main operating center for your website and the base for future developments',
      category: 'standard'
    },
    { 
      id: 'financial-system', 
      name: 'Financial System', 
      icon: DollarSign,
      description: 'Full company financial administration system with secured database',
      category: 'standard'
    },
    { 
      id: 'payment-integration', 
      name: 'Payment Integration', 
      icon: Sliders,
      description: 'Integrate with Stripe to receive payments directly from your website',
      category: 'standard'
    },
    { 
      id: 'dynamic-content', 
      name: 'Dynamic Content', 
      icon: FileText,
      description: 'Edit website content yourself directly from your admin dashboard',
      category: 'standard'
    },
    { 
      id: 'copywriting', 
      name: 'Professional Copywriting', 
      icon: MessageSquare,
      description: 'We write clear texts based on minimal input from the client',
      category: 'standard'
    },
    { 
      id: 'custom-widgets', 
      name: 'Custom Widgets', 
      icon: Code,
      description: 'Custom UI widgets and interactive elements for your website front-end',
      category: 'standard'
    },
    { 
      id: 'third-party', 
      name: '3rd Party Integrations', 
      icon: Workflow,
      description: 'Integrate with any software, system or technology with API access',
      category: 'standard'
    },
    { 
      id: 'ai-automations', 
      name: 'AI-Powered Automations', 
      icon: Bot,
      description: 'Custom tools that automate complex workflows and time-consuming tasks',
      category: 'advanced'
    },
    { 
      id: 'ecommerce', 
      name: 'E-Commerce Platform', 
      icon: Shield,
      description: 'Full-featured webshops with inventory management and payment processing',
      category: 'advanced'
    },
    { 
      id: 'database', 
      name: 'SQL Database Integration', 
      icon: Database,
      description: 'Powerful database solutions for reliable data storage and complex queries',
      category: 'advanced'
    },
    { 
      id: 'employee-system', 
      name: 'Employee Management', 
      icon: Users,
      description: 'Digital workspace for communication, document sharing, and HR functions',
      category: 'advanced'
    },
    { 
      id: 'analytics', 
      name: 'Advanced Analytics', 
      icon: Sliders,
      description: 'Comprehensive analytics tools providing actionable insights and visualization',
      category: 'advanced'
    },
    { 
      id: 'custom-solution', 
      name: 'Custom Solution', 
      icon: Sparkles,
      description: 'Tailored solution designed specifically for your unique business needs',
      category: 'custom',
      highlight: true
    }
  ];

  // Common software options
  const commonSoftware = [
    'WordPress',
    'Shopify',
    'WooCommerce',
    'LinkedIn',
    'Instagram',
    'Facebook',
    'Microsoft Word',
    'Microsoft Excel',
    'Google Sheets',
    'Google Docs',
    'OneDrive',
    'Dropbox',
    'QuickBooks',
    'Xero',
    'Mailchimp',
    'Salesforce',
    'HubSpot',
    'Slack',
    'Zoom',
    'Google Calendar'
  ];

  // Available time slots
  const availableTimeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  // Handle solution selection
  const toggleSolution = (solutionId: string) => {
    setSelectedSolutions(prev => 
      prev.includes(solutionId)
        ? prev.filter(id => id !== solutionId)
        : [...prev, solutionId]
    );
  };

  // Handle software selection
  const toggleSoftware = (software: string) => {
    setSelectedSoftware(prev => 
      prev.includes(software)
        ? prev.filter(s => s !== software)
        : [...prev, software]
    );
  };

  // Handle custom software input
  const handleCustomSoftwareChange = (index: number, value: string) => {
    const newCustomSoftware = [...customSoftware];
    newCustomSoftware[index] = value;
    setCustomSoftware(newCustomSoftware);
  };

  const addCustomSoftware = () => {
    setCustomSoftware([...customSoftware, '']);
  };

  const removeCustomSoftware = (index: number) => {
    const newCustomSoftware = customSoftware.filter((_, i) => i !== index);
    setCustomSoftware(newCustomSoftware.length ? newCustomSoftware : ['']);
  };

  // Handle form data changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  // Navigate to next step
  const goToNextStep = () => {
    switch (currentStep) {
      case 'start':
        setCurrentStep('solutions');
        break;
      case 'solutions':
        setCurrentStep('software');
        break;
      case 'software':
        setCurrentStep('details');
        break;
      case 'details':
        setCurrentStep('schedule');
        break;
      case 'schedule':
        submitConfiguration();
        break;
      case 'success':
        // Reset everything and go back to start
        resetForm();
        setCurrentStep('start');
        break;
    }
  };

  // Navigate to previous step
  const goToPreviousStep = () => {
    switch (currentStep) {
      case 'solutions':
        setCurrentStep('start');
        break;
      case 'software':
        setCurrentStep('solutions');
        break;
      case 'details':
        setCurrentStep('software');
        break;
      case 'schedule':
        setCurrentStep('details');
        break;
      default:
        break;
    }
  };

  // Reset the form
  const resetForm = () => {
    setSelectedSolutions([]);
    setSelectedSoftware([]);
    setCustomSoftware(['']);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      date: '',
      time: '',
      idea: '',
      customSolution: '',
      copywriting: false,
      branding: false
    });
    setConfigId(null);
    setError(null);
  };

  // Submit configuration to Supabase
  const submitConfiguration = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Get user ID if authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      // Prepare data for submission
      const configData = {
        user_id: user?.id || null,
        solutions: selectedSolutions,
        software: selectedSoftware,
        custom_software: customSoftware.filter(s => s.trim() !== ''),
        project_details: {
          idea: formData.idea,
          customSolution: formData.customSolution,
          copywriting: formData.copywriting,
          branding: formData.branding
        },
        contact_info: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company
        },
        schedule_info: {
          date: formData.date,
          time: formData.time
        },
        status: 'pending'
      };

      // Insert into Supabase
      const { data, error: supabaseError } = await supabase
        .from('website_configurations')
        .insert(configData)
        .select('id')
        .single();

      if (supabaseError) throw supabaseError;
      
      // Store the configuration ID
      if (data) {
        setConfigId(data.id);
      }

      // Move to success step
      setCurrentStep('success');
      
    } catch (error) {
      console.error('Error submitting configuration:', error);
      setError('Failed to submit your configuration. Please try again.');
      toast.error('Failed to submit configuration');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if the current step is valid to proceed
  const isStepValid = () => {
    switch (currentStep) {
      case 'start':
        return true;
      case 'solutions':
        return selectedSolutions.length > 0;
      case 'software':
        return true; // Optional step
      case 'details':
        return formData.idea.trim().length > 0 && 
          (!selectedSolutions.includes('custom-solution') || formData.customSolution.trim().length > 0);
      case 'schedule':
        return formData.name.trim().length > 0 && 
          formData.email.trim().length > 0 && 
          formData.date.trim().length > 0 && 
          formData.time.trim().length > 0;
      default:
        return false;
    }
  };

  // Render the appropriate step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 'start':
        return <StartStep goToNextStep={goToNextStep} />;
      case 'solutions':
        return (
          <SolutionsStep 
            solutions={availableSolutions} 
            selectedSolutions={selectedSolutions} 
            toggleSolution={toggleSolution} 
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            isValid={isStepValid()}
          />
        );
      case 'software':
        return (
          <SoftwareStep 
            commonSoftware={commonSoftware}
            selectedSoftware={selectedSoftware}
            toggleSoftware={toggleSoftware}
            customSoftware={customSoftware}
            handleCustomSoftwareChange={handleCustomSoftwareChange}
            addCustomSoftware={addCustomSoftware}
            removeCustomSoftware={removeCustomSoftware}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 'details':
        return (
          <DetailsStep 
            formData={formData}
            handleInputChange={handleInputChange}
            selectedSolutions={selectedSolutions}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            isValid={isStepValid()}
          />
        );
      case 'schedule':
        return (
          <ScheduleStep 
            formData={formData}
            handleInputChange={handleInputChange}
            availableTimeSlots={availableTimeSlots}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            isValid={isStepValid()}
            isSubmitting={isSubmitting}
            error={error}
          />
        );
      case 'success':
        return (
          <SuccessStep 
            configId={configId}
            formData={formData}
            goToNextStep={goToNextStep}
          />
        );
      default:
        return null;
    }
  };

  // Progress indicator
  const getStepProgress = () => {
    const steps = ['start', 'solutions', 'software', 'details', 'schedule', 'success'];
    const currentIndex = steps.indexOf(currentStep);
    return ((currentIndex) / (steps.length - 1)) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="mb-20"
      data-section="interactive-demo"
      id="interactive-demo"
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 mb-6">
          <Settings className="w-5 h-5 text-indigo-400" />
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
            Interactive System Configurator
          </h2>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
          Configure your perfect website solution in a few simple steps
        </p>
      </div>
      
      {/* Main configurator container with cosmic design */}
      <div className="relative max-w-5xl mx-auto">
        {/* Cosmic background with animated elements */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950"></div>
          
          {/* Animated nebula effect */}
          <div className="absolute inset-0 opacity-30">
            <motion.div 
              className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500/20 blur-[100px]"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[100px]"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 2 }}
            />
          </div>
          
          {/* Star field effect */}
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white"
              style={{ 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 5,
              }}
            />
          ))}
          
          {/* Animated grid lines */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full border-[1px] border-indigo-500/20 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" style={{ backgroundSize: '30px 30px', backgroundImage: 'linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px)' }}></div>
          </div>
        </div>
        
        {/* Glowing border effect */}
        <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur-sm"></div>
        <div className="absolute inset-0 rounded-3xl border border-indigo-500/30"></div>
        
        {/* Content container */}
        <div className="relative rounded-3xl overflow-hidden p-8 md:p-12">
          {/* Progress bar */}
          {currentStep !== 'start' && currentStep !== 'success' && (
            <div className="mb-8">
              <div className="h-2 w-full bg-gray-800/70 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${getStepProgress()}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>Select Solutions</span>
                <span>Current Software</span>
                <span>Project Details</span>
                <span>Schedule Call</span>
              </div>
            </div>
          )}
          
          {/* Step content */}
          <div className="relative min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="h-full"
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Start Step Component
function StartStep({ goToNextStep }: { goToNextStep: () => void }) {
  return (
    <motion.div 
      variants={containerVariants}
      className="flex flex-col items-center justify-center min-h-[500px] text-center"
    >
      <motion.div
        variants={itemVariants}
        className="relative w-32 h-32 mb-8"
      >
        {/* Animated rocket with glow effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center"
            animate={{ 
              boxShadow: ['0 0 20px 0px rgba(99, 102, 241, 0.5)', '0 0 40px 10px rgba(99, 102, 241, 0.7)', '0 0 20px 0px rgba(99, 102, 241, 0.5)']
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Rocket className="w-12 h-12 text-white" />
          </motion.div>
        </div>
        
        {/* Orbiting particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-indigo-400"
            style={{ 
              top: '50%',
              left: '50%',
              marginTop: '-1.5px',
              marginLeft: '-1.5px'
            }}
            animate={{
              x: [0, Math.cos(i * (Math.PI * 2 / 3)) * 60],
              y: [0, Math.sin(i * (Math.PI * 2 / 3)) * 60],
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1
            }}
          />
        ))}
      </motion.div>
      
      <motion.h3 
        variants={itemVariants}
        className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200"
      >
        Build Your Dream Website
      </motion.h3>
      
      <motion.p 
        variants={itemVariants}
        className="text-xl text-gray-300 mb-10 max-w-2xl"
      >
        Let's configure your ideal website solution with powerful features and seamless integrations tailored to your business needs.
      </motion.p>
      
      <motion.button
        variants={itemVariants}
        onClick={goToNextStep}
        className="relative overflow-hidden group bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 flex items-center gap-3 text-lg"
      >
        <span className="relative z-10">Start Configuring</span>
        <ChevronRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
        
        {/* Button hover effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
        />
        <motion.div 
          className="absolute -inset-1 rounded-lg scale-[1.15] bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-40 blur transition-opacity duration-300" 
        />
      </motion.button>
      
      {/* Animated arrow down */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronRight className="w-6 h-6 text-indigo-400 rotate-90" />
      </motion.div>
    </motion.div>
  );
}

// Solutions Step Component
function SolutionsStep({ 
  solutions, 
  selectedSolutions, 
  toggleSolution, 
  goToNextStep,
  goToPreviousStep,
  isValid
}: { 
  solutions: any[], 
  selectedSolutions: string[], 
  toggleSolution: (id: string) => void, 
  goToNextStep: () => void,
  goToPreviousStep: () => void,
  isValid: boolean
}) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'standard' | 'advanced' | 'custom'>('all');
  
  const filteredSolutions = activeCategory === 'all' 
    ? solutions 
    : solutions.filter(solution => solution.category === activeCategory);

  return (
    <motion.div 
      variants={containerVariants}
      className="min-h-[500px] flex flex-col"
    >
      <motion.h3 
        variants={itemVariants}
        className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200"
      >
        Select Your Solutions
      </motion.h3>
      
      <motion.p 
        variants={itemVariants}
        className="text-gray-300 mb-6"
      >
        Choose the systems and functions you'd like to include in your website.
      </motion.p>
      
      {/* Category filters */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-wrap gap-3 mb-6"
      >
        {[
          { id: 'all', label: 'All Solutions' },
          { id: 'standard', label: 'Standard Systems' },
          { id: 'advanced', label: 'Advanced Systems' },
          { id: 'custom', label: 'Custom Solutions' }
        ].map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id as any)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 border border-gray-700 hover:border-indigo-500/30'
            }`}
          >
            {category.label}
          </button>
        ))}
      </motion.div>
      
      {/* Solutions grid */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 flex-grow overflow-y-auto max-h-[400px] pr-2 scrollbar-hide"
      >
        {filteredSolutions.map(solution => (
          <motion.div
            key={solution.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "p-4 rounded-xl cursor-pointer transition-all duration-200 border backdrop-blur-sm",
              selectedSolutions.includes(solution.id)
                ? "bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-indigo-500/50 shadow-lg shadow-indigo-500/10"
                : "bg-gray-800/40 border-gray-700/70 hover:border-indigo-500/30",
              solution.highlight && "ring-2 ring-indigo-500/50"
            )}
            onClick={() => toggleSolution(solution.id)}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300",
                selectedSolutions.includes(solution.id)
                  ? "bg-gradient-to-br from-indigo-500/30 to-purple-500/30 text-white"
                  : "bg-gray-800/70 text-gray-400"
              )}>
                <solution.icon className="w-6 h-6" />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium text-lg">{solution.name}</h4>
                  <div className={cn(
                    "w-6 h-6 rounded-full border flex items-center justify-center transition-colors duration-300",
                    selectedSolutions.includes(solution.id)
                      ? "bg-indigo-500 border-indigo-500 text-white"
                      : "border-gray-600"
                  )}>
                    {selectedSolutions.includes(solution.id) && (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-