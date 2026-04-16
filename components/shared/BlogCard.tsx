'use client';

import Link from 'next/link';
import { PostMeta } from '@/lib/mdx';

const categoryColors: Record<string, string> = {
  roofing: 'var(--color-primary)',
  siding: '#1A4A8B',
  commercial: '#1A6B2A',
  tips: '#6B1A6B',
};

export default function BlogCard({ post }: { post: PostMeta }) {
  return (
    <article
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '6px',
        overflow: 'hidden',
        transition: 'transform 300ms ease-out, box-shadow 300ms ease-out',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      <div style={{ padding: '24px 24px 0' }}>
        <span
          style={{
            backgroundColor: categoryColors[post.frontmatter.category] ?? 'var(--color-primary)',
            color: '#fff',
            fontSize: '11px',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            padding: '4px 10px',
            borderRadius: '3px',
          }}
        >
          {post.frontmatter.category}
        </span>
      </div>

      <div style={{ padding: '20px 24px 28px' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '20px',
            color: 'var(--color-text-primary)',
            lineHeight: 1.3,
            marginBottom: '12px',
          }}
        >
          {post.frontmatter.title}
        </h2>
        <p
          style={{
            color: 'var(--color-text-muted)',
            fontSize: '15px',
            lineHeight: 1.6,
            marginBottom: '20px',
          }}
        >
          {post.frontmatter.excerpt}
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--color-border)',
            paddingTop: '16px',
          }}
        >
          <span style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>
            {new Date(post.frontmatter.date).toLocaleDateString('en-CA', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            style={{
              color: 'var(--color-accent)',
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '14px',
            }}
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}
