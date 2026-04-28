'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const BULLETS = [
  'Storm damage, leaks, and aging roofs assessed clearly',
  'Ventilation, underlayment, flashing, and drainage done right',
  'Residential, multi-family, and commercial — in-house crews only',
];

export default function HeroVideo() {
  return (
    <section className="hero-section">
      <video autoPlay loop muted playsInline className="hero-video">
        <source src="/videos/hero.webm" type="video/webm" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <div className="hero-overlay" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hero-content"
      >
        {/* Eyebrow */}
        <motion.p variants={itemVariants} className="hero-eyebrow">
          Calgary Roofing &amp; Exteriors &nbsp;·&nbsp; Since 2009
        </motion.p>

        {/* Warranty badge — primary hook */}
        <motion.div variants={itemVariants} className="hero-warranty">
          <span className="hero-warranty-icon">✦</span>
          10-Year Workmanship Warranty
          <span className="hero-warranty-icon">✦</span>
        </motion.div>

        {/* H1 */}
        <motion.h1 variants={itemVariants} className="hero-h1">
          Calgary Roofing<br />You Can Actually Trust.
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={itemVariants} className="hero-subtitle">
          Roof replacement and repair systems designed for Calgary weather —
          not just another layer of shingles.
        </motion.p>

        {/* CTA row */}
        <motion.div variants={itemVariants} className="hero-cta-row">
          <Link
            href="/contact"
            className="hero-btn-primary"
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a02020')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-primary)')}
          >
            Request a Roof Assessment
          </Link>
          <Link href="/services" className="hero-btn-secondary">
            View Roofing Services
          </Link>
        </motion.div>

        {/* Bullets — supporting detail below CTAs */}
        <motion.ul variants={itemVariants} className="hero-bullets">
          {BULLETS.map((b) => (
            <li key={b} className="hero-bullet">
              <span className="hero-bullet-dot" aria-hidden="true" />
              {b}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <style>{`
        .hero-section {
          position: relative;
          width: 100%;
          height: 95vh;
          min-height: 660px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-video {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.30) 0%,
            rgba(0,0,0,0.60) 40%,
            rgba(0,0,0,0.75) 100%
          );
          z-index: 5;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 24px;
          max-width: 820px;
          width: 100%;
        }

        .hero-eyebrow {
          font-size: 11px;
          letter-spacing: 3px;
          color: rgba(249,247,242,0.6);
          font-family: var(--font-display);
          font-weight: 600;
          text-transform: uppercase;
          margin: 0 0 20px 0;
        }

        .hero-warranty {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--color-primary);
          color: #F9F7F2;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 10px 22px;
          border-radius: 2px;
          margin-bottom: 28px;
        }

        .hero-warranty-icon {
          font-size: 9px;
          opacity: 0.8;
        }

        .hero-h1 {
          font-size: clamp(42px, 6.5vw, 80px);
          font-weight: 900;
          font-family: var(--font-display);
          line-height: 1.05;
          color: #F9F7F2;
          margin: 0 0 20px 0;
          text-shadow: 0 2px 24px rgba(0,0,0,0.4);
        }

        .hero-subtitle {
          color: rgba(249,247,242,0.78);
          font-size: 17px;
          font-weight: 400;
          line-height: 1.65;
          margin: 0 0 32px 0;
          max-width: 580px;
        }

        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 36px;
        }

        .hero-btn-primary {
          background-color: var(--color-primary);
          color: #F9F7F2;
          padding: 15px 34px;
          border-radius: 4px;
          text-decoration: none;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.5px;
          transition: background-color 150ms ease-out;
          display: inline-block;
          white-space: nowrap;
        }

        .hero-btn-secondary {
          color: rgba(249,247,242,0.88);
          text-decoration: none;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.5px;
          border-bottom: 1px solid rgba(249,247,242,0.35);
          padding-bottom: 2px;
          transition: color 150ms, border-color 150ms;
          white-space: nowrap;
        }

        .hero-btn-secondary:hover {
          color: #F9F7F2;
          border-color: rgba(249,247,242,0.85);
        }

        .hero-bullets {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-top: 1px solid rgba(249,247,242,0.12);
          padding-top: 24px;
          width: 100%;
          max-width: 560px;
        }

        .hero-bullet {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: rgba(249,247,242,0.65);
          font-size: 13px;
          line-height: 1.5;
          text-align: left;
        }

        .hero-bullet-dot {
          display: block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--color-accent);
          flex-shrink: 0;
          margin-top: 5px;
        }

        @media (max-width: 768px) {
          .hero-section { height: 100svh; min-height: 600px; }
          .hero-h1 { font-size: 38px; }
          .hero-subtitle { font-size: 15px; }
          .hero-warranty { font-size: 11px; padding: 9px 16px; }
          .hero-btn-primary { width: 100%; max-width: 320px; text-align: center; font-size: 15px; }
          .hero-cta-row { gap: 16px; }
          .hero-bullets { max-width: 100%; }
        }
      `}</style>
    </section>
  );
}
