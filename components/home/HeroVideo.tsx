'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function HeroVideo() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/videos/hero.webm" type="video/webm" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay — increased opacity for better text contrast */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.70) 100%)',
          zIndex: 5,
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hero-content"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 48px',
          maxWidth: '1400px',
          width: '100%',
        }}
      >
        {/* Label with decorative lines */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <span style={{ display: 'block', width: '30px', height: '1px', backgroundColor: 'var(--color-accent)', flexShrink: 0 }} />
          <p
            style={{
              fontSize: '12px',
              letterSpacing: '4px',
              color: 'var(--color-accent)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              textTransform: 'uppercase',
              margin: 0,
              whiteSpace: 'nowrap',
            }}
          >
            Calgary Roofing &amp; Exteriors — Since 2009
          </p>
          <span style={{ display: 'block', width: '30px', height: '1px', backgroundColor: 'var(--color-accent)', flexShrink: 0 }} />
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 900,
            fontFamily: 'var(--font-display)',
            lineHeight: 1.0,
            color: '#F9F7F2',
            marginBottom: '24px',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}
        >
          Calgary&rsquo;s Trusted<br />Roofing Experts
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="hero-subtitle"
          style={{
            color: 'rgba(249,247,242,0.8)',
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: 1.6,
            marginBottom: '40px',
            maxWidth: '560px',
            textAlign: 'center',
          }}
        >
          Roof replacement, repairs, siding &amp; commercial projects.<br />
          158 five-star reviews · In-house crew · Free estimates.
        </motion.p>

        {/* CTA */}
        <motion.div variants={itemVariants}>
          <Link
            href="/contact"
            className="hero-btn-primary"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: '#F9F7F2',
              padding: '16px 36px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '15px',
              letterSpacing: '0.5px',
              transition: 'background-color 150ms ease-out',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-primary)')}
          >
            Get Free Estimate
          </Link>
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .hero-content { padding: 0 20px !important; }
          .hero-content h1 { font-size: 42px !important; line-height: 1.1 !important; }
          .hero-subtitle { font-size: 15px !important; max-width: 300px !important; margin-bottom: 32px !important; }
          .hero-btn-primary { width: 100% !important; max-width: 320px !important; text-align: center !important; font-size: 16px !important; padding: 16px !important; }
        }
      `}</style>
    </section>
  );
}
