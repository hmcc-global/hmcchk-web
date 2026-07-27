/**
 * Client-side helpers for the admin Site Links page.
 *
 * `isSafeDestinationUrl` mirrors the server rule (server stays the source of
 * truth; this is only for immediate admin feedback). The date helpers convert
 * between the `datetime-local` input value and the stored ISO string: the
 * server compares schedules against Hong Kong wall-clock time (via
 * getOffsettedTime), so we persist the picked wall-clock value labelled as UTC.
 */

const UNSAFE_PROTOCOLS = ['javascript:', 'data:', 'vbscript:', 'file:'];
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\x00-\x1f\x7f]/;

export const isSafeDestinationUrl = (value) => {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (trimmed.length === 0) return false;
  if (CONTROL_CHARS.test(trimmed)) return false;

  const lower = trimmed.toLowerCase();
  if (UNSAFE_PROTOCOLS.some((proto) => lower.startsWith(proto))) return false;

  if (trimmed.charAt(0) === '/') {
    if (trimmed.charAt(1) === '/') return false;
    if (trimmed.indexOf('\\') !== -1) return false;
    return true;
  }

  try {
    return new URL(trimmed).protocol === 'https:';
  } catch {
    return false;
  }
};

// 'YYYY-MM-DDTHH:mm' (datetime-local) -> 'YYYY-MM-DDTHH:mm:00.000Z' (stored).
export const toStoredIso = (localValue) => {
  if (!localValue) return '';
  let value = String(localValue).trim();
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) value += ':00';
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(value)) value += '.000Z';
  return value;
};

// Stored ISO -> 'YYYY-MM-DDTHH:mm' for the datetime-local input. Components are
// taken verbatim (they are HK wall-clock time labelled Z), with no tz math.
export const toLocalInput = (storedIso) => {
  if (!storedIso) return '';
  const match = String(storedIso).match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/);
  return match ? `${match[1]}T${match[2]}` : '';
};

// The server compares schedules against HK wall-clock time (getOffsettedTime);
// mirror that here for previews and target classification.
export const nowIsoHk = () =>
  new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();

const toTime = (value) => {
  if (value === undefined || value === null || value === '') return null;
  let v = String(value);
  // Treat a timezone-less datetime as HK wall-clock (labelled Z), matching how
  // target schedules are stored, so comparisons stay in one time base.
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/.test(v)) {
    v += v.length === 16 ? ':00.000Z' : '.000Z';
  }
  const t = new Date(v).getTime();
  return Number.isNaN(t) ? null : t;
};

// Split a link's targets into current / upcoming / past relative to `nowIso`.
export const classifyTargets = (targets, nowIso) => {
  const now = new Date(nowIso).getTime();
  const current = [];
  const upcoming = [];
  const past = [];
  (targets || []).forEach((target) => {
    const from = toTime(target.activeFrom);
    const until = toTime(target.activeUntil);
    if (from !== null && from > now) upcoming.push(target);
    else if (until !== null && until <= now) past.push(target);
    else current.push(target);
  });
  return { current, upcoming, past };
};

export const isFormAvailableAt = (form, nowIso) => {
  if (!form) return false;
  if (form.isPublished !== true) return false;
  if (form.isDeleted === true) return false;
  const now = new Date(nowIso).getTime();
  if (Number.isNaN(now)) return false;
  const from = toTime(form.formAvailableFrom);
  const until = toTime(form.formAvailableUntil);
  if (from !== null && now < from) return false;
  if (until !== null && now > until) return false;
  return true;
};

// Preview the destination a target would resolve to right now (mirrors the
// server resolver, for the admin's test/preview panel).
export const resolvePreview = (target, form, nowIso) => {
  if (!target) return { ok: false, reason: 'No target' };

  if (target.destinationType === 'url') {
    return isSafeDestinationUrl(target.destinationUrl)
      ? { ok: true, url: target.destinationUrl.trim() }
      : { ok: false, reason: 'Unsafe or invalid URL' };
  }

  if (target.destinationType === 'form') {
    if (!form) return { ok: false, reason: 'Selected form not found' };
    if (!isFormAvailableAt(form, nowIso)) {
      return {
        ok: false,
        reason: 'Form is unpublished, deleted or out of date',
      };
    }
    if (form.formType === 'external') {
      return isSafeDestinationUrl(form.externalFormLink)
        ? { ok: true, url: form.externalFormLink.trim() }
        : { ok: false, reason: 'Form has an unsafe external link' };
    }
    return { ok: true, url: `/forms/${form.id}` };
  }

  return { ok: false, reason: 'Unknown destination type' };
};

// True when the target's schedule falls outside the selected form's own
// availability window (used to warn the admin before saving).
export const scheduleOutsideForm = (target, form) => {
  if (!form || target.destinationType !== 'form') return false;
  const tFrom = toTime(target.activeFrom);
  const tUntil = toTime(target.activeUntil);
  const fFrom = toTime(form.formAvailableFrom);
  const fUntil = toTime(form.formAvailableUntil);
  if (fFrom !== null && (tFrom === null || tFrom < fFrom)) return true;
  if (fUntil !== null && (tUntil === null || tUntil > fUntil)) return true;
  return false;
};
