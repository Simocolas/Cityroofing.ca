'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

function CountUp({ target, suffix, prefix, duration = 800 }: { target: number; suffix: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const isDecimal = target % 1 !== 0;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, target, duration]);

  const display = target % 1 !== 0 ? count.toFixed(1) : count;
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

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
    <section style={{ backgroundColor: 'var(--color-surface)', padding: '96px 24px' }}>
      <div
        ref={ref}
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '64px',
          alignItems: 'center',
        }}
      >
        {/* Left: image placeholder */}
        <div
          style={{
            width: '100%',
            aspectRatio: '4/3',
            backgroundColor: '#2A2A2A',
            borderRadius: '6px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-24px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p style={{ color: '#3A3A3A', fontFamily: 'var(--font-display)', fontSize: '13px', letterSpacing: '2px' }}>
            [ Project photo ]
          </p>
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
              color: 'var(--color-accent)',
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
              color: 'var(--color-text-primary)',
              lineHeight: 1.2,
            }}
          >
            15 Years of Roofs That Outlast Alberta Winters
          </h2>

          <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: 1.7 }}>
            City Roofing &amp; Exteriors was built in Calgary, rooted in the community, and trusted
            by homeowners across every quadrant of the city. What started through word of mouth has
            grown into one of Calgary&apos;s most reviewed roofing contractors.
          </p>

          <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: 1.7 }}>
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
              borderTop: '1px solid var(--color-border)',
              paddingTop: '24px',
              marginTop: '4px',
            }}
          >
            {[
              { value: 15, suffix: '+', label: 'Years', prefix: '' },
              { value: 1000, suffix: '+', label: 'Projects', prefix: '' },
              { value: 4.8, suffix: '★', label: 'Rating', prefix: '' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '28px',
                    color: 'var(--color-text-primary)',
                    lineHeight: 1,
                    marginBottom: '4px',
                  }}
                >
                  <CountUp target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            style={{
              color: 'var(--color-accent)',
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
    </section>
  );
}
