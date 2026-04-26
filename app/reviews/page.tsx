import type { Metadata } from 'next';
import ServiceHero from '@/components/shared/ServiceHero';
import FAQSection, { FAQItem } from '@/components/shared/FAQSection';
import ServiceCTA from '@/components/shared/ServiceCTA';
import reviewsData from '@/data/reviews.json';
import companyData from '@/data/company.json';

export const metadata: Metadata = {
  title: 'Customer Reviews | City Roofing Calgary | 4.8★ Rating',
  description: `${companyData.googleReviewCount} Google reviews averaging ${companyData.googleRating} out of 5 stars. See what Calgary homeowners say about City Roofing & Exteriors.`,
};

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: companyData.name,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: String(companyData.googleRating),
    reviewCount: String(companyData.googleReviewCount),
    bestRating: '5',
  },
  review: reviewsData.slice(0, 5).map((r) => ({
    '@type': 'Review',
    reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
    author: { '@type': 'Person', name: r.name },
    reviewBody: r.text,
  })),
};

const faqItems: FAQItem[] = [
  { q: 'How can I leave a review for City Roofing?', a: 'You can leave a review on Google by searching "City Roofing & Exteriors Calgary" and clicking the "Write a review" button on our Google Business Profile.' },
  { q: 'Are the Google reviews verified?', a: 'Our reviews are collected through Google Business Profile, where customers post their own feedback using Google accounts.' },
  { q: 'Do you respond to customer feedback?', a: 'Yes. We take feedback seriously. If there was an issue with your project, we want to hear about it directly at 403-608-9933.' },
];

const trustStats = [
  { value: companyData.googleRating + '★', label: 'Average Rating' },
  { value: companyData.googleReviewCount + '+', label: 'Google Reviews' },
  { value: '3,000+', label: 'Projects' },
  { value: '15+', label: 'Years Serving Calgary' },
];

function StarRating({ count = 5, size = 16 }: { count?: number; size?: number }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < count ? '#F59E0B' : '#E5E0D8'}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

      <ServiceHero
        title="What Calgary Homeowners Say"
        subtitle={`${companyData.googleReviewCount} Google reviews averaging ${companyData.googleRating} out of 5 stars.`}
        breadcrumb="Reviews"
      />

      {/* Trust stats bar — dark */}
      <div style={{ backgroundColor: '#111111', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="trust-stats-bar" style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', textAlign: 'center' }}>
          {trustStats.map((stat) => (
            <div key={stat.label}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(28px, 3vw, 40px)', color: '#F9F7F2', lineHeight: 1, marginBottom: '6px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(249,247,242,0.4)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews grid — cream zone */}
      <section style={{ backgroundColor: 'var(--color-cream)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 24px 80px' }}>

          {/* Section intro */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '14px' }}>
              Verified Google Reviews
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(26px, 3vw, 38px)', color: 'var(--color-text-dark)', marginBottom: '16px', lineHeight: 1.2 }}>
              Calgary customers, in their own words.
            </h2>
            <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '16px', lineHeight: 1.6, maxWidth: '560px', margin: '0 auto 28px' }}>
              We don&rsquo;t broker jobs out. When you hire City Roofing, the crew that shows up is our crew — and the reviews speak to the work they did.
            </p>
            <a
              href="https://maps.app.goo.gl/ng64DnFy6FkH9NUV9"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--color-primary)', color: '#fff', padding: '12px 24px', borderRadius: '4px', textDecoration: 'none', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}
            >
              View All Reviews on Google →
            </a>
          </div>

          {/* Cards grid */}
          <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {reviewsData.map((review) => (
              <div
                key={review.id}
                className="review-card-page"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border-light)', borderRadius: '6px', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
              >
                <StarRating count={review.rating} />
                <p style={{ color: 'var(--color-text-dark)', fontSize: '14.5px', lineHeight: 1.65, flex: 1, margin: 0 }}>
                  &ldquo;{review.text}&rdquo;
                </p>
                <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: '14px', marginTop: 'auto' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--color-text-dark)', marginBottom: '6px' }}>
                    {review.name}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--color-text-dark-muted)', fontSize: '12px' }}>
                      {new Date(review.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long' })}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(66,133,244,0.08)', color: '#4285F4', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '3px', fontFamily: 'var(--font-display)', letterSpacing: '0.5px' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.8 }}>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                      </svg>
                      {review.source}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div style={{ textAlign: 'center', marginTop: '56px', paddingTop: '48px', borderTop: '1px solid var(--color-border-light)' }}>
            <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '15px', marginBottom: '24px' }}>
              Have we done work for you? Share your experience.
            </p>
            <a
              href="https://maps.app.goo.gl/ng64DnFy6FkH9NUV9"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', border: '2px solid var(--color-primary)', color: 'var(--color-primary)', padding: '13px 28px', borderRadius: '4px', textDecoration: 'none', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', letterSpacing: '0.5px' }}
            >
              Leave a Google Review →
            </a>
          </div>
        </div>
      </section>

      <FAQSection items={faqItems} title="Reviews — FAQ" />
      <ServiceCTA headline="Ready to Talk About Your Roof?" subtext="Free estimate — clear scope — no pressure." />

      <style>{`
        @media (max-width: 768px) {
          .trust-stats-bar { grid-template-columns: repeat(2, 1fr) !important; gap: 32px 16px !important; }
          .reviews-grid { grid-template-columns: 1fr !important; }
        }
        .review-card-page:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </div>
  );
}
