import type { Metadata } from 'next';
import ServiceHero from '@/components/shared/ServiceHero';
import FAQSection, { FAQItem } from '@/components/shared/FAQSection';
import ServiceCTA from '@/components/shared/ServiceCTA';
import Accordion, { AccordionItem } from '@/components/shared/Accordion';
import KeyPoints, { KeyPoint } from '@/components/shared/KeyPoints';
import reviewsData from '@/data/reviews.json';

export const metadata: Metadata = {
  title: 'Commercial Roofing Calgary | City Roofing & Exteriors',
  description:
    'Commercial roofing in Calgary. $3M+ project experience, flat roof systems, torch-on, EPDM/TPO. 403-608-9933.',
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Commercial Roofing Calgary',
  provider: { '@type': 'LocalBusiness', name: 'City Roofing & Exteriors' },
  areaServed: 'Calgary, Alberta',
  description: 'Commercial roofing services in Calgary including flat roof systems, torch-on, EPDM, and TPO membrane installation and repair.',
};

const faqItems: FAQItem[] = [
  {
    q: 'What types of commercial roofing does City Roofing install?',
    a: 'We install torch-on modified bitumen, EPDM rubber membrane, and TPO single-ply membrane systems — the three most common commercial flat roof systems used in Calgary and Alberta.',
  },
  {
    q: 'What is the largest commercial roofing project you have completed?',
    a: 'City Roofing has completed commercial roofing projects exceeding $3 million CAD cumulatively, including warehouse facilities, retail plazas, and multi-unit residential buildings across Calgary.',
  },
  {
    q: 'How do you minimize disruption to our business during roofing?',
    a: 'We schedule work around your business hours where possible and coordinate sequenced crew deployment to minimize noise, debris, and access disruption. We discuss scheduling in detail before the project begins.',
  },
  {
    q: 'Do you offer commercial roofing maintenance programs?',
    a: 'Yes. Preventive maintenance — annual inspections, seam checks, drain clearing — is the most cost-effective way to extend flat roof life and avoid emergency repairs. Contact us to discuss a maintenance schedule.',
  },
  {
    q: 'Are you able to handle commercial insurance claims?',
    a: 'Yes. We have experience documenting commercial hail and storm damage for insurance purposes and can work with your broker and adjuster throughout the process.',
  },
];

const keyPoints: KeyPoint[] = [
  {
    iconId: 'building',
    title: '$3M+ Project Experience',
    text: 'We\'ve completed large-scale commercial projects across Calgary — warehouses, retail plazas, industrial facilities, multi-unit buildings.',
  },
  {
    iconId: 'certificate',
    title: 'Fully Certified & Insured',
    text: 'SECOR certified, WCB Alberta registered, BBB Accredited. All documentation available for your procurement process.',
  },
  {
    iconId: 'calendar',
    title: 'Minimal Business Disruption',
    text: 'We plan around your operations. Phased scheduling, early starts, clear milestones — your business stays open.',
  },
];

const accordionItems: AccordionItem[] = [
  {
    title: 'Torch-On Modified Bitumen',
    bullets: [
      'Most widely specified flat roof system in Calgary commercial construction',
      'Two-ply system — base sheet and granular cap sheet, heat-fused for watertight bond',
      'Proven performance through Alberta temperature extremes and chinook cycles',
      'Cost-effective to repair — spot repairs extend roof life significantly',
    ],
  },
  {
    title: 'TPO Single-Ply Membrane',
    bullets: [
      'Heat-welded seams — stronger than adhesive-set systems',
      'White reflective surface meets energy code requirements',
      'Resistant to UV, chemicals, and puncture from rooftop equipment',
      'Ideal for large commercial rooftops with mechanical equipment',
    ],
  },
  {
    title: 'EPDM Rubber Roofing',
    bullets: [
      'Remains flexible at -40°C — no cracking through Calgary winters',
      '20–30 year manufacturer warranties when installed by certified contractors',
      'Low lifecycle cost — one of the most durable flat roof options available',
    ],
  },
  {
    title: 'Metal Roofing Systems',
    bullets: [
      'Standing seam and through-fastened panels for low-slope commercial applications',
      '40–70 year lifespan — lowest lifecycle cost of any roofing system',
      'Excellent performance against Calgary hail and heavy snow loads',
    ],
  },
  {
    title: 'Maintenance Programs',
    bullets: [
      'Annual inspection and condition report — catch problems before they become expensive',
      'Seam checks, drain clearing, flashing re-seal as required',
      'Priority scheduling for maintenance clients during emergency events',
    ],
  },
];

const steps = [
  { num: 1, title: 'Site Assessment', desc: 'Full on-site evaluation of existing roof system and conditions.' },
  { num: 2, title: 'Scope & Quote', desc: 'Detailed written scope of work with system options and pricing.' },
  { num: 3, title: 'Project Planning', desc: 'Scheduling, phasing, and logistics agreed before work begins.' },
  { num: 4, title: 'Phased Installation', desc: 'Sequenced work to minimize disruption to your operations.' },
  { num: 5, title: 'Inspection & Docs', desc: 'Final sign-off, warranty documentation, and closeout package.' },
];

const twoReviews = reviewsData.slice(1, 3);

export default function CommercialRoofingPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* Section 1 — Hero */}
      <ServiceHero
        title="Commercial Roofing Calgary"
        subtitle="Large-scale projects delivered on schedule — certified, insured, accountable."
        breadcrumb="Services / Commercial Roofing"
        breadcrumbPath="/services/commercial"
      />

      {/* Stats Bar */}
      <div style={{ backgroundColor: 'var(--color-base)', borderBottom: '1px solid var(--color-border)', padding: '32px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '24px' }}>
          {[
            { value: '$3M+', label: 'Commercial Projects' },
            { value: 'SECOR', label: 'Safety Certified' },
            { value: 'WCB', label: 'Alberta Registered' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(28px, 4vw, 44px)', color: '#FFFFFF', lineHeight: 1, marginBottom: '8px' }}>
                {stat.value}
              </div>
              <div style={{ color: '#9A9A9A', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2 — Quick Answer */}
      <section style={{ backgroundColor: 'var(--color-cream)', padding: '64px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ borderLeft: '4px solid var(--color-primary)', padding: '32px', backgroundColor: '#FFFFFF' }}>
            <p style={{ fontSize: '11px', letterSpacing: '2px', color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>
              Quick Answer
            </p>
            <p style={{ color: 'var(--color-text-dark)', fontSize: '16px', lineHeight: 1.7 }}>
              City Roofing &amp; Exteriors delivers commercial roofing in Calgary with $3M+ cumulative project experience.
              Our commercial division installs torch-on, EPDM, and TPO flat roof systems for warehouses, retail plazas,
              and multi-unit buildings. SECOR certified, WCB Alberta registered. Call 403-608-9933 to discuss your project.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — Key Points */}
      <KeyPoints points={keyPoints} />

      {/* Section 4 — Accordion */}
      <Accordion items={accordionItems} heading="Commercial Roofing Systems" />

      {/* Section 5 — Process Steps */}
      <section style={{ backgroundColor: 'var(--color-cream-dark)', padding: '80px 24px', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--color-text-dark)', marginBottom: '56px', textAlign: 'center' }}>
            Our Commercial Project Process
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
            What Our Clients Say
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
      <ServiceCTA headline="Have a Commercial Project?" subtext="Let's talk scope, timeline, and budget." />

      {/* FAQ */}
      <FAQSection items={faqItems} title="Commercial Roofing FAQ" />
    </div>
  );
}
