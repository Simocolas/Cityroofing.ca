import type { Metadata } from 'next';
import ServiceHero from '@/components/shared/ServiceHero';
import FAQSection, { FAQItem } from '@/components/shared/FAQSection';
import ServiceCTA from '@/components/shared/ServiceCTA';
import Accordion, { AccordionItem } from '@/components/shared/Accordion';
import KeyPoints, { KeyPoint } from '@/components/shared/KeyPoints';
import reviewsData from '@/data/reviews.json';

export const metadata: Metadata = {
  title: 'Roof Replacement Calgary | City Roofing & Exteriors',
  description:
    'Expert roof replacement in Calgary. Asphalt shingles, flat roof, metal roofing. 15+ years, 4.8★ Google rating, SECOR certified. Free estimate: 403-608-9933.',
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Roof Replacement Calgary',
  provider: { '@type': 'LocalBusiness', name: 'City Roofing & Exteriors' },
  areaServed: 'Calgary, Alberta',
  description: 'Complete residential and commercial roof replacement in Calgary. Asphalt shingles, flat roof, metal roofing.',
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How City Roofing Replaces Your Roof',
  step: [
    { '@type': 'HowToStep', name: 'Free Inspection', text: 'We conduct a thorough on-site roof inspection at no cost.' },
    { '@type': 'HowToStep', name: 'Written Estimate', text: 'You receive a detailed written estimate with material options and pricing.' },
    { '@type': 'HowToStep', name: 'Material Selection', text: 'Choose your preferred shingle style, colour, and manufacturer.' },
    { '@type': 'HowToStep', name: 'Installation Day', text: 'Our SECOR-certified crew completes the replacement, typically in one day.' },
    { '@type': 'HowToStep', name: 'Final Walkthrough', text: 'We walk through the finished roof with you and provide all warranty documentation.' },
  ],
};

const faqItems: FAQItem[] = [
  {
    q: 'How much does roof replacement cost in Calgary?',
    a: 'Most residential replacements range $8,000–$20,000 for asphalt shingles. Metal roofing runs $18,000–$35,000+. Final cost depends on roof size, pitch, and materials chosen.',
  },
  {
    q: 'How long does roof replacement take?',
    a: 'Most residential roofs complete in 1–2 days. Larger or complex roofs may take 3–5 days.',
  },
  {
    q: 'What roofing material is best for Calgary weather?',
    a: 'Class 4 impact-resistant asphalt shingles are the most popular in Calgary due to hail risk. Many insurers offer premium discounts for this rating.',
  },
  {
    q: 'Do you handle insurance claims for roof replacement?',
    a: 'Yes. We document storm and hail damage thoroughly and work alongside your insurance adjuster throughout the process.',
  },
  {
    q: 'How do I know if I need replacement vs repair?',
    a: 'If more than 25–30% of your shingles are damaged, or your roof is over 20 years old, replacement is usually more cost-effective. We assess this during our free inspection.',
  },
  {
    q: 'What warranty do you offer?',
    a: 'We offer manufacturer warranties on all materials plus our own workmanship warranty. Details provided in your written quote.',
  },
  {
    q: 'Do you serve areas outside Calgary?',
    a: 'Yes — Airdrie, Cochrane, Chestermere, and Okotoks.',
  },
  {
    q: 'Are you SECOR certified and WCB insured?',
    a: 'Yes. City Roofing & Exteriors holds SECOR safety certification and is registered with WCB Alberta on every job.',
  },
];

const keyPoints: KeyPoint[] = [
  {
    iconId: 'shield',
    title: 'Transparent Pricing',
    text: 'Written quote before we start. No surprises, no hidden fees. What we quote is what you pay.',
  },
  {
    iconId: 'team',
    title: 'In-House Crew Only',
    text: 'Every roofer on your job is our full-time employee. We never subcontract — same team, start to finish.',
  },
  {
    iconId: 'star',
    title: '15 Years, 3,000+ Projects',
    text: "Calgary's most experienced local roofer. 158 Google reviews averaging 4.8 stars speaks for itself.",
  },
];

