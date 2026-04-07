import type { Metadata } from 'next';
import HeroVideo from '@/components/home/HeroVideo';
import TrustBar from '@/components/home/TrustBar';
import ServicesGrid from '@/components/home/ServicesGrid';
import AboutSnippet from '@/components/home/AboutSnippet';
import ProjectsScroll from '@/components/home/ProjectsScroll';
import ReviewsSection from '@/components/home/ReviewsSection';
import LogoScroller from '@/components/home/LogoScroller';
import ContactCTA from '@/components/home/ContactCTA';

export const metadata: Metadata = {
  title: 'City Roofing & Exteriors | Calgary Roofing Contractor',
  description:
    "Calgary's #1 rated roofing contractor. Residential & commercial roofing, siding, and exteriors. 158 Google reviews at 4.8\u2605. SECOR certified, WCB insured. Free estimates — call 403-608-9933.",
  openGraph: {
    title: 'City Roofing & Exteriors | Calgary Roofing Contractor',
    description: "Calgary's trusted roofing contractor since 2009. Free estimates — call 403-608-9933.",
    url: 'https://www.calgarycityroofing.com',
    siteName: 'City Roofing & Exteriors',
    locale: 'en_CA',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroVideo />
      <TrustBar />
      <ServicesGrid />
      <AboutSnippet />
      <ProjectsScroll />
      <ReviewsSection />
      <LogoScroller />
      <ContactCTA />
    </>
  );
}
