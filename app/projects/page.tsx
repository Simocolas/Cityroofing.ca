import type { Metadata } from 'next';
import ProjectsGrid from './ProjectsGrid';

export const metadata: Metadata = {
  title: 'Roofing Projects Calgary | City Roofing & Exteriors',
  description:
    "See our completed roofing and siding projects across Calgary. Residential, commercial, siding, and before & after photos.",
};

export default function ProjectsPage() {
  return <ProjectsGrid />;
}