const accordionItems: AccordionItem[] = [
  {
    title: 'Asphalt Shingles',
    bullets: [
      'Architectural (laminate) and 3-tab shingles from IKO, BP/BMCA, GAF, Owens Corning, CertainTeed, Malarkey',
      'Class 4 impact-resistant options — reduce insurance premiums by 15–30%',
      '30–50 year manufacturer warranties on premium products',
      'Widest range of colours and profiles to match any home style',
    ],
  },
  {
    title: 'Flat Roof Systems',
    bullets: [
      'Torch-on modified bitumen — the most common flat roof system in Calgary',
      'EPDM rubber membrane — excellent flexibility through freeze-thaw cycles',
      'All installations include proper drainage slope and edge termination',
      'Available for residential garages, additions, and commercial flat roofs',
    ],
  },
  {
    title: 'Metal Roofing',
    bullets: [
      'Standing seam and metal shingle systems — last 40–70 years',
      'Exceptional performance against hail, heavy snow, and chinook winds',
      'Available in dozens of profiles and colours',
    ],
  },
  {
    title: 'Class 4 Impact-Resistant Shingles',
    bullets: [
      'Highest hail-resistance rating — UL 2218 Class 4 certified',
      'Calgary averages 15–20 significant hail events per year',
      'Many Alberta insurers offer 15–30% premium discounts for Class 4',
    ],
  },
];

const steps = [
  { num: 1, title: 'Free Inspection', desc: 'On-site assessment at no cost or obligation.' },
  { num: 2, title: 'Written Estimate', desc: 'Detailed quote with material options and pricing.' },
  { num: 3, title: 'Material Selection', desc: 'Choose shingle style, colour, and manufacturer.' },
  { num: 4, title: 'Installation Day', desc: 'SECOR-certified crew, typically completed in one day.' },
  { num: 5, title: 'Final Walkthrough', desc: 'Quality inspection and full warranty documentation.' },
];

const twoReviews = reviewsData.slice(0, 2);

export default function RoofReplacementPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* Section 1 — Hero */}
      <ServiceHero
        title="Roof Replacement in Calgary"
        subtitle="Complete re-roofing with premium materials — honest pricing, in-house crew."
        breadcrumb="Services / Roof Replacement"
        breadcrumbPath="/services/roof-replacement"
      />

      {/* Section 2 — Quick Answer */}
      <section style={{ backgroundColor: 'var(--color-cream)', padding: '64px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ borderLeft: '4px solid var(--color-primary)', padding: '32px', backgroundColor: '#FFFFFF' }}>
            <p style={{ fontSize: '11px', letterSpacing: '2px', color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>
              Quick Answer
            </p>
            <p style={{ color: 'var(--color-text-dark)', fontSize: '16px', lineHeight: 1.7 }}>
              City Roofing &amp; Exteriors provides complete roof replacement in Calgary, Alberta. With 15+ years of
              local experience and 158 Google reviews averaging 4.8 stars, we replace asphalt shingle roofs, flat roofs,
              and metal roofs for residential and commercial properties. SECOR certified, WCB Alberta registered.
              Call 403-608-9933 for a free on-site estimate.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — Key Points */}
      <KeyPoints points={keyPoints} />

      {/* Section 4 — Accordion */}
      <Accordion items={accordionItems} heading="Materials & Options" />

      {/* Section 5 — Process Steps */}
      <section style={{ backgroundColor: 'var(--color-cream-dark)', padding: '80px 24px', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--color-text-dark)', marginBottom: '56px', textAlign: 'center' }}>
            Our Roof Replacement Process
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
      <ServiceCTA headline="Ready for a New Roof?" subtext="Free inspection. Honest estimate. No pressure." />

      {/* FAQ */}
      <FAQSection items={faqItems} title="Roof Replacement FAQ" />
    </div>
  );
}
