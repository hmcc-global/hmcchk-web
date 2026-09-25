/**
 * Shared logic for Site Link redirect resolution and form availability.
 */

const UNSAFE_PROTOCOLS = ['javascript:', 'data:', 'vbscript:', 'file:'];
const CONTROL_CHARS = /[\x00-\x1f\x7f]/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const INTERNAL_BASE = 'https://internal.invalid';

const toTime = (value) => {
  if (value === undefined || value === null || value === '') return null;
  const t = new Date(value).getTime();
  return Number.isNaN(t) ? null : t;
};

const pointsAtResolver = (pathname) => {
  try {
    return decodeURIComponent(pathname).toLowerCase().startsWith('/go/');
  } catch (unusedErr) {
    return true;
  }
};

// A safe redirect destination is an absolute https URL or an internal path with
// a single leading slash. Rejects javascript:/data:/protocol-relative/etc, and
// anything that normalizes to /go/ on this site (`selfHost`), which would make
// one managed link redirect to another forever.
const isSafeUrl = (value, selfHost) => {
  if (typeof value !== 'string') return false;
  const url = value.trim();
  if (!url || CONTROL_CHARS.test(url)) return false;
  const lower = url.toLowerCase();
  if (UNSAFE_PROTOCOLS.some((proto) => lower.startsWith(proto))) return false;
  try {
    if (url.charAt(0) === '/') {
      return (
        url.charAt(1) !== '/' &&
        !url.includes('\\') &&
        !pointsAtResolver(new URL(url, INTERNAL_BASE).pathname)
      );
    }
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return false;
    const isSelf =
      !!selfHost && parsed.host.toLowerCase() === selfHost.toLowerCase();
    return !(isSelf && pointsAtResolver(parsed.pathname));
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

// The active window is half-open — activeFrom <= now < activeUntil — so
// back-to-back schedules hand over cleanly instead of both being active at the
// shared instant. An empty bound is open. Latest start wins.
const findActiveTarget = (targets, now) => {
  const nowT = toTime(now);
  const active = (targets || []).filter((target) => {
    const from = toTime(target.activeFrom);
    const until = toTime(target.activeUntil);
    return (from === null || nowT >= from) && (until === null || nowT < until);
  });
  // Open starts sort first; equal starts keep their relative order.
  active.sort((a, b) => {
    const aFrom = toTime(a.activeFrom);
    const bFrom = toTime(b.activeFrom);
    if (aFrom === bFrom) return 0;
    if (aFrom === null) return -1;
    if (bFrom === null) return 1;
    return aFrom - bFrom;
  });
  return active.length ? active[active.length - 1] : null;
};

// Resolve an active target to a redirect URL.
// Returns { ok: true, url } or { ok: false, reason }.
const resolveDestination = (target, form, now, selfHost) => {
  if (!target) return { ok: false, reason: 'no-active-target' };

  if (target.destinationType === 'url') {
    return isSafeUrl(target.destinationUrl, selfHost)
      ? { ok: true, url: target.destinationUrl.trim() }
      : { ok: false, reason: 'unsafe-url' };
  }

  if (target.destinationType === 'form') {
    if (!isFormAvailable(form, now)) {
      return { ok: false, reason: 'form-unavailable' };
    }
    if (form.formType === 'external') {
      return isSafeUrl(form.externalFormLink, selfHost)
        ? { ok: true, url: form.externalFormLink.trim() }
        : { ok: false, reason: 'unsafe-external-link' };
    }
    return { ok: true, url: '/forms/' + (form.id || form._id) };
  }

  return { ok: false, reason: 'unknown-destination-type' };
};

module.exports = {
  isSafeUrl,
  isValidSlug,
  getFormAvailabilityCriteria,
  isFormAvailable,
  findActiveTarget,
  resolveDestination,
};
