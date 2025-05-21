import { motion } from 'framer-motion';
import { 
  Bot, Sparkles, Brain, ArrowRight, Code, Workflow, Building2, 
  Rocket, Zap, Target, CheckCircle2, Lightbulb, Phone, Share2, Mail 
} from 'lucide-react';
import { WavyBackground } from '../components/ui/wavy-background';
import { Link } from 'react-router-dom';

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const features = [
    {
      icon: Bot,
      title: 'AI Chatbots',
      description: 'Intelligent customer service automation'
    },
    {
      icon: Phone,
      title: 'Phone Agents',
      description: 'AI-powered call handling'
    },
    {
      icon: Share2,
      title: 'Social Media',
      description: 'Automated content and engagement'
    },
    {
      icon: Mail,
      title: 'Outreach Systems',
      description: 'Intelligent communication automation'
    }
  ];

  const values = [
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'Constantly adapting to new technologies'
    },
    {
      icon: Target,
      title: 'Efficiency',
      description: 'Streamlined and optimized solutions'
    },
    {
      icon: CheckCircle2,
      title: 'Simplicity',
      description: 'Making complex systems easy to use'
    },
    {
      icon: Lightbulb,
      title: 'Custom Focus',
      description: 'Tailored solutions for unique needs'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative py-24 overflow-hidden">
        <WavyBackground 
          containerClassName="h-auto absolute inset-0 w-full" 
          colors={["#1E3D59", "#17255A", "#2A0944", "#1B2CC1"]} 
          waveWidth={100}
          backgroundFill="#000000"
          blur={10}
          speed="slow"
          waveOpacity={0.5}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <img 
                src="/Assets/Logo TR (P1) G.png" 
                alt="Adapting Automations Logo" 
                className="h-24 mx-auto mb-8"
              />
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                About Adapting Automations
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We believe that AI and automation are not just tools—they are the future of business.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="relative py-24 bg-gradient-to-b from-black to-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Innovation Meets Simplicity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-2xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden mb-12"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)]" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-purple-400" />
                <h2 className="text-3xl font-bold">Innovation Meets Simplicity</h2>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6">
                  We specialize in designing and implementing custom automation solutions, including AI chatbots, phone agents, outreach systems, and social media automations. Whether optimizing workflows, streamlining communication, or enhancing customer interactions, we ensure that automation works seamlessly within a company's existing structure.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  No matter the complexity of the task, we turn ideas into fully functional systems—built with precision, creativity, and cutting-edge technology.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Solutions Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/60 to-[#0a0a1f]/60 border border-purple-500/20 group hover:border-purple-500/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* A Tailored Approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-2xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden mb-24"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)]" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-purple-400" />
                <h2 className="text-3xl font-bold">A Tailored Approach</h2>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6">
                  What sets Adapting Automations apart is more than just technical expertise. Every project starts with a deep understanding of the client's needs. We take the time to listen, strategize, and develop solutions that not only work but also elevate the way businesses operate.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Our focus is always on efficiency, ease of use, and seamless integration, ensuring that automation simplifies rather than complicates.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Driven by Excellence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-2xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden mb-24"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)]" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <Rocket className="w-8 h-8 text-purple-400" />
                <h2 className="text-3xl font-bold">Driven by Excellence</h2>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6">
                  As specialists in AI and automation, we stay ahead by constantly adapting to new technologies and innovations. Our approach is rooted in continuous improvement, ensuring that every automation solution we provide is as advanced and effective as possible.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  While standardized automations offer quick solutions, our passion lies in crafting fully customized systems that address unique challenges within businesses.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 group hover:scale-105 transition-transform duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.15),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_70%)]" />
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The Future of Business Starts Here</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                At Adapting Automations, innovation, efficiency, and improvement drive everything we do. We don't just build automations—we create smarter, streamlined, and scalable solutions that help businesses stay ahead in an AI-driven world.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}