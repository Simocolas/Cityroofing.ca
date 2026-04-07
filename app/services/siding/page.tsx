import type { Metadata } from 'next';
import ServiceHero from '@/components/shared/ServiceHero';
import QuickAnswerBox from '@/components/shared/QuickAnswerBox';
import FAQSection, { FAQItem } from '@/components/shared/FAQSection';
import ServiceCTA from '@/components/shared/ServiceCTA';

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
  description:
    'Vinyl, Hardie board, and metal siding installation and replacement in Calgary. Materials from Kaycan, Royal Building Products, Gentek, Ply Gem, and MITTEN.',
};

const faqItems: FAQItem[] = [
  {
    q: 'How long does siding installation take in Calgary?',
    a: "Most residential siding projects take 2–5 days depending on the size of the home and the siding type. We provide a project timeline in your written estimate.",
  },
  {
    q: 'What siding material is best for Calgary weather?',
    a: "Vinyl siding is the most popular choice in Calgary — it handles freeze-thaw cycles well and doesn't crack or rot. Hardie board (fibre cement) offers superior impact resistance and fire rating. Both are excellent choices depending on your budget and priorities.",
  },
  {
    q: 'Can you match existing siding on my home?',
    a: "We do our best to match profiles and colours, but exact matches can be difficult with discontinued products. We'll assess your current siding and recommend the closest available option.",
  },
  {
    q: 'Do you install siding over existing siding?',
    a: "In most cases, we recommend removing the existing siding to inspect the sheathing and moisture barrier underneath. Installing over damaged or wet sheathing leads to long-term problems.",
  },
  {
    q: 'What brands of siding do you install?',
    a: "We install products from Kaycan, Royal Building Products, Gentek, Ply Gem, and MITTEN — all well-established brands available through Canadian building supply chains with strong warranty programs.",
  },
];

const sidingTypes = [
  {
    title: 'Vinyl Siding',
    desc: `Vinyl siding is durable, low-maintenance, and comes in a wide range of profiles — Dutch lap, clapboard, beaded, and shake. It doesn't need painting, resists moisture, and holds up well through Calgary's extreme temperature swings. City Roofing installs vinyl siding from Kaycan, Royal Building Products, and MITTEN, with colour-matched trim, soffit, and fascia for a complete finish.`,
  },
  {
    title: 'Hardie Board (Fibre Cement)',
    desc: `James Hardie fibre cement siding is one of the most durable exterior cladding materials available. It resists impact, fire, insects, and moisture — and is paintable to any colour. Hardie board has a Class A fire rating and carries a 30-year manufacturer warranty. It's heavier than vinyl and requires more labour-intensive installation, but the durability payoff is significant for Calgary homes.`,
  },
  {
    title: 'Metal Siding',
    desc: `Metal siding panels — including steel and aluminum profiles — are growing in popularity for modern and industrial-style homes in Calgary. City Roofing installs concealed-fastener steel panels and ribbed corrugated profiles. Metal siding is extremely durable, hail-resistant, and requires virtually no maintenance. Available in a range of finishes from matte to metallic.`,
  },
];

const brands = ['Kaycan', 'Royal Building Products', 'Gentek', 'Ply Gem', 'MITTEN'];

export default function SidingPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <ServiceHero
        title="Siding Installation & Replacement in Calgary"
        subtitle="Vinyl, Hardie board, and metal siding from trusted brands — professionally installed across Calgary."
        breadcrumb="Services / Siding"
        breadcrumbPath="/services/siding"
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 24px' }}>
        <QuickAnswerBox>
          City Roofing &amp; Exteriors installs and replaces siding on residential and commercial properties across
          Calgary, Alberta. We work with vinyl siding, Hardie board (fibre cement), and metal siding panels using
          materials from Kaycan, Royal Building Products, Gentek, Ply Gem, and MITTEN. SECOR certified crew,
          WCB Alberta insured, BBB Accredited. Call 403-608-9933 for a free estimate.
        </QuickAnswerBox>

        {/* Siding types */}
        <section style={{ marginBottom: '72px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 38px)', color: 'var(--color-text-primary)', marginBottom: '36px' }}>
            Siding Types We Install
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {sidingTypes.map((type) => (
              <div key={type.title} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '32px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--color-text-primary)', marginBottom: '12px' }}>
                  {type.title}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: 1.8 }}>{type.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Brands */}
        <section
          style={{
            marginBottom: '72px',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            padding: '40px',
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', color: 'var(--color-text-primary)', marginBottom: '24px' }}>
            Brands We Install
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {brands.map((brand) => (
              <span
                key={brand}
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  padding: '8px 20px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.5px',
                }}
              >
                {brand}
              </span>
            ))}
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginTop: '20px' }}>
            All materials are sourced from established Canadian distributors and carry manufacturer warranties.
          </p>
        </section>
      </div>

      <FAQSection items={faqItems} title="Siding FAQ" />
      <ServiceCTA headline="Ready to Replace Your Siding?" subtext="Free estimate — no obligation." />
    </div>
  );
}
