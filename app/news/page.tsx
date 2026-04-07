import type { Metadata } from 'next';
import { getPublishedPosts } from '@/lib/mdx';
import NewsGrid from './NewsGrid';

export const metadata: Metadata = {
  title: 'Roofing News & Tips Calgary | City Roofing & Exteriors',
  description:
    'Local roofing insights, maintenance tips, and Calgary construction updates from City Roofing & Exteriors.',
};

export default function NewsPage() {
  const posts = getPublishedPosts();

  return (
    <div style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh', paddingTop: '90px' }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          padding: '64px 24px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            letterSpacing: '3px',
            color: 'var(--color-accent)',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          News &amp; Insights
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(32px, 5vw, 56px)',
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
          }}
        >
          Industry Insights &amp; Local Tips
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          Local roofing insights, maintenance tips, and Calgary construction updates.
        </p>
      </div>

      {/* Posts grid with filters */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '64px 24px',
        }}
      >
        <NewsGrid posts={posts} />
      </div>
    </div>
  );
}
