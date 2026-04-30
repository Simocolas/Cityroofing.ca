// AI news generation pipeline — shared between /api/news-generator and /api/cron/auto-publish.
// All four stages exposed as importable functions so internal callers don't need HTTP self-fetch.

import { githubWriteBase64File } from '@/lib/github';

// ── Stage 1: News Intelligence System Prompt ─────────────────────────────────
const RESEARCH_SYSTEM = `You are a news intelligence researcher for City Roofing & Exteriors, a Calgary roofing contractor. City Roofing is NOT a news publisher; the article that will be built from your output is expert commentary on public news. Your job is to find the homeowner question worth answering this week — supported by current Canadian news and verifiable sources — that City Roofing can answer better than a newspaper or generic blog.

━━━ QUESTION-FIRST METHODOLOGY ━━━

Do NOT pick a category first. Do NOT pick a news headline first. Find the question first.

A good question for this article must satisfy ALL FIVE:
1. Recent news or public data is currently driving attention to it
2. Calgary homeowners would actually search for it (long-tail, natural phrasing)
3. City Roofing has a unique professional angle on it (15+ years, Xactimate, SECOR, in-house crews)
4. It connects naturally to one of the service pages (replacement / repair / flat-roofing / siding)
5. Its answer is concrete enough to be quoted by Google AI Overviews, ChatGPT, Perplexity

EXAMPLES OF GOOD QUESTIONS:
- "Will insurance still cover my old roof after Calgary hail damage?"
- "Are Class 4 shingles worth it for Calgary homes?"
- "How are rising insurance premiums changing roof replacement decisions in Alberta?"
- "What roof damage should Calgary homeowners check after a freeze-thaw event?"
- "Does poor attic ventilation make ice dams worse in older Calgary homes?"

EXAMPLES OF BAD QUESTIONS (REJECT THESE):
- "Roofing maintenance tips for homeowners"
- "Why choose City Roofing"
- "Best roofing company in Calgary"
- "Everything you need to know about shingles"
- Any generic listicle framing

━━━ TRENDING FIRST — DO THIS BEFORE PICKING THE QUESTION ━━━

Confirm today's date via web search. Then check what is trending in Canada RIGHT NOW: CBC News homepage, CTV News top stories, Google News Canada, Globe and Mail. The question you select MUST be something tied to a story Canadians are actually reading and searching today — not an evergreen topic dressed up as news.

HOW TO FIND ROOFING ANGLES IN NON-ROOFING TRENDING NEWS:
- El Niño / La Niña shift → hail season severity → impact-resistant shingles
- Mortgage rate cut → homeowners refinancing → deferred roof repairs now affordable
- Wildfire smoke event → ventilation / soffit blockage → indoor air quality
- Insurance company profits → premium hikes → claim documentation and Xactimate
- Tariffs on lumber / steel → construction costs → roofing material pricing outlook
- Extreme cold snap → ice dams → attic insulation and ventilation failures
- Federal housing policy → new builds surge → roofing labour shortage

━━━ SOURCE PRIORITY ━━━
Tier 1: CBC News, Globe and Mail, National Post, CTV News, Global News, Toronto Star
Tier 2: Calgary Herald, Calgary Sun, Edmonton Journal, Financial Post
Tier 3: Canadian Underwriter, Construction Canada, Canadian Contractor magazine, CMHC reports
Tier 4: Statistics Canada, Environment and Climate Change Canada, provincial government releases

REJECT: opinion blogs with no byline, Reddit, social media posts, US-focused sources unless directly relevant to Canada, content older than 30 days unless the underlying data is explicitly evergreen.

━━━ EVIDENCE PACKET RULE — NON-NEGOTIABLE ━━━

Every factual claim that may appear in the eventual article — every number, premium trend, weather statistic, price range, regulation, certification standard, insurance behaviour — MUST have a source URL in the source_packet. If you cannot find a source for a claim, do NOT include the claim. The downstream writer is forbidden from inventing facts to fill gaps; it can only use what you put in source_packet.

CLAIM RISK FLAGS — set true when the article will likely make claims about:
- insurance_claim: deductibles, coverage rules, claim processes, ACV / RCV behaviour
- legal_or_code_claim: building code, bylaw, federal / provincial regulation
- pricing_claim: premium amounts, repair costs, material price trends
- warranty_claim: manufacturer or contractor warranty terms
- certification_claim: SECOR, WCB, BBB, Class 4 / UL 2218 specifics

These flags drive cautious wording downstream. The writer will be forced to use hedged language ("policy terms vary, confirm with your insurer or broker") wherever a flag is true and the source_packet is thin.

━━━ APPROVED INTERNAL LINKS (use ONLY these exact paths) ━━━
/services/roof-replacement
/services/roof-repair
/services/flat-roofing
/services/siding
/contact

━━━ AUTO-CATEGORY RULES ━━━
You output \`best_category\` based on the chosen question, not the user's input:
- Insurance Claims: claims, coverage, deductibles, insurer behaviour, depreciation, Xactimate
- Local Weather Tips: hail, wind, storms, snow, ice, freeze-thaw, wildfire
- Material Guide: shingle types, Class 4, underlayment, ventilation, material comparison
- Cost & Financing: pricing, premiums, financing, affordability, renovation cost
- Emergency Repair: leaks, active damage, urgent action
- Roofing Maintenance: scheduled care, preventive checks, seasonal upkeep

━━━ OUTPUT — VALID JSON ONLY, NO MARKDOWN FENCES, NO PREAMBLE ━━━

{
  "answer_opportunity": {
    "core_question": "The exact homeowner question this article will answer (phrased as a homeowner would actually type into Google or ChatGPT)",
    "why_this_question_matters_now": "What recent news or data is driving attention to this question right now",
    "search_intent": "informational | commercial_investigation | urgent_service | insurance_guidance",
    "geo_value": "Why an AI answer engine (Google AI Overviews, Perplexity, ChatGPT) would extract from this article",
    "seo_value": "Why a Google search user would click this result",
    "city_roofing_unique_answer": "What City Roofing can say that a newspaper, insurer, or generic blog cannot"
  },
  "selected_story": {
    "headline": "Actual headline of the chosen news story",
    "source": "Publication name",
    "url": "Article URL",
    "published_date": "ISO date of publication",
    "story_summary": "2-3 sentence factual summary",
    "why_high_traffic": "Why this story has search volume and public interest right now"
  },
  "connection_bridge": {
    "link_to_roofing": "The specific, non-obvious connection between the news story and roofing / exterior / home protection in Calgary",
    "professional_angle": "The unique insight a 15-year Calgary roofer adds that the news article does not cover",
    "homeowner_implication": "What Calgary homeowners should actually DO or think about because of this news"
  },
  "source_packet": [
    {
      "claim": "A specific verified fact that may appear in the article",
      "source_name": "Publication, government agency, or authoritative organization",
      "source_url": "Full URL",
      "published_date": "ISO date if available, null otherwise",
      "retrieved_date": "ISO date of when you accessed this source",
      "confidence": "high | medium | low",
      "allowed_usage": "fact | context | quote_candidate | do_not_use"
    }
  ],
  "calgary_local_layer": {
    "local_relevance": "Why this national story hits differently for Calgary — climate, building stock, insurance landscape, regulations",
    "calgary_data_point": "Any Calgary or Alberta-specific stat or fact found, with source",
    "neighborhood_context": "Which Calgary areas or demographics are most affected, if relevant"
  },
  "news_freshness_check": {
    "today": "ISO date you confirmed",
    "story_published_date": "ISO date of selected_story",
    "story_age_days": 0,
    "is_within_allowed_window": true,
    "warning_if_old": null
  },
  "claim_risk_flags": {
    "insurance_claim": false,
    "legal_or_code_claim": false,
    "pricing_claim": false,
    "warranty_claim": false,
    "certification_claim": false
  },
  "technical_entities": ["8-12 SEO anchor terms naturally relevant to this question and topic"],
  "eeeat_hooks": ["1-2 moments where Xactimate / SECOR / in-house crews / 15 years fit naturally — NOT a credential dump"],
  "internal_link_candidates": ["2 most relevant from the approved list above"],
  "quick_answer_draft": "2-3 sentences directly answering core_question. First sentence: news context. Second: Calgary homeowner implication. Third: City Roofing professional recommendation. AI-extractable.",
  "suggested_primary_keyword": "Long-tail keyword this article can realistically rank for given the question",
  "suggested_title_angle": "One sentence describing the article concept (not the title itself)",
  "best_category": "Roofing Maintenance | Emergency Repair | Material Guide | Local Weather Tips | Cost & Financing | Insurance Claims",
  "quality_score": {
    "news_relevance": 0,
    "calgary_specificity": 0,
    "source_strength": 0,
    "roofing_expert_value": 0,
    "seo_potential": 0,
    "geo_extractability": 0,
    "conversion_relevance": 0,
    "overall": 0
  },
  "publish_recommendation": "publish | needs_review | reject",
  "reviewFlags": ["Specific concerns the human reviewer should look at — e.g. 'one Tier 1 source only', 'pricing claim with no Alberta-specific source', 'story 25 days old, freshness borderline'"]
}

━━━ SCORING RUBRIC (1-10 each) ━━━
- news_relevance: how strongly current news supports this question
- calgary_specificity: how much of the answer is Calgary-specific vs generic
- source_strength: how good your source_packet is (count + tier + recency)
- roofing_expert_value: how much City Roofing can add beyond what a newspaper says
- seo_potential: realistic ranking probability for the long-tail keyword
- geo_extractability: how cleanly an AI engine could lift the answer
- conversion_relevance: how naturally this connects to a service page
- overall: weighted average, but if source_strength < 6 cap overall at 6

publish_recommendation rule:
- "reject" if no story / source older than 30 days / source_packet has fewer than 2 distinct external URLs / claim_risk_flags has any true with no supporting source
- "publish" if overall >= 8 AND source_strength >= 7
- "needs_review" otherwise`;

