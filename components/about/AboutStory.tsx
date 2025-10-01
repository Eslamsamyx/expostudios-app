'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { aboutData } from '@/lib/data/about';
import AnimatedSection from '../shared/AnimatedSection';
import SectionHeader from '../shared/SectionHeader';

export default function AboutStory() {
  const t = useTranslations('about.story');

  return (
    <section className="py-20 px-4 md:px-8 bg-[var(--dark-bg-secondary)]">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="mb-16">
          <SectionHeader title={t('title')} subtitle={t('subtitle')} centered />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Story Content */}
          <AnimatedSection animation="fadeInLeft">
            <div className="space-y-6">
              {aboutData.story.content.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-lg text-white/70 leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}

              {/* Founding Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-8 border-t border-white/10"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-white/50 mb-2">{t('founded')}</p>
                    <p className="text-2xl font-bold gradient-text-service">
                      {aboutData.story.founded}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-white/50 mb-2">Founders</p>
                    <div className="space-y-1">
                      {aboutData.story.founders.map((founder, idx) => (
                        <p key={idx} className="text-white/90 font-medium">
                          {founder}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Story Images */}
          <AnimatedSection animation="fadeInRight">
            <div className="grid grid-cols-2 gap-4">
              {aboutData.story.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`relative overflow-hidden rounded-2xl ${
                    index === 0 ? 'col-span-2 h-64' : 'h-48'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Story image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
