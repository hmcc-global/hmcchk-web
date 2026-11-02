import { DateTime } from 'luxon';
import { ADMIN_FONT, adminShellColors } from '../navigation/adminNav';

export { ADMIN_FONT };

export const announcementColors = {
  ...adminShellColors,
  blueDeep: '#10264d',
  live: '#1f7a4d',
  offline: '#8b95a5',
  danger: '#8c2f2f',
  dangerHover: '#732626',
  tagWebBg: '#d9e6f7',
  tagWeb: '#17356b',
  tagSlidesBg: '#e3f4ec',
  tagSlides: '#14553c',
  tagFeatureBg: '#f8f0d4',
  tagFeature: '#5a430c',
  dashed: '#c5cad3',
};

export const focusRing = {
  '&:focus-visible': {
    outline: `2px solid ${announcementColors.blue}`,
    outlineOffset: '2px',
  },
};

const buttonBase = {
  h: '40px',
  px: '14px',
  borderRadius: '8px',
  fontFamily: ADMIN_FONT,
  fontWeight: '600',
  fontSize: '14px',
  sx: focusRing,
};

export const primaryButtonProps = {
  ...buttonBase,
  bg: announcementColors.blue,
  color: 'white',
  _hover: { bg: announcementColors.blueDeep },
  _active: { bg: announcementColors.blueDeep },
};

export const quietButtonProps = {
  ...buttonBase,
  border: '1px solid',
  borderColor: announcementColors.line,
  bg: announcementColors.paper,
  color: announcementColors.ink,
  _hover: { bg: announcementColors.wash },
  _active: { bg: announcementColors.wash },
};

export const publishButtonProps = {
  ...buttonBase,
  bg: announcementColors.blueSoft,
  color: announcementColors.blue,
  _hover: { bg: announcementColors.cardHover },
  _active: { bg: announcementColors.cardHover },
};

export const dangerButtonProps = {
  ...buttonBase,
  bg: announcementColors.danger,
  color: 'white',
  _hover: { bg: announcementColors.dangerHover },
  _active: { bg: announcementColors.dangerHover },
};

export const textInputProps = {
  h: '42px',
  borderRadius: '8px',
  borderColor: announcementColors.line,
  bg: announcementColors.paper,
  fontFamily: ADMIN_FONT,
  fontSize: '15px',
  _focus: {
    borderColor: announcementColors.blue,
    boxShadow: `0 0 0 1px ${announcementColors.blue}`,
  },
};

export const editorContainerSx = {
  containerType: 'inline-size',
  containerName: 'editor',
};

export const datePairSx = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '12px',
  '@container editor (min-width: 521px)': {
    gridTemplateColumns: '1fr 1fr',
  },
};

export const announcementListSx = {
  containerType: 'inline-size',
  containerName: 'announcements',
  '.announcement-row': {
    display: 'grid',
    gridTemplateColumns: '112px minmax(0, 1fr)',
    gap: '16px',
    alignItems: 'start',
    padding: '14px',
    background: announcementColors.paper,
    borderRadius: '12px',
    cursor: 'pointer',
  },
  '.announcement-row:hover': {
    background: announcementColors.cardHover,
  },
  '.announcement-row.is-selected, .announcement-row.is-selected:hover': {
    background: announcementColors.blueSoft,
  },
  '.announcement-thumb': {
    width: '112px',
    height: '63px',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'grid',
    placeItems: 'center',
    textAlign: 'center',
  },
  '.announcement-thumb.is-empty': {
    border: `1px dashed ${announcementColors.dashed}`,
    color: announcementColors.muted,
    background: announcementColors.paper,
    fontSize: '12px',
    fontWeight: '500',
    padding: '6px',
  },
  '.announcement-actions': {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '8px',
    gridColumn: '1 / -1',
  },
  '.announcement-row.is-list': {
    gridTemplateColumns: '80px minmax(0, 1fr)',
    gap: '12px',
  },
  '.announcement-row.is-list .announcement-thumb': {
    width: '80px',
    height: '45px',
    aspectRatio: '16 / 9',
  },
  '@container announcements (max-width: 420px)': {
    '.announcement-row.is-cards': {
      gridTemplateColumns: '1fr',
    },
    '.announcement-row.is-cards .announcement-thumb': {
      width: '100%',
      height: 'auto',
      aspectRatio: '16 / 9',
    },
  },
  '@container announcements (min-width: 760px)': {
    '.announcement-row.is-cards': {
      gridTemplateColumns: '144px minmax(0, 1fr) auto',
    },
    '.announcement-row.is-cards .announcement-thumb': {
      width: '144px',
      height: '81px',
    },
    '.announcement-row.is-cards .announcement-actions, .announcement-row.is-list .announcement-actions':
      {
        gridColumn: 'auto',
      },
    '.announcement-row.is-list': {
      gridTemplateColumns: '80px minmax(0, 1fr) auto',
    },
  },
};

