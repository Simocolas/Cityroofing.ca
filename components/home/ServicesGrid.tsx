'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

const featured = [
  {
    href: '/services/roof-replacement',
    eyebrow: 'Residential',
    title: 'Roof Replacement',
    description: 'Asphalt, metal & Class 4 impact-resistant shingles. Built for Calgary hail and -30°C winters.',
    image: '/images/4/residential.webp',
    bgPosition: 'center 40%',
  },
  {
    href: '/services/flat-roofing',
    eyebrow: 'Commercial',
    title: 'Flat Roofing',
    description: 'Torch-on, TPO and EPDM systems. Repair, replacement and inspections for warehouses, retail and multi-family.',
    image: '/images/4/Commerical.webp',
    bgPosition: 'center 40%',
  },
];

const supporting = [
  {
    href: '/services/roof-repair',
    title: 'Roof Repair & Emergency',
    image: '/images/4/repair.webp',
    bgPosition: 'center 30%',
  },
  {
    href: '/services/siding',
    title: 'Siding & Exteriors',
    image: '/images/4/siding.webp',
    bgPosition: 'center center',
  },
];

type Featured = typeof featured[number];
type Supporting = typeof supporting[number];

const OVERLAY_DEFAULT = 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.0) 100%)';
const OVERLAY_HOVER   = 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.05) 100%)';

const MotionLink = motion(Link);

function FeaturedCard({ service, index }: { service: Featured; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <MotionLink
      href={service.href}
      className="svc-featured"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ scale: 1.015 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        flex: 1,
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        backgroundImage: `url(${service.image})`,
        backgroundSize: 'cover',
        backgroundPosition: service.bgPosition,
        textDecoration: 'none',
        display: 'block',
        height: '420px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: hovered ? OVERLAY_HOVER : OVERLAY_DEFAULT,
          transition: 'background 300ms ease',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '36px', zIndex: 2 }}>
        <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>
          {service.eyebrow}
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '32px', color: '#fff', marginBottom: '14px', lineHeight: 1.1 }}>
          {service.title}
        </h3>
        <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', marginBottom: '20px', maxWidth: '480px' }}>
          {service.description}
        </p>
        <span style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', display: 'inline-block', transform: hovered ? 'translateX(6px)' : 'translateX(0)', transition: 'transform 200ms ease', borderBottom: '2px solid var(--color-accent)', paddingBottom: '4px' }}>
          Explore →
        </span>
      </div>
    </MotionLink>
  );
}

function SupportingCard({ service, index }: { service: Supporting; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <MotionLink
      href={service.href}
      className="svc-supporting"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
      whileHover={{ scale: 1.015 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        flex: 1,
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        backgroundImage: `url(${service.image})`,
        backgroundSize: 'cover',
        backgroundPosition: service.bgPosition,
        textDecoration: 'none',
        display: 'block',
        height: '240px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: hovered ? OVERLAY_HOVER : OVERLAY_DEFAULT,
          transition: 'background 300ms ease',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 28px', zIndex: 2 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: '#fff', marginBottom: '10px', lineHeight: 1.2 }}>
          {service.title}
        </h3>
        <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', display: 'inline-block', transform: hovered ? 'translateX(6px)' : 'translateX(0)', transition: 'transform 200ms ease' }}>
          Explore →
        </span>
      </div>
    </MotionLink>
  );
}

export default function ServicesGrid() {
  return (
    <section style={{ backgroundColor: 'var(--color-cream)', padding: '96px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '16px' }}>
            What We Do
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 4vw, 48px)', color: 'var(--color-text-dark)' }}>
            Calgary Roofing & Exterior Services
          </h2>
        </div>

        {/* Top row — two big featured cards */}
        <div className="svc-row svc-row-featured" style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
          {featured.map((service, i) => (
            <FeaturedCard key={service.href} service={service} index={i} />
          ))}
        </div>

        {/* Bottom row — two smaller supporting cards */}
        <div className="svc-row svc-row-supporting" style={{ display: 'flex', gap: '12px' }}>
          {supporting.map((service, i) => (
            <SupportingCard key={service.href} service={service} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .svc-row-featured,
          .svc-row-supporting {
            flex-direction: column !important;
          }
          .svc-featured { height: 320px !important; }
          .svc-supporting { height: 200px !important; }
        }
      `}</style>
    </section>
  );
}
