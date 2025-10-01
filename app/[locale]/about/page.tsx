import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import MissionValues from '@/components/about/MissionValues';
import TeamGrid from '@/components/about/TeamGrid';
import WhyChooseUs from '@/components/about/WhyChooseUs';
import AboutStats from '@/components/about/AboutStats';
import CompanyTimeline from '@/components/about/CompanyTimeline';
import CultureApproach from '@/components/about/CultureApproach';
import AboutCTA from '@/components/about/AboutCTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero - slate-950 to indigo-950 */}
      <div className="bg-gradient-to-b from-slate-950 to-indigo-950">
        <AboutHero />
      </div>

      {/* Story - indigo-950 to-purple-950 */}
      <div className="bg-gradient-to-b from-indigo-950 to-purple-950">
        <AboutStory />
      </div>

      {/* Mission & Values - purple-950 to blue-950 */}
      <div className="bg-gradient-to-b from-purple-950 to-blue-950">
        <MissionValues />
      </div>

      {/* Team - blue-950 to violet-950 */}
      <div className="bg-gradient-to-b from-blue-950 to-violet-950">
        <TeamGrid />
      </div>

      {/* Why Choose Us - violet-950 to indigo-950 */}
      <div className="bg-gradient-to-b from-violet-950 to-indigo-950">
        <WhyChooseUs />
      </div>

      {/* Stats - indigo-950 to purple-950 */}
      <div className="bg-gradient-to-b from-indigo-950 to-purple-950">
        <AboutStats />
      </div>

      {/* Timeline - purple-950 to slate-900 */}
      <div className="bg-gradient-to-b from-purple-950 to-slate-900">
        <CompanyTimeline />
      </div>

      {/* Culture - slate-900 to slate-950 */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950">
        <CultureApproach />
      </div>

      {/* CTA - slate-950 to slate-950 */}
      <div className="bg-slate-950">
        <AboutCTA />
      </div>

      <Footer />
    </div>
  );
}
