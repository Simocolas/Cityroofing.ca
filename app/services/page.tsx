import type { Metadata } from 'next';
import Link from 'next/link';
import ServiceHero from '@/components/shared/ServiceHero';
import FAQSection, { FAQItem } from '@/components/shared/FAQSection';
import ServiceCTA from '@/components/shared/ServiceCTA';

export const metadata: Metadata = {
  title: 'Roofing & Exterior Services Calgary | City Roofing',
  description:
    'Roof replacement, repair, siding and commercial roofing in Calgary. SECOR certified, WCB insured, 158 Google reviews at 4.8\u2605. Free estimates \u2014 call 403-608-9933.',
};

const services = [
  {
    href: '/services/roof-replacement',
    title: 'Roof Replacement',
    description:
      'When your roof has reached the end of its lifespan or sustained significant damage, a full replacement is often the most cost-effective long-term solution. City Roofing & Exteriors handles residential and commercial replacements across all Calgary quadrants, using premium materials from IKO, BP/BMCA, GAF, Owens Corning, CertainTeed, and Malarkey. Our crews are SECOR certified and WCB insured on every job.',
    bullets: [
      'Asphalt shingles, flat roof, and metal roofing systems',
      'Class 4 impact-resistant shingles — reduces insurance premiums',
      'Most residential roofs completed in 1–2 days',
    ],
  },
  {
    href: '/services/roof-repair',
    title: 'Roof Repair & Emergency Services',
    description:
      "Not every roofing problem requires a full replacement. City Roofing's repair team responds to leaks, hail damage, missing shingles, flashing failures, and flat roof blistering across Calgary. We assess the damage honestly and recommend repair only when it's the right call — with a written estimate before any work begins.",
    bullets: [
      'Emergency leak response across all Calgary quadrants',
      'Hail and storm damage assessment and documentation',
      'Flat roof patching: torch-on, EPDM, and TPO systems',
    ],
  },
  {
    href: '/services/siding',
    title: 'Siding & Exteriors',
    description:
      "Your siding is the first thing people see and the first line of defense against Calgary's climate. City Roofing installs vinyl, Hardie board, and metal siding using materials from Kaycan, Royal Building Products, Gentek, Ply Gem, and MITTEN. Every installation includes proper moisture barrier and trim to meet Alberta building standards.",
    bullets: [
      'Vinyl siding — durable, low-maintenance, variety of profiles',
      'Hardie board — fibre cement for maximum longevity',
      'Metal siding — architectural panels and corrugated options',
    ],
  },
  {
    href: '/services/commercial',
    title: 'Commercial Roofing',
    description:
      "City Roofing & Exteriors has completed commercial roofing projects exceeding $3 million CAD across Calgary and surrounding areas. Our commercial division handles flat roof systems — torch-on, EPDM, and TPO — for warehouses, retail plazas, industrial facilities, and multi-unit residential buildings. We work within your schedule to minimize business disruption.",
    bullets: [
      'Flat roof systems: torch-on, EPDM, TPO membrane',
      '$3M+ commercial project experience in Calgary',
      'Project management from estimate through completion',
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    q: 'What areas of Calgary do you serve?',
    a: 'We serve all Calgary quadrants — NE, NW, SE, SW — plus Airdrie, Cochrane, Chestermere, and Okotoks.',
  },
  {
    q: 'Are you licensed and insured in Alberta?',
    a: 'Yes. City Roofing & Exteriors is SECOR certified, WCB Alberta registered, and BBB Accredited.',
  },
  {
    q: 'How do I get a quote?',
    a: 'Call 403-608-9933 or fill out our online form at /contact. We offer free on-site estimates with no obligation.',
  },
  {
    q: 'Do you work with insurance companies?',
    a: 'Yes. We are familiar with all major Alberta insurance providers and can help document damage for your claim.',
  },
  {
    q: 'How long have you been roofing in Calgary?',
    a: 'City Roofing & Exteriors has been serving Calgary homeowners and businesses for over 15 years.',
  },
];

export default function ServicesPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh' }}>
      <ServiceHero
        title="Our Services"
        subtitle="Calgary roofing done right — residential, commercial, and everything in between."
        breadcrumb="Services"
        breadcrumbPath="/services"
      />

      {/* Service cards */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {services.map((service) => (
            <div
              key={service.href}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderLeft: '4px solid var(--color-primary)',
                borderRadius: '0 6px 6px 0',
                padding: '40px 44px',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(24px, 3vw, 32px)',
                  color: 'var(--color-text-primary)',
                  marginBottom: '16px',
                }}
              >
                {service.title}
              </h2>
              <p
                style={{
                  color: 'var(--color-text-muted)',
                  fontSize: '16px',
                  lineHeight: 1.8,
                  marginBottom: '24px',
                  maxWidth: '800px',
                }}
              >
                {service.description}
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  marginBottom: '28px',
                }}
              >
                {service.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      color: 'var(--color-text-muted)',
                      fontSize: '15px',
                    }}
                  >
                    <span style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }}>✓</span>
                    {bullet}
                  </li>
                ))}
              </ul>
              <Link
                href={service.href}
                style={{
                  color: 'var(--color-accent)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '15px',
                }}
              >
                Get a Free Estimate →
              </Link>
            </div>
          ))}
        </div>
      </div>

      <FAQSection items={faqItems} />
      <ServiceCTA />
    </div>
  );
}
