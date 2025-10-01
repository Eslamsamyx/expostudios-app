'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiHome, HiLightningBolt, HiPhotograph, HiMail } from 'react-icons/hi';

export default function NotFound() {
  const router = useRouter();

  const floatingShapes = [
    { color: '#00A6FB', size: 120, delay: 0, duration: 8, x: -100, y: -50 },
    { color: '#7C4DFF', size: 100, delay: 0.5, duration: 10, x: 100, y: 80 },
    { color: '#4A8E55', size: 90, delay: 1, duration: 9, x: -80, y: 100 },
    { color: '#22D3EE', size: 110, delay: 1.5, duration: 11, x: 120, y: -80 },
  ];

  const quickLinks = [
    { name: 'Home', href: '/en', icon: HiHome },
    { name: 'Services', href: '/en/services', icon: HiLightningBolt },
    { name: 'Portfolio', href: '/en/portfolio', icon: HiPhotograph },
    { name: 'Contact', href: '/en/contact', icon: HiMail },
  ];

  return (
    <div className="min-h-screen bg-[var(--dark-bg-primary)] relative overflow-hidden flex items-center justify-center px-4">
      {/* Animated Background Shapes */}
      {floatingShapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full opacity-10"
          style={{
            width: shape.size,
            height: shape.size,
            background: `radial-gradient(circle, ${shape.color} 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [shape.x, -shape.x, shape.x],
            y: [shape.y, -shape.y, shape.y],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-8"
        >
          <h1 className="text-[150px] md:text-[250px] font-bold leading-none gradient-text-service">
            404
          </h1>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-5xl font-bold text-white mb-4"
        >
          Lost in the Experience?
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-white/70 mb-12 max-w-2xl mx-auto"
        >
          This page doesn&apos;t exist... yet. But we can help you find your way back to something extraordinary.
        </motion.p>

        {/* Quick Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.name}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <Link
                href={link.href}
                className="glass-dark rounded-xl p-6 block hover:bg-white/10 transition-all group text-center"
              >
                <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform">
                  <link.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-white font-medium">{link.name}</div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => router.push('/en')}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg bg-gradient-to-r from-[var(--consult)] to-[var(--amplify)] text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Go Home
          </button>

          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg glass-dark text-white hover:bg-white/10 transition-all"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go Back
          </button>
        </motion.div>

        {/* Easter Egg Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 text-white/40 text-sm"
        >
          &ldquo;Every great experience starts with getting a little lost.&rdquo;
        </motion.p>
      </div>

      {/* Gradient Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--dark-bg-primary)] to-transparent pointer-events-none" />
    </div>
  );
}
