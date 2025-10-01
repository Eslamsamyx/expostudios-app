import { Project, Technology } from '../types/portfolio';

export const technologies: Technology[] = [
  // Frontend
  { id: 'react', name: 'React', category: 'frontend' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend' },
  { id: 'threejs', name: 'Three.js', category: 'frontend' },
  { id: 'unity', name: 'Unity', category: 'frontend' },
  { id: 'webgl', name: 'WebGL', category: 'frontend' },

  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'backend' },
  { id: 'python', name: 'Python', category: 'backend' },
  { id: 'cms', name: 'CMS', category: 'backend' },

  // Infrastructure
  { id: 'aws', name: 'AWS', category: 'infrastructure' },
  { id: 'azure', name: 'Azure', category: 'infrastructure' },

  // Design
  { id: 'blender', name: 'Blender', category: 'design' },
  { id: 'cinema4d', name: 'Cinema 4D', category: 'design' },
  { id: 'aftereffects', name: 'After Effects', category: 'design' },

  // Hardware
  { id: 'touchscreens', name: 'Interactive Touchscreens', category: 'hardware' },
  { id: 'sensors', name: 'Motion Sensors', category: 'hardware' },
  { id: 'projection', name: 'Projection Mapping', category: 'hardware' },
  { id: 'vr', name: 'VR Headsets', category: 'hardware' },
  { id: 'led', name: 'LED Displays', category: 'hardware' },
];

