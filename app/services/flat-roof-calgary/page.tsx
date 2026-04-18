import type { Metadata } from 'next';
import Link from 'next/link';
import ServiceHero from '@/components/shared/ServiceHero';
import FAQSection, { FAQItem } from '@/components/shared/FAQSection';
import ServiceCTA from '@/components/shared/ServiceCTA';
import QuickAnswerBox from '@/components/shared/QuickAnswerBox';

export const metadata: Metadata = {
  title: 'Calgary Flat Roof Contractor | Commercial & TPO Roofing | City Roofing',
  description:
    "Calgary's experienced flat roof contractors. TPO, EPDM & modified bitumen for commercial & residential. 15+ years, free estimates. Call 403-608-9933.",
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Flat Roof & Commercial Roofing Calgary',
  provider: {
    '@type': 'LocalBusiness',
    name: 'City Roofing & Exteriors',
    telephone: '403-608-9933',
    address: { '@type': 'PostalAddress', addressLocality: 'Calgary', addressRegion: 'Alberta', addressCountry: 'CA' },
  },
  areaServed: 'Calgary, Alberta',
  serviceType: ['Flat Roofing', 'TPO Installation', 'EPDM Roofing', 'Commercial Roof Replacement', 'Flat Roof Repair'],
  description:
    "Calgary's experienced flat roof contractors specializing in TPO, EPDM, and SBS-modified bitumen systems for commercial and residential properties.",
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does a flat roof last in Calgary\'s climate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Quality flat roofing systems last 15–25 years in Calgary\'s climate with proper installation and maintenance. TPO and torch-on modified bitumen systems typically reach the higher end of that range.',
      },
    },
    {
      '@type': 'Question',
      name: 'What\'s the best flat roof material for Calgary winters?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SBS-modified bitumen (torch-on) is the most proven choice for Calgary winters due to its rubber-modified flexibility in extreme cold and strong resistance to freeze-thaw cycling. EPDM is also excellent in cold climates, remaining flexible well below -40°C.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you handle commercial insurance roof claims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. City Roofing is Xactimate-certified and has extensive experience documenting commercial flat roof damage for hail and storm insurance claims. We work directly with Alberta adjusters throughout the process.',
      },
    },
    {
      '@type': 'Question',
      name: 'What areas of Calgary do you serve for flat roofing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We serve all Calgary quadrants — NE, NW, SE, and SW — as well as Airdrie, Chestermere, Cochrane, and Okotoks. Call 403-608-9933 to confirm availability in your area.',
      },
    },
  ],
};

const faqItems: FAQItem[] = [
  {
    q: "How long does a flat roof last in Calgary's climate?",
    a: "Quality flat roofing systems last 15–25 years in Calgary's climate with proper installation and maintenance. TPO and torch-on modified bitumen systems typically reach the higher end of that range.",
  },
  {
    q: "What's the best flat roof material for Calgary winters?",
    a: 'SBS-modified bitumen (torch-on) is the most proven choice for Calgary winters due to its rubber-modified flexibility in extreme cold and strong resistance to freeze-thaw cycling. EPDM is also excellent in cold climates, remaining flexible well below -40°C.',
  },
  {
    q: 'Do you handle commercial insurance roof claims?',
    a: 'Yes. City Roofing is Xactimate-certified and has extensive experience documenting commercial flat roof damage for hail and storm insurance claims. We work directly with Alberta adjusters throughout the process.',
  },
  {
    q: 'What areas of Calgary do you serve for flat roofing?',
    a: 'We serve all Calgary quadrants — NE, NW, SE, and SW — as well as Airdrie, Chestermere, Cochrane, and Okotoks. Call 403-608-9933 to confirm availability in your area.',
  },
];

const h2Style = {
  fontFamily: 'var(--font-display)',
  fontWeight: 800 as const,
  fontSize: 'clamp(26px, 3.5vw, 38px)' as const,
  color: 'var(--color-text-primary)',
  marginBottom: '36px',
};

const h3Style = {
  fontFamily: 'var(--font-display)',
  fontWeight: 700 as const,
  fontSize: '22px',
  color: 'var(--color-text-primary)',
  marginBottom: '12px',
};

const bodyStyle = {
  color: 'var(--color-text-muted)',
  fontSize: '16px',
  lineHeight: 1.8 as const,
};

