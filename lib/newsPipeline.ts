// AI news generation pipeline — shared between /api/news-generator and /api/cron/auto-publish.
// All four stages exposed as importable functions so internal callers don't need HTTP self-fetch.

import { githubWriteBase64File } from '@/lib/github';

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

// ── Stage 2: Blueprint System Prompt ─────────────────────────────────────────
const BLUEPRINT_SYSTEM = `You are a senior SEO content strategist. You receive verified research and news data and transform it into a precise, actionable article blueprint.

You must resolve three tensions in every blueprint:
1. Search engines want structured scannable content — homeowners want to feel guided by an expert they trust
2. Keywords must appear frequently enough to rank — but naturally enough to pass Helpful Content Update filters
3. The article must genuinely inform — and move the reader toward contacting City Roofing

CITY ROOFING DIFFERENTIATION TO PROTECT:
- In-house crews = accountability and quality control (competitors use subcontractors)
- Xactimate software = insurance claim precision (most roofers estimate by eye)
- SECOR certification = documented safety standards
- 15+ years = pattern recognition competitors lack
Surface these where they solve a homeowner fear, never as a generic credential dump.

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

COMPANY FACTS — use naturally, never force:
- City Roofing & Exteriors | https://calgarycityroofing.com | 403-608-9933
- 15+ years | SECOR certified | WCB Alberta | BBB Accredited | 4.8 stars 150+ reviews
- In-house crews only — zero subcontracting | Xactimate-certified insurance estimates
- Approved suppliers: IKO, GAF, Owens Corning, CertainTeed, Malarkey, BP/BMCA
- Service pages (use ONLY these exact paths):
  /services/roof-replacement | /services/roof-repair | /services/flat-roofing | /services/siding | /contact

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

// ── Stage 4: Image Prompt System ─────────────────────────────────────────────
const IMAGE_SYSTEM = `You are a creative director generating image prompts for a Calgary roofing contractor's premium content. All images must look like high-end architectural photography — not stock photos, not AI illustration, not 3D renders.

BRAND IMAGE STANDARDS:
- Realistic DSLR photography aesthetic — Canon or Sony full-frame look
- Calgary suburban or commercial setting: two-story homes, prairie sky, Rockies in far background where natural
- Roofing materials: dark charcoal, slate grey, or weathered cedar — never bright colors
- Exterior materials: warm brick, light stucco, hardie board — common Calgary housing stock
- No people, no pets, no vehicles, no logos, no text in frame
- Natural lighting: golden hour or bright overcast — avoid harsh midday shadows
- No dramatic storms or catastrophic damage for standard articles — reserve for Emergency Repair category only

PROMPT STRUCTURE — follow this formula exactly:
[Primary subject with material detail], [location/setting with Calgary context], [weather and light condition], [camera angle and lens feel], [style qualifiers]

Example: "Close-up of dark charcoal asphalt shingles with visible granule texture and ridge cap detail on a Calgary suburban home, overcast Alberta sky, shallow depth of field, Canon 5D Mark IV look, photorealistic architectural photography, ultra-detailed"

Return ONLY a valid JSON object — no markdown fences, no preamble:

{
  "featured_image": {
    "prompt": "50-80 word Midjourney/DALL-E 3 prompt following the brand formula exactly. Wide establishing shot — full roof or exterior visible. This is the hero image.",
    "negative_prompt": "people, person, human, pets, cars, vehicles, text, logos, cartoon, illustration, 3D render, stock photo look, bright colors, green roof, blue shingles",
    "alt_text": "Describe literally what is in the image. Under 120 characters. Include Calgary.",
    "use_case": "Featured/hero image — appears at top of article and in social sharing"
  },
  "inline_1": {
    "prompt": "50-70 word prompt. Close-up or detail shot illustrating a specific section of the article. Reference the specific roofing component or condition covered in the article.",
    "negative_prompt": "people, text, logos, cartoon, illustration, 3D render",
    "alt_text": "Literal description under 120 chars with Calgary reference",
    "use_case": "Placed after [specific H2 section heading] to illustrate [what specifically]"
  },
  "inline_2": {
    "prompt": "50-70 word prompt. Different angle or subject than inline_1. Could show damage detail, material comparison, inspection result, or seasonal condition relevant to the article topic.",
    "negative_prompt": "people, text, logos, cartoon, illustration, 3D render",
    "alt_text": "Literal description under 120 chars",
    "use_case": "Placed after [specific H2 section heading] to illustrate [what specifically]"
  }
}`;

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
  const userPrompt = `Find high-traffic Canadian news and identify the roofing professional angle.

TOPIC DIRECTION: ${input.topic?.trim() || 'find the most relevant trending story right now'}
EDITOR NOTES: ${input.notes?.trim() || 'none'}

Prioritize stories published within the last 30 days. Return ONLY valid JSON in the exact structure defined.`;

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
};

export async function runImage(input: ImageInput): Promise<ImageResult> {
  const title = (input.blueprintContext?.chosen_title as string | undefined) ?? input.topic ?? '';
  const slug = (input.blueprintContext?.slug as string | undefined) ?? '';
  const technicalEntities = (input.researchContext?.technical_entities as string[] | undefined) ?? [];

  const userPrompt = `Generate image prompts for this article.

TITLE: ${title}
TOPIC: ${input.topic ?? title}
CATEGORY: ${input.category ?? ''}
KEY TECHNICAL ENTITIES: ${technicalEntities.join(', ')}

Return ONLY valid JSON in the exact structure defined.`;

  const raw = await callGemini(userPrompt, IMAGE_SYSTEM, false);
  const images = extractJson(raw);
  if (!images) throw new Error('Image stage returned invalid JSON');

  // Generate actual featured image with Imagen 3 and upload to GitHub
  let featuredImagePath: string | null = null;
  const featuredPrompt = (images.featured_image as { prompt?: string } | undefined)?.prompt;

  if (featuredPrompt && slug) {
    try {
      const base64 = await callImageGen(featuredPrompt);
      if (base64) {
        const ghPath = `public/images/news/${slug}.png`;
        await githubWriteBase64File(ghPath, base64, `Add image: ${slug}`);
        featuredImagePath = `/images/news/${slug}.png`;
      }
    } catch (imgErr) {
      console.error('[image-gen]', imgErr instanceof Error ? imgErr.message : imgErr);
    }
  }

  return { images, featuredImagePath };
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
