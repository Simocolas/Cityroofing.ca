import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FAQSection, { FAQItem } from '@/components/shared/FAQSection';
import reviewsData from '@/data/reviews.json';

export const metadata: Metadata = {
  title: 'Calgary Roof Replacement | Hail Claim Specialists & Class 4 Shingles | City Roofing',
  description:
    'Calgary hail claim roof specialists. 1,200+ hail claims documented since 2014, Xactimate-certified, in-house crews, Class 4 impact-resistant shingles. Free pre-claim inspection: 403-608-9933.',
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Residential Roof Replacement Calgary',
  provider: {
    '@type': 'LocalBusiness',
    name: 'City Roofing & Exteriors',
    telephone: '403-608-9933',
    address: '3935 3a St NE Unit #3, Calgary, AB T2E 6S7',
  },
  areaServed: 'Calgary, Alberta',
  serviceType: [
    'Asphalt shingle replacement',
    'Metal roof replacement',
    'Class 4 impact-resistant shingles',
    'Hail damage roof replacement',
    'Insurance claim roofing',
  ],
  description:
    'Residential roof replacement in Calgary. Hail-rated Class 4 shingles, Xactimate insurance documentation, in-house SECOR-certified crews. Serving Calgary, Airdrie, Cochrane, Chestermere and Okotoks.',
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How City Roofing Replaces Your Roof',
  step: [
    { '@type': 'HowToStep', name: 'Free On-Site Inspection', text: 'We come to your home, get on the roof, and document its actual condition with photos.' },
    { '@type': 'HowToStep', name: 'Written Estimate', text: 'A line-item quote you can hand to your insurance adjuster — no verbal numbers, no surprises.' },
    { '@type': 'HowToStep', name: 'Material Selection', text: 'Pick your shingle style, colour, and rating. We bring physical samples so you can see them on your home.' },
    { '@type': 'HowToStep', name: 'Tear-Off and Install', text: 'In-house SECOR-certified crew. Lawn tarps go down before the first shingle comes off. Most roofs finish in one day.' },
    { '@type': 'HowToStep', name: 'Magnetic Nail Sweep and Walkthrough', text: 'We sweep your yard with industrial magnets, then walk the finished roof with you and hand over warranty documents.' },
  ],
};

// ── Section 3: Why Calgary roofs fail ────────────────────────────────────────
const calgaryProblems = [
  {
    title: 'Hail Damage',
    text: 'Calgary sees 15–20 significant hail events every year. Even pea-sized hail can fracture asphalt granules and shorten roof life by a decade. Class 4 impact-resistant shingles are the only proven defence.',
  },
  {
    title: 'Chinook Wind Uplift',
    text: 'Chinook gusts hit 100+ km/h on the leeward slope of the Rockies. We pattern-fasten and use high-wind-rated shingles because watching shingles peel off in February is not a fun phone call to make.',
  },
  {
    title: 'Freeze-Thaw Cycles',
    text: 'Calgary swings above and below freezing 60+ times each winter. Each cycle expands and contracts every nail, shingle, and flashing seam. After 15 years, that adds up to leaks.',
  },
  {
    title: 'Ice Damming',
    text: 'Older NW Calgary homes lose heat into the attic, melt snow on the roof, and refreeze it at the eaves. The result: water backing up under shingles and into your soffit. Usually a ventilation problem, not a shingle problem.',
  },
  {
    title: 'Aging Asphalt',
    text: 'A 25-year shingle in Calgary is really a 17–20 year shingle once you account for hail, UV, and freeze-thaw. If your roof is past 18 years and starting to lose granules, you are on borrowed time.',
  },
  {
    title: 'Improper Attic Ventilation',
    text: 'Most Calgary roofs we tear off have undersized intake or exhaust ventilation. That is why the previous roof failed early — and why we fix it during replacement, not after.',
  },
];