const systems = [
  {
    title: 'TPO Membrane Roofing',
    body: 'TPO (Thermoplastic Polyolefin) is a single-ply white reflective membrane heat-welded at seams, creating watertight joints stronger than adhesive-set systems. Its UV-reflective surface reduces cooling costs and it is highly resistant to chemicals and puncture from rooftop HVAC equipment. Ideal for large commercial flat rooftops where energy efficiency and long-term durability are priorities. City Roofing installs fully adhered, mechanically fastened, and ballasted TPO systems to suit your building\'s structural requirements.',
  },
  {
    title: 'EPDM Rubber Roofing',
    body: 'EPDM (ethylene propylene diene monomer) is a synthetic rubber membrane engineered to remain flexible at temperatures well below -40°C — making it one of the best flat roofing choices for Calgary winters. Unlike membranes that crack under thermal stress, EPDM accommodates building movement without stress fractures. It carries 20–30 year manufacturer warranties when installed by certified contractors and is one of the lowest lifecycle-cost flat roof options available.',
  },
  {
    title: 'SBS Modified Bitumen',
    body: 'SBS-modified bitumen (torch-on) is the most widely specified flat roofing system in Calgary commercial and residential construction. Applied by heat-fusing the membrane directly to the roof deck with a propane torch, it creates a seamless, waterproof bond proven to withstand freeze-thaw cycling, chinook temperature swings, and hail impact. City Roofing installs both two-ply and three-ply torch-on systems depending on your exposure level and warranty requirements.',
  },
  {
    title: 'Built-Up Roofing (BUR)',
    body: 'Built-up roofing is the traditional multi-layer flat roof system — alternating reinforcing felts and bitumen topped with a granule cap or gravel ballast. BUR provides outstanding waterproofing redundancy and heavy foot-traffic resistance, and has protected buildings for over 100 years. While newer systems dominate new construction, BUR remains a proven choice for certain commercial applications and is still installed and repaired by City Roofing crews across Calgary.',
  },
];

const commercialTypes = [
  { label: 'Warehouses & Industrial', desc: 'Large-span flat roofs with mechanical penetrations, skylights, and high foot-traffic service areas.' },
  { label: 'Retail & Strip Plazas', desc: 'Multi-tenant buildings with varied occupancy scheduling — phased roofing to keep tenants open.' },
  { label: 'Strata & Multi-Unit Residential', desc: 'Condo boards and strata corporations with full documentation for reserve fund compliance.' },
  { label: 'Office Buildings', desc: 'TPO and EPDM systems for low-slope office roofs, with minimal disruption to building operations.' },
];

const whyPoints = [
  { icon: '👷', title: 'In-House Crews Only', desc: 'We never subcontract our roofing work. Every installer is a trained City Roofing employee — consistent quality on every project.' },
  { icon: '📋', title: 'Xactimate-Certified', desc: 'Our estimators use industry-standard Xactimate software to document damage and prepare reports accepted by all major Alberta insurers.' },
  { icon: '🛡️', title: 'SECOR Certified Safety', desc: 'Certificate of Recognition (SECOR) from Alberta Construction Safety Association — required for many commercial contracts in Alberta.' },
  { icon: '🏗️', title: '$3M+ Commercial Completed', desc: 'Over $3 million in commercial flat roofing projects across Calgary — warehouses, plazas, industrial, and multi-unit buildings.' },
  { icon: '🔍', title: 'Free Commercial Roof Assessments', desc: 'We conduct full on-site assessments for commercial flat roofs at no cost. Detailed written scope and options within 48 hours.' },
];

const materialTable = [
  { material: 'TPO', lifespan: '20–30 yrs', climateRating: '★★★★☆', bestFor: 'Large commercial, energy efficiency', cost: '$3.50–$5.50' },
  { material: 'EPDM', lifespan: '20–30 yrs', climateRating: '★★★★★', bestFor: 'Cold climates, low-slope commercial', cost: '$3.00–$5.00' },
  { material: 'Modified Bitumen (SBS)', lifespan: '15–25 yrs', climateRating: '★★★★★', bestFor: 'Calgary residential & commercial', cost: '$3.50–$6.00' },
  { material: 'BUR', lifespan: '20–30 yrs', climateRating: '★★★★☆', bestFor: 'High foot-traffic, heavy-duty commercial', cost: '$4.00–$7.00' },
];

