import type { Metadata } from 'next';
import Link from 'next/link';
import ServiceHero from '@/components/shared/ServiceHero';
import QuickAnswerBox from '@/components/shared/QuickAnswerBox';
import FAQSection, { FAQItem } from '@/components/shared/FAQSection';
import ServiceCTA from '@/components/shared/ServiceCTA';

export const metadata: Metadata = {
  title: 'Flat Roofing Calgary | Torch-On, TPO & EPDM | City Roofing',
  description:
    'Expert flat roofing in Calgary. Torch-on, TPO, EPDM and rubber roofing systems for residential and commercial properties. Free estimates — call 403-608-9933.',
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Flat Roofing Calgary',
  provider: { '@type': 'LocalBusiness', name: 'City Roofing & Exteriors' },
  areaServed: 'Calgary, Alberta',
  description:
    'Flat roof installation and repair in Calgary. Torch-on, TPO, EPDM and rubber roofing systems.',
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Our Flat Roof Installation Process',
  step: [
    { '@type': 'HowToStep', name: 'Free Roof Assessment', text: 'We conduct a thorough on-site flat roof assessment at no cost and no obligation.' },
    { '@type': 'HowToStep', name: 'System Recommendation', text: 'Based on your roof slope, usage, and budget, we recommend the best flat roofing system for your property.' },
    { '@type': 'HowToStep', name: 'Material Selection', text: 'Choose from torch-on modified bitumen, TPO, EPDM, or BUR with detailed pricing for each option.' },
    { '@type': 'HowToStep', name: 'Installation', text: 'Our SECOR-certified crew installs your flat roof system with proper drainage slope and edge termination.' },
    { '@type': 'HowToStep', name: 'Inspection & Warranty', text: 'Final quality inspection, full site cleanup, and all warranty documentation handed over to you.' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does flat roof replacement cost in Calgary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Flat roof replacement in Calgary typically costs $5,000–$15,000 for residential properties, depending on size and system. Commercial projects vary based on scope.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best flat roofing system for Calgary weather?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Torch-on modified bitumen is the most popular choice in Calgary due to its performance in freeze-thaw conditions and resistance to hail damage.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does a flat roof last in Calgary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Quality flat roofing systems last 15–25 years in Calgary conditions. Torch-on and TPO systems at the higher end with proper maintenance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you repair a flat roof instead of replacing it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — if damage is isolated to less than 25% of the roof surface, repair is usually cost-effective. We assess this during our free inspection.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you handle flat roof insurance claims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We document flat roof damage for insurance claims and work alongside Alberta adjusters throughout the process.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know if my flat roof needs replacement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Signs include pooling water, visible membrane cracking, interior leaks, or a roof over 20 years old. Our free inspection gives you a clear answer.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you install flat roofs on houses in Calgary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — we install flat and low-slope roofing systems on residential homes, garages, additions, and commercial buildings across Calgary.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are you licensed for flat roofing in Alberta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. City Roofing & Exteriors is SECOR certified, WCB Alberta registered, and BBB Accredited.',
      },
    },
  ],
};

const faqItems: FAQItem[] = [
  {
    q: 'How much does flat roof replacement cost in Calgary?',
    a: 'Flat roof replacement in Calgary typically costs $5,000–$15,000 for residential properties, depending on size and system. Commercial projects vary based on scope.',
  },
  {
    q: 'What is the best flat roofing system for Calgary weather?',
    a: 'Torch-on modified bitumen is the most popular choice in Calgary due to its performance in freeze-thaw conditions and resistance to hail damage.',
  },
  {
    q: 'How long does a flat roof last in Calgary?',
    a: 'Quality flat roofing systems last 15–25 years in Calgary conditions. Torch-on and TPO systems at the higher end with proper maintenance.',
  },
  {
    q: 'Can you repair a flat roof instead of replacing it?',
    a: 'Yes — if damage is isolated to less than 25% of the roof surface, repair is usually cost-effective. We assess this during our free inspection.',
  },
  {
    q: 'Do you handle flat roof insurance claims?',
    a: 'Yes. We document flat roof damage for insurance claims and work alongside Alberta adjusters throughout the process.',
  },
  {
    q: 'How do I know if my flat roof needs replacement?',
    a: 'Signs include pooling water, visible membrane cracking, interior leaks, or a roof over 20 years old. Our free inspection gives you a clear answer.',
  },
  {
    q: 'Do you install flat roofs on houses in Calgary?',
    a: 'Yes — we install flat and low-slope roofing systems on residential homes, garages, additions, and commercial buildings across Calgary.',
  },
  {
    q: 'Are you licensed for flat roofing in Alberta?',
    a: 'Yes. City Roofing & Exteriors is SECOR certified, WCB Alberta registered, and BBB Accredited.',
  },
];

