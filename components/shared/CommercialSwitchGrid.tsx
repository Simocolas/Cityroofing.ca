'use client';

import { useState } from 'react';

type SwitchGridItem = {
  title: string;
  text: string;
};

type CommercialSwitchGridProps = {
  items: SwitchGridItem[];
  numberStyle?: 'circle' | 'label';
};

export default function CommercialSwitchGrid({ items, numberStyle = 'circle' }: CommercialSwitchGridProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      className="commercial-card-grid commercial-switch-grid"
      onMouseLeave={() => setActiveIndex(0)}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}
    >
      {items.map((item, index) => {
        const active = activeIndex === index;

        return (
          <article
            key={item.title}
            className={`commercial-interactive-card commercial-accent-card commercial-switch-card ${active ? 'is-active' : ''}`}
            tabIndex={0}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            style={{
              border: '1px solid var(--color-border-light)',
              borderRadius: '6px',
              padding: '24px',
              background: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(0,0,0,0.045)',
              minHeight: numberStyle === 'label' ? '170px' : undefined,
            }}
          >
            {numberStyle === 'circle' ? (
              <div
                className="commercial-card-number"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '13px',
                  marginBottom: '16px',
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>
            ) : (
              <p
                className="commercial-card-index"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </p>
            )}

            <h3 className="commercial-card-title" style={{ fontSize: '20px', lineHeight: 1.2, marginBottom: '10px' }}>
              {item.title}
            </h3>
            <p className="commercial-card-copy" style={{ fontSize: '15px', lineHeight: 1.65 }}>
              {item.text}
            </p>
          </article>
        );
      })}
    </div>
  );
}
