'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ServiceDetail } from '@/lib/types/services';
import { useTranslations } from 'next-intl';
import IconBox from '../shared/IconBox';
import {
  HiLightBulb,
  HiColorSwatch,
  HiCode,
  HiSpeakerphone,
  HiArrowRight,
} from 'react-icons/hi';

interface ServiceDetailCardProps {
  service: ServiceDetail;
  index: number;
}

const iconMap = {
  HiLightBulb: HiLightBulb,
  HiColorSwatch: HiColorSwatch,
  HiCode: HiCode,
  HiSpeakerphone: HiSpeakerphone,
};

export default function ServiceDetailCard({
  service,
  index,
}: ServiceDetailCardProps) {
  const t = useTranslations('services');
  const IconComponent = iconMap[service.icon as keyof typeof iconMap];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group"
    >
      <Link
        href={`/services/${service.slug}`}
        className="block glass-dark rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all hover:shadow-2xl relative overflow-hidden"
      >
        {/* Background gradient on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${service.color}10 0%, transparent 100%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className="mb-6">
            <IconBox
              icon={IconComponent && <IconComponent />}
              color={service.color}
              size="lg"
            />
          </div>

          {/* Title */}
          <h3
            className="text-3xl font-bold mb-2"
            style={{
              background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}CC 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {service.name}
          </h3>

          {/* Tagline */}
          <p className="text-xl text-white/90 font-medium mb-4">
            {service.tagline}
          </p>

          {/* Description */}
          <p className="text-white/70 mb-6 line-clamp-3">
            {service.description}
          </p>

          {/* Features Preview */}
          <div className="space-y-2 mb-6">
            {service.features.slice(0, 3).map((feature) => (
              <div key={feature.id} className="flex items-start gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: service.color }}
                />
                <span className="text-white/80 text-sm">{feature.title}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-white group-hover:gap-3 transition-all">
            <span className="font-medium">{t('viewDetails')}</span>
            <HiArrowRight className="w-5 h-5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
