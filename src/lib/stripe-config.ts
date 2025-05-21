import { PackageTier } from './types/consulting';

// Stripe product configuration
export const stripeProducts = {
  consultingBasic: {
    priceId: 'price_1RCcegIxWeoB9gI3IK9HB1b0',
    name: 'Consulting Basic',
    description: 'Perfect for small businesses looking to start their AI journey.',
    mode: 'payment' as const,
    amount: 75000, // 750.00 € in cents
    currency: 'eur'
  },
  consultingStandard: {
    priceId: 'price_1RCch4IxWeoB9gI3D680asyY',
    name: 'Consulting Standard',
    description: 'Comprehensive consulting for growing businesses.',
    mode: 'payment' as const,
    amount: 120000, // 1,200.00 € in cents
    currency: 'eur'
  },
  consultingPro: {
    priceId: 'price_1RCchcIxWeoB9gI3OqyHLBZ9',
    name: 'Consulting Pro',
    description: 'Enterprise-grade consulting for complete transformation.',
    mode: 'payment' as const,
    amount: 200000, // 2,000.00 € in cents
    currency: 'eur'
  }
};

// Get price ID for a specific package
export function getPriceId(packageId: PackageTier): string {
  return stripeProducts[packageId].priceId;
}

// Get product details for a specific package
export function getProductDetails(packageId: PackageTier) {
  return stripeProducts[packageId];
}