import { NextRequest, NextResponse } from 'next/server';
import { githubWriteFile } from '@/lib/github';
import { runResearch, runBlueprint, runGenerate, runImage } from '@/lib/newsPipeline';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const CATEGORIES = [
  'Roofing Maintenance',
  'Material Guide',
  'Local Weather Tips',
  'Cost & Financing',
  'Insurance Claims',
  'Emergency Repair',
];

const GITHUB_REPO = process.env.GITHUB_REPO ?? 'Simocolas/Cityroofing.ca';

async function pickCategory(): Promise<string> {
  // Sequential rotation: count existing articles → mod 6 → next category
  try {
    const token = process.env.GITHUB_TOKEN;
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/content/news`, {
      headers: token
        ? { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' }
        : { Accept: 'application/vnd.github.v3+json' },
      cache: 'no-store',
    });
    if (res.ok) {
      const files = (await res.json()) as { name: string }[];
      const count = files.filter((f) => f.name.endsWith('.mdx')).length;
      return CATEGORIES[count % CATEGORIES.length];
    }
  } catch {
    /* fall through */
  }
  // Fallback: weekday-based
  const wd = new Date().getUTCDay();
  return CATEGORIES[(wd - 1 + CATEGORIES.length) % CATEGORIES.length];
}

export async function GET(req: NextRequest) {
  // Vercel cron auth — Vercel sends `Authorization: Bearer ${CRON_SECRET}` automatically
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get('authorization');
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  const category = await pickCategory();
  const startedAt = new Date().toISOString();

  try {
    const research = await runResearch({ notes: `Category target: ${category}` });
    const blueprint = await runBlueprint({ researchContext: research, contentType: category });
    let mdx = await runGenerate({
      contentType: category,
      researchContext: research,
      blueprintContext: blueprint,
    });
    const { featuredImagePath } = await runImage({
      blueprintContext: blueprint,
      researchContext: research,
      category,
    });
    mdx = mdx.replace('STAGE4_PLACEHOLDER', featuredImagePath ?? '');

    const slugMatch = mdx.match(/^slug:\s*"?([a-z0-9-]+)"?/m);
    const rawSlug = slugMatch?.[1] ?? `auto-${Date.now()}`;
    const slug = rawSlug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    await githubWriteFile(
      `content/news/${slug}.mdx`,
      mdx,
      `Auto-publish (${category}): ${slug}`,
    );

    return NextResponse.json({
      success: true,
      slug,
      category,
      featuredImage: featuredImagePath,
      startedAt,
      finishedAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[auto-publish]', msg);
    return NextResponse.json({ error: msg, category, startedAt }, { status: 500 });
  }
}
