'use client';

import Link from 'next/link';

export default function ContactCTA() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-primary)',
        padding: '80px 24px',
        width: '100%',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '48px',
          flexWrap: 'wrap',
        }}
      >
        {/* Left: text + buttons */}
        <div style={{ flex: 1, minWidth: '280px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 48px)',
              color: '#FFFFFF',
              marginBottom: '12px',
              lineHeight: 1.15,
            }}
          >
            Get a Free On-Site Estimate
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '17px',
              lineHeight: 1.6,
              marginBottom: '36px',
              maxWidth: '480px',
            }}
          >
            We come to you, assess the job, and give you a straight answer — no pushy sales, no surprise costs. Same-day estimates are available when scheduling allows.
          </p>
          <div className="cta-buttons" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', width: '100%' }}>
            <a
              href="tel:403-608-9933"
              style={{
                border: '2px solid #fff',
                backgroundColor: 'transparent',
                color: '#fff',
                padding: '14px 28px',
                borderRadius: '4px',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '15px',
                letterSpacing: '0.5px',
                transition: 'background-color 150ms ease-out, color 150ms ease-out',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#fff';
              }}
            >
              Call 403-608-9933
            </a>
            <Link
              href="/contact"
              style={{
                backgroundColor: '#fff',
                color: 'var(--color-primary)',
                padding: '14px 28px',
                borderRadius: '4px',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '15px',
                letterSpacing: '0.5px',
                transition: 'opacity 150ms ease-out',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Request Free Estimate
            </Link>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .cta-buttons { flex-direction: column !important; }
          .cta-buttons a, .cta-buttons a[href] { width: 100% !important; text-align: center !important; padding: 16px !important; box-sizing: border-box !important; }
        }
      `}</style>
    </section>
  );
}
