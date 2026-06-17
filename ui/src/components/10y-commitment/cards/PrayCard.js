import {
  VStack,
  Text,
  Image,
} from '@chakra-ui/react';
import React from 'react';
import BaseCard from './BaseCard';
import ParticipateButton from './ParticipateButton';

const PrayCard = ({ footer }) => {
  const prayerCalendarLink = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
    '10-Year Vision Prayer Gathering'
  )}&details=${encodeURIComponent(
    'Join us on the 10th of each month to pray for the 10-year commitment and church planting vision.'
  )}&location=${encodeURIComponent(
    'HMCC of Hong Kong'
  )}&recur=${encodeURIComponent('RRULE:FREQ=MONTHLY;BYMONTHDAY=10')}`;

  return (
    <BaseCard
      title="Pray: Fuel the Vision"
      subtitle="Become a Prayer Partner"
      footer={footer}
    >
      <VStack spacing="1rem" align="stretch" flex={1}>
        <Text
          fontSize={{ base: '0.813rem', md: '1.25rem' }}
          color="#FFFFFF"
          fontFamily="Manrope"
          fontWeight={500}
          letterSpacing="0.0125rem"
          textAlign="center"
        >
          Commit to praying regularly for the 10-year vision: for the churches, the disciples, the funds, and the people being sent out.
        </Text>

        <Image
            w="100%"
            src={`${process.env.PUBLIC_URL}/images/10y-commitment/prayParticipate.jpg`}
            marginX="auto"
            display="flex"
            borderRadius={10}
            alt="People praying together"
        />

        <Text
          fontSize={{ base: '0.813rem', md: '1.25rem' }}
          color="#FFFFFF"
          fontFamily="Manrope"
          fontWeight={500}
          letterSpacing="0.0125rem"
          textAlign="center"
        >
          Join us on the 10th of each month, we gather as a church family to pray for our commitment and the 10 cities God placed on our hearts.
        </Text>

        <ParticipateButton href={prayerCalendarLink}>
          Add to Calendar
        </ParticipateButton>
      </VStack>
    </BaseCard>
  );
};

export default PrayCard;
