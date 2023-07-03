const cron  = require('node-cron');

// To change the isPublished value in the database from false to true
const onLiveButon = async () => {
  try{
    var mongoClient = LiveSermon.getDatastore().manager.client;
    var results = await mongoClient.db('hmcchk_db_test')
    .collection('livesermon');
    //console.log("isPublished button has been changed")
    var checking = await mongoClient.db('hmcchk_db_test')
    .collection('livesermon')
    .find({}, { isPublished: 1})
    .toArray();
    //console.log(checking);
    if (!checking[0].isPublished) {
      var data = await results.updateOne(
        { isPublished: false },
        { $set: { isPublished: true } },
      )
    }
  }catch(err){
    console.log(err);
  }
}

// To change the isPublished value in the database from true to false
const offLiveButton = async () => {
  try{
    var mongoClient = LiveSermon.getDatastore().manager.client;
    var results = await mongoClient.db('hmcchk_db_test')
    .collection('livesermon');
    //console.log("isPublished button has been changed")
    var checking = await mongoClient.db('hmcchk_db_test')
    .collection('livesermon')
    .find({}, { isPublished: 1})
    .toArray();
    //console.log(checking);
    if (checking[0].isPublished) {
      var data = await results.updateOne(
        { isPublished: true },
        { $set: { isPublished: false } },
      )
    }
  }catch(err){ 
    console.log(err);
  }
}


// Turn on live button every Sunday 9am
cron.schedule('0 9 * * Sunday', () => {
  //console.log("Turning on Live Button");
  onLiveButon();
});

// Turn off live button every Sunday 8pm
cron.schedule('0 20 * * Sunday', () => {
  //console.log("Turning off Live button");
  offLiveButton();
})