export const projects: Project[] = [
  {
    id: 'proj-1',
    slug: 'future-vision-2030',
    title: 'Future Vision 2030',
    subtitle: 'Interactive National Strategy Exhibition',
    description: 'A groundbreaking interactive exhibition showcasing national transformation initiatives through immersive storytelling and cutting-edge technology.',
    client: 'Government Strategic Office',
    industry: 'government',
    services: ['consult', 'create', 'build'],
    technologies: [
      technologies.find((t) => t.id === 'unity')!,
      technologies.find((t) => t.id === 'touchscreens')!,
      technologies.find((t) => t.id === 'projection')!,
      technologies.find((t) => t.id === 'cinema4d')!,
      technologies.find((t) => t.id === 'nodejs')!,
    ],
    images: [
      {
        id: 'img-1',
        url: '/images/portfolio/future-vision-2030.jpg',
        alt: 'Future Vision 2030 Exhibition Hall',
        featured: true
      },
      {
        id: 'img-2',
        url: '/images/portfolio/future-vision-2030.jpg',
        alt: 'Interactive Data Visualization Wall'
      },
      {
        id: 'img-3',
        url: '/images/portfolio/future-vision-2030.jpg',
        alt: 'Holographic Presentation'
      }
    ],
    thumbnail: '/images/portfolio/future-vision-2030.jpg',
    featured: true,
    year: 2024,
    duration: '8 months',
    challenge:
      'The client needed to communicate complex national strategies to diverse audiences—from policymakers to general public—in an engaging, accessible way. Traditional presentation methods failed to capture the vision&apos;s transformative scope.',
    solution:
      'We created a 2,000 sqm interactive exhibition featuring projection mapping, touch-responsive data walls, and immersive AR experiences. Custom CMS allowed real-time content updates, while multilingual support ensured accessibility.',
    results: [
      { label: 'Visitors', value: '500K+', description: 'in first 6 months' },
      { label: 'Engagement Time', value: '45 min', description: 'average visit duration' },
      { label: 'Satisfaction', value: '96%', description: 'visitor satisfaction rating' },
      { label: 'Media Coverage', value: '200+', description: 'international publications' }
    ],
    testimonial: {
      quote: 'ExpoStudios transformed our vision into a tangible, inspiring experience. The exhibition became a landmark destination, exceeding all expectations.',
      author: 'Dr. Ahmed Al-Mansouri',
      role: 'Director of Strategic Communications',
      company: 'Government Strategic Office'
    },
    links: {
      case_study: '/portfolio/future-vision-2030'
    }
  },
  {
    id: 'proj-2',
    slug: 'quantum-science-center',
    title: 'Quantum Science Center',
    subtitle: 'Next-Generation Science Museum Experience',
    description: 'An innovative science center making quantum physics accessible through interactive exhibits and gamified learning experiences.',
    client: 'National Science Foundation',
    industry: 'museums',
    services: ['consult', 'create', 'build'],
    technologies: [
      technologies.find((t) => t.id === 'unity')!,
      technologies.find((t) => t.id === 'vr')!,
      technologies.find((t) => t.id === 'touchscreens')!,
      technologies.find((t) => t.id === 'sensors')!,
      technologies.find((t) => t.id === 'blender')!,
    ],
    images: [
      {
        id: 'img-1',
        url: '/images/portfolio/quantum-science.jpg',
        alt: 'Quantum Science Center Main Hall',
        featured: true
      }
    ],
    thumbnail: '/images/portfolio/quantum-science.jpg',
    featured: true,
    year: 2024,
    duration: '10 months',
    challenge:
      'Quantum physics concepts are notoriously difficult to visualize and understand. The center needed to make these abstract ideas tangible for visitors aged 8-80.',
    solution:
      'We designed 15 interactive stations using VR, motion sensors, and real-time simulations. Gamification elements encouraged exploration, while adaptive difficulty ensured age-appropriate learning paths.',
    results: [
      { label: 'Learning Retention', value: '+78%', description: 'compared to traditional methods' },
      { label: 'Return Visitors', value: '43%', description: 'within 3 months' },
      { label: 'School Bookings', value: '1,200+', description: 'in first year' }
    ]
  },
  {
    id: 'proj-3',
    slug: 'luxury-auto-showroom',
    title: 'Luxury Auto Showroom',
    subtitle: 'Digital Experience Center',
    description: 'A revolutionary car showroom blending physical vehicles with digital configurators and immersive brand storytelling.',
    client: 'Premium Automotive Group',
    industry: 'retail',
    services: ['create', 'build', 'amplify'],
    technologies: [
      technologies.find((t) => t.id === 'nextjs')!,
      technologies.find((t) => t.id === 'threejs')!,
      technologies.find((t) => t.id === 'led')!,
      technologies.find((t) => t.id === 'touchscreens')!,
      technologies.find((t) => t.id === 'cms')!,
    ],
    images: [
      {
        id: 'img-1',
        url: '/images/portfolio/auto-showroom.jpg',
        alt: 'Luxury Auto Showroom',
        featured: true
      }
    ],
    thumbnail: '/images/portfolio/auto-showroom.jpg',
    year: 2023,
    duration: '6 months',
    challenge:
      'Traditional showrooms couldn&apos;t stock every vehicle configuration. Customers wanted to visualize custom options in real-time before ordering.',
    solution:
      'We built a 3D vehicle configurator with photorealistic rendering, displayed on 8K LED walls. Customers could customize everything from paint color to interior trim and see results instantly.',
    results: [
      { label: 'Sales Increase', value: '+65%', description: 'year-over-year' },
      { label: 'Configuration Time', value: '-40%', description: 'faster than traditional process' },
      { label: 'Customer Satisfaction', value: '4.9/5', description: 'average rating' }
    ],
    testimonial: {
      quote: 'Our showroom became a destination. Customers spend hours exploring configurations, and our conversion rate has never been higher.',
      author: 'Marcus Schmidt',
      role: 'Retail Experience Director',
      company: 'Premium Automotive Group'
    }
  },
  {
    id: 'proj-4',
    slug: 'innovation-hub-website',
    title: 'Innovation Hub Website',
    subtitle: 'Digital Platform for Tech Ecosystem',
    description: 'A comprehensive digital platform connecting startups, investors, and mentors in a thriving innovation ecosystem.',
    client: 'City Innovation Authority',
    industry: 'corporate',
    services: ['consult', 'create', 'build', 'amplify'],
    technologies: [
      technologies.find((t) => t.id === 'nextjs')!,
      technologies.find((t) => t.id === 'react')!,
      technologies.find((t) => t.id === 'nodejs')!,
      technologies.find((t) => t.id === 'aws')!,
      technologies.find((t) => t.id === 'cms')!,
    ],
    images: [
      {
        id: 'img-1',
        url: '/images/portfolio/innovation-hub.jpg',
        alt: 'Innovation Hub Website',
        featured: true
      }
    ],
    thumbnail: '/images/portfolio/innovation-hub.jpg',
    year: 2024,
    duration: '5 months',
    challenge:
      'The city&apos;s innovation ecosystem was fragmented. Startups struggled to find resources, investors couldn&apos;t discover opportunities, and the community lacked a central hub.',
    solution:
      'We developed a modern web platform with startup directory, event management, resource library, and matchmaking algorithms. Marketing campaigns drove adoption across the ecosystem.',
    results: [
      { label: 'Registered Startups', value: '850+', description: 'in first 3 months' },
      { label: 'Connections Made', value: '2,400+', description: 'startup-investor matches' },
      { label: 'Platform Traffic', value: '120K', description: 'monthly active users' }
    ]
  },
  {
    id: 'proj-5',
    slug: 'heritage-center',
    title: 'Cultural Heritage Center',
    subtitle: 'Preserving History Through Technology',
    description: 'An immersive cultural center bringing centuries of heritage to life through AR, projection mapping, and interactive storytelling.',
    client: 'Ministry of Culture',
    industry: 'museums',
    services: ['consult', 'create', 'build'],
    technologies: [
      technologies.find((t) => t.id === 'unity')!,
      technologies.find((t) => t.id === 'projection')!,
      technologies.find((t) => t.id === 'touchscreens')!,
      technologies.find((t) => t.id === 'blender')!,
      technologies.find((t) => t.id === 'python')!,
    ],
    images: [
      {
        id: 'img-1',
        url: '/images/portfolio/heritage-center.jpg',
        alt: 'Cultural Heritage Center',
        featured: true
      }
    ],
    thumbnail: '/images/portfolio/heritage-center.jpg',
    featured: true,
    year: 2023,
    duration: '12 months',
    challenge:
      'Ancient artifacts and historical sites are fragile and inaccessible. The ministry wanted to preserve and share cultural heritage without risking damage to originals.',
    solution:
      'We created high-fidelity 3D scans of artifacts, developed AR experiences for virtual exploration, and designed projection-mapped environments recreating historical moments.',
    results: [
      { label: 'Artifacts Digitized', value: '500+', description: 'in permanent collection' },
      { label: 'International Visitors', value: '65%', description: 'of total attendance' },
      { label: 'Educational Impact', value: '95%', description: 'teachers recommend visit' }
    ]
  },
  {
    id: 'proj-6',
    slug: 'smart-city-expo',
    title: 'Smart City Expo',
    subtitle: 'Trade Show Experience Design',
    description: 'A cutting-edge exhibition booth showcasing smart city solutions through interactive demonstrations and live data visualization.',
    client: 'Urban Technologies Inc.',
    industry: 'exhibitions',
    services: ['create', 'build'],
    technologies: [
      technologies.find((t) => t.id === 'react')!,
      technologies.find((t) => t.id === 'webgl')!,
      technologies.find((t) => t.id === 'led')!,
      technologies.find((t) => t.id === 'sensors')!,
      technologies.find((t) => t.id === 'nodejs')!,
    ],
    images: [
      {
        id: 'img-1',
        url: '/images/portfolio/smart-city.jpg',
        alt: 'Smart City Expo Booth',
        featured: true
      }
    ],
    thumbnail: '/images/portfolio/smart-city.jpg',
    year: 2024,
    duration: '3 months',
    challenge:
      'At crowded trade shows, booths blend together. The client needed to stand out and effectively communicate complex IoT solutions.',
    solution:
      'We designed a 120 sqm booth with live city data feeds, interactive traffic simulations, and sensor-driven demos showing real-time smart city technologies in action.',
    results: [
      { label: 'Booth Traffic', value: '#1', description: 'most visited at expo' },
      { label: 'Qualified Leads', value: '340+', description: 'high-intent prospects' },
      { label: 'Media Mentions', value: '45+', description: 'trade publications' }
    ]
  }
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((project) => project.slug === slug);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter((project) => project.featured);
};

export const getProjectsByService = (service: string): Project[] => {
  return projects.filter((project) => project.services.includes(service as Project['services'][number]));
};

export const getProjectsByIndustry = (industry: string): Project[] => {
  return projects.filter((project) => project.industry === industry);
};
