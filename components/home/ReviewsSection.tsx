'use client';

import reviewsData from '@/data/reviews.json';
import companyData from '@/data/company.json';

const featured = reviewsData.filter((r) => r.featured);

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < count ? '#F5A623' : '#E5E0D8'}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section style={{ backgroundColor: 'var(--color-cream)', padding: '96px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span className="reviews-rating-num" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '64px', color: 'var(--color-primary)', lineHeight: 1 }}>
              {companyData.googleRating}
            </span>
            <div>
              <StarRating />
              <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '14px', marginTop: '6px' }}>
                Based on {companyData.googleReviewCount} Google Reviews
              </p>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '16px', scrollbarWidth: 'none' }}>
          {featured.map((review) => (
            <div
              key={review.id}
              className="review-card"
              style={{ flexShrink: 0, width: '320px', backgroundColor: '#FFFFFF', border: '1px solid var(--color-border-light)', borderRadius: '6px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              <StarRating count={review.rating} />
              <p style={{ color: 'var(--color-text-dark)', fontSize: '15px', lineHeight: 1.6, flex: 1 }}>
                &ldquo;{review.text}&rdquo;
              </p>
              <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: '16px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--color-text-dark)', marginBottom: '4px' }}>
                  {review.name}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--color-text-dark-muted)', fontSize: '12px' }}>
                    {new Date(review.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long' })}
                  </span>
                  <span style={{ backgroundColor: 'rgba(66,133,244,0.08)', color: 'var(--color-text-dark-muted)', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '3px', fontFamily: 'var(--font-display)', letterSpacing: '0.5px' }}>
                    {review.source}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px', flexWrap: 'wrap', gap: '24px' }}>
          <a
            href="https://maps.app.goo.gl/ng64DnFy6FkH9NUV9"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-primary)', textDecoration: 'none', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px' }}
          >
            See All {companyData.googleReviewCount} Reviews on Google →
          </a>

        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .reviews-rating-num { font-size: 56px !important; }
          .review-card { width: 85vw !important; }
        }
      `}</style>
    </section>
  );
}
