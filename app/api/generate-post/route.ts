export async function POST(request: Request) {
  const { contentType, topic, sourceContext, length } = await request.json();

  const wordCount =
    ({
      'Short': 600,
      'Short (600w)': 600,
      'Standard': 1000,
      'Standard (1000w)': 1000,
      'Detailed': 1400,
      'Detailed (1400w)': 1400,
    } as Record<string, number>)[length] ?? 1000;

  const systemPrompt = `You are a content writer for City Roofing & Exteriors, a Calgary-based roofing contractor with 15+ years experience, 158 Google reviews at 4.8 stars, SECOR certified, WCB Alberta registered.

Your writing style:
- Professional but conversational, never corporate
- Calgary-specific — mention local context (weather, neighborhoods, Alberta regulations) naturally
- Fact-based — use real data when available, never invent statistics
- Never claim "we are the best" — let facts speak
- Always helpful to homeowners, not just promotional

Content rules:
- First 200 words must directly answer the main question (GEO optimization)
- Include Calgary-specific context in every article
- End every article with 5-7 FAQ items
- Include a "Get a Free Estimate" CTA section at the end
- Phone: 403-608-9933, Website: calgarycityroofing.com`;

  const today = new Date().toISOString().split('T')[0];

  const userPrompt = `Write a ${wordCount}-word article for our website.

Content Type: ${contentType}
Topic/Keywords: ${topic}
${sourceContext ? `Reference Context (use as background only, do not copy): ${sourceContext}` : ''}

Output ONLY a complete MDX file with this exact frontmatter structure:
---
title: ""
slug: ""
date: "${today}"
lastUpdated: "${today}"
category: "industry|calgary|tips|projects"
subcategory: ""
status: "draft"
excerpt: ""
keywords: ["", ""]
imageAlt: ""
sourceUrl: ""
sourceNote: ""
faqItems:
  - q: ""
    a: ""
author: "City Roofing & Exteriors"
geo:
  city: "Calgary"
  province: "Alberta"
  country: "Canada"
---

## Quick Answer
[First 200 words answering the main question directly]

## [Section headings...]

## Frequently Asked Questions
[Auto-rendered from faqItems]

## Get a Free Estimate
[Standard CTA paragraph]`;

  const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY ?? '',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-5',
      max_tokens: 4000,
      messages: [{ role: 'user', content: userPrompt }],
      system: systemPrompt,
    }),
  });

  if (!anthropicResponse.ok) {
    const err = await anthropicResponse.text();
    return Response.json({ error: `Anthropic API error: ${err}` }, { status: 500 });
  }

  const data = await anthropicResponse.json();
  const content = data.content?.[0]?.text ?? '';

  return Response.json({ content });
}
