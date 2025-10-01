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
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card
        variant="glass-dark"
        hover={false}
        className="relative overflow-hidden group h-full"
      >
        {/* Background gradient on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
        />

        {/* Icon with gradient background */}
        <div className="relative mb-6">
          <div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} bg-opacity-10 border border-white/10 group-hover:scale-110 transition-transform duration-300`}
          >
            <div className="text-4xl text-white">
              {icon}
            </div>
          </div>

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
          <h3 className={`text-2xl font-bold mb-3 text-white group-hover:bg-gradient-to-r ${gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
            {title}
          </h3>

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
          <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        </div>
      </Card>
    </motion.div>
  );
}
