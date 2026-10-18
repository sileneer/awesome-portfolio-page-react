import { researchSchema } from './schemas';
import { researchFixture, publicationFixture } from './research.test-fixtures';

const parse = (overrides = {}) => researchSchema.safeParse({ ...researchFixture, ...overrides });

test('accepts empty research and populated optional content', () => {
  expect(researchSchema.safeParse({ publications: [], projects: [] }).success).toBe(true);
  expect(parse().success).toBe(true);
});

test('rejects duplicate ids and dangling featured references', () => {
  expect(parse({ publications: [publicationFixture, publicationFixture] }).success).toBe(false);
  expect(parse({ featuredWork: { kind: 'project', id: publicationFixture.id } }).success).toBe(false);
});

test.each([0, 2026.5, 10000, '2026'])('rejects invalid publication year %s', (year) => {
  expect(parse({ publications: [{ ...publicationFixture, year }] }).success).toBe(false);
});

test('requires authors and an explicit supported status', () => {
  expect(parse({ publications: [{ ...publicationFixture, authors: [] }] }).success).toBe(false);
  expect(parse({ publications: [{ ...publicationFixture, status: 'finished' }] }).success).toBe(false);
});

test.each(['javascript:alert(1)', '//example.org/paper.pdf', '/../private.pdf', '/papers/%2e%2e/private.pdf', '/papers/..%5cprivate.pdf', '/papers/a.txt', '/papers/%zz.pdf'])('rejects unsafe PDF link %s', (pdf) => {
  expect(parse({ publications: [{ ...publicationFixture, links: { pdf } }] }).success).toBe(false);
});

test('rejects non-HTTP external resources and profiles', () => {
  expect(parse({ publications: [{ ...publicationFixture, links: { code: 'javascript:alert(1)' } }] }).success).toBe(false);
  expect(parse({ introduction: { profiles: [{ label: 'Profile', url: 'ftp://example.org' }] } }).success).toBe(false);
});

test('accepts a local PDF and a project featured reference', () => {
  expect(parse({ featuredWork: { kind: 'project', id: researchFixture.projects[0].id } }).success).toBe(true);
  expect(parse({ publications: [{ ...publicationFixture, links: { pdf: '/papers/study.pdf' } }] }).success).toBe(true);
});
