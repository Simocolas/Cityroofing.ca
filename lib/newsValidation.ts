// AI news article validation — pure functions, no I/O.
// Used by:
//   1. Pipeline finalizer (lib/newsPipeline.ts) — to compute status before commit
//   2. Cron route — same finalizer call path
//   3. CLI script `npm run validate-news` — to audit existing files
//
// The output drives the published/draft/rejected gate per the spec:
//   - rejected:  no external sources OR invalid dates OR unsupported insurance
//                guarantee phrases
//   - published: overall >= 8 AND sourceStrength >= 7 AND >= 2 external sources
//                AND no high-risk review flags AND no errors
//   - draft:     anything else (recoverable — needs human review)
//
// Strict mode (`opts.strict = true`) is for the new schema only — used by CI
// or pre-publish checks. Default (lax) mode tolerates the existing 10
// hand-written articles that don't have the new GEO blocks.

import type { ArticleSource, PostFrontmatter, QualityScore } from '@/lib/mdx';

const ALLOWED_CATEGORIES = new Set([
  'Roofing Maintenance',
  'Emergency Repair',
  'Material Guide',
  'Local Weather Tips',
  'Cost & Financing',
  'Insurance Claims',
]);

const ALLOWED_STATUS = new Set(['published', 'draft', 'scheduled']);

const SITE_HOSTS = ['calgarycityroofing.com', 'www.calgarycityroofing.com'];

// Phrases that promise unsupported insurance / legal / pricing outcomes.
// These are hard rejects regardless of context.
const UNSUPPORTED_GUARANTEE_PATTERNS = [
  /\binsurers?\s+(?:require|guarantee|will\s+cover|must\s+cover|always\s+cover)\b/i,
  /\bguarantees?\s+full\s+payout\b/i,
  /\bguaranteed\s+(?:insurance\s+)?coverage\b/i,
  /\bwill\s+(?:always|definitely)\s+(?:cover|pay)\b/i,
  /\b(?:every|all)\s+insurers?\s+(?:cover|pay)\b/i,
];

// Vague attributions — only flagged if NOT followed by a concrete citation
// (URL, "according to <Publication>", or a Source bracket like [1]) within
// 220 chars. Soft warning by default; reviewFlag in strict mode.
const VAGUE_ATTRIBUTION_PATTERNS = [
  /\bstudies?\s+show\b/i,
  /\bexperts?\s+say\b/i,
  /\bmany\s+insurers\b/i,
  /\brecent\s+reports?\b/i,
  /\bresearch\s+suggests?\b/i,
  /\bit\s+is\s+widely\s+known\b/i,
];

// AI-cliché phrases the spec already bans in WRITER_SYSTEM. We re-check at
// validation time because LLMs occasionally slip them through.
const BANNED_AI_PHRASES = [
  /\bdelve\s+into\b/i,
  /\bin\s+today'?s\s+world\b/i,
  /\bin\s+conclusion\b/i,
  /\blook\s+no\s+further\b/i,
  /\bit\s+is\s+important\s+to\s+note\b/i,
  /\bcommitment\s+to\s+excellence\b/i,
  /\bunlock\s+the\s+power\b/i,
];

// MAX age (days) for cited sources. Older than this and the sourceStrength
// score is capped at 6 unless the article is explicitly evergreen-tagged.
const MAX_SOURCE_AGE_DAYS = 90;

export interface ValidationOptions {
  strict?: boolean;
  /** Quality score from the research stage. Pipeline overrides this with
   *  computed values where possible (e.g., source counts), but the LLM-rated
   *  signals like newsRelevance / roofingExpertValue come from research. */
  qualityScore?: QualityScore;
  /** Review flags surfaced by upstream stages — pipeline merges them in. */
  upstreamReviewFlags?: string[];
}

export interface ValidationResult {
  // Decision
  computedStatus: 'published' | 'draft' | 'rejected';
  rejectReason: string | null; // populated when status === 'rejected'

  // Flag buckets
  errors: string[]; // hard issues (rejection-eligible)
  warnings: string[]; // soft issues
  reviewFlags: string[]; // surfaced in admin UI

  // Counts
  externalLinks: number;
  internalLinks: number;
  externalSources: number; // distinct external URLs in body
  wordCount: number;

