import { render, screen } from '@testing-library/react';
import App from './App';

// CRA boilerplate — it asserts "learn react" text that never existed in this app,
// and rendering <App /> fires real /api calls (PrivateRoute verify-token) that
// need mocking (e.g. msw) before a real smoke test can pass. Un-skip and rewrite
// once API mocks are in place. The Vitest runner itself is fully wired (jsdom +
// setupTests.js).
test.skip('renders app', () => {
  render(<App />);
  expect(screen.getByText(/learn react/i)).toBeInTheDocument();
});
