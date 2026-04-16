'use client';

import { useRef } from 'react';
import Link from 'next/link';
import projectsData from '@/data/projects.json';

const CATEGORY_LABELS: Record<string, string> = {
  residential: 'Residential',
  commercial: 'Commercial',
  siding: 'Siding',
  repair: 'Repair',
};

export default function ProjectsScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const featured = projectsData.filter((p) => p.featured);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grabbing';
  };
  const onMouseLeave = () => { isDragging.current = false; if (scrollRef.current) scrollRef.current.style.cursor = 'grab'; };
  const onMouseUp = () => { isDragging.current = false; if (scrollRef.current) scrollRef.current.style.cursor = 'grab'; };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5;
  };

  return (
    <section style={{ backgroundColor: 'var(--color-cream-dark)', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', marginBottom: '48px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '16px' }}>
          Our Work
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 4vw, 48px)', color: 'var(--color-text-dark)' }}>
          Recent Projects
        </h2>
      </div>

      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        style={{ display: 'flex', gap: '20px', overflowX: 'auto', padding: '0 24px 24px', cursor: 'grab', scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {featured.map((project) => (
          <div
            key={project.id}
            className="project-card"
            style={{
              flexShrink: 0,
              width: '380px',
              height: '480px',
              backgroundColor: '#1E1E1E',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 300ms ease-out',
              backgroundImage: (project.image || project.afterImage) ? `url('${project.image || project.afterImage}')` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {/* Placeholder if no image */}
            {!(project.image || project.afterImage) && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '24px' }}>
                <span style={{ fontSize: '40px', opacity: 0.15 }}>🏠</span>
                <p style={{ color: '#3A3A3A', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', textAlign: 'center', lineHeight: 1.4 }}>
                  {project.title}
                </p>
              </div>
            )}

            {/* Dark gradient for readability */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.75) 100%)' }} />

            {/* Category tag */}
            <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: 'rgba(139,26,26,0.9)', color: '#fff', padding: '6px 12px', borderRadius: '3px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', zIndex: 2 }}>
              {CATEGORY_LABELS[project.category] ?? project.category}
            </div>

            {/* Title + location */}
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', zIndex: 2 }}>
              <p style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', marginBottom: '6px' }}>
                {project.title}
              </p>
              <div style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: 'var(--color-text-muted)', padding: '4px 10px', borderRadius: '3px', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '12px', letterSpacing: '1px', display: 'inline-block' }}>
                📍 {project.location}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link href="/projects" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px' }}>
          View All Projects →
        </Link>
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }
        @media (max-width: 768px) {
          .project-card { width: 85vw !important; height: 260px !important; }
        }
      `}</style>
    </section>
  );
}
