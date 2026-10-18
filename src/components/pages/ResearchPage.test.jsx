import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResearchPage from './ResearchPage';
import { researchFixture, publicationFixture } from '../../data/research.test-fixtures';

const show = (research = researchFixture) => render(<MemoryRouter><ResearchPage data={{ research }} /></MemoryRouter>);

afterEach(() => { vi.unstubAllGlobals(); });

test('renders honest empty states without fake papers, profile links, or citation controls', () => {
  show({ publications: [], projects: [] });
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Research & Publications');
  expect(screen.getByText('No publications listed yet.')).toBeInTheDocument();
  expect(screen.getByText('No research projects listed yet.')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /copy citation/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
});

test('groups years newest first, preserves author order and explicit status', () => {
  show();
  expect(screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent)).toEqual(['2026', '2024', researchFixture.projects[0].title]);
  const paper = screen.getByRole('article', { name: publicationFixture.title });
  expect(within(paper).getByText('Preprint')).toBeInTheDocument();
  expect(within(paper).getByText('Alex Researcher').tagName).toBe('STRONG');
  expect(paper.textContent).toContain('Alex Researcher, Sam Collaborator');
  expect(within(paper).getByRole('link', { name: /^PDF/ })).toHaveAttribute('href', '/papers/adaptive-systems.pdf');
  const older = screen.getByRole('article', { name: 'Measuring robustness in practice' });
  expect(within(older).queryByRole('link')).not.toBeInTheDocument();
  expect(within(older).queryByRole('button')).not.toBeInTheDocument();
});

test('shows an inline abstract disclosure and copies only the supplied citation', async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  vi.stubGlobal('navigator', { clipboard: { writeText } });
  show();
  const paper = screen.getByRole('article', { name: publicationFixture.title });
  const summary = within(paper).getByText('Read abstract');
  fireEvent.click(summary);
  expect(summary.closest('details')).toHaveAttribute('open');
  fireEvent.click(within(paper).getByRole('button', { name: /copy citation/i }));
  expect(await within(paper).findByText('Citation copied.')).toBeInTheDocument();
  expect(writeText).toHaveBeenCalledWith(publicationFixture.bibtex);
});

test('offers a manual citation when clipboard access fails', async () => {
  vi.stubGlobal('navigator', { clipboard: { writeText: vi.fn().mockRejectedValue(new Error('Denied')) } });
  show();
  fireEvent.click(screen.getByRole('button', { name: /copy citation/i }));
  expect(await screen.findByText(/Could not copy/)).toBeInTheDocument();
  expect(screen.getByText(publicationFixture.bibtex)).toBeInTheDocument();
});

test('filters a larger collection, handles no results and resets', () => {
  const publications = Array.from({ length: 5 }, (_, i) => ({ ...publicationFixture, id: `paper-${i}`, title: `Paper ${i}`, year: i === 0 ? 2026 : 2025, type: i === 0 ? 'conference' : 'journal' }));
  show({ publications, projects: [] });
  fireEvent.change(screen.getByRole('combobox', { name: 'Year' }), { target: { value: '2026' } });
  expect(screen.getAllByRole('article')).toHaveLength(1);
  fireEvent.change(screen.getByRole('combobox', { name: 'Type' }), { target: { value: 'journal' } });
  expect(screen.getByText(/No publications match/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Reset filters' }));
  expect(screen.getAllByRole('article')).toHaveLength(5);
});

test('features a project and keeps it separate from publications', () => {
  show({ ...researchFixture, featuredWork: { kind: 'project', id: researchFixture.projects[0].id } });
  const featured = screen.getByRole('region', { name: 'Featured work' });
  expect(within(featured).getByText('Ongoing')).toBeInTheDocument();
  expect(within(featured).getByText(researchFixture.projects[0].contribution)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Let’s talk' })).toHaveAttribute('href', '/contact');
});
