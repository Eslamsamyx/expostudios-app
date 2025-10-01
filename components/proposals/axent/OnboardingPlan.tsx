'use client';

import { motion } from 'framer-motion';
import { HiCheckCircle } from 'react-icons/hi';

const timeline = [
  {
    week: 'Week 0',
    title: 'Pre-Kickoff',
    gradient: 'from-blue-400 to-cyan-500',
    activities: [
      'Contract signed and SOW finalized',
      'Expo assigns 2D and 3D designers (Option A) or activates talent pool (Option B)',
      'Axent provides brand guidelines, past work samples, and access credentials'
    ]
  },
  {
    week: 'Week 1',
    title: 'Kickoff & Setup',
    gradient: 'from-purple-400 to-pink-500',
    activities: [
      'Kickoff call: Introduce team, review brand standards, discuss workflow preferences',
      'Setup collaboration tools (Jira/Trello/ClickUp, Slack/Teams, file sharing)',
      'First test assignment (e.g., one packaging mockup) to calibrate expectations'
    ]
  },
  {
    week: 'Week 2',
    title: 'Ramp-Up',
    gradient: 'from-emerald-400 to-teal-500',
    activities: [
      'Process 2-3 real client requests',
      'Establish review cadence and feedback loop',
      'Fine-tune brief templates and asset definitions (Option B)'
    ]
  },
  {
    week: 'Week 3',
    title: 'Optimization',
    gradient: 'from-orange-400 to-red-500',
    activities: [
      'Run first retrospective: what is working, what needs adjustment',
      'Optimize task handoff and review turnaround',
      'Address any tool or process friction points'
    ]
  },
  {
    week: 'Week 4',
    title: 'Full Production',
    gradient: 'from-indigo-400 to-purple-500',
    activities: [
      'Team operates at full capacity',
      'Monthly reporting cadence begins',
      'Transition to steady-state workflow with regular check-ins'
    ]
  }
];

export default function OnboardingPlan() {
  return (
    <section id="onboarding" className="py-32 px-4 md:px-8 relative overflow-hidden">
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
            Onboarding Plan
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            4-week structured ramp-up from contract signing to full production
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-indigo-400 opacity-20" />

          <div className="space-y-8">
            {timeline.map((phase, index) => (
              <motion.div
                key={phase.week}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className="group relative"
              >
                <div className="flex gap-6">
                  {/* Week indicator */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${phase.gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full rounded-xl bg-gray-900 flex items-center justify-center">
                        <span className={`text-sm font-bold bg-gradient-to-br ${phase.gradient} bg-clip-text text-transparent`}>
                          {phase.week}
                        </span>
                      </div>
                    </div>
                    {/* Connector dot */}
                    <div className={`absolute top-1/2 -right-3 w-2 h-2 rounded-full bg-gradient-to-br ${phase.gradient}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10">
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${phase.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                      <div className="relative">
                        {/* Title */}
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {phase.title}
                        </h3>

                        {/* Activities */}
                        <div className="space-y-3">
                          {phase.activities.map((activity, actIndex) => (
                            <motion.div
                              key={actIndex}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.08 + actIndex * 0.05,
                                ease: [0.21, 0.47, 0.32, 0.98]
                              }}
                              className="flex items-start gap-3"
                            >
                              <HiCheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 bg-gradient-to-br ${phase.gradient} bg-clip-text text-transparent`} />
                              <span className="text-white/70 text-sm leading-relaxed">
                                {activity}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom gradient line */}
                      <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${phase.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Success Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.5,
            delay: 0.4,
            ease: [0.21, 0.47, 0.32, 0.98]
          }}
          className="mt-12 relative p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 p-2 flex items-center justify-center flex-shrink-0">
              <HiCheckCircle className="w-full h-full text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-2">
                Success Milestone
              </h4>
              <p className="text-white/70 leading-relaxed text-sm">
                By Week 4, both parties should have clarity on capacity expectations, review cadence,
                and first-pass approval rates. This becomes the baseline for ongoing performance tracking
                and continuous improvement.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