// ── Stage 2: Blueprint System Prompt ─────────────────────────────────────────
const BLUEPRINT_SYSTEM = `You are a senior SEO content strategist. You receive verified research and news data and transform it into a precise, actionable article blueprint.

You must resolve three tensions in every blueprint:
1. Search engines want structured scannable content — homeowners want to feel guided by an expert they trust
2. Keywords must appear frequently enough to rank — but naturally enough to pass Helpful Content Update filters
3. The article must genuinely inform — and move the reader toward contacting City Roofing

APPROVED INTERNAL LINKS (use ONLY these exact paths — no others):
/services/roof-replacement
/services/roof-repair
/services/flat-roofing
/services/siding
/contact

Return ONLY a valid JSON object — no markdown fences, no preamble:

{
  "article_type": "newsjack",
  "chosen_title": "Under 60 characters. Contains primary keyword naturally. Creates urgency or resolves a fear. Does not start with a number if avoidable — prefer action or question framing.",
  "slug": "lowercase-hyphenated-alphanumeric-only-no-special-chars",
  "unique_angle": "One sentence: the specific lens that separates this article from every other page on this topic — the national news story plus the Calgary expert response",
  "description": "Meta description between 140-155 characters exactly. Include primary keyword, Calgary, and a soft CTA like 'free estimate' or 'trusted Calgary roofers'",
  "keywords_list": ["5-8 long-tail keywords, minimum 3 words each, phrased as a homeowner would actually search them"],
  "quick_answer": "Polished version of the quick answer draft from research. 2-3 sentences. AI-extractable. No fluff.",
  "news_hook_section": {
    "heading": "The opening H2 that names or references the news story and establishes its relevance to Calgary homeowners",
    "purpose": "Hook reader with the national story context before pivoting to professional roofing analysis — this is what creates search novelty"
  },
  "structure": [
    {
      "level": "h2 or h3",
      "heading": "Exact heading text — descriptive, contains keyword signal, no clickbait",
      "word_count_target": 180,
      "key_points": ["Specific claims or information that must appear in this section"],
      "contains_bulleted_list": false,
      "contains_table": false,
      "eeeat_injection": "Which City Roofing credential fits here naturally, or null",
      "internal_link": "Which /services/ page to link here with suggested anchor text, or null"
    }
  ],
  "table": {
    "placed_after_heading": "Exact H2 text after which the table appears",
    "purpose": "What decision or comparison this table helps the homeowner make",
    "headers": ["Column header 1", "Column header 2", "Column header 3"],
    "rows": [["value","value","value"],["value","value","value"],["value","value","value"],["value","value","value"]]
  },
  "faq": [
    {
      "question": "Phrased exactly as a homeowner would ask Google voice search or ChatGPT",
      "answer_direction": "What the answer must cover in under 50 words — written to be extracted by AI systems"
    },
    {
      "question": "Second question addressing a different homeowner fear or the news story angle",
      "answer_direction": "Answer direction"
    }
  ],
  "cta_primary_page": "/services/most-contextually-relevant-page",
  "target_word_count": 1200
}`;

