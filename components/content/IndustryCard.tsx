'use client';

import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Image from 'next/image';

interface IndustryCardProps {
  title: string;
  description: string;
  image: string;
  projectCount?: number;
  onClick?: () => void;
}

export default function IndustryCard({
  title,
  description,
  image,
  projectCount,
  onClick,
}: IndustryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        variant="glass-dark"
        hover={false}
        className="relative overflow-hidden group cursor-pointer h-full"
        onClick={onClick}
      >
        {/* Image */}
        <div className="relative h-48 mb-4 -mx-6 -mt-6 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-bg-primary)] to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Title */}
          <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[var(--accent-teal)] transition-colors">
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
        </div>
      </Card>
    </motion.div>
  );
}
