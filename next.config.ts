import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.iko.com' },
      { protocol: 'https', hostname: '**.bpcan.com' },
      { protocol: 'https', hostname: '**.gaf.com' },
      { protocol: 'https', hostname: '**.owenscorning.com' },
      { protocol: 'https', hostname: '**.certainteed.com' },
      { protocol: 'https', hostname: '**.malarkeyroofing.com' },
      { protocol: 'https', hostname: '**.kaycan.com' },
      { protocol: 'https', hostname: '**.royalbuildingproducts.com' },
      { protocol: 'https', hostname: '**.gentekcorp.com' },
      { protocol: 'https', hostname: '**.plygem.com' },
      { protocol: 'https', hostname: '**.mittensiding.com' },
    ],
  },

  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/blog/:slug*',
        destination: '/news/:slug*',
        permanent: true,
      },
      {
        source: '/services/commercial',
        destination: '/services/flat-roofing',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/videos/:file*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/images/:file*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },
};

export default nextConfig;
