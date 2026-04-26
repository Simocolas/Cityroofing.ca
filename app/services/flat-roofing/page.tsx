import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CommercialInspectionForm from '@/components/shared/CommercialInspectionForm';
import CommercialSwitchGrid from '@/components/shared/CommercialSwitchGrid';
import FAQSection, { FAQItem } from '@/components/shared/FAQSection';
import projectsData from '@/data/projects.json';
import reviewsData from '@/data/reviews.json';

export const metadata: Metadata = {
  title: 'Commercial Roofing Calgary | Flat Roof Repair & Replacement | City Roofing',
  description:
    'Commercial flat roof repair, replacement, inspections and maintenance in Calgary. City Roofing & Exteriors provides photo reports, honest estimates, in-house crews, WCB coverage, SECOR certification and BBB-backed accountability.',
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Commercial Flat Roofing Calgary',
  provider: {
    '@type': 'LocalBusiness',
    name: 'City Roofing & Exteriors',
    telephone: '403-608-9933',
    address: '3935 3a St NE Unit #3, Calgary, AB T2E 6S7',
  },
  areaServed: 'Calgary, Alberta',
  serviceType: [
    'Commercial flat roof repair',
    'Commercial roof replacement',
    'Commercial roof inspection',
    'Flat roof maintenance',
    'Torch-on and SBS roofing',
  ],
  description:
    'Commercial flat roof repair, replacement, inspections and maintenance for Calgary businesses, warehouses, retail properties, industrial buildings and multi-family properties.',
};

const faqItems: FAQItem[] = [
  {
    q: 'Do you repair commercial flat roof leaks in Calgary?',
    a: 'Yes. We inspect the roof to find the source of the leak and recommend the right repair. Common leak points include drains, scuppers, seams, flashing, rooftop units and membrane punctures.',
  },
  {
    q: 'Do I need a full commercial roof replacement?',
    a: 'Not always. Many flat roofs can be repaired or maintained if the membrane and insulation are still in workable condition. We assess the roof first and explain the most practical option.',
  },
  {
    q: 'What causes ponding water on a flat roof?',
    a: 'Ponding can come from poor slope, blocked drains, settled insulation, damaged membrane areas or drainage design issues. It should be checked because standing water can shorten roof life.',
  },
  {
    q: 'Can you inspect the roof and provide photos?',
    a: 'Yes. Our commercial inspections can include photo documentation, findings and recommendations so owners and property managers have a clear record.',
  },
  {
    q: 'Do you work on commercial buildings while they remain open?',
    a: 'In many cases, yes. We plan access, staging, cleanup and timing to reduce disruption to tenants, staff and customers.',
  },
  {
    q: 'What types of flat roofs do you work on?',
    a: 'City Roofing & Exteriors works on commercial flat roof repairs, replacements, installations, torch-on/SBS systems, inspections and maintenance.',
  },
  {
    q: 'Do you help with storm or hail damage?',
    a: 'Yes. We can inspect damage, document findings and provide a proposal for repair or replacement.',
  },
];

const problems = [
  {
    title: 'Active Roof Leaks',
    text: 'Water entering your building can damage ceilings, equipment, inventory and tenant spaces. We locate the source and recommend the right repair.',
  },
  {
    title: 'Ponding Water',
    text: 'Standing water can accelerate membrane failure, damage insulation and create recurring leak points.',
  },
  {
    title: 'Aging Flat Roofs',
    text: 'If your membrane is cracking, blistering, shrinking or separating at seams, we can assess whether repair, overlay or replacement makes sense.',
  },
  {
    title: 'Hail, Wind & Storm Damage',
    text: 'Calgary weather is hard on commercial roofs. We document damage clearly and can support insurance-related roof assessments.',
  },
  {
    title: 'Drainage, Flashing & Rooftop Units',
    text: 'Many flat roof leaks start around drains, scuppers, penetrations, flashing, HVAC units and edge details.',
  },
  {
    title: 'Business Disruption Risk',
    text: 'We plan commercial work carefully so your building can stay operational whenever possible.',
  },
];

