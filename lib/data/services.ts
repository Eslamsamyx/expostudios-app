import { ServiceDetail } from '../types/services';

export const services: ServiceDetail[] = [
  {
    slug: 'consult',
    name: 'Consult',
    tagline: 'Strategic Vision & Experience Design',
    description: 'Transform your vision into actionable strategies with our expert consulting services.',
    longDescription:
      'We partner with you to understand your goals, audience, and challenges. Our strategic consulting combines industry insights, user research, and innovative thinking to craft comprehensive roadmaps that turn ambitious ideas into achievable milestones.',
    color: '#00A6FB',
    gradient: 'from-[#00A6FB] to-[#0088CC]',
    icon: 'HiLightBulb',
    features: [
      {
        id: 'consult-1',
        title: 'Strategic Planning',
        description: 'Develop comprehensive roadmaps aligned with your business objectives and user needs.',
        icon: 'HiChartBar'
      },
      {
        id: 'consult-2',
        title: 'User Research',
        description: 'Deep audience analysis to understand behaviors, motivations, and pain points.',
        icon: 'HiUsers'
      },
      {
        id: 'consult-3',
        title: 'Experience Architecture',
        description: 'Design seamless user journeys that engage, educate, and inspire action.',
        icon: 'HiCube'
      },
      {
        id: 'consult-4',
        title: 'Feasibility Analysis',
        description: 'Technical and budget assessments to ensure project viability and success.',
        icon: 'HiCheckCircle'
      }
    ],
    process: [
      {
        id: 'consult-step-1',
        order: 1,
        title: 'Discovery',
        description: 'Understand your vision, goals, target audience, and constraints.',
        duration: '1-2 weeks',
        deliverables: ['Stakeholder interviews', 'Market analysis', 'Audience personas']
      },
      {
        id: 'consult-step-2',
        order: 2,
        title: 'Research',
        description: 'Conduct in-depth user research and competitive analysis.',
        duration: '2-3 weeks',
        deliverables: ['User research report', 'Competitive landscape', 'Trend analysis']
      },
      {
        id: 'consult-step-3',
        order: 3,
        title: 'Strategy',
        description: 'Develop comprehensive experience strategy and roadmap.',
        duration: '2-4 weeks',
        deliverables: ['Strategic roadmap', 'User journey maps', 'Success metrics']
      },
      {
        id: 'consult-step-4',
        order: 4,
        title: 'Delivery',
        description: 'Present strategy with actionable recommendations and next steps.',
        duration: '1 week',
        deliverables: ['Strategy presentation', 'Implementation plan', 'Budget estimates']
      }
    ],
    benefits: [
      {
        id: 'consult-benefit-1',
        metric: 'Risk Reduction',
        value: '60%',
        description: 'Lower project risks through comprehensive planning'
      },
      {
        id: 'consult-benefit-2',
        metric: 'ROI Increase',
        value: '3x',
        description: 'Higher returns with strategic, data-driven decisions'
      },
      {
        id: 'consult-benefit-3',
        metric: 'Time Saved',
        value: '40%',
        description: 'Faster execution with clear roadmaps and priorities'
      }
    ],
    relatedServices: ['create', 'build'],
    cta: {
      title: 'Ready to Transform Your Vision?',
      description: 'Let&apos;s discuss how strategic consulting can unlock your project&apos;s full potential.',
      buttonText: 'Schedule Consultation',
      link: '/contact'
    }
  },
  {
    slug: 'create',
    name: 'Create',
    tagline: 'Creative Design & Content Production',
    description: 'Bring your brand to life with stunning visuals, immersive content, and memorable experiences.',
    longDescription:
      'Our creative team transforms concepts into captivating visual stories. From brand identity to interactive media, we craft designs that resonate emotionally and drive engagement across all touchpoints.',
    color: '#7C4DFF',
    gradient: 'from-[#7C4DFF] to-[#6A3DE8]',
    icon: 'HiColorSwatch',
    features: [
      {
        id: 'create-1',
        title: 'Brand Identity',
        description: 'Develop distinctive brand systems that stand out and create lasting impressions.',
        icon: 'HiSparkles'
      },
      {
        id: 'create-2',
        title: 'Interactive Media',
        description: 'Design engaging digital experiences with animations, videos, and interactive elements.',
        icon: 'HiPlay'
      },
      {
        id: 'create-3',
        title: '3D Visualization',
        description: 'Create photorealistic renders and immersive 3D environments for any space.',
        icon: 'HiCubeTransparent'
      },
      {
        id: 'create-4',
        title: 'Content Production',
        description: 'Produce high-quality multimedia content tailored for exhibitions and digital platforms.',
        icon: 'HiFilm'
      }
    ],
    process: [
      {
        id: 'create-step-1',
        order: 1,
        title: 'Concept',
        description: 'Brainstorm creative concepts aligned with your brand and objectives.',
        duration: '1-2 weeks',
        deliverables: ['Mood boards', 'Concept sketches', 'Style exploration']
      },
      {
        id: 'create-step-2',
        order: 2,
        title: 'Design',
        description: 'Develop detailed designs, animations, and visual assets.',
        duration: '3-6 weeks',
        deliverables: ['Design system', 'Asset library', 'Prototypes']
      },
      {
        id: 'create-step-3',
        order: 3,
        title: 'Production',
        description: 'Produce final content with high production quality standards.',
        duration: '4-8 weeks',
        deliverables: ['Final assets', 'Video content', '3D models']
      },
      {
        id: 'create-step-4',
        order: 4,
        title: 'Refinement',
        description: 'Iterate based on feedback to perfect every detail.',
        duration: '1-2 weeks',
        deliverables: ['Polished deliverables', 'Usage guidelines', 'Source files']
      }
    ],
    benefits: [
      {
        id: 'create-benefit-1',
        metric: 'Engagement',
        value: '+85%',
        description: 'Higher visitor engagement with compelling visuals'
      },
      {
        id: 'create-benefit-2',
        metric: 'Brand Recall',
        value: '2.5x',
        description: 'Stronger brand memorability through distinctive design'
      },
      {
        id: 'create-benefit-3',
        metric: 'Conversion',
        value: '+45%',
        description: 'Better conversion rates with persuasive content'
      }
    ],
    relatedServices: ['consult', 'build'],
    cta: {
      title: 'Bring Your Vision to Life',
      description: 'Let&apos;s create stunning experiences that captivate and inspire your audience.',
      buttonText: 'Start Creating',
      link: '/contact'
    }
  },
  {
    slug: 'build',
    name: 'Build',
    tagline: 'Technical Development & Integration',
    description: 'Engineer robust, scalable solutions that power exceptional digital and physical experiences.',
    longDescription:
      'Our technical experts build the infrastructure that brings experiences to life. From custom web applications to interactive installations, we develop reliable, high-performance systems that seamlessly integrate technology with design.',
    color: '#4A8E55',
    gradient: 'from-[#4A8E55] to-[#3D7847]',
    icon: 'HiCode',
    features: [
      {
        id: 'build-1',
        title: 'Web Development',
        description: 'Build responsive, performant websites and web applications with modern frameworks.',
        icon: 'HiDesktopComputer'
      },
      {
        id: 'build-2',
        title: 'Interactive Installations',
        description: 'Develop custom interactive exhibits with sensors, touchscreens, and IoT devices.',
        icon: 'HiLightningBolt'
      },
      {
        id: 'build-3',
        title: 'CMS Integration',
        description: 'Implement content management systems for easy updates and maintenance.',
        icon: 'HiDatabase'
      },
      {
        id: 'build-4',
        title: 'System Integration',
        description: 'Connect multiple platforms, APIs, and hardware for unified experiences.',
        icon: 'HiPuzzle'
      }
    ],
    process: [
      {
        id: 'build-step-1',
        order: 1,
        title: 'Architecture',
        description: 'Design technical architecture and select optimal technology stack.',
        duration: '1-2 weeks',
        deliverables: ['Technical spec', 'Architecture diagrams', 'Tech stack selection']
      },
      {
        id: 'build-step-2',
        order: 2,
        title: 'Development',
        description: 'Build core functionality with agile development practices.',
        duration: '6-12 weeks',
        deliverables: ['Working prototypes', 'Code repositories', 'API documentation']
      },
      {
        id: 'build-step-3',
        order: 3,
        title: 'Testing',
        description: 'Comprehensive quality assurance and performance optimization.',
        duration: '2-3 weeks',
        deliverables: ['Test reports', 'Performance metrics', 'Bug fixes']
      },
      {
        id: 'build-step-4',
        order: 4,
        title: 'Deployment',
        description: 'Launch with monitoring, documentation, and training.',
        duration: '1-2 weeks',
        deliverables: ['Production deployment', 'Documentation', 'Training materials']
      }
    ],
    benefits: [
      {
        id: 'build-benefit-1',
        metric: 'Uptime',
        value: '99.9%',
        description: 'Reliable systems with minimal downtime'
      },
      {
        id: 'build-benefit-2',
        metric: 'Performance',
        value: '3x',
        description: 'Faster load times and smoother interactions'
      },
      {
        id: 'build-benefit-3',
        metric: 'Scalability',
        value: '10x',
        description: 'Systems that grow with your needs'
      }
    ],
    relatedServices: ['create', 'amplify'],
    cta: {
      title: 'Build Something Extraordinary',
      description: 'Let&apos;s engineer technical solutions that power unforgettable experiences.',
      buttonText: 'Start Building',
      link: '/contact'
    }
  },
  {
    slug: 'amplify',
    name: 'Amplify',
    tagline: 'Marketing & Growth Strategies',
    description: 'Maximize your reach and impact with data-driven marketing and audience engagement.',
    longDescription:
      'We help you amplify your message and grow your audience through strategic marketing. Combining digital campaigns, content strategy, and analytics, we ensure your experiences reach the right people at the right time.',
    color: '#22D3EE',
    gradient: 'from-[#22D3EE] to-[#0EA5E9]',
    icon: 'HiSpeakerphone',
    features: [
      {
        id: 'amplify-1',
        title: 'Digital Marketing',
        description: 'Execute multi-channel campaigns that drive awareness and conversions.',
        icon: 'HiTrendingUp'
      },
      {
        id: 'amplify-2',
        title: 'Content Strategy',
        description: 'Develop content plans that engage audiences and build communities.',
        icon: 'HiDocumentText'
      },
      {
        id: 'amplify-3',
        title: 'Analytics & Insights',
        description: 'Track performance and optimize based on real-time data and user behavior.',
        icon: 'HiChartSquareBar'
      },
      {
        id: 'amplify-4',
        title: 'Social Media',
        description: 'Grow your presence and engage communities across social platforms.',
        icon: 'HiShare'
      }
    ],
    process: [
      {
        id: 'amplify-step-1',
        order: 1,
        title: 'Audit',
        description: 'Analyze current presence, audience, and market opportunities.',
        duration: '1 week',
        deliverables: ['Marketing audit', 'Competitor analysis', 'Audience insights']
      },
      {
        id: 'amplify-step-2',
        order: 2,
        title: 'Strategy',
        description: 'Develop comprehensive marketing and growth strategy.',
        duration: '2-3 weeks',
        deliverables: ['Marketing plan', 'Content calendar', 'Channel strategy']
      },
      {
        id: 'amplify-step-3',
        order: 3,
        title: 'Execution',
        description: 'Launch campaigns and content across selected channels.',
        duration: 'Ongoing',
        deliverables: ['Campaign launches', 'Content creation', 'Ad management']
      },
      {
        id: 'amplify-step-4',
        order: 4,
        title: 'Optimization',
        description: 'Monitor performance and continuously improve results.',
        duration: 'Ongoing',
        deliverables: ['Analytics reports', 'A/B testing', 'Strategy refinement']
      }
    ],
    benefits: [
      {
        id: 'amplify-benefit-1',
        metric: 'Reach',
        value: '+200%',
        description: 'Expanded audience reach through strategic campaigns'
      },
      {
        id: 'amplify-benefit-2',
        metric: 'Engagement',
        value: '+150%',
        description: 'Higher engagement with targeted content'
      },
      {
        id: 'amplify-benefit-3',
        metric: 'Leads',
        value: '+120%',
        description: 'More qualified leads and conversions'
      }
    ],
    relatedServices: ['consult', 'create'],
    cta: {
      title: 'Amplify Your Impact',
      description: 'Let&apos;s grow your audience and maximize the reach of your experiences.',
      buttonText: 'Grow Your Reach',
      link: '/contact'
    }
  }
];

export const getServiceBySlug = (slug: string): ServiceDetail | undefined => {
  return services.find((service) => service.slug === slug);
};

export const getRelatedServices = (currentSlug: string): ServiceDetail[] => {
  const currentService = getServiceBySlug(currentSlug);
  if (!currentService) return [];

  return services.filter((service) =>
    currentService.relatedServices.includes(service.slug)
  );
};
