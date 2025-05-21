// Follow Deno Edge Function conventions
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.7';
import Stripe from 'npm:stripe@14.18.0';

// Initialize Stripe with your secret key
// The secret key should be set as an environment variable in the Supabase dashboard
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Parse the request body first to get the required parameters
    const { priceId, mode, successUrl, cancelUrl } = await req.json();

    if (!priceId || !mode || !successUrl || !cancelUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get the JWT token from the request headers
    const authHeader = req.headers.get('Authorization');
    let user = null;
    let customerId = null;

    // If we have an auth header that's not the anon key, try to get the user
    if (authHeader && !authHeader.includes(Deno.env.get('SUPABASE_ANON_KEY') || '')) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser(token);

      if (!authError && authUser) {
        user = authUser;
        
        // Check if the user already has a Stripe customer ID
        const { data: customerData, error: customerError } = await supabase
          .from('stripe_customers')
          .select('customer_id')
          .eq('user_id', user.id)
          .is('deleted_at', null)
          .single();

        if (!customerError && customerData) {
          customerId = customerData.customer_id;
        }
      }
    }

    // If no customer ID yet (either anonymous user or authenticated user without a customer)
    if (!customerId) {
      // Create a new Stripe customer
      const customerData: { email?: string; metadata: Record<string, string> } = {
        metadata: {
          user_id: user?.id || 'anonymous',
        }
      };

      // Add email if available
      if (user?.email) {
        customerData.email = user.email;
      }

      const customer = await stripe.customers.create(customerData);
      customerId = customer.id;

      // Store the customer ID in the database if user is authenticated
      if (user) {
        await supabase.from('stripe_customers').insert({
          user_id: user.id,
          customer_id: customerId,
        });
      }
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode as 'payment' | 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: user?.id || 'anonymous',
    });

    // Return the checkout session URL
    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? error.toString() : 'Unknown error'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});