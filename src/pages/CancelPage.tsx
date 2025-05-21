import { Link } from 'react-router-dom';
import { XCircle, ArrowRight, HelpCircle } from 'lucide-react';

export function CancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative p-8 rounded-2xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-red-500/30 overflow-hidden">
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-2xl border border-red-500/30" />
          <div className="absolute inset-0 rounded-2xl opacity-50">
            <div className="absolute inset-0 rounded-2xl border border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]" />
          </div>

          {/* Energy wave effects */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.05),transparent_80%)] animate-[energyFlow_30s_ease-in-out_infinite]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05),transparent_80%)] animate-[energyFlow_40s_ease-in-out_infinite_reverse]" />
          </div>

          <div className="relative text-center">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Payment Cancelled</h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Your payment was cancelled and you have not been charged.
            </p>
            
            <div className="bg-gray-800/50 rounded-lg p-6 mb-8 max-w-xl mx-auto">
              <h2 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-400" />
                Need Help?
              </h2>
              <p className="text-gray-300 mb-4">
                If you encountered any issues during the payment process or have questions about our services, please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Contact Support
                </Link>
                <Link
                  to="/consulting"
                  className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-6 py-2 rounded-lg transition-colors"
                >
                  Return to Consulting
                </Link>
              </div>
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