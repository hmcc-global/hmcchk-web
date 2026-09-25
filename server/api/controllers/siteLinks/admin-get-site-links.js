module.exports = {
  friendlyName: 'Admin get site links',

  description:
    'Returns every non-deleted Site Link with its non-deleted targets attached, for the admin Site Links page.',

  inputs: {},

  exits: {
    success: { description: 'Site links returned successfully.' },
    error: { description: 'Failed to fetch site links.' },
  },

  fn: async function (inputs, exits) {
    try {
      const siteLinks = await SiteLink.find({ isDeleted: false }).sort(
        'label ASC'
      );

      // One query for all targets, then group in memory (avoids N+1).
      const targets = await SiteLinkTarget.find({
        siteLink: { in: siteLinks.map((link) => link.id) },
        isDeleted: false,
      }).sort('activeFrom ASC');

      const targetsByLink = {};
      targets.forEach((target) => {
        (targetsByLink[target.siteLink] =
          targetsByLink[target.siteLink] || []).push(target);
      });

      const withTargets = siteLinks.map((link) =>
        Object.assign({}, link, { targets: targetsByLink[link.id] || [] })
      );

      return exits.success(withTargets);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
