// Illustrative records for automated and local visual tests only.
export const publicationFixture = {
  id: 'adaptive-systems', title: 'Learning under changing conditions', year: 2026,
  authors: [{ name: 'Alex Researcher', isOwner: true }, { name: 'Sam Collaborator' }],
  venue: 'Test research venue', type: 'conference', status: 'preprint',
  summary: 'A study of how adaptive systems respond when their training conditions change.',
  abstract: 'We examine the behavior of adaptive models under controlled changes in their environment. The study compares robustness, efficiency, and reproducibility across a range of experimental settings.',
  topics: ['Machine learning', 'Robustness'],
  links: { paper: 'https://example.org/paper', pdf: '/papers/adaptive-systems.pdf', code: 'https://example.org/code' },
  bibtex: '@misc{adaptive2026, title={Learning under changing conditions}, year={2026}}',
};
export const projectFixture = {
  id: 'reliable-evaluation', title: 'Reliable evaluation for adaptive models',
  summary: 'Developing repeatable experiments that help explain when a model succeeds and when it fails.',
  question: 'Which evaluation methods remain useful as the data distribution changes?',
  contribution: 'Designing evaluation protocols and analyzing experimental results.',
  collaborators: ['Sam Collaborator'], institution: 'Test research group', dates: '2025 – present',
  status: 'ongoing', topics: ['Evaluation'], links: { code: 'https://example.org/evaluation' },
};
export const researchFixture = {
  introduction: {
    statement: 'Exploring how learning systems adapt, generalize, and earn our confidence through careful evaluation.',
    areas: ['Machine learning', 'Robustness', 'Evaluation'],
    profiles: [{ label: 'Google Scholar', url: 'https://scholar.google.com/' }], collaboration: true,
  },
  featuredWork: { kind: 'publication', id: publicationFixture.id },
  publications: [publicationFixture, { ...publicationFixture, id: 'earlier-study', title: 'Measuring robustness in practice', year: 2024, status: 'published', type: 'journal', bibtex: undefined, abstract: undefined, links: undefined }],
  projects: [projectFixture],
};
