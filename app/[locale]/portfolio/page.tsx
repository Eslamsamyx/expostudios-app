import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'portfolio' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-violet-950">
      <Header />
      <div className="pt-24 md:pt-32">
        <PortfolioGrid />
      </div>
      <Footer />
    </main>
  );
}
