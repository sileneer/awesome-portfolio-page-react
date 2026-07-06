import { buildMeta, applyMeta } from './vite-plugin-portfolio-meta';

const info = {
  name: 'Ada Lovelace',
  title: 'Analyst',
  bio: 'Builds engines.',
  email: 'ada@example.com',
  photo: '/me.png',
  website: 'https://ada.dev/',
  linkedin: 'https://linkedin.com/in/ada',
  github: 'https://github.com/ada',
};
const resume = { skills: ['Mathematics', 'Programming'] };

describe('buildMeta', () => {
  it('builds an absolute image URL from website + photo', () => {
    expect(buildMeta(info, resume).IMAGE).toBe('https://ada.dev/me.png');
  });

  it('escapes double quotes so values are attribute-safe', () => {
    const meta = buildMeta({ ...info, bio: 'Says "hi"' }, resume);
    expect(meta.DESCRIPTION).toContain('&quot;hi&quot;');
    expect(meta.DESCRIPTION).not.toContain('"hi"');
  });

  it('builds Person JSON-LD from the data', () => {
    const person = JSON.parse(buildMeta(info, resume).JSONLD);
    expect(person.name).toBe('Ada Lovelace');
    expect(person.sameAs).toEqual([
      'https://linkedin.com/in/ada',
      'https://github.com/ada',
      'https://ada.dev/',
    ]);
    expect(person.knowsAbout).toEqual(['Mathematics', 'Programming']);
  });

  it('omits unset links from sameAs and survives a missing website', () => {
    const meta = buildMeta({ ...info, website: undefined, github: undefined }, resume);
    expect(JSON.parse(meta.JSONLD).sameAs).toEqual(['https://linkedin.com/in/ada']);
    expect(meta.URL).toBe('');
    expect(meta.IMAGE).toBe('/me.png');
  });
});

describe('applyMeta', () => {
  it('replaces every token occurrence', () => {
    const html = '<title>%PORTFOLIO_NAME% | %PORTFOLIO_TITLE%</title>';
    expect(applyMeta(html, { NAME: 'Ada', TITLE: 'Analyst' })).toBe('<title>Ada | Analyst</title>');
  });

  it('leaves unknown tokens untouched', () => {
    expect(applyMeta('%PORTFOLIO_NOPE%', {})).toBe('%PORTFOLIO_NOPE%');
  });
});
