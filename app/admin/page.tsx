// WEEKLY REMINDER SYSTEM
// Since we can't run background jobs in static Next.js,
// add a visual reminder in the dashboard:
// Show a banner if no post has been published in the last 7 days:
// "⚠️ No new posts this week — time to generate content!"
// This encourages consistent weekly publishing cadence.

'use client';

import { useState, useEffect, useCallback } from 'react';

const ADMIN_PASSWORD = 'cityroofing2026';
const SESSION_KEY = 'admin_authenticated';

// ─── Types ────────────────────────────────────────────────────────────────────

interface PostData {
  slug: string;
  frontmatter: {
    title?: string;
    status?: string;
    category?: string;
    date?: string;
    scheduledDate?: string;
  };
  readingTime: string;
  rawContent: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  materials: string[];
  completedDate: string;
  images: string[];
  beforeImage: string;
  afterImage: string;
  featured: boolean;
}

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  source: string;
  featured: boolean;
}

interface CompanyData {
  name: string;
  phone: string;
  address: string;
  hours: string;
  email: string;
  wechatQR: string;
  googleReviewCount: number;
  googleRating: number;
  yearsInBusiness: number;
  projectsCompleted: number;
  socialMedia: { facebook: string; instagram: string; linkedin: string };
}

type Section =
  | 'dashboard'
  | 'new-post'
  | 'drafts'
  | 'scheduled'
  | 'published'
  | 'projects'
  | 'reviews'
  | 'company';

// ─── Styles ───────────────────────────────────────────────────────────────────

const S = {
  sidebar: {
    width: '220px',
    flexShrink: 0,
    backgroundColor: '#111',
    borderRight: '1px solid #2a2a2a',
    padding: '24px 0',
    minHeight: 'calc(100vh - 72px)',
  } as React.CSSProperties,
  sideLink: (active: boolean): React.CSSProperties => ({
    display: 'block',
    padding: '12px 24px',
    color: active ? '#fff' : '#666',
    backgroundColor: active ? '#1a1a1a' : 'transparent',
    borderLeft: active ? '3px solid #C0392B' : '3px solid transparent',
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: '13px',
    cursor: 'pointer',
    letterSpacing: '0.5px',
    border: 'none',
    width: '100%',
    textAlign: 'left' as const,
    transition: 'color 150ms',
  }),
  sideGroup: {
    padding: '16px 24px 6px',
    fontSize: '10px',
    letterSpacing: '1.5px',
    color: '#444',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
  } as React.CSSProperties,
  card: {
    backgroundColor: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '6px',
    padding: '20px 24px',
  } as React.CSSProperties,
  input: {
    width: '100%',
    backgroundColor: '#111',
    border: '1px solid #2a2a2a',
    borderRadius: '4px',
    color: '#f5f5f5',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    padding: '10px 12px',
    outline: 'none',
  } as React.CSSProperties,
  textarea: {
    width: '100%',
    backgroundColor: '#111',
    border: '1px solid #2a2a2a',
    borderRadius: '4px',
    color: '#f5f5f5',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    padding: '10px 12px',
    resize: 'vertical' as const,
    outline: 'none',
  } as React.CSSProperties,
  select: {
    width: '100%',
    backgroundColor: '#111',
    border: '1px solid #2a2a2a',
    borderRadius: '4px',
    color: '#f5f5f5',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    padding: '10px 12px',
    outline: 'none',
  } as React.CSSProperties,
  btn: (variant: 'primary' | 'secondary' | 'ghost' | 'danger'): React.CSSProperties => ({
    padding: '10px 20px',
    borderRadius: '4px',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '13px',
    cursor: 'pointer',
    letterSpacing: '0.5px',
    border: variant === 'secondary' ? '1px solid #2a2a2a' : 'none',
    backgroundColor:
      variant === 'primary' ? '#C0392B'
      : variant === 'danger' ? '#7f1d1d'
      : variant === 'secondary' ? 'transparent'
      : '#1a1a1a',
    color: variant === 'primary' || variant === 'danger' ? '#fff' : '#9a9a9a',
    transition: 'opacity 150ms',
  }),
  label: {
    display: 'block',
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: '12px',
    color: '#9a9a9a',
    letterSpacing: '1px',
    textTransform: 'uppercase' as const,
    marginBottom: '8px',
  } as React.CSSProperties,
  statusBadge: (status: string): React.CSSProperties => ({
    padding: '3px 10px',
    borderRadius: '3px',
    fontSize: '11px',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    letterSpacing: '1px',
    textTransform: 'uppercase' as const,
    backgroundColor:
      status === 'published' ? '#14532d'
      : status === 'scheduled' ? '#1e3a5f'
      : '#2a2a2a',
    color:
      status === 'published' ? '#86efac'
      : status === 'scheduled' ? '#93c5fd'
      : '#9a9a9a',
  }),
};

