import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';

const SYSTEM = `You are a content writer for City Roofing & Exteriors, a Calgary roofing contractor. Write from the company perspective.

Company facts:
- 15+ years serving Calgary
- 158 Google reviews, 4.8 stars
- SECOR certified, WCB Alberta registered, BBB Accredited
- Phone: 403-608-9933
- In-house crew, no subcontracting
- Xactimate-certified estimator for insurance claims

Writing rules:
- First 200 words: Quick Answer Block (directly answers the main question, must include phone 403-608-9933)
- Include Calgary local context in every article
- Professional but conversational tone
- Never say "we are the best"
- Use real facts and data when available
- End with FAQ section (5-7 questions, conversational homeowner questions) and a Get a Free Estimate CTA
- Output ONLY valid MDX with complete frontmatter — no explanations, no preamble`;

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function getCategoryFromType(contentType: string): string {
  const map: Record<string, string> = {
    'Industry Update': 'industry',
    'Local Calgary News': 'calgary',
    'Maintenance Tips': 'tips',
    'Hail & Storm Alert': 'calgary',
  };
  return map[contentType] ?? 'industry';
}

function extractText(response: { content?: { type: string; text?: string }[] }): string {
  return (response.content ?? [])
    .filter((c) => c.type === 'text')
    .map((c) => c.text ?? '')
    .join('');
}

async function callAnthropic(
  messages: { role: string; content: string }[],
  system: string,
  useWebSearch: boolean,
): Promise<{ content?: { type: string; text?: string }[]; error?: string }> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('no_key');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-api-key': key,
    'anthropic-version': '2023-06-01',
  };

  const body: Record<string, unknown> = {
    model: 'claude-opus-4-5',
    max_tokens: 4096,
    system,
    messages,
  };

  if (useWebSearch) {
    headers['anthropic-beta'] = 'web-search-2025-03-05';
    body.tools = [{ type: 'web_search_20250305', name: 'web_search' }];
  }

  const res = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Anthropic ${res.status}: ${err.slice(0, 200)}`);
  }

  return res.json();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mode } = body;

    // ── Health check ────────────────────────────────────────────────────────────
    if (mode === 'check') {
      if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json({ error: 'no_key' });
      return NextResponse.json({ ok: true });
    }

    // ── Generate article ────────────────────────────────────────────────────────
    if (mode === 'generate') {
      const { topic, contentType, autoSearch } = body as {
        topic: string | null;
        contentType: string;
        autoSearch: boolean;
      };

      const today = getToday();
      const category = getCategoryFromType(contentType);

      const frontmatterTemplate = `---
title: ""
slug: ""
date: "${today}"
lastUpdated: "${today}"
category: "${category}"
excerpt: ""
keywords: []
status: "draft"
featuredImage: ""
imageAlt: ""
faqItems:
  - q: ""
    a: ""
author: "City Roofing & Exteriors"
geo:
  city: "Calgary"
  province: "Alberta"
  country: "Canada"
---`;

      const userPrompt = autoSearch
        ? `Search for recent news (past 7 days) about: roofing industry, Calgary construction, Alberta weather, hail damage, or building permits in Alberta. Find the most relevant and timely story for a Calgary roofing contractor's blog.

Then write a complete ${contentType} article about that story.

Output a complete MDX file using this frontmatter, filling in all fields:
${frontmatterTemplate}

Requirements:
- First 200 words: Quick Answer Block answering the main question, including "Call 403-608-9933"
- 3–5 H2 sections with Calgary context
- FAQ section with 5–7 conversational homeowner questions (use faqItems frontmatter)
- End with Get a Free Estimate CTA mentioning 403-608-9933`
        : `Write a ${contentType} article about: ${topic}

Output a complete MDX file using this frontmatter, filling in all fields:
${frontmatterTemplate}

Requirements:
- First 200 words: Quick Answer Block answering the main question, including "Call 403-608-9933"
- 3–5 H2 sections with Calgary context
- FAQ section with 5–7 conversational homeowner questions (use faqItems frontmatter)
- End with Get a Free Estimate CTA mentioning 403-608-9933`;

      const response = await callAnthropic(
        [{ role: 'user', content: userPrompt }],
        SYSTEM,
        autoSearch,
      );

      const content = extractText(response);
      if (!content) throw new Error('Empty response from Anthropic');

      return NextResponse.json({ content });
    }

    // ── Chat / edit existing article ────────────────────────────────────────────
    if (mode === 'chat') {
      const { messages, currentArticle } = body as {
        messages: { role: string; content: string }[];
        currentArticle: string;
      };

      const systemWithContext = `${SYSTEM}

The user wants to modify this existing article. Apply their request and return the complete updated MDX file (frontmatter + content). Do not add explanations — return only the MDX.

CURRENT ARTICLE:
${currentArticle}`;

      const response = await callAnthropic(messages, systemWithContext, false);
      const content = extractText(response);

      return NextResponse.json({ content });
    }

    return NextResponse.json({ error: 'Unknown mode' }, { status: 400 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[news-generator]', msg);
    if (msg === 'no_key') return NextResponse.json({ error: 'no_key' }, { status: 500 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
