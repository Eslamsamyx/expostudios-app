'use client';

import { useTranslations } from 'next-intl';
import FilterChip from '../shared/FilterChip';
import { ServiceType, Industry } from '@/lib/types/portfolio';
import { motion } from 'framer-motion';

interface PortfolioFilterProps {
  activeService: ServiceType | 'all';
  activeIndustry: Industry | 'all';
  showFeaturedOnly: boolean;
  onServiceChange: (service: ServiceType | 'all') => void;
  onIndustryChange: (industry: Industry | 'all') => void;
  onFeaturedToggle: () => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  projectCount: number;
}

const services: Array<ServiceType | 'all'> = [
  'all',
  'consult',
  'create',
  'build',
  'amplify',
];

const industries: Array<Industry | 'all'> = [
  'all',
  'exhibitions',
  'experienceCenters',
  'government',
  'retail',
  'museums',
  'corporate',
  'education',
];

const serviceColors = {
  all: 'var(--consult)',
  consult: '#00A6FB',
  create: '#7C4DFF',
  build: '#4A8E55',
  amplify: '#22D3EE',
};

export default function PortfolioFilter({
  activeService,
  activeIndustry,
  showFeaturedOnly,
  onServiceChange,
  onIndustryChange,
  onFeaturedToggle,
  onClearFilters,
  hasActiveFilters,
  projectCount,
}: PortfolioFilterProps) {
  const t = useTranslations('portfolio');
  const tServices = useTranslations('services');
  const tIndustries = useTranslations('industries');

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-dark rounded-2xl p-6 mb-12 border border-white/10"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">
            {t('filterBy')}
          </h3>
          <p className="text-sm text-white/60">
            {projectCount} {t('projectsFound')}
          </p>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-white/70 hover:text-white transition-colors mt-4 md:mt-0"
          >
            {t('clearFilters')}
          </button>
        )}
      </div>

      {/* Featured Toggle */}
      <div className="mb-6">
        <FilterChip
          label={t('featured')}
          active={showFeaturedOnly}
          onClick={onFeaturedToggle}
          color="var(--amplify)"
        />
      </div>

      {/* Services Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-white/80 mb-3">
          {t('services')}
        </h4>
        <div className="flex flex-wrap gap-2">
          {services.map((service) => (
            <FilterChip
              key={service}
              label={
                service === 'all'
                  ? t('allProjects')
                  : tServices(`${service}.name`)
              }
              active={activeService === service}
              onClick={() => onServiceChange(service)}
              color={serviceColors[service]}
            />
          ))}
        </div>
      </div>

      {/* Industries Filter */}
      <div>
        <h4 className="text-sm font-medium text-white/80 mb-3">
          {t('industries')}
        </h4>
        <div className="flex flex-wrap gap-2">
          {industries.map((industry) => (
            <FilterChip
              key={industry}
              label={
                industry === 'all'
                  ? t('allProjects')
                  : tIndustries(`${industry}.name`)
              }
              active={activeIndustry === industry}
              onClick={() => onIndustryChange(industry)}
              color="var(--create)"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
