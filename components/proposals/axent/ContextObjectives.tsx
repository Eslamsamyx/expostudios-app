'use client';

import { motion } from 'framer-motion';
import { HiOfficeBuilding, HiViewGrid, HiChartBar, HiCheckCircle, HiClock } from 'react-icons/hi';

const context = [
  {
    icon: HiOfficeBuilding,
    title: 'Client Focus',
    description: 'Axent primarily serves GCC government entities with strict brand and compliance requirements'
  },
  {
    icon: HiClock,
    title: 'Time Sensitivity',
    description: 'Client requests often arrive with tight turnarounds (48-72h for final deliverables)'
  }
];

const objectives = [
  'Scale design output without compromising quality or consistency',
  'Reduce dependency on freelancers with variable skill levels',
  'Meet aggressive timelines for government tenders and campaigns',
  'Maintain brand integrity across 2D packaging and 3D product visualization'
];

const successCriteria = [
  {
    metric: 'Client Satisfaction',
    target: 'CSAT ≥4.8/5',
    gradient: 'from-blue-400 to-cyan-500'
  },
  {
    metric: 'On-Time Delivery',
    target: '≥90% within SLA',
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    metric: 'First-Pass Approval',
    target: '≥80%',
    gradient: 'from-emerald-400 to-teal-500'
  },
  {
    metric: 'Rework Rate',
    target: '≤10%',
    gradient: 'from-orange-400 to-red-500'
  }
];

export default function ContextObjectives() {
  return (
    <section id="context-objectives" className="py-32 px-4 md:px-8 relative overflow-hidden">
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
            Context & Objectives
          </h2>
        </motion.div>

        {/* Business Context */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-2xl lg:text-3xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <HiOfficeBuilding className="w-8 h-8 text-blue-400" />
            Business Context
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-6">
            {context.map((item, index) => (
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
                <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 p-2.5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-full h-full text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Objectives */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-2xl lg:text-3xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <HiViewGrid className="w-8 h-8 text-purple-400" />
            Objectives
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.5,
              delay: 0.08,
              ease: [0.21, 0.47, 0.32, 0.98]
            }}
            className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm"
          >
            <div className="space-y-4">
              {objectives.map((objective, index) => (
                <div key={index} className="flex items-start gap-4">
                  <HiCheckCircle className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" />
                  <p className="text-white/80 leading-relaxed">{objective}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Success Criteria */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-2xl lg:text-3xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <HiChartBar className="w-8 h-8 text-emerald-400" />
            Success Criteria
          </motion.h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {successCriteria.map((criteria, index) => (
              <motion.div
                key={criteria.metric}
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
                <div className="relative h-full p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10 text-center">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${criteria.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                  <div className="relative">
                    <div className={`text-3xl font-bold bg-gradient-to-br ${criteria.gradient} bg-clip-text text-transparent mb-2`}>
                      {criteria.target}
                    </div>
                    <div className="text-sm text-white/60">
                      {criteria.metric}
                    </div>
                  </div>

                  {/* Bottom gradient line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${criteria.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
