import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function TestI18nPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Language Switcher */}
        <div className="flex justify-end mb-8">
          <LanguageSwitcher />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-8 text-center">
          {t('hero.title')}
        </h1>

        {/* Navigation Test */}
        <section className="mb-12 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Navigation</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              {t('navigation.home')}
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              {t('navigation.about')}
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              {t('navigation.services')}
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              {t('navigation.portfolio')}
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              {t('navigation.contact')}
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              {t('navigation.blog')}
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              {t('about.title')}
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              {t('common.learnMore')}
            </div>
          </div>
        </section>

        {/* Hero Section Test */}
        <section className="mb-12 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">{t('hero.title')}</h2>
          <p className="text-lg mb-2">{t('hero.subtitle')}</p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{t('hero.description')}</p>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">
              {t('hero.cta.primary')}
            </button>
            <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg">
              {t('hero.cta.secondary')}
            </button>
          </div>
        </section>

        {/* Services Test */}
        <section className="mb-12 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">{t('services.title')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">{t('services.design.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('services.design.description')}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t('services.development.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('services.development.description')}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t('services.consulting.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('services.consulting.description')}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t('services.support.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('services.support.description')}</p>
            </div>
          </div>
        </section>

        {/* Contact Test */}
        <section className="mb-12 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">{t('contact.title')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">{t('contact.form.name')}</label>
              <input type="text" placeholder={t('contact.form.namePlaceholder')} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block mb-2">{t('contact.form.email')}</label>
              <input type="email" placeholder={t('contact.form.emailPlaceholder')} className="w-full p-2 border rounded" />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2">{t('contact.form.message')}</label>
              <textarea placeholder={t('contact.form.messagePlaceholder')} className="w-full p-2 border rounded h-32"></textarea>
            </div>
            <div className="md:col-span-2">
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg">
                {t('contact.form.submit')}
              </button>
            </div>
          </div>
        </section>

        {/* Footer Test */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">{t('footer.title')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">{t('footer.company.title')}</h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>{t('footer.company.about')}</li>
                <li>{t('footer.company.careers')}</li>
                <li>{t('footer.company.press')}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t('footer.support.title')}</h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>{t('footer.support.help')}</li>
                <li>{t('footer.support.documentation')}</li>
                <li>{t('footer.support.faq')}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t('footer.legal.title')}</h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>{t('footer.legal.privacy')}</li>
                <li>{t('footer.legal.terms')}</li>
                <li>{t('footer.legal.cookies')}</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t text-center text-gray-600 dark:text-gray-400">
            {t('footer.copyright')}
          </div>
        </section>
      </div>
    </div>
  );
}