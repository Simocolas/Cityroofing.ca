import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const NEWS_DIR = path.join(process.cwd(), 'content/news');

export interface FaqItem {
  q: string;
  a: string;
}

export interface PostFrontmatter {
  title: string;
  slug: string;
  date: string;
  lastUpdated: string;
  category: string;
  subcategory?: string;
  scheduledDate?: string;
  status: 'draft' | 'scheduled' | 'published';
  excerpt: string;
  featuredImage?: string;
  imageAlt?: string;
  sourceUrl?: string;
  sourceNote?: string;
  keywords: string[];
  faqItems: FaqItem[];
  readingTime?: string;
  author: string;
  geo: {
    city: string;
    province: string;
    country: string;
  };
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
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
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
