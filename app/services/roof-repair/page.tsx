import type { Metadata } from 'next';
import ServiceHero from '@/components/shared/ServiceHero';
import FAQSection, { FAQItem } from '@/components/shared/FAQSection';
import ServiceCTA from '@/components/shared/ServiceCTA';
import Accordion, { AccordionItem } from '@/components/shared/Accordion';
import KeyPoints, { KeyPoint } from '@/components/shared/KeyPoints';
import reviewsData from '@/data/reviews.json';

export const metadata: Metadata = {
  title: 'Roof Repair Calgary | Emergency Roofing | City Roofing',
  description:
    'Calgary roof repair for leaks, hail damage and storm damage. Fast response, SECOR certified, 4.8★ rated. Call 403-608-9933.',
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Roof Repair Calgary',
  provider: { '@type': 'LocalBusiness', name: 'City Roofing & Exteriors' },
  areaServed: 'Calgary, Alberta',
  description: 'Residential and commercial roof repair in Calgary including emergency leaks, hail damage, shingle replacement, and flat roof patching.',
};

const faqItems: FAQItem[] = [
  {
    q: 'Should I repair or replace my roof?',
    a: 'If the damaged area is less than 25% of the total roof and the roof is under 15–20 years old, repair is typically the right call. We assess this honestly during our free inspection — we never push replacement when repair will do.',
  },
  {
    q: 'How fast can you respond to an emergency roof leak in Calgary?',
    a: 'We prioritize emergency calls across all Calgary quadrants. In most cases we can assess and apply a temporary tarp or patch within 24 hours of your call. Contact us at 403-608-9933.',
  },
  {
    q: 'Does insurance cover roof repair in Calgary?',
    a: 'Insurance may cover repair when damage results from an insured event such as hail, wind, or falling debris. Gradual wear and tear is generally excluded. We provide photos and documentation you can share with your insurer.',
  },
  {
    q: 'Can you repair hail damage without a full replacement?',
    a: 'Yes, in many cases. If the hail dents are limited to a portion of the roof, targeted shingle replacement is possible. We assess the full extent of hail damage and give you an honest recommendation.',
  },
  {
    q: 'Do you repair flat roofs?',
    a: 'Yes. City Roofing repairs torch-on modified bitumen, EPDM rubber, and TPO membrane flat roofs. Common flat roof repairs include blistering, seam failures, drain blockages, and punctures.',
  },
  {
    q: 'What are signs I need roof repair?',
    a: 'Visible missing or curled shingles, granules in your eavestroughs, water stains on ceilings, daylight visible through the attic, or a roof that\'s 15+ years old with no recent inspection.',
  },
];

const keyPoints: KeyPoint[] = [
  {
    iconId: 'lightning',
    title: 'Fast Calgary Response',
    text: 'We serve all Calgary quadrants — NE, NW, SE, SW. Call us and we\'ll assess your situation as quickly as scheduling allows.',
  },
  {
    iconId: 'search',
    title: 'Free Damage Assessment',
    text: 'We come, we inspect, we give you a written quote. No charge for the inspection, no obligation to proceed.',
  },
  {
    iconId: 'document',
    title: 'Insurance Claim Help',
    text: 'Hail or storm damage? We document the roof condition clearly for your insurer or adjuster.',
  },
];

const accordionItems: AccordionItem[] = [
  {
    title: 'Leak Detection & Repair',
    bullets: [
      'Trace active leaks to their source — often flashing, valleys, or pipe boots',
      'Repair correctly rather than just patching symptoms',
      'Interior water damage assessment and documentation',
      'Fast leak response available across Calgary',
    ],
  },
  {
    title: 'Hail Damage Repair',
    bullets: [
      'Thorough impact assessment — not every dent needs full replacement',
      'Detailed photo documentation for insurance claims',
      'Shingle matching to existing profile and colour where possible',
      'Documentation you can share with your insurance provider',
    ],
  },
  {
    title: 'Storm & Wind Damage',
    bullets: [
      'Lifted, creased, or missing shingles repaired or replaced',
      'Flashing re-secured and sealed after wind events',
      'Written scope of work before any repair begins',
    ],
  },
  {
    title: 'Flat Roof Repairs',
    bullets: [
      'Torch-on modified bitumen — blister and seam repair',
      'EPDM rubber membrane — patch and re-bond',
      'Drain cleaning and re-sloping for ponding water issues',
    ],
  },
  {
    title: 'Emergency Tarping',
    bullets: [
      'Temporary protection applied same day for active leaks',
      'Heavy-duty tarping to prevent further interior damage',
      'Available across all Calgary quadrants',
    ],
  },
];

