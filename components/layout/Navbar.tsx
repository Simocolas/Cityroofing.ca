'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

function RooftopIndicator({ visible, spotX, id }: { visible: boolean; spotX: number; id: string }) {
  const cx = Math.max(0, Math.min(60, spotX)) / 60;
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 2 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: '-36px',
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            filter: 'drop-shadow(0 0 3px rgba(139,30,30,0.55))',
          }}
        >
          <svg width="60" height="28" viewBox="0 0 60 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id={`spot-${id}`} cx={cx} cy="0.3" r="0.65" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="rgba(179,32,32,0.45)" />
                <stop offset="100%" stopColor="rgba(139,30,30,0)" />
              </radialGradient>
            </defs>
            {/* Base fill */}
            <path d="M 0 14 L 30 0 L 60 14 L 60 28 L 0 28 Z" fill="rgba(139,30,30,0.08)" />
            {/* Spotlight overlay */}
            <path d="M 0 14 L 30 0 L 60 14 L 60 28 L 0 28 Z" fill={`url(#spot-${id})`} />
            {/* Stroke */}
            <path d="M 0 14 L 30 0 L 60 14 L 60 28 L 0 28 Z" stroke="#8B1E1E" strokeWidth="1.2" fill="none" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'News', href: '/news' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredSpotX, setHoveredSpotX] = useState(30);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: scrolled ? '#1A1A1A' : 'transparent',
          transition: 'background-color 300ms ease-out',
        }}
      >
        <nav
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 48px',
            height: '90px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            overflow: 'visible',
          }}
        >
          {/* Logo + brand */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Image
              src="/images/logo-transparent.png"
              alt="City Roofing & Exteriors"
              width={120}
              height={90}
              style={{ objectFit: 'contain', objectPosition: 'center' }}
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <ul
            style={{
              display: 'flex',
              listStyle: 'none',
              gap: '40px',
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isHovered = hoveredItem === link.href;
              const showBorder = hoveredItem !== null ? isHovered : isActive;
              return (
                <li
                  key={link.href}
                  style={{ position: 'relative' }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHoveredSpotX(e.clientX - rect.left - (rect.width - 60) / 2);
                  }}
                >
                  <RooftopIndicator
                    visible={isHovered || isActive}
                    spotX={isHovered ? hoveredSpotX : 30}
                    id={link.href.replace('/', '')}
                  />
                  <Link
                    href={link.href}
                    className="nav-link"
                    onMouseEnter={() => setHoveredItem(link.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                      borderColor: showBorder
                        ? isHovered ? 'rgba(179,32,32,0.6)' : 'rgba(179,32,32,0.4)'
                        : 'transparent',
                      backgroundImage: isHovered
                        ? 'linear-gradient(105deg, transparent 40%, rgba(179,32,32,0.15) 50%, transparent 60%)'
                        : 'none',
                      backgroundColor: !isHovered && showBorder ? 'rgba(179,32,32,0.08)' : 'transparent',
                      backgroundSize: '200% 100%',
                      animation: isHovered ? 'shimmer 600ms ease-out forwards' : 'none',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right: phone + CTA */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', flexShrink: 0, whiteSpace: 'nowrap' }} className="desktop-nav">
            <a
              href="tel:403-608-9933"
              style={{
                color: '#F9F7F2',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '17px',
                letterSpacing: '0.5px',
                transition: 'opacity 150ms ease-out',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              403-608-9933
            </a>
            <Link
              href="/contact"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: '#fff',
                padding: '10px 20px',
                whiteSpace: 'nowrap',
                borderRadius: '4px',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '14px',
                letterSpacing: '0.5px',
                transition: 'background-color 150ms ease-out',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-primary)')}
            >
              Get Estimate
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger"
            aria-label="Toggle menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            <span style={{ display: 'block', width: '24px', height: '2px', backgroundColor: '#F9F7F2', transition: 'transform 300ms ease-out, opacity 300ms ease-out', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: '24px', height: '2px', backgroundColor: '#F9F7F2', transition: 'opacity 300ms ease-out', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '24px', height: '2px', backgroundColor: '#F9F7F2', transition: 'transform 300ms ease-out, opacity 300ms ease-out', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          backgroundColor: '#1A1A1A',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="mobile-menu"
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: isActive ? 'var(--color-accent)' : '#F9F7F2',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '28px',
                letterSpacing: '1px',
                transition: 'color 150ms ease-out',
                borderLeft: isActive ? '3px solid var(--color-accent)' : '3px solid transparent',
                paddingLeft: '16px',
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <style>{`
        @keyframes shimmer {
          from { background-position: 200% center; }
          to   { background-position: -200% center; }
        }
        .nav-link {
          color: #F9F7F2;
          text-decoration: none;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 18px;
          letter-spacing: 0.3px;
          border: 1px solid transparent;
          border-radius: 6px;
          padding: 6px 14px;
          background-color: transparent;
          background-image: none;
          background-size: 200% 100%;
          transition: border-color 200ms ease-out;
          display: inline-block;
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
