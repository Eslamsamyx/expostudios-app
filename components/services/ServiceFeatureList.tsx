'use client';

import { motion } from 'framer-motion';
import { ServiceFeature } from '@/lib/types/services';
import {
  HiChartBar,
  HiUsers,
  HiCube,
  HiCheckCircle,
  HiSparkles,
  HiPlay,
  HiCubeTransparent,
  HiFilm,
  HiDesktopComputer,
  HiLightningBolt,
  HiDatabase,
  HiPuzzle,
  HiTrendingUp,
  HiDocumentText,
  HiChartSquareBar,
  HiShare,
} from 'react-icons/hi';

interface ServiceFeatureListProps {
  features: ServiceFeature[];
  color: string;
}

const iconMap = {
  HiChartBar,
  HiUsers,
  HiCube,
  HiCheckCircle,
  HiSparkles,
  HiPlay,
  HiCubeTransparent,
  HiFilm,
  HiDesktopComputer,
  HiLightningBolt,
  HiDatabase,
  HiPuzzle,
  HiTrendingUp,
  HiDocumentText,
  HiChartSquareBar,
  HiShare,
};

export default function ServiceFeatureList({
  features,
  color,
}: ServiceFeatureListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {features.map((feature, index) => {
        const IconComponent = feature.icon
          ? iconMap[feature.icon as keyof typeof iconMap]
          : null;

        return (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-dark rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              {IconComponent && (
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${color}20 0%, transparent 100%)`,
                    borderColor: `${color}40`,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                  }}
                >
                  <IconComponent className="w-6 h-6" style={{ color }} />
                </div>
              )}

              {/* Content */}
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-2">
                  {feature.title}
                </h4>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
