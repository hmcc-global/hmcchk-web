import { Box } from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import { customAxios as axios } from '../helpers/customAxios';
import SermonCard from './SermonCard';

const SermonSeries = ({ sermonSeriesName }) => {
  const [liveSermon, setLiveSermon] = useState(null);
  const [allSermons, setAllSermons] = useState([]);
  const [sermonSeries, setSermonSeries] = useState([]);

  const getData = useCallback(async () => {
    try {
      const { data, status } = await axios.get('/api/sermons/get-sermons');
      if (status === 200) {
        setAllSermons(data);
      } else {
        throw new Error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getCurrentSermon = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/live-sermon/get-live-sermon');
      setLiveSermon(data); // Set the current liveSermon directly
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getSermonSeries = useCallback(() => {
    if (liveSermon) {
      const filteredSeries = allSermons.filter((series) => {
        return (
          series.sermonSeries &&
          liveSermon[0].sermonSeries &&
          series.sermonSeries[0].name === liveSermon[0].sermonSeries &&
          series.id !== liveSermon[0].id
        );
      });

      filteredSeries.reverse();

      setSermonSeries(filteredSeries);
    } else {
      const filteredSeries = allSermons.filter((sermon) => {
        return (
          sermon.sermonSeries &&
          sermon.sermonSeries[0].name === sermonSeriesName
        );
      });

      filteredSeries.reverse();

      setSermonSeries(filteredSeries);
    }
  }, [allSermons, liveSermon, sermonSeriesName]);

  useEffect(() => {
    (async () => {
      await getData();
      await getCurrentSermon();
    })();
  }, [getData, getCurrentSermon]);

  // Call getSermonSeries when allSermons and liveSermon are updated
  useEffect(() => {
    getSermonSeries();
  }, [allSermons, liveSermon, getSermonSeries]);

  return (
    <Box
      display="flex"
      flexDir={'column'}
      gap={'1rem'}
      overflowY={'auto'}
      maxHeight={'50vh'}
    >
      {sermonSeries.length > 0 &&
        sermonSeries.map((sermon) => (
          <SermonCard key={sermon.id.toString()} sermonData={sermon} />
        ))}
    </Box>
  );
};

export default SermonSeries;
