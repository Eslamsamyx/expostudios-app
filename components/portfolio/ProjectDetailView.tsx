'use client';

import { Project } from '@/lib/types/portfolio';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { HiExternalLink } from 'react-icons/hi';

interface ProjectDetailViewProps {
  project: Project;
}

const serviceColors = {
  consult: '#00A6FB',
  create: '#7C4DFF',
  build: '#4A8E55',
  amplify: '#22D3EE',
};

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const t = useTranslations('portfolio');

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      {/* Hero Image */}
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={project.images[0]?.url || project.thumbnail}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.services.map((service) => (
              <span
                key={service}
                className="px-3 py-1 rounded-full text-sm font-medium text-white border"
                style={{
                  borderColor: `${serviceColors[service]}40`,
                  background: `${serviceColors[service]}20`,
                }}
              >
                {service.toUpperCase()}
              </span>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {project.title}
          </h2>
          <p className="text-xl text-white/70 mb-6">{project.subtitle}</p>

          {/* Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 glass-dark rounded-xl p-4 border border-white/10">
            <div>
              <span className="text-sm text-white/60">{t('client')}</span>
              <p className="text-white font-medium">{project.client}</p>
            </div>
            <div>
              <span className="text-sm text-white/60">{t('industry')}</span>
              <p className="text-white font-medium capitalize">
                {project.industry}
              </p>
            </div>
            <div>
              <span className="text-sm text-white/60">{t('year')}</span>
              <p className="text-white font-medium">{project.year}</p>
            </div>
            {project.duration && (
              <div>
                <span className="text-sm text-white/60">{t('duration')}</span>
                <p className="text-white font-medium">{project.duration}</p>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-white/80 text-lg leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Challenge */}
        {project.challenge && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              {t('challenge')}
            </h3>
            <p className="text-white/70 leading-relaxed">{project.challenge}</p>
          </div>
        )}

        {/* Solution */}
        {project.solution && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              {t('solution')}
            </h3>
            <p className="text-white/70 leading-relaxed">{project.solution}</p>
          </div>
        )}

        {/* Results */}
        {project.results && project.results.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              {t('results')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.results.map((result, index) => (
                <div
                  key={index}
                  className="glass-dark rounded-xl p-6 border border-white/10 text-center"
                >
                  <div className="text-3xl font-bold gradient-text-service mb-2">
                    {result.value}
                  </div>
                  <div className="text-sm font-medium text-white mb-1">
                    {result.label}
                  </div>
                  {result.description && (
                    <div className="text-xs text-white/60">
                      {result.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies */}
        {project.technologies.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">
              {t('technologies')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech.id}
                  className="px-4 py-2 rounded-lg glass-dark text-white text-sm border border-white/10"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Testimonial */}
        {project.testimonial && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              {t('testimonial')}
            </h3>
            <div className="glass-dark rounded-xl p-8 border border-white/10">
              <p className="text-lg text-white/90 italic mb-6">
                &ldquo;{project.testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-semibold text-white">
                    {project.testimonial.author}
                  </div>
                  <div className="text-sm text-white/60">
                    {project.testimonial.role}
                  </div>
                  <div className="text-sm text-white/60">
                    {project.testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Links */}
        {project.links && (
          <div className="flex flex-wrap gap-4">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--consult)] to-[var(--amplify)] text-white font-medium hover:opacity-90 transition-opacity"
              >
                {t('visitWebsite')}
                <HiExternalLink className="w-5 h-5" />
              </a>
            )}
            {project.links.case_study && (
              <a
                href={project.links.case_study}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass-dark text-white font-medium border border-white/20 hover:bg-white/10 transition-all"
              >
                {t('viewCaseStudy')}
                <HiExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
