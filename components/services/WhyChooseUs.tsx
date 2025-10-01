'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import AnimatedSection from '../shared/AnimatedSection';
import SectionHeader from '../shared/SectionHeader';

const features = [
  {
    number: '01',
    titleKey: 'whyChooseUs.features.creative.title',
    descKey: 'whyChooseUs.features.creative.description',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    number: '02',
    titleKey: 'whyChooseUs.features.quality.title',
    descKey: 'whyChooseUs.features.quality.description',
    gradient: 'from-purple-400 to-pink-500',
  },
  {
    number: '03',
    titleKey: 'whyChooseUs.features.turnkey.title',
    descKey: 'whyChooseUs.features.turnkey.description',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    number: '04',
    titleKey: 'whyChooseUs.features.delivery.title',
    descKey: 'whyChooseUs.features.delivery.description',
    gradient: 'from-orange-400 to-red-500',
  },
  {
    number: '05',
    titleKey: 'whyChooseUs.features.global.title',
    descKey: 'whyChooseUs.features.global.description',
    gradient: 'from-indigo-400 to-purple-500',
  },
  {
    number: '06',
    titleKey: 'whyChooseUs.features.insights.title',
    descKey: 'whyChooseUs.features.insights.description',
    gradient: 'from-pink-400 to-rose-500',
  },
];

export default function WhyChooseUs() {
  const t = useTranslations('services');

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
            title={t('whyChooseUs.title')}
            subtitle={t('whyChooseUs.subtitle')}
            centered
          />
        </AnimatedSection>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
              className={`group relative ${
                index === 0 ? 'lg:col-span-2 lg:row-span-1' : ''
              } ${
                index === 5 ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Card */}
              <div className="relative h-full p-8 lg:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10">

                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                {/* Large number */}
                <div className="relative mb-6">
                  <span className={`text-7xl lg:text-8xl font-bold bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500`}>
                    {feature.number}
                  </span>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                    {t(feature.titleKey)}
                  </h3>
                  <p className={`text-base lg:text-lg text-white/60 leading-relaxed group-hover:text-white/70 transition-colors duration-300 ${
                    index === 0 || index === 5 ? 'max-w-2xl' : ''
                  }`}>
                    {t(feature.descKey)}
                  </p>
                </div>

                {/* Bottom gradient line */}
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
