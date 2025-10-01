'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/lib/types/portfolio';
import { useTranslations } from 'next-intl';
import { HiArrowRight } from 'react-icons/hi';

interface PortfolioCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

const serviceColors = {
  consult: '#00A6FB',
  create: '#7C4DFF',
  build: '#4A8E55',
  amplify: '#22D3EE',
};

export default function PortfolioCard({
  project,
  onClick,
  index,
}: PortfolioCardProps) {
  const t = useTranslations('portfolio');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.1 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="glass-dark rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all hover:shadow-2xl">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass-dark text-sm font-medium text-white">
              {t('featured')}
            </div>
          )}

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-bg-primary)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Service Pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.services.map((service) => (
              <span
                key={service}
                className="px-3 py-1 rounded-full text-xs font-medium text-white border"
                style={{
                  borderColor: `${serviceColors[service]}40`,
                  background: `${serviceColors[service]}20`,
                }}
              >
                {service.toUpperCase()}
              </span>
            ))}
          </div>

          {/* Title & Subtitle */}
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--consult)] transition-colors">
            {project.title}
          </h3>
          <p className="text-white/70 text-sm mb-4">{project.subtitle}</p>

          {/* Description */}
          <p className="text-white/60 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Metadata */}
          <div className="flex items-center justify-between text-sm text-white/50 mb-4">
            <span>{project.client}</span>
            <span>{project.year}</span>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-white group-hover:gap-3 transition-all">
            <span className="font-medium text-sm">{t('viewProject')}</span>
            <HiArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
