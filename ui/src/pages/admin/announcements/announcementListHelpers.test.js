import { expect, test } from 'vitest';
import { formatDisplayWindow, pastRecencyMs } from './announcementListHelpers';

test('past list ranks a later display end above an older one', () => {
  const newer = { displayEndDateTime: '2026-09-01T12:00:00.000Z' };
  const older = { displayEndDateTime: '2024-01-01T12:00:00.000Z' };
  expect(pastRecencyMs(newer)).toBeGreaterThan(pastRecencyMs(older));
});

test('display window phrases both endpoints', () => {
  const item = {
    displayStartDateTime: '2026-01-02T03:04:00',
    displayEndDateTime: '2026-02-03T05:06:00',
  };
  expect(formatDisplayWindow(item)).toBe(
    'from 02 Jan 2026, 03:04 to 03 Feb 2026, 05:06'
  );
});

test('display window phrases a one-sided window', () => {
  expect(
    formatDisplayWindow({
      displayStartDateTime: null,
      displayEndDateTime: '2026-02-03T05:06:00',
    })
  ).toBe('until 03 Feb 2026, 05:06');
  expect(
    formatDisplayWindow({
      displayStartDateTime: '2026-01-02T03:04:00',
      displayEndDateTime: null,
    })
  ).toBe('from 02 Jan 2026, 03:04 (ongoing)');
});

test('display window reports when there is no window', () => {
  expect(formatDisplayWindow({})).toBe('no window set');
});

test('display window falls back to the raw value when unparseable', () => {
  expect(
    formatDisplayWindow({
      displayStartDateTime: 'soon',
      displayEndDateTime: '2026-02-03T05:06:00',
    })
  ).toBe('from soon to 03 Feb 2026, 05:06');
});