const inspectionItems = [
  'Interior leak check when needed',
  'Thermal camera and moisture meter assessment when appropriate',
  'Building envelope review',
  'Drainage, ponding and slope review',
  'Flashing, scuppers, rooftop units and penetrations',
  'Membrane condition and remaining life estimate',
  'Photo report with findings',
  'Repair vs replacement recommendation',
  'Clear proposal for the next step',
];

const services = [
  {
    title: 'Commercial Flat Roof Repair',
    text: 'For leaks, punctures, open seams, flashing failures, pooling water and localized membrane damage.',
  },
  {
    title: 'Commercial Roof Replacement',
    text: 'For aging or failing roof systems where repair no longer protects the building long-term.',
  },
  {
    title: 'Flat Roof Installation',
    text: 'New roof systems for commercial, industrial, retail, office and multi-family buildings.',
  },
  {
    title: 'Torch-On / SBS Roofing',
    text: 'Durable flat roofing systems suited for Calgary freeze-thaw cycles and demanding weather.',
  },
  {
    title: 'Preventive Maintenance',
    text: 'Seasonal inspections, drain cleaning, small repairs and reporting to help prevent emergency leaks.',
  },
  {
    title: 'Commercial Roof Inspection Reports',
    text: 'Photo-documented findings for owners, property managers, insurance, planning and budgeting.',
  },
];

const repairSigns = [
  'The leak is isolated',
  'The membrane is mostly sound',
  'Drainage issues are minor',
  'Damage is around flashing or penetrations',
  'The roof still has useful life',
];

const replacementSigns = [
  'Leaks keep returning',
  'Insulation is wet',
  'Membrane is brittle, cracked or shrinking',
  'Ponding is widespread',
  'Repairs are becoming frequent',
  'The roof is near end of life',
];

const proofMetrics = [
  { value: '15+', label: 'Years serving Calgary' },
  { value: '158', label: 'Verified Google reviews' },
  { value: '4.8', label: 'Google rating' },
];

const proofEvidence = [
  {
    title: 'One accountable crew',
    text: 'In-house crews, no subcontractor handoff, and a Calgary office and warehouse you can reach after the job.',
  },
  {
    title: 'Commercial-ready documentation',
    text: 'Photo findings, roof condition notes, repair recommendations and closeout details for owners and property managers.',
  },
  {
    title: 'Proper coverage and safety',
    text: 'SECOR Certified, WCB Alberta coverage and BBB Accredited for commercial sites that require proof before work begins.',
  },
  {
    title: 'Built for Calgary weather',
    text: 'Flat roof recommendations account for hail, snow load, drainage, freeze-thaw cycles and rooftop equipment.',
  },
];

const industryGroups = [
  {
    label: 'Inventory & operations',
    title: 'Warehouses, industrial buildings and logistics spaces',
    text: 'The priority is stopping water before it reaches inventory, equipment, racking or production areas. We focus on leak source, drainage, membrane condition and rooftop penetrations.',
    examples: ['Warehouses', 'Industrial bays', 'Logistics properties'],
  },
  {
    label: 'Tenants & public access',
    title: 'Retail plazas, offices, restaurants and community buildings',
    text: 'These roofs need practical scheduling and clean documentation because customers, staff and tenants are still using the building while roof work is planned.',
    examples: ['Retail plazas', 'Office buildings', 'Restaurants', 'Schools and churches'],
  },
  {
    label: 'Managed assets',
    title: 'Multi-family, condo boards and property portfolios',
    text: 'Property managers need clear photos, written recommendations, repair history and budget guidance for boards, owners, tenants and insurance conversations.',
    examples: ['Condo buildings', 'Multi-family properties', 'Property management portfolios', 'New commercial developments'],
  },
];

const steps = [
  { title: 'Call or Request Inspection', text: 'We gather basic property details, roof issue, urgency and access requirements.' },
  { title: 'Roof & Building Assessment', text: 'We inspect the roof, drainage, flashing, penetrations and visible interior signs of leaks.' },
  { title: 'Photo Report & Recommendation', text: 'You receive clear findings, photos and a practical repair, maintenance or replacement recommendation.' },
  { title: 'Clear Proposal', text: 'We explain scope, timeline, materials and pricing without pressure.' },
  { title: 'Professional Work', text: 'Our in-house crew completes the work with careful scheduling, cleanup and quality control.' },
  { title: 'Final Inspection', text: 'A site manager reviews the work and confirms the roof is completed properly.' },
];

