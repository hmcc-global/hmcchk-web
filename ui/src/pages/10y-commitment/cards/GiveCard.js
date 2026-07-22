import { VStack, Text, Image } from 'components';
import React from 'react';
import BaseCard from './BaseCard';
import ParticipateButton from './ParticipateButton';
import { TYC_BODY_TEXT } from '../constants';

const GiveCard = ({ footer }) => {
  return (
    <BaseCard
      title="Give: Sow into the Vision"
      subtitle="Give to the Vision Fund"
      footer={footer}
    >
      <VStack
        spacing="1rem"
        align="center"
        flex={1}
        h="100%"
      >
        <Text {...TYC_BODY_TEXT} color="#FFFFFF" textAlign="center">
          Your financial seeds will directly fuel church plants across the
          globe. Every dollar brings us closer to seeing a church in the 10
          cities.
        </Text>

        <Image
          w="100%"
          src={`${process.env.PUBLIC_URL}/images/10y-commitment/giveParticipate.jpg`}
          marginX="auto"
          display="flex"
          borderRadius={10}
          alt="Hands giving and receiving"
        />

        <ParticipateButton to="/give" mt="auto">
          Give Now
        </ParticipateButton>
      </VStack>
    </BaseCard>
  );
};

export default GiveCard;
