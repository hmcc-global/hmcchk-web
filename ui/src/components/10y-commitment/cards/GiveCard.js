import {
  VStack,
  Text,
  Button,
  Image,
  Link,
} from '@chakra-ui/react';
import React from 'react';
import BaseCard from './BaseCard';
import { ArrowForwardIcon } from '@chakra-ui/icons';


const GiveCard = () => {
  return (
    <BaseCard
      title="Give: Sow into the Vision"
      subtitle="Give to the Vision Fund"
    >
      <VStack spacing="1rem" align="stretch" flex={1}>
        <Text
          fontSize={{ base: "0.813rem" , md: "1rem" }}
          color="#FFFFFF"
          fontFamily="Manrope"
          fontWeight={500}
          textAlign="center"
        >
          Your financial seeds will directly fuel church plants across the globe. Every dollar brings us closer to seeing a church in the 10 cities.
        </Text>

        <Image
          w="100%"
          src={`${process.env.PUBLIC_URL}/images/10y-commitment/giveParticipate.jpg`}
          marginX="auto"
          display="flex"
          borderRadius={10}
          alt="Hands giving and receiving"
        />


        <Button
          as={Link}
          href="/give"
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
          <Text>Give Now</Text>
        </Button>
      </VStack>
    </BaseCard>
  );
};

export default GiveCard;
