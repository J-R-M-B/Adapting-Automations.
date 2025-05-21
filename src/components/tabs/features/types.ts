import { DivideIcon as LucideIcon } from 'lucide-react';

export interface FeatureItem {
  title: string;
  description: string;
  fullDescription: string;
  icon: LucideIcon;
  image?: string;
  bulletPoints?: string[];
  cta?: {
    text: string;
    url: string;
    icon: LucideIcon;
  };
}