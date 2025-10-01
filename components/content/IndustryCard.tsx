'use client';

import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { ReactNode } from 'react';

interface IndustryCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  gradient: string;
  projectCount?: number;
}

export default function IndustryCard({
  title,
  description,
  icon,
  gradient,
  projectCount,
}: IndustryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3,  }}
      className="h-full"
      style={{
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
      }}
    >
      <div
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
        className="h-full"
      >
        <Card
          variant="glass-dark"
          hover={false}
          className="relative overflow-hidden h-full"
        >
        {/* Background gradient on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.05 }}
          transition={{ duration: 0.3,  }}
        />

        {/* Icon with gradient background */}
        <div className="relative mb-6">
          <motion.div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} bg-opacity-10 border border-white/10`}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3,  }}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div className="text-4xl text-white">
              {icon}
            </div>
          </motion.div>

          {/* Decorative dot grid */}
          <div
            className="absolute -right-4 -bottom-4 w-24 h-24 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '16px 16px',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Title */}
          <motion.h3
            className="text-2xl font-bold mb-3 text-white"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2,  }}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {title}
          </motion.h3>

          {/* Description */}
          <p className="text-white/70 leading-relaxed mb-4">
            {description}
          </p>

          {/* Project Count */}
          {projectCount !== undefined && (
            <div className="flex items-center text-sm text-white/50">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
              </svg>
              <span>
                {projectCount} {projectCount === 1 ? 'Project' : 'Projects'}
              </span>
            </div>
          )}

          {/* Bottom gradient line */}
          <motion.div
            className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradient}`}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3,  }}
          />
        </div>
      </Card>
      </div>
    </motion.div>
  );
}
