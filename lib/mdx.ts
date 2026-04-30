import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const NEWS_DIR = path.join(process.cwd(), 'content/news');
const GITHUB_REPO = process.env.GITHUB_REPO ?? 'Simocolas/Cityroofing.ca';

export interface FaqItem {
  q: string;
  a: string;
}

export interface ArticleSource {
  name: string;
  title?: string;
  url: string;
  publishedDate?: string;
  supports?: string;
}

export interface QualityScore {
  overall?: number;
  sourceStrength?: number;
  geoExtractability?: number;
  newsRelevance?: number;
  calgarySpecificity?: number;
  roofingExpertValue?: number;
  seoPotential?: number;
  conversionRelevance?: number;
}

export interface PostFrontmatter {
  // Identity
  title: string;
  slug: string;

  // Dates. `date` is always present (legacy + new). New pipeline also writes
  // `datePublished` / `dateModified` as ISO strings; old articles fall back
  // to `date` when these are absent.
  date: string;
  datePublished?: string;
  dateModified?: string;
  lastUpdated?: string; // legacy field on older hand-written articles

  // Classification
  category: string;
  subcategory?: string;
  scheduledDate?: string;
  status: 'draft' | 'scheduled' | 'published';

  // Display copy
  excerpt?: string;
  description?: string;
  featuredImage?: string;
  imageAlt?: string;

  // Legacy single-source fields (older articles only)
  sourceUrl?: string;
  sourceNote?: string;

  // New pipeline: structured source list, mirrors the visible Sources block
  sources?: ArticleSource[];

  // SEO + content
  keywords?: string[];
  faqItems?: FaqItem[];
  readingTime?: string;
  author?: string;
  reviewedBy?: string;
  geo?: {
    city: string;
    province: string;
    country: string;
  };

  // New pipeline: governance metadata, surfaced in admin UI
  coreQuestion?: string;
  searchIntent?: string;
  reviewFlags?: string[];
  qualityScore?: QualityScore;
}

export interface PostMeta {
  slug: string;
  frontmatter: PostFrontmatter;
  readingTime: string;
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
}

// Safe date sort key — returns 0 (epoch) for missing or invalid dates so we
// never end up with NaN in comparisons (which produces unstable ordering and
// is the root cause of "Last Updated: Invalid Date" leaking into the UI).
function sortKey(fm: PostFrontmatter): number {
  const candidate = fm.datePublished ?? fm.date;
  if (!candidate) return 0;
  const t = new Date(candidate).getTime();
  return Number.isFinite(t) ? t : 0;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(NEWS_DIR)) return [];

  const files = fs.readdirSync(NEWS_DIR).filter((f) => f.endsWith('.mdx') && f !== 'template.mdx');

  return files
    .map((filename) => {
      const filePath = path.join(NEWS_DIR, filename);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);
      const slug = filename.replace('.mdx', '');
      const stats = readingTime(content);
      return {
        slug,
        frontmatter: data as PostFrontmatter,
        readingTime: stats.text,
      };
    })
    .sort((a, b) => sortKey(b.frontmatter) - sortKey(a.frontmatter));
}

export function getPublishedPosts(): PostMeta[] {
  return getAllPosts().filter((p) => p.frontmatter.status === 'published');
}

export function getDraftPosts(): PostMeta[] {
  return getAllPosts().filter((p) => p.frontmatter.status === 'draft');
}

export function getScheduledPosts(): PostMeta[] {
  return getAllPosts().filter((p) => p.frontmatter.status === 'scheduled');
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getPublishedPosts().filter((p) => p.frontmatter.category === category);
}

export function getRecentPosts(n: number): PostMeta[] {
  return getPublishedPosts().slice(0, n);
}

// Fetch published posts directly from GitHub API — no Vercel rebuild needed
export async function getPublishedPostsLive(): Promise<PostMeta[]> {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = { Accept: 'application/vnd.github.v3+json' };
  if (token) headers.Authorization = `token ${token}`;

  try {
    const listRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/content/news`,
      { headers, cache: 'no-store' },
    );
    if (!listRes.ok) return getPublishedPosts();

    const files = (await listRes.json()) as Array<{ name: string; download_url: string }>;
    const mdxFiles = files.filter((f) => f.name.endsWith('.mdx') && f.name !== 'template.mdx');

    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        try {
          const res = await fetch(file.download_url, { cache: 'no-store' });
          if (!res.ok) return null;
          const raw = await res.text();
          const { data, content } = matter(raw);
          const slug = file.name.replace('.mdx', '');
          const stats = readingTime(content);
          return { slug, frontmatter: data as PostFrontmatter, readingTime: stats.text };
        } catch {
          return null;
        }
      }),
    );

    return posts
      .filter((p): p is PostMeta => p !== null && p.frontmatter.status === 'published')
      .sort((a, b) => sortKey(b.frontmatter) - sortKey(a.frontmatter));
  } catch {
    return getPublishedPosts();
  }
}

// Resolve canonical published / modified ISO timestamps for an article,
// falling back across legacy fields and the MDX file's own `date`. Returns
// strings the caller can hand to `new Date()` without producing Invalid Date
// (returns null only when there is genuinely no date anywhere).
export function resolveDates(fm: PostFrontmatter): { published: string | null; modified: string | null } {
  const isValid = (s?: string): s is string => !!s && Number.isFinite(new Date(s).getTime());
  const published = [fm.datePublished, fm.date].find(isValid) ?? null;
  const modified = [fm.dateModified, fm.lastUpdated, fm.datePublished, fm.date].find(isValid) ?? null;
  return { published, modified };
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(NEWS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    frontmatter: data as PostFrontmatter,
    content,
    readingTime: stats.text,
  };
}
