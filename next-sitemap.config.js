/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://calgarycityroofing.com',
  generateRobotsTxt: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin', '/admin/*', '/api/*'],
  additionalPaths: async (config) => [
    {
      loc: '/',
      priority: 1.0,
      changefreq: 'daily',
    },
    {
      loc: '/services/roof-replacement',
      priority: 0.9,
      changefreq: 'weekly',
    },
    {
      loc: '/services/roof-repair',
      priority: 0.9,
      changefreq: 'weekly',
    },
    {
      loc: '/services/siding',
      priority: 0.8,
      changefreq: 'weekly',
    },
    {
      loc: '/services/commercial',
      priority: 0.8,
      changefreq: 'weekly',
    },
    {
      loc: '/insurance-claims',
      priority: 0.9,
      changefreq: 'weekly',
    },
    {
      loc: '/contact',
      priority: 0.8,
      changefreq: 'monthly',
    },
    {
      loc: '/about',
      priority: 0.7,
      changefreq: 'monthly',
    },
    {
      loc: '/projects',
      priority: 0.7,
      changefreq: 'weekly',
    },
    {
      loc: '/reviews',
      priority: 0.7,
      changefreq: 'monthly',
    },
    {
      loc: '/news',
      priority: 0.8,
      changefreq: 'daily',
    },
    {
      loc: '/services/flat-roofing',
      priority: 0.9,
      changefreq: 'weekly',
    },
    {
      loc: '/services/flat-roof-calgary',
      priority: 0.95,
      changefreq: 'weekly',
    },
  ],
}
