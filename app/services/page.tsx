import type { Metadata } from 'next';
import Link from 'next/link';
import ServiceHero from '@/components/shared/ServiceHero';
import FAQSection, { FAQItem } from '@/components/shared/FAQSection';
import ServiceCTA from '@/components/shared/ServiceCTA';

export const metadata: Metadata = {
  title: 'Roofing & Exterior Services Calgary | City Roofing',
  description:
    'Roof replacement, repair, siding and commercial roofing in Calgary. SECOR certified, WCB insured, 158 Google reviews at 4.8★. Free estimates — call 403-608-9933.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What areas of Calgary do you serve?', acceptedAnswer: { '@type': 'Answer', text: 'We serve all Calgary quadrants — NE, NW, SE, SW — plus Airdrie, Cochrane, Chestermere, and Okotoks.' } },
    { '@type': 'Question', name: 'Are you licensed and insured in Alberta?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. City Roofing & Exteriors is SECOR certified, WCB Alberta registered, and BBB Accredited.' } },
    { '@type': 'Question', name: 'How do I get a quote?', acceptedAnswer: { '@type': 'Answer', text: 'Call 403-608-9933 or fill out our online form. We offer free on-site estimates with no obligation.' } },
    { '@type': 'Question', name: 'Do you work with insurance companies?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We are familiar with all major Alberta insurance providers and can help document damage for your claim.' } },
    { '@type': 'Question', name: 'How long have you been roofing in Calgary?', acceptedAnswer: { '@type': 'Answer', text: 'City Roofing & Exteriors has been serving Calgary homeowners and businesses for over 15 years.' } },
  ],
};

const faqItems: FAQItem[] = [
  { q: 'What areas of Calgary do you serve?', a: 'We serve all Calgary quadrants — NE, NW, SE, SW — plus Airdrie, Cochrane, Chestermere, and Okotoks.' },
  { q: 'Are you licensed and insured in Alberta?', a: 'Yes. City Roofing & Exteriors is SECOR certified, WCB Alberta registered, and BBB Accredited.' },
  { q: 'How do I get a quote?', a: 'Call 403-608-9933 or fill out our online form at /contact. We offer free on-site estimates with no obligation.' },
  { q: 'Do you work with insurance companies?', a: 'Yes. We are familiar with all major Alberta insurance providers and can help document damage for your claim.' },
  { q: 'How long have you been roofing in Calgary?', a: 'City Roofing & Exteriors has been serving Calgary homeowners and businesses for over 15 years.' },
];

interface CardData {
  href: string;
  title: string;
  image: string | null;
  tag: string | null;
  bullets: string[];
  height: string;
}

const ROW1: CardData[] = [
  {
    href: '/services/roof-replacement',
    title: 'Roof Replacement',
    image: '/images/projects/residential.webp',
    tag: 'MOST POPULAR',
    bullets: ['Asphalt, metal & flat roof systems', 'In-house crew, no subcontracting', 'Free written estimate'],
    height: '400px',
  },
  {
    href: '/services/roof-repair',
    title: 'Roof Repair & Emergency',
    image: '/images/projects/Repair.jpeg',
    tag: '24/7 RESPONSE',
    bullets: ['Leaks, hail & storm damage', 'Same-day assessment available', 'Insurance claim assistance'],
    height: '400px',
  },
];

const ROW2: CardData[] = [
  {
    href: '/services/siding',
    title: 'Siding & Exteriors',
    image: '/images/projects/siding.jpg',
    tag: null,
    bullets: ['Vinyl, Hardie board & metal siding', 'Premium brands: Kaycan, Royal, Gentek'],
    height: '300px',
  },
  {
    href: '/services/commercial',
    title: 'Commercial Roofing',
    image: '/images/projects/Commercial.jpeg',
    tag: '$3M+ EXPERIENCE',
    bullets: ['Flat roof systems & large-scale projects', 'SECOR certified, WCB registered'],
    height: '300px',
  },
  {
    href: '/services/flat-roofing',
    title: 'Flat Roofing Systems',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    tag: null,
    bullets: ['Torch-on, TPO & EPDM systems', 'Residential & commercial'],
    height: '300px',
  },
];

