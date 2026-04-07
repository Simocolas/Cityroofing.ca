import type { Metadata } from 'next';
import ServiceHero from '@/components/shared/ServiceHero';
import QuickAnswerBox from '@/components/shared/QuickAnswerBox';
import FAQSection, { FAQItem } from '@/components/shared/FAQSection';
import ServiceCTA from '@/components/shared/ServiceCTA';

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
  description:
    'Commercial roofing services in Calgary including flat roof systems, torch-on, EPDM, and TPO membrane installation and repair.',
};

const faqItems: FAQItem[] = [
  {
    q: 'What types of commercial roofing does City Roofing install?',
    a: "We install torch-on modified bitumen, EPDM rubber membrane, and TPO single-ply membrane systems — the three most common commercial flat roof systems used in Calgary and Alberta.",
  },
  {
    q: 'What is the largest commercial roofing project you have completed?',
    a: "City Roofing has completed commercial roofing projects exceeding $3 million CAD cumulatively, including warehouse facilities, retail plazas, and multi-unit residential buildings across Calgary.",
  },
  {
    q: 'How do you minimize disruption to our business during roofing?',
    a: "We schedule work around your business hours where possible and coordinate sequenced crew deployment to minimize noise, debris, and access disruption. We discuss scheduling in detail before the project begins.",
  },
  {
    q: 'Do you offer commercial roofing maintenance programs?',
    a: "Yes. Preventive maintenance — annual inspections, seam checks, drain clearing — is the most cost-effective way to extend flat roof life and avoid emergency repairs. Contact us to discuss a maintenance schedule.",
  },
  {
    q: 'Are you able to handle commercial insurance claims?',
    a: "Yes. We have experience documenting commercial hail and storm damage for insurance purposes and can work with your broker and adjuster throughout the process.",
  },
];

const systems = [
  {
    title: 'Torch-On Modified Bitumen',
    desc: `The most widely specified flat roof system in Calgary commercial construction. Two-ply torch-on systems consist of a base sheet and a granular cap sheet, heat-fused for a fully adhered, watertight membrane. Torch-on handles Alberta temperature extremes well and can be repaired cost-effectively. City Roofing installs torch-on on new construction, reroofing projects, and partial replacements.`,
  },
  {
    title: 'EPDM Rubber Membrane',
    desc: `EPDM (ethylene propylene diene monomer) is a single-ply rubber membrane known for durability, flexibility, and low lifecycle cost. It performs exceptionally well in cold climates, remains flexible at low temperatures, and carries 20–30 year manufacturer warranties when installed by certified contractors. Suitable for warehouses, industrial facilities, and large commercial rooftops.`,
  },
  {
    title: 'TPO Single-Ply Membrane',
    desc: `Thermoplastic polyolefin (TPO) membranes are heat-welded at seams, creating a watertight bond that often outperforms adhesive-set systems. TPO is resistant to UV, chemicals, and puncture — making it a strong choice for rooftops with foot traffic, mechanical equipment, or chemical exposure. City Roofing installs TPO in white and tan finishes to meet energy code requirements.`,
  },
];

export default function CommercialRoofingPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <ServiceHero
        title="Commercial Roofing Calgary"
        subtitle="Flat roof systems for warehouses, retail, and multi-unit buildings. $3M+ project experience across Calgary."
        breadcrumb="Services / Commercial Roofing"
        breadcrumbPath="/services/commercial"
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 24px' }}>
        <QuickAnswerBox>
          City Roofing &amp; Exteriors delivers commercial roofing services in Calgary, Alberta, with cumulative
          project experience exceeding $3 million CAD. Our commercial division installs and repairs flat roof systems
          — torch-on modified bitumen, EPDM rubber membrane, and TPO single-ply — for warehouses, retail plazas,
          industrial facilities, and multi-unit residential buildings. SECOR certified, WCB Alberta registered.
          Call 403-608-9933 to discuss your project.
        </QuickAnswerBox>

        {/* Capability statement */}
        <section
          style={{
            marginBottom: '72px',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderLeft: '4px solid var(--color-primary)',
            borderRadius: '0 6px 6px 0',
            padding: '40px',
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(22px, 3vw, 30px)', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
            Project Scale &amp; Capability
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
            City Roofing &amp; Exteriors has managed commercial roofing projects from small retail units to
            large warehouse complexes. Our team brings the same accountability to a 2,000 sq ft flat roof as
            to a 50,000 sq ft industrial facility — written estimates, scheduled milestones, and a project lead
            assigned to your job from start to finish.
          </p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: 1.8 }}>
            We are experienced with general contractor environments, progress billing, and project closeout
            documentation. SECOR certification and WCB registration are standard on all commercial sites.
          </p>
        </section>

        {/* Roof systems */}
        <section style={{ marginBottom: '72px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 38px)', color: 'var(--color-text-primary)', marginBottom: '36px' }}>
            Commercial Flat Roof Systems
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {systems.map((sys) => (
              <div key={sys.title} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '32px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--color-text-primary)', marginBottom: '12px' }}>
                  {sys.title}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: 1.8 }}>{sys.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section
          style={{
            marginBottom: '72px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
          }}
        >
          {['SECOR Safety Certified', 'WCB Alberta Registered', 'BBB Accredited'].map((cert) => (
            <div
              key={cert}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                padding: '24px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '14px',
                  letterSpacing: '1px',
                  color: 'var(--color-accent)',
                  textTransform: 'uppercase',
                }}
              >
                {cert}
              </div>
            </div>
          ))}
        </section>
      </div>

      <FAQSection items={faqItems} title="Commercial Roofing FAQ" />
      <ServiceCTA headline="Have a Commercial Project?" subtext="Let's talk scope, timeline, and budget." />
    </div>
  );
}
