import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  defaultTitle: 'Rayan Carré – Cybersécurité & Logiciels',
  description: 'Portfolio – cybersécurité, IA & data, jeux et Cyber Lab.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://rayan-carre.dev',
    siteName: 'Rayan Carré',
    images: [
      { url: 'https://rayan-carre.dev/og.png', width: 1200, height: 630, alt: 'Rayan Carré' }
    ]
  },
  twitter: {
    cardType: 'summary_large_image'
  }
};

export default config;

