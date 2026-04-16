'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface AccordionItem {
  title: string;
  bullets: string[];
}

interface AccordionProps {
  items: AccordionItem[];
  heading?: string;
}

export default function Accordion({ items, heading = 'Details & Options' }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section style={{ backgroundColor: '#FFFFFF', padding: '80px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(24px, 3vw, 36px)',
            color: 'var(--color-text-dark)',
            marginBottom: '40px',
          }}
        >
          {heading}
        </h2>

        <div>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                borderTop: '1px solid var(--color-border-light)',
                ...(i === items.length - 1 ? { borderBottom: '1px solid var(--color-border-light)' } : {}),
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  gap: '16px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '17px',
                    color: 'var(--color-text-dark)',
                  }}
                >
                  {item.title}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '24px',
                    color: 'var(--color-primary)',
                    flexShrink: 0,
                    lineHeight: 1,
                    transition: 'transform 300ms ease',
                    display: 'inline-block',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  +
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <ul
                      style={{
                        listStyle: 'none',
                        paddingBottom: '28px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                      }}
                    >
                      {item.bullets.map((bullet, j) => (
                        <li
                          key={j}
                          style={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'flex-start',
                            color: 'var(--color-text-dark-muted)',
                            fontSize: '15px',
                            lineHeight: 1.7,
                          }}
                        >
                          <span style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '3px' }}>✓</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
