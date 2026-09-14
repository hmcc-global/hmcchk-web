import { expect, test } from 'vitest';
import { pastRecencyMs } from './announcementListHelpers';

test('past list ranks a later display end above an older one', () => {
  const newer = { displayEndDateTime: '2026-09-01T12:00:00.000Z' };
  const older = { displayEndDateTime: '2024-01-01T12:00:00.000Z' };
  expect(pastRecencyMs(newer)).toBeGreaterThan(pastRecencyMs(older));
});
