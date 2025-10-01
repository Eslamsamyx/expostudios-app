'use client';

import { motion } from 'framer-motion';
import { HiCurrencyDollar, HiCalendar, HiDocumentText, HiSun } from 'react-icons/hi';

const billingTerms = [
  {
    icon: HiCurrencyDollar,
    title: 'Currency & Invoicing',
    details: [
      'All fees quoted in USD',
      'Invoices issued monthly in advance',
      'Payment due within 30 days of invoice date',
      'Late payments subject to 1.5% monthly fee'
    ],
    gradient: 'from-blue-400 to-cyan-500'
  },
  {
    icon: HiCalendar,
    title: 'Contract Term',
    details: [
      '3-month pilot period recommended',
      'Auto-renews for 1-year terms thereafter',
      'Pricing locked for annual commitment',
      'Subject to annual CPI adjustment'
    ],
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    icon: HiDocumentText,
    title: 'Termination',
    details: [
      '30-day written notice required',
      'No termination during active projects',
      'Final invoice covers work through notice period',
      'Unused assets/hours non-refundable'
    ],
    gradient: 'from-emerald-400 to-teal-500'
  }
];

const holidays = [
  {
    holiday: 'UAE National Holidays',
    impact: 'No coverage during official UAE public holidays'
  },
  {
    holiday: 'Eid al-Fitr & Eid al-Adha',
    impact: '3-5 days off (dates vary annually)'
  },
  {
    holiday: 'New Year\'s Day',
    impact: 'January 1st (team unavailable)'
  },
  {
    holiday: 'Christmas Period',
    impact: 'Reduced capacity Dec 24-26 (optional coverage available)'
  }
];

export default function Commercials() {
  return (
    <section id="commercials" className="py-32 px-4 md:px-8 relative overflow-hidden">
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
            Commercial Terms
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Transparent billing, flexible terms, and clear expectations
          </p>
        </motion.div>

        {/* Billing Terms */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-3 gap-6">
            {billingTerms.map((term, index) => (
              <motion.div
                key={term.title}
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
                <div className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10 h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${term.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                  <div className="relative">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${term.gradient} p-3 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <term.icon className="w-full h-full text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-4">
                      {term.title}
                    </h3>

                    {/* Details */}
                    <div className="space-y-2">
                      {term.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${term.gradient} mt-2 flex-shrink-0`} />
                          <span className="text-white/70 text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom gradient line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${term.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pricing Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-16"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 p-2 flex items-center justify-center flex-shrink-0">
              <HiCurrencyDollar className="w-full h-full text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-white mb-2">
                Pricing Details
              </h4>
              <p className="text-white/70 leading-relaxed text-sm">
                Detailed pricing for both Option A (Dedicated Team) and Option B (DaaS Packages) will be
                provided in a separate commercial annex. Rates are competitive with regional market standards
                and include all overhead, management, and tool costs.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Holidays & Coverage */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-2xl lg:text-3xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <HiSun className="w-8 h-8 text-orange-400" />
            Holidays & Coverage
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden"
          >
            {/* Table Header */}
            <div className="grid grid-cols-2 gap-4 p-6 border-b border-white/[0.05] bg-white/[0.02]">
              <div className="text-white font-bold">Holiday</div>
              <div className="text-white font-bold">Coverage Impact</div>
            </div>

            {/* Table Rows */}
            {holidays.map((item, index) => (
              <motion.div
                key={item.holiday}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className={`grid grid-cols-2 gap-4 p-6 border-b border-white/[0.05] ${index % 2 === 0 ? 'bg-white/[0.01]' : ''}`}
              >
                <div className="text-white/80 font-medium">{item.holiday}</div>
                <div className="text-white/60 text-sm">{item.impact}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.32, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-6 p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]"
          >
            <p className="text-xs text-white/60 italic">
              Note: Emergency coverage during holidays may be arranged at a premium rate (1.5x) with 48h advance notice
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
