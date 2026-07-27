const {
  findActiveTarget,
  resolveDestination,
} = require('../../lib/site-links');

const UNAVAILABLE_PATH = '/link-unavailable';

module.exports = {
  friendlyName: 'Resolve site link redirect',

  description:
    'Public resolver for /go/:slug. Finds the currently active target and issues a temporary (302) redirect to its destination, or to a friendly unavailable page when nothing valid resolves.',

  inputs: {
    slug: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      responseType: 'redirect',
    },
  },

  fn: async function ({ slug }, exits) {
    const res = this.res;
    // Never cache a redirect, so a newly scheduled season is picked up at once.
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.set('Pragma', 'no-cache');

    try {
      const siteLink = await SiteLink.findOne({
        slug,
        isEnabled: true,
        isDeleted: false,
      });
      if (!siteLink) return exits.success(UNAVAILABLE_PATH);

      const targets = await SiteLinkTarget.find({
        siteLink: siteLink.id,
        isDeleted: false,
      });

      let now = await sails.helpers.datetime.getOffsettedTime(new Date());
      now = now.toISOString();

      const activeTarget = findActiveTarget(targets, now);
      if (!activeTarget) return exits.success(UNAVAILABLE_PATH);

      let form = null;
      if (activeTarget.destinationType === 'form') {
        form = await Form.findOne({ id: activeTarget.formId });
      }

      const resolved = resolveDestination(activeTarget, form, now);

      if (!resolved.ok) {
        sails.log.info(
          `Site link /go/${slug} could not resolve: ${resolved.reason}`
        );
        return exits.success(UNAVAILABLE_PATH);
      }

      return exits.success(resolved.url);
    } catch (err) {
      sails.log(err);
      return exits.success(UNAVAILABLE_PATH);
    }
  },
};
