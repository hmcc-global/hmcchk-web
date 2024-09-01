import { customAxios as axios } from './customAxios';

const updateLivePage = async (props) => {
  const {
    title,
    subtitle,
    speaker,
    sermonSeries,
    sermonSeriesImage,
    serviceType,
    date,
    passage,
  } = props;
  const sanityCheckFailed = title === '' || subtitle === '';
  let liveSermon = {};

  const initLiveSermonValues = (data) => {
    // set the init for sc only
    // Update only if its exist, if not use old one
    liveSermon = {
      id: data.id,
      title: title || data.title,
      sermonDescription: subtitle || data.sermonDescription,
      streamLink: data.streamLink,
      sermonNotes: data.sermonNotes,
      speaker: speaker || data.speaker,
      sermonSeries: sermonSeries || data.sermonSeries,
      sermonSeriesUrl: sermonSeriesImage || data.sermonSeriesUrl,
      sermonPassage: passage || data.sermonPassage,
      sermonDateTime: date + 'T10:00' || data.sermonDateTime,
      streamStartTime: date + 'T09:40' || data.streamStartTime,
      streamEndTime: date + 'T12:40' || data.streamEndTime,
    };
  };
  // get previous values
  const getData = async () => {
    try {
      // Hardcoded to always get the latest sermon if it exists, if not returns empty array for actual database
      const { data } = await axios.get('/api/live-sermon/get-live-sermon', {
        params: {
          sermonId: '635487c446187f591b0fb15a',
        },
      });
      console.log('tes2', data);
      if (data && data[0]) {
        // we only get the latest one to update
        initLiveSermonValues(data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // update values if provided
  // For now, set the stream time fixed for sn Ciek-1028

  const updateHandler = async () => {
    try {
      const res = await axios.put('/api/live-sermon/update-live-sermon', {
        ...liveSermon,
      });
      if (res.status === 200) return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  let loadInitialData = false;
  loadInitialData = await getData();
  console.log('test', liveSermon);
  if (sanityCheckFailed) {
    console.log('Fields invalid');
    return;
  }

  let success = false;
  if (
    serviceType === 'Sunday Celebration' &&
    liveSermon.id &&
    liveSermon.id !== ''
  ) {
    success = await updateHandler();
  }

  if (success) {
    await getData();
  }
};

export default updateLivePage;
