'use client';

import { useState } from 'react';
import Image from 'next/image';
import ServiceCTA from '@/components/shared/ServiceCTA';
import projectsData from '@/data/projects.json';

type FilterTab = 'All' | 'Residential' | 'Commercial' | 'Siding' | 'Repair';
const filterTabs: FilterTab[] = ['All', 'Residential', 'Commercial', 'Siding', 'Repair'];

export default function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');

  const filtered =
    activeFilter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter.toLowerCase());

  return (
    <div style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh', paddingTop: '90px' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', padding: '56px 24px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--color-accent)', fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '16px' }}>
            Our Work
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(36px, 5vw, 60px)', color: 'var(--color-text-primary)', lineHeight: 1.1, marginBottom: '36px' }}>
            Our Work Across Calgary
          </h1>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderBottom: activeFilter === tab ? '2px solid var(--color-accent)' : '2px solid transparent',
                  backgroundColor: 'transparent',
                  color: activeFilter === tab ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: activeFilter === tab ? 700 : 500,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'color 150ms ease-out, border-color 150ms ease-out',
                  letterSpacing: '0.5px',
                  marginBottom: '-1px',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Red divider */}
      <div style={{ height: '4px', backgroundColor: 'var(--color-primary)', width: '100%' }} />

      {/* Grid — cream zone */}
      <div style={{ backgroundColor: 'var(--color-cream)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {filtered.map((project) => {
            const imgSrc = project.afterImage
              ? (project.afterImage.startsWith('/') ? project.afterImage : `/images/projects/${project.afterImage}`)
              : null;

            return (
              <div
                key={project.id}
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '6px', aspectRatio: '4/3', position: 'relative', overflow: 'hidden' }}
                className="project-card"
              >
                {imgSrc ? (
                  <Image src={imgSrc} alt={project.title} fill style={{ objectFit: 'cover' }} />
                ) : (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '20px' }}>
                    <span style={{ fontSize: '32px', opacity: 0.12 }}>🏠</span>
                    <p style={{ color: '#3A3A3A', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', textAlign: 'center' }}>
                      {project.title}
                    </p>
                  </div>
                )}

                {/* Gradient */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 100%)' }} />

                {/* Category tag */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(139,26,26,0.9)', color: '#fff', padding: '4px 10px', borderRadius: '3px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', zIndex: 2 }}>
                  {project.category}
                </div>

                {/* Title + location */}
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', zIndex: 2 }}>
                  <p style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', marginBottom: '2px' }}>
                    {project.title}
                  </p>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>📍 {project.location}</p>
                </div>

              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p style={{ color: 'var(--color-text-dark-muted)', textAlign: 'center', fontSize: '16px', padding: '48px 0' }}>
            No projects in this category yet.
          </p>
        )}
      </div>
      </div>

      {/* Service Coverage Map */}
      <section className="coverage-section" style={{ backgroundColor: 'var(--color-cream-dark)', padding: '80px 24px', borderTop: '1px solid var(--color-border-light)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '14px' }}>
              Service Area
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(26px, 3vw, 38px)', color: 'var(--color-text-dark)', marginBottom: '16px', lineHeight: 1.2 }}>
              From the Okanagan to Edmonton
            </h2>
            <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '16px', lineHeight: 1.65, maxWidth: '560px', margin: '0 auto' }}>
              From BC&rsquo;s Okanagan Valley to Edmonton and south through Alberta — our crews have worked across the region. Every location on this map has a City Roofing story.
            </p>
          </div>

          {/* Map image */}
          <div style={{ position: 'relative', width: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="range-map-img"
              src="/images/range.png"
              alt="City Roofing service coverage area — Calgary, Edmonton, BC Okanagan, southern Alberta"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          {/* Coverage tags */}
          <div className="coverage-tags" style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '32px' }}>
            {['Calgary (All Quadrants)', 'Airdrie', 'Cochrane', 'Chestermere', 'Okotoks', 'Edmonton Region', 'BC Okanagan', 'Southern Alberta'].map((area) => (
              <span
                key={area}
                style={{ backgroundColor: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.1)', color: 'var(--color-text-dark-muted)', padding: '6px 14px', borderRadius: '3px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <ServiceCTA headline="Want Results Like These?" subtext="Free inspection — written estimate — no pressure." />

      <style>{`
        .project-card { transition: filter 280ms ease; }
        .project-card:hover { filter: brightness(1.07); }

        /* Coverage map — mobile crop */
        @media (max-width: 768px) {
          .range-map-img {
            height: 280px !important;
            object-fit: cover !important;
            /* Focus on Alberta corridor: slightly east of center, mid-height
               puts Calgary and Edmonton both in frame */
            object-position: 62% 42% !important;
          }
          .coverage-tags { gap: 8px !important; }
          .coverage-section { padding: 56px 20px !important; }
        }
      `}</style>
    </div>
  );
}
