'use client';

import { motion } from 'framer-motion';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';

const comparisonData = [
  {
    aspect: 'Capacity',
    dedicated: '320h/month (2 FTE)',
    daas: '12-48 assets/month (variable hours)'
  },
  {
    aspect: 'Turnaround',
    dedicated: 'As fast as team can deliver (no SLA)',
    daas: '2-7 business days per package tier'
  },
  {
    aspect: 'Governance',
    dedicated: 'Client-managed (Axent assigns tasks)',
    daas: 'Expo-managed (request-based intake)'
  },
  {
    aspect: 'Specialists',
    dedicated: 'Fixed 2D + 3D designers',
    daas: 'Dynamic pool (2D, 3D, Senior as needed)'
  },
  {
    aspect: 'Cost Model',
    dedicated: 'Fixed monthly fee',
    daas: 'Asset-based subscription'
  },
  {
    aspect: 'Best For',
    dedicated: 'Predictable high volume, deep immersion',
    daas: 'Variable volume, defined deliverables'
  }
];

const dedicatedPros = [
  'Dedicated capacity with no contention',
  'Deep brand immersion and faster iterations',
  'Simplified invoicing (one flat fee)',
  'Team learns institutional knowledge over time'
];

const dedicatedCons = [
  'Less flexible if volume drops',
  'Client manages daily workflow',
  'Requires onboarding investment'
];

const daasPros = [
  'Scalable packages (12-48 assets)',
  'Defined SLAs per tier',
  'Expo manages HR, payroll, benefits, software licenses, and QA',
  'Rollover and overage flexibility'
];

const daasCons = [
  'Less predictable turnaround at lower tiers',
  'May require more detailed briefs',
  'Per-asset tracking overhead'
];

export default function Comparison() {
  return (
    <section id="comparison" className="py-32 px-4 md:px-8 relative overflow-hidden">
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
            Comparison Matrix
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Side-by-side comparison of Dedicated Team vs DaaS Assets-Based models
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden mb-16"
        >
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-4 p-6 border-b border-white/[0.05] bg-white/[0.02]">
            <div className="text-white/60 font-semibold text-sm">Aspect</div>
            <div className="text-blue-400 font-bold text-center">Dedicated Team</div>
            <div className="text-purple-400 font-bold text-center">DaaS Assets-Based</div>
          </div>

          {/* Table Rows */}
          {comparisonData.map((row, index) => (
            <motion.div
              key={row.aspect}
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
              <div className="text-white font-semibold">{row.aspect}</div>
              <div className="text-white/70 text-sm text-center">{row.dedicated}</div>
              <div className="text-white/70 text-sm text-center">{row.daas}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pros & Cons */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Dedicated Team */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-xl font-bold text-white mb-6 flex items-center gap-2"
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500" />
              Dedicated Team
            </motion.h3>

            <div className="space-y-4">
              {/* Pros */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20"
              >
                <h4 className="text-sm font-semibold text-emerald-300 mb-3">Pros</h4>
                <div className="space-y-2">
                  {dedicatedPros.map((pro) => (
                    <div key={pro} className="flex items-start gap-2">
                      <HiCheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70 text-sm">{pro}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Cons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.16, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative p-6 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20"
              >
                <h4 className="text-sm font-semibold text-red-300 mb-3">Considerations</h4>
                <div className="space-y-2">
                  {dedicatedCons.map((con) => (
                    <div key={con} className="flex items-start gap-2">
                      <HiXCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70 text-sm">{con}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* DaaS Assets-Based */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-xl font-bold text-white mb-6 flex items-center gap-2"
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-500" />
              DaaS Assets-Based
            </motion.h3>

            <div className="space-y-4">
              {/* Pros */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20"
              >
                <h4 className="text-sm font-semibold text-emerald-300 mb-3">Pros</h4>
                <div className="space-y-2">
                  {daasPros.map((pro) => (
                    <div key={pro} className="flex items-start gap-2">
                      <HiCheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70 text-sm">{pro}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Cons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.16, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative p-6 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20"
              >
                <h4 className="text-sm font-semibold text-red-300 mb-3">Considerations</h4>
                <div className="space-y-2">
                  {daasCons.map((con) => (
                    <div key={con} className="flex items-start gap-2">
                      <HiXCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70 text-sm">{con}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
