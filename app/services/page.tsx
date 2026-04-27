import type { Metadata } from 'next';
import Link from 'next/link';
import ServiceHero from '@/components/shared/ServiceHero';
import ServiceCTA from '@/components/shared/ServiceCTA';

export const metadata: Metadata = {
  title: 'Roofing & Exterior Services Calgary | City Roofing',
  description:
    'Roof replacement, repair, siding and flat-roofing in Calgary. SECOR certified, WCB Alberta coverage, 158 Google reviews at 4.8★. Free estimates — call 403-608-9933.',
};

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
    tag: 'FAST LEAK HELP',
    bullets: ['Leaks, hail & storm damage', 'Next available assessment', 'Insurance documentation support'],
    height: '400px',
  },
];

const ROW2: CardData[] = [
  {
    href: '/services/siding',
    title: 'Siding & Exteriors',
    image: '/images/projects/siding.jpg',
    tag: null,
    bullets: ['Vinyl, Hardie board & metal siding', 'Established brands: Kaycan, Royal, Gentek'],
    height: '300px',
  },
  {
    href: '/services/flat-roofing',
    title: 'Flat Roofing & Commercial',
    image: '/images/projects/Commercial.jpeg',
    tag: '$3M+ EXPERIENCE',
    bullets: ['Torch-on, TPO & EPDM systems', 'SECOR certified, WCB registered'],
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
      <div style={{ position: 'absolute', inset: 0, background: card.image ? CARD_GRADIENT : DARK_GRADIENT }} />

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
          <div className="svc-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            {ROW1.map((card) => <ServiceCard key={card.href} card={card} />)}
          </div>
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
          .svc-card:hover { transform: scale(1.02); }
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
              { icon: '⭐', title: '158 Google Reviews · 4.8★', sub: 'A long local track record across Calgary' },
              { icon: '🛡️', title: 'SECOR · WCB · BBB', sub: 'Safety, coverage and accountability on every job' },
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

      {/* Section 4 — Emergency Response
          IMAGE PLACEHOLDER: swap src below with the AI-generated image
          once available. Place in /public/images/ and use a local path,
          or keep as an external URL. */}
      <section
        className="emergency-section"
        style={{
          position: 'relative',
          minHeight: '460px',
          /* Fallback shown while image loads or if it fails */
          backgroundColor: '#141414',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Background image — placeholder until AI image is ready */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/Emergancy.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
          }}
        />

        {/* Overlay — restrained, left-weighted for readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(100deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.52) 50%, rgba(0,0,0,0.22) 100%)',
        }} />

        {/* Content */}
        <div
          className="emergency-content"
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '80px 24px',
            width: '100%',
          }}
        >
          <div style={{ maxWidth: '520px' }}>
            <p style={{
              fontSize: '11px',
              letterSpacing: '2.5px',
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Fast Leak & Storm Response
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(26px, 3vw, 38px)',
              color: '#F9F7F2',
              lineHeight: 1.2,
              marginBottom: '16px',
            }}>
              When Your Roof Can&rsquo;t Wait
            </h2>
            <p style={{
              color: 'rgba(249,247,242,0.75)',
              fontSize: '16px',
              lineHeight: 1.65,
              marginBottom: '32px',
            }}>
              Active leak, storm damage, or wind-lifted shingles — our crew responds quickly, assesses the damage on-site, and protects your home before the problem gets worse.
            </p>
            <a
              href="tel:403-608-9933"
              style={{
                display: 'inline-block',
                backgroundColor: 'var(--color-primary)',
                color: '#fff',
                padding: '13px 28px',
                borderRadius: '4px',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '15px',
                letterSpacing: '0.3px',
              }}
            >
              Call 403-608-9933
            </a>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .emergency-section { min-height: 400px !important; }
            .emergency-section .emergency-content { padding: 52px 20px !important; }
            .emergency-section p[style] { font-size: 15px !important; }
          }
        `}</style>
      </section>

      {/* Section 5 — CTA */}
      <ServiceCTA />
    </div>
  );
}
