import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  BarChart, 
  Target, 
  Lightbulb, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  Clock, 
  DollarSign, 
  Users, 
  Sparkles,
  AlertCircle,
  Loader2,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createCheckoutSession } from '../lib/stripe';
import { PackageTier, ConsultingPackage } from '../types/consulting';

export function Consulting() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageTier | null>(null);
  const [isStripeLoading, setIsStripeLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const handleStripeCheckout = async (packageId: PackageTier) => {
    setIsStripeLoading(true);
    setError(null);
    try {
      // Set the selected package
      setSelectedPackage(packageId);
      
      // Create checkout session and redirect to Stripe
      const checkoutUrl = await createCheckoutSession(
        packageId,
        `${window.location.origin}/success?product=${packageId}`,
        `${window.location.origin}/cancel`
      );
      
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setError(error instanceof Error ? error.message : 'Failed to create checkout session');
      toast.error('Failed to create checkout session. Please try again.');
    } finally {
      setIsStripeLoading(false);
    }
  };

  // Define consulting packages
  const packages: ConsultingPackage[] = [
    {
      id: 'consultingBasic',
      name: 'Basic Consulting',
      price: 750,
      description: 'Perfect for small businesses looking to start their AI journey.',
      features: [
        '4 hours of consultation',
        'Process analysis for 1 department',
        'Automation opportunity report',
        'Basic implementation guidance',
        '7 days of email support',
        'Recorded sessions for future reference'
      ],
      consultingHours: 4,
      supportDays: 7,
      cta: 'Get Started',
      color: 'from-blue-500 to-blue-600',
      highlightColor: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
      icon: <Brain className="w-6 h-6 text-blue-500" />
    },
    {
      id: 'consultingStandard',
      name: 'Standard Consulting',
      price: 1200,
      description: 'Comprehensive consulting for growing businesses.',
      features: [
        '8 hours of consultation',
        'Process analysis for 2 departments',
        'Comprehensive automation strategy',
        'Implementation roadmap',
        'AI tool recommendations',
        'Staff training session',
        '14 days of email support',
        'Recorded sessions for future reference'
      ],
      consultingHours: 8,
      supportDays: 14,
      cta: 'Best Value',
      popular: true,
      color: 'from-purple-500 to-purple-600',
      highlightColor: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
      icon: <Zap className="w-6 h-6 text-purple-500" />
    },
    {
      id: 'consultingPro',
      name: 'Pro Consulting',
      price: 2000,
      description: 'Enterprise-grade consulting for complete transformation.',
      features: [
        '12 hours of consultation',
        'Comprehensive company-wide analysis',
        'Custom AI integration planning',
        'Staff training workshops',
        'Executive presentation',
        'Custom implementation strategy',
        '30 days of priority support',
        'Quarterly follow-up session',
        'Recorded sessions for future reference'
      ],
      consultingHours: 12,
      supportDays: 30,
      cta: 'Go Pro',
      color: 'from-gradient-to-r from-rose-500 to-orange-500',
      highlightColor: 'bg-rose-500/10 text-rose-500 border-rose-500/30',
      icon: <Sparkles className="w-6 h-6 text-rose-500" />
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: "What happens during a consulting session?",
      answer: "Our consulting sessions are structured to maximize value. We begin with understanding your current processes, identify automation opportunities, discuss AI implementation possibilities, and provide actionable recommendations. Sessions are interactive with screen sharing, demonstrations, and Q&A components."
    },
    {
      question: "How do I prepare for the first consultation?",
      answer: "To get the most out of your consultation, we recommend preparing a list of your current processes, pain points, and goals. Any documentation of workflows that you can share ahead of time helps us come prepared with tailored suggestions. Don't worry if you're not sure what to prepare—we'll guide you through the process."
    },
    {
      question: "Can you help with specific AI tools or platforms?",
      answer: "Yes, we have experience with a wide range of AI tools and platforms including OpenAI (ChatGPT, DALL-E), Google's AI suite, HuggingFace models, Microsoft Azure AI, and many industry-specific solutions. We provide vendor-neutral advice focused on what will work best for your specific needs."
    },
    {
      question: "Do you offer implementation services after consulting?",
      answer: "Absolutely. While our consulting packages focus on strategy and recommendations, we offer separate implementation services to bring these plans to life. Many clients start with consulting to establish the right approach, then engage us for implementation to ensure the strategy is executed properly."
    },
    {
      question: "How quickly can we see results after implementing your recommendations?",
      answer: "Timeline to results varies based on the complexity of implementation and your organization's adaptability. Simple automations can show ROI within weeks, while more complex AI integrations might take a few months to fully optimize. We focus on quick wins early in the process to demonstrate value while building toward larger transformations."
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Hero Section */}
      <div ref={heroRef} className="relative min-h-screen pt-20">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.15),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_70%)]"></div>
          
          {/* Animated particles */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {[...Array(30)].map((_, i) => (
              <motion.circle
                key={i}
                cx={Math.random() * 100 + "%"}
                cy={Math.random() * 100 + "%"}
                r="1"
                fill="rgba(147,51,234,0.5)"
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
        
        <motion.div 
          style={{ opacity, y, scale }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
              <Brain className="w-4 h-4" />
              <span>AI & Automation Expertise</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200">
              AI Consulting Services
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              Unlock your business potential with expert AI and automation consulting tailored to your unique challenges.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#packages"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
              >
                View Packages
              </a>
              <Link
                to="/contact"
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold text-white transition-colors duration-300"
              >
                Request Custom Quote
              </Link>
            </div>
          </motion.div>

          {/* Bouncing arrow */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10"
          >
            <ChevronDown className="w-8 h-8 text-purple-500" />
          </motion.div>
        </motion.div>
      </div>

      {/* Services Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(147,51,234,0.1),transparent_50%)]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Choose Our Consulting Services</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We bring years of expertise at the forefront of AI development, providing tailored insights 
              and strategies to transform your business operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Brain className="w-12 h-12 text-purple-400" />,
                title: "Deep AI Expertise",
                description: "Our team stays at the cutting edge of AI developments and can translate complex technologies into practical applications for your business."
              },
              {
                icon: <Lightbulb className="w-12 h-12 text-yellow-400" />,
                title: "Process Optimization",
                description: "We analyze your current workflows and identify key opportunities for automation that deliver maximum impact with minimal disruption."
              },
              {
                icon: <Target className="w-12 h-12 text-red-400" />,
                title: "Custom Strategy",
                description: "Every business has unique needs. We develop tailored strategies aligned with your specific goals, industry, and technology landscape."
              },
              {
                icon: <Users className="w-12 h-12 text-blue-400" />,
                title: "Knowledge Transfer",
                description: "Beyond recommendations, we ensure your team understands the technologies, providing training to build internal capabilities."
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative p-8 rounded-2xl bg-gray-900/50 border border-purple-500/20 group hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 rounded-2xl border border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)] group-hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] transition-shadow duration-300" />
                </div>
                
                <div className="relative">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="relative py-24 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.1),transparent_70%)]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Consulting Process</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We follow a structured approach to ensure we understand your needs and deliver maximum value.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Connection line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 to-blue-500/50 -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-16">
              {[
                {
                  icon: <Lightbulb className="w-6 h-6 text-yellow-400" />,
                  title: "Discovery & Analysis",
                  description: "We begin by understanding your business, existing processes, and pain points through in-depth discussions and systems analysis.",
                  color: "bg-yellow-500/20 border-yellow-500/30",
                  iconBg: "bg-yellow-500/20"
                },
                {
                  icon: <Target className="w-6 h-6 text-red-400" />,
                  title: "Opportunity Identification",
                  description: "Our experts identify key areas that could benefit from AI and automation, prioritized by potential impact and implementation ease.",
                  color: "bg-red-500/20 border-red-500/30",
                  iconBg: "bg-red-500/20"
                },
                {
                  icon: <Zap className="w-6 h-6 text-purple-400" />,
                  title: "Strategy Development",
                  description: "We create a tailored strategy and roadmap for implementing AI solutions, including tool recommendations and process redesigns.",
                  color: "bg-purple-500/20 border-purple-500/30",
                  iconBg: "bg-purple-500/20"
                },
                {
                  icon: <Brain className="w-6 h-6 text-blue-400" />,
                  title: "Knowledge Transfer",
                  description: "We conduct training sessions to ensure your team understands how to leverage AI effectively, covering prompt engineering and tool usage.",
                  color: "bg-blue-500/20 border-blue-500/30",
                  iconBg: "bg-blue-500/20"
                },
                {
                  icon: <BarChart className="w-6 h-6 text-green-400" />,
                  title: "Implementation Support",
                  description: "We provide guidance during implementation, helping to overcome challenges and ensure the solutions deliver expected results.",
                  color: "bg-green-500/20 border-green-500/30",
                  iconBg: "bg-green-500/20"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="md:grid md:grid-cols-2 gap-8"
                >
                  <div className={`${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                    <div className={`flex items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} gap-4`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center relative z-10 border ${step.color} ${step.iconBg}`}>
                        {step.icon}
                        <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping opacity-30"></div>
                      </div>
                      <div className="hidden md:block w-12 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                    </div>
                    <div className="mt-4 p-6 rounded-xl border border-purple-500/20 bg-gray-900/50">
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </div>
                  {index % 2 === 1 && <div></div>}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div id="packages" className="relative py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.1),transparent_70%)]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Consulting Packages</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Choose the consulting package that best fits your business needs and transformation goals.
            </p>
          </motion.div>

          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-400">{error}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`relative p-8 rounded-2xl bg-gray-900/50 border ${
                  pkg.popular ? 'border-purple-500/50' : 'border-gray-800/80'
                } transition-all duration-300 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/5 flex flex-col h-full ${
                  pkg.popular ? 'transform hover:-translate-y-2' : 'transform hover:-translate-y-1'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br bg-gray-800 flex items-center justify-center mb-4">
                    {pkg.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{pkg.name}</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-bold">€{pkg.price}</span>
                  </div>
                  <p className="mt-3 text-gray-400">{pkg.description}</p>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  {/* Key metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-3 rounded-lg ${pkg.highlightColor}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Consulting Time</span>
                      </div>
                      <p className="font-bold">{pkg.consultingHours} hours</p>
                    </div>
                    <div className={`p-3 rounded-lg ${pkg.highlightColor}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">Support Period</span>
                      </div>
                      <p className="font-bold">{pkg.supportDays} days</p>
                    </div>
                  </div>
                  
                  {/* Feature list */}
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleStripeCheckout(pkg.id as PackageTier)}
                  disabled={isStripeLoading}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    pkg.popular 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white'
                      : 'bg-gray-800 hover:bg-gray-700 text-white'
                  } ${isStripeLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isStripeLoading && selectedPackage === pkg.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {pkg.cta}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-gray-400">
              Need something more specific? <Link to="/contact" className="text-purple-400 hover:text-purple-300 transition-colors">Contact us</Link> for a custom consulting package.
            </p>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="relative py-24 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.1),transparent_70%)]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Real Results for Businesses</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our clients have transformed their operations and achieved significant improvements through our consulting services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                metric: "40%",
                label: "Average reduction in operational costs",
                icon: <DollarSign className="w-6 h-6 text-green-400" />
              },
              {
                metric: "60%",
                label: "Average time saved on repetitive tasks",
                icon: <Clock className="w-6 h-6 text-blue-400" />
              },
              {
                metric: "85%",
                label: "Of clients implement at least two AI solutions",
                icon: <Brain className="w-6 h-6 text-purple-400" />
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gray-900/50 border border-purple-500/20"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                    {stat.metric}
                  </div>
                  <p className="text-gray-300">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "The AI consulting transformed our customer service operations. We implemented chatbots that now handle 70% of inquiries, freeing our team to focus on complex issues.",
                author: "Sarah Johnson",
                title: "Operations Director, E-commerce Company"
              },
              {
                quote: "Their expert guidance helped us implement AI-powered analytics that revealed trends we never knew existed in our data. Our decision-making process is now significantly faster and more accurate.",
                author: "Michael Chen",
                title: "CTO, Financial Services Firm"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-b from-gray-900/80 to-gray-900/40 border border-gray-800"
              >
                <div className="mb-6">
                  {/* Quote marks */}
                  <svg width="45" height="36" className="text-purple-500 opacity-30">
                    <path
                      d="M13.415.43c-6.13 0-11.065 4.869-11.065 10.931 0 6.01 4.935 10.93 11.065 10.93 6.13 0 11.065-4.92 11.065-10.93h-2.213c0 5.043-3.853 9.154-8.852 9.154-4.935 0-8.852-4.112-8.852-9.154S8.58 2.207 13.515 2.207V.43h-.1zM33.664.43c-6.13 0-11.065 4.869-11.065 10.931 0 6.01 4.935 10.93 11.065 10.93 6.13 0 11.065-4.92 11.065-10.93h-2.213c0 5.043-3.853 9.154-8.852 9.154-4.935 0-8.852-4.112-8.852-9.154S28.95 2.207 33.885 2.207V.43h-.221z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <blockquote className="text-lg text-gray-300 mb-6">
                  {testimonial.quote}
                </blockquote>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-300">
              Have questions about our consulting services? Find answers to common questions below.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-gray-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex justify-between items-center bg-gray-900/50 hover:bg-gray-900 transition-colors text-left"
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === index && (
                  <div className="px-6 py-4 bg-gray-900/30 text-gray-300">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(147,51,234,0.15),transparent_70%)]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Transform Your Business?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Companies that embrace AI will dominate, while others fall behind. Don't get left behind—start your automation journey today.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="#packages"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 flex items-center gap-2"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                to="/contact"
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold text-white transition-colors duration-300 flex items-center gap-2"
              >
                Contact Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}