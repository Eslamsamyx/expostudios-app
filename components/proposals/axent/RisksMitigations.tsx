'use client';

import { motion } from 'framer-motion';
import { HiExclamation, HiShieldCheck } from 'react-icons/hi';

const risks = [
  {
    risk: 'Pipeline Volatility',
    description: 'Axent client demand fluctuates unpredictably',
    mitigationDedicated: 'Fixed capacity encourages pipeline planning; unused hours can shift to lower-priority backlog work',
    mitigationDaas: 'Asset rollover (max 50%) smooths month-to-month variance; overage billing handles spikes',
    gradient: 'from-blue-400 to-cyan-500'
  },
  {
    risk: 'Review Bottlenecks',
    description: 'Axent stakeholders delayed in feedback, blocking designers',
    mitigationDedicated: 'Weekly pipeline review flags stalled tasks; team can pivot to other briefs in queue',
    mitigationDaas: 'SLA clock pauses during client review; Expo proactively escalates delays after 3 business days',
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    risk: 'Brand Immersion Gap',
    description: 'Designers unfamiliar with Axent multi-client brand nuances',
    mitigationDedicated: 'Dedicated team builds institutional knowledge over time; quarterly brand refresh sessions',
    mitigationDaas: 'Comprehensive onboarding deck and brand portal; senior designer reviews all first-time client work',
    gradient: 'from-emerald-400 to-teal-500'
  }
];

export default function RisksMitigations() {
  return (
    <section id="risks-mitigations" className="py-32 px-4 md:px-8 relative overflow-hidden">
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
            Risks & Mitigations
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Proactive identification and strategic mitigation of potential challenges
          </p>
        </motion.div>

        {/* Risks */}
        <div className="space-y-8">
          {risks.map((item, index) => (
            <motion.div
              key={item.risk}
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
              <div className="relative rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10">
                {/* Header */}
                <div className="p-6 border-b border-white/[0.05] bg-white/[0.02]">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.gradient} p-2.5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <HiExclamation className="w-full h-full text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {item.risk}
                      </h3>
                      <p className="text-white/60 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mitigations */}
                <div className="grid lg:grid-cols-2 gap-6 p-6">
                  {/* Dedicated Team Mitigation */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.08 + 0.1,
                      ease: [0.21, 0.47, 0.32, 0.98]
                    }}
                    className="relative p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <HiShieldCheck className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                      <h4 className="text-lg font-bold text-white">
                        Option A Mitigation
                      </h4>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {item.mitigationDedicated}
                    </p>
                  </motion.div>

                  {/* DaaS Mitigation */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.08 + 0.15,
                      ease: [0.21, 0.47, 0.32, 0.98]
                    }}
                    className="relative p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <HiShieldCheck className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" />
                      <h4 className="text-lg font-bold text-white">
                        Option B Mitigation
                      </h4>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {item.mitigationDaas}
                    </p>
                  </motion.div>
                </div>

                {/* Bottom gradient line */}
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Context */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.5,
            delay: 0.24,
            ease: [0.21, 0.47, 0.32, 0.98]
          }}
          className="mt-12 relative p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 p-2 flex items-center justify-center flex-shrink-0">
              <HiShieldCheck className="w-full h-full text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-white mb-2">
                Continuous Risk Management
              </h4>
              <p className="text-white/70 leading-relaxed text-sm">
                Monthly retrospectives will surface new risks and refine mitigation strategies.
                Both parties commit to transparent communication and collaborative problem-solving
                throughout the engagement lifecycle.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
