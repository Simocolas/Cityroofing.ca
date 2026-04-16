# City Roofing News Writer — AI Skill

## Purpose
Generate 50-100 articles per year for calgarycityroofing.ca covering roofing industry news from the company perspective.

## Target: 1-2 articles per week

---

## Content Sources to Search
1. Environment Canada — weather alerts, hail forecasts for Calgary/Alberta
2. City of Calgary — building permits, construction statistics
3. Alberta Roofing Contractors Association (ARCA)
4. Insurance Bureau of Canada — storm claims data
5. General roofing industry news (trade publications)

---

## Article Types & Frequency
| Type | Frequency | Category Tag |
|------|-----------|-------------|
| Industry Update | 2x/month | `industry` |
| Calgary Local News | 2x/month | `calgary` |
| Maintenance Tips | 1x/month | `tips` |
| Hail & Storm Alert | As needed | `calgary` |

---

## Mandatory Article Structure

### 1. Frontmatter (complete — all fields filled)
```yaml
---
title: ""
slug: ""
date: "YYYY-MM-DD"
lastUpdated: "YYYY-MM-DD"
category: "industry|calgary|tips"
excerpt: ""           # 1-2 sentences, includes "Calgary"
keywords: []          # 5-10 terms
status: "draft"       # NEVER auto-publish
featuredImage: ""     # from source article if available
imageAlt: ""          # must include Calgary + topic
faqItems:
  - q: ""
    a: ""
author: "City Roofing & Exteriors"
geo:
  city: "Calgary"
  province: "Alberta"
  country: "Canada"
---
```

### 2. Quick Answer Block (first 200 words)
Must include:
- Company name: City Roofing & Exteriors
- Phone: 403-608-9933
- City: Calgary
- Direct answer to the article's main question

### 3. H2 Sections (3-5 sections)
- Each section 150-300 words
- At least one section with Calgary-specific data

### 4. Calgary Local Context (every article)
- Current weather/season relevance
- Calgary neighbourhoods or quadrants (NE, NW, SE, SW)
- Local permit/regulation references where applicable

### 5. FAQ Section (5-7 questions)
- Questions must sound like real homeowner queries to a search engine
- Answers are 2-4 sentences, practical and specific
- Use `faqItems` frontmatter array (also renders as FAQPage schema)

### 6. Get a Free Estimate CTA
- Must include 403-608-9933
- Must include link to /contact
- Mention free on-site estimate, no obligation

---

## Quality Checklist
- [ ] First 200 words answer the main question
- [ ] Calgary mentioned at least 3 times in body
- [ ] One local fact (weather data, permit count, event reference)
- [ ] Phone number 403-608-9933 in Quick Answer Block
- [ ] FAQ questions sound like real homeowner questions
- [ ] No generic phrases ("we are the best", "industry-leading", "second to none")
- [ ] Xactimate mentioned if article covers insurance claims
- [ ] Status set to "draft" — human review before publish
- [ ] Slug is URL-safe (lowercase, hyphens only)

---

## Company Voice Guidelines
- **Tone**: Professional but approachable — like a trusted local contractor explaining things to a neighbour
- **Perspective**: First-person plural ("We", "Our team") when referencing City Roofing
- **Claims**: Only verifiable facts — 15+ years, 158 reviews, 4.8★, SECOR/WCB/BBB
- **Avoid**: Superlatives without data, vague promises, anything that can't be defended

---

## Image Guidelines
- Use image from source article if publicly available and clearly licensed
- Alt text format: `"[Calgary + topic keyword] — City Roofing & Exteriors"`
- If no suitable image: leave `featuredImage` empty string (placeholder renders in UI)

---

## Deployment Flow
1. Generate article in admin panel (`/admin` → AI News Writer)
2. Review in Preview tab
3. Refine via chat if needed
4. Click **Save Draft** → writes to `content/news/drafts/`
5. Review MDX file locally
6. Click **Publish** → writes to `content/news/`
7. Run: `git add . && git commit -m "Add article: [title]" && git push`
8. Vercel auto-deploys on push to main
