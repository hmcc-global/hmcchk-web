// Vitest setup (wired via `test.setupFiles` in vite.config.js).
// jest-dom adds DOM matchers like expect(element).toHaveTextContent(/react/i) —
// despite the name it is runner-agnostic and works with Vitest.
// https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jsdom doesn't implement matchMedia (react-slick's enquire.js requires it)
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
