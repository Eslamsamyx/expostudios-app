import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { FaDna, FaBullseye, FaChartBar, FaChartLine } from 'react-icons/fa';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PricingCalculator from '@/components/calculator/PricingCalculator';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'calculator' });

  return {
    title: t('title', { default: 'Price Calculator | Expo Studios' }),
    description: t('description', {
      default: 'Calculate your video production costs with our intelligent pricing calculator. Get instant estimates for CGI, VFX, SFX, and motion graphics projects.'
    }),
  };
}

export default async function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-blue-950">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-yellow-400 to-purple-400 bg-clip-text text-transparent">
              Smart Pricing Calculator
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            Get consistent pricing ranges for your video production projects - same inputs, same results every time
          </p>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            Our calculator uses scientific statistical models (68% confidence intervals) to provide realistic price ranges based on complexity and duration
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="pb-24 px-4">
        <PricingCalculator />
      </section>

      {/* Information Section */}
      <section className="pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              How Our Pricing Works
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-3 flex items-center gap-2">
                  <FaDna className="text-white" />
                  Scientific Mix Calculation
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Our algorithm automatically calculates the optimal blend of Motion Graphics and CGI/VFX/SFX based on your project complexity using a non-linear formula: complexity<sup>1.5</sup>. This reflects real-world project compositions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                  <FaBullseye className="text-white" />
                  Two Content Types
                </h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• <strong>Motion Graphics:</strong> 2,000-3,000 AED/min</li>
                  <li>• <strong>CGI/VFX/SFX:</strong> 3,500-4,000 AED/min</li>
                  <li>• <strong>Blended:</strong> Weighted average based on mix</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-3 flex items-center gap-2">
                  <FaChartBar className="text-white" />
                  Duration Impact
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Longer videos have slightly lower CGI ratios due to budget constraints. Our algorithm adjusts the mix ratio considering both complexity and duration for realistic pricing.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-green-400 mb-3 flex items-center gap-2">
                  <FaChartLine className="text-white" />
                  Confidence Intervals
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Price ranges are calculated using 68% confidence intervals (±1 standard deviation), giving you realistic min-max estimates. Same inputs always produce the same consistent ranges.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-purple-500/10 to-yellow-500/10 rounded-2xl border border-purple-500/20">
              <p className="text-center text-gray-300 text-sm">
                <strong className="text-white">Note:</strong> These are estimate prices. Final project costs may vary based on specific requirements, revisions, and project scope.
                <Link href="/contact" className="text-purple-400 hover:text-purple-300 ml-1 underline">
                  Contact us
                </Link> for a detailed quote.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
