import React from 'react';
import { render, screen } from '@testing-library/react';
import ResumePage from './ResumePage';

const fullResume = {
  summary: 'Seasoned engineer who ships reliable software.',
  experience: [
    {
      company: 'TechCorp',
      role: 'Frontend Engineer',
      dates: '2023 - Present',
      location: 'London, UK',
      description: 'Led dashboard development.',
      technologies: ['React'],
      achievements: ['Cut dashboard load time by 40%'],
    },
  ],
  education: [
    {
      degree: 'B.Sc. in Computer Science',
      institution: 'Example University',
      dates: '2017 - 2021',
      gpa: '3.8',
      location: 'Cambridge, UK',
      description: 'Graduated with first-class honours.',
      coursework: ['Algorithms'],
      extracurriculars: ['Coding Club President'],
    },
  ],
  skills: ['JavaScript'],
  certifications: [
    { title: 'AWS Certified Developer', certificateLink: 'https://certs.example.com/aws' },
  ],
  awards: [{ title: 'Best Developer 2022' }],
  interests: ['Open Source'],
  cvDownload: '/CV.pdf',
};

const minimalResume = {
  summary: 'Short summary.',
  experience: [
    { company: 'X Co', role: 'Engineer', dates: '2024', description: 'Built things.' },
  ],
  education: [],
  skills: ['JavaScript'],
};

describe('ResumePage restored sections', () => {
  it('renders every restored field when the data is present', () => {
    render(<ResumePage data={{ resume: fullResume }} />);

    // Summary
    expect(screen.getByText('Seasoned engineer who ships reliable software.')).toBeInTheDocument();

    // Experience enrichment: per-job location + achievements
    expect(screen.getByText('London, UK')).toBeInTheDocument();
    expect(screen.getByText('Cut dashboard load time by 40%')).toBeInTheDocument();

    // Education section
    expect(screen.getByRole('heading', { name: 'Education' })).toBeInTheDocument();
    expect(screen.getByText('B.Sc. in Computer Science')).toBeInTheDocument();
    expect(screen.getByText(/GPA:\s*3\.8/)).toBeInTheDocument();
    expect(screen.getByText('Algorithms')).toBeInTheDocument();
    expect(screen.getByText('Coding Club President')).toBeInTheDocument();

    // Certifications: title + working credential link
    expect(screen.getByRole('heading', { name: 'Certifications' })).toBeInTheDocument();
    expect(screen.getByText('AWS Certified Developer')).toBeInTheDocument();
    const credentialLink = screen.getByRole('link', { name: /AWS Certified Developer/i });
    expect(credentialLink).toHaveAttribute('href', 'https://certs.example.com/aws');

    // Awards
    expect(screen.getByRole('heading', { name: 'Awards' })).toBeInTheDocument();
    expect(screen.getByText('Best Developer 2022')).toBeInTheDocument();

    // Interests
    expect(screen.getByRole('heading', { name: 'Interests' })).toBeInTheDocument();
    expect(screen.getByText('Open Source')).toBeInTheDocument();
  });

  it('omits optional sections when their data is absent', () => {
    render(<ResumePage data={{ resume: minimalResume }} />);

    expect(screen.queryByRole('heading', { name: 'Education' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Certifications' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Awards' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Interests' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Languages' })).not.toBeInTheDocument();
  });

  it('renders spoken languages from personalInfo', () => {
    render(<ResumePage data={{ resume: fullResume, personalInfo: { languages: ['English', 'Spanish'] } }} />);
    expect(screen.getByRole('heading', { name: 'Languages' })).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Spanish')).toBeInTheDocument();
  });

  it('uses a single h1 for the page title (heading hierarchy)', () => {
    render(<ResumePage data={{ resume: fullResume }} />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(/résumé/i);
  });

  it('exposes in-page anchor targets and nav links for present sections', () => {
    const { container } = render(<ResumePage data={{ resume: fullResume }} />);
    ['experience', 'education', 'skills', 'certifications', 'awards', 'interests'].forEach((id) => {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    });
    // Section nav is hidden on mobile (display:none) so query includes hidden elements.
    const eduLink = screen.getByRole('link', { name: 'Education', hidden: true });
    expect(eduLink).toHaveAttribute('href', '#education');
  });

  it('only exposes anchors for sections that have data', () => {
    const { container } = render(<ResumePage data={{ resume: minimalResume }} />);
    expect(container.querySelector('#experience')).not.toBeNull();
    expect(container.querySelector('#skills')).not.toBeNull();
    expect(container.querySelector('#education')).toBeNull();
    expect(container.querySelector('#certifications')).toBeNull();
  });
});
