import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Free Roofing Estimate Calgary | City Roofing & Exteriors',
  description:
    "Get a free roof estimate in Calgary. Call 403-608-9933 or fill out our form. SECOR certified, BBB Accredited.",
};

export default function ContactPage() {
  return <ContactForm />;
}
