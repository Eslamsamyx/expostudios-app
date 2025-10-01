import { useState, useMemo } from 'react';
import { Project, ServiceType, Industry } from '../types/portfolio';

export function usePortfolioFilters(projects: Project[]) {
  const [activeService, setActiveService] = useState<ServiceType | 'all'>('all');
  const [activeIndustry, setActiveIndustry] = useState<Industry | 'all'>('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Featured filter
      if (showFeaturedOnly && !project.featured) return false;

      // Service filter
      if (activeService !== 'all' && !project.services.includes(activeService)) {
        return false;
      }

      // Industry filter
      if (activeIndustry !== 'all' && project.industry !== activeIndustry) {
        return false;
      }

      return true;
    });
  }, [projects, activeService, activeIndustry, showFeaturedOnly]);

  const toggleService = (service: ServiceType | 'all') => {
    setActiveService(service);
  };

  const toggleIndustry = (industry: Industry | 'all') => {
    setActiveIndustry(industry);
  };

  const toggleFeatured = () => {
    setShowFeaturedOnly(!showFeaturedOnly);
  };

  const clearFilters = () => {
    setActiveService('all');
    setActiveIndustry('all');
    setShowFeaturedOnly(false);
  };

  const hasActiveFilters =
    activeService !== 'all' || activeIndustry !== 'all' || showFeaturedOnly;

  return {
    activeService,
    activeIndustry,
    showFeaturedOnly,
    filteredProjects,
    toggleService,
    toggleIndustry,
    toggleFeatured,
    clearFilters,
    hasActiveFilters,
  };
}
