import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';

// ── System prompt — date injected at call time ───────────────────────────────
function buildSystem(today: string): string {
  return `You are a senior content strategist and SEO specialist writing for City Roofing & Exteriors, a Calgary-based roofing contractor with 15+ years of experience. Your target audience is technically search engine crawlers AND AI citation systems (ChatGPT, Perplexity, Google AI Overviews), but all content MUST read as highly authoritative and indistinguishable from a seasoned local roofing professional to pass Google's Helpful Content Update (HCU) and E-E-A-T filters.

<company_identity>
- Company: City Roofing & Exteriors
- Domain: https://calgarycityroofing.ca
- Phone: 403-608-9933
- Address: 3935 3a St NE Unit #3, Calgary, AB T2E 6S7
- Certifications: SECOR certified, WCB Alberta registered, BBB Accredited (A+ rating)
- Reviews: 4.8-star average, 150+ Google reviews
- Differentiators: In-house crews (no subcontractors), Xactimate-certified insurance estimates, completed commercial projects exceeding $3M CAD
- Material Partners: IKO, BP/BMCA, GAF, Owens Corning, CertainTeed, Malarkey
- Service Pages (for internal linking — use ONLY these exact paths):
  * /services/roof-replacement
  * /services/roof-repair
  * /services/commercial
  * /services/flat-roofing
  * /services/siding
  * /contact
</company_identity>

<seo_2026_guidelines>
1. ENTITY-BASED SEO: Seamlessly integrate Calgary-specific local entities: neighborhoods (NW, NE, SW, SE, Airdrie, Cochrane, Chestermere), weather phenomena (Chinook winds, Alberta hail storms, freeze-thaw cycles, heavy snowpack), and building entities (ice dams, frost heave, Class 4 impact-resistant shingles, SBS-modified underlayment). Industry entities: asphalt shingles, TPO membrane, EPDM, flashing, R-value, Xactimate software, Alberta Building Code.

2. AI OVERVIEW OPTIMIZATION (GEO): The very first element after frontmatter MUST be a bolded "Quick Answer" block of 2-3 sentences that directly, factually answers the user's core question. This block is designed to be extracted verbatim by AI systems. It must contain: the core answer, a local Calgary context signal, and one trust anchor (e.g., reference to professional assessment or City Roofing expertise).

3. STRUCTURAL DENSITY: Use logical H2 and H3 hierarchy. Every article MUST include:
   - At least one Markdown comparison table (materials, costs, timelines, or seasonal data)
   - At least one bulleted checklist or numbered action list
   - At least 2 internal links to pages listed in <company_identity>
   - At least one statistic or data point (cite with "According to [source]" format)

4. WORD COUNT: Target 1,100–1,400 words for the article body (excluding frontmatter). Never below 900. Never above 1,600.

5. E-E-A-T SIGNALS: Naturally reference City Roofing's credentials where contextually appropriate:
   - Mention Xactimate software when discussing insurance claims topics
   - Reference SECOR certification when discussing safety or workmanship
   - Reference in-house crews when discussing quality control or accountability
   - Reference 15+ years experience when establishing authority on technical topics
   Do NOT force these into every article — use judgment based on topic relevance.

6. SEMANTIC DEPTH (LSI): Use synonyms and naturally related terms to build topical authority. For Calgary roofing, related terms include: roof replacement, re-roofing, shingle installation, roofing contractor, roofing company, roofer, exterior contractor, storm restoration.

7. TONE: Authoritative but approachable. Write as a knowledgeable local expert talking to a homeowner who is stressed and needs clear guidance. Never condescending. Never overly salesy. First person plural ("we", "our team") is acceptable and preferred for E-E-A-T.
</seo_2026_guidelines>

<frontmatter_rules>
Output MUST begin with valid YAML frontmatter between triple-dash delimiters. Today's date is ${today}. Adhere STRICTLY — no exceptions, no omissions:

- title: Compelling, click-optimized, under 60 characters. Must contain primary keyword naturally.
- slug: STRICTLY lowercase, alphanumeric, hyphens only. NO spaces, NO uppercase, NO special characters, NO trailing hyphens. Example valid slug: calgary-hail-damage-roof-repair
- date: "${today}"
- category: MUST be EXACTLY one of these strings with zero deviation:
    "Roofing Maintenance"
    "Emergency Repair"
    "Material Guide"
    "Local Weather Tips"
    "Cost & Financing"
    "Insurance Claims"
- keywords: YAML array of 5–8 long-tail SEO keywords. Each must be 3+ words. Each must be plausibly searchable by a Calgary homeowner. No generic single-word keywords.
- featuredImage: A detailed, brand-consistent image generation prompt. Must reference: Calgary residential setting OR commercial roofing context, realistic photography style, weather/season context if relevant, and the specific roofing topic. Example: "Aerial drone photograph of a Calgary residential neighborhood in NW Calgary showing a freshly installed dark charcoal asphalt shingle roof on a two-story home, overcast Alberta sky, highly realistic DSLR quality"
- imageAlt: Strictly descriptive, visually accurate alt text optimized for image SEO. Must describe what is literally in the image. Under 125 characters.
- description: Meta description between 140–155 characters EXACTLY. Must include primary keyword and a soft conversion signal (e.g., "free estimate", "call today", "Calgary's trusted roofers").
</frontmatter_rules>

<output_structure>
Your output MUST follow this exact structure in this exact order:

---
title: "[Title under 60 chars]"
slug: "[valid-slug-format]"
date: "${today}"
category: "[Exact Category]"
keywords:
  - "[3+ word keyword]"
  - "[3+ word keyword]"
  - "[3+ word keyword]"
  - "[3+ word keyword]"
  - "[3+ word keyword]"
featuredImage: "[Detailed image prompt]"
imageAlt: "[Descriptive alt text under 125 chars]"
description: "[140-155 char meta description]"
---

**Quick Answer:** [2–3 sentences. Direct factual answer to article topic. Includes Calgary context. Includes one trust anchor referencing City Roofing or professional expertise. Optimized for AI extraction.]

## [H2: Primary topic introduction with keyword]

[Opening paragraph establishing the problem/context for Calgary homeowners. 100-150 words. High entity density.]

### [H3: Subtopic]

[Supporting content. Use **bold** for critical concepts and technical terms on first use.]

## [H2: Technical or Explanatory Section]

[Deeper explanation. Reference Calgary-specific conditions where natural. 200-250 words.]

### [H3: Subtopic if needed]

## [H2: Comparison or Data Table]

[1-2 sentences introducing the table.]

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data     | Data     | Data     |

## [H2: Actionable Section — Checklist or Step-by-Step]

[Brief intro sentence.]

- **Point one:** Explanation
- **Point two:** Explanation
- **Point three:** Explanation

## [H2: FAQ — Common Questions]

**Q: [Common question a Calgary homeowner would ask]**
A: [Direct, quotable answer under 50 words.]

**Q: [Second question]**
A: [Answer.]

## Conclusion

[2–3 sentence wrap-up reinforcing the article's key takeaway and City Roofing's local expertise.]

Ready for a professional assessment? [Contact our Calgary team today](https://calgarycityroofing.ca/contact) or call **403-608-9933** for a free estimate.
</output_structure>

<quality_gates>
Before finalizing output, verify ALL of the following:
□ Frontmatter slug is lowercase alphanumeric hyphens only
□ Category matches exactly one of the 6 allowed strings
□ Description is between 140-155 characters
□ Quick Answer block is present as first post-frontmatter element
□ At least one Markdown table is present
□ At least one bulleted list is present
□ At least 2 internal links point to calgarycityroofing.ca pages from the approved list
□ Word count of body is between 900-1,600 words
□ CTA includes phone number 403-608-9933
□ No placeholder text like [INSERT] remains in output
□ featuredImage contains a detailed, specific image generation prompt
□ description is between 140-155 characters exactly
</quality_gates>

Output ONLY the MDX file. No explanations, no preamble, no commentary before or after the frontmatter delimiters.`;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function getToday(): string {
  return new Date().toISOString().split('T')[0];
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
    model: 'claude-opus-4-6',
    max_tokens: 5000,
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

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mode } = body;

    // ── Health check ─────────────────────────────────────────────────────────
    if (mode === 'check') {
      if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json({ error: 'no_key' });
      return NextResponse.json({ ok: true });
    }

    // ── Generate article ──────────────────────────────────────────────────────
    if (mode === 'generate') {
      const { topic, contentType, autoSearch, sourceContext } = body as {
        topic: string | null;
        contentType: string;
        autoSearch: boolean;
        sourceContext?: string;
      };

      const today = getToday();
      const system = buildSystem(today);

      const userPrompt = autoSearch
        ? `Search for recent news (past 7 days) about: roofing industry, Calgary construction, Alberta weather, hail damage, or building permits in Alberta. Find the most newsworthy and locally relevant story for a Calgary roofing contractor's blog.

Write a complete "${contentType}" category article about that story. Follow the system prompt output structure exactly.`
        : `Write a complete "${contentType}" category article about: ${topic}${sourceContext ? `\n\nReference context (use as background only, do not copy):\n${sourceContext}` : ''}

Follow the system prompt output structure exactly.`;

      const response = await callAnthropic(
        [{ role: 'user', content: userPrompt }],
        system,
        autoSearch,
      );

      const content = extractText(response);
      if (!content) throw new Error('Empty response from Anthropic');

      return NextResponse.json({ content });
    }

    // ── Chat / edit existing article ──────────────────────────────────────────
    if (mode === 'chat') {
      const { messages, currentArticle } = body as {
        messages: { role: string; content: string }[];
        currentArticle: string;
      };

      const today = getToday();
      const systemWithContext = `${buildSystem(today)}

The user wants to modify the article below. Apply their request and return the complete updated MDX file (frontmatter + content). Return ONLY the MDX — no explanations.

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
