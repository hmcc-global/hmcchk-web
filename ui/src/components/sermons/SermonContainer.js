import { useEffect, useState } from 'react';
import { customAxios as axios } from '../helpers/customAxios';
import { Box, Container, Heading } from '@chakra-ui/react';
import UpcomingSermon from './UpcomingSermon';
import SermonCardList from './SermonCardList';
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

  const getData = async () => {
    try {
      const { data, status } = await axios.get('/api/sermons/get-sermons');
      if (status === 200) {
        setSermons([...data]);
        let current = data.find(({ nextSermon }) => nextSermon == null);
        if (
          current.streamLink &&
          current.sermonNotes &&
          current.sermonSeries[0]
        )
          setOnlineSermon(true);
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
      <Container maxW="container.lg">
        <Box
          marginTop="20px"
          borderWidth="1px"
          borderRadius="20"
          bgImage={`url('${process.env.PUBLIC_URL}/images/sermons/sermons-banner.png')`}
          bgPosition="center"
          bgSize="cover"
          flex={1}
          textAlign="center"
          justifyContent="center"
          px={[8, 10]}
          py={[8, 12]}
          m={2}
          display={{ base: 'none', md: 'flex' }}
        >
          <Heading size="2xl" color="white" fontWeight="900">
            Sermons
          </Heading>
        </Box>
        <Heading
          size="2xl"
          color="black"
          justifyContent="center"
          fontWeight="900"
          display={{ base: 'flex', md: 'none' }}
        >
          Sermons
        </Heading>
        <CurrentSermon currentSermon={currentSermon} isOnline={onlineSermon} />
        <SermonCardList allSermons={sermons} />
      </Container>
    </>
  );
};

export default SermonContainer;
