import type { Metadata } from 'next';
import ServiceHero from '@/components/shared/ServiceHero';
import FAQSection, { FAQItem } from '@/components/shared/FAQSection';
import ServiceCTA from '@/components/shared/ServiceCTA';

export const metadata: Metadata = {
  title: 'About City Roofing & Exteriors | Calgary Since 2009',
  description:
    "Calgary's trusted roofing contractor since 2009. 15+ years, 158 Google reviews at 4.8\u2605, SECOR certified, WCB Alberta, BBB Accredited. Learn our story.",
};

const faqItems: FAQItem[] = [
  {
    q: 'How long has City Roofing been in business?',
    a: 'City Roofing & Exteriors was established in 2009 and has been serving Calgary homeowners and businesses for over 15 years.',
  },
  {
    q: 'What certifications does City Roofing hold?',
    a: 'We hold SECOR safety certification (Safety Certification for Employers, Alberta), are registered with WCB Alberta, and are accredited by the Better Business Bureau.',
  },
  {
    q: 'Is City Roofing a local Calgary company?',
    a: 'Yes. City Roofing & Exteriors is based in Calgary at 3935 3a St NE Unit #3. We are not a franchise — every job is run by our own crew.',
  },
];

const values = [
  {
    title: 'Quality',
    desc: "We use materials we'd put on our own homes — and install them the way our own families would expect.",
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: 'Transparency',
    desc: 'Written quotes with no hidden costs. We explain every line item before work begins and stick to the number.',
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: 'Reliability',
    desc: 'We show up when we say we will, finish what we start, and answer the phone when you call.',
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    title: 'Safety',
    desc: 'SECOR certified crew on every job. Safety is not a checkbox — it protects our team, your property, and your family.',
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const certs = [
  { name: 'SECOR Safety Certification', desc: 'Safety Certification for Employers, Alberta' },
  { name: 'WCB Alberta', desc: 'Workers Compensation Board Registered' },
  { name: 'BBB Accredited Business', desc: 'Better Business Bureau — Calgary' },
  { name: 'Calgary Prime Contractor', desc: 'Coming 2026', pending: true },
];

const stats = [
  { value: '15+', label: 'Years in Calgary' },
  { value: '1,000+', label: 'Projects Completed' },
  { value: '4.8★', label: 'Google Rating' },
  { value: '$3M+', label: 'Commercial Experience' },
];

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh' }}>
      <ServiceHero
        title="About City Roofing & Exteriors"
        subtitle="15 years of Calgary roofs. Built on community trust, one project at a time."
        breadcrumb="About"
        breadcrumbPath="/about"
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 24px' }}>

        {/* Company story */}
        <section style={{ marginBottom: '72px', maxWidth: '800px' }}>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '2px',
              color: 'var(--color-accent)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            Our Story
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--color-text-primary)', marginBottom: '24px', lineHeight: 1.2 }}>
            Started in Calgary. Built on Community.
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '17px', lineHeight: 1.85, marginBottom: '20px' }}>
            City Roofing &amp; Exteriors was founded in 2009 in Calgary — not as a franchise, not as a national
            chain, but as a local crew doing honest work in their own community. Our first jobs came through
            referrals from neighbours in NE Calgary. Those referrals turned into repeat clients, who sent their
            friends, who sent theirs. Fifteen years later, that word-of-mouth foundation still shows up in our
            158 Google reviews averaging 4.8 stars.
          </p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '17px', lineHeight: 1.85, marginBottom: '20px' }}>
            Today we serve residential and commercial clients across every Calgary quadrant and surrounding
            communities. Our work ranges from single-shingle repairs to multi-million dollar commercial flat
            roof installations — but the approach is the same: show up on time, do the work right, and stand
            behind it.
          </p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '17px', lineHeight: 1.85 }}>
            Every crew member on your job is our own employee — SECOR certified and WCB Alberta covered.
            We do not subcontract our work.
          </p>
        </section>

        {/* Stats row */}
        <section
          style={{
            marginBottom: '72px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1px',
            backgroundColor: 'var(--color-border)',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                backgroundColor: 'var(--color-surface)',
                padding: '32px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '36px', color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                {stat.value}
              </div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '13px', letterSpacing: '0.5px' }}>{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Core values */}
        <section style={{ marginBottom: '72px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 38px)', color: 'var(--color-text-primary)', marginBottom: '36px' }}>
            How We Work
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {values.map((value) => (
              <div
                key={value.title}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                  padding: '32px',
                }}
              >
                <div style={{ color: 'var(--color-accent)', marginBottom: '16px' }}>{value.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', color: 'var(--color-text-primary)', marginBottom: '10px' }}>
                  {value.title}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '15px', lineHeight: 1.7 }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section style={{ marginBottom: '72px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 38px)', color: 'var(--color-text-primary)', marginBottom: '32px' }}>
            Certifications &amp; Accreditations
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {certs.map((cert) => (
              <div
                key={cert.name}
                style={{
                  backgroundColor: cert.pending ? 'transparent' : 'var(--color-surface)',
                  border: `1px solid ${cert.pending ? '#2A2A2A' : 'var(--color-border)'}`,
                  borderRadius: '6px',
                  padding: '28px',
                  opacity: cert.pending ? 0.5 : 1,
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '15px', color: cert.pending ? 'var(--color-text-muted)' : 'var(--color-accent)', marginBottom: '6px' }}>
                  {cert.name}
                </div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>{cert.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <FAQSection items={faqItems} title="About City Roofing — FAQ" />
      <ServiceCTA headline="Work With Us" subtext="Free inspection — written estimate — no pressure." />
    </div>
  );
}