// ── Section 6: Installation day ──────────────────────────────────────────────
const installSteps = [
  { time: '7:00 AM', title: 'Crew Arrives', text: 'Lawn tarps, plywood over A/C units, dumpster positioned. We protect your property before we touch the roof.' },
  { time: '8:00 AM', title: 'Tear-Off Begins', text: 'Old shingles, underlayment, and damaged decking come off. We inspect the deck and replace any rotted plywood at cost — no upcharge.' },
  { time: '11:00 AM', title: 'Underlayment & Ice Shield', text: 'Synthetic underlayment over the field. Ice & water shield at eaves, valleys, penetrations, and step-flashing.' },
  { time: '1:00 PM', title: 'Shingles Go On', text: 'Pattern-fastened with the manufacturer-specified nail count for high-wind ratings. Ridge vents, hip caps, and flashing details installed.' },
  { time: '5:00 PM', title: 'Magnetic Sweep & Walkthrough', text: 'Industrial magnets sweep your driveway, lawn, and flowerbeds. We walk the finished roof with you. Warranty documents in hand before we leave.' },
];

// ── FAQ ──────────────────────────────────────────────────────────────────────
const faqItems: FAQItem[] = [
  {
    q: 'Should I file a hail claim before or after a roofer inspects my roof?',
    a: 'Get a roofer first. Filing a claim creates a permanent record regardless of payout. If we find damage under your deductible, you do not want that claim on file. Our pre-claim inspection is free — we tell you straight whether filing makes sense.',
  },
  {
    q: 'What is depreciation recovery on a Calgary hail claim?',
    a: 'Most Alberta policies pay claims in two parts: Actual Cash Value (ACV) at the start, depreciation after work completes. After install, you submit our final invoice and the insurer releases the remainder — typically $3,000–$8,000 depending on roof age. Many homeowners never claim it.',
  },
  {
    q: 'My insurer denied my hail claim. Can I still get coverage?',
    a: 'Often yes. Most denials come from incomplete adjuster documentation, not lack of damage. We re-inspect with date-stamped photos, write a rebuttal package referencing your policy language, and file a supplemental. Roughly half of the rebuttals we file get partial or full reversal.',
  },
  {
    q: 'Will filing a hail claim raise my Alberta home insurance?',
    a: 'Catastrophic hail events (named storms) are usually rated separately from individual claims, so most Alberta insurers do not penalize. Confirm with your specific provider — but for a major Calgary hail event, premium impact is typically much smaller than the payout.',
  },
  {
    q: 'How much does roof replacement cost in Calgary?',
    a: 'Most Calgary asphalt replacements run $10,000–$18,000 depending on roof size, pitch, and shingle rating. Class 4 impact-resistant shingles cost about $1,500–$3,000 more than architectural — but may pay back through insurer discounts and a longer hail-damage life.',
  },
  {
    q: 'When should I replace instead of repair?',
    a: 'If more than 25–30% of shingles are damaged, your roof is over 18 years old, or you have had two hail claims on the same roof, replacement is usually the cheaper long-term call. We tell you straight during the inspection.',
  },
  {
    q: 'Do you handle the insurance claim for hail damage?',
    a: 'We document the damage with photos and an Xactimate-format estimate that adjusters recognize. You file the claim with your insurer; we provide the paperwork that usually shortens the back-and-forth. We do not bill the insurer directly.',
  },
  {
    q: 'How long does the actual install take?',
    a: 'Most Calgary residential roofs finish in one day. Larger or steeper homes (3,000+ sq ft, 8/12 pitch and up) sometimes need a second day. We do not start a job we cannot finish before weather rolls in.',
  },
  {
    q: 'What is Class 4 impact-resistant shingle?',
    a: 'Class 4 is the highest UL 2218 hail rating. The shingle survives a steel-ball drop test that would crack a standard architectural shingle. In a hail belt like Calgary, that is the difference between a 25-year roof and a 12-year roof.',
  },
  {
    q: 'Do you protect my lawn and flowerbeds?',
    a: 'Tarps go down before tear-off starts. Plywood covers A/C condensers and gas meters. Industrial magnets sweep the property at the end of every day. If we miss a nail, call us — we come back same day.',
  },
  {
    q: 'Are you SECOR certified and WCB covered?',
    a: 'Yes — both. Every crew member is on our payroll (no subcontracting), covered by WCB Alberta, and operating under our SECOR safety program. You will not get a lien from a sub we forgot to pay.',
  },
  {
    q: 'Do you serve outside Calgary?',
    a: 'Airdrie, Cochrane, Chestermere, Okotoks. Same crew, same warranty.',
  },
  {
    q: 'What warranty do I get?',
    a: 'Manufacturer material warranties (varies by shingle — 25 years to lifetime) plus our own 10-year workmanship warranty. Both are documented in your contract before installation day.',
  },
];

