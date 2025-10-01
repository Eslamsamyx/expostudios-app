'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';

interface ServiceCTAProps {
  title: string;
  description: string;
  buttonText: string;
  link: string;
  color: string;
}

export default function ServiceCTA({
  title,
  description,
  buttonText,
  link,
  color,
}: ServiceCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-dark rounded-2xl p-8 md:p-12 border relative overflow-hidden"
      style={{
        borderColor: `${color}40`,
        background: `linear-gradient(135deg, ${color}10 0%, transparent 100%)`,
      }}
    >
      {/* Background Pattern */}
      <div
        className="absolute top-0 right-0 w-64 h-64 opacity-5 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {title}
        </h3>
        <p className="text-xl text-white/70 mb-8 max-w-2xl">{description}</p>

        <Link href={link}>
          <motion.button
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg text-lg font-medium text-white shadow-lg hover:shadow-xl transition-shadow"
            style={{
              background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {buttonText}
            <HiArrowRight className="w-5 h-5" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
