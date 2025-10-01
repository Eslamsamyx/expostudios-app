'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import AnimatedSection from '../shared/AnimatedSection';
import SectionHeader from '../shared/SectionHeader';

const industries = [
  {
    key: 'exhibitions',
    gradient: 'from-blue-400 to-cyan-500',
  },
  {
    key: 'museums',
    gradient: 'from-purple-400 to-pink-500',
  },
  {
    key: 'retail',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    key: 'corporate',
    gradient: 'from-red-400 to-pink-500',
  },
  {
    key: 'government',
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    key: 'education',
    gradient: 'from-indigo-400 to-purple-500',
  },
  {
    key: 'hospitality',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    key: 'cultural',
    gradient: 'from-slate-400 to-gray-500',
  },
];

export default function Industries() {
  const t = useTranslations('services.industries');

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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
              className="group relative"
            >
              <div className="relative h-full p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10 text-center">

                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative">
                  {/* Gradient accent line */}
                  <div className={`w-12 h-1 mx-auto mb-6 rounded-full bg-gradient-to-r ${industry.gradient} opacity-40 group-hover:opacity-100 group-hover:w-16 transition-all duration-500`} />

                  {/* Title */}
                  <h3 className="text-lg lg:text-xl font-bold text-white leading-tight group-hover:text-white transition-colors duration-300">
                    {t(`items.${industry.key}`)}
                  </h3>
                </div>

                {/* Bottom gradient line */}
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${industry.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
