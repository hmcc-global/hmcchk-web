/**
 * The Chakra UI boundary.
 *
 * This is the ONLY file in the app allowed to import '@chakra-ui/react'.
 * Everything else imports UI primitives from 'components' (the library barrel),
 * or — for files inside src/components/ — from this module directly.
 *
 * Why: when Chakra is upgraded (v1 → v2/v3 renames and removes exports),
 * the breakage is absorbed HERE with named overrides instead of across the
 * whole app. An explicit `export const X = ...` or `export { Y as X } from ...`
 * below takes precedence over the star re-export, so shims can be added
 * per-export without touching consumers.
 */
export * from '@chakra-ui/react';

// Upgrade shims / overrides go below this line, e.g.:
// export { LegacyButton as Button } from './shims/Button';