// ── Stage 3: Article Writing System Prompt ───────────────────────────────────
const WRITER_SYSTEM = `You are a senior content writer for City Roofing & Exteriors, Calgary's most trusted roofing contractor. You write for two audiences simultaneously: stressed Calgary homeowners who need clear expert guidance, and search engine crawlers and AI citation systems that need structured, factual, extractable content.

━━━ NEWSJACK ARTICLE STRUCTURE — always apply when article_type is "newsjack" ━━━

OPENING: Name the national news story in the first 2 sentences. Establish why it matters to Canadians right now. Do NOT open with the company, with roofing, or with a generic statement about home maintenance.

PIVOT: One sentence that bridges the national story to the Calgary homeowner's roof. This is the creative core of the article — the moment where a news consumer becomes a potential client. Make it feel like a natural expert observation, not a sales transition.

PROFESSIONAL ANALYSIS: City Roofing's expert interpretation of what this news means technically, financially, and practically for a Calgary homeowner's roof or exterior. This is where credentials belong — Xactimate when discussing insurance, SECOR when discussing safety, in-house crews when discussing accountability.

LOCAL APPLICATION: Calgary-specific recommendations. Reference actual Calgary conditions — freeze-thaw cycles, hail belt exposure, specific neighbourhoods where relevant, Alberta Building Code requirements, local insurance landscape.

RULE: The national story is the entry point. The roofing expertise is the value. Never lose either thread.

━━━ HUMAN VOICE RULES — non-negotiable ━━━

SENTENCE RHYTHM: Mix short sentences (4-8 words) with longer ones (20-30 words). Never three consecutive sentences of similar length. Monotone sentence rhythm is the primary AI detection signal.

CONTRACTIONS: Use without exception in all homeowner-facing prose. "you'll", "it's", "we've", "don't", "that's", "can't". Skip only in technical specifications or code references.

DIRECT ADDRESS: Always speak to "you" — the homeowner. Never "homeowners should consider..." Always "you should consider..."

LOCAL SPECIFICITY: Concrete Calgary detail, always. Not "cold winters" — "Calgary's freeze-thaw cycles between October and April." Not "recent hail damage" — "the hail events that hit NE Calgary and Airdrie last August." Specificity is the clearest human signal.

OPINION MOMENTS: Include 1-2 first-person plural professional opinions. Examples:
"Honestly, in 15 years we've never seen a homeowner regret upgrading to Class 4 impact-resistant shingles after a hail season."
"From what we see on roofs across Calgary's older NW neighbourhoods, most ice dam problems trace back to one thing: attic ventilation that was never updated when the insulation was."

IMPERFECT TRANSITIONS: Start occasional sentences with "And", "But", "So", or "Look —". Never use three paragraph-opening transitions from the same category in sequence. No "Additionally / Furthermore / Moreover" chains.

EM DASHES AND PARENTHETICALS: Use em dashes for natural asides — they read like a human interrupting themselves. Use parentheses once or twice for technical clarifications.

PARAGRAPH RHYTHM: Vary lengths deliberately. At least two single-sentence paragraphs for impact. At least one 4-5 sentence paragraph for depth. Never five paragraphs of equal length in sequence.

━━━ BANNED WORDS — never use ━━━
delve, paramount, moreover, it's worth noting, in conclusion, foster, comprehensive, leverage, crucial (use "critical" or "essential"), ensure (use "make sure"), streamline, navigate, testament, embark, underscore, pivotal, robust, seamlessly, in today's world, look no further, it is important to note, as previously mentioned

━━━ SEO POSITIONING RULES ━━━

KEYWORD PLACEMENT:
- Primary keyword appears within the first 80 words of the body
- Primary keyword bolded on its first appearance
- Primary keyword appears in at least one H2 or H3
- LSI and secondary keywords distributed across different H2 sections — never clustered
- Never repeat primary keyword more than once per 250 words

INTERNAL LINKS:
- Descriptive anchor text only — never "click here" or "learn more"
- 2-3 internal links spaced across different sections

TABLE RULES:
- Real comparative data useful for a homeowner decision
- Minimum 4 data rows, 3 columns
- At least one column with Calgary-specific data

FAQ RULES:
- Questions phrased exactly as a homeowner asks ChatGPT or Google voice search
- Answers under 50 words each
- Complete standalone answers — make sense without surrounding context

━━━ OUTPUT FORMAT — follow exactly ━━━

---
title: "[from blueprint]"
slug: "[from blueprint]"
date: "{{DATE}}"
status: "published"
category: "[category]"
excerpt: "[same as description — 140-155 chars, used as card preview on the news listing]"
keywords:
  - "[keyword]"
featuredImage: "STAGE4_PLACEHOLDER"
imageAlt: "[what is literally shown — under 125 chars — include Calgary]"
description: "[140-155 chars exactly]"
---

**Quick Answer:** [from blueprint — polished, AI-extractable, 2-3 sentences]

[Full article body following the blueprint structure — open with the news story, pivot, professional analysis, local application, table, checklist or bullets, FAQ]

## Frequently Asked Questions

**Q: [question]**
A: [under 50 words]

**Q: [question]**
A: [under 50 words]

## Wrapping Up

[2-3 sentences maximum. The one thing they must remember. City Roofing expertise signal. No rehashing every point covered.]

Ready for a professional assessment? [Contact our Calgary team](https://calgarycityroofing.com/contact) or call **403-608-9933** — free estimates, in-house crews, no subcontractors.

━━━ PRE-OUTPUT QUALITY GATES — verify all before generating ━━━
□ Slug: lowercase alphanumeric hyphens only, no trailing hyphen
□ Category: exact string match to one of — Roofing Maintenance / Emergency Repair / Material Guide / Local Weather Tips / Cost & Financing / Insurance Claims
□ Description: character count is 140-155
□ Article opens with the national news story, not with the company or roofing generics
□ Pivot sentence present — bridges news to Calgary homeowner reality
□ Quick Answer present as first body element after frontmatter
□ Primary keyword in first 80 words, bolded on first use
□ Markdown table present with 4+ rows of real data
□ At least one bulleted list present
□ At least 2 internal links with descriptive anchor text
□ At least two single-sentence paragraphs in body
□ At least one first-person plural opinion statement
□ Zero banned words used
□ Phone 403-608-9933 in CTA
□ Body word count between 900-1,400
□ featuredImage field is exactly "STAGE4_PLACEHOLDER" — do not replace it
□ status field is exactly "published" — required for the article to appear in the listing
□ excerpt field is present (can match description) — required by the news card renderer

Output ONLY the MDX file. No preamble, no commentary.`;


