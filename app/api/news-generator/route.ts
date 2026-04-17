import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';

// ── Stage 1: News Intelligence System Prompt ─────────────────────────────────
const RESEARCH_SYSTEM = `You are a news intelligence researcher and content strategist for City Roofing & Exteriors, a Calgary roofing contractor. Your job is NOT to find roofing articles. Your job is to find high-traffic, high-relevance Canadian news and identify how a Calgary roofing professional would uniquely comment on it.

SEARCH PHILOSOPHY:
Think like a local expert watching the national news and saying "this is exactly why Calgary homeowners need to pay attention to their roofs right now."

SCOPE — search across ALL of these categories, not just roofing:
- Canadian housing market (prices, mortgage rates, CMHC data, rental crisis, new builds)
- Insurance industry (premium hikes, claim disputes, coverage changes, flood/fire payouts)
- Climate and extreme weather (wildfires BC/Alberta, flooding Manitoba/Quebec, ice storms Ontario, hail events anywhere in Canada)
- Construction and trades (labour shortages, material cost inflation, building code updates, supply chain)
- Cost of living (renovation costs, home maintenance, energy efficiency rebates, federal/provincial incentives)
- Municipal news (Calgary city council decisions, development permits, infrastructure investment)
- Public health and safety (mould outbreaks, structural failures, indoor air quality, storm damage evacuations)
- Real estate (home inspections, pre-sale renovations, property value impacts, buyer conditions)
- Federal/provincial policy (carbon pricing impact on materials, trade tariffs on lumber/steel, renovation tax credits)

SOURCE PRIORITY:
Tier 1: CBC News, Globe and Mail, National Post, CTV News, Global News, Toronto Star
Tier 2: Calgary Herald, Calgary Sun, Edmonton Journal, Financial Post
Tier 3: Canadian Underwriter, Construction Canada, Canadian Contractor magazine, CMHC reports
Tier 4: Statistics Canada, Environment and Climate Change Canada, provincial government releases

REJECT: opinion blogs with no byline, Reddit, social media posts, US-focused sources unless directly relevant to Canada.

CONNECTION TEST — for each news story found, ask:
"How does a Calgary roofing contractor with 15 years experience, Xactimate certification, and in-house crews respond to this news professionally?"
If the answer is specific and interesting, the story passes. If it's generic, keep searching.

APPROVED INTERNAL LINKS (use ONLY these exact paths — no others):
/services/roof-replacement
/services/roof-repair
/services/commercial
/services/flat-roofing
/services/siding
/contact

Return ONLY a valid JSON object — no markdown fences, no preamble, no explanation outside the JSON:

{
  "selected_story": {
    "headline": "Actual headline of the chosen news story",
    "source": "Publication name",
    "url": "Article URL",
    "published_date": "Date published",
    "story_summary": "2-3 sentence factual summary of what the news story is about",
    "why_high_traffic": "Why this story has search volume and public interest right now"
  },
  "connection_bridge": {
    "link_to_roofing": "The specific, non-obvious connection between this news story and roofing, exterior, or home protection in Calgary",
    "professional_angle": "The unique insight a 15-year experienced Calgary roofer would add that a general news article never covers",
    "homeowner_implication": "What Calgary homeowners should actually DO or think about because of this news"
  },
  "supporting_facts": [
    {
      "claim": "A verified fact or statistic that supports the professional angle",
      "source_name": "Source name",
      "source_url": "URL",
      "date": "Date or null"
    }
  ],
  "calgary_local_layer": {
    "local_relevance": "Why this national story hits differently for Calgary specifically — reference local climate, building stock, insurance landscape, or city regulations",
    "calgary_data_point": "Any Calgary or Alberta-specific stat or fact found to localize the story",
    "neighborhood_context": "Which Calgary areas or demographics are most affected, if relevant"
  },
  "technical_entities": ["10-12 SEO anchor terms naturally relevant to this topic-roofing intersection"],
  "eeeat_hooks": ["1-2 moments to reference Xactimate/SECOR/in-house crews/15 years naturally in the context of this specific story"],
  "internal_link_candidates": ["2 most relevant from the approved list"],
  "quick_answer_draft": "2-3 sentences. Starts with the news context. Pivots to the Calgary homeowner implication. Ends with a professional recommendation from City Roofing's perspective. AI-extractable.",
  "suggested_primary_keyword": "The best long-tail keyword this article can realistically rank for given the topic intersection",
  "suggested_title_angle": "One sentence describing the article concept — not the title itself, just the creative direction",
  "best_category": "MUST be exactly one of: Roofing Maintenance | Emergency Repair | Material Guide | Local Weather Tips | Cost & Financing | Insurance Claims"
}`;

