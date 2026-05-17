import { validatePortfolioData } from './schemas';

test('all portfolio JSON files match their zod schemas', () => {
  expect(() => validatePortfolioData()).not.toThrow();
});
