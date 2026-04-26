import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content, readingTime } = post;

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    datePublished: frontmatter.date,
    dateModified: frontmatter.lastUpdated,
    author: {
      '@type': 'Organization',
      name: frontmatter.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'City Roofing & Exteriors',
      url: 'https://calgarycityroofing.com',
    },
  };

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
            <span
              style={{
                backgroundColor: 'var(--color-primary)',
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
              {frontmatter.category}
            </span>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>
              Last Updated:{' '}
              {new Date(frontmatter.lastUpdated).toLocaleDateString('en-CA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
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

        {/* FAQ Section */}
        {frontmatter.faqItems?.length > 0 && (
          <section style={{ marginTop: '64px', borderTop: '1px solid var(--color-border)', paddingTop: '48px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(24px, 3vw, 36px)',
                color: 'var(--color-text-primary)',
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
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                    padding: '24px',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '17px',
                      color: 'var(--color-text-primary)',
                      marginBottom: '12px',
                    }}
                  >
                    {item.q}
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '15px', lineHeight: 1.7 }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Auto CTA */}
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

        {/* Back to blog */}
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <Link
            href="/blog"
            style={{
              color: 'var(--color-text-muted)',
              textDecoration: 'none',
              fontSize: '14px',
              fontFamily: 'var(--font-display)',
              transition: 'color 150ms ease-out',
            }}
          >
            ← Back to Blog
          </Link>
        </div>
      </div>

      <style>{`
        .prose-dark h2 {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(22px, 3vw, 30px);
          color: var(--color-text-primary);
          margin-top: 48px;
          margin-bottom: 16px;
          line-height: 1.3;
        }
        .prose-dark h3 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 20px;
          color: var(--color-text-primary);
          margin-top: 32px;
          margin-bottom: 12px;
        }
        .prose-dark p {
          color: var(--color-text-muted);
          font-size: 16px;
          line-height: 1.8;
          margin-bottom: 20px;
        }
        .prose-dark ul, .prose-dark ol {
          color: var(--color-text-muted);
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
          color: var(--color-text-primary);
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}
