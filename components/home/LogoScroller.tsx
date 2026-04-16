'use client';

interface Brand {
  name: string;
  file?: string; // undefined = text fallback (BP/BMCA)
}

const row1: Brand[] = [
  { name: 'IKO',           file: 'IKO_North_America_id-Gcp3zAE_0.png' },
  { name: 'BP/BMCA' },
  { name: 'GAF',           file: 'GAF_idwV3yC-uN_0.png' },
  { name: 'Owens Corning', file: 'Owens_Corning_idYxCkwbXS_0.png' },
  { name: 'CertainTeed',   file: 'CertainTeed_idQRzni0ix_1.png' },
  { name: 'Malarkey',      file: 'Malarkey_Roofing_Products_id17PI6HKC_0.png' },
  // Duplicate for seamless scroll
  { name: 'IKO',           file: 'IKO_North_America_id-Gcp3zAE_0.png' },
  { name: 'BP/BMCA' },
  { name: 'GAF',           file: 'GAF_idwV3yC-uN_0.png' },
  { name: 'Owens Corning', file: 'Owens_Corning_idYxCkwbXS_0.png' },
  { name: 'CertainTeed',   file: 'CertainTeed_idQRzni0ix_1.png' },
  { name: 'Malarkey',      file: 'Malarkey_Roofing_Products_id17PI6HKC_0.png' },
];

const row2: Brand[] = [
  { name: 'Kaycan',                  file: 'Kaycan_id3_8YvC6L_1.png' },
  { name: 'Royal Building Products', file: 'Westlake_Royal_Building_Products_idZ2GoSO-E_0.jpeg' },
  { name: 'Gentek',                  file: 'Gentek_Building_Products_idzufTCWwO_0.jpeg' },
  { name: 'Ply Gem',                 file: 'Ply_Gem_idymUAG1SF_2.jpeg' },
  { name: 'MITTEN',                  file: 'Mitten_Badge.png' },
  // Duplicate for seamless scroll
  { name: 'Kaycan',                  file: 'Kaycan_id3_8YvC6L_1.png' },
  { name: 'Royal Building Products', file: 'Westlake_Royal_Building_Products_idZ2GoSO-E_0.jpeg' },
  { name: 'Gentek',                  file: 'Gentek_Building_Products_idzufTCWwO_0.jpeg' },
  { name: 'Ply Gem',                 file: 'Ply_Gem_idymUAG1SF_2.jpeg' },
  { name: 'MITTEN',                  file: 'Mitten_Badge.png' },
];


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
      {brand.file ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/images/Partners/logo/${brand.file}`}
          alt={brand.name}
          style={{
            height: '40px',
            width: 'auto',
            objectFit: 'contain',
            filter: 'grayscale(100%)',
            opacity: 0.6,
            transition: 'all 300ms ease',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLImageElement).style.filter = 'grayscale(0%)';
            (e.target as HTMLImageElement).style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLImageElement).style.filter = 'grayscale(100%)';
            (e.target as HTMLImageElement).style.opacity = '0.6';
          }}
        />
      ) : (
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '16px',
            letterSpacing: '1px',
            color: 'var(--color-text-dark-muted)',
            opacity: 0.5,
            whiteSpace: 'nowrap',
          }}
        >
          {brand.name}
        </span>
      )}
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
    <section style={{ backgroundColor: 'var(--color-cream-dark)', padding: '80px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', marginBottom: '48px', textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(24px, 3vw, 36px)',
            color: 'var(--color-text-dark)',
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '80px', flexWrap: 'wrap', padding: '24px 0', marginTop: '40px' }}>
        {[
          { src: '/images/Partners/3/SeCOR-transparent.png', alt: 'SECOR Certified', size: 120 },
          { src: '/images/Partners/3/WCB-transparent.png',   alt: 'WCB Alberta',     size: 120 },
          { src: '/images/Partners/3/BBB-transparent.png',   alt: 'BBB Accredited',  size: 160 },
        ].map((badge) => (
          <div
            key={badge.alt}
            style={{ width: `${badge.size}px`, height: `${badge.size}px`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={badge.src}
              alt={badge.alt}
              style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.7, transition: 'all 300ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = 'grayscale(0%)'; e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = 'grayscale(100%)'; e.currentTarget.style.opacity = '0.7'; }}
            />
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
      `}</style>
    </section>
  );
}
