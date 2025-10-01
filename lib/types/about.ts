export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: 'consult' | 'create' | 'build' | 'amplify';
  bio: string;
  extendedBio?: string;
  image?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    portfolio?: string;
  };
  expertise: string[];
  joinedYear: number;
}

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  details?: string[];
}

export interface TimelineMilestone {
  year: number;
  month?: string;
  title: string;
  description: string;
  category: 'company' | 'product' | 'team' | 'achievement';
  image?: string;
  video?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface AboutStat {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  color: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  benefits: string[];
}

export interface CultureValue {
  title: string;
  description: string;
  image?: string;
}

export interface MethodologyStep {
  step: number;
  title: string;
  description: string;
  color: string;
  practices: string[];
}

export interface AboutPageData {
  hero: {
    title: string;
    subtitle: string;
    mission: string;
  };
  story: {
    title: string;
    content: string[];
    founded: string;
    founders: string[];
    images: string[];
  };
  values: CompanyValue[];
  team: TeamMember[];
  whyChooseUs: WhyChooseUsItem[];
  stats: AboutStat[];
  timeline: TimelineMilestone[];
  culture: CultureValue[];
  methodology: MethodologyStep[];
}
