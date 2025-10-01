'use client';

import { motion } from 'framer-motion';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';

const inScope = [
  {
    category: 'Brand & Graphic Design',
    items: [
      '2D Packaging mockups and dielines',
      'Marketing collateral (brochures, one-pagers, banners)',
      'Logo iterations and brand identity refinements',
      'Infographics and data visualization'
    ]
  },
  {
    category: 'Presentation Design',
    items: [
      'Pitch decks and corporate presentations',
      'Government tender submissions',
      'Internal reports and dashboards'
    ]
  },
  {
    category: '3D Visualization',
    items: [
      'Product renders for packaging and marketing',
      'Conceptual 3D mockups',
      'Materials and textures for product visualization'
    ]
  }
];

const outOfScope = [
  'Video editing or motion graphics (unless explicitly agreed)',
  'Web development or UI/UX design for digital products',
  'Physical prototyping or print vendor coordination',
  'Social media management or content strategy',
  'Photography or videography services'
];

export default function ScopeOfWork() {
  return (
    <section id="scope-of-work" className="py-32 px-4 md:px-8 relative overflow-hidden">
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
            Scope of Work
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Clear boundaries for deliverables and services included in this engagement
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* In-Scope */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 h-full">
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 p-2.5 flex items-center justify-center">
                  <HiCheckCircle className="w-full h-full text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">In-Scope</h3>
              </div>

              {/* Categories */}
              <div className="space-y-8">
                {inScope.map((scope, index) => (
                  <motion.div
                    key={scope.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.08,
                      ease: [0.21, 0.47, 0.32, 0.98]
                    }}
                  >
                    <h4 className="text-lg font-semibold text-emerald-300 mb-3">
                      {scope.category}
                    </h4>
                    <div className="space-y-2">
                      {scope.items.map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <HiCheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white/80 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Out-of-Scope */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 h-full">
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-400 to-orange-500 p-2.5 flex items-center justify-center">
                  <HiXCircle className="w-full h-full text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Out-of-Scope</h3>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {outOfScope.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.08,
                      ease: [0.21, 0.47, 0.32, 0.98]
                    }}
                    className="flex items-start gap-3"
                  >
                    <HiXCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* Note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.4,
                  delay: 0.4,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className="mt-8 p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]"
              >
                <p className="text-xs text-white/60 italic">
                  Note: Additional services may be added through formal change request process
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
