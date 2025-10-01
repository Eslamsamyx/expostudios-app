import { PrismaClient, ArticleStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const sampleArticles = [
  {
    slug: 'future-of-exhibition-design',
    title: 'The Future of Exhibition Design: Immersive Experiences',
    excerpt: 'Exploring how technology is reshaping the way we create and experience exhibitions in 2024 and beyond.',
    content: `<h2>Introduction</h2>
<p>The world of exhibition design is undergoing a remarkable transformation. As we move deeper into the digital age, the boundaries between physical and digital experiences continue to blur, creating unprecedented opportunities for engagement.</p>

<h2>The Rise of Immersive Technology</h2>
<p>Virtual reality, augmented reality, and mixed reality are no longer just buzzwords—they're powerful tools that are reshaping how visitors interact with exhibitions. From holographic displays to interactive projections, technology is enabling creators to craft experiences that were once impossible.</p>

<h2>Data-Driven Design</h2>
<p>Modern exhibition design isn't just about aesthetics; it's about understanding visitor behavior through data. By analyzing how people move through spaces, what captures their attention, and how long they engage with different elements, we can create more effective and impactful exhibitions.</p>

<h2>Sustainability Matters</h2>
<p>The future of exhibition design must also be sustainable. We're seeing a shift towards reusable materials, modular designs, and digital alternatives that reduce waste while maintaining impact.</p>

<h2>Conclusion</h2>
<p>As we look ahead, the future of exhibition design is bright. By embracing new technologies, prioritizing visitor engagement, and committing to sustainability, we can create experiences that inspire, educate, and transform.</p>`,
    coverImage: '/images/articles/article-1.jpg',
    metaTitle: 'The Future of Exhibition Design - ExpoStudios',
    metaDescription: 'Discover how immersive technology and data-driven insights are transforming exhibition design.',
    keywords: ['exhibition design', 'immersive experiences', 'VR', 'AR', 'technology'],
    category: 'Design',
    tags: ['exhibitions', 'technology', 'future', 'immersive', 'innovation'],
    status: ArticleStatus.PUBLISHED,
    publishedAt: new Date('2024-01-15'),
    featuredAt: new Date('2024-01-15'),
  },
  {
    slug: 'creating-memorable-brand-experiences',
    title: 'Creating Memorable Brand Experiences at Trade Shows',
    excerpt: 'Learn the key strategies for making your brand stand out at trade shows and exhibitions.',
    content: `<h2>The Challenge of Standing Out</h2>
<p>In a crowded exhibition hall with hundreds of booths competing for attention, creating a memorable brand experience is more crucial—and more challenging—than ever.</p>

<h2>Key Strategies for Success</h2>
<p>1. <strong>Interactive Elements:</strong> Give visitors something to do, not just see. Hands-on experiences create lasting memories.</p>
<p>2. <strong>Storytelling:</strong> Every brand has a story. Use your space to tell it in a compelling way.</p>
<p>3. <strong>Multi-Sensory Engagement:</strong> Don't just rely on visuals. Incorporate sound, texture, and even scent to create a holistic experience.</p>

<h2>The Power of Technology</h2>
<p>Digital touchscreens, virtual product demonstrations, and AR experiences can transform a simple booth into an unforgettable destination.</p>

<h2>Follow-Up is Everything</h2>
<p>The experience shouldn't end when the visitor leaves your booth. Effective follow-up strategies are essential for converting interest into action.</p>`,
    coverImage: '/images/articles/article-2.jpg',
    metaTitle: 'Creating Memorable Brand Experiences - ExpoStudios',
    metaDescription: 'Master the art of creating unforgettable brand experiences at trade shows and exhibitions.',
    keywords: ['brand experience', 'trade shows', 'exhibitions', 'marketing'],
    category: 'Marketing',
    tags: ['branding', 'tradeshows', 'marketing', 'engagement'],
    status: ArticleStatus.PUBLISHED,
    publishedAt: new Date('2024-02-01'),
  },
  {
    slug: 'digital-transformation-museums',
    title: 'Digital Transformation in Museums: A New Era',
    excerpt: 'How museums are embracing digital technology to enhance visitor experiences and preserve cultural heritage.',
    content: `<h2>Museums in the Digital Age</h2>
<p>Museums worldwide are undergoing a digital renaissance, leveraging technology to make art and culture more accessible than ever before.</p>

<h2>Virtual Tours and Online Collections</h2>
<p>The pandemic accelerated the adoption of virtual museum experiences. Now, anyone with an internet connection can explore world-class collections from their home.</p>

<h2>Interactive Exhibits</h2>
<p>Touch screens, motion sensors, and AR applications are transforming passive viewing into active participation. Visitors can now interact with artifacts, zoom in on details, and access contextual information instantly.</p>

<h2>Digital Preservation</h2>
<p>3D scanning and high-resolution photography are ensuring that cultural heritage is preserved for future generations, even as physical artifacts age.</p>

<h2>The Human Touch</h2>
<p>While technology enhances the museum experience, the human element remains irreplaceable. The future lies in finding the perfect balance between digital innovation and personal connection.</p>`,
    coverImage: '/images/articles/article-3.jpg',
    metaTitle: 'Digital Transformation in Museums - ExpoStudios',
    metaDescription: 'Explore how digital technology is revolutionizing the museum experience.',
    keywords: ['museums', 'digital transformation', 'cultural heritage', 'AR'],
    category: 'Technology',
    tags: ['museums', 'digital', 'culture', 'innovation', 'heritage'],
    status: ArticleStatus.PUBLISHED,
    publishedAt: new Date('2024-02-15'),
    featuredAt: new Date('2024-02-15'),
  },
  {
    slug: 'sustainable-event-design',
    title: 'Sustainable Event Design: Green Practices for Modern Exhibitions',
    excerpt: 'Implementing eco-friendly practices in event and exhibition design without compromising on impact.',
    content: `<h2>The Imperative of Sustainability</h2>
<p>As climate concerns grow, the events industry faces increasing pressure to reduce its environmental footprint. Sustainable event design is no longer optional—it's essential.</p>

<h2>Material Choices Matter</h2>
<p>From recycled aluminum frames to biodegradable graphics, the materials we choose have a significant impact. Modular, reusable components can serve multiple events, dramatically reducing waste.</p>

<h2>Digital Alternatives</h2>
<p>Digital brochures, QR codes for information sharing, and virtual elements can reduce paper waste and shipping requirements.</p>

<h2>Energy Efficiency</h2>
<p>LED lighting, solar power options, and smart energy management systems can significantly reduce an event's carbon footprint.</p>

<h2>Measuring Impact</h2>
<p>What gets measured gets managed. Tracking sustainability metrics helps us understand our impact and identify areas for improvement.</p>

<h2>The Business Case</h2>
<p>Sustainable practices aren't just good for the planet—they're increasingly important to clients and attendees who value environmental responsibility.</p>`,
    coverImage: '/images/articles/article-4.jpg',
    metaTitle: 'Sustainable Event Design - ExpoStudios',
    metaDescription: 'Learn how to implement eco-friendly practices in modern exhibition design.',
    keywords: ['sustainability', 'event design', 'green practices', 'eco-friendly'],
    category: 'Sustainability',
    tags: ['sustainability', 'events', 'green', 'environment', 'design'],
    status: ArticleStatus.PUBLISHED,
    publishedAt: new Date('2024-03-01'),
  },
  {
    slug: 'psychology-of-exhibition-spaces',
    title: 'The Psychology of Exhibition Spaces: Designing for Human Behavior',
    excerpt: 'Understanding how spatial design influences visitor behavior and engagement in exhibition environments.',
    content: `<h2>Understanding Visitor Psychology</h2>
<p>Great exhibition design isn't just about aesthetics—it's about understanding human psychology and behavior.</p>

<h2>The Power of Flow</h2>
<p>How visitors move through a space is crucial. Clear pathways, strategic placement of key elements, and intuitive navigation all contribute to a positive experience.</p>

<h2>Color Psychology</h2>
<p>Colors evoke emotions and influence behavior. Warm colors can energize and excite, while cool colors can calm and focus attention.</p>

<h2>Height and Perspective</h2>
<p>Varying heights and viewing angles keep visitors engaged and create moments of discovery. Surprise elements can make the experience more memorable.</p>

<h2>Social Dynamics</h2>
<p>Spaces should accommodate both social interaction and moments of individual contemplation. Understanding group dynamics helps create inclusive environments.</p>

<h2>Sensory Considerations</h2>
<p>Lighting, acoustics, and even air quality affect how visitors feel and how long they stay. A holistic approach to sensory design is essential.</p>`,
    coverImage: '/images/articles/article-5.jpg',
    metaTitle: 'Psychology of Exhibition Spaces - ExpoStudios',
    metaDescription: 'Discover how understanding human psychology can transform exhibition design.',
    keywords: ['psychology', 'exhibition design', 'visitor behavior', 'spatial design'],
    category: 'Design',
    tags: ['psychology', 'design', 'behavior', 'experience', 'visitors'],
    status: ArticleStatus.PUBLISHED,
    publishedAt: new Date('2024-03-15'),
    featuredAt: new Date('2024-03-15'),
  },
  {
    slug: '5g-impact-on-live-events',
    title: '5G Technology: Transforming Live Events and Exhibitions',
    excerpt: 'How ultra-fast 5G networks are enabling new possibilities for interactive and immersive event experiences.',
    content: `<h2>The 5G Revolution</h2>
<p>5G technology is more than just faster downloads—it's a fundamental shift that's opening up new possibilities for live events and exhibitions.</p>

<h2>Real-Time Interactivity</h2>
<p>With ultra-low latency, 5G enables truly real-time interactions. AR experiences can respond instantly, and multi-user applications become seamlessly synchronized.</p>

<h2>Enhanced Streaming</h2>
<p>High-quality video streaming to thousands of devices simultaneously is now possible, enabling hybrid events and remote participation at unprecedented scale.</p>

<h2>IoT Integration</h2>
<p>5G supports a massive number of connected devices, allowing for sophisticated sensor networks and smart exhibition spaces that respond to visitor behavior.</p>

<h2>Spatial Computing</h2>
<p>Combined with AR and VR, 5G enables persistent spatial experiences that can transform how we interact with physical spaces.</p>

<h2>Looking Ahead</h2>
<p>As 5G deployment expands, we're only beginning to see its potential impact on the events industry. The next few years will bring innovations we're only starting to imagine.</p>`,
    coverImage: 'https://placehold.co/1200x600/7C4DFF/FFFFFF?text=5G+Technology',
    metaTitle: '5G Technology in Live Events - ExpoStudios',
    metaDescription: 'Explore how 5G is revolutionizing live events and exhibition experiences.',
    keywords: ['5G', 'technology', 'live events', 'exhibitions', 'connectivity'],
    category: 'Technology',
    tags: ['5G', 'technology', 'innovation', 'events', 'connectivity'],
    status: ArticleStatus.PUBLISHED,
    publishedAt: new Date('2024-04-01'),
  },
];

async function main() {
  console.log('🌱 Seeding articles...');

  // First, ensure we have a user to be the author
  const hashedPassword = await bcrypt.hash('password123', 10);

  const author = await prisma.user.upsert({
    where: { email: 'editor@expostudios.com' },
    update: {},
    create: {
      email: 'editor@expostudios.com',
      password: hashedPassword,
      name: 'ExpoStudios Editorial Team',
      role: 'WRITER',
      isActive: true,
      emailVerified: true,
      bio: 'The ExpoStudios editorial team brings together experts in exhibition design, technology, and user experience to share insights and best practices.',
    },
  });

  console.log(`✅ Author created/found: ${author.email}`);

  // Delete existing articles to avoid duplicates
  await prisma.article.deleteMany({
    where: {
      slug: {
        in: sampleArticles.map((a) => a.slug),
      },
    },
  });

  console.log('🗑️  Cleared existing sample articles');

  // Create articles
  for (const articleData of sampleArticles) {
    const article = await prisma.article.create({
      data: {
        ...articleData,
        authorId: author.id,
      },
    });

    console.log(`✅ Created article: ${article.title}`);
  }

  console.log('🎉 Seeding completed successfully!');
  console.log(`📊 Created ${sampleArticles.length} articles`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
