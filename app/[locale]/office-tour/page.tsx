'use client';

import dynamic from 'next/dynamic';

const SimpleOfficeViewer = dynamic(() => import('@/components/office-tour/SimpleOfficeViewer'), {
  ssr: false,
});

export default function OfficeTourPage() {
  return <SimpleOfficeViewer />;
}
