/**
 * The Chakra UI boundary.
 *
 * This is the ONLY file in the app allowed to import '@chakra-ui/react'.
 * Everything else imports UI primitives from 'components' (the library barrel),
 * or — for files inside src/components/ — from this module directly.
 *
 * Why: any change to the underlying UI library — the planned migration to
 * Tailwind, or a Chakra version bump — is absorbed HERE instead of across the
 * whole app. An explicit `export const X = ...` or `export { Y as X } from ...`
 * below takes precedence over the star re-export, so primitives can be
 * replaced one at a time (e.g. a Tailwind-based Box) without touching
 * consumers. When every export is app-owned, delete the @chakra-ui packages.
 */
export * from '@chakra-ui/react';

// Upgrade shims / overrides go below this line, e.g.:
// export { LegacyButton as Button } from './shims/Button';
