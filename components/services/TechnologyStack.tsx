'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import AnimatedSection from '../shared/AnimatedSection';
import SectionHeader from '../shared/SectionHeader';

const technologies = [
  {
    category: 'design',
    gradient: 'from-blue-400 to-cyan-500',
    items: ['3ds Max', 'Rhino', 'SketchUp', 'V-Ray', 'Cinema 4D', 'AutoCAD'],
  },
  {
    category: 'fabrication',
    gradient: 'from-emerald-400 to-teal-500',
    items: ['Photoshop', 'Illustrator', 'InDesign', 'Figma', 'Canva', 'Brand Systems'],
  },
  {
    category: 'interactive',
    gradient: 'from-purple-400 to-pink-500',
    items: ['Unity', 'Unreal Engine', 'TouchDesigner', 'React', 'Next.js', 'WordPress'],
  },
  {
    category: 'installation',
    gradient: 'from-orange-400 to-red-500',
    items: ['After Effects', 'Premiere', 'PowerPoint', 'Keynote', 'Video Production', 'Motion Graphics'],
  },
];

export default function TechnologyStack() {
  const t = useTranslations('services.technologies');

  return (
    <section className="py-32 px-4 md:px-8 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <AnimatedSection className="mb-20">
          <SectionHeader
            title={t('title')}
            subtitle={t('subtitle')}
            centered
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
              className="group relative"
            >
              <div className="relative h-full p-8 lg:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10">

                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative">
                  {/* Category Title with gradient accent */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${tech.gradient}`} />
                    <h3 className="text-2xl lg:text-3xl font-bold text-white">
                      {t(`categories.${tech.category}`)}
                    </h3>
                  </div>

                  {/* Tools Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {tech.items.map((item, itemIndex) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.08 + itemIndex * 0.05,
                          ease: [0.21, 0.47, 0.32, 0.98]
                        }}
                        className="px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/70 hover:bg-white/[0.06] hover:border-white/10 hover:text-white transition-all duration-300 text-sm font-medium text-center"
                      >
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom gradient line */}
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${tech.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