// ─── Shared: Copy JSON Panel ───────────────────────────────────────────────────

function CopyJsonPanel({ json, filename, instruction }: { json: string; filename: string; instruction: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ ...S.card, marginTop: '24px', borderColor: '#1e3a5f' }}>
      <p style={{ color: '#93c5fd', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', marginBottom: '12px' }}>
        Generated JSON — {filename}
      </p>
      <textarea
        readOnly
        value={json}
        style={{ ...S.textarea, minHeight: '160px', fontFamily: 'monospace', fontSize: '12px', marginBottom: '12px' }}
      />
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => { navigator.clipboard.writeText(json).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); }}
          style={S.btn('primary')}
        >
          {copied ? 'Copied!' : 'Copy JSON'}
        </button>
        <p style={{ color: '#666', fontSize: '12px', lineHeight: 1.6 }}>{instruction}</p>
      </div>
    </div>
  );
}

// ─── Password Gate ─────────────────────────────────────────────────────────────

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { sessionStorage.setItem(SESSION_KEY, 'true'); onAuth(); }
    else { setError(true); setPw(''); }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f0f0f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ ...S.card, width: '360px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '22px', color: '#f5f5f5', marginBottom: '8px' }}>Admin Panel</h1>
        <p style={{ color: '#666', fontSize: '13px', marginBottom: '28px' }}>City Roofing &amp; Exteriors — Content Manager</p>
        <form onSubmit={submit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={S.label}>Password</label>
            <input type="password" value={pw} onChange={(e) => { setPw(e.target.value); setError(false); }} style={{ ...S.input, borderColor: error ? '#C0392B' : '#2a2a2a' }} placeholder="Enter admin password" autoFocus />
            {error && <p style={{ color: '#C0392B', fontSize: '12px', marginTop: '6px' }}>Incorrect password.</p>}
          </div>
          <button type="submit" style={{ ...S.btn('primary'), width: '100%', padding: '12px' }}>Sign In</button>
        </form>
      </div>
    </div>
  );
}

// ─── Dashboard Section ────────────────────────────────────────────────────────

