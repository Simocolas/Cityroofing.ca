import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { NextRequest, NextResponse } from 'next/server';
import { githubWriteFile, githubDeleteFile } from '@/lib/github';

const NEWS_DIR = path.join(process.cwd(), 'content/news');
const ADMIN_SECRET = process.env.ADMIN_SECRET ?? 'cityroofing2026';

function authCheck(req: NextRequest): boolean {
  return req.headers.get('x-admin-key') === ADMIN_SECRET;
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

// GET — reads deployed filesystem (read-only is fine for reads)
export async function GET() {
  if (!fs.existsSync(NEWS_DIR)) return Response.json({ posts: [] });

  const files = fs
    .readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith('.mdx') && f !== 'template.mdx');

  const posts = files.map((filename) => {
    const filePath = path.join(NEWS_DIR, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const slug = filename.replace('.mdx', '');
    const stats = readingTime(content);
    return { slug, frontmatter: data, readingTime: stats.text, rawContent: raw };
  });

  posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date as string).getTime() -
      new Date(a.frontmatter.date as string).getTime(),
  );

  return Response.json({ posts });
}

// PUT — update existing article via GitHub API
export async function PUT(req: NextRequest) {
  if (!authCheck(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { slug, mdxContent } = (await req.json()) as {
      slug: string;
      mdxContent: string;
      draft?: boolean;
    };
    if (!slug || !mdxContent)
      return NextResponse.json({ error: 'slug and mdxContent required' }, { status: 400 });

    const safeSlug = slugify(slug);
    const ghPath = `content/news/${safeSlug}.mdx`;

    await githubWriteFile(ghPath, mdxContent, `Update article: ${safeSlug}`);

    return NextResponse.json({ success: true, message: 'Saved to GitHub — redeploy triggered.' });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}

// DELETE — remove article via GitHub API
export async function DELETE(req: NextRequest) {
  if (!authCheck(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { slug } = (await req.json()) as { slug: string };
    if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 });

    const safeSlug = slugify(slug);
    const ghPath = `content/news/${safeSlug}.mdx`;

    await githubDeleteFile(ghPath, `Remove article: ${safeSlug}`);

    return NextResponse.json({ success: true, message: 'Deleted from GitHub — redeploy triggered.' });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
