'use client';

import { useEffect, useRef, useState } from 'react';

interface StatConfig {
  target: number;
  decimals: number;
  prefix: string;
  suffix: string;
  comma: boolean;
  duration: number;
  delay: number;
  label: string;
}

const stats: StatConfig[] = [
  { target: 4.8,  decimals: 1, prefix: '',  suffix: '★',  comma: false, duration: 1000, delay: 0,   label: 'Google Rating' },
  { target: 158,  decimals: 0, prefix: '',  suffix: '+',  comma: false, duration: 1100, delay: 120, label: 'Verified Reviews' },
  { target: 15,   decimals: 0, prefix: '',  suffix: '+',  comma: false, duration: 900,  delay: 200, label: 'Years in Calgary' },
  { target: 3000, decimals: 0, prefix: '',  suffix: '+',  comma: true,  duration: 1200, delay: 60,  label: 'Projects Completed' },
  { target: 3,    decimals: 0, prefix: '$', suffix: 'M+', comma: false, duration: 950,  delay: 280, label: 'Commercial Experience' },
];

const certs = ['SECOR Certified', 'WCB Alberta', 'BBB Accredited'];

function formatValue(val: number, config: StatConfig): string {
  let numStr: string;
  if (config.decimals > 0) {
    numStr = val.toFixed(config.decimals);
  } else {
    const rounded = Math.round(val);
    numStr = config.comma ? rounded.toLocaleString('en-CA') : String(rounded);
  }
  return `${config.prefix}${numStr}${config.suffix}`;
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function TrustBar() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>(Array(stats.length).fill(null));
  const hasAnimated = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setVisible(true);
          observer.disconnect();

          stats.forEach((config, i) => {
            const el = numRefs.current[i];
            if (!el) return;

            const startTime = performance.now() + config.delay;

            const tick = (now: number) => {
              if (now < startTime) {
                el.textContent = formatValue(0, config);
                requestAnimationFrame(tick);
                return;
              }
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / config.duration, 1);
              el.textContent = formatValue(easeOut(progress) * config.target, config);
              if (progress < 1) {
                requestAnimationFrame(tick);
              } else {
                // Ensure exact final value
                el.textContent = formatValue(config.target, config);
              }
            };

            requestAnimationFrame(tick);
          });
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        background: 'var(--color-cream-dark)',
        borderBottom: '1px solid var(--color-border-light)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={sectionRef}
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '48px 48px 36px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          gap: '24px',
        }}
      >
        {/* Stats row */}
        <div className="trust-stats-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                className="trust-stat-item"
                style={{
                  textAlign: 'center',
                  padding: '0 40px',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(12px)',
                  transition: visible
                    ? `opacity 400ms ease-out ${i * 80}ms, transform 400ms ease-out ${i * 80}ms`
                    : 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Montserrat', var(--font-display)",
                    fontWeight: 900,
                    fontSize: 'clamp(32px, 3.5vw, 56px)',
                    color: 'var(--color-primary)',
                    lineHeight: 1,
                    marginBottom: '8px',
                    letterSpacing: '-0.5px',
                  }}
                >
                  <span
                    ref={(el) => { numRefs.current[i] = el; }}
                  >
                    {formatValue(0, stat)}
                  </span>
                </div>
                <div
                  style={{
                    color: 'var(--color-text-dark-muted)',
                    fontSize: '11px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                  }}
                >
                  {stat.label}
                </div>
              </div>
              {i < stats.length - 1 && (
                <div
                  className="trust-separator"
                  style={{ width: '1px', height: '60px', backgroundColor: 'var(--color-border-light)', flexShrink: 0, alignSelf: 'center' }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '12px',
            color: 'var(--color-primary)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            opacity: visible ? 1 : 0,
            transition: visible ? 'opacity 400ms ease-out 500ms' : 'none',
          }}
        >
          {certs.join(' · ')}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .trust-stats-row {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            width: 100% !important;
            gap: 0 !important;
          }
          .trust-stat-item {
            padding: 16px !important;
            border-bottom: 1px solid var(--color-border-light);
          }
          .trust-separator { display: none !important; }
        }
      `}</style>
    </section>
  );
}
