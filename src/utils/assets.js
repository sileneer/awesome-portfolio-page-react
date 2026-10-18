import { withBase } from './withBase';

// All bundled portfolio images/documents are discovered here. JSON paths mirror
// src/assets (e.g. /companies/acme.svg); Vite provides hashed, base-aware URLs.
const imports = import.meta.glob('../assets/**/*.{avif,gif,ico,jpeg,jpg,png,svg,webp,pdf}', {
  eager: true, query: '?url', import: 'default',
});
const bundledAssets = Object.fromEntries(
  Object.entries(imports).map(([file, url]) => [file.replace('../assets', ''), url]),
);

export const resolveAsset = (source) => {
  if (!source || /^(https?:|data:|blob:|\/\/|#)/i.test(source)) return source;
  const path = source.startsWith('/') ? source : `/${source}`;
  // Also supports custom files in public/, without page-specific maps.
  return bundledAssets[path] ?? withBase(path);
};
