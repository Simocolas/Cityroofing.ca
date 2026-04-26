'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const serviceLinks = [
  { label: 'Roof Replacement', href: '/services/roof-replacement' },
  { label: 'Roof Repair', href: '/services/roof-repair' },
  { label: 'Siding', href: '/services/siding' },
  { label: 'Commercial Roofing', href: '/services/commercial' },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

function SocialIcon({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <a
      href="#"
      aria-label={label}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        border: '1px solid #2A2A2A',
        color: 'var(--color-text-muted)',
        textDecoration: 'none',
        transition: 'border-color 150ms ease-out, color 150ms ease-out',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-accent)';
        e.currentTarget.style.color = 'var(--color-accent)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#2A2A2A';
        e.currentTarget.style.color = 'var(--color-text-muted)';
      }}
    >
      {children}
    </a>
  );
}

function AccordionSection({ title, open, onToggle, children }: { title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="footer-accordion-section">
      <button
        onClick={onToggle}
        className="footer-accordion-header"
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0',
        }}
      >
        <h4
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '2px',
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          {title}
        </h4>
        <span style={{ color: 'var(--color-text-muted)', fontSize: '18px', lineHeight: 1, transition: 'transform 200ms ease', transform: open ? 'rotate(180deg)' : 'none' }}>
          ›
        </span>
      </button>
      <div
        style={{
          overflow: 'hidden',
          maxHeight: open ? '400px' : '0',
          transition: 'max-height 250ms ease-out',
          marginTop: open ? '16px' : '0',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (key: string) => setOpenSection((prev) => (prev === key ? null : key));

  return (
    <footer style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
      <div
        className="footer-grid"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '64px 24px 40px',
        }}
      >
        {/* Col 1: Logo + tagline + socials */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Image
            src="/images/logo-transparent.png"
            alt="City Roofing & Exteriors"
            width={120}
            height={80}
            style={{ objectFit: 'contain', objectPosition: 'left', width: 'auto', height: '80px' }}
          />
          <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', lineHeight: '1.6', maxWidth: '220px' }}>
            Roofing and exterior work in Calgary since 2009.
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <SocialIcon label="Facebook">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="Instagram">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </SocialIcon>
            <SocialIcon label="Google">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </SocialIcon>
          </div>
        </div>

        {/* Col 2: Services */}
        <div className="footer-col-desktop">
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '2px',
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            Services
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{ color: 'var(--color-text-primary)', textDecoration: 'none', fontSize: '15px', transition: 'color 150ms ease-out' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 2 mobile: accordion */}
        <div className="footer-col-mobile">
          <AccordionSection title="Services" open={openSection === 'services'} onToggle={() => toggle('services')}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ color: 'var(--color-text-primary)', textDecoration: 'none', fontSize: '15px' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionSection>
        </div>

        {/* Col 3: Company */}
        <div className="footer-col-desktop">
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '2px',
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            Company
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{ color: 'var(--color-text-primary)', textDecoration: 'none', fontSize: '15px', transition: 'color 150ms ease-out' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 mobile: accordion */}
        <div className="footer-col-mobile">
          <AccordionSection title="Company" open={openSection === 'company'} onToggle={() => toggle('company')}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ color: 'var(--color-text-primary)', textDecoration: 'none', fontSize: '15px' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionSection>
        </div>

        {/* Col 4: Contact info */}
        <div className="footer-col-contact">
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '2px',
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            Contact
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <svg width="16" height="16" fill="none" stroke="var(--color-accent)" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: '2px' }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <p style={{ color: 'var(--color-text-primary)', fontSize: '14px', lineHeight: '1.5' }}>
                3935 3a St NE Unit #3<br />Calgary, AB T2E 6S7
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <svg width="16" height="16" fill="none" stroke="var(--color-accent)" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.06 2.9 2 2 0 012.03 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <a href="tel:403-608-9933" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                403-608-9933
              </a>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <svg width="16" height="16" fill="none" stroke="var(--color-accent)" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: '2px' }}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', lineHeight: '1.5' }}>
                Mon–Fri: 8:00 AM – 5:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid var(--color-border)',
          padding: '20px 24px',
          textAlign: 'center',
        }}
      >
        <p style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>
          © 2025 City Roofing & Exteriors | Calgary, Alberta
        </p>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 48px;
        }
        .footer-col-mobile { display: none; }
        .footer-accordion-section {
          border-top: 1px solid var(--color-border);
          padding: 16px 0;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
            padding-bottom: 64px !important;
          }
          .footer-col-desktop { display: none !important; }
          .footer-col-mobile { display: block !important; }
          .footer-col-contact { border-top: 1px solid var(--color-border); padding-top: 24px; }
          .footer-col-contact h4 { margin-bottom: 16px; }
        }
        @media (min-width: 769px) {
          .footer-grid { display: grid !important; }
          .footer-col-mobile { display: none !important; }
          .footer-col-desktop { display: block !important; }
        }
      `}</style>
    </footer>
  );
}
