import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ServiceGrid from '@/components/services/ServiceGrid';
import WhyChooseUs from '@/components/services/WhyChooseUs';
import OurProcess from '@/components/services/OurProcess';
import SuccessMetrics from '@/components/services/SuccessMetrics';
import Industries from '@/components/services/Industries';
import TechnologyStack from '@/components/services/TechnologyStack';
import ServicesFAQ from '@/components/services/ServicesFAQ';
import ServicesCTA from '@/components/services/ServicesCTA';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Service Grid - slate-950 to blue-950 */}
      <div className="bg-gradient-to-b from-slate-950 to-blue-950 pt-24 md:pt-32">
        <ServiceGrid />
      </div>

      {/* Why Choose Us - blue-950 to purple-950 */}
      <div className="bg-gradient-to-b from-blue-950 to-purple-950">
        <WhyChooseUs />
      </div>

      {/* Our Process - purple-950 to indigo-950 */}
      <div className="bg-gradient-to-b from-purple-950 to-indigo-950">
        <OurProcess />
      </div>

      {/* Success Metrics - indigo-950 to violet-950 */}
      <div className="bg-gradient-to-b from-indigo-950 to-violet-950">
        <SuccessMetrics />
      </div>

      {/* Industries - violet-950 to fuchsia-950 */}
      <div className="bg-gradient-to-b from-violet-950 to-fuchsia-950">
        <Industries />
      </div>

      {/* Technology Stack - fuchsia-950 to pink-950 */}
      <div className="bg-gradient-to-b from-fuchsia-950 to-pink-950">
        <TechnologyStack />
      </div>

      {/* FAQ - pink-950 to rose-950 */}
      <div className="bg-gradient-to-b from-pink-950 to-rose-950">
        <ServicesFAQ />
      </div>

      {/* CTA - rose-950 to slate-950 */}
      <div className="bg-gradient-to-b from-rose-950 to-slate-950">
        <ServicesCTA />
      </div>

      <Footer />
    </div>
  );
}