function DashboardSection({ posts, onNavigate }: { posts: PostData[]; onNavigate: (s: Section) => void }) {
  const published = posts.filter((p) => p.frontmatter.status === 'published');
  const drafts = posts.filter((p) => p.frontmatter.status === 'draft');
  const scheduled = posts.filter((p) => p.frontmatter.status === 'scheduled');
  const now = new Date();
  const thisMonth = published.filter((p) => { const d = new Date(p.frontmatter.date ?? ''); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); });
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const showReminder = !published.some((p) => new Date(p.frontmatter.date ?? '') > sevenDaysAgo);
  const recent = posts.slice(0, 5);

  return (
    <div>
      {showReminder && (
        <div style={{ backgroundColor: '#7c2d12', border: '1px solid #c2410c', borderRadius: '6px', padding: '16px 20px', marginBottom: '28px', color: '#fdba74', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14px' }}>
          ⚠️ No new posts this week — time to generate content!
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '36px' }}>
        {[
          { label: 'Total Published', value: published.length, color: '#86efac' },
          { label: 'Drafts Pending', value: drafts.length, color: '#fbbf24' },
          { label: 'Scheduled', value: scheduled.length, color: '#93c5fd' },
          { label: 'This Month', value: thisMonth.length, color: '#f5f5f5' },
        ].map((s) => (
          <div key={s.label} style={S.card}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '36px', color: s.color, lineHeight: 1, marginBottom: '8px' }}>{s.value}</div>
            <div style={{ color: '#666', fontSize: '12px', fontFamily: 'var(--font-display)', letterSpacing: '0.5px' }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ ...S.card, marginBottom: '28px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '16px', color: '#f5f5f5', marginBottom: '20px' }}>Recent Activity</h2>
        {recent.length === 0 ? <p style={{ color: '#666', fontSize: '14px' }}>No posts yet.</p> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recent.map((p) => (
              <div key={p.slug} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #2a2a2a' }}>
                <div>
                  <div style={{ color: '#f5f5f5', fontSize: '14px', fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: '4px' }}>{p.frontmatter.title ?? p.slug}</div>
                  <div style={{ color: '#666', fontSize: '12px' }}>{p.frontmatter.date} · {p.readingTime}</div>
                </div>
                <span style={S.statusBadge(p.frontmatter.status ?? 'draft')}>{p.frontmatter.status ?? 'draft'}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <button onClick={() => onNavigate('new-post')} style={{ ...S.btn('primary'), padding: '14px 32px', fontSize: '15px' }}>+ Create New Post</button>
    </div>
  );
}

// ─── New Post Section ─────────────────────────────────────────────────────────

function NewPostSection({ initialContent }: { initialContent?: string }) {
  const [contentType, setContentType] = useState('Industry Update');
  const [topic, setTopic] = useState('');
  const [sourceContext, setSourceContext] = useState('');
  const [length, setLength] = useState('Standard (1000w)');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(initialContent ?? '');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  async function generate() {
    if (!topic.trim()) { setError('Please enter a topic or keywords.'); return; }
    setError(''); setGenerating(true);
    try {
      const res = await fetch('/api/generate-post', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contentType, topic, sourceContext, length }) });
      const data = await res.json();
      if (data.error) setError(data.error); else setGenerated(data.content);
    } catch { setError('Network error. Check your connection and try again.'); }
    finally { setGenerating(false); }
  }

  function saveDraft() {
    if (!generated) return;
    const slugMatch = generated.match(/^slug:\s*"?([^"\n]+)"?/m);
    const slug = slugMatch?.[1]?.trim() || 'draft-post';
    const blob = new Blob([generated], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${slug}.mdx`; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', color: '#f5f5f5', marginBottom: '24px' }}>AI Content Generator</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div><label style={S.label}>Content Type</label>
            <select value={contentType} onChange={(e) => setContentType(e.target.value)} style={S.select}>
              <option>Industry Update</option><option>Calgary Local News</option><option>Maintenance Tip</option><option>Project Showcase</option>
            </select>
          </div>
          <div><label style={S.label}>Topic / Keywords</label>
            <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} style={S.input} placeholder="e.g. Calgary hail season 2026, roof maintenance tips, Alberta building code update" />
          </div>
          <div><label style={S.label}>Source Context (optional)</label>
            <textarea value={sourceContext} onChange={(e) => setSourceContext(e.target.value)} style={{ ...S.textarea, minHeight: '120px' }} placeholder="Paste any reference information here — news snippet, data point, or topic notes. AI will use this as context only, not copy it." />
          </div>
          <div><label style={S.label}>Target Length</label>
            <select value={length} onChange={(e) => setLength(e.target.value)} style={S.select}>
              <option>Short (600w)</option><option>Standard (1000w)</option><option>Detailed (1400w)</option>
            </select>
          </div>
          {error && <p style={{ color: '#C0392B', fontSize: '13px', fontFamily: 'var(--font-display)' }}>{error}</p>}
          <button onClick={generate} disabled={generating} style={{ ...S.btn('primary'), padding: '12px 24px', opacity: generating ? 0.6 : 1 }}>
            {generating ? 'Generating your draft...' : 'Generate Draft'}
          </button>
        </div>
      </div>
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', color: '#f5f5f5', marginBottom: '24px' }}>Live Preview &amp; Editor</h2>
        <textarea value={generated} onChange={(e) => setGenerated(e.target.value)} style={{ ...S.textarea, minHeight: '480px', fontFamily: 'monospace', fontSize: '12px', lineHeight: 1.6, marginBottom: '16px' }} placeholder="Generated MDX will appear here. You can edit it directly before saving." />
        <div style={{ backgroundColor: '#111', border: '1px solid #2a2a2a', borderRadius: '4px', padding: '12px 16px', marginBottom: '16px' }}>
          <p style={{ color: '#666', fontSize: '12px', lineHeight: 1.6 }}>
            After saving, place the <code style={{ color: '#93c5fd' }}>.mdx</code> file in <code style={{ color: '#93c5fd' }}>content/news/</code> and run <code style={{ color: '#93c5fd' }}>npm run build</code> to publish.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button onClick={saveDraft} style={S.btn('primary')} disabled={!generated}>Save Draft (.mdx)</button>
          <button onClick={() => { navigator.clipboard.writeText(generated).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); }} style={S.btn('secondary')} disabled={!generated}>
            {copied ? 'Copied!' : 'Copy MDX'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Post List Section ─────────────────────────────────────────────────────────

function PostListSection({ posts, onEdit }: { posts: PostData[]; onEdit: (content: string) => void }) {
  const now = new Date();
  return (
    <div>
      {posts.length === 0 ? <p style={{ color: '#666', fontSize: '14px' }}>No posts in this category.</p> : (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 140px 100px', gap: '16px', padding: '10px 16px', backgroundColor: '#111', borderRadius: '4px 4px 0 0', borderBottom: '1px solid #2a2a2a' }}>
            {['Title', 'Category', 'Date', 'Actions'].map((h) => <span key={h} style={{ ...S.label, margin: 0, fontSize: '11px' }}>{h}</span>)}
          </div>
          {posts.map((p) => {
            const diff = p.frontmatter.scheduledDate ? new Date(p.frontmatter.scheduledDate).getTime() - now.getTime() : 0;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const countdown = p.frontmatter.status === 'scheduled' && diff > 0 ? (days === 0 ? 'Today' : `In ${days}d`) : '';
            return (
              <div key={p.slug} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 140px 100px', gap: '16px', padding: '14px 16px', borderBottom: '1px solid #2a2a2a', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
                <div>
                  <div style={{ color: '#f5f5f5', fontSize: '14px', fontFamily: 'var(--font-display)', fontWeight: 600 }}>{p.frontmatter.title ?? p.slug}</div>
                  {countdown && <div style={{ color: '#93c5fd', fontSize: '11px', marginTop: '4px', fontFamily: 'var(--font-display)' }}>Publishes {countdown}</div>}
                </div>
                <span style={{ color: '#9a9a9a', fontSize: '13px' }}>{p.frontmatter.category ?? '—'}</span>
                <span style={{ color: '#666', fontSize: '12px' }}>{p.frontmatter.date ?? '—'}</span>
                <button onClick={() => onEdit(p.rawContent)} style={S.btn('ghost')}>Edit</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────

const EMPTY_PROJECT: Omit<Project, 'id'> = {
  title: '', category: 'residential', location: '', description: '',
  materials: [], completedDate: '', images: [], beforeImage: '', afterImage: '', featured: false,
};

function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_PROJECT });
  const [materialsRaw, setMaterialsRaw] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>(['', '', '', '', '', '']);
  const [outputJson, setOutputJson] = useState('');

  useEffect(() => {
    fetch('/api/data/projects').then((r) => r.json()).then((d) => { setProjects(d); setLoading(false); });
  }, []);

  function buildProject(): Project {
    return {
      id: `proj-${Date.now()}`,
      ...form,
      materials: materialsRaw.split(',').map((s) => s.trim()).filter(Boolean),
      images: imageUrls.filter(Boolean),
    };
  }

  function saveProject() {
    const newProj = buildProject();
    const updated = [...projects, newProj];
    setOutputJson(JSON.stringify(updated, null, 2));
  }

  if (loading) return <p style={{ color: '#666' }}>Loading...</p>;

  return (
    <div>
      {/* How to add images */}
      <div style={{ backgroundColor: '#111', border: '1px solid #2a2a2a', borderRadius: '6px', padding: '16px 20px', marginBottom: '28px' }}>
        <p style={{ color: '#93c5fd', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', marginBottom: '10px' }}>How to Add Project Images</p>
        <ol style={{ color: '#666', fontSize: '13px', lineHeight: 1.8, paddingLeft: '20px' }}>
          <li>Place image files in <code style={{ color: '#fdba74' }}>public/images/projects/</code></li>
          <li>Name them clearly: <code style={{ color: '#fdba74' }}>proj-001-after.jpg</code>, <code style={{ color: '#fdba74' }}>proj-001-before.jpg</code></li>
          <li>In the project form below, enter the filename (e.g. <code style={{ color: '#fdba74' }}>proj-001-after.jpg</code>)</li>
          <li>Run <code style={{ color: '#fdba74' }}>npm run build</code> to see changes</li>
        </ol>
        <p style={{ color: '#444', fontSize: '12px', marginTop: '10px', fontStyle: 'italic' }}>
          Cloudinary integration coming in Phase 2 — will enable direct image upload from this panel.
        </p>
      </div>

      {/* Project list */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px 140px 100px 80px 120px', gap: '12px', padding: '10px 16px', backgroundColor: '#111', borderRadius: '4px 4px 0 0', borderBottom: '1px solid #2a2a2a' }}>
          {['Title', 'Category', 'Location', 'Date', 'Images', 'Actions'].map((h) => <span key={h} style={{ ...S.label, margin: 0, fontSize: '11px' }}>{h}</span>)}
        </div>
        {projects.map((p) => (
          <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '1fr 110px 140px 100px 80px 120px', gap: '12px', padding: '14px 16px', borderBottom: '1px solid #2a2a2a', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
            <div style={{ color: '#f5f5f5', fontSize: '14px', fontFamily: 'var(--font-display)', fontWeight: 600 }}>{p.title}</div>
            <span style={{ color: '#9a9a9a', fontSize: '13px' }}>{p.category}</span>
            <span style={{ color: '#666', fontSize: '12px' }}>{p.location}</span>
            <span style={{ color: '#666', fontSize: '12px' }}>{p.completedDate}</span>
            <span style={{ color: '#666', fontSize: '12px' }}>{p.images.length + (p.afterImage ? 1 : 0) + (p.beforeImage ? 1 : 0)}</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => {
                  setForm({ title: p.title, category: p.category, location: p.location, description: p.description, materials: p.materials, completedDate: p.completedDate, images: p.images, beforeImage: p.beforeImage, afterImage: p.afterImage, featured: p.featured });
                  setMaterialsRaw(p.materials.join(', '));
                  const imgs = [...p.images, '', '', '', '', '', ''].slice(0, 6);
                  setImageUrls(imgs);
                  setShowForm(true);
                }}
                style={S.btn('ghost')}
              >Edit</button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p style={{ color: '#666', fontSize: '14px', padding: '20px 16px' }}>No projects yet.</p>}
      </div>

      <button onClick={() => { setForm({ ...EMPTY_PROJECT }); setMaterialsRaw(''); setImageUrls(['', '', '', '', '', '']); setShowForm(true); setOutputJson(''); }} style={S.btn('primary')}>
        + Add New Project
      </button>

      {/* Add/Edit form */}
      {showForm && (
        <div style={{ ...S.card, marginTop: '28px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '17px', color: '#f5f5f5', marginBottom: '24px' }}>Project Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div><label style={S.label}>Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={S.input} /></div>
            <div><label style={S.label}>Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={S.select}>
                <option value="residential">Residential</option><option value="commercial">Commercial</option><option value="siding">Siding</option><option value="repair">Repair</option>
              </select>
            </div>
            <div><label style={S.label}>Location</label><input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} style={S.input} placeholder="e.g. NE Calgary" /></div>
            <div><label style={S.label}>Completed Date</label><input type="date" value={form.completedDate} onChange={(e) => setForm({ ...form, completedDate: e.target.value })} style={S.input} /></div>
          </div>
          <div style={{ marginTop: '20px' }}><label style={S.label}>Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ ...S.textarea, minHeight: '100px' }} /></div>
          <div style={{ marginTop: '20px' }}><label style={S.label}>Materials (comma separated)</label><input value={materialsRaw} onChange={(e) => setMaterialsRaw(e.target.value)} style={S.input} placeholder="IKO Dynasty, Ice & Water Shield, Synthetic Underlayment" /></div>
          <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div><label style={S.label}>Before Image filename</label><input value={form.beforeImage} onChange={(e) => setForm({ ...form, beforeImage: e.target.value })} style={S.input} placeholder="proj-001-before.jpg" /></div>
            <div><label style={S.label}>After Image filename</label><input value={form.afterImage} onChange={(e) => setForm({ ...form, afterImage: e.target.value })} style={S.input} placeholder="proj-001-after.jpg" /></div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <label style={S.label}>Additional Image filenames (up to 6)</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {imageUrls.map((url, i) => (
                <div key={i}>
                  <input value={url} onChange={(e) => { const u = [...imageUrls]; u[i] = e.target.value; setImageUrls(u); }} style={S.input} placeholder={`Image ${i + 1} filename`} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <label style={S.label}>Featured</label>
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
            <span style={{ color: '#666', fontSize: '13px' }}>Show on homepage</span>
          </div>
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
            <button onClick={saveProject} style={S.btn('primary')}>Generate JSON</button>
            <button onClick={() => setShowForm(false)} style={S.btn('secondary')}>Cancel</button>
          </div>
        </div>
      )}

      {outputJson && (
        <CopyJsonPanel
          json={outputJson}
          filename="data/projects.json"
          instruction="Replace data/projects.json with this content, then run npm run build to publish."
        />
      )}
    </div>
  );
}

// ─── Reviews Section ──────────────────────────────────────────────────────────

const EMPTY_REVIEW: Omit<Review, 'id'> = { name: '', rating: 5, text: '', date: '', source: 'Google', featured: false };

function ReviewsAdminSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_REVIEW });
  const [outputJson, setOutputJson] = useState('');

  useEffect(() => {
    fetch('/api/data/reviews').then((r) => r.json()).then((d) => { setReviews(d); setLoading(false); });
  }, []);

  function toggleFeatured(id: string) {
    const updated = reviews.map((r) => r.id === id ? { ...r, featured: !r.featured } : r);
    setReviews(updated);
    setOutputJson(JSON.stringify(updated, null, 2));
  }

  function addReview() {
    const newRev: Review = { id: `rev-${Date.now()}`, ...form };
    const updated = [...reviews, newRev];
    setReviews(updated);
    setOutputJson(JSON.stringify(updated, null, 2));
    setShowForm(false);
    setForm({ ...EMPTY_REVIEW });
  }

  if (loading) return <p style={{ color: '#666' }}>Loading...</p>;

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 120px 100px 80px', gap: '12px', padding: '10px 16px', backgroundColor: '#111', borderRadius: '4px 4px 0 0', borderBottom: '1px solid #2a2a2a' }}>
          {['Name', 'Rating', 'Date', 'Source', 'Featured'].map((h) => <span key={h} style={{ ...S.label, margin: 0, fontSize: '11px' }}>{h}</span>)}
        </div>
        {reviews.map((r) => (
          <div key={r.id} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 120px 100px 80px', gap: '12px', padding: '14px 16px', borderBottom: '1px solid #2a2a2a', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
            <div>
              <div style={{ color: '#f5f5f5', fontSize: '14px', fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: '4px' }}>{r.name}</div>
              <div style={{ color: '#666', fontSize: '12px' }}>{r.text.slice(0, 60)}...</div>
            </div>
            <span style={{ color: '#F59E0B', fontSize: '13px' }}>{'★'.repeat(r.rating)}</span>
            <span style={{ color: '#666', fontSize: '12px' }}>{r.date}</span>
            <span style={{ color: '#9a9a9a', fontSize: '13px' }}>{r.source}</span>
            <button
              onClick={() => toggleFeatured(r.id)}
              style={{ ...S.btn(r.featured ? 'primary' : 'ghost'), padding: '6px 12px', fontSize: '12px' }}
            >
              {r.featured ? 'Yes' : 'No'}
            </button>
          </div>
        ))}
      </div>

      <button onClick={() => setShowForm(true)} style={S.btn('primary')}>+ Add Review</button>

      {showForm && (
        <div style={{ ...S.card, marginTop: '28px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '17px', color: '#f5f5f5', marginBottom: '24px' }}>New Review</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div><label style={S.label}>Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={S.input} /></div>
            <div><label style={S.label}>Rating (1–5)</label>
              <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} style={S.select}>
                {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div><label style={S.label}>Date</label><input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} style={S.input} /></div>
            <div><label style={S.label}>Source</label><input value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} style={S.input} /></div>
          </div>
          <div style={{ marginTop: '20px' }}><label style={S.label}>Review Text</label><textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} style={{ ...S.textarea, minHeight: '100px' }} /></div>
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <label style={S.label}>Featured</label>
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
          </div>
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
            <button onClick={addReview} style={S.btn('primary')}>Add &amp; Generate JSON</button>
            <button onClick={() => setShowForm(false)} style={S.btn('secondary')}>Cancel</button>
          </div>
        </div>
      )}

      {outputJson && (
        <CopyJsonPanel
          json={outputJson}
          filename="data/reviews.json"
          instruction="Replace data/reviews.json with this content, then run npm run build to publish."
        />
      )}
    </div>
  );
}

// ─── Company Section ──────────────────────────────────────────────────────────

function CompanySection() {
  const [data, setData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [outputJson, setOutputJson] = useState('');

  useEffect(() => {
    fetch('/api/data/company').then((r) => r.json()).then((d) => { setData(d); setLoading(false); });
  }, []);

  if (loading || !data) return <p style={{ color: '#666' }}>Loading...</p>;

  function save() { setOutputJson(JSON.stringify(data, null, 2)); }

  return (
    <div>
      <div style={{ ...S.card }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '17px', color: '#f5f5f5', marginBottom: '24px' }}>Business Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {([
            ['Company Name', 'name'],
            ['Phone', 'phone'],
            ['Email', 'email'],
            ['Hours', 'hours'],
          ] as [string, keyof CompanyData][]).map(([label, key]) => (
            <div key={key}>
              <label style={S.label}>{label}</label>
              <input value={String(data[key] ?? '')} onChange={(e) => setData({ ...data, [key]: e.target.value })} style={S.input} />
            </div>
          ))}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={S.label}>Address</label>
            <input value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} style={S.input} />
          </div>
          <div><label style={S.label}>Google Review Count</label><input type="number" value={data.googleReviewCount} onChange={(e) => setData({ ...data, googleReviewCount: Number(e.target.value) })} style={S.input} /></div>
          <div><label style={S.label}>Google Rating</label><input type="number" step="0.1" min="1" max="5" value={data.googleRating} onChange={(e) => setData({ ...data, googleRating: Number(e.target.value) })} style={S.input} /></div>
          <div><label style={S.label}>Years in Business</label><input type="number" value={data.yearsInBusiness} onChange={(e) => setData({ ...data, yearsInBusiness: Number(e.target.value) })} style={S.input} /></div>
          <div><label style={S.label}>Projects Completed</label><input type="number" value={data.projectsCompleted} onChange={(e) => setData({ ...data, projectsCompleted: Number(e.target.value) })} style={S.input} /></div>
        </div>

        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '17px', color: '#f5f5f5', margin: '28px 0 20px' }}>Social Media</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {(['facebook', 'instagram', 'linkedin'] as const).map((platform) => (
            <div key={platform}>
              <label style={S.label}>{platform.charAt(0).toUpperCase() + platform.slice(1)}</label>
              <input value={data.socialMedia[platform]} onChange={(e) => setData({ ...data, socialMedia: { ...data.socialMedia, [platform]: e.target.value } })} style={S.input} placeholder={`https://${platform}.com/...`} />
            </div>
          ))}
          <div><label style={S.label}>WeChat QR Image URL</label><input value={data.wechatQR} onChange={(e) => setData({ ...data, wechatQR: e.target.value })} style={S.input} placeholder="/images/wechat-qr.png" /></div>
        </div>

        <button onClick={save} style={{ ...S.btn('primary'), marginTop: '24px' }}>Generate JSON</button>
      </div>

      {outputJson && (
        <CopyJsonPanel
          json={outputJson}
          filename="data/company.json"
          instruction="Replace data/company.json with this content, then run npm run build to publish."
        />
      )}
    </div>
  );
}