const homeReviews = reviewsData.slice(0, 3);

// ── Components ───────────────────────────────────────────────────────────────
function SectionHeader({ label, title, text }: { label?: string; title: string; text?: string }) {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto 48px', textAlign: 'center' }}>
      {label && (
        <p style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>
          {label}
        </p>
      )}
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 3.4vw, 42px)', color: 'var(--color-text-dark)', lineHeight: 1.15, marginBottom: text ? '20px' : 0 }}>
        {title}
      </h2>
      {text && (
        <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '17px', lineHeight: 1.65 }}>{text}</p>
      )}
    </div>
  );
}

function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        display: 'inline-block',
        backgroundColor: 'var(--color-primary)',
        color: '#fff',
        padding: '14px 26px',
        borderRadius: '4px',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '14px',
        letterSpacing: '0.6px',
        textTransform: 'uppercase',
        textDecoration: 'none',
      }}
    >
      {children}
    </Link>
  );
}

function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: 'inline-block',
        backgroundColor: 'transparent',
        color: '#F9F7F2',
        padding: '14px 26px',
        border: '1.5px solid rgba(249,247,242,0.55)',
        borderRadius: '4px',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '14px',
        letterSpacing: '0.6px',
        textTransform: 'uppercase',
        textDecoration: 'none',
      }}
    >
      {children}
    </a>
  );
}

