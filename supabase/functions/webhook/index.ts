// Follow Deno Edge Function conventions
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.7';
import Stripe from 'npm:stripe@14.18.0';

// Initialize Stripe with your secret key
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Webhook secret for verifying the event
const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';

serve(async (req) => {
  try {
    // Get the signature from the headers
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      return new Response(JSON.stringify({ error: 'No signature provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get the request body as text
    const body = await req.text();

    // Verify the event
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err}`);
      return new Response(JSON.stringify({ error: `Webhook Error: ${err.message}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        await handleCheckoutSessionCompleted(session);
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        await handleSubscriptionUpdated(subscription);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        await handleSubscriptionDeleted(subscription);
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    // Get the customer ID
    const customerId = session.customer as string;
    
    // Get payment details
    let paymentIntentId = '';
    if (session.payment_intent) {
      paymentIntentId = typeof session.payment_intent === 'string' 
        ? session.payment_intent 
        : session.payment_intent.id;
    }

    // Insert order data
    await supabase.from('stripe_orders').insert({
      checkout_session_id: session.id,
      payment_intent_id: paymentIntentId,
      customer_id: customerId,
      amount_subtotal: session.amount_subtotal || 0,
      amount_total: session.amount_total || 0,
      currency: session.currency || 'usd',
      payment_status: session.payment_status || 'unpaid',
      status: 'completed',
    });

    // If this is a subscription, the subscription event will handle it
    if (session.mode === 'subscription') {
      console.log('Subscription created, waiting for subscription event');
      return;
    }

    console.log('Checkout session completed successfully');
  } catch (error) {
    console.error('Error handling checkout session completed:', error);
    throw error;
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    const customerId = subscription.customer as string;
    
    // Get payment method details if available
    let paymentMethodBrand = null;
    let paymentMethodLast4 = null;
    
    if (subscription.default_payment_method) {
      try {
        const paymentMethod = await stripe.paymentMethods.retrieve(
          typeof subscription.default_payment_method === 'string'
            ? subscription.default_payment_method
            : subscription.default_payment_method.id
        );
        
        if (paymentMethod.card) {
          paymentMethodBrand = paymentMethod.card.brand;
          paymentMethodLast4 = paymentMethod.card.last4;
        }
      } catch (error) {
        console.error('Error retrieving payment method:', error);
      }
    }

    // Upsert subscription data
    const { data, error } = await supabase
      .from('stripe_subscriptions')
      .upsert({
        customer_id: customerId,
        subscription_id: subscription.id,
        price_id: subscription.items.data[0]?.price.id,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end,
        payment_method_brand: paymentMethodBrand,
        payment_method_last4: paymentMethodLast4,
        status: subscription.status,
      }, {
        onConflict: 'customer_id'
      });

    if (error) {
      throw error;
    }

    console.log('Subscription updated successfully');
  } catch (error) {
    console.error('Error handling subscription updated:', error);
    throw error;
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    const customerId = subscription.customer as string;
    
    // Soft delete the subscription
    const { error } = await supabase
      .from('stripe_subscriptions')
      .update({
        deleted_at: new Date().toISOString(),
        status: 'canceled'
      })
      .eq('customer_id', customerId);

    if (error) {
      throw error;
    }

    console.log('Subscription deleted successfully');
  } catch (error) {
    console.error('Error handling subscription deleted:', error);
    throw error;
  }
}