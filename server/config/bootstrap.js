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
  schedule.scheduleJob('0 0 21 * * *', async () =>
    sails.helpers.parseuserquery.parseUserQuery()
  );

  // Seed the permanent LIFE Group Site Link only when it does not exist. Once
  // created, admin changes are authoritative and must survive deploys/restarts.
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
    }

    // Checked separately from the link so a failure between the two is repaired
    // on the next lift. Targets are soft-deleted, so a schedule the admin has
    // emptied still counts as seeded and is never refilled.
    if (!lifeGroupLink.isDeleted) {
      const targetCount = await SiteLinkTarget.count({
        siteLink: lifeGroupLink.id,
      });
      if (targetCount === 0) {
        await SiteLinkTarget.create({
          siteLink: lifeGroupLink.id,
          destinationType: 'url',
          destinationUrl: 'https://bit.ly/lifegroup2627',
          activeFrom: '',
          activeUntil: '',
          updatedBy: 'system-seed',
        });
        sails.log.info('Seeded default life-group site link target');
      }
    }
  } catch (err) {
    sails.log.error('Failed to seed life-group site link', err);
  }
};
