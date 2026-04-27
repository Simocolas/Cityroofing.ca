import { NextRequest, NextResponse } from 'next/server';
import { githubWriteFile } from '@/lib/github';

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
  // Count existing articles → mod 6 → sequential rotation across all categories
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

function getBaseUrl(req: NextRequest): string {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  const host = req.headers.get('host');
  if (host) return `http://${host}`;
  return 'http://localhost:3001';
}

export async function GET(req: NextRequest) {
  // Vercel cron auth — Vercel automatically sends `Authorization: Bearer ${CRON_SECRET}`
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get('authorization');
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  const baseUrl = getBaseUrl(req);
  const category = await pickCategory();
  const startedAt = new Date().toISOString();

  try {
    // Stage 1: Research
    const r1 = await fetch(`${baseUrl}/api/news-generator`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'research', notes: `Category target: ${category}` }),
    });
    const d1 = await r1.json();
    if (d1.error) throw new Error(`research: ${d1.error}`);
    const research = d1.research;

    // Stage 2: Blueprint
    const r2 = await fetch(`${baseUrl}/api/news-generator`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'blueprint', researchContext: research, contentType: category }),
    });
    const d2 = await r2.json();
    if (d2.error) throw new Error(`blueprint: ${d2.error}`);
    const blueprint = d2.blueprint;

    // Stage 3: Generate article
    const r3 = await fetch(`${baseUrl}/api/news-generator`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: 'generate',
        contentType: category,
        researchContext: research,
        blueprintContext: blueprint,
      }),
    });
    const d3 = await r3.json();
    if (d3.error) throw new Error(`generate: ${d3.error}`);
    let mdx = d3.content as string;

    // Stage 4: Image (Imagen 3 + GitHub upload happens inside)
    const r4 = await fetch(`${baseUrl}/api/news-generator`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: 'image',
        blueprintContext: blueprint,
        researchContext: research,
        category,
      }),
    });
    const d4 = await r4.json();
    mdx = mdx.replace('STAGE4_PLACEHOLDER', d4.featuredImagePath ?? '');

    // Extract slug from frontmatter
    const slugMatch = mdx.match(/^slug:\s*"?([a-z0-9-]+)"?/m);
    const rawSlug = slugMatch?.[1] ?? `auto-${Date.now()}`;
    const slug = rawSlug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    // Publish to GitHub
    await githubWriteFile(
      `content/news/${slug}.mdx`,
      mdx,
      `Auto-publish (${category}): ${slug}`,
    );

    return NextResponse.json({
      success: true,
      slug,
      category,
      featuredImage: d4.featuredImagePath,
      startedAt,
      finishedAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[auto-publish]', msg);
    return NextResponse.json({ error: msg, category, startedAt }, { status: 500 });
  }
}
