'use client';

import { motion } from 'framer-motion';
import { HiCheckCircle, HiDocumentText, HiEye, HiCode } from 'react-icons/hi';

const criteria = [
  {
    icon: HiDocumentText,
    title: 'Brief Compliance',
    description: 'Deliverable meets all requirements outlined in the project brief',
    gradient: 'from-blue-400 to-cyan-500'
  },
  {
    icon: HiEye,
    title: 'Brand Adherence',
    description: 'Design aligns with Axent and end-client brand guidelines (colors, fonts, logo usage)',
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    icon: HiCheckCircle,
    title: 'Definition of Done',
    description: 'Asset meets Axent quality standards (format, resolution, naming convention)',
    gradient: 'from-emerald-400 to-teal-500'
  },
  {
    icon: HiCode,
    title: 'Source Files',
    description: 'Layered source files (AI, PSD, C4D, etc.) provided alongside final exports',
    gradient: 'from-orange-400 to-red-500'
  }
];

const qualityStandards = [
  {
    standard: 'First-Pass Approval',
    target: '≥80%',
    description: 'Client approves deliverable with minor or no revisions on first submission'
  },
  {
    standard: 'Print-Ready Exports',
    target: '100%',
    description: 'All packaging and collateral assets pass pre-flight checks for print vendors'
  },
  {
    standard: 'Accessibility Compliance',
    target: 'WCAG 2.1 AA',
    description: 'Digital assets meet accessibility standards (contrast ratios, alt text, readability)'
  },
  {
    standard: 'File Organization',
    target: '100%',
    description: 'Consistent naming conventions and folder structure for easy handoff'
  }
];

export default function AcceptanceCriteria() {
  return (
    <section id="acceptance-criteria" className="py-32 px-4 md:px-8 relative overflow-hidden">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Acceptance Criteria
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Clear standards for deliverable quality and client approval
          </p>
        </motion.div>

        {/* Core Criteria */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-2xl lg:text-3xl font-bold text-white mb-8"
          >
            Core Acceptance Criteria
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-6">
            {criteria.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className="group relative"
              >
                <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10 h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                  <div className="relative flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.gradient} p-2.5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-full h-full text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quality Standards */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-2xl lg:text-3xl font-bold text-white mb-8"
          >
            Quality Standards & Targets
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden"
          >
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 p-6 border-b border-white/[0.05] bg-white/[0.02]">
              <div className="text-white font-bold">Standard</div>
              <div className="text-white font-bold text-center">Target</div>
              <div className="text-white font-bold">Description</div>
            </div>

            {/* Table Rows */}
            {qualityStandards.map((standard, index) => (
              <motion.div
                key={standard.standard}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className={`grid grid-cols-3 gap-4 p-6 border-b border-white/[0.05] ${index % 2 === 0 ? 'bg-white/[0.01]' : ''}`}
              >
                <div className="text-white font-semibold">{standard.standard}</div>
                <div className="text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-semibold">
                    {standard.target}
                  </span>
                </div>
                <div className="text-white/70 text-sm">{standard.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Approval Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.5,
            delay: 0.32,
            ease: [0.21, 0.47, 0.32, 0.98]
          }}
          className="mt-12 relative p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 p-2 flex items-center justify-center flex-shrink-0">
              <HiCheckCircle className="w-full h-full text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-white mb-2">
                Approval Process
              </h4>
              <p className="text-white/70 leading-relaxed text-sm mb-4">
                Deliverables are considered &ldquo;accepted&rdquo; when:
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <HiCheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm">
                    Axent stakeholder provides written approval (email or PM tool comment)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <HiCheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm">
                    Or 5 business days pass with no feedback (implicit approval for minor items)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <HiCheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm">
                    Major deliverables (e.g., full campaigns) always require explicit approval
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