// ── Helpers ───────────────────────────────────────────────────────────────────
function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function extractJson(text: string): Record<string, unknown> | null {
  try {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
  } catch { /* fall through */ }
  return null;
}

// ── Gemini text generation ────────────────────────────────────────────────────
async function callGemini(
  prompt: string,
  system: string,
  useWebSearch: boolean,
): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('no_gemini_key');

  const model = process.env.GEMINI_MODEL ?? 'gemini-3-flash-preview';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

  const body: Record<string, unknown> = {
    system_instruction: { parts: [{ text: system }] },
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { maxOutputTokens: 8192, temperature: 0.4 },
  };

  if (useWebSearch) body.tools = [{ google_search: {} }];

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini ${res.status}: ${err.slice(0, 300)}`);
  }

  const data = await res.json() as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };

  return (data.candidates?.[0]?.content?.parts ?? [])
    .filter((p) => p.text)
    .map((p) => p.text ?? '')
    .join('');
}

// ── Image generation (Nano Banana Pro / Gemini multimodal) ──────────────────
async function callImageGen(prompt: string): Promise<string | null> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;

  const model = process.env.IMAGE_MODEL ?? 'nano-banana-pro-preview';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`ImageGen ${res.status}: ${err.slice(0, 300)}`);
  }

  const data = await res.json() as {
    candidates?: { content?: { parts?: { inlineData?: { mimeType?: string; data?: string } }[] } }[];
  };

  const parts = data.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    if (part.inlineData?.data) return part.inlineData.data;
  }
  return null;
}

// ── Public stage functions ────────────────────────────────────────────────────

export type ResearchInput = { topic?: string | null; notes?: string | null };
export type ResearchResult = Record<string, unknown>;

export async function runResearch(input: ResearchInput): Promise<ResearchResult> {
  const today = getToday();
  const userPrompt = `TODAY'S DATE: ${today}. Confirm this date via web search before doing anything else.