  // Section presence
  hasQuickAnswer: boolean;
  hasKeyTakeaways: boolean;
  hasFAQ: boolean;
  hasSourcesBlock: boolean;
  hasChecklistOrTable: boolean;

  // Self-consistency
  frontmatterSourcesMatchBody: boolean;

  // Computed score (caps the LLM-reported one)
  effectiveQualityScore: QualityScore;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function isValidIsoDate(s?: string | null): s is string {
  return !!s && Number.isFinite(new Date(s).getTime());
}

function extractUrls(body: string): string[] {
  // Markdown links [text](url) and bare https URLs
  const md = [...body.matchAll(/\[[^\]]+\]\((https?:\/\/[^\s)]+)\)/g)].map((m) => m[1]);
  const bare = [...body.matchAll(/(?<!\()(?<!])(https?:\/\/[^\s<)]+)/g)].map((m) => m[1]);
  return [...md, ...bare];
}

function isExternalUrl(url: string): boolean {
  try {
    const host = new URL(url).host.replace(/^www\./, '');
    return !SITE_HOSTS.some((h) => host === h.replace(/^www\./, ''));
  } catch {
    return false;
  }
}

function isInternalLink(url: string): boolean {
  if (url.startsWith('/')) return true;
  try {
    const host = new URL(url).host.replace(/^www\./, '');
    return SITE_HOSTS.some((h) => host === h.replace(/^www\./, ''));
  } catch {
    return false;
  }
}

function vagueAttributionWithoutCitation(body: string): string[] {
  const findings: string[] = [];
  for (const re of VAGUE_ATTRIBUTION_PATTERNS) {
    const matches = [...body.matchAll(new RegExp(re.source, re.flags + 'g'))];
    for (const m of matches) {
      const start = m.index ?? 0;
      const window = body.slice(start, start + 220);
      const hasCitation =
        /https?:\/\//.test(window) ||
        /according\s+to\s+[A-Z]/.test(window) ||
        /\[\d+\]/.test(window);
      if (!hasCitation) findings.push(m[0]);
    }
  }
  return findings;
}

function unsupportedGuaranteeFindings(body: string): string[] {
  const findings: string[] = [];
  for (const re of UNSUPPORTED_GUARANTEE_PATTERNS) {
    const m = body.match(re);
    if (m) findings.push(m[0]);
  }
  return findings;
}

function bannedPhraseFindings(body: string): string[] {
  const findings: string[] = [];
  for (const re of BANNED_AI_PHRASES) {
    const m = body.match(re);
    if (m) findings.push(m[0]);
  }
  return findings;
}

function countWords(body: string): number {
  // Strip frontmatter, MDX components, code fences, then count
  const stripped = body
    .replace(/^---[\s\S]*?---\n?/, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '');
  return stripped.split(/\s+/).filter((w) => /[a-zA-Z]/.test(w)).length;
}

// ── Main validator ───────────────────────────────────────────────────────────

