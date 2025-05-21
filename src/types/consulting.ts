import { ReactNode } from 'react';

// Package tier types
export type PackageTier = 'consultingBasic' | 'consultingStandard' | 'consultingPro';

// Consulting package interface
export interface ConsultingPackage {
  id: PackageTier;
  name: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  consultingHours: number;
  supportDays: number;
  color: string;
  highlightColor: string;
  icon: ReactNode;
}

// Checkout session response
export interface CheckoutSessionResponse {
  url: string;
  sessionId: string;
}

// Checkout session request
export interface CheckoutSessionRequest {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}