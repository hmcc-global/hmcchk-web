/**
 * Shared logic for Site Link redirect resolution and admin validation, kept in
 * one place so the resolver and the admin actions apply identical rules.
 */

const UNSAFE_PROTOCOLS = ['javascript:', 'data:', 'vbscript:', 'file:'];
const CONTROL_CHARS = /[\x00-\x1f\x7f]/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const toTime = (value) => {
  if (value === undefined || value === null || value === '') return null;
  const t = new Date(value).getTime();
  return Number.isNaN(t) ? null : t;
};

// A safe redirect destination is an absolute https URL or an internal path with
// a single leading slash. Rejects javascript:/data:/protocol-relative/etc.
const isSafeUrl = (value) => {
  if (typeof value !== 'string') return false;
  const url = value.trim();
  if (!url || CONTROL_CHARS.test(url)) return false;
  const lower = url.toLowerCase();
  if (UNSAFE_PROTOCOLS.some((proto) => lower.startsWith(proto))) return false;
  if (url.charAt(0) === '/')
    return url.charAt(1) !== '/' && !url.includes('\\');
  try {
    return new URL(url).protocol === 'https:';
  } catch (unusedErr) {
    return false;
  }
};

const isValidSlug = (slug) =>
  typeof slug === 'string' && SLUG_PATTERN.test(slug);

// A form is available when published, not deleted, and now is within its window.
// Waterline criteria equivalent to isFormAvailable, shared with /forms/:id.
const getFormAvailabilityCriteria = (now) => ({
  isPublished: true,
  isDeleted: false,
  or: [
    {
      formAvailableFrom: { '<=': now },
      formAvailableUntil: { '>=': now },
    },
    { formAvailableFrom: { '<=': now }, formAvailableUntil: '' },
    { formAvailableFrom: '', formAvailableUntil: { '>=': now } },
    { formAvailableFrom: '', formAvailableUntil: '' },
  ],
});
const isFormAvailable = (form, now) => {
  if (!form || form.isPublished !== true || form.isDeleted === true) {
    return false;
  }
  const nowT = toTime(now);
  if (nowT === null) return false;
  const from = toTime(form.formAvailableFrom);
  const until = toTime(form.formAvailableUntil);
  if (from !== null && nowT < from) return false;
  if (until !== null && nowT > until) return false;
  return true;
};

// The active target's [activeFrom, activeUntil] window contains now (empty bound
// = open); the latest-starting wins if several overlap.
const findActiveTarget = (targets, now) => {
  const nowT = toTime(now);
  const active = (targets || []).filter((target) => {
    const from = toTime(target.activeFrom);
    const until = toTime(target.activeUntil);
    return (from === null || nowT >= from) && (until === null || nowT <= until);
  });
  active.sort(
    (a, b) =>
      (toTime(a.activeFrom) === null ? -Infinity : toTime(a.activeFrom)) -
      (toTime(b.activeFrom) === null ? -Infinity : toTime(b.activeFrom))
  );
  return active.length ? active[active.length - 1] : null;
};

// Two schedules overlap unless one ends at/before the other starts.
const rangesOverlap = (a, b) => {
  const aFrom = toTime(a.activeFrom);
  const aUntil = toTime(a.activeUntil);
  const bFrom = toTime(b.activeFrom);
  const bUntil = toTime(b.activeUntil);
  if (aUntil !== null && bFrom !== null && aUntil <= bFrom) return false;
  if (bUntil !== null && aFrom !== null && bUntil <= aFrom) return false;
  return true;
};

// Resolve an active target to a redirect URL.
// Returns { ok: true, url } or { ok: false, reason }.
const resolveDestination = (target, form, now) => {
  if (!target) return { ok: false, reason: 'no-active-target' };

  if (target.destinationType === 'url') {
    return isSafeUrl(target.destinationUrl)
      ? { ok: true, url: target.destinationUrl.trim() }
      : { ok: false, reason: 'unsafe-url' };
  }

  if (target.destinationType === 'form') {
    if (!isFormAvailable(form, now)) {
      return { ok: false, reason: 'form-unavailable' };
    }
    if (form.formType === 'external') {
      return isSafeUrl(form.externalFormLink)
        ? { ok: true, url: form.externalFormLink.trim() }
        : { ok: false, reason: 'unsafe-external-link' };
    }
    return { ok: true, url: '/forms/' + (form.id || form._id) };
  }

  return { ok: false, reason: 'unknown-destination-type' };
};

// Validate an admin target payload against the typed-destination and schedule
// rules. Returns an error message string, or null when valid. `siblings` are the
// link's other non-deleted targets; `excludeId` is the target being updated.
const validateTarget = (payload, siblings, excludeId) => {
  const { destinationType, formId, destinationUrl } = payload;

  if (destinationType !== 'form' && destinationType !== 'url') {
    return 'destinationType must be "form" or "url".';
  }
  if (destinationType === 'form' && !formId) {
    return 'A form must be selected for a form destination.';
  }
  if (destinationType === 'url') {
    if (!destinationUrl) return 'A destination URL is required.';
    if (!isSafeUrl(destinationUrl)) {
      return 'The destination must be an https:// URL or a safe internal path.';
    }
  }

  const from = toTime(payload.activeFrom);
  const until = toTime(payload.activeUntil);
  if (payload.activeFrom && from === null) return 'Invalid "active from" date.';
  if (payload.activeUntil && until === null) {
    return 'Invalid "active until" date.';
  }
  if (from !== null && until !== null && from >= until) {
    return '"Active from" must be before "active until".';
  }

  const hasConflict = (siblings || []).some(
    (t) => !t.isDeleted && t.id !== excludeId && rangesOverlap(t, payload)
  );
  if (hasConflict) return 'This schedule overlaps an existing target.';

  return null;
};

module.exports = {
  isSafeUrl,
  isValidSlug,
  getFormAvailabilityCriteria,
  isFormAvailable,
  findActiveTarget,
  resolveDestination,
  validateTarget,
};
