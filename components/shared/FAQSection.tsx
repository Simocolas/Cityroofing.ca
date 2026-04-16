export interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  schemaId?: string;
}

export default function FAQSection({ items, title = 'Frequently Asked Questions', schemaId }: FAQSectionProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <section
      id={schemaId}
      style={{
        backgroundColor: 'var(--color-cream-dark)',
        padding: '80px 24px',
        borderTop: '1px solid var(--color-border-light)',
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(24px, 3vw, 36px)',
            color: 'var(--color-text-dark)',
            marginBottom: '40px',
          }}
        >
          {title}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border-light)',
                borderRadius: '6px',
                padding: '24px 28px',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '17px',
                  color: 'var(--color-text-dark)',
                  marginBottom: '10px',
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
      </div>
    </section>
  );
}
