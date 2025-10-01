'use client';

import { useTranslations } from 'next-intl';
import { aboutData } from '@/lib/data/about';
import AnimatedSection from '../shared/AnimatedSection';
import SectionHeader from '../shared/SectionHeader';
import StatsCounter from '../content/StatsCounter';

export default function AboutStats() {
  const t = useTranslations('about.stats');

  return (
    <section className="py-20 px-4 md:px-8 bg-[var(--dark-bg-secondary)]">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="mb-16">
          <SectionHeader title={t('title')} subtitle={t('subtitle')} centered />
        </AnimatedSection>

        <StatsCounter stats={aboutData.stats} />
      </div>
    </section>
  );
}
