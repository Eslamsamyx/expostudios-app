import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ArticlesHero from '@/components/articles/ArticlesHero';
import ArticlesGrid from '@/components/articles/ArticlesGrid';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'articles' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default function ArticlesPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero - slate-950 to purple-950 */}
      <div className="bg-gradient-to-b from-slate-950 to-purple-950 pt-24 md:pt-32">
        <ArticlesHero />
      </div>

      {/* Grid - purple-950 to indigo-950 */}
      <div className="bg-gradient-to-b from-purple-950 to-indigo-950">
        <ArticlesGrid />
      </div>

      <Footer />
    </div>
  );
}
