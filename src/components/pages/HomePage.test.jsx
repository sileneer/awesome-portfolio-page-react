import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { researchFixture } from '../../data/research.test-fixtures';
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


test('shows a research preview only for content with a configured research route', () => {
  const navigation = { menuItems: [{ component: 'ResearchPage', path: '/research' }] };
  const { rerender } = render(<MemoryRouter><HomePage data={{ ...data, navigation, research: { publications: [], projects: [] } }} /></MemoryRouter>);
  expect(screen.queryByRole('region', { name: 'Research preview' })).not.toBeInTheDocument();
  rerender(<MemoryRouter><HomePage data={{ ...data, navigation, research: researchFixture }} /></MemoryRouter>);
  expect(screen.getByRole('region', { name: 'Research preview' })).toHaveTextContent(researchFixture.publications[0].title);
  expect(screen.getByRole('link', { name: 'View research' })).toHaveAttribute('href', '/research');
  rerender(<MemoryRouter><HomePage data={{ ...data, research: researchFixture }} /></MemoryRouter>);
  expect(screen.queryByRole('region', { name: 'Research preview' })).not.toBeInTheDocument();
});
