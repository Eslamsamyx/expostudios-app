'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

interface ProcessStep {
  title: string;
  description: string;
  color: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--consult)] via-[var(--create)] via-[var(--build)] to-[var(--amplify)]" />

      {/* Steps */}
      <div className={`grid grid-cols-1 md:grid-cols-${steps.length} gap-8 md:gap-4`}>
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative"
          >
            {/* Step Number Circle */}
            <div className="flex items-center justify-center mb-4">
              <div
                className="relative w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl z-10"
                style={{
                  background: step.color,
                  boxShadow: `0 0 20px ${step.color}40`,
                }}
              >
                {index + 1}
              </div>
            </div>

            {/* Content */}
            <div className="text-center">
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: step.color }}
              >
                {step.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Arrow (not on last step) */}
            {index < steps.length - 1 && (
              <div className="hidden md:flex absolute top-8 left-full w-full items-center justify-center text-white/30">
                <span className="text-2xl">{isRTL ? '←' : '→'}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
