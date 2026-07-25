require('dotenv').config();
const schedule = require('node-schedule');
/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */
module.exports.bootstrap = async function () {
  sails.log('Initialising cache with stdTTL set to 24 hours expiry');
  const NodeCache = require('node-cache');
  sails.cache = new NodeCache({ stdTTL: 24 * 60 * 60 });

  sails.log.info('Scheduling cache-latest for 9am of everyday');
  // second minute hour dayOfTheMonth month dayOfTheWeek
  schedule.scheduleJob(
    '0 0 9 * * *',
    async () => await sails.helpers.cache.cacheLatest()
  );

  sails.log.info('Getting cache-latest in 1 second');
  setTimeout(async () => await sails.helpers.cache.cacheLatest(), 1000);

  sails.log('Initialising Send Batch Parse User Email Cron');
  // every Saturday at 7AM
  schedule.scheduleJob(
    '0 0 7 * * 6',
    async () => await sails.helpers.parseuserquery.sendBatchUsersQuery()
  );

  sails.log('Initialising Parse User Query Emails Cron');
  // every EOD at 9PM
  schedule.scheduleJob(
    '0 0 21 * * *',
    async () => sails.helpers.parseuserquery.parseUserQuery()
  );

  // Seed the permanent life-group Site Link, preserving the currently deployed
  // destination so /go/life-group works the moment this deploys. Look up by slug
  // regardless of isDeleted so an accidental soft-delete is repaired, not blocked
  // by the unique slug/key constraint.
  try {
    let lifeGroupLink = await SiteLink.findOne({ slug: 'life-group' });
    if (!lifeGroupLink) {
      lifeGroupLink = await SiteLink.create({
        key: 'life-group',
        label: 'LIFE Group Signup',
        slug: 'life-group',
        isEnabled: true,
      }).fetch();
      sails.log.info('Seeded life-group site link');
    } else if (lifeGroupLink.isDeleted || !lifeGroupLink.isEnabled) {
      lifeGroupLink = await SiteLink.updateOne({ id: lifeGroupLink.id }).set({
        isDeleted: false,
        isEnabled: true,
      });
      sails.log.info('Re-enabled life-group site link');
    }

    const targetCount = await SiteLinkTarget.count({
      siteLink: lifeGroupLink.id,
      isDeleted: false,
    });
    if (targetCount === 0) {
      await SiteLinkTarget.create({
        siteLink: lifeGroupLink.id,
        destinationType: 'url',
        destinationUrl: 'https://bit.ly/summerLG26',
        activeFrom: '',
        activeUntil: '',
        updatedBy: 'system-seed',
      });
      sails.log.info('Seeded life-group default target');
    }
  } catch (err) {
    sails.log.error('Failed to seed life-group site link', err);
  }
};
