'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TeamMember } from '@/lib/types/about';

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

const departmentGradients = {
  consult: 'from-blue-400 to-cyan-500',
  create: 'from-purple-400 to-pink-500',
  build: 'from-green-400 to-emerald-500',
  amplify: 'from-cyan-400 to-blue-500',
};

export default function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const gradient = departmentGradients[member.department];

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className="group relative h-full"
    >
      <div className="relative h-full p-8 lg:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10">

        {/* Dot grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Gradient orb */}
        <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />

        {/* Content */}
        <div className="relative">
          {/* Large Initials */}
          <div className="mb-6">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} bg-opacity-10 border border-white/10`}>
              <span className={`text-3xl font-bold bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
                {getInitials(member.name)}
              </span>
            </div>
          </div>

          {/* Name & Role */}
          <div className="mb-6">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight group-hover:text-white transition-colors duration-300">
              {member.name}
            </h3>
            <p className={`text-base lg:text-lg font-medium bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-1`}>
              {member.role}
            </p>
            <p className="text-sm text-white/40">
              Joined {member.joinedYear}
            </p>
          </div>

          {/* Bio */}
          <p className="text-base text-white/60 leading-relaxed mb-6 group-hover:text-white/70 transition-colors duration-300">
            {isExpanded && member.extendedBio ? member.extendedBio : member.bio}
          </p>

          {/* Expertise Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {member.expertise.map((skill, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08 + idx * 0.05 }}
                className="px-4 py-2 rounded-full text-xs font-medium bg-white/[0.05] border border-white/[0.08] text-white/70 hover:bg-white/[0.08] hover:text-white transition-all duration-300"
              >
                {skill}
              </motion.span>
            ))}
          </div>

          {/* Expand Button */}
          {member.extendedBio && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`text-sm font-medium bg-gradient-to-r ${gradient} bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300`}
            >
              {isExpanded ? '← Show Less' : 'Read More →'}
            </button>
          )}
        </div>

        {/* Bottom gradient line */}
        <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      </div>
    </motion.div>
  );
}
