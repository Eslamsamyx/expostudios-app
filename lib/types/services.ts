export type ServicePillar = 'consult' | 'create' | 'build' | 'amplify';

export interface ServiceFeature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface ProcessStep {
  id: string;
  order: number;
  title: string;
  description: string;
  duration?: string;
  deliverables: string[];
}

export interface ServiceBenefit {
  id: string;
  metric: string;
  value: string;
  description: string;
}

export interface ServiceDetail {
  slug: ServicePillar;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  color: string;
  gradient: string;
  icon: string;
  features: ServiceFeature[];
  process: ProcessStep[];
  benefits: ServiceBenefit[];
  relatedServices: ServicePillar[];
  cta: {
    title: string;
    description: string;
    buttonText: string;
    link: string;
  };
}
