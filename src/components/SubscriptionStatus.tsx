import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { getActiveSubscription, getUserOrders } from '../lib/stripe';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export function SubscriptionStatus() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchSubscriptionData();
    }
  }, [user]);

  const fetchSubscriptionData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch subscription data
      const subscriptionData = await getActiveSubscription();
      setSubscription(subscriptionData);
      
      // Fetch order history
      const orderData = await getUserOrders();
      setOrders(orderData || []);
    } catch (err) {
      console.error('Error fetching subscription data:', err);
      setError('Failed to load subscription information');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="w-5 h-5 text-purple-500 animate-spin mr-2" />
        <span>Loading subscription data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
        <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
        <span className="text-red-400">{error}</span>
      </div>
    );
  }

  // If user has purchased consulting packages
  if (orders && orders.length > 0) {
    return (
      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
        <div className="flex items-center mb-2">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
          <span className="font-medium">Consulting Package Purchased</span>
        </div>
        <p className="text-sm text-gray-300">
          You have purchased {orders.length} consulting package{orders.length !== 1 ? 's' : ''}.
          Our team will contact you shortly to schedule your sessions.
        </p>
      </div>
    );
  }

  // If user has an active subscription
  if (subscription && subscription.subscription_status === 'active') {
    return (
      <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
        <div className="flex items-center mb-2">
          <CheckCircle className="w-5 h-5 text-purple-500 mr-2" />
          <span className="font-medium">Active Subscription</span>
        </div>
        <p className="text-sm text-gray-300">
          Your subscription is active until {new Date(subscription.current_period_end * 1000).toLocaleDateString()}.
        </p>
      </div>
    );
  }

  // Default case - no subscription or orders
  return (
    <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
      <p className="text-sm text-gray-400">
        You don't have any active subscriptions or consulting packages.
        Check out our <a href="/consulting" className="text-purple-400 hover:text-purple-300">consulting packages</a> to get started.
      </p>
    </div>
  );
}