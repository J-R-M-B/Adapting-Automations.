import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Calendar, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../lib/auth';
import { getUserOrders } from '../../lib/stripe';

export function ConsultingSuccess() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    // Get session_id from URL query params
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get('session_id');
    
    if (sessionId && user) {
      fetchOrderDetails(sessionId);
    } else {
      setLoading(false);
    }
  }, [location, user]);

  const fetchOrderDetails = async (sessionId: string) => {
    try {
      setLoading(true);
      
      // Fetch the user's orders
      const orders = await getUserOrders();
      
      // Find the order that matches the session ID
      const matchingOrder = orders?.find(order => order.checkout_session_id === sessionId);
      
      if (matchingOrder) {
        setOrderDetails(matchingOrder);
      }
    } catch (err) {
      console.error('Error fetching order details:', err);
      setError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
          <p className="text-xl">Loading your order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
            <p className="text-xl text-red-400 mb-8">{error}</p>
            <Link
              to="/consulting"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 inline-flex items-center gap-2"
            >
              Return to Consulting
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          
          <h1 className="text-4xl font-bold mb-6">Thank You for Your Purchase!</h1>
          <p className="text-xl text-gray-300 mb-8">
            Your consulting package has been successfully purchased. We're excited to help transform your business with AI.
          </p>
          
          {orderDetails && (
            <div className="mb-10 p-6 rounded-2xl bg-gray-900/50 border border-purple-500/30 text-left">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Order ID:</span>
                  <span>{orderDetails.order_id}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Amount:</span>
                  <span>{(orderDetails.amount_total / 100).toFixed(2)} {orderDetails.currency.toUpperCase()}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Date:</span>
                  <span>{new Date(orderDetails.order_date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-green-400 capitalize">{orderDetails.payment_status}</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 p-8 rounded-2xl border border-green-500/30 mb-10">
            <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
            <ol className="space-y-4 text-left">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-500 font-bold">1</span>
                </div>
                <div>
                  <p className="font-medium">Check Your Email</p>
                  <p className="text-gray-400">
                    We've sent a confirmation to your email address with details about your purchase.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-500 font-bold">2</span>
                </div>
                <div>
                  <p className="font-medium">Schedule Your First Session</p>
                  <p className="text-gray-400">
                    Our team will reach out within 24 hours to schedule your first consulting session.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-500 font-bold">3</span>
                </div>
                <div>
                  <p className="font-medium">Prepare Your Questions</p>
                  <p className="text-gray-400">
                    Start thinking about specific areas of your business you'd like to focus on during our sessions.
                  </p>
                </div>
              </li>
            </ol>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 flex items-center gap-2"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/"
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold text-white transition-colors duration-300"
            >
              Return to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}