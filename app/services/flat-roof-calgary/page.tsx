import type { Metadata } from 'next';
import Link from 'next/link';
import ServiceHero from '@/components/shared/ServiceHero';
import FAQSection, { FAQItem } from '@/components/shared/FAQSection';
import ServiceCTA from '@/components/shared/ServiceCTA';
import QuickAnswerBox from '@/components/shared/QuickAnswerBox';

export const metadata: Metadata = {
  title: 'Calgary Flat Roof Contractor | Commercial & TPO Roofing | City Roofing',
  description:
    'Calgary flat roof contractors for TPO, EPDM and modified bitumen systems on commercial and residential roofs. 15+ years, free estimates. Call 403-608-9933.',
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
      name: 'Which flat roof material works well for Calgary winters?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SBS-modified bitumen (torch-on) is a proven choice for Calgary winters because it stays flexible in cold weather and handles freeze-thaw cycling well. EPDM is also widely used in cold climates.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you handle commercial insurance roof claims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. City Roofing documents commercial flat roof damage with photos, findings and repair or replacement recommendations you can share with your insurer or adjuster.',
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
    q: 'Which flat roof material works well for Calgary winters?',
    a: 'SBS-modified bitumen (torch-on) is a proven choice for Calgary winters because it stays flexible in cold weather and handles freeze-thaw cycling well. EPDM is also widely used in cold climates.',
  },
  {
    q: 'Do you handle commercial insurance roof claims?',
    a: 'Yes. City Roofing documents commercial flat roof damage with photos, findings and repair or replacement recommendations you can share with your insurer or adjuster.',
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
    body: 'TPO (Thermoplastic Polyolefin) is a single-ply white reflective membrane with heat-welded seams. It is commonly used on larger commercial flat roofs where energy performance, seam strength, and long-term maintenance matter. City Roofing can assess whether a fully adhered, mechanically fastened, or ballasted TPO system suits your building.',
  },
  {
    title: 'EPDM Rubber Roofing',
    body: 'EPDM (ethylene propylene diene monomer) is a synthetic rubber membrane known for flexibility in cold weather. It can be a good fit for low-slope roofs where building movement, freeze-thaw cycles, and maintenance access need to be considered. Warranty terms depend on the system, manufacturer, and installation details.',
  },
  {
    title: 'SBS Modified Bitumen',
    body: 'SBS-modified bitumen (torch-on) is widely used on Calgary flat roofs because it performs well through freeze-thaw cycles and chinook temperature swings. City Roofing installs two-ply and three-ply torch-on systems depending on exposure, drainage, access, and warranty requirements.',
  },
  {
    title: 'Built-Up Roofing (BUR)',
    body: 'Built-up roofing is a traditional multi-layer flat roof system with reinforcing felts and bitumen, often finished with gravel ballast or a cap sheet. It can still make sense for certain commercial roofs, especially where durability and service traffic matter. City Roofing repairs and installs BUR systems where they are the right fit.',
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
  { icon: '📋', title: 'Insurance Documentation Support', desc: 'Our estimators document damage with photos, findings and scopes you can share with your insurer or adjuster.' },
  { icon: '🛡️', title: 'SECOR Certified Safety', desc: 'SECOR safety certification supports the documentation many commercial sites and property managers require before work begins.' },
  { icon: '🏗️', title: 'Commercial Flat Roof Experience', desc: 'Experience with warehouses, plazas, industrial properties, multi-unit buildings and managed commercial sites across Calgary.' },
  { icon: '🔍', title: 'Free Commercial Roof Assessments', desc: 'We assess commercial flat roofs, explain the findings and provide a practical written next step.' },
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
            City Roofing &amp; Exteriors services commercial flat roofs across Calgary and surrounding Alberta
            communities, including warehouses, retail plazas, industrial facilities, strata properties, and
            multi-unit residential buildings. Our team coordinates access and scheduling around your operations
            where possible, then provides clear workmanship and manufacturer documentation.
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
            href="/services/flat-roofing"
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
            Our team provides free on-site assessments for commercial flat roofs across Calgary, with a written scope and clear next steps.
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
            href="/services/flat-roofing"
            style={{ flex: 1, minWidth: '220px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '24px', textDecoration: 'none', display: 'block' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: 'var(--color-text-primary)', marginBottom: '6px' }}>
              Commercial Roofing Calgary →
            </div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>Full-scope commercial roofing services for Calgary buildings</div>
          </Link>
          <Link
            href="/insurance-claims"
            style={{ flex: 1, minWidth: '220px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '24px', textDecoration: 'none', display: 'block' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: 'var(--color-text-primary)', marginBottom: '6px' }}>
              Insurance Claim Roofing →
            </div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>Photo documentation for hail and storm damage discussions</div>
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
