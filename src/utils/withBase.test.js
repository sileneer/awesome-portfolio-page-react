import { describe, it, expect, vi, afterEach } from 'vitest';
import { withBase } from './withBase';

describe('withBase', () => {
  const originalBase = import.meta.env.BASE_URL;

  afterEach(() => {
    // vitest doesn't reset import.meta.env automatically
    import.meta.env.BASE_URL = originalBase;
    vi.unstubAllEnvs?.();
  });

  it('prefixes absolute public paths with BASE_URL', () => {
    import.meta.env.BASE_URL = '/awesome-portfolio-page-react/';
    expect(withBase('/profile_photo.jpg')).toBe('/awesome-portfolio-page-react/profile_photo.jpg');
    expect(withBase('/CV.pdf')).toBe('/awesome-portfolio-page-react/CV.pdf');
    expect(withBase('/projects/a.png')).toBe('/awesome-portfolio-page-react/projects/a.png');
  });

  it('is no-op for root base', () => {
    import.meta.env.BASE_URL = '/';
    expect(withBase('/profile_photo.jpg')).toBe('/profile_photo.jpg');
  });

  it('leaves relative, absolute URLs, data and hash untouched', () => {
    import.meta.env.BASE_URL = '/awesome-portfolio-page-react/';
    expect(withBase('profile_photo.jpg')).toBe('profile_photo.jpg');
    expect(withBase('https://example.com/x.jpg')).toBe('https://example.com/x.jpg');
    expect(withBase('//cdn.example.com/x.jpg')).toBe('//cdn.example.com/x.jpg');
    expect(withBase('data:image/png;base64,abc')).toBe('data:image/png;base64,abc');
    expect(withBase('#section')).toBe('#section');
    expect(withBase('')).toBe('');
    expect(withBase(null)).toBe(null);
  });
});
