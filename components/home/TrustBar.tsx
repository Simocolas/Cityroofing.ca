'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────

interface TrustItem {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

const trustItems: TrustItem[] = [
  { prefix: '★', value: 4.8,  suffix: '',   label: 'Google Rating' },
  { value: 158,               suffix: '+',  label: 'Reviews' },
  { value: 15,                suffix: '+',  label: 'Years in Calgary' },
  { value: 3000,              suffix: '+',  label: 'Projects Completed' },
  { prefix: '$', value: 3,    suffix: 'M+', label: 'Commercial Experience' },
];

const certs = ['SECOR Certified', 'WCB Alberta', 'BBB Accredited'];

// ─── Deterministic reel (avoids hydration mismatch) ───────────────────────────

function buildReel(finalDigit: string, seed: number): string[] {
  let s = seed | 0;
  function rand() {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return String((s >>> 0) % 10);
  }
  const reel: string[] = [];
  for (let i = 0; i < 20; i++) reel.push(rand());
  reel.push(finalDigit); // final digit is always at index 20
  return reel;
}

// ─── SlotDigit ────────────────────────────────────────────────────────────────

function SlotDigit({ digit, delay, started }: { digit: string; delay: number; started: boolean }) {
  const seed = (digit.charCodeAt(0) * 7919 + delay * 31) | 0;
  const reel = useMemo(() => buildReel(digit, seed), [digit, seed]);
  const finalIndex = reel.length - 1; // = 20

  return (
    <span
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        height: '1em',
        verticalAlign: 'bottom',
      }}
    >
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          transform: started ? `translateY(calc(-${finalIndex} * 1em))` : 'translateY(0)',
          transition: started
            ? `transform 1200ms cubic-bezier(0.25, 0.1, 0.1, 1.0) ${delay}ms`
            : 'none',
          willChange: 'transform',
        }}
      >
        {reel.map((d, i) => (
          <span key={i} style={{ display: 'block', height: '1em', lineHeight: 1, textAlign: 'center' }}>
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

// ─── FadeChar (non-digit characters: ★ $ . + M) ───────────────────────────────

function FadeChar({ char, started }: { char: string; started: boolean }) {
  return (
    <span
      style={{
        display: 'inline-block',
        opacity: started ? 1 : 0,
        transition: started ? 'opacity 200ms ease-out 1200ms' : 'none',
      }}
    >
      {char}
    </span>
  );
}

// ─── StatNumber ───────────────────────────────────────────────────────────────

function StatNumber({
  value,
  suffix,
  prefix,
  started,
}: {
  value: number;
  suffix: string;
  prefix?: string;
  started: boolean;
}) {
  const displayStr = `${prefix ?? ''}${value % 1 !== 0 ? value.toFixed(1) : value}${suffix}`;
  let digitIndex = 0;

  const chars = displayStr.split('').map((char) => {
    const isDigit = /[0-9]/.test(char);
    const delay = isDigit ? digitIndex++ * 50 : 0;
    return { char, isDigit, delay };
  });

  return (
    <span style={{ display: 'inline-flex', alignItems: 'flex-end' }}>
      {chars.map((c, i) =>
        c.isDigit ? (
          <SlotDigit key={i} digit={c.char} delay={c.delay} started={started} />
        ) : (
          <FadeChar key={i} char={c.char} started={started} />
        )
      )}
    </span>
  );
}

// ─── Separator ────────────────────────────────────────────────────────────────

function Separator() {
  return (
    <div
      className="trust-separator"
      style={{
        width: '1px',
        height: '60px',
        backgroundColor: 'rgba(255,255,255,0.15)',
        flexShrink: 0,
        alignSelf: 'center',
      }}
    />
  );
}

// ─── TrustBar ─────────────────────────────────────────────────────────────────

export default function TrustBar() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animating) {
          timer = setTimeout(() => setAnimating(true), 400);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { observer.disconnect(); clearTimeout(timer); };
  }, [animating]);

  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #1A1A1A 0%, #141414 100%)',
        borderBottom: '1px solid var(--color-border)',
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
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={sectionRef}
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '56px 48px 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          gap: '28px',
        }}
      >
        {/* Row 1 — 5 stats centered */}
        <div className="trust-stats-row">
          {trustItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div className="trust-stat-item" style={{ textAlign: 'center', padding: '0 40px' }}>
                {/* Number */}
                <div
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(36px, 4vw, 64px)',
                    color: '#FFFFFF',
                    lineHeight: 1,
                    marginBottom: '10px',
                  }}
                >
                  <StatNumber
                    value={item.value}
                    suffix={item.suffix}
                    prefix={item.prefix}
                    started={animating}
                  />
                </div>
                {/* Label */}
                <div
                  style={{
                    color: 'var(--color-text-muted)',
                    fontSize: '11px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    opacity: animating ? 1 : 0,
                    transition: animating ? 'opacity 300ms ease-out 1300ms' : 'none',
                  }}
                >
                  {item.label}
                </div>
              </div>
              {i < trustItems.length - 1 && <Separator />}
            </div>
          ))}
        </div>

        {/* Row 2 — certifications centered below */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '13px',
            color: 'var(--color-accent)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textShadow: '0 0 20px rgba(139,26,26,0.6)',
            opacity: animating ? 1 : 0,
            transition: animating ? 'opacity 300ms ease-out 1400ms' : 'none',
          }}
        >
          {certs.join(' · ')}
        </div>
      </div>
    </section>
  );
}
