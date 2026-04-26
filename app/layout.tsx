import type { Metadata } from 'next';
import './globals.css';
import { Manrope, Work_Sans } from 'next/font/google';
import Script from 'next/script';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoadingWrapper from '@/components/LoadingWrapper';
import MobileBottomNav from '@/components/MobileBottomNav';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'City Roofing & Exteriors | Calgary Roofing Contractor',
    template: '%s | City Roofing Calgary',
  },
  description:
    'Calgary roofing and exterior work since 2009. Residential and commercial roofing, siding, and exteriors. 158 Google reviews, 4.8★. Call 403-608-9933.',
  metadataBase: new URL('https://www.calgarycityroofing.ca'),
  openGraph: {
    siteName: 'City Roofing & Exteriors',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: 'https://www.calgarycityroofing.ca',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'RoofingContractor'],
  name: 'City Roofing & Exteriors',
  alternateName: 'City Roofing Calgary',
  url: 'https://www.calgarycityroofing.ca',
  telephone: '403-608-9933',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3935 3a St NE Unit #3',
    addressLocality: 'Calgary',
    addressRegion: 'AB',
    postalCode: 'T2E 6S7',
    addressCountry: 'CA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.0885,
    longitude: -114.054,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '158',
    bestRating: '5',
  },
  areaServed: [
    'Calgary',
    'NE Calgary',
    'NW Calgary',
    'SE Calgary',
    'SW Calgary',
    'Airdrie',
    'Cochrane',
    'Chestermere',
    'Okotoks',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${workSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        {/* Google Ads conversion tracking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18002586824"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18002586824');
            `,
          }}
        />
        <LoadingWrapper>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <MobileBottomNav />
        </LoadingWrapper>
      </body>
    </html>
  );
}
