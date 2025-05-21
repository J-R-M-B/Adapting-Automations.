import { motion } from 'framer-motion';
import { ArrowRight, Bot, Target, Sparkles, Workflow, Brain, Code, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AboutSection() {
  const capabilities = [
    {
      icon: Bot,
      title: 'AI Integration',
      description: 'We specialize in seamlessly integrating artificial intelligence into existing business processes, creating systems that learn and adapt to your unique operational needs.'
    },
    {
      icon: Brain,
      title: 'Intelligent Automation',
      description: 'Our automation solutions go beyond simple tasks, incorporating advanced decision-making capabilities and complex workflow management.'
    },
    {
      icon: Code,
      title: 'Custom Development',
      description: 'Every business is unique, which is why we develop custom solutions tailored to your specific challenges and objectives, ensuring perfect alignment with your operations.'
    },
    {
      icon: Shield,
      title: 'Enterprise Solutions',
      description: 'From small businesses to large enterprises, we build robust, scalable systems that grow with your organization while maintaining security and reliability.'
    }
  ];

  return (
    <div className="relative py-24 overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden"
        >
          {/* Main content section */}
          <div className="relative p-8 md:p-12 bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30">
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.15),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_70%)]" />
            
            <div className="relative z-10">
              {/* Main content */}
              <div className="max-w-3xl mx-auto text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Pioneering Intelligent Automation</h2>
                  <div className="space-y-6 text-lg text-gray-300">
                    <p>
                      At Adapting Automations, we're at the forefront of the AI revolution, developing cutting-edge solutions that transform how businesses operate. Our expertise spans the full spectrum of automation technology - from sophisticated AI-powered chatbots and virtual agents to intelligent outreach systems and comprehensive workflow automation.
                    </p>
                    <p>
                      We've developed proprietary frameworks that allow us to create highly customized solutions that integrate seamlessly with existing workflows. Our team of automation architects and AI specialists work alongside your team to design and deploy solutions that feel intuitive and natural while dramatically improving operational efficiency.
                    </p>
                    <p>
                      What truly sets us apart is our consultative approach and deep technical expertise. We don't just implement automation - we partner with you to understand your unique challenges, processes, and goals. This allows us to create solutions that not only solve immediate problems but also adapt and scale with your business.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Capabilities grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {capabilities.map((capability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/60 to-[#0a0a1f]/60 border border-purple-500/20 group hover:border-purple-500/40 transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 transition-colors">
                          <capability.icon className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{capability.title}</h3>
                          <p className="text-gray-300">{capability.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Vision Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center mb-12"
              >
                <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
                <p className="text-lg text-gray-300">
                  The future of business is automated, intelligent, and efficient. At Adapting Automations, we're not just preparing companies for this future - we're actively creating it. Our mission is to make advanced automation technology accessible and practical for businesses of all sizes, helping them stay competitive in an increasingly automated world.
                </p>
              </motion.div>

              {/* CTA section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group"
                >
                  Learn More About Us
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Animated border effect */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 rounded-2xl border border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)] group-hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-shadow duration-300" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}