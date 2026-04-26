import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | City Roofing & Exteriors',
  description: 'Privacy policy for City Roofing & Exteriors. Learn how we collect, use and protect your information.',
  robots: { index: false },
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh' }}>
      <section style={{ backgroundColor: 'var(--color-base)', padding: '136px 24px 64px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <h1 style={{ color: '#F9F7F2', fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.05, marginBottom: '16px' }}>
            Privacy Policy
          </h1>
          <p style={{ color: 'rgba(249,247,242,0.72)', fontSize: '16px' }}>
            Last updated: April 26, 2026
          </p>
        </div>
      </section>

      <div style={{ height: '3px', backgroundColor: 'var(--color-primary)' }} />

      <section style={{ padding: '64px 24px 96px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', color: 'var(--color-text-dark)', fontSize: '16px', lineHeight: 1.8 }}>

          <h2 style={{ fontSize: '24px', marginBottom: '12px', marginTop: '40px' }}>Who We Are</h2>
          <p>
            City Roofing &amp; Exteriors is a Calgary-based roofing contractor located at 3935 3a St NE Unit #3, Calgary, AB T2E 6S7. You can reach us at 403-608-9933 or through the contact form at calgarycityroofing.com.
          </p>

          <h2 style={{ fontSize: '24px', marginBottom: '12px', marginTop: '40px' }}>Information We Collect</h2>
          <p>
            When you contact us through our website, request an estimate, or submit a form, we may collect your name, phone number, email address, and property address. We use this information only to respond to your inquiry and provide roofing services.
          </p>
          <p style={{ marginTop: '12px' }}>
            We do not sell, rent, or share your personal information with third parties for marketing purposes.
          </p>

          <h2 style={{ fontSize: '24px', marginBottom: '12px', marginTop: '40px' }}>Cookies and Analytics</h2>
          <p>
            Our website uses Google Analytics to understand how visitors use the site. This may involve the use of cookies. No personally identifiable information is collected through analytics. You can opt out of Google Analytics tracking at any time using browser extensions or privacy settings.
          </p>
          <p style={{ marginTop: '12px' }}>
            We also use Google Ads to advertise our services. Google may use cookies to show our ads to people who have visited our site. You can manage your ad preferences at <a href="https://adssettings.google.com" style={{ color: 'var(--color-primary)' }}>adssettings.google.com</a>.
          </p>

          <h2 style={{ fontSize: '24px', marginBottom: '12px', marginTop: '40px' }}>How We Use Your Information</h2>
          <p>We use the information you provide to:</p>
          <ul style={{ paddingLeft: '24px', marginTop: '8px' }}>
            <li>Respond to estimate requests and inquiries</li>
            <li>Schedule roofing inspections and services</li>
            <li>Send follow-up communications related to your project</li>
          </ul>
          <p style={{ marginTop: '12px' }}>
            We do not use your information for any purpose other than providing and improving our roofing services.
          </p>

          <h2 style={{ fontSize: '24px', marginBottom: '12px', marginTop: '40px' }}>Data Retention</h2>
          <p>
            We retain contact information only as long as necessary to complete your project and comply with applicable legal requirements. You may request deletion of your information at any time by contacting us at 403-608-9933.
          </p>

          <h2 style={{ fontSize: '24px', marginBottom: '12px', marginTop: '40px' }}>Third-Party Links</h2>
          <p>
            Our website may contain links to third-party sites such as Google Reviews. We are not responsible for the privacy practices of those sites.
          </p>

          <h2 style={{ fontSize: '24px', marginBottom: '12px', marginTop: '40px' }}>Contact</h2>
          <p>
            If you have questions about this privacy policy or how your information is handled, contact us:
          </p>
          <p style={{ marginTop: '12px' }}>
            City Roofing &amp; Exteriors<br />
            3935 3a St NE Unit #3, Calgary, AB T2E 6S7<br />
            Phone: 403-608-9933<br />
            Website: calgarycityroofing.com
          </p>
        </div>
      </section>
    </div>
  );
}
