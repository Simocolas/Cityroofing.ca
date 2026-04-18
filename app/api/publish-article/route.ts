import { NextRequest, NextResponse } from 'next/server';
import { githubWriteFile } from '@/lib/github';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
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

    const safeSlug = slug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    if (!safeSlug) {
      return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
    }

    const ghPath = draft
      ? `content/news/drafts/${safeSlug}.mdx`
      : `content/news/${safeSlug}.mdx`;

    const commitMessage = draft
      ? `Save draft: ${safeSlug}`
      : `Add article: ${safeSlug}`;

    await githubWriteFile(ghPath, mdxContent, commitMessage);

    return NextResponse.json({
      success: true,
      path: ghPath,
      slug: safeSlug,
      message: draft
        ? 'Draft saved to GitHub.'
        : 'Published to GitHub — Vercel redeploy triggered.',
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[publish-article]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
