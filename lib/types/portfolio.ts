export type ServiceType = 'consult' | 'create' | 'build' | 'amplify';

export type Industry =
  | 'exhibitions'
  | 'experienceCenters'
  | 'government'
  | 'retail'
  | 'museums'
  | 'corporate'
  | 'education';

export interface Technology {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'infrastructure' | 'design' | 'hardware';
  icon?: string;
}

export interface ProjectImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  featured?: boolean;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  description?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  client: string;
  industry: Industry;
  services: ServiceType[];
  technologies: Technology[];

  images: ProjectImage[];
  thumbnail: string;

  featured?: boolean;
  year: number;
  duration?: string;

  challenge?: string;
  solution?: string;
  results?: CaseStudyMetric[];

  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
    avatar?: string;
  };

  links?: {
    live?: string;
    case_study?: string;
  };
}

export interface PortfolioFilters {
  services: ServiceType[];
  industries: Industry[];
  technologies: string[];
  year?: number;
  featured?: boolean;
}
