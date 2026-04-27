'use client';

import { useState } from 'react';

const fieldStyle: React.CSSProperties = {
  width: '100%',
  height: '48px',
  border: '1px solid var(--color-border-light)',
  borderRadius: '4px',
  backgroundColor: '#FFFFFF',
  color: 'var(--color-text-dark)',
  fontFamily: 'var(--font-body)',
  fontSize: '15px',
  padding: '11px 13px',
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '7px',
  color: 'var(--color-text-dark-muted)',
  fontFamily: 'var(--font-display)',
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.4px',
};

export default function CommercialInspectionForm() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    address: '',
    need: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const updateField = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          serviceType: 'commercial',
          address: form.address,
          message: [
            form.company ? `Company / Property: ${form.company}` : '',
            form.need ? `Need: ${form.need}` : '',
            form.message ? `Message: ${form.message}` : '',
          ].filter(Boolean).join('\n\n'),
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        setError(data.error ?? 'Something went wrong. Please call 403-608-9933.');
        setStatus('error');
        return;
      }

      setStatus('success');
      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'conversion', {
          send_to: 'AW-18002586824/x7DeCPrIoKMcEMjZpohD',
          value: 1.0,
          currency: 'CAD',
        });
      }
    } catch {
      setError('Network error. Please call 403-608-9933.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-border-light)',
          borderLeft: '4px solid #22c55e',
          borderRadius: '0 6px 6px 0',
          padding: '32px',
        }}
      >
        <p style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>
          Request received
        </p>
        <h2 style={{ color: 'var(--color-text-dark)', fontSize: '24px', lineHeight: 1.2, marginBottom: '10px' }}>
          We will contact you shortly.
        </h2>
        <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '15px', lineHeight: 1.7 }}>
          For an active leak or urgent roof issue, call <a href="tel:403-608-9933" style={{ color: 'var(--color-primary)', fontWeight: 800 }}>403-608-9933</a>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submitForm}
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--color-border-light)',
        borderRadius: '6px',
        boxShadow: '0 16px 40px rgba(0,0,0,0.14)',
        padding: '24px',
      }}
    >
      <p style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
        Free commercial roof inspection
      </p>
      <h2 style={{ color: 'var(--color-text-dark)', fontSize: '24px', lineHeight: 1.2, marginBottom: '8px' }}>
        Tell us what is happening on the roof.
      </h2>
      <p style={{ color: 'var(--color-text-dark-muted)', fontSize: '13px', lineHeight: 1.6, marginBottom: '20px' }}>
        Most estimates are delivered same-day when possible. Active leaks should call 403-608-9933.
      </p>

      <div className="commercial-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div>
          <label htmlFor="commercial-name" style={labelStyle}>Name *</label>
          <input id="commercial-name" name="name" required value={form.name} onChange={updateField} style={fieldStyle} />
        </div>
        <div>
          <label htmlFor="commercial-company" style={labelStyle}>Company / Property</label>
          <input id="commercial-company" name="company" value={form.company} onChange={updateField} style={fieldStyle} />
        </div>
        <div>
          <label htmlFor="commercial-phone" style={labelStyle}>Phone *</label>
          <input id="commercial-phone" name="phone" type="tel" required value={form.phone} onChange={updateField} style={fieldStyle} />
        </div>
        <div>
          <label htmlFor="commercial-email" style={labelStyle}>Email *</label>
          <input id="commercial-email" name="email" type="email" required value={form.email} onChange={updateField} style={fieldStyle} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="commercial-address" style={labelStyle}>Property Address</label>
          <input id="commercial-address" name="address" value={form.address} onChange={updateField} placeholder="Calgary property address" style={fieldStyle} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="commercial-need" style={labelStyle}>What do you need?</label>
          <select id="commercial-need" name="need" value={form.need} onChange={updateField} style={fieldStyle}>
            <option value="">Select one...</option>
            <option value="Active leak">Active leak</option>
            <option value="Flat roof repair">Flat roof repair</option>
            <option value="Flat roof replacement">Flat roof replacement</option>
            <option value="Commercial roof inspection">Commercial roof inspection</option>
            <option value="Maintenance plan">Maintenance plan</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="commercial-message" style={labelStyle}>Message</label>
          <textarea
            id="commercial-message"
            name="message"
            rows={4}
            value={form.message}
            onChange={updateField}
            placeholder="Leak location, roof type, access details, timing..."
            style={{ ...fieldStyle, minHeight: '98px', height: 'auto', resize: 'vertical' }}
          />
        </div>
      </div>

      {status === 'error' && (
        <div style={{ backgroundColor: '#fff5f5', border: '1px solid #fca5a5', color: '#991b1b', borderRadius: '4px', padding: '11px 13px', fontSize: '13px', lineHeight: 1.5, marginTop: '14px' }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        style={{
          width: '100%',
          marginTop: '18px',
          height: '52px',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: 'var(--color-primary)',
          color: '#FFFFFF',
          cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
          fontFamily: 'var(--font-display)',
          fontSize: '15px',
          fontWeight: 800,
          opacity: status === 'submitting' ? 0.75 : 1,
        }}
      >
        {status === 'submitting' ? 'Sending...' : 'Request Free Inspection'}
      </button>

      <style>{`
        @media (max-width: 720px) {
          .commercial-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </form>
  );
}
