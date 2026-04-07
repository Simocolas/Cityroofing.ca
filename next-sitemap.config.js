/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.calgarycityroofing.com',
  generateRobotsTxt: false, // we manage robots.txt manually
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*'],
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/services'),
    await config.transform(config, '/services/roof-replacement'),
    await config.transform(config, '/services/roof-repair'),
    await config.transform(config, '/services/siding'),
    await config.transform(config, '/services/commercial'),
    await config.transform(config, '/about'),
    await config.transform(config, '/reviews'),
    await config.transform(config, '/contact'),
    await config.transform(config, '/projects'),
    await config.transform(config, '/blog'),
  ],
  transform: async (config, path) => {
    const priorities = {
      '/': 1.0,
      '/contact': 0.9,
      '/services': 0.9,
      '/services/roof-replacement': 0.85,
      '/services/roof-repair': 0.85,
      '/services/siding': 0.8,
      '/services/commercial': 0.8,
      '/about': 0.7,
      '/reviews': 0.7,
      '/projects': 0.7,
      '/blog': 0.75,
    };
    return {
      loc: path,
      changefreq: path === '/' ? 'daily' : 'weekly',
      priority: priorities[path] ?? 0.6,
      lastmod: new Date().toISOString(),
    };
  },
};
