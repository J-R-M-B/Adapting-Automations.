import { DivideIcon as LucideIcon } from 'lucide-react';

export interface Solution {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  benefits: string[];
  specs: {
    timeline: string;
    complexity: string;
    maintenance: string;
  };
  integrations: string[];
  metrics: string[];
}