// ── Stage 2: Article Writing System Prompt ───────────────────────────────────
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
- Service Pages (use ONLY these exact paths):
  * /services/roof-replacement
  * /services/roof-repair
  * /services/commercial
  * /services/flat-roofing
  * /services/siding
  * /contact
</company_identity>

<seo_2026_guidelines>
1. ENTITY-BASED SEO: Seamlessly integrate Calgary-specific local entities: neighborhoods (NW, NE, SW, SE, Airdrie, Cochrane, Chestermere), weather phenomena (Chinook winds, Alberta hail storms, freeze-thaw cycles, heavy snowpack), and building entities (ice dams, frost heave, Class 4 impact-resistant shingles, SBS-modified underlayment). Industry entities: asphalt shingles, TPO membrane, EPDM, flashing, R-value, Xactimate software, Alberta Building Code.

2. AI OVERVIEW OPTIMIZATION (GEO): The very first element after frontmatter MUST be a bolded "Quick Answer" block of 2-3 sentences that directly, factually answers the user's core question. This block is designed to be extracted verbatim by AI systems. It must contain: the core answer, a local Calgary context signal, and one trust anchor.

3. STRUCTURAL DENSITY: Every article MUST include:
   - At least one Markdown comparison table
   - At least one bulleted checklist or numbered action list
   - At least 2 internal links to approved pages
   - At least one statistic or data point with citation

4. WORD COUNT: 1,100–1,400 words for the article body (excluding frontmatter). Never below 900. Never above 1,600.

5. E-E-A-T SIGNALS: Reference credentials where contextually appropriate — Xactimate for insurance topics, SECOR for safety/workmanship, in-house crews for quality, 15+ years for technical authority. Do NOT force into every article.

6. SEMANTIC DEPTH: Use synonyms and related terms: roof replacement, re-roofing, shingle installation, roofing contractor, roofing company, roofer, exterior contractor, storm restoration.

7. TONE: Authoritative but approachable. Local expert talking to a stressed homeowner. First person plural preferred. Never condescending. Never overly salesy.
</seo_2026_guidelines>

<frontmatter_rules>
Today's date is ${today}. Output MUST begin with valid YAML frontmatter. No exceptions:

- title: Under 60 characters. Contains primary keyword.
- slug: Lowercase, alphanumeric, hyphens only. No spaces. No uppercase. No special characters. No trailing hyphens.
- date: "${today}"
- category: EXACTLY one of: "Roofing Maintenance" | "Emergency Repair" | "Material Guide" | "Local Weather Tips" | "Cost & Financing" | "Insurance Claims"
- keywords: YAML array, 5–8 items, each 3+ words, plausibly searchable by a Calgary homeowner.
- featuredImage: Detailed image generation prompt. Calgary residential or commercial roofing context, realistic photography, weather/season context, specific topic.
- imageAlt: Visually accurate alt text under 125 characters.
- description: Meta description 140–155 characters EXACTLY. Contains primary keyword and conversion signal.
</frontmatter_rules>

<output_structure>
---
title: "[Title under 60 chars]"
slug: "[valid-slug]"
date: "${today}"
category: "[Exact Category]"
keywords:
  - "[3+ word keyword]"
featuredImage: "[Detailed image prompt]"
imageAlt: "[Alt text under 125 chars]"
description: "[140-155 char meta description]"
---

**Quick Answer:** [2–3 sentences. Direct answer. Calgary context. Trust anchor.]

## [H2 with primary keyword]

[100-150 word opening. High entity density.]

### [H3 subtopic]

## [H2 technical section]

## [H2 — Comparison Table]

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data     | Data     | Data     |

## [H2 — Checklist or Steps]

- **Point:** Explanation

## [H2 — FAQ]

**Q: [Calgary homeowner question]**
A: [Answer under 50 words.]

## Conclusion

[2–3 sentences. Key takeaway. City Roofing expertise.]

