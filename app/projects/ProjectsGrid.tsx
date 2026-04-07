'use client';

import { useState } from 'react';
import Image from 'next/image';
import FAQSection, { FAQItem } from '@/components/shared/FAQSection';
import ServiceCTA from '@/components/shared/ServiceCTA';
import projectsData from '@/data/projects.json';

type FilterTab = 'All' | 'Residential' | 'Commercial' | 'Siding' | 'Repair';
const filterTabs: FilterTab[] = ['All', 'Residential', 'Commercial', 'Siding', 'Repair'];

const faqItems: FAQItem[] = [
  { q: 'What types of roofing projects does City Roofing handle?', a: 'We handle residential and commercial roofing — shingle replacement, flat roofs, metal roofing, emergency repairs — as well as vinyl, Hardie board, and metal siding across all Calgary quadrants.' },
  { q: 'Do you have photos of completed roofing projects in Calgary?', a: 'Yes. Contact us at 403-608-9933 and we can share project photos relevant to your property type and neighbourhood.' },
  { q: 'Can you do a project in my Calgary neighbourhood?', a: 'We serve all Calgary quadrants — NE, NW, SE, SW — plus Airdrie, Cochrane, Chestermere, and Okotoks.' },
];

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

      {/* Grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {filtered.map((project) => {
            const imgSrc = project.afterImage
              ? (project.afterImage.startsWith('/') ? project.afterImage : `/images/projects/${project.afterImage}`)
              : null;

            return (
              <div
                key={project.id}
                style={{ backgroundColor: '#1A1A1A', border: '1px solid var(--color-border)', borderRadius: '6px', aspectRatio: '4/3', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
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

                {/* Hover overlay */}
                <div className="project-overlay" style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(139,26,26,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 300ms ease-out', zIndex: 3 }}>
                  <span style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '15px', letterSpacing: '1px' }}>View Project</span>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', fontSize: '16px', padding: '48px 0' }}>
            No projects in this category yet.
          </p>
        )}
      </div>

      <FAQSection items={faqItems} title="Projects — FAQ" />
      <ServiceCTA headline="Want Results Like These?" subtext="Free inspection — written estimate — no pressure." />

      <style>{`.project-card:hover .project-overlay { opacity: 1 !important; }`}</style>
    </div>
  );
}
