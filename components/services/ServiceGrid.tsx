'use client';

import { services } from '@/lib/data/services';
import ServiceDetailCard from './ServiceDetailCard';
import AnimatedSection from '../shared/AnimatedSection';
import SectionHeader from '../shared/SectionHeader';
import { useTranslations } from 'next-intl';

export default function ServiceGrid() {
  const t = useTranslations('services');

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="mb-16">
          <SectionHeader
            title={t('title')}
            subtitle={t('subtitle')}
            centered
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceDetailCard
              key={service.slug}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
