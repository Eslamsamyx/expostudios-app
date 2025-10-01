'use client';

import { motion } from 'framer-motion';
import { ProcessStep } from '@/lib/types/services';

interface ServiceProcessFlowProps {
  steps: ProcessStep[];
  color: string;
}

export default function ServiceProcessFlow({
  steps,
  color,
}: ServiceProcessFlowProps) {
  return (
    <div className="relative">
      {/* Connection Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/10 hidden md:block" />

      {/* Steps */}
      <div className="space-y-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative"
          >
            <div className="flex gap-6">
              {/* Step Number */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 glass-dark border"
                style={{
                  background: `linear-gradient(135deg, ${color}40 0%, ${color}20 100%)`,
                  borderColor: `${color}80`,
                }}
              >
                <span
                  className="text-2xl font-bold"
                  style={{ color }}
                >
                  {step.order}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 glass-dark rounded-xl p-6 border border-white/10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                  <h4 className="text-xl font-bold text-white">{step.title}</h4>
                  {step.duration && (
                    <span className="text-sm text-white/60 mt-1 md:mt-0">
                      {step.duration}
                    </span>
                  )}
                </div>

                <p className="text-white/70 mb-4">{step.description}</p>

                {/* Deliverables */}
                {step.deliverables.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-white/80">
                      Deliverables:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {step.deliverables.map((deliverable, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-sm glass-dark border"
                          style={{
                            borderColor: `${color}40`,
                            color: 'white',
                          }}
                        >
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