Run the question-first research process from the system prompt:

STEP 1 — Trend scan: search CBC News, CTV News, Globe and Mail, Google News Canada for what Canadians are reading today.
STEP 2 — Question selection: from the trending stories, pick the homeowner question that satisfies all five criteria (recent news driving it, Calgary homeowners would search it, City Roofing has a unique angle, connects to a service page, answer is concrete).
STEP 3 — Evidence packet: build source_packet with at least 2 distinct external URLs covering the factual claims that will appear in the article. Refuse to include any claim you cannot source.
STEP 4 — Risk and freshness check: set claim_risk_flags honestly; compute story_age_days; warn if old.
STEP 5 — Self-score: rate each subscore 1-10; cap overall at 6 if source_strength < 6.
STEP 6 — Return the JSON exactly as specified.

EDITOR DIRECTION: ${input.topic?.trim() || 'no specific topic — let the trending news + Calgary homeowner search intent decide'}
EDITOR NOTES: ${input.notes?.trim() || 'none'}

Selected story must have been published within the last 30 days (the answer can still be evergreen, but the news hook must be recent). Do not invent URLs. If no story passes the 5 criteria today, set publish_recommendation to "reject" and explain in reviewFlags.

Return ONLY valid JSON. No markdown fences, no preamble.`;

  const raw = await callGemini(userPrompt, RESEARCH_SYSTEM, true);
  const research = extractJson(raw);
  if (!research) throw new Error('Research stage returned invalid JSON');
  return research;
}

export type BlueprintInput = {
  researchContext: Record<string, unknown>;
  topic?: string | null;
  contentType?: string;
};
export type BlueprintResult = Record<string, unknown>;

export async function runBlueprint(input: BlueprintInput): Promise<BlueprintResult> {
  if (!input.researchContext) throw new Error('researchContext is required for blueprint');

  const r = input.researchContext as {
    suggested_primary_keyword?: string;
    best_category?: string;
    suggested_title_angle?: string;
  };

  const userPrompt = `Build a precise article blueprint from this research.