const CARD_GRADIENT = 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)';
const DARK_GRADIENT = 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)';

function ServiceCard({ card }: { card: CardData }) {
  return (
    <Link
      href={card.href}
      className="svc-card"
      style={{
        height: card.height,
        backgroundColor: 'var(--color-surface)',
        backgroundImage: card.image
          ? `url('${card.image}')`
          : 'linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: card.image ? CARD_GRADIENT : DARK_GRADIENT }} />

      {/* Tag pill */}
      {card.tag && (
        <div style={{
          position: 'absolute', top: '16px', left: '16px', zIndex: 2,
          backgroundColor: 'var(--color-primary)', color: '#fff',
          padding: '5px 14px', borderRadius: '999px',
          fontSize: '11px', fontFamily: 'var(--font-display)', fontWeight: 700,
          letterSpacing: '1px', textTransform: 'uppercase',
        }}>
          {card.tag}
        </div>
      )}

      {/* Bottom content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 28px', zIndex: 2 }}>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(18px, 2.2vw, 22px)', color: '#F9F7F2',
          marginBottom: '10px', lineHeight: 1.2,
        }}>
          {card.title}
        </h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '14px' }}>
          {card.bullets.map((b, i) => (
            <li key={i} style={{ color: 'rgba(249,247,242,0.8)', fontSize: '13px', display: 'flex', alignItems: 'flex-start', gap: '6px', lineHeight: 1.5 }}>
              <span style={{ color: 'var(--color-accent)', flexShrink: 0 }}>·</span>
              {b}
            </li>
          ))}
        </ul>
        <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px' }}>
          Learn More →
        </span>
      </div>
    </Link>
  );
}

export default function ServicesPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Section 1 — Hero */}
      <ServiceHero
        title="Our Services"
        subtitle="Roofing, siding and exteriors built to last Calgary winters."
        breadcrumb="Services"
        breadcrumbPath="/services"
      />

      {/* Section 2 — Services Grid */}
      <section style={{ backgroundColor: 'var(--color-cream)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

          {/* Row 1 — 2 equal cards */}
          <div className="svc-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            {ROW1.map((card) => <ServiceCard key={card.href} card={card} />)}
          </div>

          {/* Row 2 — 3 equal cards */}
          <div className="svc-row-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            {ROW2.map((card) => <ServiceCard key={card.href} card={card} />)}
          </div>
        </div>

        <style>{`
          .svc-card {
            display: block;
            text-decoration: none;
            border-radius: 12px;
            overflow: hidden;
            position: relative;
            cursor: pointer;
            transition: transform 300ms ease;
            flex-shrink: 0;
          }
          .svc-card:hover {
            transform: scale(1.02);
          }
          @media (max-width: 900px) {
            .svc-row-3 { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 640px) {
            .svc-row-2, .svc-row-3 { grid-template-columns: 1fr !important; }
            .svc-card { height: 280px !important; }
          }
        `}</style>
      </section>

      {/* Section 3 — Why Choose Us */}
      <section style={{
        backgroundColor: 'var(--color-cream-dark)',
        padding: '72px 24px',
        borderTop: '1px solid var(--color-border-light)',
        borderBottom: '1px solid var(--color-border-light)',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '48px', textAlign: 'center' }}>
            {[
              { icon: '🏠', title: 'In-House Crew Only', sub: 'Every roofer is our full-time employee' },
              { icon: '⭐', title: '158 Google Reviews · 4.8★', sub: "Calgary's most reviewed local roofer" },
              { icon: '🛡️', title: 'SECOR · WCB · BBB', sub: 'Fully certified and insured on every job' },
            ].map((col) => (
              <div key={col.title}>
                <div style={{ fontSize: '36px', marginBottom: '14px', lineHeight: 1 }}>{col.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '17px', color: 'var(--color-text-dark)', marginBottom: '8px' }}>
                  {col.title}
                </h3>
                <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '14px', lineHeight: 1.6 }}>
                  {col.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — FAQ */}
      <FAQSection items={faqItems} title="Services FAQ" />

      {/* Section 5 — CTA */}
      <ServiceCTA />
    </div>
  );
}
