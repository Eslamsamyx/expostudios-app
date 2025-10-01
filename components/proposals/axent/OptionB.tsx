'use client';

import { motion } from 'framer-motion';
import { HiCube, HiLightningBolt, HiRefresh, HiClock } from 'react-icons/hi';

const howItWorks = [
  'Axent purchases a package (12, 24, or 48 assets/month)',
  'Submit requests via intake form with brief and reference files',
  'Expo assigns from talent pool based on asset type and workload',
  'Assets delivered per package SLA with included revisions'
];

const assetExamples = [
  {
    category: '2D Assets',
    items: [
      '1 packaging design concept = 1 asset',
      '1 presentation deck (up to 10 slides) = 1 asset',
      '1 brochure or one-pager = 1 asset',
      '1 infographic = 1 asset',
      '1 logo iteration = 0.5 asset'
    ]
  },
  {
    category: '3D Assets',
    items: [
      '1 product render (single angle) = 1 asset',
      '1 lifestyle scene render = 1.5 assets',
      '1 conceptual 3D mockup = 1 asset'
    ]
  }
];

const packages = [
  {
    name: 'Starter',
    assets: 12,
    gradient: 'from-blue-400 to-cyan-500',
    sla: '5-7 business days',
    revisions: '2 rounds included',
    roles: '2D Designer, 3D Artist (as needed)',
    bestFor: 'Low-volume needs or pilot phase'
  },
  {
    name: 'Pro',
    assets: 24,
    gradient: 'from-purple-400 to-pink-500',
    sla: '3-5 business days',
    revisions: '3 rounds included',
    roles: '2D Designer, 3D Artist, Senior oversight',
    bestFor: 'Regular monthly workload',
    popular: true
  },
  {
    name: 'Enterprise',
    assets: 48,
    gradient: 'from-emerald-400 to-teal-500',
    sla: '2-4 business days',
    revisions: '3 rounds included + priority queue',
    roles: 'Dedicated 2D/3D specialists + account manager',
    bestFor: 'High-volume or multi-client portfolios'
  }
];

const policies = [
  {
    icon: HiRefresh,
    title: 'Rollover',
    description: 'Unused assets roll over to next month (max 50% of package)',
    gradient: 'from-blue-400 to-cyan-500'
  },
  {
    icon: HiLightningBolt,
    title: 'Overage',
    description: 'Additional assets billed at per-asset rate if package exhausted',
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    icon: HiClock,
    title: 'Expedite',
    description: '48h rush delivery available for +50% fee per asset',
    gradient: 'from-orange-400 to-red-500'
  }
];

export default function OptionB() {
  return (
    <section id="option-b" className="py-32 px-4 md:px-8 relative overflow-hidden">
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
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <HiCube className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">Option B</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            DaaS Assets-Based Packages
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Flexible subscription model with defined asset allocations and SLAs
          </p>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-6">How It Works</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {howItWorks.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <p className="text-white/70 text-sm">{step}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* What Counts as an Asset */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-2xl lg:text-3xl font-bold text-white mb-8"
          >
            What Counts as an Asset
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-6">
            {assetExamples.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm"
              >
                <h4 className="text-xl font-bold text-white mb-4">{category.category}</h4>
                <div className="space-y-2">
                  {category.items.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                      <span className="text-white/70 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Packages */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-2xl lg:text-3xl font-bold text-white mb-8 text-center"
          >
            Package Options
          </motion.h3>

          <div className="grid lg:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
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
                <div className={`relative p-8 rounded-2xl bg-white/[0.02] border ${pkg.popular ? 'border-purple-500/30' : 'border-white/[0.05]'} backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10 h-full`}>
                  {/* Popular badge */}
                  {pkg.popular && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 text-white text-xs font-semibold">
                      Popular
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                  <div className="relative">
                    <h4 className="text-2xl font-bold text-white mb-2">{pkg.name}</h4>
                    <div className={`text-5xl font-bold bg-gradient-to-br ${pkg.gradient} bg-clip-text text-transparent mb-6`}>
                      {pkg.assets}
                      <span className="text-xl text-white/60 ml-2">assets/mo</span>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <div className="text-xs text-white/50 mb-1">SLA</div>
                        <div className="text-white/80 font-medium">{pkg.sla}</div>
                      </div>
                      <div>
                        <div className="text-xs text-white/50 mb-1">Revisions</div>
                        <div className="text-white/80 font-medium">{pkg.revisions}</div>
                      </div>
                      <div>
                        <div className="text-xs text-white/50 mb-1">Team</div>
                        <div className="text-white/80 font-medium text-sm">{pkg.roles}</div>
                      </div>
                      <div>
                        <div className="text-xs text-white/50 mb-1">Best For</div>
                        <div className="text-white/80 font-medium text-sm">{pkg.bestFor}</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom gradient line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${pkg.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SLAs & Policies */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-2xl lg:text-3xl font-bold text-white mb-8"
          >
            SLAs & Policies
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-6">
            {policies.map((policy, index) => (
              <motion.div
                key={policy.title}
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
                  <div className={`absolute inset-0 bg-gradient-to-br ${policy.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                  <div className="relative">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${policy.gradient} p-2.5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <policy.icon className="w-full h-full text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{policy.title}</h4>
                    <p className="text-white/70 text-sm">{policy.description}</p>
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${policy.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
