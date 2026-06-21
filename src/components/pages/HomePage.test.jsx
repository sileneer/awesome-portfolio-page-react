import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

const data = {
  personalInfo: {
    name: 'Ada Lovelace',
    title: 'Full Stack Developer',
    bio: 'I build things.',
    linkedin: 'https://linkedin.com/in/ada',
    github: 'https://github.com/ada',
    photo: '/ada.png',
    languages: ['English', 'Spanish'],
  },
  resume: { experience: [{ dates: '2020 - Present' }], skills: ['JavaScript'] },
  projects: [{ name: 'Thing' }],
};

describe('HomePage', () => {
  it('exposes only the name as a heading (clean hierarchy)', () => {
    render(<HomePage data={data} />);
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(1);
    expect(headings[0].tagName).toBe('H1');
    expect(headings[0]).toHaveTextContent('Ada Lovelace');
  });
});