const asText = (value) => (typeof value === 'string' ? value : '');

const fromIso = (value) => {
  if (typeof value !== 'string' || !value) return DateTime.invalid('empty');
  return DateTime.fromISO(value);
};

export const isShowingNow = (item, today) => {
  if (!item || typeof item !== 'object') return false;
  if (item.displayEndDateTime) {
    const end = fromIso(String(item.displayEndDateTime));
    return end.isValid && end > today;
  }
  if (item.displayStartDateTime && item.displayEndDateTime) {
    const start = fromIso(String(item.eventStartDate));
    return start.isValid && start < today;
  }
  if (item.eventEndDate) {
    const end = fromIso(String(item.eventEndDate));
    return end.isValid && end > today;
  }
  if (item.eventStartDate && !item.eventEndDate) {
    const start = fromIso(String(item.eventStartDate));
    return start.isValid && start < today;
  }
  return true;
};

export const isPastAnnouncement = (item, today) => {
  if (!item || typeof item !== 'object') return false;
  if (item.displayEndDateTime) {
    const end = fromIso(String(item.displayEndDateTime));
    return end.isValid && end < today;
  }
  if (item.eventEndDate) {
    const end = fromIso(String(item.eventEndDate));
    return end.isValid && end < today;
  }
  return false;
};

export const isWebsiteLive = (announcement) =>
  announcement?.isInWeb === true && announcement?.isPublished === true;

const formatStamp = (value, mode) => {
  const text = asText(value).trim();
  if (!text) return '';
  let parsed = DateTime.fromISO(text);
  if (!parsed.isValid && mode === 'time') {
    parsed = DateTime.fromFormat(text, 'HH:mm');
    if (!parsed.isValid) parsed = DateTime.fromFormat(text, 'h:mm a');
  }
  if (!parsed.isValid) return text;
  if (mode === 'time') return parsed.toFormat('h:mma').toLowerCase();
  if (mode === 'date') return parsed.toFormat('d LLL yyyy');
  const hasClock = text.includes('T') || text.includes(':');
  if (!hasClock) return parsed.toFormat('d LLL yyyy');
  return parsed.toFormat('d LLL yyyy, h:mma').toLowerCase();
};

const joinRange = (start, end) => {
  if (start && end && start !== end) return `${start} to ${end}`;
  return start || end || '';
};

const joinBits = (bits) => bits.filter(Boolean).join('. ');

export const eventLine = (announcement) =>
  joinBits([
    joinRange(
      formatStamp(announcement?.eventStartDate, 'date'),
      formatStamp(announcement?.eventEndDate, 'date')
    ),
    joinRange(
      formatStamp(announcement?.eventStartTime, 'time'),
      formatStamp(announcement?.eventEndTime, 'time')
    ),
    asText(announcement?.location).trim(),
  ]);

export const showingLine = (announcement) => {
  const range = joinRange(
    formatStamp(announcement?.displayStartDateTime, 'datetime'),
    formatStamp(announcement?.displayEndDateTime, 'datetime')
  );
  return range ? `Showing ${range}` : '';
};

export const auditLine = (announcement) =>
  joinBits([
    asText(announcement?.submittedBy).trim()
      ? `Added by ${asText(announcement.submittedBy).trim()}`
      : '',
    asText(announcement?.lastUpdatedBy).trim()
      ? `Updated by ${asText(announcement.lastUpdatedBy).trim()}`
      : '',
  ]);

export const announcementTitle = (announcement) => {
  const title = asText(announcement?.title).trim();
  return title || 'Untitled announcement';
};

// eventType drifted across old records: many are missing/null, and CUIAutoComplete
// requires an array of { label, value } — feeding it anything else crashes the page
export const toEventTypeItems = (value) =>
  Array.isArray(value)
    ? value
        .map((entry) =>
          typeof entry === 'string' ? { label: entry, value: entry } : entry
        )
        .filter((entry) => entry && typeof entry.value === 'string')
        .map((entry) => ({
          ...entry,
          label: typeof entry.label === 'string' ? entry.label : entry.value,
        }))
    : [];