export default function RoofReplacementPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />

      {/* ── Section 1: Hero ──────────────────────────────────────────────── */}
      <section className="rr-hero" style={{ backgroundColor: 'var(--color-base)', padding: '136px 24px 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.32 }}>
          <Image
            src="/images/4/residential.webp"
            alt="Residential roof replacement by City Roofing in Calgary"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(26,26,26,0.95) 0%, rgba(26,26,26,0.82) 48%, rgba(26,26,26,0.6) 100%)' }} />

        <div className="rr-hero-grid" style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(360px, 0.78fr)', gap: '48px', alignItems: 'start' }}>
          <div>
            <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '18px' }}>
              Calgary Residential Roofing — Since 2009
            </p>
            <h1 style={{ color: '#F9F7F2', fontSize: 'clamp(40px, 6.5vw, 76px)', lineHeight: 1.0, letterSpacing: 0, marginBottom: '24px' }}>
              Calgary Hail Claim Roof Specialists
            </h1>
            <p style={{ color: 'rgba(249,247,242,0.85)', fontSize: '19px', lineHeight: 1.65, maxWidth: '660px', marginBottom: '28px' }}>
              Calgary takes more hail damage than any major Canadian city. Since 2014 we have documented 1,200+ hail claims for Calgary homeowners — pre-claim inspections, supplemental claims, depreciation recovery, and Class 4 impact-resistant replacements. Don&apos;t accept the first lowball adjuster offer.
            </p>
            <div className="rr-hero-buttons" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '28px' }}>
              <PrimaryButton href="/contact">Request Free Estimate</PrimaryButton>
              <SecondaryButton href="tel:403-608-9933">Call 403-608-9933</SecondaryButton>
            </div>
            <div className="rr-hero-trust" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['Since 2009', '3,000+ Calgary roofs', '4.8★ on Google', 'In-house crew', 'SECOR Certified', 'WCB Alberta', 'BBB Accredited'].map((item) => (
                <span key={item} style={{ color: '#F9F7F2', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '999px', padding: '8px 11px', fontSize: '12px', fontWeight: 700 }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '8px', padding: '32px 30px' }}>
            <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
              What you get
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: '#F9F7F2', marginBottom: '20px', lineHeight: 1.2 }}>
              Free On-Site Estimate
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'grid', gap: '12px' }}>
              {[
                'Pre-claim hail damage assessment',
                'Xactimate-format written estimate',
                'Class 4 vs architectural shingle samples',
                'Insurance documentation package',
                'No-obligation quote in 24 hours',
              ].map((item) => (
                <li key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ flexShrink: 0, width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '11px', marginTop: '2px' }}>✓</span>
                  <span style={{ color: 'rgba(249,247,242,0.92)', fontSize: '15px', lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'center',
                backgroundColor: 'var(--color-primary)',
                color: '#fff',
                padding: '14px 20px',
                borderRadius: '4px',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '14px',
                letterSpacing: '0.6px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                marginBottom: '12px',
              }}
            >
              Get My Free Estimate →
            </Link>
            <p style={{ color: 'rgba(249,247,242,0.55)', fontSize: '12px', lineHeight: 1.5, textAlign: 'center', margin: 0 }}>
              Calgary · Airdrie · Cochrane · Chestermere · Okotoks
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 2: Stats bar ─────────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--color-cream-dark)', borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="rr-stats" style={{ maxWidth: '1180px', margin: '0 auto', padding: '30px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {[
            ['15+', 'Years in Calgary'],
            ['3,000+', 'Roofs replaced'],
            ['158', 'Verified Google reviews'],
            ['4.8', 'Google rating'],
          ].map(([value, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, lineHeight: 1 }}>{value}</div>
              <div style={{ color: 'var(--color-text-dark-muted)', fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', marginTop: '8px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: Why Calgary roofs fail ────────────────────────────── */}
      <section style={{ padding: '86px 24px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <SectionHeader
            label="Why Calgary roofs fail early"
            title="Six Things That Kill Roofs in Calgary"
            text="A 25-year shingle is really a 17-year shingle once you live through Calgary weather. Here is what we see on the roofs we tear off."
          />
          <div className="rr-problems-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '40px' }}>
            {calgaryProblems.map((p, i) => (
              <div
                key={p.title}
                style={{
                  backgroundColor: 'var(--color-cream)',
                  border: '1px solid var(--color-border-light)',
                  borderRadius: '6px',
                  padding: '28px 26px',
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '24px',
                    color: 'var(--color-primary)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '14px',
                    letterSpacing: '1px',
                    opacity: 0.4,
                  }}
                >
                  0{i + 1}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '18px',
                    color: 'var(--color-text-dark)',
                    marginBottom: '12px',
                    paddingRight: '32px',
                    lineHeight: 1.25,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    color: 'var(--color-text-dark-muted)',
                    fontSize: '14.5px',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Class 4 spotlight ─────────────────────────────────── */}
      <section style={{ padding: '96px 24px', backgroundColor: 'var(--color-base)', position: 'relative' }}>
        <div className="rr-class4" style={{ maxWidth: '1180px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center' }}>
          <div>
            <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>
              The shingle that pays for itself
            </p>
            <h2 style={{ color: '#F9F7F2', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 3.4vw, 40px)', lineHeight: 1.15, marginBottom: '20px' }}>
              Class 4 Impact-Resistant Shingles — Built for Calgary&apos;s Hail Belt
            </h2>
            <p style={{ color: 'rgba(249,247,242,0.82)', fontSize: '17px', lineHeight: 1.7, marginBottom: '20px' }}>
              UL 2218 Class 4 is the highest hail rating a shingle can carry. To pass, the product survives a 2-inch steel ball dropped from 20 feet onto the same spot — twice — without cracking. A standard architectural shingle fails that test on the first hit.
            </p>
            <p style={{ color: 'rgba(249,247,242,0.82)', fontSize: '17px', lineHeight: 1.7, marginBottom: '28px' }}>
              In 15 years, we have never seen a Calgary homeowner regret upgrading after a hail season. Some Alberta insurers offer premium discounts for Class 4 — call your provider before you choose. The math usually works out.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
              {[
                { stat: '15–20', label: 'Calgary hail events / year' },
                { stat: '2"', label: 'Steel ball drop test' },
                { stat: 'UL 2218', label: 'Industry rating standard' },
                { stat: '5–15%', label: 'Possible insurer discount' },
              ].map((item) => (
                <div key={item.label} style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderLeft: '3px solid var(--color-primary)', padding: '14px 18px' }}>
                  <div style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 900, lineHeight: 1 }}>{item.stat}</div>
                  <div style={{ color: 'rgba(249,247,242,0.7)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px', marginTop: '6px' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', height: '480px', borderRadius: '8px', overflow: 'hidden' }}>
            <Image
              src="/images/4/residential.webp"
              alt="Class 4 impact-resistant shingles on a Calgary home"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
            />
          </div>
        </div>
      </section>

      {/* ── Section 5: Hail Claim Specialists ────────────────────────────── */}
      <section style={{ padding: '96px 24px', backgroundColor: '#FFFFFF', position: 'relative' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <SectionHeader
            label="Hail damage specialists"
            title="We Win Hail Claims Other Roofers Walk Away From"
            text="Adjusters spend an average of 20 minutes on a roof. Our crews spend 90+ minutes documenting hits per slope. Since 2014, that difference has helped Calgary homeowners recover hail-claim money other contractors leave on the table."
          />

          <div className="rr-hail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '40px' }}>
            {[
              {
                num: '01',
                title: 'Pre-Claim Roof Inspection',
                text: 'Filing a claim creates a permanent record on your insurance history — payout or not. We climb your roof first and tell you whether the damage exceeds your deductible. We have turned away dozens of claims that would have hurt the homeowner without paying out.',
              },
              {
                num: '02',
                title: 'Supplemental Claim Recovery',
                text: 'Adjusters routinely miss damage at penetrations, ridge caps, valleys, and on the leeward slope. When we find it after the initial settlement, we file a supplemental claim with new photo documentation and an Xactimate-format scope. Most legitimate supplementals get partial or full additional payout.',
              },
              {
                num: '03',
                title: 'Depreciation Recovery',
                text: 'Most Alberta policies pay Actual Cash Value (ACV) upfront and hold back depreciation until work is complete. Many homeowners never claim that second payment. We close the loop — final invoice, completion photos, paperwork to your insurer. Typical recovery: $3,000–$8,000.',
              },
              {
                num: '04',
                title: 'Code Upgrade Reimbursement',
                text: 'Alberta Building Code changed since 2014: ice-and-water shield extension, ventilation thresholds, drip edge requirements. If your law-and-ordinance coverage applies, your insurer pays the upgrade — but only if someone documents it. Adjusters routinely skip this. We do not.',
              },
              {
                num: '05',
                title: 'Adjuster Meeting On-Site',
                text: 'If your insurer requests their own re-inspection, we meet the adjuster on the roof. A homeowner explaining hail damage to a 20-year roofing veteran rarely goes well. A roofer with photos and a line-item scope goes much better.',
              },
              {
                num: '06',
                title: 'Denied Claim Re-Inspection',
                text: 'Most denials trace back to incomplete initial documentation, not actual lack of damage. We re-inspect, document with date-stamped photos, and write a rebuttal package referencing the policy language. Roughly half of the denial rebuttals we file get partial or full reversal.',
              },
            ].map((item) => (
              <div key={item.num} style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-border-light)', borderLeft: '4px solid var(--color-primary)', borderRadius: '0 6px 6px 0', padding: '28px 30px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '12px' }}>
                  <span style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '28px', lineHeight: 1 }}>{item.num}</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '19px', color: 'var(--color-text-dark)', margin: 0, lineHeight: 1.25 }}>
                    {item.title}
                  </h3>
                </div>
                <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '15px', lineHeight: 1.65, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>

          {/* Authority stats strip */}
          <div className="rr-hail-stats" style={{ marginTop: '48px', padding: '32px 36px', backgroundColor: 'var(--color-base)', borderRadius: '6px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { stat: '1,200+', label: 'Hail claims documented since 2014' },
              { stat: '90+ min', label: 'Per-roof claim documentation' },
              { stat: '~50%', label: 'Denial rebuttals reversed (partial or full)' },
              { stat: '$3K–$8K', label: 'Typical depreciation recovery' },
            ].map((item) => (
              <div key={item.label} style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, lineHeight: 1 }}>{item.stat}</div>
                <div style={{ color: 'rgba(249,247,242,0.72)', fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 700, letterSpacing: '1.4px', textTransform: 'uppercase', marginTop: '10px', lineHeight: 1.4 }}>{item.label}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '36px', textAlign: 'center' }}>
            <PrimaryButton href="/contact">Free Pre-Claim Roof Inspection</PrimaryButton>
          </div>
        </div>
      </section>

      {/* ── Section 6: Insurance claim help ──────────────────────────────── */}
      <section style={{ padding: '86px 24px', backgroundColor: 'var(--color-cream)' }}>
        <div className="rr-two-col" style={{ maxWidth: '1180px', margin: '0 auto', display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <SectionHeader
              label="Insurance support"
              title="The Bridge Between You and Your Adjuster"
              text="If hail damaged your roof, your insurance company writes the cheque — but you still have to prove the damage. We give you the documentation adjusters take seriously."
            />
            <PrimaryButton href="/contact">Get Insurance-Ready Estimate</PrimaryButton>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, var(--color-cream) 100%)', border: '1px solid var(--color-border-light)', borderRadius: '6px', padding: '36px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '16px' }}>
              {[
                { title: 'Photo-documented hail damage report', text: 'Date-stamped, location-mapped, with severity notes. The kind of evidence that ends the argument.' },
                { title: 'Xactimate-format line-item estimate', text: 'Same software adjusters use. They recognize the format and process it faster.' },
                { title: 'No direct billing to your insurer', text: 'You stay in control. We give you a quote, you file the claim, the insurer pays you, you pay us.' },
                { title: 'Adjuster meeting on the roof', text: 'If your adjuster wants to do their own inspection, we meet them there. You should not be the one explaining hail damage.' },
                { title: 'Code upgrade documentation', text: 'Alberta Building Code changed. Older roofs need ice-and-water shield extensions and ventilation upgrades. We document what is required.' },
              ].map((item) => (
                <li key={item.title} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ flexShrink: 0, width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '13px', marginTop: '2px' }}>✓</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '15px', color: 'var(--color-text-dark)', marginBottom: '4px' }}>{item.title}</div>
                    <div style={{ color: 'var(--color-text-dark-muted)', fontSize: '14px', lineHeight: 1.6 }}>{item.text}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Section 6: Installation day timeline ─────────────────────────── */}
      <section style={{ padding: '96px 24px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionHeader
            label="What to expect"
            title="What Happens on Installation Day"
            text="Most Calgary residential roofs finish in one day. Here is the timeline so you know exactly what is happening on your property."
          />
          <div className="rr-timeline" style={{ display: 'grid', gap: '20px', marginTop: '32px' }}>
            {installSteps.map((step, i) => (
              <div key={step.time} className="rr-timeline-item" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '32px', padding: '24px 28px', backgroundColor: 'var(--color-cream)', borderLeft: '4px solid var(--color-primary)', borderRadius: '0 6px 6px 0' }}>
                <div>
                  <div style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '20px' }}>{step.time}</div>
                  <div style={{ color: 'var(--color-text-dark-muted)', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '4px' }}>Step {i + 1}</div>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', color: 'var(--color-text-dark)', marginBottom: '6px' }}>{step.title}</h3>
                  <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '15px', lineHeight: 1.65 }}>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 8: Reviews ───────────────────────────────────────────── */}
      <section style={{ padding: '86px 24px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionHeader label="Calgary homeowners" title="What Calgary Homeowners Say" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {homeReviews.map((review) => (
              <div key={review.id} style={{ border: '1px solid var(--color-border-light)', borderRadius: '6px', padding: '28px', backgroundColor: 'var(--color-cream)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < review.rating ? '#F5A623' : '#E5E0D8'}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p style={{ color: 'var(--color-text-dark)', fontSize: '15px', lineHeight: 1.65, marginBottom: '16px' }}>
                  &ldquo;{review.text}&rdquo;
                </p>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--color-text-dark)' }}>
                  {review.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 9: FAQ ──────────────────────────────────────────────── */}
      <FAQSection items={faqItems} title="Calgary Roof Replacement FAQ" />

      {/* ── Section 10: Final CTA ───────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--color-base)', padding: '82px 24px 104px', textAlign: 'center' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ color: '#F9F7F2', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 3.4vw, 40px)', marginBottom: '16px', lineHeight: 1.2 }}>
            Free On-Site Estimate. We Drive To You.
          </h2>
          <p style={{ color: 'rgba(249,247,242,0.78)', fontSize: '17px', lineHeight: 1.65, marginBottom: '32px' }}>
            Calgary, Airdrie, Cochrane, Chestermere, Okotoks. Same crew, same warranty. No pressure, no high-pitch sales call afterward.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <PrimaryButton href="/contact">Request Free Estimate</PrimaryButton>
            <SecondaryButton href="tel:403-608-9933">Call 403-608-9933</SecondaryButton>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1100px) {
          .rr-problems-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 968px) {
          .rr-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .rr-class4,
          .rr-two-col {
            grid-template-columns: 1fr !important;
          }
          .rr-class4 > div:last-child {
            height: 320px !important;
          }
          .rr-stats,
          .rr-hail-stats {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .rr-hail-grid,
          .rr-problems-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .rr-timeline-item {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
