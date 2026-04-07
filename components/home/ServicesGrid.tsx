'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const services = [
  {
    href: '/services/roof-replacement',
    title: 'Roof Replacement',
    description: 'Complete re-roofing with premium materials',
    icon: (
      <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: '/services/roof-repair',
    title: 'Roof Repair & Emergency',
    description: 'Fast response for leaks and storm damage',
    icon: (
      <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    href: '/services/siding',
    title: 'Siding & Exteriors',
    description: 'Vinyl, Hardie board and metal siding',
    icon: (
      <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="9" y1="3" x2="9" y2="9" />
        <line x1="15" y1="15" x2="15" y2="21" />
      </svg>
    ),
  },
  {
    href: '/services/commercial',
    title: 'Commercial Roofing',
    description: 'Large-scale projects delivered on time',
    icon: (
      <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-4h6v4" />
        <rect x="10" y="10" width="4" height="4" />
      </svg>
    ),
  },
];

function ServiceCard({ service, delay }: { service: typeof services[0]; delay: number }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms`,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderLeft: hovered ? '3px solid var(--color-primary)' : '3px solid transparent',
          borderRadius: '6px',
          padding: '40px 36px',
          minHeight: '320px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'border-left-color 300ms ease-out, transform 300ms ease-out, box-shadow 300ms ease-out',
          boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.4)' : 'none',
          cursor: 'pointer',
        }}
      >
        <div style={{ color: hovered ? 'var(--color-accent)' : 'var(--color-text-muted)', transition: 'color 300ms ease-out' }}>
          {service.icon}
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '20px',
            color: 'var(--color-text-primary)',
          }}
        >
          {service.title}
        </h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '15px', lineHeight: 1.6, flex: 1 }}>
          {service.description}
        </p>
        <Link
          href={service.href}
          style={{
            color: 'var(--color-accent)',
            textDecoration: 'none',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '14px',
            letterSpacing: '0.5px',
            transition: 'letter-spacing 150ms ease-out',
          }}
        >
          Explore →
        </Link>
      </div>
    </div>
  );
}

export default function ServicesGrid() {
  return (
    <section style={{ backgroundColor: 'var(--color-base)', padding: '96px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '3px',
              color: 'var(--color-accent)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            What We Do
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(32px, 4vw, 48px)',
              color: 'var(--color-text-primary)',
            }}
          >
            Calgary Roofing & Exterior Services
          </h2>
        </div>
        <div className="services-grid">
          {services.map((service, i) => (
            <ServiceCard key={service.href} service={service} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
