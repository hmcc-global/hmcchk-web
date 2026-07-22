import { VStack, Text, Image } from 'components';
import React from 'react';
import { DateTime } from 'luxon';
import BaseCard from './BaseCard';
import ParticipateButton from './ParticipateButton';

// The gathering always falls on the 10th, so the link should open on whichever
// 10th is coming up next rather than "today" — once the 10th has passed this
// month, that's next month's.
const getNextTenth = () => {
  const now = DateTime.now().setZone('Asia/Hong_Kong');
  let nextTenth = now.set({
    day: 10,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
  if (now.day > 10) {
    nextTenth = nextTenth.plus({ months: 1 });
  }
  return nextTenth;
};

const buildPrayerCalendarLink = () => {
  const nextTenth = getNextTenth();
  const dates = `${nextTenth.toFormat('yyyyMMdd')}/${nextTenth
    .plus({ days: 1 })
    .toFormat('yyyyMMdd')}`;

  return `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
    '10-Year Vision Prayer Gathering'
  )}&dates=${encodeURIComponent(dates)}&details=${encodeURIComponent(
    'Join us on the 10th of each month to pray for the 10-year commitment and church planting vision.'
  )}&location=${encodeURIComponent(
    'HMCC of Hong Kong'
  )}&recur=${encodeURIComponent(
    'RRULE:FREQ=MONTHLY;BYMONTHDAY=10'
  )}&ctz=${encodeURIComponent('Asia/Hong_Kong')}`;
};

const PrayCard = ({ footer }) => {
  const prayerCalendarLink = buildPrayerCalendarLink();

  return (
    <BaseCard
      title="Pray: Fuel the Vision"
      subtitle="Become a Prayer Partner"
      footer={footer}
    >
      <VStack spacing="1rem" align="stretch" flex={1} h="100%">
        <Text
          fontSize={{ base: '0.813rem', md: '1.25rem' }}
          color="#FFFFFF"
          fontFamily="Manrope"
          fontWeight={500}
          letterSpacing="0.0125rem"
          textAlign="center"
        >
          Commit to praying regularly for the 10-year vision: for the churches,
          the disciples, the funds, and the people being sent out.
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
          Join us on the 10th of each month, we gather as a church family to
          pray for our commitment and the 10 cities God placed on our hearts.
        </Text>

        <ParticipateButton href={prayerCalendarLink} mt="auto">
          Add to Calendar
        </ParticipateButton>
      </VStack>
    </BaseCard>
  );
};

export default PrayCard;