export function validateArticle(
  frontmatter: PostFrontmatter,
  body: string,
  opts: ValidationOptions = {},
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const reviewFlags: string[] = [...(opts.upstreamReviewFlags ?? [])];

  // ── Frontmatter integrity ──
  if (!frontmatter.title) errors.push('Missing title');
  if (!frontmatter.slug) errors.push('Missing slug');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(frontmatter.slug ?? '')) {
    errors.push(`Invalid slug format: ${frontmatter.slug}`);
  }
  if (!frontmatter.category || !ALLOWED_CATEGORIES.has(frontmatter.category)) {
    errors.push(`Invalid category: ${frontmatter.category}`);
  }
  if (!frontmatter.status || !ALLOWED_STATUS.has(frontmatter.status)) {
    errors.push(`Invalid status: ${frontmatter.status}`);
  }

  // ── Date validity (the Invalid Date bug fence) ──
  const dateValid = isValidIsoDate(frontmatter.date);
  const datePublishedValid = isValidIsoDate(frontmatter.datePublished);
  const dateModifiedValid = isValidIsoDate(frontmatter.dateModified);

  if (!dateValid && !datePublishedValid) {
    errors.push('No valid date or datePublished');
  }
  if (frontmatter.dateModified && !dateModifiedValid) {
    errors.push(`Invalid dateModified: ${frontmatter.dateModified}`);
  }
  if (opts.strict && !datePublishedValid) {
    warnings.push('Strict mode: datePublished missing or invalid');
  }
  if (opts.strict && !dateModifiedValid) {
    warnings.push('Strict mode: dateModified missing or invalid');
  }

  // ── Description / excerpt ──
  const descLen = (frontmatter.description ?? '').length;
  if (descLen === 0) {
    if (opts.strict) errors.push('Missing description');
    else warnings.push('Missing description');
  } else if (descLen < 140 || descLen > 155) {
    warnings.push(`description length ${descLen} (target 140–155)`);
  }
  const excerptLen = (frontmatter.excerpt ?? '').length;
  if (excerptLen > 200) warnings.push(`excerpt length ${excerptLen} (max 200)`);

  // ── Featured image ──
  if (frontmatter.featuredImage === 'STAGE4_PLACEHOLDER') {
    errors.push('featuredImage placeholder was not replaced');
  }

  // ── Body — links and sources ──
  const allUrls = extractUrls(body);
  const externalUrls = [...new Set(allUrls.filter(isExternalUrl))];
  const internalUrls = allUrls.filter(isInternalLink);
  const externalLinks = externalUrls.length;
  const externalSources = externalUrls.length;
  const internalLinks = internalUrls.length;

  if (externalSources < 2) {
    errors.push(`Only ${externalSources} external source(s); need >= 2`);
  }
  if (internalLinks < 2) {
    warnings.push(`Only ${internalLinks} internal link(s); aim for >= 2`);
  }

  // ── Banned / unsupported phrases ──
  const guarantees = unsupportedGuaranteeFindings(body);
  if (guarantees.length > 0) {
    errors.push(`Unsupported insurance guarantee phrasing: "${guarantees.join('", "')}"`);
  }
  const vague = vagueAttributionWithoutCitation(body);
  if (vague.length > 0) {
    reviewFlags.push(`Vague attribution without citation: "${vague.join('", "')}"`);
  }
  const banned = bannedPhraseFindings(body);
  if (banned.length > 0) {
    warnings.push(`Banned AI phrases detected: "${banned.join('", "')}"`);
  }

  // ── Required sections ──
  const hasQuickAnswer = /\*\*Quick Answer:\*\*/.test(body) || /^##\s+Quick Answer/im.test(body);
  const hasKeyTakeaways = /^##\s+Key Takeaways?/im.test(body);
  const hasFAQ =
    /^##\s+Frequently Asked Questions/im.test(body) ||
    /^##\s+FAQ/im.test(body) ||
    /\*\*Q:\s*/i.test(body);
  const hasSourcesBlock =
    /^##\s+Sources/im.test(body) ||
    /^##\s+What\s+this\s+is\s+based\s+on/im.test(body);
  const hasChecklist = /(?:^|\n)(?:[-*]\s+.+\n){5,}/m.test(body);
  const hasTable = /^\|.+\|\s*\n\|[\s|:-]+\|/m.test(body);
  const hasChecklistOrTable = hasChecklist || hasTable;

  if (!hasQuickAnswer) {
    if (opts.strict) errors.push('Missing Quick Answer block');
    else warnings.push('Missing Quick Answer block');
  }
  if (!hasFAQ && opts.strict) {
    warnings.push('Strict mode: no FAQ section detected');
  }
  if (opts.strict && !hasKeyTakeaways) {
    warnings.push('Strict mode: no Key Takeaways section');
  }
  if (opts.strict && !hasSourcesBlock) {
    warnings.push('Strict mode: no Sources / What this is based on section');
  }
  if (opts.strict && !hasChecklistOrTable) {
    warnings.push('Strict mode: no homeowner checklist or comparison table');
  }

  // ── Word count ──
  const wordCount = countWords(body);
  if (wordCount < 700) warnings.push(`Body word count ${wordCount} (target 900–1400)`);
  if (wordCount > 1600) warnings.push(`Body word count ${wordCount} (target 900–1400)`);

  // ── Frontmatter sources ↔ visible sources reconciliation ──
  const fmSources: ArticleSource[] = frontmatter.sources ?? [];
  let frontmatterSourcesMatchBody = true;
  if (fmSources.length > 0) {
    const fmUrls = new Set(fmSources.map((s) => s.url).filter(Boolean));
    const bodyUrls = new Set(externalUrls);
    for (const u of fmUrls) {
      if (!bodyUrls.has(u)) {
        frontmatterSourcesMatchBody = false;
        reviewFlags.push(`Frontmatter source not cited in body: ${u}`);
      }
    }
  }

  // ── Source recency ──
  if (fmSources.length > 0) {
    const now = Date.now();
    let stale = 0;
    for (const s of fmSources) {
      if (!s.publishedDate) continue;
      const t = new Date(s.publishedDate).getTime();
      if (!Number.isFinite(t)) {
        reviewFlags.push(`Source date unparseable: ${s.publishedDate}`);
        continue;
      }
      const ageDays = (now - t) / 86_400_000;
      if (ageDays > MAX_SOURCE_AGE_DAYS) stale++;
    }
    if (stale > 0 && stale === fmSources.length) {
      warnings.push(`All ${stale} cited sources older than ${MAX_SOURCE_AGE_DAYS} days`);
    }
  }

  // ── Effective quality score (LLM input clipped by reality) ──
  const llm = opts.qualityScore ?? {};
  const effectiveQualityScore: QualityScore = {
    ...llm,
    sourceStrength: Math.min(
      llm.sourceStrength ?? 5,
      externalSources >= 3 ? 10 : externalSources >= 2 ? 7 : 4,
    ),
    geoExtractability:
      llm.geoExtractability ??
      (hasQuickAnswer && hasKeyTakeaways && hasSourcesBlock ? 8 : hasQuickAnswer ? 6 : 4),
  };
  // overall: pipeline can override; if missing, average non-null subscores
  if (effectiveQualityScore.overall == null) {
    const subscores = [
      effectiveQualityScore.newsRelevance,
      effectiveQualityScore.calgarySpecificity,
      effectiveQualityScore.sourceStrength,
      effectiveQualityScore.roofingExpertValue,
      effectiveQualityScore.seoPotential,
      effectiveQualityScore.geoExtractability,
      effectiveQualityScore.conversionRelevance,
    ].filter((n): n is number => typeof n === 'number');
    if (subscores.length > 0) {
      effectiveQualityScore.overall =
        Math.round((subscores.reduce((a, b) => a + b, 0) / subscores.length) * 10) / 10;
    }
  }

  // ── Compute final status ──
  let computedStatus: 'published' | 'draft' | 'rejected';
  let rejectReason: string | null = null;

  // Hard rejects (per user spec, choice 1)
  if (errors.some((e) => e.includes('No valid date'))) {
    computedStatus = 'rejected';
    rejectReason = 'invalid date';
  } else if (errors.some((e) => e.includes('external source'))) {
    computedStatus = 'rejected';
    rejectReason = 'no external sources';
  } else if (errors.some((e) => e.includes('Unsupported insurance guarantee'))) {
    computedStatus = 'rejected';
    rejectReason = 'unsupported insurance guarantee phrasing';
  } else if (errors.length > 0) {
    // Other errors → draft, not reject (recoverable with edit)
    computedStatus = 'draft';
  } else {
    // Quality gate
    const overall = effectiveQualityScore.overall ?? 0;
    const sourceStrength = effectiveQualityScore.sourceStrength ?? 0;
    const highRiskFlags = reviewFlags.filter((f) =>
      /unsupported|legal|insurance\s+guarantee|stale|denied/i.test(f),
    );
    if (
      overall >= 8 &&
      sourceStrength >= 7 &&
      externalSources >= 2 &&
      highRiskFlags.length === 0
    ) {
      computedStatus = 'published';
    } else {
      computedStatus = 'draft';
    }
  }

  return {
    computedStatus,
    rejectReason,
    errors,
    warnings,
    reviewFlags,
    externalLinks,
    internalLinks,
    externalSources,
    wordCount,
    hasQuickAnswer,
    hasKeyTakeaways,
    hasFAQ,
    hasSourcesBlock,
    hasChecklistOrTable,
    frontmatterSourcesMatchBody,
    effectiveQualityScore,
  };
}
