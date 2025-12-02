import { useState, useEffect } from 'react';
import { Stack, Box, Container, Image, Center, Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import CountdownTimer from './CountdownTimer';
import GivingUpdates from './GivingUpdates';
import HowToGive from './HowToGive';
// import LastYearGivingTuesday from './LastYearGivingTuesday';
import WaysToGive from './WaysToGive';
import WhatIsGivingTuesday from './WhatIsGivingTuesday';
import { customAxios as axios } from '../helpers/customAxios';
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
      name: 'Saturate',
      key: 'saturate',
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
  const endDate = DateTime.fromISO('2024-12-04T00:00');

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
          campaignName: 'Giving Tuesday 2024',
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
    <Box background="#DDE9FF">
      <Container maxW="container.lg">
        <Stack spacing={5} p={[3, 5]} pb="5">
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
              src={process.env.PUBLIC_URL + '/images/givingTuesday/GT2024.png'}
              alt="Giving Tuesday"
            />
          </Center>
          <WhatIsGivingTuesday accentColor={accentColor} />
          {/* {eventStatus === 'before' && <LastYearGivingTuesday />} */}
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
          {/* {eventStatus === 'during' && <LastYearGivingTuesday />} */}
          {eventStatus === 'after' && (
            <Text
              color={accentColor}
              fontWeight="900"
              fontSize={['1.4rem', '1.875rem']}
              textAlign="center"
              py="2"
            >
              Thank you for participating in Giving Tuesday 2024!
            </Text>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default GivingTuesdayPage;
