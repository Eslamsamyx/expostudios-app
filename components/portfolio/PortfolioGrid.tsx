'use client';

import { useState } from 'react';
import { projects } from '@/lib/data/portfolio';
import { usePortfolioFilters } from '@/lib/hooks/usePortfolioFilters';
import { useTranslations } from 'next-intl';
import PortfolioCard from './PortfolioCard';
import PortfolioFilter from './PortfolioFilter';
import ProjectDetailView from './ProjectDetailView';
import Modal from '../shared/Modal';
import AnimatedSection from '../shared/AnimatedSection';
import SectionHeader from '../shared/SectionHeader';
import { Project } from '@/lib/types/portfolio';
import { motion, AnimatePresence } from 'framer-motion';

export default function PortfolioGrid() {
  const t = useTranslations('portfolio');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const {
    activeService,
    activeIndustry,
    showFeaturedOnly,
    filteredProjects,
    toggleService,
    toggleIndustry,
    toggleFeatured,
    clearFilters,
    hasActiveFilters,
  } = usePortfolioFilters(projects);

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection className="mb-16">
          <SectionHeader title={t('title')} subtitle={t('subtitle')} centered />
        </AnimatedSection>

        {/* Filters */}
        <PortfolioFilter
          activeService={activeService}
          activeIndustry={activeIndustry}
          showFeaturedOnly={showFeaturedOnly}
          onServiceChange={toggleService}
          onIndustryChange={toggleIndustry}
          onFeaturedToggle={toggleFeatured}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
          projectCount={filteredProjects.length}
        />

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <PortfolioCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="glass-dark rounded-2xl p-12 border border-white/10 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t('noProjectsFound')}
                </h3>
                <p className="text-white/60 mb-6">
                  Try adjusting your filters to see more results.
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--consult)] to-[var(--amplify)] text-white font-medium hover:opacity-90 transition-opacity"
                  >
                    {t('clearFilters')}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Detail Modal */}
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          size="xl"
        >
          {selectedProject && <ProjectDetailView project={selectedProject} />}
        </Modal>
      </div>
    </section>
  );
}