const steps = [
  { num: 1, title: 'Free Roof Assessment', desc: 'We conduct a thorough on-site flat roof assessment at no cost and no obligation.' },
  { num: 2, title: 'System Recommendation', desc: 'Based on your roof slope, usage, and budget, we recommend the best flat roofing system for your property.' },
  { num: 3, title: 'Material Selection', desc: 'Choose from torch-on, TPO, EPDM, or BUR with detailed pricing for each option.' },
  { num: 4, title: 'Installation', desc: 'Our SECOR-certified crew installs your flat roof system with proper drainage slope and edge termination.' },
  { num: 5, title: 'Inspection & Warranty', desc: 'Final quality inspection, full site cleanup, and all warranty documentation handed over to you.' },
];

const h2Style = {
  fontFamily: 'var(--font-display)',
  fontWeight: 800,
  fontSize: 'clamp(26px, 3.5vw, 38px)' as const,
  color: 'var(--color-text-primary)',
  marginBottom: '36px',
};

const h3Style = {
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  fontSize: '22px',
  color: 'var(--color-text-primary)',
  marginBottom: '12px',
};

const bodyStyle = {
  color: 'var(--color-text-muted)',
  fontSize: '16px',
  lineHeight: 1.8,
};

export default function FlatRoofingPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <ServiceHero
        title="Flat Roofing Calgary"
        subtitle="Torch-on, TPO, EPDM and rubber roofing systems for residential and commercial properties across Calgary."
        breadcrumb="Services / Flat Roofing"
        breadcrumbPath="/services/flat-roofing"
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 24px' }}>

        {/* Quick Answer */}
        <QuickAnswerBox>
          City Roofing &amp; Exteriors installs and repairs flat roofing systems across Calgary, Alberta. We work with
          torch-on modified bitumen, TPO, EPDM rubber, and built-up roofing (BUR) systems for both residential and
          commercial properties. With 15+ years of Calgary experience and 158 Google reviews averaging 4.8 stars, we
          are SECOR certified and WCB Alberta registered. Call 403-608-9933 for a free flat roof assessment.
        </QuickAnswerBox>

        {/* Systems section */}
        <section style={{ marginBottom: '72px' }}>
          <h2 style={h2Style}>Flat Roofing Systems We Install</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {[
              {
                title: 'Torch-On Modified Bitumen',
                body: `Torch-on modified bitumen is the most widely installed flat roofing system in Calgary — and for good reason. It is applied by heating the underside of the membrane with a propane torch, creating a seamless, waterproof bond directly to the roof deck. Modified bitumen performs exceptionally in Calgary's climate, withstanding freeze-thaw cycling, hail impact, and heavy snow loads. The multi-layer system is highly resistant to cracking and puncture, making it the top recommendation for residential low-slope roofs, garages, and commercial flat roofs in Alberta. With proper installation and regular maintenance, torch-on systems typically last 15–25 years. City Roofing installs both SBS (rubberized) and APP (plasticized) modified bitumen systems depending on your application and budget.`,
              },
              {
                title: 'TPO Roofing (Thermoplastic Polyolefin)',
                body: `TPO is a single-ply white reflective membrane that has become increasingly popular for Calgary commercial buildings and low-slope residential roofs. Its white surface reflects solar heat, reducing cooling costs during summer months. TPO is heat-welded at seams, creating strong, watertight joints that resist uplift and membrane separation. It is lightweight, UV resistant, and environmentally friendly. TPO is particularly well-suited for large commercial roof surfaces where energy efficiency and long-term performance are priorities. City Roofing installs fully adhered, mechanically fastened, and ballasted TPO systems depending on your building's structural requirements.`,
              },
              {
                title: 'EPDM Rubber Roofing',
                body: `EPDM (ethylene propylene diene monomer) is a synthetic rubber membrane engineered to remain flexible in extreme cold — making it an excellent choice for Calgary's winters. Unlike some flat roofing membranes that become brittle and crack at low temperatures, EPDM retains elasticity well below -40°C. This flexibility allows it to accommodate building movement without developing stress cracks. EPDM is highly durable, resistant to UV degradation, and relatively simple to repair if punctured. It is ideal for residential garages, home additions, and low-slope commercial applications. City Roofing installs fully adhered EPDM systems with manufacturer-backed warranties.`,
              },
              {
                title: 'Built-Up Roofing (BUR)',
                body: `Built-up roofing is the traditional flat roof system — multiple layers of reinforcing felt alternated with bitumen (asphalt or coal tar), topped with a granule surface or gravel ballast. BUR systems are exceptionally durable and have been protecting buildings for over 100 years. The multi-layer construction provides outstanding waterproofing redundancy and resistance to foot traffic. While newer systems like TPO and torch-on have largely replaced BUR for new construction, it remains a proven and long-lasting choice for certain commercial applications. City Roofing installs and repairs BUR systems across Calgary.`,
              },
            ].map((system) => (
              <div key={system.title} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '32px' }}>
                <h3 style={h3Style}>{system.title}</h3>
                <p style={bodyStyle}>{system.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Calgary-specific section */}
        <section style={{ marginBottom: '72px' }}>
          <h2 style={h2Style}>Why Flat Roofs Need Expert Installation in Calgary</h2>
          <p style={bodyStyle}>
            Calgary's climate presents unique challenges for flat roofing that don't exist in more temperate cities.
            Freeze-thaw cycling — where temperatures can swing 30°C in a single day during chinook events — puts
            constant stress on flat roof membranes and flashings. Improper installation leads to membrane cracking,
            seam failures, and water infiltration within a few seasons. Drainage is critical: flat roofs in Calgary
            must be designed with adequate slope (minimum 1/4" per foot) and unobstructed drains to prevent ponding
            water, which freezes and expands under the membrane in winter. Heavy snowfall creates significant dead
            loads that must be accounted for in system design. Ice damming at parapet walls and drain areas is a
            common failure point when installations lack proper insulation and vapour barriers. City Roofing's crews
            are trained specifically in Alberta flat roofing conditions and install every system to exceed National
            Building Code requirements.
          </p>
        </section>

        {/* Process section */}
        <section style={{ marginBottom: '72px' }}>
          <h2 style={h2Style}>Our Flat Roof Installation Process</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {steps.map((step) => (
              <div
                key={step.num}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                  padding: '28px',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '16px',
                    color: '#fff',
                    marginBottom: '16px',
                    flexShrink: 0,
                  }}
                >
                  {step.num}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                  {step.title}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Commercial section */}
        <section style={{ marginBottom: '72px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderLeft: '4px solid var(--color-primary)', borderRadius: '0 6px 6px 0', padding: '36px 40px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(22px, 3vw, 30px)', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
            Flat Roofing for Commercial Properties
          </h2>
          <p style={{ ...bodyStyle, marginBottom: '20px' }}>
            City Roofing &amp; Exteriors has completed commercial flat roofing projects exceeding $3 million CAD across
            Calgary and surrounding areas. We install torch-on, TPO, and EPDM systems for warehouses, retail plazas,
            industrial facilities, and multi-unit residential buildings. Our commercial division works within your
            schedule to minimize business disruption, with project management from estimate through final inspection.
            All commercial projects are SECOR certified and carry full manufacturer and workmanship warranties.
          </p>
          <Link
            href="/services/commercial"
            style={{
              color: 'var(--color-accent)',
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '15px',
            }}
          >
            View Commercial Roofing Services →
          </Link>
        </section>

        {/* Areas served */}
        <section style={{ marginBottom: '72px', backgroundColor: 'var(--color-surface)', borderRadius: '6px', padding: '36px 40px', border: '1px solid var(--color-border)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
            Areas We Serve
          </h2>
          <p style={bodyStyle}>
            City Roofing &amp; Exteriors provides flat roofing services across all Calgary quadrants —
            NE Calgary, NW Calgary, SE Calgary, and SW Calgary — as well as surrounding communities including
            Airdrie, Cochrane, Chestermere, and Okotoks. Call 403-608-9933 to confirm service availability
            in your area.
          </p>
        </section>

      </div>

      <FAQSection items={faqItems} title="Flat Roofing FAQ" />
      <ServiceCTA headline="Ready for a Free Flat Roof Assessment?" subtext="Free inspection. Honest estimate. No pressure." />
    </div>
  );
}
