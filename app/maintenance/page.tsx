"use client";

import { motion } from "framer-motion";

export default function MaintenancePage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #121417 0%, #1A1D21 50%, #121417 100%)',
      }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #C3A355 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center z-10 px-6"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h1
            className="text-6xl md:text-8xl font-light tracking-widest mb-4"
            style={{
              background: 'linear-gradient(135deg, #C3A355 0%, #4A8E55 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            EXPOSTUDIOS
          </h1>
        </motion.div>

        {/* Maintenance Icon */}
        <motion.div
          initial={{ opacity: 0, rotate: -180 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <svg
            className="w-24 h-24 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: '#C3A355' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-light tracking-wider mb-4" style={{ color: '#E8ECEF' }}>
            Under Maintenance
          </h2>
          <p className="text-lg font-light max-w-md mx-auto mb-8" style={{ color: '#8A94A6' }}>
            We're currently performing scheduled maintenance to improve your experience.
            We'll be back online shortly.
          </p>

          {/* Progress Indicator */}
          <motion.div
            className="w-64 h-1 mx-auto rounded-full overflow-hidden"
            style={{ background: 'rgba(195, 163, 85, 0.2)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(135deg, #C3A355 0%, #4A8E55 100%)' }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </motion.div>

          {/* Contact */}
          <p className="text-sm mt-8" style={{ color: '#8A94A6' }}>
            For urgent inquiries, please contact{' '}
            <a
              href="mailto:support@expostudios.com"
              className="hover:opacity-80 transition-opacity"
              style={{ color: '#C3A355' }}
            >
              support@expostudios.com
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}