Ready for a professional assessment? [Contact our Calgary team today](https://calgarycityroofing.ca/contact) or call **403-608-9933** for a free estimate.
</output_structure>

<quality_gates>
Verify before output:
□ slug is lowercase alphanumeric hyphens only
□ category matches exactly one allowed string
□ description is 140-155 characters
□ Quick Answer block is first post-frontmatter element
□ At least one Markdown table present
□ At least one bulleted list present
□ At least 2 internal links from approved list
□ Body word count 900-1,600
□ CTA includes 403-608-9933
□ featuredImage is a detailed generation prompt
□ No placeholder text remains
</quality_gates>

Output ONLY the MDX file. No preamble, no commentary.`;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function extractText(response: { content?: { type: string; text?: string }[] }): string {
  return (response.content ?? [])
    .filter((c) => c.type === 'text')
    .map((c) => c.text ?? '')
    .join('');
}

function extractJson(text: string): Record<string, unknown> | null {
  try {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
  } catch { /* fall through */ }
  return null;
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

    // ── Health check ──────────────────────────────────────────────────────────
    if (mode === 'check') {
      if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json({ error: 'no_key' });
      return NextResponse.json({ ok: true });
    }

    // ── Stage 1 only: Research ────────────────────────────────────────────────
    if (mode === 'research') {
      const { topic, notes } = body as { topic?: string; notes?: string };

      const userPrompt = `Find high-traffic Canadian news and identify the roofing professional angle.

TOPIC DIRECTION: ${topic?.trim() || 'find the most relevant trending story right now'}
EDITOR NOTES: ${notes?.trim() || 'none'}

Prioritize stories published within the last 30 days. Return ONLY valid JSON in the exact structure defined.`;

      const response = await callAnthropic(
        [{ role: 'user', content: userPrompt }],
        RESEARCH_SYSTEM,
        true,
      );

      const raw = extractText(response);
      const research = extractJson(raw);
      if (!research) throw new Error('Research stage returned invalid JSON');

      return NextResponse.json({ research });
    }

    // ── Generate article ──────────────────────────────────────────────────────
    if (mode === 'generate') {
      const { topic, contentType, autoSearch, sourceContext, researchContext } = body as {
        topic: string | null;
        contentType: string;
        autoSearch: boolean;
        sourceContext?: string;
        researchContext?: Record<string, unknown>;
      };

      const today = getToday();
      const system = buildSystem(today);
      let research: Record<string, unknown> | null = researchContext ?? null;

      // Auto mode with no pre-fetched research → run Stage 1 first
      if (autoSearch && !research) {
        const researchPrompt = `Find high-traffic Canadian news and identify the roofing professional angle.

TOPIC DIRECTION: ${topic?.trim() || 'find the most relevant trending story right now'}
EDITOR NOTES: none

Prioritize stories published within the last 30 days. Return ONLY valid JSON in the exact structure defined.`;

        const researchRes = await callAnthropic(
          [{ role: 'user', content: researchPrompt }],
          RESEARCH_SYSTEM,
          true,
        );
        research = extractJson(extractText(researchRes));
      }

      // Build article user prompt
      const userPrompt = research
        ? `Based on the following news research, write a complete article following your output_structure exactly.

RESEARCH CONTEXT:
${JSON.stringify(research, null, 2)}

Your article MUST:
- Use quick_answer_draft as the starting point for the Quick Answer block
- Incorporate professional_angle and supporting_facts naturally
- Target suggested_primary_keyword as the primary SEO focus
- Reflect suggested_title_angle in your title approach
- Use technical_entities for semantic depth
- Include eeeat_hooks where contextually appropriate
- Set category to best_category from the research
- Use ONLY internal links from the approved list in the system prompt`
        : `Write a complete "${contentType}" category article about: ${topic}${sourceContext ? `\n\nReference context (use as background only, do not copy):\n${sourceContext}` : ''}

Follow the system prompt output_structure exactly.`;

      const response = await callAnthropic(
        [{ role: 'user', content: userPrompt }],
        system,
        false,
      );

      const content = extractText(response);
      if (!content) throw new Error('Empty response from Anthropic');

      return NextResponse.json({ content, research });
    }

    // ── Chat / edit ───────────────────────────────────────────────────────────
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
