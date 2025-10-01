'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { aboutData } from '@/lib/data/about';
import AnimatedSection from '../shared/AnimatedSection';
import SectionHeader from '../shared/SectionHeader';

const categoryColors = {
  company: '#00A6FB',
  product: '#7C4DFF',
  achievement: '#4A8E55',
};

export default function CompanyTimeline() {
  const t = useTranslations('about.timeline');

  return (
    <section className="py-20 px-4 md:px-8 bg-[var(--dark-bg-primary)]">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="mb-16">
          <SectionHeader title={t('title')} subtitle={t('subtitle')} centered />
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10 hidden lg:block" />

          {/* Timeline items */}
          <div className="space-y-16">
            {aboutData.timeline.map((milestone, index) => {
              const color =
                categoryColors[
                  milestone.category as keyof typeof categoryColors
                ];
              const isEven = index % 2 === 0;

              return (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div
                    className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                      isEven ? '' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Content */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className={`${isEven ? 'lg:text-right lg:pr-12' : 'lg:pl-12 lg:col-start-2'}`}
                    >
                      {/* Year badge */}
                      <div className="inline-flex items-center gap-2 mb-4">
                        <span
                          className="px-4 py-1.5 rounded-full text-sm font-bold"
                          style={{
                            backgroundColor: `${color}20`,
                            color: color,
                          }}
                        >
                          {milestone.year}
                          {milestone.month && ` · ${milestone.month}`}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3">
                        {milestone.title}
                      </h3>

                      <p className="text-white/70 leading-relaxed mb-4">
                        {milestone.description}
                      </p>

                      {/* Metrics */}
                      {milestone.metrics && (
                        <div className="flex flex-wrap gap-4">
                          {milestone.metrics.map((metric, idx) => (
                            <div
                              key={idx}
                              className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2"
                            >
                              <p className="text-xs text-white/50">
                                {metric.label}
                              </p>
                              <p
                                className="text-lg font-bold"
                                style={{ color }}
                              >
                                {metric.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>

                    {/* Image */}
                    {milestone.image && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={`relative h-64 rounded-2xl overflow-hidden ${
                          isEven ? 'lg:col-start-2' : 'lg:col-start-1 lg:row-start-1'
                        }`}
                      >
                        <Image
                          src={milestone.image}
                          alt={milestone.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </motion.div>
                    )}

                    {/* Center dot */}
                    <div className="absolute left-1/2 top-8 -translate-x-1/2 hidden lg:block">
                      <div
                        className="w-4 h-4 rounded-full border-4 border-[var(--dark-bg-primary)]"
                        style={{ backgroundColor: color }}
                      />
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Present marker */}
          <AnimatedSection delay={0.5}>
            <div className="relative mt-16 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#00A6FB] via-[#7C4DFF] to-[#22D3EE] rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-white font-bold">{t('present')}</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
