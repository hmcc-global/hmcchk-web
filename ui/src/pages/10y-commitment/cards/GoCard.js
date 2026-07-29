import { VStack, Text, Image, HStack } from 'components';
import React from 'react';
import BaseCard from './BaseCard';
import ParticipateButton from './ParticipateButton';
import { GO_LINKS } from '../constants';

const GoCard = ({ footer }) => {
  return (
    <BaseCard
      title="Go: Be the Vision"
      subtitle="Prepare to Be Sent"
      footer={footer}
    >
      {/* Custom content for Go card */}
      <VStack spacing="1rem" align="stretch" flex={1} minW={0} color="white">
        <Text
          fontSize={{ base: '0.813rem', md: '1.25rem' }}
          color="#FFFFFF"
          fontFamily="Manrope"
          fontWeight={500}
          letterSpacing="0.0125rem"
          textAlign="center"
        >
          Is God stirring your heart to be a part of the vision? Begin praying
          now about the cities and growing as a disciple of Christ!
        </Text>

        <Image
          w="100%"
          src={`${process.env.PUBLIC_URL}/images/10y-commitment/goParticipate.jpg`}
          marginX="auto"
          display="flex"
          borderRadius={10}
          alt="People participating in mission work"
        />

        <Text
          fontSize={{ base: '0.813rem', md: '1.25rem' }}
          color="white"
          textAlign="center"
          mt="0.5rem"
          fontFamily="Manrope"
          fontWeight={500}
          letterSpacing="0.0125rem"
        >
          See events and classes for more locations
        </Text>

        <HStack spacing="0.75rem" w="100%" minW={0} mt="auto">
          <ParticipateButton href={GO_LINKS.austin} flex={1}>
            Austin
          </ParticipateButton>
          <ParticipateButton href={GO_LINKS.hongKong} flex={1}>
            Hong Kong
          </ParticipateButton>
        </HStack>

        <Image
          w="100%"
          src={`${process.env.PUBLIC_URL}/images/10y-commitment/10cities.jpg`}
          marginX="auto"
          display="flex"
          borderRadius={10}
          alt="Map showing 10 cities for church planting"
        />
      </VStack>
    </BaseCard>
  );
};

export default GoCard;
