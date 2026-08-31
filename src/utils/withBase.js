/**
 * Resolve a public asset path against Vite's BASE_URL.
 * - Keeps absolute URLs, data URIs, hashes untouched
 * - "/profile_photo.jpg" with BASE_URL="/awesome-portfolio-page-react/" -> "/awesome-portfolio-page-react/profile_photo.jpg"
 * - "/profile_photo.jpg" with BASE_URL="/" -> "/profile_photo.jpg" (no-op)
 * - "profile_photo.jpg" (relative) -> returned as-is (caller already handled)
 */
export const withBase = (path) => {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:') || path.startsWith('#')) return path;
  if (path.startsWith('/')) {
    const base = import.meta.env.BASE_URL ?? '/';
    return `${base}${path.slice(1)}`;
  }
  return path;
};

export default withBase;
