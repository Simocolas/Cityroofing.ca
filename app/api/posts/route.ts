import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const NEWS_DIR = path.join(process.cwd(), 'content/news');
const ADMIN_SECRET = process.env.ADMIN_SECRET ?? 'cityroofing2026';

function authCheck(req: NextRequest): boolean {
  return req.headers.get('x-admin-key') === ADMIN_SECRET;
}

export async function GET() {
  if (!fs.existsSync(NEWS_DIR)) {
    return Response.json({ posts: [] });
  }

  const files = fs
    .readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith('.mdx') && f !== 'template.mdx');

  const posts = files.map((filename) => {
    const filePath = path.join(NEWS_DIR, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const slug = filename.replace('.mdx', '');
    const stats = readingTime(content);
    return {
      slug,
      frontmatter: data,
      readingTime: stats.text,
      rawContent: raw,
    };
  });

  posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date as string).getTime() -
      new Date(a.frontmatter.date as string).getTime()
  );

  return Response.json({ posts });
}

export async function PUT(req: NextRequest) {
  if (!authCheck(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { slug, mdxContent, draft } = (await req.json()) as {
      slug: string;
      mdxContent: string;
      draft?: boolean;
    };
    if (!slug || !mdxContent) return NextResponse.json({ error: 'slug and mdxContent required' }, { status: 400 });

    const safeSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const filePath = path.join(NEWS_DIR, `${safeSlug}.mdx`);

    if (!fs.existsSync(filePath)) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

    fs.writeFileSync(filePath, mdxContent, 'utf-8');

    let gitOutput = '';
    if (!draft) {
      try {
        const relativePath = `content/news/${safeSlug}.mdx`;
        const { stdout, stderr } = await execAsync(
          `git -C "${process.cwd()}" add "${relativePath}" && git -C "${process.cwd()}" commit -m "Update article: ${safeSlug}" && git -C "${process.cwd()}" push`,
          { timeout: 60000 }
        );
        gitOutput = (stdout + (stderr ? `\n${stderr}` : '')).trim();
      } catch (gitErr: unknown) {
        const msg = gitErr instanceof Error ? gitErr.message : String(gitErr);
        gitOutput = `⚠️ Git error: ${msg}`;
      }
    }

    return NextResponse.json({ success: true, gitOutput });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!authCheck(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { slug, draft } = (await req.json()) as { slug: string; draft?: boolean };
    if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 });

    const safeSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const filePath = path.join(NEWS_DIR, `${safeSlug}.mdx`);

    if (!fs.existsSync(filePath)) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

    fs.unlinkSync(filePath);

    let gitOutput = '';
    if (!draft) {
      try {
        const relativePath = `content/news/${safeSlug}.mdx`;
        const { stdout, stderr } = await execAsync(
          `git -C "${process.cwd()}" add "${relativePath}" && git -C "${process.cwd()}" commit -m "Remove article: ${safeSlug}" && git -C "${process.cwd()}" push`,
          { timeout: 60000 }
        );
        gitOutput = (stdout + (stderr ? `\n${stderr}` : '')).trim();
      } catch (gitErr: unknown) {
        const msg = gitErr instanceof Error ? gitErr.message : String(gitErr);
        gitOutput = `⚠️ Git error: ${msg}`;
      }
    }

    return NextResponse.json({ success: true, gitOutput });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
