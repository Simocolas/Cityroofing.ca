import type { Metadata } from 'next';
import ServiceHero from '@/components/shared/ServiceHero';
import QuickAnswerBox from '@/components/shared/QuickAnswerBox';
import FAQSection, { FAQItem } from '@/components/shared/FAQSection';
import ServiceCTA from '@/components/shared/ServiceCTA';

export const metadata: Metadata = {
  title: 'Roof Replacement Calgary | City Roofing & Exteriors',
  description:
    'Expert roof replacement in Calgary. Asphalt shingles, flat roof, metal roofing. 15+ years, 4.8\u2605 Google rating, SECOR certified. Free estimate: 403-608-9933.',
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Roof Replacement Calgary',
  provider: { '@type': 'LocalBusiness', name: 'City Roofing & Exteriors' },
  areaServed: 'Calgary, Alberta',
  description:
    'Complete residential and commercial roof replacement in Calgary. Asphalt shingles, flat roof, metal roofing.',
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
    { '@type': 'HowToStep', name: 'Cleanup & Inspection', text: 'Full site cleanup and final quality inspection before we leave.' },
    { '@type': 'HowToStep', name: 'Final Walkthrough & Warranty', text: 'We walk through the finished roof with you and provide all warranty documentation.' },
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

const steps = [
  { num: 1, title: 'Free Inspection', desc: 'We conduct a thorough on-site roof inspection at no cost and no obligation.' },
  { num: 2, title: 'Written Estimate', desc: 'A detailed written estimate with material options, pricing, and timeline.' },
  { num: 3, title: 'Material Selection', desc: 'Choose your preferred shingle style, colour, and manufacturer from our catalogue.' },
  { num: 4, title: 'Installation Day', desc: 'Our SECOR-certified crew arrives on schedule and completes the job — typically in one day.' },
  { num: 5, title: 'Cleanup & Inspection', desc: 'Full magnetic nail sweep, debris removal, and quality inspection before we leave.' },
  { num: 6, title: 'Final Walkthrough & Warranty', desc: 'We walk through the finished roof with you and hand over all warranty documentation.' },
];

export default function RoofReplacementPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <ServiceHero
        title="Roof Replacement in Calgary"
        subtitle="Complete residential and commercial reroofing — asphalt shingles, flat roofs, and metal roofing systems."
        breadcrumb="Services / Roof Replacement"
        breadcrumbPath="/services/roof-replacement"
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 24px' }}>

        {/* Quick Answer */}
        <QuickAnswerBox>
          City Roofing &amp; Exteriors provides complete roof replacement in Calgary, Alberta. With 15+ years of local
          experience and 158 Google reviews averaging 4.8 out of 5 stars, we replace asphalt shingle roofs, flat roofs,
          and metal roofs for residential and commercial properties across all Calgary quadrants. SECOR certified, WCB
          Alberta registered, BBB Accredited. Call 403-608-9933 for a free on-site estimate.
        </QuickAnswerBox>

        {/* Materials section */}
        <section style={{ marginBottom: '72px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 38px)', color: 'var(--color-text-primary)', marginBottom: '36px' }}>
            Roofing Materials We Install
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {[
              {
                title: 'Asphalt Shingles',
                body: `Asphalt shingles are the most popular roofing material in Calgary — and for good reason. They balance cost, durability, and aesthetics for Alberta's climate. City Roofing installs 3-tab, architectural (laminate), and premium designer shingles from IKO, BP/BMCA, Malarkey, GAF, Owens Corning, and CertainTeed. For Calgary homeowners, we strongly recommend Class 4 impact-resistant shingles rated for hail resistance. Calgary averages 15–20 significant hail events per year, and impact-resistant shingles can reduce your home insurance premiums by 15–30% depending on your provider. Standard architectural shingles carry 30–50 year manufacturer warranties. We'll walk you through every option at your free inspection.`,
              },
              {
                title: 'Flat Roof Systems',
                body: `Flat and low-slope roofs require specialized materials and installation techniques. City Roofing installs torch-on modified bitumen — the most common flat roof system in Calgary — as well as EPDM rubber membrane for residential garages, additions, and commercial buildings. Torch-on systems are durable, proven in Alberta winters, and relatively cost-effective. EPDM offers excellent flexibility through freeze-thaw cycles. All flat roof installations include proper drainage slope and edge termination to prevent standing water and ice dam formation.`,
              },
              {
                title: 'Metal Roofing',
                body: `Metal roofing is the highest-performing option for Calgary homes — lasting 40–70 years with minimal maintenance. Standing seam and metal shingle systems from reputable manufacturers hold up exceptionally well against hail, heavy snow loads, and chinook wind cycles. Metal roofing is now available in dozens of profiles and colours that complement any architectural style. The upfront cost is higher, but the lifecycle cost often beats asphalt by a significant margin. We provide detailed comparison quotes so you can make an informed decision.`,
              },
              {
                title: 'Rubber Roofing',
                body: `EPDM rubber membrane is an excellent choice for flat and low-slope applications including residential garages, home additions, and low-pitch commercial roofs. It handles Calgary's freeze-thaw cycles exceptionally well, remains flexible in cold temperatures, and is easy to patch if punctured. City Roofing installs fully adhered EPDM systems with manufacturer-backed warranties.`,
              },
            ].map((mat) => (
              <div key={mat.title} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '32px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--color-text-primary)', marginBottom: '12px' }}>
                  {mat.title}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: 1.8 }}>{mat.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process section */}
        <section style={{ marginBottom: '72px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 38px)', color: 'var(--color-text-primary)', marginBottom: '36px' }}>
            Our Roof Replacement Process
          </h2>
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

        {/* Areas served */}
        <section style={{ marginBottom: '72px', backgroundColor: 'var(--color-surface)', borderRadius: '6px', padding: '36px 40px', border: '1px solid var(--color-border)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
            Areas We Serve
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: 1.8 }}>
            City Roofing &amp; Exteriors provides roof replacement services across all Calgary quadrants —
            NE Calgary, NW Calgary, SE Calgary, and SW Calgary — as well as surrounding communities including
            Airdrie, Cochrane, Chestermere, and Okotoks. If you're unsure whether we service your area,
            call us at 403-608-9933.
          </p>
        </section>

        {/* Recent projects */}
        <section style={{ marginBottom: '72px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 38px)', color: 'var(--color-text-primary)', marginBottom: '28px' }}>
            Recent Roof Replacement Projects
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { label: 'Before & After', area: 'NE Calgary — Asphalt Shingles' },
              { label: 'Before & After', area: 'NW Calgary — Metal Roofing' },
              { label: 'Before & After', area: 'SE Calgary — Flat Roof EPDM' },
            ].map((proj, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#1E1E1E',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                  aspectRatio: '4/3',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                {/* TODO: Replace with real project photos */}
                <p style={{ color: '#2A2A2A', fontFamily: 'var(--font-display)', fontSize: '12px', letterSpacing: '2px' }}>
                  Project Photo — {proj.label}
                </p>
                <p style={{ color: '#2A2A2A', fontSize: '12px' }}>{proj.area}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <FAQSection items={faqItems} title="Roof Replacement FAQ" />
      <ServiceCTA headline="Ready for a New Roof?" subtext="Free inspection. Honest estimate. No pressure." />
    </div>
  );
}