export default function FlatRoofCalgaryPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <ServiceHero
        title="Calgary Flat Roof Contractor"
        subtitle="TPO, EPDM & modified bitumen for commercial and residential flat roofs — in-house crews, free assessments."
        breadcrumb="Services / Flat Roof Calgary"
        breadcrumbPath="/services/flat-roof-calgary"
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 24px' }}>

        {/* Quick Answer */}
        <QuickAnswerBox>
          <strong>
            City Roofing &amp; Exteriors is Calgary&apos;s experienced flat roof contractor, specializing in TPO, EPDM,
            and SBS-modified bitumen systems for commercial and residential properties. With 15+ years serving Calgary
            businesses and homeowners, our in-house crews handle flat roof installation, repair, and full replacement
            across all Calgary quadrants and surrounding areas including Airdrie, Chestermere, and Cochrane.
          </strong>
        </QuickAnswerBox>

        {/* Systems */}
        <section style={{ marginBottom: '72px' }}>
          <h2 style={h2Style}>Flat Roofing Systems We Install in Calgary</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {systems.map((s) => (
              <div key={s.title} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '36px' }}>
                <h3 style={h3Style}>{s.title}</h3>
                <p style={bodyStyle}>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Commercial */}
        <section style={{ marginBottom: '72px' }}>
          <h2 style={h2Style}>Commercial Roofing Services Calgary</h2>
          <p style={{ ...bodyStyle, marginBottom: '32px' }}>
            City Roofing &amp; Exteriors has completed commercial flat roofing projects exceeding $3 million CAD across
            Calgary and surrounding Alberta communities. We service warehouses, retail plazas, industrial facilities,
            strata corporations, and multi-unit residential buildings. Our commercial project managers coordinate
            scheduling around your operations to minimize disruption, and every project is delivered with full
            manufacturer and workmanship documentation.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            {commercialTypes.map((t) => (
              <div
                key={t.label}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderTop: '3px solid var(--color-primary)',
                  borderRadius: '0 0 6px 6px',
                  padding: '24px',
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '17px', color: 'var(--color-text-primary)', marginBottom: '10px' }}>
                  {t.label}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', lineHeight: 1.7 }}>{t.desc}</p>
              </div>
            ))}
          </div>
          <Link
            href="/services/commercial"
            style={{ color: 'var(--color-accent)', textDecoration: 'none', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px' }}
          >
            View all Commercial Roofing Services →
          </Link>
        </section>

        {/* Why City Roofing */}
        <section style={{ marginBottom: '72px' }}>
          <h2 style={h2Style}>Why Calgary Businesses Choose City Roofing</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {whyPoints.map((p) => (
              <div
                key={p.title}
                style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                  padding: '24px',
                }}
              >
                <span style={{ fontSize: '24px', flexShrink: 0 }}>{p.icon}</span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                    {p.title}
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '15px', lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Material Comparison Table */}
        <section style={{ marginBottom: '72px' }}>
          <h2 style={h2Style}>Flat Roof Material Comparison</h2>
          <p style={{ ...bodyStyle, marginBottom: '28px' }}>
            Choosing the right flat roof system for Calgary&apos;s climate depends on your building type, budget, and
            long-term maintenance preferences. The table below compares the four major systems City Roofing installs.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-primary)' }}>
                  {['Material', 'Lifespan', 'Calgary Climate Rating', 'Best For', 'Approx Cost/sqft'].map((col) => (
                    <th
                      key={col}
                      style={{
                        color: '#fff',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '13px',
                        textAlign: 'left',
                        padding: '14px 16px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {materialTable.map((row, i) => (
                  <tr
                    key={row.material}
                    style={{ backgroundColor: i % 2 === 0 ? 'var(--color-surface)' : '#1E1E1E' }}
                  >
                    <td style={{ padding: '14px 16px', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>
                      {row.material}
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>{row.lifespan}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>{row.climateRating}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--color-text-muted)' }}>{row.bestFor}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginTop: '12px', fontStyle: 'italic' }}>
            * Cost per square foot estimates reflect Calgary market pricing for supply and installation. Final pricing depends on roof size, access, substrate condition, and system specification.
          </p>
        </section>

        {/* Mid-page CTA */}
        <section style={{ marginBottom: '72px', backgroundColor: 'var(--color-primary)', borderRadius: '6px', padding: '40px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(22px, 3vw, 30px)', color: '#fff', marginBottom: '12px' }}>
            Get a Free Commercial Roof Assessment
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', marginBottom: '28px', lineHeight: 1.6 }}>
            Our team provides free on-site assessments for commercial flat roofs across Calgary. Written scope and options within 48 hours.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              style={{ backgroundColor: '#fff', color: 'var(--color-primary)', padding: '14px 28px', borderRadius: '4px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}
            >
              Request Free Assessment
            </Link>
            <a
              href="tel:403-608-9933"
              style={{ border: '2px solid rgba(255,255,255,0.7)', color: '#fff', padding: '14px 28px', borderRadius: '4px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}
            >
              Call 403-608-9933
            </a>
          </div>
        </section>

        {/* Internal links */}
        <section style={{ marginBottom: '72px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link
            href="/services/commercial"
            style={{ flex: 1, minWidth: '220px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '24px', textDecoration: 'none', display: 'block' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: 'var(--color-text-primary)', marginBottom: '6px' }}>
              Commercial Roofing Calgary →
            </div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>Full-scope commercial roofing services, $3M+ completed</div>
          </Link>
          <Link
            href="/insurance-claims"
            style={{ flex: 1, minWidth: '220px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '24px', textDecoration: 'none', display: 'block' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: 'var(--color-text-primary)', marginBottom: '6px' }}>
              Insurance Claim Roofing →
            </div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>Xactimate-certified hail and storm damage claims</div>
          </Link>
          <Link
            href="/contact"
            style={{ flex: 1, minWidth: '220px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '24px', textDecoration: 'none', display: 'block' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: 'var(--color-text-primary)', marginBottom: '6px' }}>
              Get an Estimate →
            </div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>Free quote — no obligation</div>
          </Link>
        </section>

      </div>

      <FAQSection items={faqItems} title="Calgary Flat Roof FAQ" />
      <ServiceCTA headline="Ready for a Free Flat Roof Assessment?" subtext="In-house crews. Free estimates. No pressure." />
    </div>
  );
}