// ─── Admin Dashboard ───────────────────────────────────────────────────────────

function AdminDashboard() {
  const [section, setSection] = useState<Section>('dashboard');
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editContent, setEditContent] = useState<string | undefined>(undefined);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try { const res = await fetch('/api/posts'); const data = await res.json(); setPosts(data.posts ?? []); }
    catch { /* dev tool, fail silently */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  function handleEdit(content: string) { setEditContent(content); setSection('new-post'); }

  const published = posts.filter((p) => p.frontmatter.status === 'published');
  const drafts = posts.filter((p) => p.frontmatter.status === 'draft');
  const scheduled = posts.filter((p) => p.frontmatter.status === 'scheduled');

  const navGroups = [
    {
      label: 'Content',
      items: [
        { label: 'Dashboard', key: 'dashboard' as Section },
        { label: 'New Post', key: 'new-post' as Section },
        { label: `Drafts (${drafts.length})`, key: 'drafts' as Section },
        { label: `Scheduled (${scheduled.length})`, key: 'scheduled' as Section },
        { label: `Published (${published.length})`, key: 'published' as Section },
      ],
    },
    {
      label: 'Site Data',
      items: [
        { label: 'Projects', key: 'projects' as Section },
        { label: 'Reviews', key: 'reviews' as Section },
        { label: 'Company Info', key: 'company' as Section },
      ],
    },
  ];

  const titles: Record<Section, string> = {
    dashboard: 'Dashboard', 'new-post': editContent ? 'Edit Post' : 'New Post',
    drafts: 'Drafts', scheduled: 'Scheduled', published: 'Published',
    projects: 'Projects', reviews: 'Reviews', company: 'Company Info',
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 72px)', paddingTop: '72px' }}>
      {/* Sidebar */}
      <nav style={S.sidebar}>
        <div style={{ padding: '0 24px 20px', borderBottom: '1px solid #2a2a2a', marginBottom: '8px' }}>
          <div style={{ color: '#f5f5f5', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '14px' }}>City Roofing</div>
          <div style={{ color: '#666', fontSize: '11px', marginTop: '4px' }}>Content Admin</div>
        </div>
        {navGroups.map((group) => (
          <div key={group.label}>
            <div style={S.sideGroup}>{group.label}</div>
            {group.items.map((item) => (
              <button
                key={item.key}
                onClick={() => { if (item.key === 'new-post') setEditContent(undefined); setSection(item.key); }}
                style={S.sideLink(section === item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Main content */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto', backgroundColor: '#0f0f0f' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '24px', color: '#f5f5f5', marginBottom: '32px' }}>
          {titles[section]}
        </h1>
        {loading && (section === 'dashboard' || section === 'drafts' || section === 'scheduled' || section === 'published') ? (
          <p style={{ color: '#666', fontSize: '14px' }}>Loading...</p>
        ) : (
          <>
            {section === 'dashboard' && <DashboardSection posts={posts} onNavigate={setSection} />}
            {section === 'new-post' && <NewPostSection initialContent={editContent} />}
            {section === 'drafts' && <PostListSection posts={drafts} onEdit={handleEdit} />}
            {section === 'scheduled' && <PostListSection posts={scheduled} onEdit={handleEdit} />}
            {section === 'published' && <PostListSection posts={published} onEdit={handleEdit} />}
            {section === 'projects' && <ProjectsSection />}
            {section === 'reviews' && <ReviewsAdminSection />}
            {section === 'company' && <CompanySection />}
          </>
        )}
      </main>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  useEffect(() => { setAuthenticated(sessionStorage.getItem(SESSION_KEY) === 'true'); }, []);

  if (authenticated === null) return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f0f0f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#666', fontFamily: 'var(--font-display)', fontSize: '14px' }}>Loading...</div>
    </div>
  );

  if (!authenticated) return <PasswordGate onAuth={() => setAuthenticated(true)} />;
  return <AdminDashboard />;
}
