import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  // ── Auth check ───────────────────────────────────────────────────────────────
  const adminSecret = process.env.ADMIN_SECRET ?? 'cityroofing2026';
  const providedKey = req.headers.get('x-admin-key');
  if (providedKey !== adminSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { mdxContent, slug, draft } = (await req.json()) as {
      mdxContent: string;
      slug: string;
      draft?: boolean;
    };

    if (!mdxContent || !slug) {
      return NextResponse.json({ error: 'mdxContent and slug are required' }, { status: 400 });
    }

    // Sanitize slug — only lowercase alphanumeric + hyphens
    const safeSlug = slug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    if (!safeSlug) {
      return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
    }

    const dir = draft
      ? path.join(process.cwd(), 'content', 'news', 'drafts')
      : path.join(process.cwd(), 'content', 'news');

    // Ensure directory exists
    fs.mkdirSync(dir, { recursive: true });

    const filePath = path.join(dir, `${safeSlug}.mdx`);
    fs.writeFileSync(filePath, mdxContent, 'utf-8');

    const relativePath = draft
      ? `content/news/drafts/${safeSlug}.mdx`
      : `content/news/${safeSlug}.mdx`;

    return NextResponse.json({ success: true, path: relativePath, slug: safeSlug });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[publish-article]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
