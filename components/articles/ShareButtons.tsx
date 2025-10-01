'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { HiShare } from 'react-icons/hi';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
  FaLink,
} from 'react-icons/fa';

interface ShareButtonsProps {
  url: string;
  title: string;
  excerpt?: string;
  onShare?: () => void;
}

export default function ShareButtons({ url, title, excerpt, onShare }: ShareButtonsProps) {
  const t = useTranslations('articles.detail');
  const [showOptions, setShowOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareOptions = [
    {
      name: 'Facebook',
      icon: FaFacebookF,
      color: '#1877F2',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      color: '#1DA1F2',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedinIn,
      color: '#0A66C2',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      color: '#25D366',
      url: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      color: '#EA4335',
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${excerpt || ''}\n\n${url}`)}`,
    },
  ];

  const handleShare = async (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400');
    if (onShare) onShare();
    setShowOptions(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (onShare) onShare();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="relative">
      {/* Main Share Button */}
      <motion.button
        onClick={() => setShowOptions(!showOptions)}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <HiShare className="w-5 h-5" />
        <span className="font-medium">{t('share')}</span>
      </motion.button>

      {/* Share Options Popup */}
      {showOptions && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowOptions(false)}
          />

          {/* Options Menu */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 z-50 min-w-[240px] glass-dark rounded-xl border border-white/10 overflow-hidden shadow-xl"
          >
            {/* Social Share Options */}
            <div className="p-2">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => handleShare(option.url)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all group"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${option.color}15` }}
                  >
                    <option.icon
                      className="w-5 h-5 transition-transform group-hover:scale-110"
                      style={{ color: option.color }}
                    />
                  </div>
                  <span className="font-medium">{option.name}</span>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* Copy Link */}
            <div className="p-2">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <FaLink className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>
                <span className="font-medium">
                  {copied ? t('copied') || 'Copied!' : t('copyLink') || 'Copy Link'}
                </span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
