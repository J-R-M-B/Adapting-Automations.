import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutGrid, 
  FileText, 
  Database, 
  Users, 
  CreditCard, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import { FeatureNav } from './FeatureNav';
import { FeatureContent } from './FeatureContent';
import { FeatureItem } from './types';

export function FeatureContainer() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  // Features data
  const features: FeatureItem[] = [
    {
      title: "Responsive Design",
      description: "Websites that look great on all devices",
      fullDescription: "Our responsive design approach ensures your website looks and functions perfectly on all devices, from desktops to smartphones. We use modern CSS techniques like Flexbox and Grid to create fluid layouts that adapt to any screen size.",
      icon: LayoutGrid,
      image: "https://images.unsplash.com/photo-1616469829941-c7200edec809?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      bulletPoints: [
        "Mobile-first approach for optimal performance",
        "Fluid layouts that adapt to any screen size",
        "Touch-friendly navigation and interactions",
        "Optimized images and assets for faster loading"
      ],
      cta: {
        text: "Learn More",
        url: "#responsive-design",
        icon: ArrowRight
      }
    },
    {
      title: "Content Management",
      description: "Easy-to-use systems to update your content",
      fullDescription: "Take control of your website content with our intuitive content management systems. Whether you need a simple blog or a complex multi-user publishing platform, we build solutions that make content updates easy and efficient.",
      icon: FileText,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      bulletPoints: [
        "User-friendly admin interfaces",
        "Customizable content types and fields",
        "Media library with image optimization",
        "Scheduled publishing and content workflows"
      ],
      cta: {
        text: "Explore Options",
        url: "#cms-options",
        icon: ArrowRight
      }
    },
    {
      title: "Database Integration",
      description: "Powerful data storage and retrieval systems",
      fullDescription: "Our database integration services connect your website to powerful data storage systems, enabling dynamic content, user accounts, and complex functionality. We work with SQL and NoSQL databases to create scalable, efficient data solutions.",
      icon: Database,
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2021&q=80",
      bulletPoints: [
        "SQL and NoSQL database integration",
        "Optimized queries for fast performance",
        "Data migration and transformation",
        "Secure data storage and access controls"
      ],
      cta: {
        text: "View Solutions",
        url: "#database-solutions",
        icon: ArrowRight
      }
    },
    {
      title: "User Authentication",
      description: "Secure login and account management",
      fullDescription: "Implement secure user authentication systems that protect user data while providing a seamless login experience. Our authentication solutions include social login options, two-factor authentication, and role-based access control.",
      icon: Users,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      bulletPoints: [
        "Secure password hashing and storage",
        "Social login integration (Google, Facebook, etc.)",
        "Two-factor authentication options",
        "Role-based access control systems"
      ],
      cta: {
        text: "See Security Features",
        url: "#security-features",
        icon: ArrowRight
      }
    },
    {
      title: "Payment Processing",
      description: "Secure payment gateways for online transactions",
      fullDescription: "Enable secure online transactions with our payment processing integrations. We implement industry-standard payment gateways that ensure your customers' financial information is protected while providing a smooth checkout experience.",
      icon: CreditCard,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      bulletPoints: [
        "Integration with major payment gateways",
        "PCI-compliant checkout processes",
        "Support for multiple payment methods",
        "Subscription and recurring payment options"
      ],
      cta: {
        text: "Discover Payment Options",
        url: "#payment-options",
        icon: ArrowRight
      }
    }
  ];

  // Auto-rotate through features
  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev === features.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRotate, features.length]);

  // Pause auto-rotation when user interacts
  const handleFeatureChange = (index: number) => {
    setActiveFeature(index);
    setAutoRotate(false);
    
    // Resume auto-rotation after 15 seconds of inactivity
    const timeout = setTimeout(() => {
      setAutoRotate(true);
    }, 15000);

    return () => clearTimeout(timeout);
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative mb-20">
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-2xl overflow-hidden border border-indigo-500/30 p-8"
      >
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <FeatureNav 
            features={features} 
            activeFeature={activeFeature} 
            setActiveFeature={handleFeatureChange} 
          />
          <FeatureContent 
            features={features} 
            activeFeature={activeFeature} 
          />
        </div>
      </motion.div>
    </div>
  );
}