export const emptyForm = () => ({
  title: '',
  isInWeb: false,
  isInPpt: false,
  description: '',
  imageAdUrl: '',
  location: '',
  directionsUrl: '',
  displayStartDateTime: '',
  displayEndDateTime: '',
  eventStartDate: '',
  eventStartTime: '',
  eventEndDate: '',
  eventEndTime: '',
  eventInterval: 'None',
  eventType: [],
  featured: false,
  formId: '',
  signUpUrl: '',
  additionalNotes: '',
});

export const formFromAnnouncement = (announcement) => ({
  title: asText(announcement?.title),
  isInWeb: announcement?.isInWeb === true,
  isInPpt: announcement?.isInPpt === true,
  description: asText(announcement?.description),
  imageAdUrl: asText(announcement?.imageAdUrl),
  location: asText(announcement?.location),
  directionsUrl: asText(announcement?.directionsUrl),
  displayStartDateTime: asText(announcement?.displayStartDateTime),
  displayEndDateTime: asText(announcement?.displayEndDateTime),
  eventStartDate: asText(announcement?.eventStartDate),
  eventStartTime: asText(announcement?.eventStartTime),
  eventEndDate: asText(announcement?.eventEndDate),
  eventEndTime: asText(announcement?.eventEndTime),
  eventInterval: asText(announcement?.eventInterval) || 'None',
  eventType: toEventTypeItems(announcement?.eventType),
  featured: announcement?.featured === true,
  formId: asText(announcement?.formId),
  signUpUrl: asText(announcement?.signUpUrl),
  additionalNotes: asText(announcement?.additionalNotes),
});

export const buildInitialForm = (action, announcement) => {
  if (action === 'create' || !announcement) return emptyForm();
  const form = formFromAnnouncement(announcement);
  if (action === 'duplicate') {
    return {
      ...form,
      title: form.title.trim()
        ? `Copy of ${form.title.trim()}`
        : 'Copy of announcement',
    };
  }
  return form;
};

export const serializeForm = (form) => JSON.stringify(form);

export const willPublishOnSave = ({
  action,
  isInWeb,
  wasOnWeb,
  wasPublished,
}) => {
  if (!isInWeb) return false;
  if (action === 'edit' && wasOnWeb) return wasPublished === true;
  return true;
};

export const nextPublishedValue = ({
  action,
  isInWeb,
  wasOnWeb,
  wasPublished,
}) => {
  if (!isInWeb) return false;
  if (action === 'edit' && wasOnWeb) return wasPublished === true;
  return true;
};

export const editorNote = ({
  action,
  isInWeb,
  isInPpt,
  wasOnWeb,
  wasPublished,
}) => {
  if (action === 'duplicate') {
    return 'This copy is not in the list until you save it.';
  }
  const willBeLive = willPublishOnSave({
    action,
    isInWeb,
    wasOnWeb,
    wasPublished,
  });
  if (willBeLive && isInPpt) {
    return 'Saving puts this on the website and in the Sunday slides.';
  }
  if (willBeLive) {
    return 'Saving puts this on the website during the display dates.';
  }
  if (isInWeb && isInPpt) {
    return 'Saving updates the Sunday slides. Press Publish when it should also go on the website.';
  }
  if (isInWeb) {
    return 'Saving keeps these details. Press Publish when it should go on the website.';
  }
  if (isInPpt) {
    return 'Saving updates the Sunday slides. It will not appear on the website.';
  }
  return 'Tick Website, Sunday slides, or both. Save stores the details. Publish puts a website announcement online.';
};

export const saveToast = ({ isInWeb, isInPpt, isPublished, action }) => {
  const live = isInWeb && isPublished;
  let outcome =
    'Saved. Tick Website or Sunday slides when you want people to see it.';
  if (live && isInPpt) {
    outcome = 'Saved. On the website and in the Sunday slides.';
  } else if (live) {
    outcome = 'Saved. On the website during the display dates.';
  } else if (isInWeb && isInPpt) {
    outcome =
      'Saved. Sunday slides updated. Press Publish when it should also go on the website.';
  } else if (isInWeb) {
    outcome = 'Saved. Press Publish when it should go on the website.';
  } else if (isInPpt) {
    outcome = 'Saved. Sunday slides updated. It is not on the website.';
  }
  if (action === 'duplicate') {
    return `Copy saved. ${outcome.replace('Saved. ', '')}`;
  }
  return outcome;
};

export const DISPLAY_DATE_ERROR =
  'Add the display start and end. Without them, a website announcement will not show.';
