'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import AnimatedSection from '../shared/AnimatedSection';
import SectionHeader from '../shared/SectionHeader';

const faqs = [
  { key: 'pricing', gradient: 'from-blue-400 to-cyan-500' },
  { key: 'timeline', gradient: 'from-purple-400 to-pink-500' },
  { key: 'process', gradient: 'from-emerald-400 to-teal-500' },
  { key: 'support', gradient: 'from-orange-400 to-red-500' },
  { key: 'revisions', gradient: 'from-indigo-400 to-purple-500' },
  { key: 'expertise', gradient: 'from-pink-400 to-rose-500' },
];

export default function ServicesFAQ() {
  const t = useTranslations('services.faq');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 px-4 md:px-8 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-4xl mx-auto relative">
        <AnimatedSection className="mb-20">
          <SectionHeader
            title={t('title')}
            subtitle={t('subtitle')}
            centered
          />
        </AnimatedSection>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className="group relative"
              >
                <div className={`relative rounded-2xl bg-white/[0.02] border transition-all duration-500 overflow-hidden ${
                  isOpen
                    ? 'border-white/10 bg-white/[0.04]'
                    : 'border-white/[0.05] hover:border-white/10'
                }`}>

                  {/* Gradient overlay when open */}
                  {isOpen && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${faq.gradient} opacity-[0.03]`} />
                  )}

                  {/* Question Button */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="relative w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/[0.02] transition-colors duration-300"
                  >
                    <span className="text-lg lg:text-xl font-bold text-white pr-8 leading-tight">
                      {t(`items.${faq.key}.question`)}
                    </span>
                    <motion.svg
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="w-6 h-6 text-white/70 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>

                  {/* Answer Panel */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.21, 0.47, 0.32, 0.98]
                        }}
                        className="overflow-hidden"
                      >
                        <div className="relative px-8 pb-8 text-base lg:text-lg text-white/70 leading-relaxed">
                          {t(`items.${faq.key}.answer`)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bottom gradient line when open */}
                  {isOpen && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${faq.gradient} origin-left`}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
