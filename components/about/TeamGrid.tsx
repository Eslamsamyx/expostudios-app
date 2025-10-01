'use client';

import { useTranslations } from 'next-intl';
import { aboutData } from '@/lib/data/about';
import AnimatedSection from '../shared/AnimatedSection';
import SectionHeader from '../shared/SectionHeader';
import TeamMemberCard from './TeamMemberCard';

export default function TeamGrid() {
  const t = useTranslations('about.team');

  return (
    <section className="py-20 px-4 md:px-8 bg-[var(--dark-bg-secondary)]">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="mb-16">
          <SectionHeader title={t('title')} subtitle={t('subtitle')} centered />
        </AnimatedSection>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {aboutData.team.map((member, index) => (
            <div key={member.id}>
              <TeamMemberCard member={member} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
