// Extends Vitest's `expect` with jest-dom matchers (toBeInTheDocument,
// toHaveAttribute, etc.) for all component tests. Wired in via
// `test.setupFiles` in vite.config.js.
import '@testing-library/jest-dom';

// jsdom doesn't implement these browser APIs that framer-motion relies on
// (whileInView uses IntersectionObserver; motion checks prefers-reduced-motion
// via matchMedia). Provide minimal stubs so components render deterministically.
if (!('IntersectionObserver' in globalThis)) {
  class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  globalThis.IntersectionObserver = IntersectionObserver;
}

if (!globalThis.matchMedia) {
  globalThis.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {
      return false;
    },
  });
}
