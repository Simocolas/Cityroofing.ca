// WEEKLY REMINDER SYSTEM
// Since we can't run background jobs in static Next.js,
// add a visual reminder in the dashboard:
// Show a banner if no post has been published in the last 7 days:
// "⚠️ No new posts this week — time to generate content!"
// This encourages consistent weekly publishing cadence.

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

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
  image: string;
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
  | 'drafts'
  | 'scheduled'
  | 'published'
  | 'ai-news-writer'
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
      <button onClick={() => onNavigate('ai-news-writer')} style={{ ...S.btn('primary'), padding: '14px 32px', fontSize: '15px' }}>✨ Generate New Article</button>
    </div>
  );
}

// ─── Post List Section ─────────────────────────────────────────────────────────

function PostListSection({ posts, onRefresh }: { posts: PostData[]; onRefresh: () => void }) {
  const now = new Date();
  const [deleteTarget, setDeleteTarget] = useState<PostData | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState('');
  const [editTarget, setEditTarget] = useState<PostData | null>(null);
  const [editContent, setEditContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  function openEdit(post: PostData) {
    setEditTarget(post);
    setEditContent(post.rawContent);
    setSaveMsg('');
  }

  function closeEdit() {
    setEditTarget(null);
    setEditContent('');
    setSaveMsg('');
  }

  async function handleSave() {
    if (!editTarget) return;
    setSaving(true);
    setSaveMsg('');
    const isDraft = editTarget.frontmatter.status === 'draft';
    try {
      const res = await fetch('/api/posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Key': ADMIN_PASSWORD },
        body: JSON.stringify({ slug: editTarget.slug, mdxContent: editContent, draft: isDraft }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveMsg('✅ Saved' + (data.gitOutput ? `\n\n─── Git ───\n${data.gitOutput}` : ''));
        onRefresh();
      } else {
        setSaveMsg(`❌ ${data.error}`);
      }
    } catch (e: unknown) {
      setSaveMsg(`❌ ${e instanceof Error ? e.message : 'Failed'}`);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteMsg('');
    const isDraft = deleteTarget.frontmatter.status === 'draft';
    try {
      const res = await fetch('/api/posts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Key': ADMIN_PASSWORD },
        body: JSON.stringify({ slug: deleteTarget.slug, draft: isDraft }),
      });
      const data = await res.json();
      if (data.success) {
        setDeleteTarget(null);
        onRefresh();
      } else {
        setDeleteMsg(`❌ ${data.error}`);
      }
    } catch (e: unknown) {
      setDeleteMsg(`❌ ${e instanceof Error ? e.message : 'Failed'}`);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      {/* Delete confirmation */}
      {deleteTarget && (
        <div style={{ backgroundColor: '#7f1d1d', border: '1px solid #991b1b', borderRadius: '6px', padding: '20px 24px', marginBottom: '20px' }}>
          <p style={{ color: '#fca5a5', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', marginBottom: '16px' }}>
            Delete &ldquo;{deleteTarget.frontmatter.title ?? deleteTarget.slug}&rdquo;? This cannot be undone.
          </p>
          {deleteMsg && <p style={{ color: '#fca5a5', fontSize: '12px', marginBottom: '12px' }}>{deleteMsg}</p>}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handleDelete} disabled={deleting} style={{ ...S.btn('danger'), opacity: deleting ? 0.6 : 1 }}>
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
            <button onClick={() => { setDeleteTarget(null); setDeleteMsg(''); }} style={S.btn('secondary')}>Cancel</button>
          </div>
        </div>
      )}

      {/* Post list */}
      {posts.length === 0 ? <p style={{ color: '#666', fontSize: '14px' }}>No posts in this category.</p> : (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 140px 150px', gap: '16px', padding: '10px 16px', backgroundColor: '#111', borderRadius: '4px 4px 0 0', borderBottom: '1px solid #2a2a2a' }}>
            {['Title', 'Category', 'Date', 'Actions'].map((h) => <span key={h} style={{ ...S.label, margin: 0, fontSize: '11px' }}>{h}</span>)}
          </div>
          {posts.map((p) => {
            const diff = p.frontmatter.scheduledDate ? new Date(p.frontmatter.scheduledDate).getTime() - now.getTime() : 0;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const countdown = p.frontmatter.status === 'scheduled' && diff > 0 ? (days === 0 ? 'Today' : `In ${days}d`) : '';
            return (
              <div key={p.slug} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 140px 150px', gap: '16px', padding: '14px 16px', borderBottom: '1px solid #2a2a2a', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
                <div>
                  <div style={{ color: '#f5f5f5', fontSize: '14px', fontFamily: 'var(--font-display)', fontWeight: 600 }}>{p.frontmatter.title ?? p.slug}</div>
                  {countdown && <div style={{ color: '#93c5fd', fontSize: '11px', marginTop: '4px', fontFamily: 'var(--font-display)' }}>Publishes {countdown}</div>}
                </div>
                <span style={{ color: '#9a9a9a', fontSize: '13px' }}>{p.frontmatter.category ?? '—'}</span>
                <span style={{ color: '#666', fontSize: '12px' }}>{p.frontmatter.date ?? '—'}</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => openEdit(p)} style={{ ...S.btn('ghost'), padding: '6px 10px', fontSize: '12px' }}>Edit</button>
                  <button onClick={() => setDeleteTarget(p)} style={{ ...S.btn('danger'), padding: '6px 10px', fontSize: '12px' }}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit modal overlay */}
      {editTarget && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.88)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ ...S.card, width: '100%', maxWidth: '940px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Modal header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexShrink: 0 }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '17px', color: '#f5f5f5', margin: 0 }}>Edit Article</h2>
                <p style={{ color: '#555', fontSize: '12px', marginTop: '4px', fontFamily: 'monospace' }}>{editTarget.slug}.mdx</p>
              </div>
              <button onClick={closeEdit} style={{ ...S.btn('ghost'), padding: '6px 14px', flexShrink: 0 }}>✕ Close</button>
            </div>

            {/* MDX editor */}
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              style={{ ...S.textarea, flex: 1, minHeight: '460px', fontFamily: 'monospace', fontSize: '12px', lineHeight: 1.6 }}
            />

            {/* Save result */}
            {saveMsg && (
              <pre style={{ backgroundColor: '#0d0d0d', border: '1px solid #2a2a2a', borderRadius: '4px', padding: '10px 14px', color: '#86efac', fontSize: '12px', fontFamily: 'monospace', whiteSpace: 'pre-wrap', margin: 0, flexShrink: 0 }}>
                {saveMsg}
              </pre>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
              <button onClick={handleSave} disabled={saving} style={{ ...S.btn('primary'), opacity: saving ? 0.6 : 1 }}>
                {saving ? 'Saving...' : editTarget.frontmatter.status === 'published' ? '🚀 Save & Push' : '💾 Save Draft'}
              </button>
              <button onClick={closeEdit} style={S.btn('secondary')}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────

const PROJ_FORM_EMPTY = {
  title: '', category: 'residential', location: '', description: '', image: '', featured: false,
};

const PROJ_CAT_COLORS: Record<string, { bg: string; color: string }> = {
  residential: { bg: '#14532d', color: '#86efac' },
  commercial:  { bg: '#1e3a5f', color: '#93c5fd' },
  siding:      { bg: '#7c2d12', color: '#fdba74' },
  repair:      { bg: '#7f1d1d', color: '#fca5a5' },
};

function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...PROJ_FORM_EMPTY });
  const [imagePreview, setImagePreview] = useState('');
  const [imageName, setImageName] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [outputJson, setOutputJson] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetch('/api/data/projects').then((r) => r.json()).then((d) => { setProjects(d); setLoading(false); });
  }, []);

  function openNew() {
    setEditingId(null);
    setForm({ ...PROJ_FORM_EMPTY });
    setImagePreview('');
    setImageName('');
    setShowForm(true);
    setOutputJson('');
  }

  function openEdit(p: Project) {
    setEditingId(p.id);
    setForm({ title: p.title, category: p.category, location: p.location, description: p.description || '', image: p.image || p.afterImage || '', featured: p.featured });
    setImagePreview(p.image || p.afterImage || '');
    setImageName('');
    setShowForm(true);
    setOutputJson('');
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
    const slug = (form.title || 'project').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    setImageName(`${slug}.${ext}`);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function save() {
    if (!form.title.trim()) { alert('Project title is required.'); return; }
    const imagePath = imageName ? `/images/projects/${imageName}` : form.image;
    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    let updated: Project[];
    if (editingId) {
      updated = projects.map((p) => p.id === editingId ? { ...p, ...form, image: imagePath, afterImage: imagePath } : p);
    } else {
      const newProj: Project = {
        id: `proj-${slug}-${Date.now()}`,
        title: form.title, category: form.category, location: form.location,
        description: form.description, materials: [], images: [],
        completedDate: new Date().toISOString().split('T')[0],
        beforeImage: '', afterImage: imagePath, image: imagePath,
        featured: form.featured,
      };
      updated = [...projects, newProj];
    }
    setProjects(updated);
    setOutputJson(JSON.stringify(updated, null, 2));
    setShowForm(false);
    setSuccessMsg(editingId ? 'Project updated.' : 'Project added.');
    setTimeout(() => setSuccessMsg(''), 3000);
  }

  function doDelete() {
    if (!deleteConfirm) return;
    const updated = projects.filter((p) => p.id !== deleteConfirm);
    setProjects(updated);
    setOutputJson(JSON.stringify(updated, null, 2));
    setDeleteConfirm(null);
    setSuccessMsg('Project deleted.');
    setTimeout(() => setSuccessMsg(''), 3000);
  }

  if (loading) return <p style={{ color: '#666' }}>Loading...</p>;

  return (
    <div>
      {/* Success message */}
      {successMsg && (
        <div style={{ backgroundColor: '#14532d', border: '1px solid #166534', borderRadius: '6px', padding: '12px 20px', marginBottom: '20px', color: '#86efac', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px' }}>
          ✓ {successMsg}
        </div>
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div style={{ backgroundColor: '#7f1d1d', border: '1px solid #991b1b', borderRadius: '6px', padding: '20px 24px', marginBottom: '20px' }}>
          <p style={{ color: '#fca5a5', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', marginBottom: '16px' }}>
            Delete &ldquo;{projects.find((p) => p.id === deleteConfirm)?.title}&rdquo;? This cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={doDelete} style={S.btn('danger')}>Delete</button>
            <button onClick={() => setDeleteConfirm(null)} style={S.btn('secondary')}>Cancel</button>
          </div>
        </div>
      )}

      {/* Projects table */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '68px 1fr 110px 130px 110px', gap: '12px', padding: '10px 16px', backgroundColor: '#111', borderRadius: '4px 4px 0 0', borderBottom: '1px solid #2a2a2a' }}>
          {['', 'Title', 'Category', 'Location', 'Actions'].map((h, i) => (
            <span key={i} style={{ ...S.label, margin: 0, fontSize: '11px' }}>{h}</span>
          ))}
        </div>

        {projects.map((p) => {
          const imgSrc = p.image || p.afterImage || '';
          const cat = PROJ_CAT_COLORS[p.category] ?? { bg: '#2a2a2a', color: '#9a9a9a' };
          return (
            <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '68px 1fr 110px 130px 110px', gap: '12px', padding: '12px 16px', borderBottom: '1px solid #2a2a2a', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
              {/* Thumbnail */}
              <div style={{ width: '60px', height: '44px', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#2a2a2a', flexShrink: 0 }}>
                {imgSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imgSrc} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '16px', opacity: 0.2 }}>🏠</span>
                  </div>
                )}
              </div>
              {/* Title */}
              <div>
                <div style={{ color: '#f5f5f5', fontSize: '14px', fontFamily: 'var(--font-display)', fontWeight: 600 }}>{p.title}</div>
                {p.featured && <span style={{ fontSize: '10px', color: '#F59E0B', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.5px' }}>★ FEATURED</span>}
              </div>
              {/* Category badge */}
              <span style={{ backgroundColor: cat.bg, color: cat.color, fontSize: '11px', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '3px', display: 'inline-block' }}>
                {p.category}
              </span>
              {/* Location */}
              <span style={{ color: '#666', fontSize: '12px' }}>{p.location}</span>
              {/* Actions */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => openEdit(p)} style={{ ...S.btn('ghost'), padding: '6px 10px', fontSize: '12px' }}>Edit</button>
                <button onClick={() => setDeleteConfirm(p.id)} style={{ ...S.btn('danger'), padding: '6px 10px', fontSize: '12px' }}>Del</button>
              </div>
            </div>
          );
        })}

        {projects.length === 0 && (
          <p style={{ color: '#666', fontSize: '14px', padding: '20px 16px', backgroundColor: '#1a1a1a' }}>No projects yet.</p>
        )}
      </div>

      <button onClick={openNew} style={S.btn('primary')}>+ Add New Project</button>

      {/* Add / Edit form */}
      {showForm && (
        <div style={{ ...S.card, marginTop: '28px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '17px', color: '#f5f5f5', marginBottom: '24px' }}>
            {editingId ? 'Edit Project' : 'Add New Project'}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={S.label}>Project Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={S.input} placeholder="e.g. Residential Roof Replacement" />
            </div>
            <div>
              <label style={S.label}>Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={S.select}>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="siding">Siding</option>
                <option value="repair">Repair</option>
              </select>
            </div>
            <div>
              <label style={S.label}>Location</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} style={S.input} placeholder="NE Calgary" />
            </div>
            <div>
              <label style={S.label}>Image Upload (.jpg .jpeg .png .webp)</label>
              <input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleImageSelect} style={{ ...S.input, padding: '7px 12px', cursor: 'pointer' }} />
              {imageName && (
                <p style={{ color: '#666', fontSize: '11px', marginTop: '6px', fontFamily: 'monospace' }}>
                  → Save to: public/images/projects/{imageName}
                </p>
              )}
            </div>
          </div>

          {/* Image preview */}
          {imagePreview && (
            <div style={{ marginTop: '16px' }}>
              <label style={S.label}>Preview</label>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview} alt="Preview" style={{ width: '200px', height: '140px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #2a2a2a', display: 'block' }} />
            </div>
          )}

          <div style={{ marginTop: '20px' }}>
            <label style={S.label}>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ ...S.textarea, minHeight: '80px' }} placeholder="Brief project description" />
          </div>

          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input type="checkbox" id="proj-featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#C0392B' }} />
            <label htmlFor="proj-featured" style={{ ...S.label, margin: 0, cursor: 'pointer' }}>Featured — show on homepage</label>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
            <button onClick={save} style={S.btn('primary')}>Save &amp; Generate JSON</button>
            <button onClick={() => setShowForm(false)} style={S.btn('secondary')}>Cancel</button>
          </div>
        </div>
      )}

      {outputJson && (
        <CopyJsonPanel
          json={outputJson}
          filename="data/projects.json"
          instruction={imageName
            ? `① Save your image file to: public/images/projects/${imageName}  ② Replace data/projects.json with this JSON  ③ Run npm run build`
            : 'Replace data/projects.json with this content, then run npm run build to publish.'}
        />
      )}
    </div>
  );
}

// ─── AI News Writer Section ───────────────────────────────────────────────────

const GEN_STEPS = [
  '🔍 Scanning Canadian news sources...',
  '📰 Building roofing connection & research brief...',
  '🗂️ Designing article blueprint...',
  '✍️ Writing SEO article from blueprint...',
  '🖼️ Generating image prompts...',
];

const CONTENT_TYPES = ['Roofing Maintenance', 'Emergency Repair', 'Material Guide', 'Local Weather Tips', 'Cost & Financing', 'Insurance Claims'];

function renderMdxPreview(mdx: string): string {
  const withoutFm = mdx.replace(/^---[\s\S]*?---\n?/, '');
  return withoutFm
    .replace(/^## (.+)$/gm, '<h2 style="font-size:17px;font-weight:800;margin:20px 0 8px;color:#1a1a1a;font-family:var(--font-display)">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:14px;font-weight:700;margin:16px 0 6px;color:#1a1a1a;font-family:var(--font-display)">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^> (.+)$/gm, '<blockquote style="border-left:3px solid #C0392B;padding:8px 16px;margin:12px 0;background:#fff5f5;color:#555;border-radius:0 4px 4px 0">$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li style="margin:3px 0;color:#444;padding-left:4px">• $1</li>')
    .replace(/\n\n/g, '</p><p style="margin:10px 0;color:#444;line-height:1.7;font-size:14px">')
    .replace(/\n/g, ' ');
}

// ── Research / Blueprint result types ────────────────────────────────────────
interface ResearchResult {
  selected_story?: { headline?: string; source?: string; published_date?: string; url?: string; why_high_traffic?: string };
  connection_bridge?: { link_to_roofing?: string; professional_angle?: string; homeowner_implication?: string };
  suggested_primary_keyword?: string;
  best_category?: string;
}

interface BlueprintResult {
  chosen_title?: string;
  slug?: string;
  unique_angle?: string;
  description?: string;
  keywords_list?: string[];
  quick_answer?: string;
  news_hook_section?: { heading?: string; purpose?: string };
  structure?: { level?: string; heading?: string; word_count_target?: number; key_points?: string[]; eeeat_injection?: string | null; internal_link?: string | null }[];
  faq?: { question?: string; answer_direction?: string }[];
  cta_primary_page?: string;
  target_word_count?: number;
}

interface ImagePromptItem {
  prompt?: string;
  negative_prompt?: string;
  alt_text?: string;
  use_case?: string;
}

interface ImageResult {
  featured_image?: ImagePromptItem;
  inline_1?: ImagePromptItem;
  inline_2?: ImagePromptItem;
}

function AINewsWriterSection() {
  const [topicMode, setTopicMode] = useState<'auto' | 'custom'>('auto');
  const [customTopic, setCustomTopic] = useState('');
  const [editorNotes, setEditorNotes] = useState('');
  const [contentType, setContentType] = useState('Roofing Maintenance');
  const [generating, setGenerating] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [doneSteps, setDoneSteps] = useState<number[]>([]);
  const [researchResult, setResearchResult] = useState<ResearchResult | null>(null);
  const [blueprintResult, setBlueprintResult] = useState<BlueprintResult | null>(null);
  const [imageResult, setImageResult] = useState<ImageResult | null>(null);
  const [article, setArticle] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatting, setChatting] = useState(false);
  const [previewTab, setPreviewTab] = useState<'mdx' | 'preview'>('mdx');
  const [copied, setCopied] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishMsg, setPublishMsg] = useState('');
  const [error, setError] = useState('');
  const [apiKeyOk, setApiKeyOk] = useState<boolean | null>(null);
  const [keyStatus, setKeyStatus] = useState<{ gemini?: boolean; anthropic?: boolean }>({});
  const chatEndRef = useRef<HTMLDivElement>(null);
  const publishMsgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/news-generator', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'check' }) })
      .then((r) => r.json())
      .then((d) => { setApiKeyOk(d.ok === true); setKeyStatus({ gemini: d.gemini, anthropic: d.anthropic }); })
      .catch(() => setApiKeyOk(false));
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, chatting]);

  useEffect(() => {
    if (publishMsg) publishMsgRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [publishMsg]);

  async function generate() {
    if (topicMode === 'custom' && !customTopic.trim()) { setError('Please enter a topic.'); return; }
    setError(''); setGenerating(true); setActiveStep(0); setDoneSteps([]); setPublishMsg('');
    setResearchResult(null); setBlueprintResult(null); setImageResult(null); setArticle('');

    try {
      let research: ResearchResult | null = null;
      let blueprint: BlueprintResult | null = null;

      if (topicMode === 'auto') {
        // ── Stage 1: Research ──────────────────────────────────────────────────
        const r1 = await fetch('/api/news-generator', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mode: 'research',
            topic: customTopic.trim() || null,
            notes: editorNotes.trim() || null,
          }),
        });
        const d1 = await r1.json();
        if (d1.error) throw new Error(d1.error.includes('no_gemini') ? '⚠️ GEMINI_API_KEY not set in .env.local' : d1.error);

        research = d1.research as ResearchResult;
        setResearchResult(research);
        const detectedCategory = research?.best_category ?? '';
        if (detectedCategory && CONTENT_TYPES.includes(detectedCategory)) setContentType(detectedCategory);
        setDoneSteps([0, 1]);
        setActiveStep(2);

        // ── Stage 2: Blueprint ─────────────────────────────────────────────────
        const r2 = await fetch('/api/news-generator', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mode: 'blueprint',
            researchContext: research,
            topic: customTopic.trim() || null,
            contentType: detectedCategory || contentType,
          }),
        });
        const d2 = await r2.json();
        if (d2.error) throw new Error(d2.error.includes('no_gemini') ? '⚠️ GEMINI_API_KEY not set in .env.local' : d2.error);

        blueprint = d2.blueprint as BlueprintResult;
        setBlueprintResult(blueprint);
        setDoneSteps([0, 1, 2]);
        setActiveStep(3);
      } else {
        setDoneSteps([0, 1, 2]);
        setActiveStep(3);
      }

      // ── Stage 3: Article writing ───────────────────────────────────────────
      const r3 = await fetch('/api/news-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'generate',
          topic: topicMode === 'custom' ? customTopic : null,
          contentType,
          autoSearch: false,
          researchContext: research,
          blueprintContext: blueprint,
        }),
      });
      const d3 = await r3.json();
      if (d3.error) throw new Error(d3.error.includes('no_anthropic') ? '⚠️ ANTHROPIC_API_KEY not set in .env.local' : d3.error);

      setDoneSteps([0, 1, 2, 3]);
      setActiveStep(4);
      let finalContent: string = d3.content;

      // ── Stage 4: Image prompts ─────────────────────────────────────────────
      const r4 = await fetch('/api/news-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'image',
          blueprintContext: blueprint,
          researchContext: research,
          topic: customTopic.trim() || null,
          category: contentType,
        }),
      });
      const d4 = await r4.json();
      if (!d4.error && d4.images?.featured_image?.prompt) {
        setImageResult(d4.images as ImageResult);
        // Splice image prompt into article frontmatter
        finalContent = finalContent.replace(
          'STAGE4_PLACEHOLDER',
          d4.images.featured_image.prompt,
        );
      }

      setDoneSteps([0, 1, 2, 3, 4]);
      setActiveStep(-1);
      setArticle(finalContent);
      setChatMessages([{ role: 'assistant', content: '✅ Article generated! Ask me to modify it — e.g. "Make it shorter", "Add more Calgary context", "Change tone to urgent", "Add insurance section".' }]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Generation failed');
      setActiveStep(-1);
    } finally {
      setGenerating(false);
    }
  }

  async function sendChat() {
    if (!chatInput.trim() || !article) return;
    const userMsg = chatInput.trim();
    setChatInput('');
    setChatMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setChatting(true);

    try {
      const res = await fetch('/api/news-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'chat', messages: [{ role: 'user', content: userMsg }], currentArticle: article }),
      });
      const data = await res.json();

      if (data.error) {
        setChatMessages((prev) => [...prev, { role: 'assistant', content: `❌ Error: ${data.error}` }]);
      } else if (data.content?.includes('---')) {
        setArticle(data.content);
        setChatMessages((prev) => [...prev, { role: 'assistant', content: '✅ Article updated. Check the preview.' }]);
      } else {
        setChatMessages((prev) => [...prev, { role: 'assistant', content: data.content || '(no response)' }]);
      }
    } catch (e: unknown) {
      setChatMessages((prev) => [...prev, { role: 'assistant', content: `❌ ${e instanceof Error ? e.message : 'Request failed'}` }]);
    } finally {
      setChatting(false);
    }
  }

  function extractFrontmatter(key: string): string {
    const match = article.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?`, 'm'));
    return match?.[1]?.trim() ?? '';
  }

  async function handlePublish(draft: boolean) {
    const slug = extractFrontmatter('slug') || `article-${Date.now()}`;
    const title = extractFrontmatter('title') || 'Untitled';
    setPublishing(true);
    try {
      const res = await fetch('/api/publish-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Key': ADMIN_PASSWORD },
        body: JSON.stringify({ mdxContent: article, slug, draft }),
      });
      const data = await res.json();
      if (data.success) {
        const base = draft ? `💾 Draft saved → ${data.path}` : `✅ Published → ${data.path}`;
        const git = data.gitOutput ? `\n\n─── Git ───\n${data.gitOutput}` : '';
        setPublishMsg(base + git);
      } else {
        setPublishMsg(`❌ ${data.error}`);
      }
    } catch (e: unknown) {
      setPublishMsg(`❌ ${e instanceof Error ? e.message : 'Failed'}`);
    } finally {
      setPublishing(false);
    }
  }


  return (
    <div className="ai-writer-layout" style={{ display: 'flex', gap: '24px' }}>

      {/* ── LEFT PANEL ──────────────────────────────────────────── */}
      <div style={{ width: '300px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* API key warning */}
        {apiKeyOk === false && (
          <div style={{ backgroundColor: '#7c2d12', border: '1px solid #c2410c', borderRadius: '6px', padding: '14px 16px' }}>
            <p style={{ color: '#fdba74', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>⚠️ API Key Missing</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <p style={{ color: keyStatus.gemini ? '#86efac' : '#fca5a5', fontSize: '12px' }}>
                {keyStatus.gemini ? '✅' : '❌'} GEMINI_API_KEY — research, blueprint, images
              </p>
              <p style={{ color: keyStatus.anthropic ? '#86efac' : '#fca5a5', fontSize: '12px' }}>
                {keyStatus.anthropic ? '✅' : '❌'} ANTHROPIC_API_KEY — article writing
              </p>
            </div>
          </div>
        )}

        {/* Step 1: Topic */}
        <div style={S.card}>
          <p style={{ ...S.label, marginBottom: '12px' }}>Step 1 — Topic</p>
          {([{ value: 'auto', label: 'Let AI find news (web search)' }, { value: 'custom', label: 'Custom topic...' }] as const).map((opt) => (
            <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: topicMode === opt.value ? '#f5f5f5' : '#666', fontSize: '13px', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
              <input type="radio" name="topicMode" value={opt.value} checked={topicMode === opt.value} onChange={() => setTopicMode(opt.value)} style={{ accentColor: '#C0392B' }} />
              {opt.label}
            </label>
          ))}
          {topicMode === 'custom' && (
            <input value={customTopic} onChange={(e) => setCustomTopic(e.target.value)} style={{ ...S.input, marginTop: '8px' }} placeholder="e.g. Calgary hail season 2026" />
          )}
          {topicMode === 'auto' && (
            <textarea
              value={editorNotes}
              onChange={(e) => setEditorNotes(e.target.value)}
              style={{ ...S.textarea, marginTop: '10px', minHeight: '64px', fontSize: '12px', resize: 'vertical' }}
              placeholder="Editor notes (optional) — e.g. focus on insurance, avoid flood stories, prefer hail angle"
            />
          )}
        </div>

        {/* Step 2: Content Type */}
        <div style={S.card}>
          <p style={{ ...S.label, marginBottom: '12px' }}>Step 2 — Content Type</p>
          <p style={{ color: '#555', fontSize: '11px', marginBottom: '10px', lineHeight: 1.4 }}>Auto-detected from research in auto mode.</p>
          {CONTENT_TYPES.map((ct) => (
            <label key={ct} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: contentType === ct ? '#f5f5f5' : '#666', fontSize: '13px', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
              <input type="radio" name="contentType" value={ct} checked={contentType === ct} onChange={() => setContentType(ct)} style={{ accentColor: '#C0392B' }} />
              {ct}
            </label>
          ))}
        </div>

        {/* Step progress */}
        {(generating || doneSteps.length > 0) && (
          <div style={S.card}>
            <p style={{ ...S.label, marginBottom: '12px' }}>{generating ? 'In progress...' : '✅ Complete'}</p>
            {GEN_STEPS.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '5px 0', opacity: activeStep === i || doneSteps.includes(i) ? 1 : 0.25, transition: 'opacity 300ms' }}>
                <span>{doneSteps.includes(i) ? '✅' : activeStep === i ? '⏳' : '⬜'}</span>
                <span style={{ color: doneSteps.includes(i) ? '#86efac' : activeStep === i ? '#f5f5f5' : '#666', fontSize: '13px', fontFamily: 'var(--font-display)' }}>{step}</span>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ backgroundColor: '#7f1d1d', border: '1px solid #991b1b', borderRadius: '6px', padding: '12px 16px', color: '#fca5a5', fontSize: '13px', lineHeight: 1.5 }}>{error}</div>
        )}

        {/* Generate button */}
        <button onClick={generate} disabled={generating} style={{ ...S.btn('primary'), padding: '15px 24px', fontSize: '14px', width: '100%', opacity: generating ? 0.6 : 1 }}>
          {generating
            ? activeStep === 4 ? 'Generating images...' : activeStep === 3 ? 'Writing article...' : activeStep === 2 ? 'Building blueprint...' : 'Researching...'
            : '✨ Generate Article'}
        </button>
      </div>

      {/* ── RIGHT PANEL ─────────────────────────────────────────── */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Research preview card */}
        {researchResult && researchResult.selected_story && (
          <div style={{ backgroundColor: '#0d1f0d', border: '1px solid #1e3a1e', borderRadius: '6px', padding: '16px 18px' }}>
            <p style={{ ...S.label, color: '#86efac', marginBottom: '12px', letterSpacing: '1.5px' }}>📰 Research Brief</p>

            {/* Story */}
            <div style={{ marginBottom: '12px' }}>
              <p style={{ color: '#f5f5f5', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', lineHeight: 1.4, marginBottom: '4px' }}>
                {researchResult.selected_story.headline}
              </p>
              <p style={{ color: '#6b9e6b', fontSize: '12px' }}>
                {researchResult.selected_story.source}
                {researchResult.selected_story.published_date && ` · ${researchResult.selected_story.published_date}`}
              </p>
            </div>

            {/* Connection bridge */}
            {researchResult.connection_bridge?.link_to_roofing && (
              <div style={{ borderTop: '1px solid #1e3a1e', paddingTop: '10px', marginBottom: '8px' }}>
                <p style={{ color: '#9ca3af', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-display)', fontWeight: 700 }}>Roofing Connection</p>
                <p style={{ color: '#d1fae5', fontSize: '13px', lineHeight: 1.5 }}>{researchResult.connection_bridge.link_to_roofing}</p>
              </div>
            )}
            {researchResult.connection_bridge?.professional_angle && (
              <div style={{ borderTop: '1px solid #1e3a1e', paddingTop: '10px', marginBottom: '8px' }}>
                <p style={{ color: '#9ca3af', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-display)', fontWeight: 700 }}>Pro Angle</p>
                <p style={{ color: '#d1fae5', fontSize: '13px', lineHeight: 1.5 }}>{researchResult.connection_bridge.professional_angle}</p>
              </div>
            )}
            {researchResult.suggested_primary_keyword && (
              <div style={{ borderTop: '1px solid #1e3a1e', paddingTop: '10px' }}>
                <p style={{ color: '#9ca3af', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-display)', fontWeight: 700 }}>Target Keyword</p>
                <p style={{ color: '#86efac', fontSize: '13px', fontFamily: 'monospace' }}>{researchResult.suggested_primary_keyword}</p>
              </div>
            )}
          </div>
        )}

        {/* Blueprint preview card */}
        {blueprintResult && (
          <div style={{ backgroundColor: '#0d0f1f', border: '1px solid #1e2a4a', borderRadius: '6px', padding: '16px 18px' }}>
            <p style={{ ...S.label, color: '#93c5fd', marginBottom: '12px', letterSpacing: '1.5px' }}>🗂️ Article Blueprint</p>

            {/* Title + slug */}
            {blueprintResult.chosen_title && (
              <div style={{ marginBottom: '12px' }}>
                <p style={{ color: '#f5f5f5', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', lineHeight: 1.4, marginBottom: '4px' }}>
                  {blueprintResult.chosen_title}
                </p>
                {blueprintResult.slug && (
                  <p style={{ color: '#4b6ea8', fontSize: '11px', fontFamily: 'monospace' }}>/{blueprintResult.slug}</p>
                )}
              </div>
            )}

            {/* Unique angle */}
            {blueprintResult.unique_angle && (
              <div style={{ borderTop: '1px solid #1e2a4a', paddingTop: '10px', marginBottom: '10px' }}>
                <p style={{ color: '#9ca3af', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-display)', fontWeight: 700 }}>Unique Angle</p>
                <p style={{ color: '#bfdbfe', fontSize: '13px', lineHeight: 1.5 }}>{blueprintResult.unique_angle}</p>
              </div>
            )}

            {/* Structure outline */}
            {blueprintResult.structure && blueprintResult.structure.length > 0 && (
              <div style={{ borderTop: '1px solid #1e2a4a', paddingTop: '10px', marginBottom: '10px' }}>
                <p style={{ color: '#9ca3af', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'var(--font-display)', fontWeight: 700 }}>Structure</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {blueprintResult.structure.map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                      <span style={{ color: '#4b6ea8', fontSize: '10px', fontFamily: 'monospace', flexShrink: 0, minWidth: '24px' }}>{s.level?.toUpperCase()}</span>
                      <span style={{ color: '#dbeafe', fontSize: '12px', lineHeight: 1.4 }}>{s.heading}</span>
                      {s.eeeat_injection && <span style={{ color: '#6b7280', fontSize: '10px', marginLeft: 'auto', flexShrink: 0 }}>+E-E-A-T</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Keywords */}
            {blueprintResult.keywords_list && blueprintResult.keywords_list.length > 0 && (
              <div style={{ borderTop: '1px solid #1e2a4a', paddingTop: '10px' }}>
                <p style={{ color: '#9ca3af', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'var(--font-display)', fontWeight: 700 }}>Keywords</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {blueprintResult.keywords_list.slice(0, 5).map((kw, i) => (
                    <span key={i} style={{ backgroundColor: '#1e2a4a', color: '#93c5fd', padding: '3px 8px', borderRadius: '3px', fontSize: '11px', fontFamily: 'monospace' }}>{kw}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Image prompts card */}
        {imageResult && (
          <div style={{ backgroundColor: '#1a0d0d', border: '1px solid #3d1a1a', borderRadius: '6px', padding: '16px 18px' }}>
            <p style={{ ...S.label, color: '#fca5a5', marginBottom: '14px', letterSpacing: '1.5px' }}>🖼️ Image Prompts</p>

            {([
              { key: 'featured_image' as const, label: 'Featured / Hero', color: '#fca5a5' },
              { key: 'inline_1' as const, label: 'Inline 1', color: '#fcd34d' },
              { key: 'inline_2' as const, label: 'Inline 2', color: '#fcd34d' },
            ] as const).map(({ key, label, color }) => {
              const img = imageResult[key];
              if (!img) return null;
              return (
                <div key={key} style={{ marginBottom: '14px', paddingBottom: '14px', borderBottom: key !== 'inline_2' ? '1px solid #3d1a1a' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <p style={{ color, fontSize: '11px', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>{label}</p>
                    <button
                      onClick={() => img.prompt && navigator.clipboard.writeText(img.prompt)}
                      style={{ ...S.btn('ghost'), padding: '3px 10px', fontSize: '11px' }}
                    >
                      Copy
                    </button>
                  </div>
                  {img.use_case && (
                    <p style={{ color: '#6b7280', fontSize: '11px', marginBottom: '6px', fontStyle: 'italic' }}>{img.use_case}</p>
                  )}
                  <p style={{ color: '#f5f5f5', fontSize: '12px', lineHeight: 1.55, fontFamily: 'monospace', backgroundColor: '#110707', padding: '8px 10px', borderRadius: '3px', margin: 0 }}>
                    {img.prompt}
                  </p>
                  {img.alt_text && (
                    <p style={{ color: '#9ca3af', fontSize: '11px', marginTop: '5px' }}>Alt: {img.alt_text}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Chat */}
        <div style={{ ...S.card, display: 'flex', flexDirection: 'column', height: '260px' }}>
          <p style={{ ...S.label, marginBottom: '10px' }}>Chat — Refine Article</p>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px' }}>
            {chatMessages.length === 0
              ? <p style={{ color: '#444', fontSize: '13px', fontStyle: 'italic' }}>Generate an article, then use chat to refine it.</p>
              : chatMessages.map((msg, i) => (
                <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '88%', backgroundColor: msg.role === 'user' ? '#C0392B' : '#2a2a2a', color: '#f5f5f5', padding: '8px 12px', borderRadius: msg.role === 'user' ? '10px 10px 2px 10px' : '10px 10px 10px 2px', fontSize: '13px', lineHeight: 1.5 }}>
                  {msg.content}
                </div>
              ))}
            {chatting && <div style={{ alignSelf: 'flex-start', color: '#666', fontSize: '12px', fontStyle: 'italic' }}>✍️ Rewriting...</div>}
            <div ref={chatEndRef} />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(); } }}
              style={{ ...S.input, flex: 1 }}
              placeholder='e.g. "Make it shorter" · "Add insurance section" · "Change tone to urgent"'
              disabled={!article || chatting}
            />
            <button onClick={sendChat} disabled={!article || chatting || !chatInput.trim()} style={{ ...S.btn('primary'), flexShrink: 0 }}>Send</button>
          </div>
        </div>

        {/* Article preview */}
        <div style={{ ...S.card, flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
            {(['mdx', 'preview'] as const).map((tab) => (
              <button key={tab} onClick={() => setPreviewTab(tab)} style={{ ...S.btn(previewTab === tab ? 'primary' : 'ghost'), padding: '7px 18px', fontSize: '12px', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                {tab === 'mdx' ? 'MDX Code' : 'Preview'}
              </button>
            ))}
          </div>

          {/* Content */}
          {!article ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '240px' }}>
              <p style={{ color: '#444', fontSize: '14px' }}>Article will appear here after generation.</p>
            </div>
          ) : previewTab === 'mdx' ? (
            <textarea
              value={article}
              onChange={(e) => setArticle(e.target.value)}
              style={{ ...S.textarea, flex: 1, minHeight: '280px', fontFamily: 'monospace', fontSize: '12px', lineHeight: 1.6 }}
            />
          ) : (
            <div
              style={{ flex: 1, overflowY: 'auto', backgroundColor: '#fff', borderRadius: '4px', padding: '20px 24px', minHeight: '280px' }}
              dangerouslySetInnerHTML={{ __html: `<p style="margin:10px 0;color:#444;line-height:1.7;font-size:14px">${renderMdxPreview(article)}</p>` }}
            />
          )}

          {/* Actions */}
          {article && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button onClick={() => { navigator.clipboard.writeText(article).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); }} style={S.btn('secondary')}>
                {copied ? '✅ Copied!' : '📋 Copy MDX'}
              </button>
              <button onClick={() => handlePublish(true)} disabled={publishing} style={{ ...S.btn('ghost'), opacity: publishing ? 0.6 : 1 }}>
                💾 Save Draft
              </button>
              <button onClick={() => handlePublish(false)} disabled={publishing} style={{ ...S.btn('primary'), opacity: publishing ? 0.6 : 1 }}>
                {publishing ? 'Publishing...' : '🚀 Publish'}
              </button>
            </div>
          )}

          {/* Publish result */}
          {publishMsg && (
            <div ref={publishMsgRef} style={{ marginTop: '12px', backgroundColor: '#111', border: '1px solid #2a2a2a', borderRadius: '4px', padding: '14px 16px' }}>
              <pre style={{ color: '#86efac', fontSize: '12px', fontFamily: 'monospace', whiteSpace: 'pre-wrap', margin: 0, lineHeight: 1.6 }}>{publishMsg}</pre>
            </div>
          )}
        </div>
      </div>

      <style>{`.ai-writer-layout { min-height: 600px; } @media (max-width: 960px) { .ai-writer-layout { flex-direction: column !important; } .ai-writer-layout > div:first-child { width: 100% !important; } }`}</style>
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
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try { const res = await fetch('/api/posts'); const data = await res.json(); setPosts(data.posts ?? []); }
    catch { /* dev tool, fail silently */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const published = posts.filter((p) => p.frontmatter.status === 'published');
  const drafts = posts.filter((p) => p.frontmatter.status === 'draft');
  const scheduled = posts.filter((p) => p.frontmatter.status === 'scheduled');

  const navGroups = [
    {
      label: 'Content',
      items: [
        { label: 'Dashboard', key: 'dashboard' as Section },
        { label: 'AI News Writer', key: 'ai-news-writer' as Section },
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
    dashboard: 'Dashboard',
    drafts: 'Drafts', scheduled: 'Scheduled', published: 'Published',
    'ai-news-writer': 'AI News Writer',
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
                onClick={() => setSection(item.key)}
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
            {section === 'drafts' && <PostListSection posts={drafts} onRefresh={fetchPosts} />}
            {section === 'scheduled' && <PostListSection posts={scheduled} onRefresh={fetchPosts} />}
            {section === 'published' && <PostListSection posts={published} onRefresh={fetchPosts} />}
            {section === 'ai-news-writer' && <AINewsWriterSection />}
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
