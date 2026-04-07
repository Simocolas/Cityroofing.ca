'use client';

interface Brand {
  name: string;
  url: string;
}

const row1: Brand[] = [
  { name: 'IKO',           url: 'https://www.iko.com/glob/wp-content/themes/iko/images/logo.svg' },
  { name: 'BP/BMCA',       url: 'https://www.bpcan.com/sites/default/files/bp-logo.png' },
  { name: 'GAF',           url: 'https://www.gaf.com/resources/images/gaf-logo.svg' },
  { name: 'Owens Corning', url: 'https://www.owenscorning.com/assets/images/logos/oc-logo.svg' },
  { name: 'CertainTeed',   url: 'https://www.certainteed.com/assets/images/ct-logo.png' },
  { name: 'Malarkey',      url: 'https://malarkeyroofing.com/wp-content/uploads/malarkey-logo.svg' },
  // Duplicate for seamless scroll
  { name: 'IKO',           url: 'https://www.iko.com/glob/wp-content/themes/iko/images/logo.svg' },
  { name: 'BP/BMCA',       url: 'https://www.bpcan.com/sites/default/files/bp-logo.png' },
  { name: 'GAF',           url: 'https://www.gaf.com/resources/images/gaf-logo.svg' },
  { name: 'Owens Corning', url: 'https://www.owenscorning.com/assets/images/logos/oc-logo.svg' },
  { name: 'CertainTeed',   url: 'https://www.certainteed.com/assets/images/ct-logo.png' },
  { name: 'Malarkey',      url: 'https://malarkeyroofing.com/wp-content/uploads/malarkey-logo.svg' },
];

const row2: Brand[] = [
  { name: 'Kaycan',                  url: 'https://www.kaycan.com/wp-content/uploads/kaycan-logo.png' },
  { name: 'Royal Building Products', url: 'https://www.royalbuildingproducts.com/images/royal-logo.png' },
  { name: 'Gentek',                  url: 'https://www.gentekcorp.com/wp-content/uploads/gentek-logo.png' },
  { name: 'Ply Gem',                 url: 'https://www.plygem.com/wp-content/themes/plygem/images/logo.svg' },
  { name: 'MITTEN',                  url: 'https://www.mittensiding.com/wp-content/uploads/mitten-logo.png' },
  // Duplicate for seamless scroll
  { name: 'Kaycan',                  url: 'https://www.kaycan.com/wp-content/uploads/kaycan-logo.png' },
  { name: 'Royal Building Products', url: 'https://www.royalbuildingproducts.com/images/royal-logo.png' },
  { name: 'Gentek',                  url: 'https://www.gentekcorp.com/wp-content/uploads/gentek-logo.png' },
  { name: 'Ply Gem',                 url: 'https://www.plygem.com/wp-content/themes/plygem/images/logo.svg' },
  { name: 'MITTEN',                  url: 'https://www.mittensiding.com/wp-content/uploads/mitten-logo.png' },
];

const certs = ['SECOR CERTIFIED', 'WCB ALBERTA', 'BBB ACCREDITED'];

function BrandLogo({ brand }: { brand: Brand }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 32px',
        flexShrink: 0,
      }}
      className="brand-logo-item"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={brand.url}
        alt={brand.name}
        style={{
          height: '40px',
          width: 'auto',
          objectFit: 'contain',
          filter: 'grayscale(100%) brightness(150%)',
          transition: 'filter 400ms ease-out',
          display: 'block',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(0%) brightness(100%)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(100%) brightness(150%)'; }}
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          img.style.display = 'none';
          const fallback = img.nextSibling as HTMLElement | null;
          if (fallback) fallback.style.display = 'block';
        }}
      />
      {/* Fallback text — hidden unless image fails */}
      <span
        style={{
          display: 'none',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '16px',
          letterSpacing: '1px',
          color: 'var(--color-text-muted)',
          opacity: 0.5,
          whiteSpace: 'nowrap',
        }}
      >
        {brand.name}
      </span>
    </div>
  );
}

function ScrollRow({ items, duration, reverse }: { items: Brand[]; duration: number; reverse?: boolean }) {
  return (
    <div style={{ overflow: 'hidden', width: '100%' }} className="logo-row-wrapper">
      <div
        className={reverse ? 'logo-scroll-reverse' : 'logo-scroll'}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 'max-content',
          animationDuration: `${duration}s`,
        }}
      >
        {items.map((brand, i) => (
          <BrandLogo key={i} brand={brand} />
        ))}
      </div>
    </div>
  );
}

export default function LogoScroller() {
  return (
    <section style={{ backgroundColor: 'var(--color-base)', padding: '80px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', marginBottom: '48px', textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(24px, 3vw, 36px)',
            color: 'var(--color-text-primary)',
          }}
        >
          Trusted Materials &amp; Partners
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '48px' }}>
        <ScrollRow items={row1} duration={35} />
        <ScrollRow items={row2} duration={45} reverse />
      </div>

      {/* Certification badges */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          padding: '0 24px',
        }}
      >
        {certs.map((cert) => (
          <div
            key={cert}
            style={{
              border: '1px solid var(--color-border)',
              borderRadius: '999px',
              padding: '10px 24px',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '12px',
              letterSpacing: '2px',
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
            }}
          >
            {cert}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .logo-scroll {
          animation: scrollLeft linear infinite;
        }
        .logo-scroll-reverse {
          animation: scrollRight linear infinite;
        }
        .logo-row-wrapper:hover .logo-scroll,
        .logo-row-wrapper:hover .logo-scroll-reverse {
          animation-play-state: paused;
        }
        .brand-logo-item img:hover {
          filter: grayscale(0%) brightness(100%);
        }
      `}</style>
    </section>
  );
}
