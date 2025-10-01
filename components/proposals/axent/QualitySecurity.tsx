'use client';

import { motion } from 'framer-motion';
import { HiCheckCircle, HiShieldCheck, HiLockClosed, HiDocumentText } from 'react-icons/hi';

const qualitySteps = [
  'Peer review before client handoff',
  'Brand guideline compliance check',
  'File format and naming convention validation',
  'Pre-flight checks for print-ready assets'
];

const securityMeasures = [
  {
    icon: HiLockClosed,
    title: 'Least-Privilege Access',
    description: 'Designers only access files and systems necessary for assigned tasks',
    gradient: 'from-blue-400 to-cyan-500'
  },
  {
    icon: HiShieldCheck,
    title: 'Watermarking',
    description: 'Draft deliverables watermarked until final approval and payment',
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    icon: HiDocumentText,
    title: 'NDA Coverage',
    description: 'All Expo designers sign NDAs covering Axent and client confidentiality',
    gradient: 'from-emerald-400 to-teal-500'
  }
];

const compliance = [
  {
    standard: 'ISO 27001 Alignment',
    description: 'Information security management best practices'
  },
  {
    standard: 'GDPR Compliance',
    description: 'Data protection and privacy for EU clients'
  },
  {
    standard: 'SOC 2 Type II (In Progress)',
    description: 'Security, availability, and confidentiality controls'
  }
];

export default function QualitySecurity() {
  return (
    <section id="quality-security" className="py-32 px-4 md:px-8 relative overflow-hidden">
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
            Quality & Security
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Rigorous quality assurance and enterprise-grade security measures
          </p>
        </motion.div>

        {/* Quality Assurance */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-2xl lg:text-3xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <HiCheckCircle className="w-8 h-8 text-emerald-400" />
            Quality Assurance (QA)
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20"
          >
            <p className="text-white/80 mb-4 leading-relaxed">
              <strong className="text-white">Quality management is Axent-managed.</strong> Axent reviews all deliverables and provides approvals based on internal standards.
            </p>
            <p className="text-white/80 mb-6 leading-relaxed">
              ExpoStudios can provide optional QA services as an additional offering, which includes:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {qualitySteps.map((step, index) => (
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
                  <span className="text-white/80 text-sm">{step}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Security Measures */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-2xl lg:text-3xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <HiShieldCheck className="w-8 h-8 text-blue-400" />
            Security Measures
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-6">
            {securityMeasures.map((measure, index) => (
              <motion.div
                key={measure.title}
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
                  <div className={`absolute inset-0 bg-gradient-to-br ${measure.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                  <div className="relative">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${measure.gradient} p-2.5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <measure.icon className="w-full h-full text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{measure.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{measure.description}</p>
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${measure.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Compliance */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-2xl lg:text-3xl font-bold text-white mb-8"
          >
            Compliance & Standards
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-6">
            {compliance.map((item, index) => (
              <motion.div
                key={item.standard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className="relative p-6 rounded-xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm"
              >
                <h4 className="text-white font-semibold mb-2">{item.standard}</h4>
                <p className="text-white/60 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Intellectual Property */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <HiDocumentText className="w-8 h-8 text-purple-400" />
            Intellectual Property Rights
          </h3>

          <div className="relative p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 p-2 flex items-center justify-center flex-shrink-0">
                  <HiCheckCircle className="w-full h-full text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white mb-2">
                    Full IP Assignment
                  </h4>
                  <p className="text-white/70 leading-relaxed text-sm">
                    All design deliverables and intellectual property are assigned to Axent upon
                    receipt of payment. Expo retains no rights to reproduce or resell client work.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.05]">
                <p className="text-white/60 text-xs italic">
                  Portfolio usage rights may be negotiated separately for marketing purposes, subject to client approval
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
