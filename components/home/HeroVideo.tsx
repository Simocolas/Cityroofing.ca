'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const BULLETS = [
  'Storm damage, leaks, and aging roofs assessed clearly',
  'Proper ventilation, underlayment, flashing, and drainage details',
  'Residential, multi-family, and commercial roofing by experienced crews',
];

export default function HeroVideo() {
  return (
    <section className="hero-section">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hero-video"
      >
        <source src="/videos/hero.webm" type="video/webm" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hero-content"
      >
        {/* Eyebrow */}
        <motion.div variants={itemVariants} className="hero-eyebrow-row">
          <span className="hero-eyebrow-line" />
          <p className="hero-eyebrow">
            Calgary Roofing &amp; Exteriors &nbsp;·&nbsp; Since 2009
          </p>
          <span className="hero-eyebrow-line" />
        </motion.div>

        {/* H1 */}
        <motion.h1 variants={itemVariants} className="hero-h1">
          Calgary Roofing<br />
          You Can Actually Trust.
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={itemVariants} className="hero-subtitle">
          Roof replacement and repair systems designed for Calgary weather —
          not just another layer of shingles.
        </motion.p>

        {/* Bullet points */}
        <motion.ul variants={itemVariants} className="hero-bullets">
          {BULLETS.map((b) => (
            <li key={b} className="hero-bullet">
              <span className="hero-bullet-tick" aria-hidden="true" />
              {b}
            </li>
          ))}
        </motion.ul>

        {/* CTA row */}
        <motion.div variants={itemVariants} className="hero-cta-row">
          <Link
            href="/contact"
            className="hero-btn-primary"
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-primary)')}
          >
            Request a Roof Assessment
          </Link>
          <Link
            href="/services"
            className="hero-btn-secondary"
          >
            View Roofing Services
          </Link>
        </motion.div>
      </motion.div>

      <style>{`
        .hero-section {
          position: relative;
          width: 100%;
          height: 95vh;
          min-height: 640px;
          overflow: hidden;
          display: flex;
          align-items: center;
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
            105deg,
            rgba(0,0,0,0.72) 0%,
            rgba(0,0,0,0.52) 55%,
            rgba(0,0,0,0.28) 100%
          );
          z-index: 5;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0 7vw;
          max-width: 860px;
          width: 100%;
        }

        .hero-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 22px;
        }

        .hero-eyebrow-line {
          display: block;
          width: 28px;
          height: 1px;
          background-color: var(--color-accent);
          flex-shrink: 0;
        }

        .hero-eyebrow {
          font-size: 11px;
          letter-spacing: 3.5px;
          color: var(--color-accent);
          font-family: var(--font-display);
          font-weight: 700;
          text-transform: uppercase;
          margin: 0;
          white-space: nowrap;
        }

        .hero-h1 {
          font-size: clamp(44px, 7vw, 88px);
          font-weight: 900;
          font-family: var(--font-display);
          line-height: 1.02;
          color: #F9F7F2;
          margin: 0 0 22px 0;
          text-shadow: 0 2px 24px rgba(0,0,0,0.45);
        }

        .hero-subtitle {
          color: rgba(249,247,242,0.82);
          font-size: 17px;
          font-weight: 400;
          line-height: 1.65;
          margin: 0 0 28px 0;
          max-width: 540px;
        }

        .hero-bullets {
          list-style: none;
          margin: 0 0 36px 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .hero-bullet {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: rgba(249,247,242,0.88);
          font-size: 14px;
          line-height: 1.5;
        }

        .hero-bullet-tick {
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--color-accent);
          flex-shrink: 0;
          margin-top: 6px;
        }

        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .hero-btn-primary {
          background-color: var(--color-primary);
          color: #F9F7F2;
          padding: 15px 32px;
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
          color: rgba(249,247,242,0.9);
          text-decoration: none;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.5px;
          border-bottom: 1px solid rgba(249,247,242,0.4);
          padding-bottom: 2px;
          transition: color 150ms ease-out, border-color 150ms ease-out;
          white-space: nowrap;
        }

        .hero-btn-secondary:hover {
          color: #F9F7F2;
          border-color: rgba(249,247,242,0.9);
        }

        @media (max-width: 768px) {
          .hero-section { height: 100svh; align-items: flex-end; padding-bottom: 10vh; }
          .hero-content { padding: 0 22px; max-width: 100%; }
          .hero-eyebrow { font-size: 9px; letter-spacing: 2px; }
          .hero-eyebrow-line { width: 18px; }
          .hero-h1 { font-size: 40px; margin-bottom: 16px; }
          .hero-subtitle { font-size: 15px; max-width: 100%; margin-bottom: 20px; }
          .hero-bullets { gap: 8px; margin-bottom: 28px; }
          .hero-bullet { font-size: 13px; }
          .hero-btn-primary { width: 100%; text-align: center; font-size: 15px; padding: 15px 24px; }
          .hero-btn-secondary { font-size: 13px; }
        }
      `}</style>
    </section>
  );
}
