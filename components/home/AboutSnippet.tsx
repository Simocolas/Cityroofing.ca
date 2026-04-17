'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function AboutSnippet() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ backgroundColor: 'var(--color-cream)', padding: '96px 24px' }}>
      <div
        ref={ref}
        className="about-grid"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '64px',
          alignItems: 'center',
        }}
      >
        {/* Left: video */}
        <div
          style={{
            width: '100%',
            aspectRatio: '4/3',
            borderRadius: '8px',
            overflow: 'hidden',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-24px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          >
            <source src="/videos/about.webm" type="video/webm" />
            <source src="/videos/about.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Right: text */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(24px)',
            transition: 'opacity 0.6s ease-out 0.1s, transform 0.6s ease-out 0.1s',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '2px',
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            Calgary-Based. Community-Trusted.
          </p>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(28px, 3.5vw, 40px)',
              color: 'var(--color-text-dark)',
              lineHeight: 1.2,
            }}
          >
            15 Years of Roofs That Outlast Alberta Winters
          </h2>

          <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '16px', lineHeight: 1.7 }}>
            City Roofing &amp; Exteriors was built in Calgary, rooted in the community, and trusted
            by homeowners across every quadrant of the city. What started through word of mouth has
            grown into one of Calgary&apos;s most reviewed roofing contractors.
          </p>

          <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '16px', lineHeight: 1.7 }}>
            Today we handle everything from residential shingle replacements to multi-million dollar
            commercial projects — all with the same SECOR-certified crew, WCB coverage, and
            BBB-backed accountability.
          </p>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: '32px',
              flexWrap: 'wrap',
              borderTop: '1px solid var(--color-border-light)',
              paddingTop: '24px',
              marginTop: '4px',
            }}
          >
            {[
              { display: '15+', label: 'Years in Calgary' },
              { display: '3,000+', label: 'Projects' },
              { display: '4.8★', label: 'Google Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '28px',
                    color: 'var(--color-primary)',
                    lineHeight: 1,
                    marginBottom: '4px',
                  }}
                >
                  {stat.display}
                </div>
                <div style={{ color: 'var(--color-text-dark-muted)', fontSize: '13px' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            style={{
              color: 'var(--color-primary)',
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '15px',
              transition: 'letter-spacing 150ms ease-out',
              alignSelf: 'flex-start',
            }}
          >
            Our Story →
          </Link>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
          .about-video { height: 240px !important; aspect-ratio: unset !important; }
          .about-text { padding: 24px 0 !important; }
          .about-stats div[style*="font-size: 28px"] { font-size: 28px !important; }
        }
      `}</style>
    </section>
  );
}
