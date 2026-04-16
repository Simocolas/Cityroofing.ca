'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

const services = [
  {
    href: '/services/roof-replacement',
    title: 'Roof Replacement',
    description: 'Complete re-roofing with premium materials — residential and commercial across all Calgary quadrants.',
    image: '/images/4/residential.webp',
    bgPosition: 'center 40%',
  },
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
  {
    href: '/services/commercial',
    title: 'Commercial Roofing',
    image: '/images/4/Commerical.webp',
    bgPosition: 'center 40%',
  },
];

type Service = typeof services[number];

const OVERLAY_DEFAULT = 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.0) 100%)';
const OVERLAY_HOVER   = 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.05) 100%)';

const MotionLink = motion(Link);

function LargeCard({ service }: { service: Service }) {
  const [hovered, setHovered] = useState(false);

  return (
    <MotionLink
      href={service.href}
      className="service-card-large"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
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
      }}
    >
      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: hovered ? OVERLAY_HOVER : OVERLAY_DEFAULT,
          transition: 'background 300ms ease',
          zIndex: 1,
        }}
      />

      {/* Text */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px', zIndex: 2 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: '#fff', marginBottom: '10px', lineHeight: 1.2 }}>
          {service.title}
        </h3>
        <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', marginBottom: '16px' }}>
          {service.description}
        </p>
        <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', display: 'inline-block', transform: hovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 200ms ease' }}>
          Explore →
        </span>
      </div>
    </MotionLink>
  );
}

function SmallCard({ service, index }: { service: Service; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <MotionLink
      href={service.href}
      className="service-card-small"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: (index + 1) * 0.1, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
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
      }}
    >
      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: hovered ? OVERLAY_HOVER : OVERLAY_DEFAULT,
          transition: 'background 300ms ease',
          zIndex: 1,
        }}
      />

      {/* Text */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px', zIndex: 2 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', color: '#fff', marginBottom: '8px', lineHeight: 1.2 }}>
          {service.title}
        </h3>
        <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', display: 'inline-block', transform: hovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 200ms ease' }}>
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

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '16px' }}>
            What We Do
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 4vw, 48px)', color: 'var(--color-text-dark)' }}>
            Calgary Roofing & Exterior Services
          </h2>
        </div>

        {/* Card layout */}
        <div
          className="services-layout"
          style={{
            display: 'flex',
            gap: '4px',
            height: '520px',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {/* Large card — left, 50% */}
          <LargeCard service={services[0]} />

          {/* Three stacked cards — right, 50% */}
          <div
            className="services-right"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {services.slice(1).map((service, i) => (
              <SmallCard key={service.href} service={service} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-layout {
            flex-direction: column !important;
            height: auto !important;
            gap: 12px !important;
          }
          .services-right {
            flex: none !important;
            gap: 12px !important;
          }
          .service-card-large,
          .service-card-small {
            height: 260px !important;
            flex: none !important;
            width: 100% !important;
          }
          .service-card-large h3 { font-size: 20px !important; }
          .service-card-small h3 { font-size: 20px !important; }
          .service-card-large p,
          .service-card-small p { font-size: 13px !important; }
        }
      `}</style>
    </section>
  );
}
