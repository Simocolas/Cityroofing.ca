'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PostMeta } from '@/lib/mdx';

const POSTS_PER_PAGE = 9;

const CATEGORIES = ['All', 'Industry', 'Calgary', 'Tips', 'Projects'] as const;

const categoryBadgeStyles: Record<string, { bg: string; color: string }> = {
  industry: { bg: '#1e3a5f', color: '#93c5fd' },
  calgary:  { bg: '#14532d', color: '#86efac' },
  tips:     { bg: '#7c2d12', color: '#fdba74' },
  projects: { bg: '#7f1d1d', color: '#fca5a5' },
};

function CategoryBadge({ category }: { category: string }) {
  const style = categoryBadgeStyles[category] ?? { bg: '#2a2a2a', color: '#9a9a9a' };
  return (
    <span
      style={{
        backgroundColor: style.bg,
        color: style.color,
        fontSize: '11px',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        padding: '4px 10px',
        borderRadius: '3px',
        display: 'inline-block',
      }}
    >
      {category}
    </span>
  );
}

const CATEGORY_IMAGES: Record<string, string> = {
  tips:     'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
  calgary:  'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600&q=80',
  industry: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
};
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80';

function getCardImage(post: PostMeta): string {
  if (post.frontmatter.featuredImage) return post.frontmatter.featuredImage;
  return CATEGORY_IMAGES[post.frontmatter.category] ?? FALLBACK_IMAGE;
}

function NewsCard({ post }: { post: PostMeta }) {
  const excerpt =
    post.frontmatter.excerpt.length > 120
      ? post.frontmatter.excerpt.slice(0, 120) + '…'
      : post.frontmatter.excerpt;

  return (
    <article
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--color-border-light)',
        borderRadius: '6px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 300ms ease-out, box-shadow 300ms ease-out',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Featured image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getCardImage(post)}
        alt={post.frontmatter.imageAlt ?? post.frontmatter.title}
        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80'; }}
        style={{
          height: '200px',
          width: '100%',
          objectFit: 'cover',
          borderRadius: '8px 8px 0 0',
          flexShrink: 0,
          display: 'block',
        }}
      />

      <div style={{ padding: '20px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ marginBottom: '14px' }}>
          <CategoryBadge category={post.frontmatter.category} />
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '18px',
            color: 'var(--color-text-dark)',
            lineHeight: 1.3,
            marginBottom: '10px',
          }}
        >
          {post.frontmatter.title}
        </h2>

        <p
          style={{
            color: 'var(--color-text-dark-muted)',
            fontSize: '14px',
            lineHeight: 1.6,
            marginBottom: '16px',
            flex: 1,
          }}
        >
          {excerpt}
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--color-border-light)',
            paddingTop: '14px',
          }}
        >
          <span style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>
            {new Date(post.frontmatter.date).toLocaleDateString('en-CA', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}{' '}
            · {post.readingTime}
          </span>
          <Link
            href={`/news/${post.slug}`}
            style={{
              color: 'var(--color-accent)',
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '13px',
            }}
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function NewsGrid({ posts }: { posts: PostMeta[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [page, setPage] = useState(1);

  const filtered =
    activeCategory === 'All'
      ? posts
      : posts.filter((p) => p.frontmatter.category === activeCategory.toLowerCase());

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  function handleCategory(cat: string) {
    setActiveCategory(cat);
    setPage(1);
  }

  return (
    <>
      {/* Category filter tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '48px',
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              style={{
                padding: '8px 20px',
                borderRadius: '4px',
                border: isActive ? '1px solid var(--color-accent)' : '1px solid var(--color-border-light)',
                backgroundColor: isActive ? 'var(--color-accent)' : 'transparent',
                color: isActive ? '#fff' : 'var(--color-text-dark-muted)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 150ms ease-out',
                letterSpacing: '0.5px',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {paginated.length === 0 ? (
        <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', fontSize: '16px' }}>
          No posts in this category yet.
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '28px',
            marginBottom: '48px',
          }}
        >
          {paginated.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '4px',
                border: p === page ? '1px solid var(--color-accent)' : '1px solid var(--color-border-light)',
                backgroundColor: p === page ? 'var(--color-accent)' : 'transparent',
                color: p === page ? '#fff' : 'var(--color-text-dark-muted)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