const commercialProjects = projectsData.filter((project) => project.category === 'commercial' || project.category === 'repair');
const reviewCards = [
  {
    name: 'Chris L.',
    text: 'A friend recommended City Roofing to fix some bad leaks on my flat roof. Ken and Codi came out, explained the problem areas, texted pictures and gave the cost to fix. We had lots of rain since then - no leaks.',
  },
  ...reviewsData.filter((review) => ['rev-010', 'rev-002', 'rev-003'].includes(review.id)).map((review) => ({
    name: review.name,
    text: review.text,
  })),
];

function SectionHeader({ label, title, text }: { label?: string; title: string; text?: string }) {
  return (
    <div style={{ maxWidth: '780px', marginBottom: '34px' }}>
      {label && (
        <p style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
          {label}
        </p>
      )}
      <h2 style={{ color: 'var(--color-text-dark)', fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.08, marginBottom: text ? '14px' : 0 }}>
        {title}
      </h2>
      {text && <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '17px', lineHeight: 1.7 }}>{text}</p>}
    </div>
  );
}

function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '52px',
        padding: '0 24px',
        borderRadius: '4px',
        backgroundColor: 'var(--color-primary)',
        color: '#FFFFFF',
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: '15px',
        textDecoration: 'none',
      }}
    >
      {children}
    </Link>
  );
}

function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '52px',
        padding: '0 24px',
        borderRadius: '4px',
        border: '1px solid rgba(249,247,242,0.34)',
        color: '#FFFFFF',
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: '15px',
        textDecoration: 'none',
      }}
    >
      {children}
    </Link>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li style={{ display: 'flex', gap: '10px', color: 'var(--color-text-dark)', fontSize: '15px', lineHeight: 1.55 }}>
      <span style={{ color: 'var(--color-primary)', fontWeight: 900, flexShrink: 0 }}>✓</span>
      <span>{children}</span>
    </li>
  );
}

