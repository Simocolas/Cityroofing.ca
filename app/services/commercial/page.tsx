import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CommercialInspectionForm from '@/components/shared/CommercialInspectionForm';
import FAQSection, { FAQItem } from '@/components/shared/FAQSection';
import projectsData from '@/data/projects.json';
import reviewsData from '@/data/reviews.json';

export const metadata: Metadata = {
  title: 'Commercial Roofing Calgary | Repair, Replacement & Maintenance | City Roofing',
  description:
    'Commercial roofing in Calgary for warehouses, retail plazas, industrial buildings, offices and multi-family properties. Repairs, replacements, inspections, maintenance and flat roof systems from City Roofing & Exteriors.',
  keywords: [
    'commercial roofing Calgary',
    'commercial roof repair Calgary',
    'commercial roof replacement Calgary',
    'commercial roof maintenance Calgary',
    'industrial roofing Calgary',
    'flat roof contractor Calgary',
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Commercial Roofing Calgary',
  provider: {
    '@type': 'LocalBusiness',
    name: 'City Roofing & Exteriors',
    telephone: '403-608-9933',
    address: '3935 3a St NE Unit #3, Calgary, AB T2E 6S7',
  },
  areaServed: 'Calgary, Alberta',
  serviceType: [
    'Commercial roof repair',
    'Commercial roof replacement',
    'Commercial flat roofing',
    'Commercial roof inspections',
    'Commercial roof maintenance',
    'Storm and hail damage assessment',
  ],
  description:
    'Commercial roofing services in Calgary for property managers, building owners, industrial facilities, retail buildings, offices and multi-family properties.',
};

const serviceCards = [
  {
    title: 'Commercial Roof Repair',
    text: 'Leak tracing, membrane repairs, flashing, penetrations, rooftop units, storm damage and targeted repairs before the problem spreads inside the building.',
  },
  {
    title: 'Commercial Roof Replacement',
    text: 'Full roof replacement planning for aging systems, recurring leaks, saturated insulation or roofs that no longer make sense to keep patching.',
  },
  {
    title: 'Flat Roofing Systems',
    text: 'Torch-on / SBS, TPO, EPDM and low-slope roofing options selected for Calgary weather, building use, drainage and long-term budget.',
  },
  {
    title: 'Roof Inspections & Reports',
    text: 'Photo-documented findings for owners, property managers, insurance files, capital planning and repair-vs-replacement decisions.',
  },
  {
    title: 'Maintenance Planning',
    text: 'Seasonal inspections, drain checks, small repairs and roof condition records to reduce emergency calls and extend roof life.',
  },
  {
    title: 'Storm & Hail Assessment',
    text: 'Commercial roof checks after Calgary hail, wind, snow load or freeze-thaw events, with clear documentation and repair recommendations.',
  },
];

const propertyTypes = [
  { title: 'Warehouses & Logistics', text: 'Protect inventory, racking, staff areas and daily operations from roof leaks and water damage.' },
  { title: 'Retail Plazas', text: 'Keep tenants open, reduce complaints and coordinate work around customer access.' },
  { title: 'Industrial Facilities', text: 'Plan around equipment, roof traffic, vents, exhaust, penetrations and safety requirements.' },
  { title: 'Office Buildings', text: 'Prevent recurring ceiling stains, tenant disruption and interior water damage.' },
  { title: 'Multi-Family & Condo', text: 'Give boards, owners and property managers clear documentation and practical budgets.' },
  { title: 'Restaurants & Food Service', text: 'Pay attention to rooftop units, grease exposure, drainage and penetrations.' },
  { title: 'Community Buildings', text: 'Schedule around occupants, access, safety and public-facing spaces.' },
  { title: 'New Commercial Builds', text: 'Install roof systems with proper detailing, drainage, closeout and warranty documentation.' },
];

const trustItems = [
  'Calgary roofing company since 2009',
  'In-house crew, no subcontractors',
  'SECOR Certified',
  'WCB Alberta coverage',
  'BBB Accredited',
  '158 verified Google reviews',
  '4.8 star Google rating',
  '3,000+ completed projects',
  'Office and warehouse in Calgary',
  'Own dump trailers for cleaner scheduling',
  'Photo-documented recommendations',
  'Lifetime workmanship warranty on roof replacements',
];

const systems = [
  {
    title: 'Torch-On / SBS Modified Bitumen',
    text: 'A strong fit for many Calgary commercial and low-slope roofs because it handles freeze-thaw cycles, snow load and durable waterproofing details.',
  },
  {
    title: 'TPO Roofing',
    text: 'A reflective single-ply membrane often used on larger commercial roofs where energy performance, heat-welded seams and rooftop equipment access matter.',
  },
  {
    title: 'EPDM Rubber Roofing',
    text: 'A flexible membrane option for low-slope buildings that need cold-weather movement tolerance and straightforward repairability.',
  },
  {
    title: 'Metal & Low-Slope Details',
    text: 'Commercial projects often involve metal edge details, flashing, penetrations, rooftop equipment, tie-ins and drainage corrections.',
  },
];

const processSteps = [
  { title: 'Property Intake', text: 'We confirm building type, access, roof issue, urgency, tenant impact and site constraints.' },
  { title: 'Roof Assessment', text: 'The roof, drainage, flashing, penetrations and visible interior signs are reviewed before recommendations are made.' },
  { title: 'Photos & Findings', text: 'You receive clear findings and documentation that can be used for ownership, management or insurance records.' },
  { title: 'Scope & Options', text: 'We explain practical repair, maintenance, replacement or flat roof system options without forcing one answer.' },
  { title: 'Scheduling & Safety', text: 'Commercial work is planned around access, occupants, cleanup, staging and business disruption.' },
  { title: 'Closeout', text: 'Completed work is reviewed, documented and handed over with warranty or maintenance recommendations where applicable.' },
];

const faqItems: FAQItem[] = [
  {
    q: 'What commercial roofing services do you offer in Calgary?',
    a: 'City Roofing & Exteriors provides commercial roof repair, replacement, flat roofing systems, inspections, maintenance planning and storm or hail damage assessment for Calgary commercial properties.',
  },
  {
    q: 'Do you work with property managers and building owners?',
    a: 'Yes. We work with property managers, business owners, landlords, condo boards and commercial building owners who need clear findings, practical budgets and reliable scheduling.',
  },
  {
    q: 'Can you help keep the building open during the work?',
    a: 'In many cases, yes. We plan access, staging, cleanup and timing to reduce disruption to tenants, staff, customers and daily operations.',
  },
  {
    q: 'Do you provide photo documentation?',
    a: 'Yes. Commercial roof inspections and repair recommendations can include photos of roof conditions, leak points, drainage issues, flashing, membrane damage and completed work.',
  },
  {
    q: 'What types of commercial roofs do you work on?',
    a: 'We work on flat and low-slope commercial roofs including torch-on/SBS, TPO, EPDM and related roof details such as drains, scuppers, flashing, rooftop units and edge metal.',
  },
  {
    q: 'Do you offer maintenance plans?',
    a: 'Yes. Maintenance can include seasonal roof checks, drain and scupper review, minor repairs, condition reporting and recommendations to help reduce emergency leak calls.',
  },
  {
    q: 'When should a commercial roof be replaced instead of repaired?',
    a: 'Replacement may make more sense when leaks keep returning, insulation is wet, the membrane is brittle or shrinking, ponding is widespread, or repair costs are becoming frequent.',
  },
];

const commercialProjects = projectsData.filter((project) => project.category === 'commercial' || project.category === 'repair');
const commercialReviews = reviewsData.filter((review) => ['rev-010', 'rev-002', 'rev-003', 'rev-007'].includes(review.id));

function SectionHeader({ label, title, text, align = 'left' }: { label?: string; title: string; text?: string; align?: 'left' | 'center' }) {
  return (
    <div style={{ maxWidth: '820px', margin: align === 'center' ? '0 auto 40px' : '0 0 36px', textAlign: align }}>
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
    <Link href={href} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: '52px', padding: '0 24px', borderRadius: '4px', backgroundColor: 'var(--color-primary)', color: '#FFFFFF', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '15px', textDecoration: 'none' }}>
      {children}
    </Link>
  );
}

function DarkOutlineButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: '52px', padding: '0 24px', borderRadius: '4px', border: '1px solid rgba(249,247,242,0.34)', color: '#FFFFFF', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '15px', textDecoration: 'none' }}>
      {children}
    </Link>
  );
}

function CheckLine({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <li style={{ display: 'flex', gap: '10px', color: dark ? 'rgba(249,247,242,0.78)' : 'var(--color-text-dark)', fontSize: '15px', lineHeight: 1.55 }}>
      <span style={{ color: dark ? 'var(--color-accent)' : 'var(--color-primary)', fontWeight: 900, flexShrink: 0 }}>✓</span>
      <span>{children}</span>
    </li>
  );
}

export default function CommercialRoofingPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <section className="commercial-service-hero" style={{ backgroundColor: 'var(--color-base)', padding: '136px 24px 62px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.28 }}>
          <Image src="/images/4/Commerical.webp" alt="Commercial roofing project by City Roofing and Exteriors in Calgary" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(26,26,26,0.97) 0%, rgba(26,26,26,0.86) 50%, rgba(26,26,26,0.58) 100%)' }} />

        <div className="commercial-service-hero-grid" style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'minmax(0, 1.03fr) minmax(360px, 0.72fr)', gap: '48px', alignItems: 'center' }}>
          <div>
            <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '18px' }}>
              Commercial Roofing Calgary
            </p>
            <h1 style={{ color: '#F9F7F2', fontSize: 'clamp(44px, 7vw, 80px)', lineHeight: 0.98, letterSpacing: 0, marginBottom: '24px' }}>
              Commercial Roofing for Calgary Buildings
            </h1>
            <p style={{ color: 'rgba(249,247,242,0.82)', fontSize: '19px', lineHeight: 1.65, maxWidth: '720px', marginBottom: '28px' }}>
              Roof repairs, replacements, inspections, maintenance and flat roof systems for warehouses, retail plazas, industrial properties, offices and multi-family buildings.
            </p>
            <div className="commercial-service-buttons" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '28px' }}>
              <PrimaryButton href="#commercial-form">Request Commercial Roof Assessment</PrimaryButton>
              <DarkOutlineButton href="tel:403-608-9933">Call 403-608-9933</DarkOutlineButton>
            </div>
            <div className="commercial-service-trust" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['Since 2009', 'In-house crew', 'SECOR Certified', 'WCB Alberta', 'BBB Accredited', '158 Google reviews', '4.8 star rating'].map((item) => (
                <span key={item} style={{ color: '#F9F7F2', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '999px', padding: '8px 11px', fontSize: '12px', fontWeight: 700 }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div id="commercial-form">
            <CommercialInspectionForm />
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--color-cream-dark)', borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="commercial-service-stats" style={{ maxWidth: '1180px', margin: '0 auto', padding: '30px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {[
            ['15+', 'Years in Calgary'],
            ['$3M+', 'Commercial experience'],
            ['158', 'Verified reviews'],
            ['SECOR', 'Safety certified'],
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
          <SectionHeader
            label="Built for commercial decisions"
            title="A Commercial Roof Page Should Answer Business Questions"
            text="A business owner or property manager is not just buying shingles or membrane. They need to know what is leaking, how urgent it is, what it will cost, how work affects tenants, and whether repair, maintenance or replacement is the right financial decision."
          />
          <div className="commercial-service-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
            {[
              ['Protect Operations', 'Plan repairs and roof work around access, tenants, customers, equipment and daily operations.'],
              ['Control Roof Risk', 'Catch drainage, flashing, membrane and storm damage issues before they become interior damage.'],
              ['Document the Building', 'Use photos, findings and scopes to support ownership records, budgeting and insurance discussions.'],
            ].map(([title, text]) => (
              <article key={title} style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-border-light)', borderRadius: '6px', padding: '26px' }}>
                <h3 style={{ color: 'var(--color-text-dark)', fontSize: '22px', lineHeight: 1.2, marginBottom: '10px' }}>{title}</h3>
                <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '15px', lineHeight: 1.65 }}>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '86px 24px', backgroundColor: 'var(--color-cream)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <SectionHeader label="Services" title="Commercial Roofing Services" text="This page covers the full commercial roofing relationship. For a dedicated flat roof leak, inspection and replacement landing page, use the flat roofing page." />
          <div className="commercial-service-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
            {serviceCards.map((service) => (
              <article key={service.title} style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border-light)', borderRadius: '6px', padding: '24px', minHeight: '178px', boxShadow: '0 2px 8px rgba(0,0,0,0.045)' }}>
                <h3 style={{ color: 'var(--color-text-dark)', fontSize: '20px', lineHeight: 1.2, marginBottom: '10px' }}>{service.title}</h3>
                <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '15px', lineHeight: 1.65 }}>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '86px 24px', backgroundColor: 'var(--color-base)' }}>
        <div className="commercial-service-two-col" style={{ maxWidth: '1180px', margin: '0 auto', display: 'grid', gridTemplateColumns: '0.92fr 1.08fr', gap: '46px', alignItems: 'center' }}>
          <div>
            <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
              Maintenance lowers surprise costs
            </p>
            <h2 style={{ color: '#F9F7F2', fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: 1.08, marginBottom: '16px' }}>
              From Emergency Repairs to Roof Asset Planning
            </h2>
            <p style={{ color: 'rgba(249,247,242,0.74)', fontSize: '17px', lineHeight: 1.75, marginBottom: '24px' }}>
              The strongest commercial roofing companies do more than install roofs. They help owners manage risk: inspections, maintenance, documentation, repair history and replacement planning. That is the direction this page takes.
            </p>
            <PrimaryButton href="#commercial-form">Request Roof Assessment</PrimaryButton>
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.13)', borderRadius: '6px', padding: '30px' }}>
            <h3 style={{ color: '#F9F7F2', fontSize: '23px', lineHeight: 1.2, marginBottom: '18px' }}>A commercial maintenance visit may include:</h3>
            <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '13px 20px', listStyle: 'none' }}>
              {['Drain and scupper review', 'Membrane and seam checks', 'Flashing and penetration review', 'Rooftop unit leak points', 'Ponding water notes', 'Minor repair recommendations', 'Photos for building records', 'Budget planning notes'].map((item) => (
                <CheckLine key={item} dark>{item}</CheckLine>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section style={{ padding: '86px 24px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <SectionHeader label="Roof systems" title="Commercial Roof Systems We Assess and Install" text="The right commercial roof depends on the building, roof traffic, drainage, rooftop equipment, budget and expected service life." />
          <div className="commercial-system-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {systems.map((system) => (
              <article key={system.title} style={{ border: '1px solid var(--color-border-light)', borderRadius: '6px', padding: '22px', backgroundColor: '#FFFFFF' }}>
                <h3 style={{ color: 'var(--color-text-dark)', fontSize: '18px', lineHeight: 1.25, marginBottom: '10px' }}>{system.title}</h3>
                <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '14px', lineHeight: 1.65 }}>{system.text}</p>
              </article>
            ))}
          </div>
          <div style={{ marginTop: '28px', backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-border-light)', borderLeft: '4px solid var(--color-primary)', borderRadius: '0 6px 6px 0', padding: '24px 28px' }}>
            <p style={{ color: 'var(--color-text-dark)', fontSize: '15px', lineHeight: 1.7, marginBottom: '10px' }}>
              Need a page focused only on commercial flat roof leaks, ponding water, inspections and repair-vs-replacement decisions?
            </p>
            <Link href="/services/flat-roofing" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '15px', textDecoration: 'none' }}>
              View Commercial Flat Roofing Calgary →
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '86px 24px', backgroundColor: 'var(--color-cream-dark)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <SectionHeader label="Properties" title="Commercial Properties We Service" />
          <div className="commercial-property-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {propertyTypes.map((property) => (
              <article key={property.title} style={{ border: '1px solid var(--color-border-light)', borderRadius: '6px', padding: '20px', backgroundColor: '#FFFFFF' }}>
                <h3 style={{ color: 'var(--color-text-dark)', fontSize: '17px', lineHeight: 1.25, marginBottom: '10px' }}>{property.title}</h3>
                <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '14px', lineHeight: 1.6 }}>{property.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '86px 24px', backgroundColor: '#FFFFFF' }}>
        <div className="commercial-service-two-col" style={{ maxWidth: '1180px', margin: '0 auto', display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: '44px', alignItems: 'start' }}>
          <div>
            <SectionHeader label="Why City Roofing" title="Built for Accountability, Not Just Installation" text="Commercial roofing buyers need a contractor who can enter the site properly, document findings, schedule responsibly and stand behind the work." />
            <PrimaryButton href="#commercial-form">Start With an Assessment</PrimaryButton>
          </div>
          <div style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-border-light)', borderRadius: '6px', padding: '30px' }}>
            <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 22px', listStyle: 'none' }}>
              {trustItems.map((item) => <CheckLine key={item}>{item}</CheckLine>)}
            </ul>
          </div>
        </div>
      </section>

      <section style={{ padding: '86px 24px', backgroundColor: 'var(--color-cream)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <SectionHeader label="Project proof" title="Commercial Roofing Work in Calgary" text="Real project images are stronger than stock photos. These examples stay conservative where exact site details are not available." />
          <div className="commercial-project-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '22px' }}>
            {commercialProjects.map((project) => (
              <article key={project.id} style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border-light)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: '260px', backgroundColor: 'var(--color-surface)' }}>
                  <Image src={project.image} alt={`${project.title} in ${project.location}`} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '24px' }}>
                  <p style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>{project.location}</p>
                  <h3 style={{ color: 'var(--color-text-dark)', fontSize: '23px', marginBottom: '10px' }}>{project.title}</h3>
                  <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '15px', lineHeight: 1.65 }}>{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '86px 24px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <SectionHeader label="Process" title="How Our Commercial Roofing Process Works" />
          <div className="commercial-process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
            {processSteps.map((step, index) => (
              <article key={step.title} style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-border-light)', borderRadius: '6px', padding: '24px' }}>
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

      <section style={{ padding: '86px 24px', backgroundColor: 'var(--color-cream-dark)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <SectionHeader label="Reviews" title="What Commercial Clients Value" />
          <div className="commercial-review-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px' }}>
            {commercialReviews.map((review) => (
              <article key={review.id} style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border-light)', borderRadius: '6px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.045)' }}>
                <div style={{ color: '#F5A623', letterSpacing: '2px', fontSize: '14px', marginBottom: '14px' }}>★★★★★</div>
                <p style={{ color: 'var(--color-text-dark)', fontSize: '14px', lineHeight: 1.65, marginBottom: '18px' }}>&ldquo;{review.text}&rdquo;</p>
                <p style={{ color: 'var(--color-text-dark)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '14px' }}>{review.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={faqItems} title="Commercial Roofing FAQ" />

      <section style={{ backgroundColor: 'var(--color-base)', padding: '82px 24px 104px', textAlign: 'center' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '14px' }}>
            Calgary-based. In-house crew. SECOR Certified. WCB Alberta. BBB Accredited.
          </p>
          <h2 style={{ color: '#F9F7F2', fontSize: 'clamp(32px, 5vw, 54px)', lineHeight: 1.05, marginBottom: '16px' }}>
            Need a Commercial Roof Assessed?
          </h2>
          <p style={{ color: 'rgba(249,247,242,0.76)', fontSize: '17px', lineHeight: 1.7, marginBottom: '28px' }}>
            Whether you are dealing with leaks, planning a replacement, budgeting maintenance or checking storm damage, City Roofing & Exteriors can inspect the roof and give you a clear next step.
          </p>
          <div className="commercial-service-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <PrimaryButton href="#commercial-form">Request Commercial Roof Assessment</PrimaryButton>
            <DarkOutlineButton href="tel:403-608-9933">Call 403-608-9933</DarkOutlineButton>
          </div>
        </div>
      </section>

      <a href="tel:403-608-9933" className="commercial-mobile-call">Call 403-608-9933</a>

      <style>{`
        @media (max-width: 980px) {
          .commercial-service-hero-grid,
          .commercial-service-two-col {
            grid-template-columns: 1fr !important;
          }
          .commercial-service-grid,
          .commercial-property-grid,
          .commercial-process-grid,
          .commercial-review-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .commercial-system-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .commercial-project-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 720px) {
          .commercial-service-hero {
            padding: 112px 18px 42px !important;
          }
          .commercial-service-buttons > a {
            width: 100% !important;
          }
          .commercial-service-stats,
          .commercial-service-grid,
          .commercial-property-grid,
          .commercial-process-grid,
          .commercial-review-grid,
          .commercial-system-grid {
            grid-template-columns: 1fr !important;
          }
          .commercial-service-trust span {
            font-size: 11px !important;
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
