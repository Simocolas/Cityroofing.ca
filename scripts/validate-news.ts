#!/usr/bin/env tsx
// Audit existing content/news/*.mdx files against the new-pipeline schema.
//
// Usage:
//   npm run validate-news            # lax mode — tolerates legacy articles
//   npm run validate-news -- --strict # strict mode — full new-schema check
//
// Exit code:
//   0 = no errors at the chosen mode
//   1 = at least one rejected or errored article
//
// Lax mode is the default so the existing 10 hand-written articles pass.
// Strict mode is for CI / pre-publish gating once everything has migrated.

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { validateArticle } from '../lib/newsValidation';
import type { PostFrontmatter } from '../lib/mdx';

const NEWS_DIR = path.join(process.cwd(), 'content/news');
const strict = process.argv.includes('--strict');

interface ReportRow {
  slug: string;
  status: string;
  computed: string;
  errors: number;
  warnings: number;
  flags: number;
  details: { errors: string[]; warnings: string[]; flags: string[] };
}

function pad(s: string, n: number): string {
  return s.length >= n ? s.slice(0, n) : s + ' '.repeat(n - s.length);
}

function main(): void {
  if (!fs.existsSync(NEWS_DIR)) {
    console.error(`Not found: ${NEWS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(NEWS_DIR).filter((f) => f.endsWith('.mdx') && f !== 'template.mdx');

  console.log(`\nValidating ${files.length} articles in ${strict ? 'STRICT' : 'lax'} mode\n`);
  console.log(pad('Slug', 56) + pad('Status', 12) + pad('Computed', 12) + 'E / W / F');
  console.log('-'.repeat(96));

  const rows: ReportRow[] = [];
  let totalErrors = 0;
  let totalRejected = 0;

  for (const file of files) {
    const raw = fs.readFileSync(path.join(NEWS_DIR, file), 'utf-8');
    const { data, content } = matter(raw);
    const frontmatter = data as PostFrontmatter;
    const slug = file.replace('.mdx', '');

    const result = validateArticle(frontmatter, content, { strict });

    rows.push({
      slug,
      status: frontmatter.status ?? '—',
      computed: result.computedStatus,
      errors: result.errors.length,
      warnings: result.warnings.length,
      flags: result.reviewFlags.length,
      details: {
        errors: result.errors,
        warnings: result.warnings,
        flags: result.reviewFlags,
      },
    });

    if (result.errors.length > 0) totalErrors++;
    if (result.computedStatus === 'rejected') totalRejected++;

    const computedDisplay =
      result.computedStatus === 'rejected'
        ? `\x1b[31m${result.computedStatus}\x1b[0m`
        : result.computedStatus === 'published'
        ? `\x1b[32m${result.computedStatus}\x1b[0m`
        : `\x1b[33m${result.computedStatus}\x1b[0m`;

    console.log(
      pad(slug, 56) +
        pad(frontmatter.status ?? '—', 12) +
        pad(result.computedStatus, 12) +
        `${result.errors.length} / ${result.warnings.length} / ${result.reviewFlags.length}` +
        (result.computedStatus !== frontmatter.status ? '  [drift]' : ''),
    );
  }

  console.log('\nDetails for articles with issues:');
  console.log('-'.repeat(96));
  for (const r of rows) {
    if (r.errors === 0 && r.warnings === 0 && r.flags === 0) continue;
    console.log(`\n● ${r.slug}  (${r.status} → ${r.computed})`);
    for (const e of r.details.errors) console.log(`  \x1b[31merror\x1b[0m   ${e}`);
    for (const w of r.details.warnings) console.log(`  \x1b[33mwarn\x1b[0m    ${w}`);
    for (const f of r.details.flags) console.log(`  \x1b[36mflag\x1b[0m    ${f}`);
  }

  console.log(
    `\n${files.length} articles · ${totalErrors} with errors · ${totalRejected} would be rejected\n`,
  );

  process.exit(totalRejected > 0 || (strict && totalErrors > 0) ? 1 : 0);
}

main();
