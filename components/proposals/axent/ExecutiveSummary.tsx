'use client';

import { motion } from 'framer-motion';
import { HiUserGroup, HiCube, HiCheckCircle } from 'react-icons/hi';

const options = [
  {
    icon: HiUserGroup,
    title: 'Option A: Dedicated Team',
    subtitle: '2 FTE embedded designers',
    gradient: 'from-blue-400 to-cyan-500',
    features: [
      'Full-time capacity (320h/month)',
      'Axent manages day-to-day work and priorities',
      'Expo handles recruitment, HR, payroll, and benefits',
      'Deep brand immersion and predictable output'
    ]
  },
  {
    icon: HiCube,
    title: 'Option B: DaaS Assets-Based',
    subtitle: 'Flexible packages (12-48 assets/month)',
    gradient: 'from-purple-400 to-pink-500',
    features: [
      'Pay-per-asset model',
      'Expo-managed operations',
      'Scalable capacity',
      'Defined SLAs per package'
    ]
  }
];

export default function ExecutiveSummary() {
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

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Executive Summary
          </h2>
          <p className="text-lg lg:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Expo Studios offers Axent two engagement models to meet high-volume,
            time-sensitive 2D/3D design needs for GCC government entities.
          </p>
        </motion.div>

        {/* Options Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {options.map((option, index) => (
            <motion.div
              key={option.title}
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
              <div className="relative h-full p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${option.gradient} p-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                      <option.icon className="w-full h-full text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {option.title}
                  </h3>
                  <p className="text-white/60 mb-6">
                    {option.subtitle}
                  </p>

                  {/* Features */}
                  <div className="space-y-3">
                    {option.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <HiCheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 bg-gradient-to-br ${option.gradient} bg-clip-text text-transparent`} />
                        <span className="text-white/70 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom gradient line */}
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${option.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.5,
            delay: 0.16,
            ease: [0.21, 0.47, 0.32, 0.98]
          }}
          className="relative p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 p-2.5 flex items-center justify-center flex-shrink-0">
              <HiCheckCircle className="w-full h-full text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-2">
                Recommended Approach
              </h4>
              <p className="text-white/70 leading-relaxed">
                Start with a <strong className="text-white">3-month pilot</strong> to establish baseline
                volume, review cadence, and team fit. This allows both parties to validate the model before
                committing to a longer-term annual contract.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
