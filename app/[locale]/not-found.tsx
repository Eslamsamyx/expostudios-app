import { getTranslations } from 'next-intl/server';
import NotFoundClient from './not-found-client';

export default async function NotFound() {
  const t = await getTranslations('errors.404');
  const tNav = await getTranslations('navigation');

  const translations = {
    title: t('title'),
    description: t('description'),
    button: t('button'),
    goBack: t('goBack'),
    quote: t('quote'),
  };

  const navTranslations = {
    home: tNav('home'),
    services: tNav('services'),
    portfolio: tNav('portfolio'),
    contact: tNav('contact'),
  };

  return <NotFoundClient translations={translations} navTranslations={navTranslations} />;
}
