import { AboutPageData } from '../types/about';

export const aboutData: AboutPageData = {
  hero: {
    title: 'Crafting Tomorrow\'s Experiences',
    subtitle: '360° design studio for physical spaces, digital experiences, and brand assets',
    mission:
      'We transform visions into reality through innovative digital and physical experiences that captivate, engage, and inspire.',
  },

  story: {
    title: 'Our Journey',
    content: [
      'Founded in 2020, ExpoStudios emerged from a simple belief: experiences should be felt, not just seen.',
      'What started as a small team of designers and developers has grown into a multidisciplinary powerhouse, delivering world-class exhibitions, experience centers, and interactive installations across the globe.',
      'Today, we serve clients across 25+ countries, delivering experiences that bridge digital innovation and physical presence. Our work has been recognized with international awards and has transformed how organizations connect with their audiences.',
    ],
    founded: '2020',
    founders: ['Hesham Nasrallah', 'Eslam Samy'],
    images: [
      '/images/timeline/placeholder.jpg',
      '/images/about/office-2.jpg',
    ],
  },

  values: [
    {
      id: 'innovation',
      title: 'Innovation First',
      description:
        'We push boundaries and embrace emerging technologies to create groundbreaking experiences.',
      icon: 'HiLightBulb',
      color: '#7C4DFF',
      details: [
        'Continuous R&D investment',
        'Early adoption of emerging tech',
        'Patent-pending solutions',
      ],
    },
    {
      id: 'collaboration',
      title: 'Collaborative Spirit',
      description:
        'Success is a team sport. We work closely with clients as true partners.',
      icon: 'HiUsers',
      color: '#00A6FB',
      details: [
        'Transparent communication',
        'Client workshops',
        'Agile methodologies',
      ],
    },
    {
      id: 'excellence',
      title: 'Uncompromising Quality',
      description:
        'Every detail matters. We deliver excellence in every pixel and interaction.',
      icon: 'HiBadgeCheck',
      color: '#4A8E55',
      details: [
        'Rigorous QA processes',
        'User testing protocols',
        'Continuous optimization',
      ],
    },
    {
      id: 'impact',
      title: 'Measurable Impact',
      description:
        'Beautiful isn\'t enough. We create experiences that drive real business results.',
      icon: 'HiTrendingUp',
      color: '#22D3EE',
      details: [
        'Data-driven decisions',
        'ROI tracking',
        'Performance analytics',
      ],
    },
  ],

  team: [
    {
      id: 'hesham-nasrallah',
      name: 'Hesham Nasrallah',
      role: 'Co-Founder & CEO',
      department: 'consult',
      bio: 'Digital transformation expert driving experiential innovation.',
      extendedBio:
        'Hesham specializes in digital transformation strategies that bridge traditional experiences with cutting-edge technology. His expertise in transforming organizations through immersive digital solutions has positioned ExpoStudios at the forefront of experiential design.',
      expertise: ['Digital Transformation', 'Strategic Leadership', 'Innovation Strategy'],
      joinedYear: 2020,
    },
    {
      id: 'eslam-samy',
      name: 'Eslam Samy',
      role: 'Co-Founder & COO',
      department: 'build',
      bio: 'Operations and technology leader specializing in AI integration.',
      extendedBio:
        'Eslam leads operational excellence while pioneering AI and technology integrations into experiential projects. His expertise in project management combined with deep technical knowledge in AI ensures seamless execution of complex, tech-driven installations.',
      expertise: ['Operations Management', 'AI Integration', 'Technology Implementation'],
      joinedYear: 2020,
    },
  ],

  whyChooseUs: [
    {
      id: 'end-to-end',
      title: 'End-to-End Expertise',
      description:
        'From strategy to execution, we handle every aspect of your experience.',
      icon: 'HiViewGrid',
      color: '#00A6FB',
      benefits: [
        'Single point of contact',
        'Seamless workflow',
        'Consistent quality',
      ],
    },
    {
      id: 'proven-results',
      title: 'Proven Track Record',
      description:
        '200+ successful projects across exhibitions, museums, and corporate spaces.',
      icon: 'HiCheckCircle',
      color: '#22D3EE',
      benefits: [
        'Award-winning work',
        'Client retention >90%',
        'Industry recognition',
      ],
    },
    {
      id: 'cutting-edge',
      title: 'Cutting-Edge Technology',
      description:
        'We leverage the latest in AR, VR, AI, and interactive technology.',
      icon: 'HiChip',
      color: '#4A8E55',
      benefits: [
        'Unity & Unreal expertise',
        'Custom integrations',
        'Future-proof solutions',
      ],
    },
  ],

  stats: [
    {
      value: 200,
      label: 'Projects Completed',
      suffix: '+',
      color: '#00A6FB',
    },
    {
      value: 150,
      label: 'Happy Clients',
      suffix: '+',
      color: '#7C4DFF',
    },
    {
      value: 25,
      label: 'Countries Served',
      suffix: '+',
      color: '#4A8E55',
    },
    {
      value: 5,
      label: 'Years Experience',
      suffix: '+',
      color: '#22D3EE',
    },
  ],

  timeline: [
    {
      year: 2020,
      month: 'March',
      title: 'ExpoStudios Founded',
      description: 'Hesham Nasrallah and Eslam Samy launch ExpoStudios with a vision.',
      category: 'company',
      image: '/images/timeline/placeholder.jpg',
      metrics: [{ label: 'Team Size', value: '3' }],
    },
    {
      year: 2021,
      month: 'June',
      title: 'First International Project',
      description:
        'Expanded to European market with landmark museum installation.',
      category: 'product',
      image: '/images/about/office-2.jpg',
      metrics: [
        { label: 'Projects', value: '15' },
        { label: 'Team Size', value: '8' },
      ],
    },
    {
      year: 2022,
      month: 'November',
      title: 'Innovation Lab Launch',
      description:
        'Opened R&D facility for interactive technology development.',
      category: 'achievement',
      image: '/images/about/office-1.jpg',
    },
    {
      year: 2023,
      month: 'January',
      title: '100th Project Milestone',
      description:
        'Celebrated centennial project with flagship experience center.',
      category: 'achievement',
      metrics: [
        { label: 'Projects', value: '100' },
        { label: 'Team Size', value: '35' },
      ],
    },
    {
      year: 2024,
      title: 'Global Leader',
      description:
        'Recognized as industry leader in experiential design.',
      category: 'company',
      metrics: [
        { label: 'Projects', value: '200+' },
        { label: 'Team Size', value: '50+' },
        { label: 'Countries', value: '25+' },
      ],
    },
  ],

  culture: [
    {
      title: 'Collaborative On-Site Environment',
      description:
        'Work together in our studio space, fostering creativity and seamless collaboration.',
      image: '/images/about/office-2.jpg',
    },
    {
      title: 'Continuous Learning',
      description:
        'Annual learning budget, conference attendance, and skill development programs.',
      image: '/images/about/office-2.jpg',
    },
    {
      title: 'Inclusive Environment',
      description:
        'Diverse team representing 15 nationalities and multiple disciplines.',
      image: '/images/timeline/placeholder.jpg',
    },
  ],

  methodology: [
    {
      step: 1,
      title: 'Discovery & Research',
      description: 'Deep dive into your brand, audience, and objectives.',
      color: '#00A6FB',
      practices: [
        'Stakeholder interviews',
        'Competitive analysis',
        'User research',
        'Requirements gathering',
      ],
    },
    {
      step: 2,
      title: 'Concept & Design',
      description: 'Transform insights into compelling creative concepts.',
      color: '#7C4DFF',
      practices: [
        'Conceptual ideation',
        '3D visualization',
        'Storyboarding',
        'Client presentations',
      ],
    },
    {
      step: 3,
      title: 'Development & Build',
      description: 'Engineer and fabricate your experience with precision.',
      color: '#4A8E55',
      practices: [
        'Technical development',
        'AV integration',
        'Quality assurance',
        'On-site installation',
      ],
    },
    {
      step: 4,
      title: 'Launch & Optimize',
      description:
        'Activate your experience and continuously improve performance.',
      color: '#22D3EE',
      practices: [
        'Launch coordination',
        'Performance monitoring',
        'User feedback analysis',
        'Ongoing optimization',
      ],
    },
  ],
};
