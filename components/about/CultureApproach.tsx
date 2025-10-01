'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { aboutData } from '@/lib/data/about';
import AnimatedSection from '../shared/AnimatedSection';
import SectionHeader from '../shared/SectionHeader';

export default function CultureApproach() {
  const t = useTranslations('about.culture');

  return (
    <section className="py-20 px-4 md:px-8 bg-[var(--dark-bg-secondary)]">
      <div className="max-w-7xl mx-auto">
        {/* Culture Section */}
        <AnimatedSection className="mb-20">
          <SectionHeader title={t('title')} subtitle={t('subtitle')} centered />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {aboutData.culture.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative h-full bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image || '/images/placeholder.jpg'}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Methodology Section */}
        <AnimatedSection className="mb-16">
          <SectionHeader
            title={t('approach')}
            subtitle={t('approachSubtitle')}
            centered
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutData.methodology.map((step, index) => (
            <AnimatedSection key={step.step} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative h-full bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                {/* Step number */}
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 font-bold text-lg"
                  style={{
                    backgroundColor: `${step.color}20`,
                    color: step.color,
                  }}
                >
                  {step.step}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 mb-6 leading-relaxed text-sm">
                  {step.description}
                </p>

                {/* Practices */}
                <ul className="space-y-2">
                  {step.practices.map((practice, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-white/60"
                    >
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0"
                        style={{ backgroundColor: step.color }}
                      />
                      {practice}
                    </li>
                  ))}
                </ul>

                {/* Arrow indicator (except last step) */}
                {index < aboutData.methodology.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2">
                    <svg
                      className="w-8 h-8 text-white/20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
