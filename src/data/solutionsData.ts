import { 
  Bot, Phone, Database, Share2, Globe, Mail
} from 'lucide-react';
import { Solution } from '../types/solutions';

export const solutionsData: Solution[] = [
  {
    id: 'website',
    title: 'Webdesign',
    icon: Globe,
    description: 'Custom-built websites optimized for performance, automation, and business integrations. Designed for speed, scalability, and a seamless user experience.',
    benefits: [
      'Custom design & branding',
      'Automation-ready',
      'Fast & SEO-friendly',
      'Secure & scalable'
    ],
    specs: {
      timeline: '4-8 weeks',
      complexity: 'High',
      maintenance: 'Monthly updates'
    },
    integrations: [
      'Payment systems',
      'CRM platforms',
      'Analytics tools',
      'Marketing automation',
      'Social media platforms',
      'Email systems'
    ],
    metrics: [
      '99.9% uptime guarantee',
      '2x faster load times',
      '40% higher conversion rates'
    ]
  },
  {
    id: 'chatbot',
    title: 'AI Chat Bots',
    icon: Bot,
    description: 'Intelligent chatbots that handle customer inquiries 24/7, powered by advanced AI to understand context and provide accurate responses.',
    benefits: [
      'Reduce customer service costs',
      'Instant 24/7 support',
      'Handle multiple inquiries simultaneously',
      'Learn from interactions'
    ],
    specs: {
      timeline: '2-4 weeks',
      complexity: 'Medium',
      maintenance: 'Monthly updates'
    },
    integrations: [
      'CRM systems',
      'Knowledge bases',
      'Ticketing systems',
      'Communication platforms'
    ],
    metrics: [
      '85% reduction in response time',
      '60% decrease in support costs',
      '95% customer satisfaction'
    ]
  },
  {
    id: 'phone-agent',
    title: 'AI Phone Agents',
    icon: Phone,
    description: 'Voice-enabled AI agents that handle calls, schedule appointments, and process orders with natural conversation flow.',
    benefits: [
      'Natural voice interactions',
      'Automated call handling',
      'Appointment scheduling',
      'Call transcription & analysis'
    ],
    specs: {
      timeline: '4-6 weeks',
      complexity: 'High',
      maintenance: 'Bi-weekly updates'
    },
    integrations: [
      'Phone systems',
      'Calendar apps',
      'CRM platforms',
      'Analytics tools'
    ],
    metrics: [
      '75% call handling automation',
      '90% scheduling accuracy',
      '40% cost reduction'
    ]
  },
  {
    id: 'social-media',
    title: 'Social Media Automation',
    icon: Share2,
    description: 'Automates content creation, scheduling, and engagement across platforms. Ensures consistent posting and interaction without manual effort.',
    benefits: [
      'Post scheduling',
      'AI content creation',
      'Automated engagement',
      'Cross-platform posting'
    ],
    specs: {
      timeline: '2-3 weeks',
      complexity: 'Medium',
      maintenance: 'Weekly updates'
    },
    integrations: [
      'Social media platforms',
      'Content management systems',
      'Analytics tools',
      'Media libraries'
    ],
    metrics: [
      '70% time saved on content management',
      '3x increase in engagement',
      '24/7 automated responses'
    ]
  },
  {
    id: 'outreach',
    title: 'Outreach Automations',
    icon: Mail,
    description: 'An AI-powered system that finds decision-makers, gathers data, and sends personalized outreach emails at scale. Automates lead generation and follow-ups.',
    benefits: [
      'Lead identification',
      'AI-personalized emails',
      'Mass sending',
      'Follow-up automation'
    ],
    specs: {
      timeline: '3-5 weeks',
      complexity: 'Medium',
      maintenance: 'Bi-weekly updates'
    },
    integrations: [
      'Email services',
      'CRM systems',
      'Lead databases',
      'Analytics platforms'
    ],
    metrics: [
      '4x increase in outreach capacity',
      '45% higher response rates',
      '80% time saved on follow-ups'
    ]
  }
];