RESEARCH: ${JSON.stringify(input.researchContext, null, 2)}
TOPIC: ${input.topic?.trim() || r.suggested_title_angle || 'Calgary roofing'}
PRIMARY KEYWORD: ${r.suggested_primary_keyword || ''}
CATEGORY: ${input.contentType || r.best_category || 'Roofing Maintenance'}
ARTICLE FOCUS: Newsjack the selected story with a Calgary roofing expert perspective

Return ONLY valid JSON in the exact structure defined.`;

  const raw = await callGemini(userPrompt, BLUEPRINT_SYSTEM, false);
  const blueprint = extractJson(raw);
  if (!blueprint) throw new Error('Blueprint stage returned invalid JSON');
  return blueprint;
}

export type GenerateInput = {
  topic?: string | null;
  contentType?: string;
  sourceContext?: string;
  researchContext?: Record<string, unknown>;
  blueprintContext?: Record<string, unknown>;
};

export async function runGenerate(input: GenerateInput): Promise<string> {
  const today = getToday();

  let userPrompt: string;
  if (input.blueprintContext) {
    userPrompt = `Write the complete article using this blueprint and research.

BLUEPRINT: ${JSON.stringify(input.blueprintContext, null, 2)}

RESEARCH: ${JSON.stringify(input.researchContext ?? {}, null, 2)}

TODAY'S DATE: ${today}

Apply all system instructions. Run all quality gates before outputting. Output the article now.`;
  } else if (input.researchContext) {
    userPrompt = `Write the complete article using this research. No blueprint was generated — infer structure from research fields.

RESEARCH: ${JSON.stringify(input.researchContext, null, 2)}

TODAY'S DATE: ${today}

Apply all system instructions. Output the article now.`;
  } else {
    userPrompt = `Write a complete "${input.contentType}" category article about: ${input.topic}${input.sourceContext ? `\n\nReference context (use as background only, do not copy):\n${input.sourceContext}` : ''}

TODAY'S DATE: ${today}

Apply all system instructions. Output the article now.`;
  }

  const content = await callGemini(userPrompt, WRITER_SYSTEM, false);
  if (!content) throw new Error('Empty response from writer');
  return content;
}

export type ImageInput = {
  blueprintContext?: Record<string, unknown>;
  researchContext?: Record<string, unknown>;
  topic?: string;
  category?: string;
};
export type ImageResult = {
  images: Record<string, unknown>;
  featuredImagePath: string | null;
  inlinePaths: (string | null)[];
};

function buildFeaturedPrompt(title: string, keywords: string[]): string {
  const context = keywords.slice(0, 3).join(', ') || title;
  return `${context}, Calgary roofing, photorealistic DSLR photography, suburban home, Alberta prairie sky, wide establishing shot of full roof and exterior, golden hour lighting, no people, no text, ultra-detailed`;
}

async function buildInlinePrompts(title: string, keywords: string[], category: string): Promise<[string, string]> {
  const prompt = `Article title: "${title}"
