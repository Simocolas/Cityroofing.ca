import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/mdx';
import BlogCard from '@/components/shared/BlogCard';

export const metadata: Metadata = {
  title: 'Roofing Tips & Guides | City Roofing Calgary',
  description:
    'Roofing advice, cost guides, and maintenance tips from City Roofing & Exteriors in Calgary.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh', paddingTop: '72px' }}>
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
          Knowledge Base
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
          Roofing Tips &amp; Guides
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          Practical roofing advice from a Calgary contractor.
        </p>
      </div>

      {/* Posts grid */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '64px 24px',
        }}
      >
        {posts.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', fontSize: '16px' }}>
            No posts yet. Check back soon.
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '28px',
            }}
          >
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
