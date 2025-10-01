'use client';

import { motion } from 'framer-motion';
import { HiUserGroup, HiCube, HiDocumentText, HiTrendingUp } from 'react-icons/hi';

const dedicatedGovernance = [
  {
    aspect: 'Day-to-Day Management',
    responsibility: 'Axent',
    details: 'Priorities, task assignments, briefs, approvals, direct supervision, and quality review'
  },
  {
    aspect: 'Talent & HR',
    responsibility: 'Expo',
    details: 'Recruitment, onboarding, performance management, payroll, benefits administration'
  },
  {
    aspect: 'Tools & Software',
    responsibility: 'Shared',
    details: 'Axent provides PM tool access; Expo provides design software licenses (Adobe, Figma, etc.)'
  },
  {
    aspect: 'Quality Assurance',
    responsibility: 'Axent',
    details: 'Quality review and approvals (Expo QA available as additional service if requested)'
  }
];

const capacityAmendment = [
  {
    step: '1',
    title: 'Request Submitted',
    description: 'Axent submits written request to increase/decrease FTE count',
    gradient: 'from-blue-400 to-cyan-500'
  },
  {
    step: '2',
    title: 'Expo Assessment',
    description: 'Expo evaluates feasibility and timeline (typically 2-4 weeks for increase)',
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    step: '3',
    title: 'Commercial Update',
    description: 'Revised pricing and contract addendum issued',
    gradient: 'from-emerald-400 to-teal-500'
  },
  {
    step: '4',
    title: 'Implementation',
    description: 'New resources onboarded or offboarded per agreed timeline',
    gradient: 'from-orange-400 to-red-500'
  }
];

const daasGovernance = [
  {
    aspect: 'Request Management',
    responsibility: 'Expo',
    details: 'Intake, triage, assignment to appropriate specialist from talent pool'
  },
  {
    aspect: 'Asset Sizing',
    responsibility: 'Expo',
    details: 'Determine asset count based on complexity (with client confirmation if ambiguous)'
  },
  {
    aspect: 'SLA Enforcement',
    responsibility: 'Expo',
    details: 'Track turnaround times, escalate delays, ensure package-tier compliance'
  },
  {
    aspect: 'Monthly Reconciliation',
    responsibility: 'Shared',
    details: 'Review asset consumption, rollover balance, and overage charges'
  }
];

export default function Governance() {
  return (
    <section id="governance" className="py-32 px-4 md:px-8 relative overflow-hidden">
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
            Governance Model
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Clear roles, responsibilities, and change management processes
          </p>
        </motion.div>

        {/* Option A: Dedicated Team Governance */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 p-2 flex items-center justify-center">
              <HiUserGroup className="w-full h-full text-white" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white">
              Option A: Dedicated Team Governance
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden mb-8"
          >
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 p-6 border-b border-white/[0.05] bg-white/[0.02]">
              <div className="text-white font-bold">Aspect</div>
              <div className="text-white font-bold text-center">Responsibility</div>
              <div className="text-white font-bold">Details</div>
            </div>

            {/* Table Rows */}
            {dedicatedGovernance.map((item, index) => (
              <motion.div
                key={item.aspect}
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
                <div className="text-white font-semibold">{item.aspect}</div>
                <div className="text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    item.responsibility === 'Axent'
                      ? 'bg-blue-500/20 text-blue-300'
                      : item.responsibility === 'Expo'
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {item.responsibility}
                  </span>
                </div>
                <div className="text-white/70 text-sm">{item.details}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Capacity Amendment Process */}
          <div>
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-xl font-bold text-white mb-6 flex items-center gap-3"
            >
              <HiTrendingUp className="w-6 h-6 text-blue-400" />
              Capacity Amendment Process
            </motion.h4>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {capacityAmendment.map((step, index) => (
                <motion.div
                  key={step.step}
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
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                    <div className="relative">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-white font-bold">{step.step}</span>
                      </div>
                      <h5 className="text-white font-bold mb-2 text-sm">{step.title}</h5>
                      <p className="text-white/60 text-xs leading-relaxed">{step.description}</p>
                    </div>

                    <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Option B: DaaS Governance */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 p-2 flex items-center justify-center">
              <HiCube className="w-full h-full text-white" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white">
              Option B: DaaS Governance
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden mb-8"
          >
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 p-6 border-b border-white/[0.05] bg-white/[0.02]">
              <div className="text-white font-bold">Aspect</div>
              <div className="text-white font-bold text-center">Responsibility</div>
              <div className="text-white font-bold">Details</div>
            </div>

            {/* Table Rows */}
            {daasGovernance.map((item, index) => (
              <motion.div
                key={item.aspect}
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
                <div className="text-white font-semibold">{item.aspect}</div>
                <div className="text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    item.responsibility === 'Expo'
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {item.responsibility}
                  </span>
                </div>
                <div className="text-white/70 text-sm">{item.details}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Change Request Process */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 p-2 flex items-center justify-center flex-shrink-0">
                <HiDocumentText className="w-full h-full text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-white mb-2">
                  Change Request (CR) Process
                </h4>
                <p className="text-white/70 leading-relaxed text-sm mb-4">
                  For scope changes or package tier upgrades:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                    <div className="text-purple-400 font-bold mb-1">1. Submit CR</div>
                    <p className="text-white/60 text-xs">Client submits formal change request via PM tool</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                    <div className="text-purple-400 font-bold mb-1">2. Impact Assessment</div>
                    <p className="text-white/60 text-xs">Expo evaluates asset count, timeline, and pricing impact</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                    <div className="text-purple-400 font-bold mb-1">3. Approval & Execute</div>
                    <p className="text-white/60 text-xs">Client approves revised terms; work proceeds</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
