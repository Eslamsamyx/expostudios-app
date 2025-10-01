'use client';

import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { ReactNode } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  service: 'consult' | 'create' | 'build' | 'amplify';
  onClick?: () => void;
}

const serviceColors = {
  consult: '#00A6FB',
  create: '#7C4DFF',
  build: '#4A8E55',
  amplify: '#22D3EE',
};

const serviceGradients = {
  consult: 'from-[#00A6FB]/20 to-transparent',
  create: 'from-[#7C4DFF]/20 to-transparent',
  build: 'from-[#4A8E55]/20 to-transparent',
  amplify: 'from-[#22D3EE]/20 to-transparent',
};

export default function ServiceCard({
  title,
  description,
  icon,
  service,
  onClick,
}: ServiceCardProps) {
  const color = serviceColors[service];
  const gradient = serviceGradients[service];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      style={{
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
      }}
    >
      <Card
        variant="glass-dark"
        hover={false}
        className="relative overflow-hidden group"
        onClick={onClick}
      >
        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          {icon && (
            <div
              className="w-16 h-16 rounded-lg flex items-center justify-center mb-4"
              style={{
                background: `linear-gradient(135deg, ${color}20 0%, ${color}40 100%)`,
                border: `1px solid ${color}40`,
              }}
            >
              <div style={{ color }}>{icon}</div>
            </div>
          )}

          {/* Title */}
          <h3
            className="text-2xl font-bold mb-3"
            style={{ color }}
          >
            {title}
          </h3>

          {/* Description */}
          <p className="text-white/70 leading-relaxed">
            {description}
          </p>

          {/* Arrow */}
          <div className="mt-6 flex items-center text-white/50 group-hover:text-white transition-colors">
            <span className="text-sm font-medium">Learn More</span>
            <svg
              className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
