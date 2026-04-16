interface ServiceHeroProps {
  title: string;
  subtitle: string;
  breadcrumb?: string;
  breadcrumbPath?: string; // e.g. "/services/roof-replacement"
}

export default function ServiceHero({ title, subtitle, breadcrumb, breadcrumbPath }: ServiceHeroProps) {
  const breadcrumbSchema = breadcrumb
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.calgarycityroofing.com' },
          ...(breadcrumb.includes(' / ')
            ? [
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: breadcrumb.split(' / ')[0],
                  item: `https://www.calgarycityroofing.com/${breadcrumb.split(' / ')[0].toLowerCase()}`,
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: breadcrumb.split(' / ')[1],
                  item: `https://www.calgarycityroofing.com${breadcrumbPath ?? ''}`,
                },
              ]
            : [
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: breadcrumb,
                  item: `https://www.calgarycityroofing.com${breadcrumbPath ?? ''}`,
                },
              ]),
        ],
      }
    : null;

  return (
    <>
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <div
        className="service-hero-banner"
        style={{
          height: '50vh',
          minHeight: '360px',
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: '90px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, var(--color-base) 0%, var(--color-surface) 50%, var(--color-base) 100%)',
            opacity: 0.8,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            backgroundColor: 'var(--color-primary)',
          }}
        />
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {breadcrumb && (
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
              {breadcrumb}
            </p>
          )}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: 'var(--color-text-primary)',
              lineHeight: 1.1,
              marginBottom: '20px',
              maxWidth: '800px',
            }}
          >
            {title}
          </h1>
          <p
            className="service-hero-subtitle"
            style={{
              color: 'var(--color-text-muted)',
              fontSize: '18px',
              lineHeight: 1.6,
              maxWidth: '640px',
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .service-hero-banner { height: 40vh !important; min-height: 280px !important; padding: 24px 16px !important; }
          .service-hero-banner h1 { font-size: clamp(32px, 8vw, 48px) !important; }
          .service-hero-subtitle { font-size: 15px !important; }
        }
      `}</style>
    </>
  );
}