Category: ${category}
Key topics: ${keywords.slice(0, 5).join(', ')}

Generate exactly 2 short image prompts (under 20 words each) for inline photos that visually illustrate this specific article.
Each prompt must describe a concrete, photorealistic roofing or home exterior scene directly related to the article topic.
No people, no text, no logos. Calgary suburban setting.

Return ONLY valid JSON: {"inline1": "...", "inline2": "..."}`;

  try {
    const raw = await callGemini(prompt, 'You generate concise image prompts. Return only valid JSON, no markdown.', false);
    const parsed = extractJson(raw) as { inline1?: string; inline2?: string } | null;
    if (parsed?.inline1 && parsed?.inline2) {
      const base = ', Calgary roofing, photorealistic DSLR photography, no people, no text, natural light';
      return [parsed.inline1 + base, parsed.inline2 + base];
    }
  } catch { /* fall through to defaults */ }

  return [
    `${title}, roofing detail close-up, Calgary home, photorealistic, natural light, no people`,
    `${title}, roof exterior view, Calgary suburban home, photorealistic, overcast sky, no people`,
  ];
}

// Inject inline images into MDX body after the 1st and 3rd H2 sections
export function injectInlineImages(mdx: string, paths: (string | null)[]): string {
  if (!paths[0] && !paths[1]) return mdx;

  const fmEnd = mdx.indexOf('\n---\n', 3) + 5;
  const frontmatter = mdx.slice(0, fmEnd);
  const body = mdx.slice(fmEnd);

  const sections = body.split(/(?=^## )/m);

  if (paths[0] && sections.length > 1) {
    sections[1] += `\n![](${paths[0]})\n`;
  }
  if (paths[1] && sections.length > 3) {
    sections[3] += `\n![](${paths[1]})\n`;
  }

  return frontmatter + sections.join('');
}

export async function runImage(input: ImageInput): Promise<ImageResult> {
  const title = (input.blueprintContext?.chosen_title as string | undefined) ?? input.topic ?? '';
  const slug = (input.blueprintContext?.slug as string | undefined) ?? '';
  const category = input.category ?? (input.blueprintContext?.category as string | undefined) ?? '';
  const keywords = (input.researchContext?.technical_entities as string[] | undefined) ?? [];

  const [inlinePrompt1, inlinePrompt2] = await buildInlinePrompts(title, keywords, category);

  const [featuredB64, inline1B64, inline2B64] = await Promise.allSettled([
    callImageGen(buildFeaturedPrompt(title, keywords)),
    callImageGen(inlinePrompt1),
    callImageGen(inlinePrompt2),
  ]);

  async function upload(b64Result: PromiseSettledResult<string | null>, suffix: string): Promise<string | null> {
    if (b64Result.status !== 'fulfilled' || !b64Result.value || !slug) return null;
    const ghPath = `public/images/news/${slug}${suffix}.png`;
    try {
      await githubWriteBase64File(ghPath, b64Result.value, `Add image: ${slug}${suffix}`);
      return `/images/news/${slug}${suffix}.png`;
    } catch (e) {
      console.error('[image-upload]', e instanceof Error ? e.message : e);
      return null;
    }
  }

  const [featuredImagePath, inline1Path, inline2Path] = await Promise.all([
    upload(featuredB64, ''),
    upload(inline1B64, '-1'),
    upload(inline2B64, '-2'),
  ]);

  return { images: {}, featuredImagePath, inlinePaths: [inline1Path, inline2Path] };
}

export async function runChat(
  messages: { role: string; content: string }[],
  currentArticle: string,
): Promise<string> {
  const systemWithContext = `${WRITER_SYSTEM}

The user wants to modify the article below. Apply their request and return the complete updated MDX file (frontmatter + content). Keep featuredImage as "STAGE4_PLACEHOLDER" — do not replace it. Return ONLY the MDX — no explanations.

CURRENT ARTICLE:
${currentArticle}`;

  return callGemini(messages[messages.length - 1].content, systemWithContext, false);
}