const steps = [
  { num: 1, title: 'You Call Us', desc: 'Describe the issue — we\'ll assess urgency and schedule immediately.' },
  { num: 2, title: 'Roof Assessment', desc: 'We inspect the damage on-site, at no charge.' },
  { num: 3, title: 'Written Quote', desc: 'Clear written scope of work before any repairs start.' },
  { num: 4, title: 'Repair Work', desc: 'SECOR-certified crew completes the repair to code.' },
  { num: 5, title: 'Final Inspection', desc: 'We confirm the repair is complete and weathertight.' },
];

const twoReviews = reviewsData.slice(2, 4);

export default function RoofRepairPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* Section 1 — Hero */}
      <ServiceHero
        title="Roof Repair & Emergency Services"
        subtitle="Fast response across all Calgary quadrants — leaks, hail damage, storm repair."
        breadcrumb="Services / Roof Repair"
        breadcrumbPath="/services/roof-repair"
      />

      {/* Section 2 — Quick Answer */}
      <section style={{ backgroundColor: 'var(--color-cream)', padding: '64px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ borderLeft: '4px solid var(--color-primary)', padding: '32px', backgroundColor: '#FFFFFF' }}>
            <p style={{ fontSize: '11px', letterSpacing: '2px', color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>
              Quick Answer
            </p>
            <p style={{ color: 'var(--color-text-dark)', fontSize: '16px', lineHeight: 1.7 }}>
              City Roofing &amp; Exteriors provides residential and commercial roof repair across Calgary, Alberta.
              Services include emergency leak repair, hail damage assessment, shingle replacement, flat roof patching,
              and storm damage restoration. Call 403-608-9933 for the next available assessment.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — Key Points */}
      <KeyPoints points={keyPoints} />

      {/* Section 4 — Accordion */}
      <Accordion items={accordionItems} heading="Repair Services We Handle" />

      {/* Section 5 — Process Steps */}
      <section style={{ backgroundColor: 'var(--color-cream-dark)', padding: '80px 24px', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--color-text-dark)', marginBottom: '56px', textAlign: 'center' }}>
            How the Repair Process Works
          </h2>
          <div className="process-steps-row" style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', gap: '16px' }}>
            <div className="process-line-h" />
            {steps.map((step) => (
              <div key={step.num} className="process-step" style={{ flex: 1, textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{ width: '52px', height: '52px', backgroundColor: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '18px', color: '#fff' }}>
                  {step.num}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: 'var(--color-text-dark)', marginBottom: '8px' }}>
                  {step.title}
                </h3>
                <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '13px', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .process-line-h {
            position: absolute;
            top: 26px;
            left: calc(10% + 26px);
            right: calc(10% + 26px);
            height: 2px;
            background: repeating-linear-gradient(90deg, var(--color-primary) 0, var(--color-primary) 8px, transparent 8px, transparent 18px);
            z-index: 0;
          }
          @media (max-width: 768px) {
            .process-steps-row { flex-direction: column !important; align-items: center; gap: 32px !important; }
            .process-line-h { display: none; }
            .process-step { width: 100%; max-width: 280px; }
          }
        `}</style>
      </section>

      {/* Section 6 — Reviews */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--color-text-dark)', marginBottom: '40px', textAlign: 'center' }}>
            What Calgary Homeowners Say
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {twoReviews.map((review) => (
              <div key={review.id} style={{ border: '1px solid var(--color-border-light)', borderRadius: '6px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < review.rating ? '#F5A623' : '#E5E0D8'}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p style={{ color: 'var(--color-text-dark)', fontSize: '15px', lineHeight: 1.6, marginBottom: '16px' }}>
                  &ldquo;{review.text}&rdquo;
                </p>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--color-text-dark)' }}>
                  {review.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7 — CTA */}
      <ServiceCTA headline="Need a Repair Quote?" subtext="Free inspection — honest assessment — no pressure." />

      {/* FAQ */}
      <FAQSection items={faqItems} title="Roof Repair FAQ" />
    </div>
  );
}
