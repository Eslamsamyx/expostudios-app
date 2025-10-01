'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  HiViewGrid,
  HiCheckCircle,
  HiChip,
} from 'react-icons/hi';
import { aboutData } from '@/lib/data/about';
import AnimatedSection from '../shared/AnimatedSection';
import SectionHeader from '../shared/SectionHeader';

const iconMap = {
  HiViewGrid,
  HiCheckCircle,
  HiChip,
};

export default function WhyChooseUs() {
  const t = useTranslations('about.whyChooseUs');

  return (
    <section className="py-20 px-4 md:px-8 bg-[var(--dark-bg-primary)]">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="mb-16">
          <SectionHeader title={t('title')} subtitle={t('subtitle')} centered />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutData.whyChooseUs.map((item, index) => {
            const IconComponent =
              iconMap[item.icon as keyof typeof iconMap] || HiViewGrid;

            return (
              <AnimatedSection key={item.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group relative h-full bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  {/* Colored glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
                    style={{ backgroundColor: item.color }}
                  />

                  {/* Icon */}
                  <div
                    className="relative w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: `${item.color}20`,
                      boxShadow: `0 8px 32px ${item.color}30`,
                    }}
                  >
                    <IconComponent
                      className="w-8 h-8"
                      style={{ color: item.color }}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-3">
                    {item.benefits.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-white/80"
                      >
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
