import type { Metadata } from 'next';
import Link from 'next/link';
import ServiceHero from '@/components/shared/ServiceHero';
import QuickAnswerBox from '@/components/shared/QuickAnswerBox';
import FAQSection, { FAQItem } from '@/components/shared/FAQSection';
import ServiceCTA from '@/components/shared/ServiceCTA';

export const metadata: Metadata = {
  title: 'Roof Repair Calgary | Emergency Roofing | City Roofing',
  description:
    'Calgary roof repair and emergency roofing services. Hail damage, leaks, storm repair. SECOR certified, 4.8\u2605 rated. Call 403-608-9933.',
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Roof Repair Calgary',
  provider: { '@type': 'LocalBusiness', name: 'City Roofing & Exteriors' },
  areaServed: 'Calgary, Alberta',
  description:
    'Residential and commercial roof repair in Calgary including emergency leaks, hail damage, shingle replacement, and flat roof patching.',
};

const faqItems: FAQItem[] = [
  {
    q: 'Should I repair or replace my roof?',
    a: 'If the damaged area is less than 25% of the total roof and the roof is under 15–20 years old, repair is typically the right call. We assess this honestly during our free inspection — we never push replacement when repair will do.',
  },
  {
    q: 'How fast can you respond to an emergency roof leak in Calgary?',
    a: "We prioritize emergency calls across all Calgary quadrants. In most cases we can assess and apply a temporary tarp or patch within 24 hours of your call. Contact us at 403-608-9933.",
  },
  {
    q: 'Does insurance cover roof repair in Calgary?',
    a: 'Insurance typically covers repair when damage results from an insured peril — hailstorm, windstorm, or falling debris. Gradual wear and tear is generally excluded. We help document damage thoroughly for your claim.',
  },
  {
    q: 'Can you repair hail damage without a full replacement?',
    a: "Yes, in many cases. If the hail dents are limited to a portion of the roof, targeted shingle replacement is possible. We assess the full extent of hail damage and give you an honest recommendation.",
  },
  {
    q: 'Do you repair flat roofs?',
    a: "Yes. City Roofing repairs torch-on modified bitumen, EPDM rubber, and TPO membrane flat roofs. Common flat roof repairs include blistering, seam failures, drain blockages, and punctures.",
  },
  {
    q: 'What are signs I need roof repair?',
    a: "Visible missing or curled shingles, granules in your eavestroughs, water stains on ceilings, daylight visible through the attic, or a roof that's 15+ years old with no recent inspection.",
  },
];

const repairTypes = [
  { title: 'Leak Repair', desc: 'Active leaks need fast diagnosis. We trace the source — often flashing, valleys, or pipe boots — and repair correctly rather than just patching symptoms.' },
  { title: 'Hail Damage', desc: "Calgary's hail season demands expert assessment. We document impact points, assess shingle integrity, and determine whether repair or replacement is warranted." },
  { title: 'Shingle Replacement', desc: 'Missing, cracked, or curled shingles create entry points for water. We match your existing shingle profile and colour as closely as possible.' },
  { title: 'Flashing Repair', desc: 'Chimney, skylight, and wall flashing is a common failure point. We reseal or replace flashing using correct materials for Alberta weather conditions.' },
  { title: 'Flat Roof Patching', desc: 'Blistering, seam separation, and punctures in torch-on or membrane flat roofs are repairable without full replacement in most cases.' },
  { title: 'Ice Dam & Ventilation', desc: 'Ice dams are a symptom of poor attic ventilation. We assess and repair both the immediate damage and the underlying ventilation issue.' },
];

export default function RoofRepairPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* Emergency banner — top */}
      <div
        style={{
          backgroundColor: '#C0392B',
          padding: '14px 24px',
          textAlign: 'center',
          position: 'sticky',
          top: '72px',
          zIndex: 50,
        }}
      >
        <p style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px' }}>
          Roof leaking right now?{' '}
          <a href="tel:403-608-9933" style={{ color: '#fff', textDecoration: 'underline', fontWeight: 900 }}>
            Call 403-608-9933
          </a>
        </p>
      </div>

      <ServiceHero
        title="Roof Repair & Emergency Roofing in Calgary"
        subtitle="Fast, honest roof repair for leaks, hail damage, missing shingles, and flat roof failures."
        breadcrumb="Services / Roof Repair"
        breadcrumbPath="/services/roof-repair"
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 24px' }}>
        <QuickAnswerBox>
          City Roofing &amp; Exteriors provides residential and commercial roof repair across Calgary, Alberta.
          Services include emergency leak repair, hail damage assessment, shingle replacement, flat roof patching,
          and storm damage restoration. Available to Calgary homeowners — call 403-608-9933.
        </QuickAnswerBox>

        {/* Repair types */}
        <section style={{ marginBottom: '72px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 38px)', color: 'var(--color-text-primary)', marginBottom: '32px' }}>
            Types of Roof Repair We Handle
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {repairTypes.map((type) => (
              <div
                key={type.title}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                  padding: '28px',
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: 'var(--color-text-primary)', marginBottom: '10px' }}>
                  {type.title}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '15px', lineHeight: 1.7 }}>{type.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Insurance claim process */}
        <section style={{ marginBottom: '72px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '40px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
            Navigating Your Insurance Claim
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
            City Roofing &amp; Exteriors has experience working with all major Alberta home insurance providers.
            After a hailstorm or wind event, we document damage with detailed photos and measurements, provide
            a written scope of work, and communicate directly with your adjuster when needed. We do not engage
            in insurance fraud or inflated claims — only honest, documented work.
          </p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: 1.8 }}>
            If your claim is denied or undervalued, we can help you understand your options. Call 403-608-9933
            to schedule a damage assessment.
          </p>
        </section>

        {/* Service areas */}
        <section style={{ marginBottom: '72px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
            Service Areas
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: 1.8 }}>
            We respond to roof repair calls across all Calgary quadrants — NE, NW, SE, and SW — plus
            Airdrie, Cochrane, Chestermere, and Okotoks. Emergency response is prioritized for active leaks.
          </p>
        </section>
      </div>

      <FAQSection items={faqItems} title="Roof Repair FAQ" />

      {/* Emergency banner — bottom */}
      <div
        style={{
          backgroundColor: '#C0392B',
          padding: '32px 24px',
          textAlign: 'center',
        }}
      >
        <p style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(18px, 3vw, 26px)', marginBottom: '8px' }}>
          Roof leaking right now?
        </p>
        <a
          href="tel:403-608-9933"
          style={{
            color: '#fff',
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(22px, 4vw, 36px)',
            textDecoration: 'none',
            letterSpacing: '1px',
          }}
        >
          Call 403-608-9933
        </a>
      </div>

      <ServiceCTA headline="Need a Repair Quote?" subtext="Free inspection — honest assessment — no pressure." />
    </div>
  );
}
