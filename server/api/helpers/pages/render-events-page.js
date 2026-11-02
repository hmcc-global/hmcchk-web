const path = require('path');
const fs = require('fs').promises;

const SSR_BUNDLE_PATH = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'ssr',
  'events.cjs'
);
const INDEX_HTML_PATH = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'client',
  'index.html'
);
const SITE_URL = 'https://hk.hmccglobal.org';

let eventRenderer;

// A failed load is not cached: the bundle can appear after the first request
// (deploy race, or a build that skipped build:ssr), and SSR should recover
// without a restart.
const loadRenderer = () => {
  if (eventRenderer) return eventRenderer;

  try {
    eventRenderer = require(SSR_BUNDLE_PATH);
  } catch (err) {
    sails.log.warn(
      `Could not load the events SSR bundle, the page will fall back to the SPA: ${err.message}`
    );
    return null;
  }

  return eventRenderer;
};

const escapeAttribute = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const buildHeadTags = (seo) => {
  const tags = [
    '<meta property="og:type" content="website" />',
    `<meta property="og:title" content="${escapeAttribute(seo.title)}" />`,
    `<meta property="og:description" content="${escapeAttribute(
      seo.description
    )}" />`,
    `<meta property="og:url" content="${SITE_URL}/events" />`,
    `<link rel="canonical" href="${SITE_URL}/events" />`,
  ];

  if (seo.image) {
    tags.push(
      `<meta property="og:image" content="${SITE_URL}${escapeAttribute(
        seo.image
      )}" />`
    );
  }

  if (seo.keywords) {
    tags.push(
      `<meta name="keywords" content="${escapeAttribute(seo.keywords)}" />`
    );
  }

  return tags.join('\n  ');
};

const ROOT_DIV_PATTERN = /<div id="root">\s*<\/div>/;

const buildPage = (indexHtml, { html, dataScript, helmetTags, seo }) => {
  if (!ROOT_DIV_PATTERN.test(indexHtml)) {
    throw new Error(
      'client/index.html has no empty <div id="root"></div> to render into'
    );
  }

  let page = indexHtml.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeAttribute(seo.title)}</title>`
  );

  page = page.replace(
    /<meta name="description"[^>]*\/?>/,
    `<meta name="description" content="${escapeAttribute(seo.description)}" />`
  );

  page = page.replace(
    '</head>',
    `  ${buildHeadTags(seo)}\n  ${helmetTags}\n</head>`
  );
  page = page.replace(ROOT_DIV_PATTERN, `<div id="root">${html}</div>`);
  page = page.replace('</body>', `${dataScript}\n</body>`);

  return page;
};

module.exports = {
  friendlyName: 'Render events page',

  description:
    'Render the events page to HTML with the SPA shell and its meta tags',

  inputs: {
    pathname: {
      type: 'string',
      required: true,
      description: 'Request path, so the router renders /events',
    },
    data: {
      type: 'json',
      required: true,
      description: 'Render timestamp and the announcements to show',
    },
  },

  exits: {
    success: {
      description: 'The events page HTML',
    },
    error: {
      description: 'The page could not be rendered',
    },
  },

  fn: async function ({ pathname, data }, exits) {
    const renderer = loadRenderer();
    if (!renderer) return exits.error(new Error('SSR bundle unavailable'));

    try {
      const indexHtml = await fs.readFile(INDEX_HTML_PATH, 'utf8');
      const rendered = renderer.renderEventsPage({ pathname, data });

      return exits.success({
        page: buildPage(indexHtml, rendered),
        seo: rendered.seo,
      });
    } catch (err) {
      return exits.error(err);
    }
  },
};
