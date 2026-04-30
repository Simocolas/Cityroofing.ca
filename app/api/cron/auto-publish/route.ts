import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { githubWriteFile } from '@/lib/github';
import {
  runResearch,
  runBlueprint,
  runGenerate,
  runImage,
  injectInlineImages,
  finalizeArticle,
} from '@/lib/newsPipeline';
import type { FinalizeOutput } from '@/lib/newsPipeline';

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
const NOTIFICATION_FROM = 'info@mail.calgarycityroofing.com';
const NOTIFICATION_TO = process.env.NEWS_NOTIFICATION_EMAIL ?? 'info@calgarycityroofing.com';

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

interface NotificationContext {
  category: string;
  startedAt: string;
  finishedAt: string;
  error?: string;
}

async function sendNotification(
  result: FinalizeOutput | null,
  ctx: NotificationContext,
  committedTo: string | null,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[auto-publish] RESEND_API_KEY not set — skipping notification');
    return;
  }

  const resend = new Resend(apiKey);

  const subjectStatus = result
    ? result.status === 'published'
      ? 'Published'
      : result.status === 'draft'
      ? 'Draft saved — needs review'
      : 'Rejected — not committed'
    : 'Pipeline error';
  const subject = `[News cron · ${ctx.category}] ${subjectStatus}${result?.slug ? ` — ${result.slug}` : ''}`;

  const accentColor = !result
    ? '#7f1d1d'
    : result.status === 'published'
    ? '#14532d'
    : result.status === 'draft'
    ? '#92400e'
    : '#7f1d1d';

  const flagsHtml = result?.reviewFlags?.length
    ? `<ul style="margin:8px 0 0;padding-left:20px;color:#374151;font-size:14px;">${result.reviewFlags
        .map((f) => `<li>${escapeHtml(f)}</li>`)
        .join('')}</ul>`
    : '<p style="color:#9ca3af;font-size:13px;margin:6px 0 0;">none</p>';

  const errorsHtml = result?.validation.errors.length
    ? `<ul style="margin:8px 0 0;padding-left:20px;color:#7f1d1d;font-size:14px;">${result.validation.errors
        .map((e) => `<li>${escapeHtml(e)}</li>`)
        .join('')}</ul>`
    : '<p style="color:#9ca3af;font-size:13px;margin:6px 0 0;">none</p>';

  const score = result?.qualityScore ?? {};
  const scoreRows = (
    [
      ['Overall', score.overall],
      ['News relevance', score.newsRelevance],
      ['Calgary specificity', score.calgarySpecificity],
      ['Source strength', score.sourceStrength],
      ['Roofing expert value', score.roofingExpertValue],
      ['SEO potential', score.seoPotential],
      ['GEO extractability', score.geoExtractability],
      ['Conversion relevance', score.conversionRelevance],
    ] as const
  )
    .map(
      ([label, val]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#6b7280;font-size:13px;">${label}</td><td style="padding:4px 0;font-weight:600;color:#111;font-size:13px;">${val ?? '—'}</td></tr>`,
    )
    .join('');

  const html = `<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#111;">
  <div style="border-left:4px solid ${accentColor};padding-left:18px;margin-bottom:24px;">
    <p style="color:#6b7280;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 6px;">News cron · ${escapeHtml(ctx.category)}</p>
    <h1 style="font-size:22px;font-weight:800;margin:0;">${subjectStatus}</h1>
    ${result?.slug ? `<p style="color:#6b7280;font-size:14px;margin:6px 0 0;">${escapeHtml(result.slug)}</p>` : ''}
  </div>

  ${
    !result
      ? `<p style="color:#7f1d1d;font-size:15px;line-height:1.6;background:#fef2f2;padding:14px 16px;border-radius:6px;">Pipeline error: ${escapeHtml(ctx.error ?? 'unknown')}</p>`
      : `
  <h2 style="font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;margin:24px 0 6px;">Result</h2>
  <p style="margin:0;font-size:15px;line-height:1.65;">
    ${result.status === 'published' ? `Committed to <code>content/news/${escapeHtml(result.slug)}.mdx</code>. Vercel is redeploying.` : ''}
    ${result.status === 'draft' ? `Saved as draft to <code>${escapeHtml(committedTo ?? '—')}</code>. Open the admin panel to review and publish manually.` : ''}
    ${result.status === 'rejected' ? `<strong>Not committed.</strong> Reason: ${escapeHtml(result.rejectReason ?? 'unspecified')}.` : ''}
  </p>

  <h2 style="font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;margin:24px 0 6px;">Quality score</h2>
  <table style="border-collapse:collapse;">${scoreRows}</table>

  <h2 style="font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;margin:24px 0 6px;">Errors</h2>
  ${errorsHtml}

  <h2 style="font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;margin:24px 0 6px;">Review flags</h2>
  ${flagsHtml}
  `
  }

  <p style="color:#9ca3af;font-size:12px;margin-top:32px;border-top:1px solid #e5e7eb;padding-top:14px;">
    Started ${escapeHtml(ctx.startedAt)} · Finished ${escapeHtml(ctx.finishedAt)} · Calgary cron, daily 10am MDT
  </p>
</body></html>`;

  try {
    await resend.emails.send({
      from: NOTIFICATION_FROM,
      to: NOTIFICATION_TO,
      subject,
      html,
    });
  } catch (err) {
    console.error('[auto-publish] notification failed', err);
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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

  let finalizeResult: FinalizeOutput | null = null;
  let committedTo: string | null = null;

  try {
    const research = await runResearch({ notes: `Category target: ${category}` });
    const blueprint = await runBlueprint({ researchContext: research, contentType: category });
    let mdx = await runGenerate({
      contentType: category,
      researchContext: research,
      blueprintContext: blueprint,
    });
    const { featuredImagePath, inlinePaths } = await runImage({
      blueprintContext: blueprint,
      researchContext: research,
      category,
    });
    mdx = injectInlineImages(mdx, inlinePaths);

    finalizeResult = finalizeArticle({
      mdx,
      research,
      blueprint,
      featuredImagePath,
    });

    if (finalizeResult.status === 'published') {
      committedTo = `content/news/${finalizeResult.slug}.mdx`;
      await githubWriteFile(
        committedTo,
        finalizeResult.mdx,
        `Auto-publish (${category}): ${finalizeResult.slug}`,
      );
    } else if (finalizeResult.status === 'draft') {
      committedTo = `content/news/drafts/${finalizeResult.slug}.mdx`;
      await githubWriteFile(
        committedTo,
        finalizeResult.mdx,
        `Auto-draft (${category}): ${finalizeResult.slug}`,
      );
    } // rejected → no commit, per project decision A

    const finishedAt = new Date().toISOString();

    // Fire and forget — don't fail the cron if email is down
    await sendNotification(finalizeResult, { category, startedAt, finishedAt }, committedTo);

    return NextResponse.json({
      success: true,
      slug: finalizeResult.slug,
      status: finalizeResult.status,
      rejectReason: finalizeResult.rejectReason,
      committedTo,
      featuredImage: featuredImagePath,
      qualityScore: finalizeResult.qualityScore,
      reviewFlags: finalizeResult.reviewFlags,
      errors: finalizeResult.validation.errors,
      warnings: finalizeResult.validation.warnings,
      category,
      startedAt,
      finishedAt,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[auto-publish]', msg);
    const finishedAt = new Date().toISOString();
    await sendNotification(null, { category, startedAt, finishedAt, error: msg }, null);
    return NextResponse.json({ error: msg, category, startedAt, finishedAt }, { status: 500 });
  }
}
