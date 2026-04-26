import type { Metadata } from 'next';
import ServiceHero from '@/components/shared/ServiceHero';
import FAQSection, { FAQItem } from '@/components/shared/FAQSection';
import ServiceCTA from '@/components/shared/ServiceCTA';
import Accordion, { AccordionItem } from '@/components/shared/Accordion';
import KeyPoints, { KeyPoint } from '@/components/shared/KeyPoints';
import reviewsData from '@/data/reviews.json';

export const metadata: Metadata = {
  title: 'Siding Installation Calgary | City Roofing & Exteriors',
  description:
    'Vinyl, Hardie board and metal siding in Calgary. Kaycan, Royal, Gentek, Ply Gem, MITTEN. Free estimates 403-608-9933.',
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Siding Installation Calgary',
  provider: { '@type': 'LocalBusiness', name: 'City Roofing & Exteriors' },
  areaServed: 'Calgary, Alberta',
  description: 'Vinyl, Hardie board, and metal siding installation and replacement in Calgary. Materials from Kaycan, Royal Building Products, Gentek, Ply Gem, and MITTEN.',
};

const faqItems: FAQItem[] = [
  {
    q: 'How long does siding installation take in Calgary?',
    a: 'Most residential siding projects take 2–5 days depending on the size of the home and the siding type. We provide a project timeline in your written estimate.',
  },
  {
    q: 'What siding material is best for Calgary weather?',
    a: 'Vinyl siding is a common choice in Calgary because it handles moisture and temperature swings well. Hardie board (fibre cement) offers strong impact resistance and fire performance. The right choice depends on your budget, home style and priorities.',
  },
  {
    q: 'Can you match existing siding on my home?',
    a: 'We do our best to match profiles and colours, but exact matches can be difficult with discontinued products. We\'ll assess your current siding and recommend the closest available option.',
  },
  {
    q: 'Do you install siding over existing siding?',
    a: 'In most cases, we recommend removing the existing siding to inspect the sheathing and moisture barrier underneath. Installing over damaged or wet sheathing leads to long-term problems.',
  },
  {
    q: 'What brands of siding do you install?',
    a: 'We install products from Kaycan, Royal Building Products, Gentek, Ply Gem, and MITTEN — all well-established brands available through Canadian building supply chains with strong warranty programs.',
  },
];

const keyPoints: KeyPoint[] = [
  {
    iconId: 'layers',
    title: 'Multiple Material Options',
    text: 'Vinyl, Hardie board, metal panel — we work with all types. We\'ll help you choose what fits your home and budget.',
  },
  {
    iconId: 'badge',
    title: 'Established Product Lines',
    text: 'We install Kaycan, Royal Building Products, Gentek, Ply Gem, and MITTEN — product lines with Canadian distribution and warranty support.',
  },
  {
    iconId: 'home',
    title: 'Roofing & Siding Together',
    text: 'Need both? One crew coordinates the roofing and exterior work, so scheduling and cleanup are simpler.',
  },
];

const accordionItems: AccordionItem[] = [
  {
    title: 'Vinyl Siding',
    bullets: [
      'Dutch lap, clapboard, beaded, and shake profiles available',
      'No painting required — colour goes all the way through the material',
      'Resists moisture, rot, and Calgary temperature extremes',
      'Colour-matched trim, soffit, and fascia for a complete finish',
    ],
  },
  {
    title: 'Hardie Board (Fibre Cement)',
    bullets: [
      'Class A fire rating — highest available for exterior cladding',
      'Resists impact, insects, moisture, and rot',
      'Paintable to any colour — 30-year manufacturer warranty',
      'Ideal for Calgary homes where durability is the priority',
    ],
  },
  {
    title: 'Metal Siding',
    bullets: [
      'Steel and aluminum panels — concealed fastener and corrugated profiles',
      'Extremely hail-resistant — popular for modern Calgary homes',
      'Virtually maintenance-free for decades',
    ],
  },
  {
    title: 'Soffit & Fascia',
    bullets: [
      'Vented and non-vented soffit for proper attic airflow',
      'Fascia replacement to eliminate rot and improve curb appeal',
      'Colour-matched to your siding for a seamless finish',
    ],
  },
];

const steps = [
  { num: 1, title: 'Free Consultation', desc: 'We assess your current siding and discuss your goals.' },
  { num: 2, title: 'Material Selection', desc: 'Choose siding type from our full product range.' },
  { num: 3, title: 'Colour & Style', desc: 'Pick profile, colour, and trim details.' },
  { num: 4, title: 'Installation', desc: 'In-house crew installs with proper moisture barrier.' },
  { num: 5, title: 'Final Inspection', desc: 'Complete walkthrough and cleanup before we leave.' },
];

const twoReviews = reviewsData.slice(0, 2);

export default function SidingPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* Section 1 — Hero */}
      <ServiceHero
        title="Siding Installation in Calgary"
        subtitle="Vinyl, Hardie board and metal siding — clear options, in-house installation."
        breadcrumb="Services / Siding"
        breadcrumbPath="/services/siding"
      />

      {/* Section 2 — Quick Answer */}
      <section style={{ backgroundColor: 'var(--color-cream)', padding: '64px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ borderLeft: '4px solid var(--color-primary)', padding: '32px', backgroundColor: '#FFFFFF' }}>
            <p style={{ fontSize: '11px', letterSpacing: '2px', color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>
              Quick Answer
            </p>
            <p style={{ color: 'var(--color-text-dark)', fontSize: '16px', lineHeight: 1.7 }}>
              City Roofing &amp; Exteriors installs and replaces siding on residential and commercial properties across
              Calgary, Alberta. We work with vinyl siding, Hardie board (fibre cement), and metal siding panels using
              materials from Kaycan, Royal Building Products, Gentek, Ply Gem, and MITTEN. Call 403-608-9933 for a
              free estimate.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — Key Points */}
      <KeyPoints points={keyPoints} />

      {/* Section 4 — Accordion */}
      <Accordion items={accordionItems} heading="Siding Types & Options" />

      {/* Section 5 — Process Steps */}
      <section style={{ backgroundColor: 'var(--color-cream-dark)', padding: '80px 24px', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--color-text-dark)', marginBottom: '56px', textAlign: 'center' }}>
            Our Siding Installation Process
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
      <ServiceCTA headline="Ready to Replace Your Siding?" subtext="Free estimate — no obligation." />

      {/* FAQ */}
      <FAQSection items={faqItems} title="Siding FAQ" />
    </div>
  );
}
