import { useEffect, useState } from 'react';
import { customAxios as axios } from '../helpers/customAxios';
import { Box, Container, Heading, Text } from '@chakra-ui/react';
import UpcomingSermon from './UpcomingSermon';
import SermonSeriesCardList from './SermonSeriesCardList';
import CurrentSermon from './CurrentSermon';
import { DateTime } from 'luxon';
import { getRenderDate } from '../helpers/eventsHelpers';

const SermonContainer = (props) => {
  const [sermons, setSermons] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentSermon, setCurrentSermon] = useState();
  const [onlineSermon, setOnlineSermon] = useState(false);

  useEffect(() => {
    getData();
    getEvent();
  }, []);

  const checkIfLive = async () => {
    try {
      const { data } = await axios.get('/api/live-sermon/get-live-sermon');
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const { data, status } = await axios.get('/api/sermons/get-sermons');
      const onlineSermon = await checkIfLive();

      if (status === 200) {
        setSermons([...data]);
        // we can always assume the first sermon is the latest one since wpfc_sermon API sorts by datePreached
        let current = data[0];
        if (onlineSermon && onlineSermon[0]) {
          setOnlineSermon(true);
          current = onlineSermon[0];
        }

        setCurrentSermon(current);
      } else {
        throw Error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getEvent = async () => {
    try {
      const { data, status } = await axios.get(
        '/api/announcements/get-announcements'
      );
      if (status === 200) {
        const filtered = data.filter((item) => {
          if (item.endDate) {
            // Add one day to offset end date to end of day
            let endDate = new DateTime.fromISO(item.endDate).plus({ days: 1 });
            const renderDate = getRenderDate(
              item.startDate,
              item.endDate,
              item.recurrence
            );
            item.renderDate = renderDate;
            return endDate > DateTime.now();
          } else return false;
        });
        filtered.sort((a, b) => (a.renderDate > b.renderDate ? 1 : -1));
        setEvents([...filtered]);
      } else {
        throw Error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!onlineSermon && <UpcomingSermon upcoming={events} />}
      <Container maxW="container.xl" mt={{ base: '0.75rem', lg: '1.75rem' }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems={{ base: 'center', md: 'flex-start' }}
          justifyContent="center"
          gap="0.5rem"
          mb={{ base: '1rem', md: '2.5rem' }}
        >
          <Heading
            fontSize={{ base: '2.25rem', md: '3.75rem' }}
            color="#272727"
            fontWeight="400"
            fontFamily="DMSerifDisplay_Italic"
          >
            Sermons
          </Heading>
          <Text
            fontSize={{ base: '0.75rem', md: '1.125rem' }}
            fontWeight={{ base: 600, md: 700 }}
          >
            Check out the latest sermons at HMCC of Hong Kong!
          </Text>
        </Box>
        <CurrentSermon currentSermon={currentSermon} isOnline={onlineSermon} />
        <SermonSeriesCardList allSermons={sermons} />
      </Container>
    </>
  );
};

export default SermonContainer;
