'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { HiHome, HiLightningBolt, HiPhotograph, HiMail } from 'react-icons/hi';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface NotFoundClientProps {
  translations: {
    title: string;
    description: string;
    button: string;
    goBack: string;
    quote: string;
  };
  navTranslations: {
    home: string;
    services: string;
    portfolio: string;
    contact: string;
  };
}

export default function NotFoundClient({ translations, navTranslations }: NotFoundClientProps) {
  const router = useRouter();
  const locale = useLocale();

  const quickLinks = [
    { name: navTranslations.home, href: `/${locale}`, icon: HiHome },
    { name: navTranslations.services, href: `/${locale}/services`, icon: HiLightningBolt },
    { name: navTranslations.portfolio, href: `/${locale}/portfolio`, icon: HiPhotograph },
    { name: navTranslations.contact, href: `/${locale}/contact`, icon: HiMail },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-indigo-950 relative overflow-hidden flex items-center justify-center px-4 pt-20">
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-8"
        >
          <h1 className="text-[150px] md:text-[250px] font-bold leading-none bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
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
          {translations.title}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-white/70 mb-12 max-w-2xl mx-auto"
        >
          {translations.description}
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
            onClick={() => router.push(`/${locale}`)}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all"
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
            {translations.button}
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
            {translations.goBack}
          </button>
        </motion.div>

        {/* Easter Egg Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 text-white/40 text-sm"
        >
          {translations.quote}
        </motion.p>
      </div>

    </div>
    <Footer />
    </>
  );
}
