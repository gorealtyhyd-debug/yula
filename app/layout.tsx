import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/site';
import { buildJsonLd } from '@/lib/schema';
import { EnquiryProvider } from '@/components/EnquiryContext';

const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });
const sans = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  keywords: [...SITE.keywords],
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName }],
  alternates: { canonical: '/' },
  category: 'Real Estate',
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [{ url: SITE.ogImage, width: 2560, height: 1295, alt: 'Hallmark Yula villas, Patighanpur, Hyderabad' }],
  },
  twitter: { card: 'summary_large_image', title: SITE.title, description: SITE.description, images: [SITE.ogImage] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  other: {
    'geo.region': 'IN-TG',
    'geo.placename': `${SITE.address.addressLocality}, ${SITE.address.subregion}`,
    'geo.position': `${SITE.geo.latitude};${SITE.geo.longitude}`,
    ICBM: `${SITE.geo.latitude}, ${SITE.geo.longitude}`,
  },
};

export const viewport: Viewport = { themeColor: '#1F2A2E', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }} />
        <EnquiryProvider>{children}</EnquiryProvider>
      </body>
    </html>
  );
}
