'use client';

import { useState } from 'react';

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#1A1A1A',
  border: '1px solid #2A2A2A',
  borderRadius: '4px',
  padding: '12px 16px',
  color: 'var(--color-text-primary)',
  fontSize: '15px',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  transition: 'border-color 150ms ease-out',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-display)',
  fontWeight: 600,
  fontSize: '13px',
  color: 'var(--color-text-muted)',
  marginBottom: '8px',
  letterSpacing: '0.5px',
};

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    address: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fieldBorder = (field: string) =>
    focusedField === field ? 'var(--color-accent)' : '#2A2A2A';

  return (
    <div style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh', paddingTop: '90px' }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          padding: '56px 24px',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--color-accent)', fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '16px' }}>
            Free Estimate
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(36px, 5vw, 60px)', color: 'var(--color-text-primary)', lineHeight: 1.1 }}>
            Get Your Free Estimate
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '64px',
            alignItems: 'start',
          }}
        >
          {/* LEFT: Form */}
          <div>
            {submitted ? (
              <div
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderLeft: '4px solid #22c55e',
                  borderRadius: '0 6px 6px 0',
                  padding: '40px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: 'var(--color-text-primary)', marginBottom: '12px' }}>
                  Thank you!
                </h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: 1.6 }}>
                  We&apos;ll contact you within 1 business day to schedule your free inspection.
                </p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginTop: '16px' }}>
                  Prefer to call? <a href="tel:403-608-9933" style={{ color: 'var(--color-accent)', fontWeight: 700 }}>403-608-9933</a>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <label htmlFor="name" style={labelStyle}>Full Name <span style={{ color: 'var(--color-accent)' }}>*</span></label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Jane Smith"
                    style={{ ...inputStyle, borderColor: fieldBorder('name') }}
                  />
                </div>

                <div>
                  <label htmlFor="phone" style={labelStyle}>Phone Number <span style={{ color: 'var(--color-accent)' }}>*</span></label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="403-555-0100"
                    style={{ ...inputStyle, borderColor: fieldBorder('phone') }}
                  />
                </div>

                <div>
                  <label htmlFor="email" style={labelStyle}>Email Address <span style={{ color: 'var(--color-accent)' }}>*</span></label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="jane@example.com"
                    style={{ ...inputStyle, borderColor: fieldBorder('email') }}
                  />
                </div>

                <div>
                  <label htmlFor="service" style={labelStyle}>Service Type <span style={{ color: 'var(--color-accent)' }}>*</span></label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('service')}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...inputStyle, borderColor: fieldBorder('service'), cursor: 'pointer' }}
                  >
                    <option value="">Select a service...</option>
                    <option value="roof-replacement">Roof Replacement</option>
                    <option value="roof-repair">Roof Repair</option>
                    <option value="siding">Siding</option>
                    <option value="commercial">Commercial Roofing</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="address" style={labelStyle}>Property Address</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={form.address}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('address')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="123 Main St NE, Calgary"
                    style={{ ...inputStyle, borderColor: fieldBorder('address') }}
                  />
                </div>

                <div>
                  <label htmlFor="message" style={labelStyle}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Tell us about your project..."
                    style={{ ...inputStyle, borderColor: fieldBorder('message'), resize: 'vertical', minHeight: '100px' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--color-primary)',
                    color: '#fff',
                    padding: '16px',
                    border: 'none',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '16px',
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    transition: 'background-color 150ms ease-out',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-primary)')}
                >
                  Request Free Estimate
                </button>

                <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', textAlign: 'center' }}>
                  We respond within 1 business day. No spam, ever.
                </p>
              </form>
            )}
          </div>

          {/* RIGHT: Contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Phone */}
            <div>
              <p style={{ fontSize: '12px', letterSpacing: '2px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                Call or Text
              </p>
              <a
                href="tel:403-608-9933"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '36px',
                  color: 'var(--color-accent)',
                  textDecoration: 'none',
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                403-608-9933
              </a>
            </div>

            {/* Hours */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}>
              <p style={{ fontSize: '12px', letterSpacing: '2px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                Hours
              </p>
              <p style={{ color: 'var(--color-text-primary)', fontSize: '16px' }}>
                Monday – Friday<br />
                <strong>8:00 AM – 5:00 PM</strong>
              </p>
            </div>

            {/* Address */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}>
              <p style={{ fontSize: '12px', letterSpacing: '2px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                Office
              </p>
              <p style={{ color: 'var(--color-text-primary)', fontSize: '16px', lineHeight: 1.6 }}>
                3935 3a St NE Unit #3<br />Calgary, AB T2E 6S7
              </p>
            </div>

            {/* Google Maps */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.8!2d-114.0539864!3d51.0885207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5371650aef16d90b%3A0xc8d7a94499b36aa4!2sCity%20Roofing%20%26%20Exteriors!5e0!3m2!1sen!2sca!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 'none', borderRadius: '8px', display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="City Roofing & Exteriors location"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
