'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { z } from 'zod';
import Button from './ui/Button';
import Card from './ui/Card';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitStatus('idle');

    // Validate form
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    // Submit to API
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card variant="glass-dark" hover={false} className="p-8 md:p-12">
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">
          {t('title')}
        </h3>
        <p className="text-white/60">
          {t('subtitle')}
        </p>
      </div>

      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20"
        >
          <p className="text-green-400 font-medium">{t('success')}</p>
          <p className="text-green-300/70 text-sm mt-1">{t('successMessage')}</p>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20"
        >
          <p className="text-red-400 font-medium">{t('error')}</p>
          <p className="text-red-300/70 text-sm mt-1">{t('errorMessage')}</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
              {t('name')} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('namePlaceholder')}
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                errors.name ? 'border-red-500/50' : 'border-white/10'
              } text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 transition-colors`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
              {t('email')} <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('emailPlaceholder')}
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                errors.email ? 'border-red-500/50' : 'border-white/10'
              } text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 transition-colors`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Phone & Company Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
              {t('phone')}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t('phonePlaceholder')}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
              {t('company')}
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder={t('companyPlaceholder')}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Project Type */}
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-white/80 mb-2">
            {t('projectType')}
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/50 transition-colors appearance-none cursor-pointer"
          >
            <option value="" className="bg-slate-900">{t('projectTypePlaceholder')}</option>
            <option value="exhibition" className="bg-slate-900">{t('projectTypes.exhibition')}</option>
            <option value="pavilion" className="bg-slate-900">{t('projectTypes.pavilion')}</option>
            <option value="experienceCenter" className="bg-slate-900">{t('projectTypes.experienceCenter')}</option>
            <option value="museum" className="bg-slate-900">{t('projectTypes.museum')}</option>
            <option value="retail" className="bg-slate-900">{t('projectTypes.retail')}</option>
            <option value="corporate" className="bg-slate-900">{t('projectTypes.corporate')}</option>
            <option value="digital" className="bg-slate-900">{t('projectTypes.digital')}</option>
            <option value="marketing" className="bg-slate-900">{t('projectTypes.marketing')}</option>
            <option value="other" className="bg-slate-900">{t('projectTypes.other')}</option>
          </select>
        </div>

        {/* Budget & Timeline Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-white/80 mb-2">
              {t('budget')}
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/50 transition-colors appearance-none cursor-pointer"
            >
              <option value="" className="bg-slate-900">{t('budgetPlaceholder')}</option>
              <option value="small" className="bg-slate-900">{t('budgetRanges.small')}</option>
              <option value="medium" className="bg-slate-900">{t('budgetRanges.medium')}</option>
              <option value="large" className="bg-slate-900">{t('budgetRanges.large')}</option>
              <option value="enterprise" className="bg-slate-900">{t('budgetRanges.enterprise')}</option>
              <option value="flexible" className="bg-slate-900">{t('budgetRanges.flexible')}</option>
            </select>
          </div>

          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-white/80 mb-2">
              {t('timeline')}
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/50 transition-colors appearance-none cursor-pointer"
            >
              <option value="" className="bg-slate-900">{t('timelinePlaceholder')}</option>
              <option value="urgent" className="bg-slate-900">{t('timelines.urgent')}</option>
              <option value="normal" className="bg-slate-900">{t('timelines.normal')}</option>
              <option value="flexible" className="bg-slate-900">{t('timelines.flexible')}</option>
              <option value="planning" className="bg-slate-900">{t('timelines.planning')}</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
            {t('message')} <span className="text-red-400">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t('messagePlaceholder')}
            rows={6}
            className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
              errors.message ? 'border-red-500/50' : 'border-white/10'
            } text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none`}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-400">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? t('submitting') : t('submit')}
          </Button>
        </div>
      </form>
    </Card>
  );
}
