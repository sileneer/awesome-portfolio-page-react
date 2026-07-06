import { pageTitle } from './pageTitle';

const personalInfo = { name: 'Ada Lovelace', title: 'Full Stack Developer' };

describe('pageTitle', () => {
  it('uses "name | professional title" on the home route', () => {
    expect(pageTitle({ name: 'Home', path: '/' }, personalInfo)).toBe(
      'Ada Lovelace | Full Stack Developer',
    );
  });

  it('uses "page | name" on other routes', () => {
    expect(pageTitle({ name: 'Projects', path: '/projects' }, personalInfo)).toBe(
      'Projects | Ada Lovelace',
    );
  });
});
