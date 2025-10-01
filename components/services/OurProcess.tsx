'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import AnimatedSection from '../shared/AnimatedSection';
import SectionHeader from '../shared/SectionHeader';

const steps = [
  {
    number: '01',
    titleKey: 'process.steps.concept.title',
    descKey: 'process.steps.concept.description',
    gradient: 'from-blue-400 to-cyan-500',
  },
  {
    number: '02',
    titleKey: 'process.steps.design.title',
    descKey: 'process.steps.design.description',
    gradient: 'from-purple-400 to-pink-500',
  },
  {
    number: '03',
    titleKey: 'process.steps.visualization.title',
    descKey: 'process.steps.visualization.description',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    number: '04',
    titleKey: 'process.steps.fabrication.title',
    descKey: 'process.steps.fabrication.description',
    gradient: 'from-orange-400 to-red-500',
  },
  {
    number: '05',
    titleKey: 'process.steps.installation.title',
    descKey: 'process.steps.installation.description',
    gradient: 'from-indigo-400 to-purple-500',
  },
  {
    number: '06',
    titleKey: 'process.steps.activation.title',
    descKey: 'process.steps.activation.description',
    gradient: 'from-pink-400 to-rose-500',
  },
];

export default function OurProcess() {
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

      <div className="max-w-5xl mx-auto relative">
        <AnimatedSection className="mb-20">
          <SectionHeader
            title={t('process.title')}
            subtitle={t('process.subtitle')}
            centered
          />
        </AnimatedSection>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
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
              <div className="relative p-8 lg:p-12 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10">

                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative flex flex-col lg:flex-row items-start gap-6 lg:gap-12">
                  {/* Large Number */}
                  <div className="flex-shrink-0">
                    <span className={`text-7xl lg:text-8xl font-bold bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500`}>
                      {step.number}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                      {t(step.titleKey)}
                    </h3>
                    <p className="text-base lg:text-lg text-white/60 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                      {t(step.descKey)}
                    </p>
                  </div>
                </div>

                {/* Bottom gradient line */}
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
