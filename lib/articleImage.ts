const CATEGORY_MAP: Record<string, string> = {
  // New AI-generated categories
  'insurance claims':   'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80',
  'emergency repair':   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
  'roofing maintenance':'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
  'material guide':     'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=80',
  'local weather tips': 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=900&q=80',
  'cost & financing':   'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80',
  // Legacy / existing categories
  tips:                 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80',
  calgary:              'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=900&q=80',
  industry:             'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80',
  projects:             'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80',
};

const FALLBACK = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=80';

const isUrl = (s: string) => /^https?:\/\/|^\//.test(s);

export function getArticleImage(
  featuredImage: string | undefined,
  category: string,
): string {
  if (featuredImage && isUrl(featuredImage)) return featuredImage;
  return CATEGORY_MAP[category.toLowerCase()] ?? FALLBACK;
}
