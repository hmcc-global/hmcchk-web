const cron = require('node-cron');

const setLiveButton = async (published) => {
  try {
    
    let data = await LiveSermon.find({ isDeleted: false}).sort('updatedAt DESC').populateAll();

    if (data[0].isPublished !== published) {
      res = await LiveSermon.update({ isPublished: !published }).set({
        isPublished: published,
      });
    }
    
  } catch (err) {
    console.log(err);
  }
};

// Turn on live button every Sunday 9am
cron.schedule('0 9 * * Sunday', async () => {
  await setLiveButton(true);
});

// Turn off live button every Sunday 8pm
cron.schedule('0 20 * * Sunday', async () => {
  await setLiveButton(false);
});