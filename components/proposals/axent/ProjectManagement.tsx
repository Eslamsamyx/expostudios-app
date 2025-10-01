'use client';

import { motion } from 'framer-motion';
import { HiClipboardList, HiCalendar, HiChatAlt, HiDocumentReport } from 'react-icons/hi';

const intakeTools = [
  {
    name: 'Jira',
    description: 'Enterprise project tracking with custom workflows'
  },
  {
    name: 'Trello',
    description: 'Visual board-based task management'
  },
  {
    name: 'ClickUp',
    description: 'All-in-one productivity platform'
  }
];

const cadence = [
  {
    frequency: 'Daily',
    activity: 'Standup (async Slack/Teams update)',
    gradient: 'from-blue-400 to-cyan-500'
  },
  {
    frequency: 'Weekly',
    activity: 'Pipeline review and priority alignment',
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    frequency: 'Monthly',
    activity: 'Performance review and retrospective',
    gradient: 'from-emerald-400 to-teal-500'
  }
];

const channels = [
  {
    icon: HiChatAlt,
    name: 'Slack / Microsoft Teams',
    purpose: 'Real-time communication and quick questions',
    gradient: 'from-blue-400 to-cyan-500'
  },
  {
    icon: HiClipboardList,
    name: 'Project Management Tool',
    purpose: 'Task tracking, file sharing, and status updates',
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    icon: HiCalendar,
    name: 'Calendar Invites',
    purpose: 'Scheduled reviews and retrospectives',
    gradient: 'from-emerald-400 to-teal-500'
  }
];

const reportingMetrics = [
  'Total assets delivered (or hours logged for Option A)',
  'On-time delivery rate (%)',
  'First-pass approval rate (%)',
  'Rework requests and reasons',
  'Average turnaround time by asset type',
  'Client satisfaction score (if collected)'
];

export default function ProjectManagement() {
  return (
    <section id="project-management" className="py-32 px-4 md:px-8 relative overflow-hidden">
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
            Project Management
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Structured workflows, communication channels, and reporting cadence
          </p>
        </motion.div>

        {/* Intake Process */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-2xl lg:text-3xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <HiClipboardList className="w-8 h-8 text-blue-400" />
            Intake Process
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm mb-6"
          >
            <p className="text-white/70 leading-relaxed mb-6">
              Requests submitted via Axent preferred tool. Expo can adapt to:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {intakeTools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                    ease: [0.21, 0.47, 0.32, 0.98]
                  }}
                  className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]"
                >
                  <h4 className="text-white font-semibold mb-1">{tool.name}</h4>
                  <p className="text-white/60 text-sm">{tool.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
          >
            <p className="text-white/80 text-sm">
              <strong className="text-white">Each request includes:</strong> Brief description, reference files,
              target audience, deadline, brand guidelines link, and success criteria.
            </p>
          </motion.div>
        </div>

        {/* Cadence */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-2xl lg:text-3xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <HiCalendar className="w-8 h-8 text-purple-400" />
            Review Cadence
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-6">
            {cadence.map((item, index) => (
              <motion.div
                key={item.frequency}
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
                <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10 h-full text-center">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                  <div className="relative">
                    <div className={`text-3xl font-bold bg-gradient-to-br ${item.gradient} bg-clip-text text-transparent mb-3`}>
                      {item.frequency}
                    </div>
                    <p className="text-white/70 text-sm">{item.activity}</p>
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Communication Channels */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-2xl lg:text-3xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <HiChatAlt className="w-8 h-8 text-emerald-400" />
            Communication Channels
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-6">
            {channels.map((channel, index) => (
              <motion.div
                key={channel.name}
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
                  <div className={`absolute inset-0 bg-gradient-to-br ${channel.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                  <div className="relative">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${channel.gradient} p-2.5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <channel.icon className="w-full h-full text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{channel.name}</h4>
                    <p className="text-white/60 text-sm">{channel.purpose}</p>
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${channel.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Monthly Reporting */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-2xl lg:text-3xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <HiDocumentReport className="w-8 h-8 text-orange-400" />
            Monthly Reporting Pack
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm"
          >
            <p className="text-white/70 mb-6 leading-relaxed">
              Expo provides monthly reporting tools and metrics for Axent to track performance, including:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {reportingMetrics.map((metric, index) => (
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
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{metric}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
