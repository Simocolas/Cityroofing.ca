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
    'Calgary roofing, siding, and exterior work for homes and commercial properties. 158 Google reviews at 4.8★. SECOR certified, WCB Alberta coverage. Free estimates — call 403-608-9933.',
  openGraph: {
    title: 'City Roofing & Exteriors | Calgary Roofing Contractor',
    description: 'Calgary roofing and exterior work since 2009. Free estimates — call 403-608-9933.',
    url: 'https://www.calgarycityroofing.ca',
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
      <ReviewsSection />
      <ProjectsScroll />
      <AboutSnippet />
      <LogoScroller />
      <ContactCTA />
    </>
  );
}
