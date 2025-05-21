import { useState } from 'react';
import { ConsultationForm } from '../components/ConsultationForm';
import { WavyBackground } from '../components/ui/wavy-background';
import { Target, Workflow, Brain, ArrowRight, Calendar } from 'lucide-react';
import { createCheckoutSession } from '../lib/stripe';
import { stripeProducts } from '../lib/stripe-config';
import toast from 'react-hot-toast';

export function ConsultationPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleStripeCheckout = async (productId: string) => {
    try {
      setIsLoading(productId);
      
      // Get the product configuration from stripeProducts
      const product = stripeProducts[productId];
      if (!product) {
        throw new Error(`Product not found: ${productId}`);
      }
      
      // Create a checkout session and redirect to Stripe
      const checkoutUrl = await createCheckoutSession(
        productId,
        `${window.location.origin}/success?product=${productId}`,
        `${window.location.origin}/consultation`
      );
      
      // Redirect to the checkout URL
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error(`Error creating checkout session: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <div className="relative py-24">
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
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Schedule a Custom Solutions Consultation
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Let's discuss how we can transform your business operations with custom AI automation solutions.
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Target,
                title: 'Identify Opportunities',
                description: 'We analyze your workflows to find automation potential'
              },
              {
                icon: Workflow,
                title: 'Design Solution',
                description: 'Create a tailored automation strategy for your needs'
              },
              {
                icon: Brain,
                title: 'Implement & Optimize',
                description: 'Deploy and refine your custom automation solution'
              }
            ].map((step, index) => (
              <div
                key={index}
                className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/60 to-[#0a0a1f]/60 border border-purple-500/20 group hover:border-purple-500/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                  <step.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Pricing Tiers */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Consultation Package</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  id: 'consultingBasic',
                  name: 'Basic',
                  price: '€750',
                  description: 'Essential consultation for small businesses',
                  features: [
                    '2-hour consultation',
                    'Basic needs assessment',
                    'Simple automation recommendations',
                    'Email follow-up'
                  ]
                },
                {
                  id: 'consultingStandard',
                  name: 'Standard',
                  price: '€1,200',
                  description: 'Comprehensive solution for growing businesses',
                  features: [
                    '4-hour consultation',
                    'Detailed workflow analysis',
                    'Custom automation strategy',
                    'Two weeks of email support',
                    'Implementation guidance'
                  ],
                  featured: true
                },
                {
                  id: 'consultingPro',
                  name: 'Professional',
                  price: '€2,000',
                  description: 'Advanced solution for complex business needs',
                  features: [
                    '8-hour consultation (split sessions)',
                    'Comprehensive systems analysis',
                    'Detailed implementation plan',
                    'ROI projections',
                    'One month of priority support',
                    'Follow-up strategy session'
                  ]
                }
              ].map((tier) => (
                <div 
                  key={tier.id}
                  className={`relative p-8 rounded-2xl overflow-hidden ${
                    tier.featured 
                      ? 'bg-gradient-to-b from-purple-900/30 to-purple-800/20 border-2 border-purple-500/50 transform scale-105 z-10' 
                      : 'bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-gray-800'
                  }`}
                >
                  {tier.featured && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-center py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  
                  <div className={`${tier.featured ? 'pt-4' : ''}`}>
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-4xl font-extrabold">{tier.price}</span>
                      <span className="text-gray-400 ml-2">one-time</span>
                    </div>
                    <p className="text-gray-300 mb-6">{tier.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      onClick={() => handleStripeCheckout(tier.id)}
                      disabled={isLoading === tier.id}
                      className={`w-full bg-gradient-to-r ${
                        tier.featured 
                          ? 'from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600' 
                          : 'from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                      } text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                        isLoading === tier.id ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-purple-500/20'
                      }`}
                    >
                      {isLoading === tier.id ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          Book Consultation
                          <Calendar className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consultation Form */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">Or Fill Out Our Consultation Form</h2>
            <p className="text-center text-gray-300 max-w-3xl mx-auto mb-12">
              Prefer to discuss your needs in detail first? Fill out our consultation form and we'll get back to you within 24 hours to schedule a call.
            </p>
            <ConsultationForm />
          </div>
        </div>
      </div>
    </div>
  );
}