import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services.amplify' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function AmplifyServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale} = await params;
  const t = await getTranslations({ locale, namespace: 'services.amplify' });

  const offerings = [
    t('offerings.0'),
    t('offerings.1'),
    t('offerings.2'),
    t('offerings.3'),
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section - slate-950 to orange-950 */}
      <section className="relative bg-gradient-to-b from-slate-950 to-orange-950 pt-32 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-white/80">
              {t('name')}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
            {t('title')}
          </h1>

          <p className="text-xl md:text-2xl text-white/80 mb-4">
            {t('tagline')}
          </p>

          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Offerings Section - orange-950 to amber-950 */}
      <section className="relative bg-gradient-to-b from-orange-950 to-amber-950 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            What We Offer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offerings.map((offering, index) => (
              <div
                key={index}
                className="glass-dark p-6 rounded-lg border border-white/5 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-white/90 text-lg">{offering}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - amber-950 to slate-950 */}
      <section className="relative bg-gradient-to-b from-amber-950 to-slate-950 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-200 via-orange-200 to-yellow-200 bg-clip-text text-transparent">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-white/60 mb-8">
            Let's discuss how we can bring your vision to life
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all"
          >
            Get in Touch
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
