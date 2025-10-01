'use client';

import { motion } from 'framer-motion';
import { HiChevronRight } from 'react-icons/hi';

const sections = [
  { id: 'executive-summary', title: 'Executive Summary', number: '01' },
  { id: 'context-objectives', title: 'Context & Objectives', number: '02' },
  { id: 'scope-of-work', title: 'Scope of Work', number: '03' },
  { id: 'option-a', title: 'Option A: Dedicated Team', number: '04' },
  { id: 'option-b', title: 'Option B: DaaS Assets-Based', number: '05' },
  { id: 'comparison', title: 'Comparison Matrix', number: '06' },
  { id: 'onboarding', title: 'Onboarding Plan', number: '07' },
  { id: 'project-management', title: 'Project Management', number: '08' },
  { id: 'quality-security', title: 'Quality & Security', number: '09' },
  { id: 'commercials', title: 'Commercials', number: '10' },
  { id: 'risks-mitigations', title: 'Risks & Mitigations', number: '11' },
  { id: 'acceptance-criteria', title: 'Acceptance Criteria', number: '12' },
  { id: 'governance', title: 'Governance Model', number: '13' }
];

export default function TableOfContents() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-32 px-4 md:px-8 relative overflow-hidden">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Table of Contents
          </h2>
          <p className="text-lg text-white/70">
            Navigate through the proposal sections
          </p>
        </motion.div>

        {/* Sections Grid */}
        <div className="grid gap-3">
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => handleScroll(section.id)}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
              className="group relative text-left"
            >
              <div className="relative p-6 rounded-xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex items-center gap-6 flex-1">
                    {/* Number */}
                    <span className="text-3xl font-bold bg-gradient-to-br from-blue-400 to-cyan-500 bg-clip-text text-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300 w-16 flex-shrink-0">
                      {section.number}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg lg:text-xl font-semibold text-white group-hover:text-white transition-colors duration-300">
                      {section.title}
                    </h3>
                  </div>

                  {/* Arrow */}
                  <HiChevronRight className="w-6 h-6 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                </div>

                {/* Bottom gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
