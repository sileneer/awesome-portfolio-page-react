import { readFileSync } from 'node:fs';

const load = (relPath) => JSON.parse(readFileSync(new URL(relPath, import.meta.url), 'utf8'));

// Escape for HTML attribute/text contexts.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

export const buildMeta = (personalInfo, resume) => {
  const site = personalInfo.website ?? '';
  const image = (() => {
    if (!site || !personalInfo.photo) return personalInfo.photo ?? '';
    try {
      const base = site.endsWith('/') ? site : `${site}/`;
      // "/profile_photo.jpg" with new URL would resolve to origin root,
      // ignoring the sub-path; strip leading "/" so it resolves under site.
      const path = personalInfo.photo.replace(/^\//, '');
      return new URL(path, base).href;
    } catch {
      return personalInfo.photo;
    }
  })();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    ...(site ? { url: site } : {}),
    ...(image ? { image } : {}),
    email: `mailto:${personalInfo.email}`,
    sameAs: [personalInfo.linkedin, personalInfo.github, personalInfo.website].filter(Boolean),
    knowsAbout: resume.skills ?? [],
  };
  return {
    NAME: esc(personalInfo.name),
    TITLE: esc(personalInfo.title),
    DESCRIPTION: esc(`${personalInfo.name} - ${personalInfo.title}. ${personalInfo.bio}`),
    URL: esc(site),
    IMAGE: esc(image),
    // <-escape so a malicious/odd skill string can't close the <script> tag.
    JSONLD: JSON.stringify(jsonLd, null, 2).replace(/</g, '\\u003c'),
  };
};

export const applyMeta = (html, meta) =>
  html.replace(/%PORTFOLIO_([A-Z]+)%/g, (token, key) => meta[key] ?? token);

// Substitutes %PORTFOLIO_*% tokens in index.html with values from the data
// JSON, at dev-serve and build time. `order: 'pre'` runs before Vite's own
// %ENV% substitution so our tokens never trigger "not defined" warnings.
export default function portfolioMeta() {
  return {
    name: 'portfolio-meta',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) =>
        applyMeta(
          html,
          buildMeta(load('./src/data/personalInfo.json'), load('./src/data/resume.json')),
        ),
    },
  };
}
