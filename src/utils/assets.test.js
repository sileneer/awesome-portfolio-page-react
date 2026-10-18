import { resolveAsset } from './assets';
import photo from '../assets/profile_photo.jpg';
import cv from '../assets/CV.pdf';
import screenshot from '../assets/projects/connect1.png';

afterEach(() => vi.unstubAllEnvs());

test('resolves existing bundled defaults and relative screenshot aliases centrally', () => {
  expect(resolveAsset('/profile_photo.jpg')).toBe(photo);
  expect(resolveAsset('/CV.pdf')).toBe(cv);
  expect(resolveAsset('/projects/connect1.png')).toBe(screenshot);
  expect(resolveAsset('projects/connect1.png')).toBe(screenshot);
});

test('resolves custom public resources against the deployment base', () => {
  vi.stubEnv('BASE_URL', '/portfolio/');
  expect(resolveAsset('/companies/acme.svg')).toBe('/portfolio/companies/acme.svg');
  expect(resolveAsset('companies/acme.svg')).toBe('/portfolio/companies/acme.svg');
  expect(resolveAsset('/papers/study.pdf')).toBe('/portfolio/papers/study.pdf');
});

test('preserves external URLs and empty optional sources', () => {
  expect(resolveAsset('https://cdn.example.org/logo.svg?v=2')).toBe('https://cdn.example.org/logo.svg?v=2');
  expect(resolveAsset('')).toBe('');
  expect(resolveAsset(undefined)).toBeUndefined();
});
