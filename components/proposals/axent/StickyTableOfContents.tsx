'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronRight } from 'react-icons/hi';

const sections = [
  { id: 'executive-summary', title: 'Executive Summary', number: '01' },
  { id: 'table-of-contents', title: 'Table of Contents', number: '02' },
  { id: 'context-objectives', title: 'Context & Objectives', number: '03' },
  { id: 'scope-of-work', title: 'Scope of Work', number: '04' },
  { id: 'option-a', title: 'Option A: Dedicated Team', number: '05' },
  { id: 'option-b', title: 'Option B: DaaS', number: '06' },
  { id: 'comparison', title: 'Comparison', number: '07' },
  { id: 'onboarding-plan', title: 'Onboarding Plan', number: '08' },
  { id: 'project-management', title: 'Project Management', number: '09' },
  { id: 'quality-security', title: 'Quality & Security', number: '10' },
  { id: 'commercials', title: 'Commercials', number: '11' },
  { id: 'risks-mitigations', title: 'Risks & Mitigations', number: '12' },
  { id: 'acceptance-criteria', title: 'Acceptance', number: '13' },
  { id: 'governance', title: 'Governance', number: '14' }
];

export default function StickyTableOfContents() {
  const [activeSection, setActiveSection] = useState('executive-summary');
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Track scroll progress
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);

      // Show ToC after scrolling 300px
      setIsVisible(scrolled > 300);
    };

    // IntersectionObserver to track active section
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 100; // Account for header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="hidden xl:block fixed left-8 top-32 w-72 z-50 pointer-events-none"
        >
          {/* Progress bar */}
          <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-white/5">
            <motion.div
              className="w-full bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400"
              style={{ height: `${scrollProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* ToC Container */}
          <div className="relative p-6 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-white/10 shadow-2xl pointer-events-auto">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-black/50 rounded-2xl" />

            {/* Header */}
            <div className="relative mb-4 pb-4 border-b border-white/10">
              <h3 className="text-sm font-bold text-white/90 uppercase tracking-wider">
                Contents
              </h3>
              <p className="text-xs text-white/50 mt-1">
                {sections.findIndex(s => s.id === activeSection) + 1} of {sections.length}
              </p>
            </div>

            {/* Sections */}
            <nav className="relative space-y-1 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`
                      group relative w-full text-left px-3 py-2.5 rounded-lg
                      transition-all duration-300 ease-out
                      ${isActive
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30'
                        : 'hover:bg-white/5 border border-transparent'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {/* Number */}
                      <span
                        className={`
                          text-xs font-mono flex-shrink-0 transition-colors duration-300
                          ${isActive
                            ? 'text-blue-400 font-bold'
                            : 'text-white/30 group-hover:text-white/50'
                          }
                        `}
                      >
                        {section.number}
                      </span>

                      {/* Title */}
                      <span
                        className={`
                          text-sm leading-tight transition-colors duration-300
                          ${isActive
                            ? 'text-white font-medium'
                            : 'text-white/60 group-hover:text-white/80'
                          }
                        `}
                      >
                        {section.title}
                      </span>

                      {/* Arrow indicator */}
                      <HiChevronRight
                        className={`
                          ml-auto w-4 h-4 transition-all duration-300 flex-shrink-0
                          ${isActive
                            ? 'text-blue-400 translate-x-0 opacity-100'
                            : 'text-white/20 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                          }
                        `}
                      />
                    </div>

                    {/* Active indicator line */}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r-full"
                        transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none rounded-b-2xl" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
