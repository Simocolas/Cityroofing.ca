import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPublishedPosts, getPostBySlug, getPostsByCategory, resolveDates } from '@/lib/mdx';
import { getArticleImage } from '@/lib/articleImage';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const categoryBadgeStyles: Record<string, { bg: string; color: string }> = {
  industry: { bg: '#1e3a5f', color: '#93c5fd' },
  calgary:  { bg: '#14532d', color: '#86efac' },
  tips:     { bg: '#7c2d12', color: '#fdba74' },
  projects: { bg: '#7f1d1d', color: '#fca5a5' },
};

// New slugs (published after build) are rendered on-demand; cache revalidates hourly
export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.frontmatter.title} | City Roofing Calgary`,
    description: post.frontmatter.excerpt,
    keywords: post.frontmatter.keywords,
  };
}

export default async function NewsPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content, readingTime } = post;

  // Related posts (same category, excluding current)
  const related = getPostsByCategory(frontmatter.category)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const badgeStyle = categoryBadgeStyles[frontmatter.category] ?? { bg: '#2a2a2a', color: '#9a9a9a' };

  // Article Schema — BlogPosting because this is news-informed expert
  // commentary, not original news reporting (per project positioning).
  // Dates are run through resolveDates so a missing dateModified or invalid
  // date never produces "Invalid Date" in Google's rich-results test.
  const { published: schemaPublished, modified: schemaModified } = resolveDates(frontmatter);
  const sourcesForSchema = (frontmatter.sources ?? []).filter((s) => s?.url);
  const articleSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.excerpt ?? frontmatter.description,
    image: frontmatter.featuredImage && /^https?:\/\/|^\//.test(frontmatter.featuredImage)
      ? frontmatter.featuredImage
      : undefined,
    datePublished: schemaPublished ?? undefined,
    dateModified: schemaModified ?? schemaPublished ?? undefined,
    author: {
      '@type': 'Organization',
      name: frontmatter.author ?? 'City Roofing & Exteriors',
      url: 'https://calgarycityroofing.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'City Roofing & Exteriors',
      url: 'https://calgarycityroofing.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://calgarycityroofing.com/images/logo-transparent.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://calgarycityroofing.com/news/${slug}`,
    },
  };
  if (sourcesForSchema.length > 0) {
    articleSchema.citation = sourcesForSchema.map((s) => ({
      '@type': 'CreativeWork',
      name: s.title || s.name,
      url: s.url,
      ...(s.publishedDate ? { datePublished: s.publishedDate } : {}),
      ...(s.name ? { publisher: { '@type': 'Organization', name: s.name } } : {}),
    }));
  }
  if (frontmatter.coreQuestion) {
    // Surface the core question as a mainEntity Question so AI engines
    // pick this article up for that specific homeowner query.
    articleSchema.about = {
      '@type': 'Question',
      name: frontmatter.coreQuestion,
    };
  }

  // FAQPage Schema
  const faqSchema = frontmatter.faqItems?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: frontmatter.faqItems.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      }
    : null;

  return (
    <div style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh', paddingTop: '72px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Article header */}
      <header
        style={{
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          padding: '64px 24px 48px',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {/* Category badge */}
            <span
              style={{
                backgroundColor: badgeStyle.bg,
                color: badgeStyle.color,
                fontSize: '11px',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: '3px',
              }}
            >
              {frontmatter.category}
            </span>
            {(() => {
              const { modified } = resolveDates(frontmatter);
              if (!modified) return null;
              return (
                <span style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>
                  Last Updated:{' '}
                  <strong style={{ color: 'var(--color-text-primary)' }}>
                    {new Date(modified).toLocaleDateString('en-CA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </strong>
                </span>
              );
            })()}
            <span style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>· {readingTime}</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 48px)',
              color: 'var(--color-text-primary)',
              lineHeight: 1.2,
              marginBottom: '20px',
            }}
          >
            {frontmatter.title}
          </h1>

          <p style={{ color: 'var(--color-text-muted)', fontSize: '18px', lineHeight: 1.6 }}>
            {frontmatter.excerpt}
          </p>
        </div>
      </header>

      {/* Red divider */}
      <div style={{ height: '3px', backgroundColor: 'var(--color-primary)', width: '100%' }} />

      {/* Cream zone — everything below header */}
      <div style={{ backgroundColor: 'var(--color-cream)' }}>

      {/* Hero image — always shown; falls back to category photo when featuredImage is a prompt string */}
      <div style={{ maxWidth: '800px', margin: '40px auto 0', padding: '0 24px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getArticleImage(frontmatter.featuredImage, frontmatter.category)}
          alt={frontmatter.imageAlt ?? frontmatter.title}
          style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '6px', display: 'block' }}
        />
      </div>

      {/* Article body */}
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '56px 24px',
        }}
      >
        <div className="prose-dark">
          <MDXRemote source={content} />
        </div>

        {/* Source note */}
        {frontmatter.sourceNote && (
          <p
            style={{
              marginTop: '40px',
              color: 'var(--color-text-dark-muted)',
              fontSize: '13px',
              fontStyle: 'italic',
              borderLeft: '3px solid var(--color-border-light)',
              paddingLeft: '16px',
            }}
          >
            {frontmatter.sourceNote}
          </p>
        )}

        {/* FAQ Section */}
        {frontmatter.faqItems && frontmatter.faqItems.length > 0 && (
          <section style={{ marginTop: '64px', borderTop: '1px solid var(--color-border-light)', paddingTop: '48px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(24px, 3vw, 36px)',
                color: 'var(--color-text-dark)',
                marginBottom: '32px',
              }}
            >
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {frontmatter.faqItems.map((item, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--color-border-light)',
                    borderRadius: '6px',
                    padding: '24px',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '17px',
                      color: 'var(--color-text-dark)',
                      marginBottom: '12px',
                    }}
                  >
                    {item.q}
                  </h3>
                  <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '15px', lineHeight: 1.7 }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section
          style={{
            marginTop: '64px',
            backgroundColor: 'var(--color-primary)',
            borderRadius: '8px',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '28px',
              color: '#fff',
              marginBottom: '12px',
            }}
          >
            Get a Free Estimate
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '28px' }}>
            City Roofing &amp; Exteriors offers free, no-obligation estimates for all roofing and
            siding projects in Calgary.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="tel:403-608-9933"
              style={{
                backgroundColor: '#fff',
                color: 'var(--color-primary)',
                padding: '14px 28px',
                borderRadius: '4px',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '15px',
              }}
            >
              Call 403-608-9933
            </a>
            <Link
              href="/contact"
              style={{
                border: '2px solid #fff',
                color: '#fff',
                backgroundColor: 'transparent',
                padding: '14px 28px',
                borderRadius: '4px',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '15px',
              }}
            >
              Request Online
            </Link>
          </div>
        </section>

        {/* Social share */}
        <ShareBar title={frontmatter.title} />

        {/* Related posts */}
        {related.length > 0 && (
          <section style={{ marginTop: '64px', borderTop: '1px solid var(--color-border-light)', paddingTop: '48px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '24px',
                color: 'var(--color-text-dark)',
                marginBottom: '28px',
              }}
            >
              Related Articles
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '20px',
              }}
            >
              {related.map((p) => {
                const rBadge = categoryBadgeStyles[p.frontmatter.category] ?? { bg: '#2a2a2a', color: '#9a9a9a' };
                return (
                  <Link
                    key={p.slug}
                    href={`/news/${p.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--color-border-light)',
                        borderRadius: '6px',
                        padding: '20px',
                        transition: 'border-color 150ms ease-out',
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: rBadge.bg,
                          color: rBadge.color,
                          fontSize: '10px',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                          padding: '3px 8px',
                          borderRadius: '3px',
                          display: 'inline-block',
                          marginBottom: '10px',
                        }}
                      >
                        {p.frontmatter.category}
                      </span>
                      <p
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: '14px',
                          color: 'var(--color-text-dark)',
                          lineHeight: 1.4,
                        }}
                      >
                        {p.frontmatter.title}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Back link */}
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <Link
            href="/news"
            style={{
              color: 'var(--color-text-dark-muted)',
              textDecoration: 'none',
              fontSize: '14px',
              fontFamily: 'var(--font-display)',
            }}
          >
            ← Back to News &amp; Insights
          </Link>
        </div>
      </div>

      </div>{/* end cream zone */}

      <style>{`
        .prose-dark h2 {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(22px, 3vw, 30px);
          color: var(--color-text-dark);
          margin-top: 48px;
          margin-bottom: 16px;
          line-height: 1.3;
        }
        .prose-dark h3 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 20px;
          color: var(--color-text-dark);
          margin-top: 32px;
          margin-bottom: 12px;
        }
        .prose-dark p {
          color: var(--color-text-dark-muted);
          font-size: 16px;
          line-height: 1.8;
          margin-bottom: 20px;
        }
        .prose-dark ul, .prose-dark ol {
          color: var(--color-text-dark-muted);
          font-size: 16px;
          line-height: 1.8;
          margin-bottom: 20px;
          padding-left: 24px;
        }
        .prose-dark li { margin-bottom: 8px; }
        .prose-dark a {
          color: var(--color-accent);
          text-decoration: underline;
        }
        .prose-dark strong {
          color: var(--color-text-dark);
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}

// Client component for share bar — inline to keep single file
function ShareBar({ title }: { title: string }) {
  return (
    <div
      style={{
        marginTop: '40px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px 0',
        borderTop: '1px solid var(--color-border-light)',
        borderBottom: '1px solid var(--color-border-light)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '13px',
          color: 'var(--color-text-dark-muted)',
          letterSpacing: '0.5px',
        }}
      >
        SHARE
      </span>
      <CopyLinkButton title={title} />
    </div>
  );
}

// Must be isolated so the server component can import it cleanly
// We define it here but it uses browser APIs — RSC handles this via client boundary
function CopyLinkButton({ title: _title }: { title: string }) {
  // Note: In RSC, onClick won't work. We render a static version here.
  // For full interactivity, this could be extracted to a 'use client' component.
  // For now, a simple anchor-style button works for the placeholder.
  return (
    <span
      style={{
        padding: '6px 16px',
        borderRadius: '4px',
        border: '1px solid var(--color-border-light)',
        color: 'var(--color-text-dark-muted)',
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: '12px',
        cursor: 'pointer',
      }}
    >
      Copy Link
    </span>
  );
}
