'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Hero from './content/Hero';
import ServiceCard from './content/ServiceCard';
import ProcessTimeline from './content/ProcessTimeline';
import IndustryCard from './content/IndustryCard';
import StatsCounter from './content/StatsCounter';
import Button from './ui/Button';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { motion } from 'framer-motion';
import { HiOfficeBuilding, HiLightBulb, HiShieldCheck, HiShoppingCart, HiAcademicCap } from 'react-icons/hi';

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const services = [
    {
      key: 'consult',
      service: 'consult' as const,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      key: 'create',
      service: 'create' as const,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
    {
      key: 'build',
      service: 'build' as const,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      key: 'amplify',
      service: 'amplify' as const,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
    },
  ];

  const processSteps = [
    {
      title: t('process.steps.research'),
      description: t('services.consult.description'),
      color: '#00A6FB',
    },
    {
      title: t('process.steps.design'),
      description: t('services.create.description'),
      color: '#7C4DFF',
    },
    {
      title: t('process.steps.production'),
      description: t('services.build.description'),
      color: '#4A8E55',
    },
    {
      title: t('process.steps.launch'),
      description: t('services.amplify.description'),
      color: '#22D3EE',
    },
  ];

  const stats = [
    { value: 150, label: t('stats.projects'), suffix: '+' },
    { value: 100, label: t('stats.clients'), suffix: '+' },
    { value: 12, label: t('stats.countries'), suffix: '+' },
    { value: 10, label: t('stats.experience'), suffix: '+' },
  ];

  const industries = [
    {
      key: 'exhibitions',
      icon: <HiOfficeBuilding />,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      key: 'experienceCenters',
      icon: <HiLightBulb />,
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      key: 'government',
      icon: <HiShieldCheck />,
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      key: 'retail',
      icon: <HiShoppingCart />,
      gradient: 'from-orange-500 to-red-600'
    },
    {
      key: 'museums',
      icon: <HiAcademicCap />,
      gradient: 'from-yellow-500 to-amber-600'
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section - #0A0A0F to slate-950 */}
      <div className="relative bg-gradient-to-b from-[#0A0A0F] to-slate-950 pt-24 md:pt-32">
        <Hero
          title={t('hero.title')}
          subtitle={t('hero.subtitle')}
          description={t('hero.description')}
          primaryCta={{
            text: t('hero.cta.primary'),
            onClick: () => router.push(`/${locale}/contact`),
          }}
          secondaryCta={{
            text: t('hero.cta.secondary'),
            onClick: () => router.push(`/${locale}/about`),
          }}
        />
      </div>

      {/* Services Section - slate-950 to blue-950 */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-blue-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-white to-indigo-200 bg-clip-text text-transparent">
              {t('services.title')}
            </h2>
            <p className="text-xl text-slate-300">
              {t('services.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard
                  title={t(`services.${service.key}.name`)}
                  description={t(`services.${service.key}.description`)}
                  icon={service.icon}
                  service={service.service}
                  onClick={() => router.push(`/${locale}/services/${service.key}`)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - blue-950 to purple-950 */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-950 to-purple-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-200 via-purple-200 to-white bg-clip-text text-transparent">
              {t('process.title')}
            </h2>
          </motion.div>

          <ProcessTimeline steps={processSteps} />
        </div>
      </section>

      {/* Industries Section - purple-950 to indigo-950 */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-950 to-indigo-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-200 via-indigo-200 to-white bg-clip-text text-transparent">
              {t('industries.title')}
            </h2>
            <p className="text-xl text-slate-300">
              {t('industries.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <IndustryCard
                  title={t(`industries.${industry.key}.name`)}
                  description={t(`industries.${industry.key}.description`)}
                  icon={industry.icon}
                  gradient={industry.gradient}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - indigo-950 to slate-900 */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <StatsCounter stats={stats} />
        </div>
      </section>

      {/* CTA Section - slate-900 to slate-950 */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-200 via-purple-200 to-white bg-clip-text text-transparent">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              {t('cta.subtitle')}
            </p>
            <Button
              size="lg"
              onClick={() => router.push(`/${locale}/contact`)}
            >
              {t('cta.button')}
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
