import Link from 'next/link';

interface ServiceCTAProps {
  headline?: string;
  subtext?: string;
}

export default function ServiceCTA({
  headline = 'Ready for a Free Estimate?',
  subtext = 'Free inspection. Honest quote. No pressure.',
}: ServiceCTAProps) {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-primary)',
        padding: '72px 24px',
        textAlign: 'center',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(28px, 4vw, 44px)',
          color: '#fff',
          marginBottom: '12px',
          lineHeight: 1.15,
        }}
      >
        {headline}
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', marginBottom: '36px' }}>
        {subtext}
      </p>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a
          href="tel:403-608-9933"
          style={{
            border: '2px solid #fff',
            backgroundColor: 'transparent',
            color: '#fff',
            padding: '14px 32px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '16px',
            letterSpacing: '0.5px',
            display: 'inline-block',
          }}
        >
          Call 403-608-9933
        </a>
        <Link
          href="/contact"
          style={{
            backgroundColor: '#fff',
            color: 'var(--color-primary)',
            padding: '14px 32px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '16px',
            letterSpacing: '0.5px',
            display: 'inline-block',
          }}
        >
          Request Free Estimate
        </Link>
      </div>
    </section>
  );
}