export default function CommercialFlatRoofingPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <section className="commercial-hero" style={{ backgroundColor: 'var(--color-base)', padding: '136px 24px 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.28 }}>
          <Image
            src="/images/projects/Commercial.jpeg"
            alt="Commercial flat roof work by City Roofing and Exteriors in Calgary"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(26,26,26,0.96) 0%, rgba(26,26,26,0.84) 48%, rgba(26,26,26,0.62) 100%)' }} />

        <div className="commercial-hero-grid" style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(360px, 0.72fr)', gap: '48px', alignItems: 'center' }}>
          <div>
            <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '18px' }}>
              Calgary Commercial Roofing - Since 2009
            </p>
            <h1 style={{ color: '#F9F7F2', fontSize: 'clamp(44px, 7vw, 82px)', lineHeight: 0.98, letterSpacing: 0, marginBottom: '24px' }}>
              Commercial Flat Roofing in Calgary
            </h1>
            <p style={{ color: 'rgba(249,247,242,0.82)', fontSize: '19px', lineHeight: 1.65, maxWidth: '710px', marginBottom: '28px' }}>
              Repair, replacement, inspections and maintenance for commercial flat roofs across Calgary. We help protect your building, tenants, inventory and operations from leaks, ponding water, hail, snow and freeze-thaw damage.
            </p>
            <div className="commercial-hero-buttons" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '28px' }}>
              <PrimaryButton href="#inspection-form">Request Free Commercial Roof Inspection</PrimaryButton>
              <SecondaryButton href="tel:403-608-9933">Call 403-608-9933</SecondaryButton>
            </div>
            <div className="commercial-trust-line" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['Since 2009', '158 Google reviews', '4.8 star rating', 'In-house crew', 'SECOR Certified', 'WCB Alberta', 'BBB Accredited'].map((item) => (
                <span key={item} style={{ color: '#F9F7F2', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '999px', padding: '8px 11px', fontSize: '12px', fontWeight: 700 }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div id="inspection-form">
            <CommercialInspectionForm />
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--color-cream-dark)', borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="commercial-stats" style={{ maxWidth: '1180px', margin: '0 auto', padding: '30px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {[
            ['15+', 'Years in Calgary'],
            ['158', 'Verified Google reviews'],
            ['4.8', 'Google rating'],
            ['3,000+', 'Projects completed'],
          ].map(([value, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, lineHeight: 1 }}>{value}</div>
              <div style={{ color: 'var(--color-text-dark-muted)', fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', marginTop: '8px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '86px 24px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <SectionHeader label="Problems we solve" title="Commercial Roof Problems We Solve" text="Flat roof issues become expensive when they reach tenant spaces, inventory, equipment or daily operations. This section is built for the problems Calgary property owners actually call about." />
          <CommercialSwitchGrid items={problems} />
        </div>
      </section>

      <section style={{ padding: '86px 24px', backgroundColor: 'var(--color-cream)' }}>
        <div className="commercial-two-col" style={{ maxWidth: '1180px', margin: '0 auto', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <SectionHeader label="Inspection deliverables" title="What Is Included in a Commercial Roof Inspection" text="A proper commercial roof inspection should give you answers, not pressure. Our team checks the roof, drainage, flashing, penetrations and visible interior signs of water entry, then gives you clear recommendations." />
            <PrimaryButton href="#inspection-form">Book My Commercial Roof Inspection</PrimaryButton>
          </div>
          <div className="commercial-interactive-card commercial-list-panel" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, var(--color-cream) 100%)', border: '1px solid var(--color-border-light)', borderRadius: '6px', padding: '30px' }}>
            <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 22px', listStyle: 'none' }}>
              {inspectionItems.map((item) => <CheckItem key={item}>{item}</CheckItem>)}
            </ul>
          </div>
        </div>
      </section>

      <section style={{ padding: '86px 24px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <SectionHeader label="Services" title="Commercial Flat Roofing Services" text="The page is focused on commercial flat roof outcomes: stop the leak, document the condition, choose the right repair, and protect the building long-term." />
          <CommercialSwitchGrid items={services} numberStyle="label" />
        </div>
      </section>

      <section style={{ padding: '86px 24px', backgroundColor: 'var(--color-base)' }}>
        <div className="commercial-two-col" style={{ maxWidth: '1180px', margin: '0 auto', display: 'grid', gridTemplateColumns: '0.86fr 1.14fr', gap: '44px', alignItems: 'start' }}>
          <div>
            <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
              Honest assessment
            </p>
            <h2 style={{ color: '#F9F7F2', fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: 1.08, marginBottom: '16px' }}>
              Repair First. Replace When It Makes Sense.
            </h2>
            <p style={{ color: 'rgba(249,247,242,0.72)', fontSize: '17px', lineHeight: 1.75, marginBottom: '24px' }}>
              A full flat roof replacement can be expensive, and it is not always necessary. City Roofing & Exteriors assesses the roof condition first and explains whether a targeted repair, maintenance plan, overlay or replacement is the right move.
            </p>
            <PrimaryButton href="#inspection-form">Get an Honest Roof Assessment</PrimaryButton>
          </div>
          <div className="commercial-two-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
            {[
              ['Repair may be right if:', repairSigns],
              ['Replacement may be right if:', replacementSigns],
            ].map(([title, list]) => (
              <div key={title as string} style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.13)', borderRadius: '6px', padding: '26px' }}>
                <h3 style={{ color: '#F9F7F2', fontSize: '21px', lineHeight: 1.2, marginBottom: '16px' }}>{title as string}</h3>
                <ul style={{ display: 'grid', gap: '12px', listStyle: 'none' }}>
                  {(list as string[]).map((item) => (
                    <li key={item} style={{ display: 'flex', gap: '10px', color: 'rgba(249,247,242,0.78)', fontSize: '15px', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--color-accent)', fontWeight: 900 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '96px 24px', backgroundColor: 'var(--color-cream-dark)' }}>
        <div className="commercial-proof-feature" style={{ maxWidth: '1180px', margin: '0 auto', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '28px', alignItems: 'stretch' }}>
          <div style={{ backgroundColor: 'var(--color-base)', borderRadius: '6px', padding: '38px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.18 }}>
              <Image src="/images/projects/Commercial.jpeg" alt="Commercial flat roof project in Calgary" fill sizes="(max-width: 980px) 100vw, 45vw" style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '14px' }}>
                Why City Roofing
              </p>
              <h2 style={{ color: '#F9F7F2', fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: 1.05, marginBottom: '18px' }}>
                Flat roof decisions need proof, not promises.
              </h2>
              <p style={{ color: 'rgba(249,247,242,0.76)', fontSize: '16px', lineHeight: 1.75, marginBottom: '28px' }}>
                Commercial owners need to know who is on the roof, what was found, what gets fixed first and what belongs in the budget. This is where City Roofing should feel different from a generic roofing page.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {proofMetrics.map((metric) => (
                  <div key={metric.label} style={{ borderTop: '2px solid var(--color-accent)', paddingTop: '14px' }}>
                    <div style={{ color: '#F9F7F2', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(30px, 4vw, 44px)', lineHeight: 1 }}>{metric.value}</div>
                    <div style={{ color: 'rgba(249,247,242,0.66)', fontSize: '12px', lineHeight: 1.4, marginTop: '8px' }}>{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border-light)', borderRadius: '6px', padding: '18px' }}>
            <div className="commercial-proof-evidence" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', height: '100%' }}>
              {proofEvidence.map((item, index) => (
                <article key={item.title} className="commercial-interactive-card commercial-accent-card" style={{ background: index === 0 ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)' : index === 1 ? 'linear-gradient(135deg, var(--color-cream) 0%, #FFFFFF 100%)' : '#FFFFFF', border: '1px solid var(--color-border-light)', borderRadius: '6px', padding: '24px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: index === 0 ? '#FFFFFF' : 'var(--color-cream-dark)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '13px', marginBottom: '16px' }}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 style={{ color: index === 0 ? '#F9F7F2' : 'var(--color-text-dark)', fontSize: '20px', lineHeight: 1.2, marginBottom: '10px' }}>{item.title}</h3>
                  <p style={{ color: index === 0 ? 'rgba(249,247,242,0.76)' : 'var(--color-text-dark-muted)', fontSize: '14px', lineHeight: 1.65 }}>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '96px 24px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <SectionHeader
            label="Industries served"
            title="Different buildings. Different roof risks."
            text="Instead of listing every property type the same way, group the work by what the customer is trying to protect: operations, tenants, or managed assets."
          />
          <div className="commercial-industry-feature" style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: '22px' }}>
            <article style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-border-light)', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ position: 'relative', minHeight: '260px' }}>
                <Image src="/images/4/Commerical.webp" alt="Commercial roofing services for Calgary properties" fill sizes="(max-width: 980px) 100vw, 60vw" style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(26,26,26,0.84), rgba(26,26,26,0.30))' }} />
                <div style={{ position: 'absolute', left: '28px', right: '28px', bottom: '28px' }}>
                  <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '10px' }}>
                    Primary commercial flat roof use case
                  </p>
                  <h3 style={{ color: '#F9F7F2', fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.05, marginBottom: '10px' }}>
                    Keep water away from the business, not just off the roof.
                  </h3>
                  <p style={{ color: 'rgba(249,247,242,0.78)', fontSize: '15px', lineHeight: 1.65, maxWidth: '620px' }}>
                    Warehouses, retail plazas, offices and multi-family properties all have different consequences when a flat roof leak gets inside.
                  </p>
                </div>
              </div>
            </article>

            <div style={{ display: 'grid', gap: '12px' }}>
              {['Inventory', 'Tenants', 'Records'].map((label, index) => (
                <div key={label} className="commercial-interactive-card" style={{ background: index === 0 ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)' : 'linear-gradient(135deg, var(--color-cream) 0%, #FFFFFF 100%)', color: index === 0 ? '#FFFFFF' : 'var(--color-text-dark)', border: '1px solid var(--color-border-light)', borderRadius: '6px', padding: '20px' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase', opacity: index === 0 ? 0.92 : 0.72, marginBottom: '8px' }}>
                    {label}
                  </p>
                  <p style={{ fontSize: '14px', lineHeight: 1.6, opacity: index === 0 ? 0.92 : 0.74 }}>
                    {index === 0 && 'Stop leaks before they reach stock, equipment or production areas.'}
                    {index === 1 && 'Plan work around access, tenants, customers, staff and operating hours.'}
                    {index === 2 && 'Give managers photos, findings and recommendations they can keep on file.'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="commercial-industry-groups" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '22px' }}>
            {industryGroups.map((group) => (
              <article key={group.title} className="commercial-interactive-card commercial-accent-card" style={{ border: '1px solid var(--color-border-light)', borderRadius: '6px', background: 'linear-gradient(135deg, #FFFFFF 0%, var(--color-cream) 100%)', padding: '24px' }}>
                <p style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>
                  {group.label}
                </p>
                <h3 style={{ color: 'var(--color-text-dark)', fontSize: '21px', lineHeight: 1.18, marginBottom: '12px' }}>{group.title}</h3>
                <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '14px', lineHeight: 1.65, marginBottom: '18px' }}>{group.text}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {group.examples.map((example) => (
                    <span key={example} style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-text-dark)', borderRadius: '999px', padding: '7px 10px', fontSize: '12px', fontWeight: 700 }}>
                      {example}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '86px 24px', backgroundColor: 'var(--color-cream)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <SectionHeader label="Project proof" title="Commercial Flat Roof Work in Calgary" text="Use real project photos wherever possible. These cards stay conservative and avoid fake scope details when exact site information is not available." />
          <div className="commercial-project-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '22px' }}>
            {commercialProjects.map((project) => (
              <article key={project.id} className="commercial-interactive-card commercial-image-card" style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border-light)', borderRadius: '6px', overflow: 'hidden' }}>
                <div className="commercial-image-frame" style={{ position: 'relative', height: '260px', backgroundColor: 'var(--color-surface)' }}>
                  <Image src={project.image} alt={`${project.title} in ${project.location}`} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '24px' }}>
                  <p style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>{project.location}</p>
                  <h3 style={{ color: 'var(--color-text-dark)', fontSize: '23px', marginBottom: '10px' }}>{project.title}</h3>
                  <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '15px', lineHeight: 1.65, marginBottom: '16px' }}>{project.description}</p>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <p style={{ color: 'var(--color-text-dark)', fontSize: '14px', lineHeight: 1.45 }}><strong>Problem:</strong> Roof damage or flat roof condition requiring assessment.</p>
                    <p style={{ color: 'var(--color-text-dark)', fontSize: '14px', lineHeight: 1.45 }}><strong>Solution:</strong> City Roofing inspected the roof and completed the recommended work.</p>
                    <p style={{ color: 'var(--color-text-dark)', fontSize: '14px', lineHeight: 1.45 }}><strong>Result:</strong> Clearer roof condition, completed repair or roof system work, and a protected building.</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '86px 24px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <SectionHeader label="Reviews" title="Commercial and Flat Roof Customers" />
          <div className="commercial-review-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px' }}>
            {reviewCards.map((review) => (
              <article key={review.name} className="commercial-interactive-card commercial-review-card" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, var(--color-cream) 100%)', border: '1px solid var(--color-border-light)', borderRadius: '6px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.045)' }}>
                <div style={{ color: '#F5A623', letterSpacing: '2px', fontSize: '14px', marginBottom: '14px' }}>★★★★★</div>
                <p style={{ color: 'var(--color-text-dark)', fontSize: '14px', lineHeight: 1.65, marginBottom: '18px' }}>&ldquo;{review.text}&rdquo;</p>
                <p style={{ color: 'var(--color-text-dark)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '14px' }}>{review.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '86px 24px', backgroundColor: 'var(--color-cream-dark)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <SectionHeader label="Process" title="How Our Commercial Roofing Process Works" />
          <div className="commercial-process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
            {steps.map((step, index) => (
              <article key={step.title} className="commercial-interactive-card commercial-accent-card" style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border-light)', borderRadius: '6px', padding: '24px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 900, marginBottom: '16px' }}>
                  {index + 1}
                </div>
                <h3 style={{ color: 'var(--color-text-dark)', fontSize: '19px', lineHeight: 1.25, marginBottom: '9px' }}>{step.title}</h3>
                <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '14px', lineHeight: 1.65 }}>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={faqItems} title="Commercial Flat Roofing FAQ" />

      <section style={{ backgroundColor: 'var(--color-base)', padding: '82px 24px 104px', textAlign: 'center' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '14px' }}>
            Calgary-based. In-house crew. SECOR Certified. WCB Alberta. BBB Accredited.
          </p>
          <h2 style={{ color: '#F9F7F2', fontSize: 'clamp(32px, 5vw, 54px)', lineHeight: 1.05, marginBottom: '16px' }}>
            Need a Commercial Flat Roof Checked?
          </h2>
          <p style={{ color: 'rgba(249,247,242,0.76)', fontSize: '17px', lineHeight: 1.7, marginBottom: '28px' }}>
            Whether you have an active leak, ponding water, storm damage or an aging flat roof, City Roofing & Exteriors can inspect the roof and give you a clear next step.
          </p>
          <div className="commercial-hero-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <PrimaryButton href="#inspection-form">Request Free Commercial Roof Inspection</PrimaryButton>
            <SecondaryButton href="tel:403-608-9933">Call 403-608-9933</SecondaryButton>
          </div>
        </div>
      </section>

      <a href="tel:403-608-9933" className="commercial-mobile-call">Call 403-608-9933</a>

      <style>{`
        @keyframes commercialCardIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .commercial-interactive-card {
          position: relative;
          overflow: hidden;
          transition:
            transform 220ms ease,
            box-shadow 220ms ease,
            border-color 220ms ease,
            background-color 220ms ease;
          animation: commercialCardIn 520ms ease both;
          box-shadow: 0 2px 8px rgba(0,0,0,0.045);
        }
        .commercial-interactive-card:hover {
          transform: translateY(-6px);
          border-color: rgba(139, 30, 30, 0.38) !important;
          box-shadow: 0 16px 34px rgba(26,26,26,0.12) !important;
        }
        .commercial-switch-grid {
          perspective: 1200px;
        }
        .commercial-switch-card {
          min-height: 214px;
          isolation: isolate;
          cursor: default;
          background:
            radial-gradient(circle at 92% 92%, rgba(139, 30, 30, 0.08) 0 58px, transparent 60px),
            linear-gradient(135deg, #FFFFFF 0%, var(--color-cream) 100%) !important;
        }
        .commercial-switch-card::before {
          z-index: 0;
          transition: height 260ms ease, opacity 260ms ease;
        }
        .commercial-switch-card::after {
          z-index: 0;
          transform: scale(0.8);
          opacity: 0.76;
          transition: transform 360ms ease, opacity 260ms ease, background 260ms ease;
        }
        .commercial-switch-card > * {
          position: relative;
          z-index: 1;
          transition: color 220ms ease, background-color 220ms ease, transform 220ms ease, opacity 220ms ease;
        }
        .commercial-card-number {
          background-color: var(--color-cream-dark);
          color: var(--color-primary);
          box-shadow: 0 0 0 rgba(139, 30, 30, 0);
        }
        .commercial-card-index {
          color: var(--color-primary);
        }
        .commercial-card-title {
          color: var(--color-text-dark);
          transition: color 220ms ease, transform 220ms ease;
        }
        .commercial-card-copy {
          color: var(--color-text-dark-muted);
          transition: color 220ms ease, opacity 220ms ease;
        }
        .commercial-switch-card.is-active,
        .commercial-switch-card:hover,
        .commercial-switch-card:focus-visible {
          background:
            radial-gradient(circle at 92% 92%, rgba(192, 57, 43, 0.22) 0 70px, transparent 72px),
            linear-gradient(135deg, var(--color-primary) 0%, #6f1717 52%, var(--color-base) 100%) !important;
          border-color: rgba(139, 30, 30, 0.7) !important;
          box-shadow: 0 20px 46px rgba(26,26,26,0.18), 0 0 0 1px rgba(192,57,43,0.16) inset !important;
        }
        .commercial-switch-card.is-active::before,
        .commercial-switch-card:hover::before,
        .commercial-switch-card:focus-visible::before {
          height: 6px;
          opacity: 1;
        }
        .commercial-switch-card.is-active::after,
        .commercial-switch-card:hover::after,
        .commercial-switch-card:focus-visible::after {
          transform: scale(1.22);
          opacity: 1;
          background: rgba(192, 57, 43, 0.16);
        }
        .commercial-switch-card.is-active .commercial-card-number,
        .commercial-switch-card:hover .commercial-card-number,
        .commercial-switch-card:focus-visible .commercial-card-number {
          background-color: var(--color-accent);
          color: #FFFFFF;
          box-shadow: 0 10px 24px rgba(192,57,43,0.32);
          transform: translateY(-2px);
        }
        .commercial-switch-card.is-active .commercial-card-index,
        .commercial-switch-card:hover .commercial-card-index,
        .commercial-switch-card:focus-visible .commercial-card-index {
          color: rgba(249,247,242,0.66);
        }
        .commercial-switch-card.is-active .commercial-card-title,
        .commercial-switch-card:hover .commercial-card-title,
        .commercial-switch-card:focus-visible .commercial-card-title {
          color: #F9F7F2;
          transform: translateY(-2px);
        }
        .commercial-switch-card.is-active .commercial-card-copy,
        .commercial-switch-card:hover .commercial-card-copy,
        .commercial-switch-card:focus-visible .commercial-card-copy {
          color: rgba(249,247,242,0.78);
        }
        .commercial-switch-grid:hover .commercial-switch-card:not(:hover) {
          opacity: 0.82;
          transform: scale(0.985);
        }
        .commercial-accent-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
          opacity: 0.95;
        }
        .commercial-accent-card::after {
          content: "";
          position: absolute;
          right: -48px;
          bottom: -48px;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: rgba(139, 30, 30, 0.08);
          pointer-events: none;
        }
        .commercial-list-panel {
          box-shadow: 0 18px 44px rgba(26,26,26,0.10);
        }
        .commercial-image-frame img {
          transition: transform 420ms ease, filter 420ms ease;
        }
        .commercial-image-card:hover .commercial-image-frame img {
          transform: scale(1.045);
          filter: saturate(1.08) contrast(1.04);
        }
        .commercial-review-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: var(--color-primary);
        }
        @media (max-width: 980px) {
          .commercial-hero-grid,
          .commercial-two-col,
          .commercial-proof-feature,
          .commercial-industry-feature {
            grid-template-columns: 1fr !important;
          }
          .commercial-card-grid,
          .commercial-proof-grid,
          .commercial-industry-grid,
          .commercial-proof-evidence,
          .commercial-industry-groups,
          .commercial-process-grid,
          .commercial-review-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .commercial-project-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 720px) {
          .commercial-hero {
            padding: 112px 18px 42px !important;
          }
          .commercial-hero-buttons > a {
            width: 100% !important;
          }
          .commercial-stats,
          .commercial-card-grid,
          .commercial-proof-grid,
          .commercial-industry-grid,
          .commercial-proof-evidence,
          .commercial-industry-groups,
          .commercial-process-grid,
          .commercial-review-grid,
          .commercial-two-list {
            grid-template-columns: 1fr !important;
          }
          .commercial-trust-line span {
            font-size: 11px !important;
          }
          body {
            padding-bottom: 64px;
          }
        }
        .commercial-mobile-call {
          display: none;
        }
        @media (max-width: 720px) {
          .commercial-mobile-call {
            position: fixed;
            left: 16px;
            right: 16px;
            bottom: 14px;
            z-index: 80;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 52px;
            border-radius: 4px;
            background: var(--color-primary);
            color: #FFFFFF;
            text-decoration: none;
            font-family: var(--font-display);
            font-weight: 900;
            box-shadow: 0 12px 30px rgba(0,0,0,0.24);
          }
        }
      `}</style>
    </div>
  );
}
