import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Calendar } from 'lucide-react';
import { stripeProducts } from '../lib/stripe-config';

export function SuccessPage() {
  const location = useLocation();
  const [productName, setProductName] = useState<string>('your purchase');
  
  useEffect(() => {
    // Get the product ID from the URL query parameters
    const params = new URLSearchParams(location.search);
    const productId = params.get('product');
    
    if (productId && stripeProducts[productId]) {
      setProductName(stripeProducts[productId].name);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative p-8 rounded-2xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-green-500/30 overflow-hidden">
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-2xl border border-green-500/30" />
          <div className="absolute inset-0 rounded-2xl opacity-50">
            <div className="absolute inset-0 rounded-2xl border border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]" />
          </div>

          {/* Energy wave effects */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.05),transparent_80%)] animate-[energyFlow_30s_ease-in-out_infinite]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05),transparent_80%)] animate-[energyFlow_40s_ease-in-out_infinite_reverse]" />
          </div>

          <div className="relative text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Payment Successful!</h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Thank you for purchasing {productName}. We've received your payment and will be in touch shortly to schedule your consultation.
            </p>
            
            <div className="bg-gray-800/50 rounded-lg p-6 mb-8 max-w-xl mx-auto">
              <h2 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5 text-green-400" />
                Next Steps
              </h2>
              <ol className="space-y-4 text-left">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-400 font-semibold">1</span>
                  </div>
                  <span>You'll receive a confirmation email with your purchase details.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-400 font-semibold">2</span>
                  </div>
                  <span>Our team will contact you within 24 hours to schedule your consultation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-400 font-semibold">3</span>
                  </div>
                  <span>We'll send you a calendar invite and preparation materials for your session.</span>
                </li>
              </ol>
            </div>
            
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            >
              Return to Home
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}