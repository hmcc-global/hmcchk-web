import {
  VStack,
  Text,
  Button,
  Image,
} from '@chakra-ui/react';
import React from 'react';
import BaseCard from './BaseCard';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const PrayCard = () => {
  return (
    <BaseCard
      title="Pray: Fuel the Vision"
      subtitle="Become a Prayer Partner"
    >
      <VStack spacing="1rem" align="stretch" flex={1}>
        <Text
          fontSize={{ base: "0.813rem" , md: "1rem" }}
          color="#FFFFFF"
          fontFamily="Manrope"
          fontWeight={500}
          align="center"
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
          fontSize={{ base: "0.813rem" , md: "1rem" }}
          color="#FFFFFF"
          fontFamily="Manrope"
          fontWeight={500}
          align="center"
        >
          Join us on the 10th of each month, we gather as a church family to pray for our commitment and the 10 cities God placed on our hearts.
        </Text>

        <Button
            w="100%"
            bg="linear-gradient(90deg, white, #9CB5FF)"
            color="#0025a3"
            _hover={{ opacity: 0.9 }}
            fontSize={{ base: 'sm', md: 'base' }}
            py={{ base: '0.5rem', md: '0.75rem' }}
            fontWeight={700}
            borderRadius="80px"
            rightIcon={<ArrowForwardIcon />}
            justifyContent="space-between"
            px={{ base: '1rem', md: '1.5rem' }}
            fontFamily="Manrope"
            >
            <Text>Add to Calendar</Text>
        </Button>
      </VStack>
    </BaseCard>
  );
};

export default PrayCard;
