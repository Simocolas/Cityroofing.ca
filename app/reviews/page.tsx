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
  { q: 'Are the Google reviews verified?', a: 'Google reviews are submitted by real Google account holders. Google has systems in place to detect and remove fake reviews. Our reviews reflect genuine customer experiences.' },
  { q: 'Do you respond to negative reviews?', a: 'Yes. We take all feedback seriously and respond to every review — positive or critical. If there was an issue with your project, we want to make it right. Call us directly at 403-608-9933.' },
];

function StarRating({ count = 5, onDark = false }: { count?: number; onDark?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < count ? '#F59E0B' : (onDark ? '#2A2A2A' : '#E5E0D8')}>
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

      {/* Rating summary — cream */}
      <div style={{ backgroundColor: 'var(--color-cream-dark)', borderBottom: '1px solid var(--color-border-light)', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '72px', color: 'var(--color-text-dark)', lineHeight: 1 }}>
            {companyData.googleRating}
          </span>
          <div style={{ textAlign: 'left' }}>
            <StarRating count={5} />
            <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '16px', marginTop: '8px' }}>
              Based on {companyData.googleReviewCount} Google Reviews
            </p>
            <a
              href="https://maps.app.goo.gl/ng64DnFy6FkH9NUV9"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-accent)', textDecoration: 'none', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', display: 'inline-block', marginTop: '8px' }}
            >
              Read all {companyData.googleReviewCount} reviews on Google →
            </a>
          </div>
        </div>
      </div>

      {/* Reviews grid — cream zone */}
      <section style={{ backgroundColor: 'var(--color-cream)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {reviewsData.map((review) => (
              <div
                key={review.id}
                style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border-light)', borderRadius: '6px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                <StarRating count={review.rating} />
                <p style={{ color: 'var(--color-text-dark)', fontSize: '15px', lineHeight: 1.6, flex: 1 }}>
                  &ldquo;{review.text}&rdquo;
                </p>
                <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: '16px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--color-text-dark)', marginBottom: '6px' }}>
                    {review.name}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--color-text-dark-muted)', fontSize: '12px' }}>
                      {new Date(review.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long' })}
                    </span>
                    <span style={{ backgroundColor: 'rgba(66,133,244,0.1)', color: '#4285F4', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '3px', fontFamily: 'var(--font-display)', letterSpacing: '0.5px' }}>
                      {review.source}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <a
              href="https://maps.app.goo.gl/ng64DnFy6FkH9NUV9"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', border: '2px solid var(--color-primary)', color: 'var(--color-primary)', padding: '14px 32px', borderRadius: '4px', textDecoration: 'none', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px' }}
            >
              Read All {companyData.googleReviewCount} Reviews on Google →
            </a>
          </div>
        </div>
      </section>

      <FAQSection items={faqItems} title="Reviews — FAQ" />
      <ServiceCTA headline="Ready to Become Our Next Happy Customer?" subtext="Free estimate — honest work — no pressure." />
    </div>
  );
}
