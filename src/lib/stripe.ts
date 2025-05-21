import { stripeProducts } from './stripe-config';
import { supabase } from './supabase';

/**
 * Creates a Checkout Session with Stripe
 * 
 * @param productId - The ID of the product to purchase
 * @param successUrl - URL to redirect to after successful payment
 * @param cancelUrl - URL to redirect to if payment is cancelled
 * @returns The checkout session URL
 */
export async function createCheckoutSession(
  productId: string,
  successUrl: string = `${window.location.origin}/success`,
  cancelUrl: string = `${window.location.origin}/cancel`
): Promise<string> {
  try {
    // Get the product configuration
    const product = stripeProducts[productId];
    if (!product) {
      throw new Error(`Product not found: ${productId}`);
    }

    // Get the current session
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token || import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Call the Supabase Edge Function to create a checkout session
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          priceId: product.priceId,
          mode: product.mode,
          successUrl: successUrl,
          cancelUrl: cancelUrl
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Server responded with ${response.status}: ${JSON.stringify(errorData)}`);
    }

    const { url } = await response.json();
    
    if (!url) {
      throw new Error('No checkout URL returned from server');
    }

    return url;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw new Error(`Error creating checkout session: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Fetches the current user's active subscription information from Supabase
 * 
 * @returns The user's subscription data or null if not subscribed
 */
export async function getActiveSubscription() {
  try {
    const { data, error } = await supabase
      .from('stripe_user_subscriptions')
      .select('*')
      .eq('subscription_status', 'active')
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching subscription:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }
}

/**
 * Fetches the current user's order history from Supabase
 * 
 * @returns Array of the user's orders or empty array if none found
 */
export async function getUserOrders() {
  try {
    const { data, error } = await supabase
      .from('stripe_user_orders')
      .select('*')
      .order('order_date', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}