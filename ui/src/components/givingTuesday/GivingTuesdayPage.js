import { useState, useEffect } from 'react';
import { Stack, Box, Container, Image, Center, Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import CountdownTimer from './CountdownTimer';
import GivingUpdates from './GivingUpdates';
import HowToGive from './HowToGive';
import LastYearGivingTuesday from './LastYearGivingTuesday';
import WaysToGive from './WaysToGive';
import WhatIsGivingTuesday from './WhatIsGivingTuesday';
import { customAxios as axios } from '../helpers/customAxios';
import GivingTuesdayPadlet from './GivingTuesdayPadlet';
// import GlobalChurchCategories from './GlobalChurchCategories';

const defaultGivingData = {
  categories: [
    {
      name: 'Local',
      key: 'local',
      amount: -1,
      givers: -1,
    },
    {
      name: 'Global',
      key: 'global',
      amount: -1,
      givers: -1,
    },
    {
      name: 'Tai Po',
      key: 'taipo',
      amount: -1,
      givers: -1,
    },
    {
      name: 'Total Giving',
      key: 'totalGiving',
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
  // const endDate = DateTime.fromISO('2025-12-03T00:00');
  const endDate = DateTime.fromISO('2025-10-30T00:00');

  const calculateTimeLeft = () => {
    return endDate.diffNow(['hours', 'seconds']);
  };

  const isDisplayHTG = eventStatus === 'before' || eventStatus === 'during';

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
    try {
      const { data, status } = await axios.get('/api/fundraise/get', {
        params: {
          campaignName: 'Giving Tuesday 2025',
        },
      });

      // Construct transformed data
      let transformToGivingData = {
        categories: [],
        updatedAt: data[3].updatedAt,
      };

      data.forEach((el) => {
        console.log(el);
        let transformedEl = {
          name: el.categoryName,
          key: el.categoryKey,
          amount: el.amount,
          givers: el.givers,
        };
        transformToGivingData.categories.push(transformedEl);
      });

      // Set data
      if (status === 200) setGivingData(transformToGivingData);
    } catch (err) {
      console.log('error:', err);
    }
  };
  // Call API once to populate data in page
  useEffect(() => {
    getData();
  }, []);

  return (
    <Box bgColor="#F6FAFF">
      <Box position="relative">
        <Image
          w={['100%']}
          alignItems="center"
          src={process.env.PUBLIC_URL + '/images/givingTuesday/GT2025.png'}
          alt="Giving Tuesday"
        />
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          h="200px"
          background="linear-gradient(to bottom, transparent 0%, rgba(221, 233, 255, 0.3) 40%, rgba(221, 233, 255, 0.7) 70%, #DDE9FF 100%)"
        />
      </Box>
      <Container maxW={['100%', '80%']}>
        <Stack spacing={5} p={[3, 5]} pb="5">
          {eventStatus === 'during' && (
            <CountdownTimer
              accentColor={accentColor}
              remainingTime={remainingTimeString}
            />
          )}
          <Center></Center>
          <WhatIsGivingTuesday accentColor={accentColor} />
          {eventStatus === 'before' && <LastYearGivingTuesday />}
          <GivingUpdates
            accentColor={accentColor}
            eventStatus={eventStatus}
            givingData={givingData}
          />
          {/* <GlobalChurchCategories /> */}
          {isDisplayHTG && (
            <>
              <HowToGive />
              <WaysToGive accentColor={accentColor} />
            </>
          )}
          {eventStatus === 'during' && <LastYearGivingTuesday />}
          <GivingTuesdayPadlet />
          {eventStatus === 'after' && (
            <Text
              color={accentColor}
              fontWeight="900"
              fontSize={['26', '40']}
              fontFamily="DMserifText"
              textAlign="left"
              py="2"
            >
              Thank you for participating in Giving Tuesday 2025!
            </Text>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default GivingTuesdayPage;
