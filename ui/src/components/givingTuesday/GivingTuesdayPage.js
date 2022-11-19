import { useState, useEffect } from 'react';
import { Stack, Box, Container, Image, Center } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import CountdownTimer from './CountdownTimer';
import GivingUpdates from './GivingUpdates';
import HowToGive from './HowToGive';
import LastYearGivingTuesday from './LastYearGivingTuesday';
import WaysToGive from './WaysToGive';
import WhatIsGivingTuesday from './WhatIsGivingTuesday';
import { customAxios as axios } from '../helpers/customAxios';

const defaultGivingData = {
  categories: [
    {
      name: 'Total Giving',
      key: 'totalGiving',
      amount: -1,
      givers: -1,
    },
    {
      name: 'Local Church',
      key: 'localChurch',
      amount: -1,
      givers: -1,
    },
    {
      name: 'Global Church',
      key: 'globalChurch',
      amount: -1,
      givers: -1,
    },
  ],
};

const GivingTuesdayPage = (props) => {
  const accentColor = '#00328D';
  const [remainingTimeString, setRemainingTimeString] = useState('24:00:00');
  const [eventStatus, setEventStatus] = useState('before');
  const [givingData, setGivingData] = useState(defaultGivingData);
  const endDate = DateTime.fromISO('2022-11-30T00:00');

  const calculateTimeLeft = () => {
    return endDate.diffNow(['hours', 'seconds']);
  };

  // Timer Functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      let dur = calculateTimeLeft();
      let remainingHours = dur.values['hours'];
      if (remainingHours <= 24 && remainingHours >= 0) {
        setEventStatus('during');
      } else if (remainingHours < 0) {
        setEventStatus('after');
      } else {
        setEventStatus('before');
      }
      setRemainingTimeString(dur.toFormat('hh:mm:ss'));
    }, 1000);
    return () => clearTimeout(timer);
  });

  const getData = async () => {
    const { data, status } = await axios.get(
      '/api/giving-tuesday/get-giving-tuesday-data?year=2022'
    );
    try {
      if (status === 200) setGivingData(data);
    } catch (err) {
      console.log('error:', err);
    }
  };
  // Call API once to populate data in page
  useEffect(() => {
    getData();
  }, []);

  return (
    <Box background="#DDE9FF">
      <Container maxW="container.lg">
        <Stack spacing={5} p={[3, 5]}>
          {eventStatus === 'during' && (
            <CountdownTimer
              accentColor={accentColor}
              remainingTime={remainingTimeString}
            />
          )}
          <Center>
            <Image
              borderRadius={20}
              borderWidth={1}
              borderColor="white"
              w={['100%', '80%']}
              alignItems="center"
              h="auto"
              src={
                process.env.PUBLIC_URL + '/images/giving/GT2022.png'
                //'/images/givingTuesday/giving-tuesday-final-ad.png'
              }
              alt="Giving Tuesday"
            />
          </Center>
          <WhatIsGivingTuesday accentColor={accentColor} />
          <GivingUpdates
            accentColor={accentColor}
            eventStatus={eventStatus}
            givingData={givingData}
          />
          {eventStatus === 'before' ||
            (eventStatus === 'during' && (
              <>
                <HowToGive />
                <WaysToGive accentColor={accentColor} />
              </>
            ))}
          {eventStatus === 'during' && <LastYearGivingTuesday />}
        </Stack>
      </Container>
    </Box>
  );
};

export default GivingTuesdayPage;
