'use client';

import { motion } from 'framer-motion';
import { HiUserGroup, HiClock, HiChartBar, HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';

const teamComposition = [
  {
    role: '2D Packaging Design Lead',
    fte: '1 FTE',
    skills: ['Adobe Creative Suite mastery', 'Dieline creation', 'Print production knowledge', 'Brand guideline adherence']
  },
  {
    role: '3D Product Designer',
    fte: '1 FTE',
    skills: ['Cinema 4D / Blender proficiency', 'Photorealistic rendering', 'Material & texture expertise', 'Lighting and composition']
  }
];

const kpis = [
  { metric: 'On-Time Delivery', target: '≥90%', gradient: 'from-blue-400 to-cyan-500' },
  { metric: 'First-Pass Approval', target: '80-85%', gradient: 'from-purple-400 to-pink-500' },
  { metric: 'Rework Rate', target: '≤10%', gradient: 'from-emerald-400 to-teal-500' },
  { metric: 'Vendor Re-Print', target: '≤2%', gradient: 'from-orange-400 to-red-500' }
];

const pros = [
  'Dedicated capacity, no contention with other clients',
  'Deep brand immersion and institutional knowledge',
  'Faster turnaround on iterative work',
  'Simplified invoice (fixed monthly fee)'
];

const considerations = [
  'Less flexible if volume drops significantly',
  'Axent fully manages daily priorities, tasks, briefs, and approvals',
  'Requires onboarding investment and brand training',
  'ExpoStudios handles recruitment, onboarding, payroll, benefits, and software licenses'
];

export default function OptionA() {
  return (
    <section id="option-a" className="py-32 px-4 md:px-8 relative overflow-hidden">
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
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <HiUserGroup className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-semibold text-blue-300">Option A</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Dedicated Team Model
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            2 Full-Time Equivalent (FTE) designers embedded with Axent
          </p>
        </motion.div>

        {/* Team Composition */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-2xl lg:text-3xl font-bold text-white mb-8"
          >
            Team Composition
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-6">
            {teamComposition.map((member, index) => (
              <motion.div
                key={member.role}
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
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-xl font-bold text-white">{member.role}</h4>
                      <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold">
                        {member.fte}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {member.skills.map((skill) => (
                        <div key={skill} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                          <span className="text-white/70 text-sm">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Working Hours */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm mb-16"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 p-2.5 flex items-center justify-center flex-shrink-0">
              <HiClock className="w-full h-full text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Working Hours & Capacity</h3>
              <p className="text-white/70 mb-4">
                Sunday - Thursday, 8 hours/day, Cairo Time (GMT+2)
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <div className="text-2xl font-bold text-blue-400 mb-1">160h</div>
                  <div className="text-sm text-white/60">Per designer/month</div>
                </div>
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <div className="text-2xl font-bold text-blue-400 mb-1">320h</div>
                  <div className="text-sm text-white/60">Total team/month</div>
                </div>
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <div className="text-2xl font-bold text-blue-400 mb-1">Axent-managed</div>
                  <div className="text-sm text-white/60">Day-to-day workflow</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* KPIs */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-2xl lg:text-3xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <HiChartBar className="w-8 h-8 text-blue-400" />
            Key Performance Indicators
          </motion.h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi, index) => (
              <motion.div
                key={kpi.metric}
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
                  <div className={`absolute inset-0 bg-gradient-to-br ${kpi.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                  <div className="relative">
                    <div className={`text-3xl font-bold bg-gradient-to-br ${kpi.gradient} bg-clip-text text-transparent mb-2`}>
                      {kpi.target}
                    </div>
                    <div className="text-sm text-white/60">{kpi.metric}</div>
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${kpi.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pros & Considerations */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pros */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 p-2 flex items-center justify-center">
                  <HiCheckCircle className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Pros</h3>
              </div>
              <div className="space-y-3">
                {pros.map((pro, index) => (
                  <motion.div
                    key={index}
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
                    <HiCheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">{pro}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Considerations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-yellow-500 p-2 flex items-center justify-center">
                  <HiExclamationCircle className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Considerations</h3>
              </div>
              <div className="space-y-3">
                {considerations.map((consideration, index) => (
                  <motion.div
                    key={index}
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
                    <HiExclamationCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">{consideration}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
