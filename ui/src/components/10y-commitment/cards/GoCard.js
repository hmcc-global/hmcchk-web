import {
  VStack,
  Text,
  Button,
  Image,
  HStack,
} from '@chakra-ui/react';
import React from 'react';
import BaseCard from './BaseCard';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const GoCard = () => {
  return (
    <BaseCard
      title="Go: Be the Vision"
      subtitle="Prepare to Be Sent"
    >
      {/* Custom content for Go card */}
      <VStack spacing="1rem" align="stretch" flex={1} color="white">
        <Text
          fontSize={{ base: "0.813rem" , md: "1rem" }}
          color="#FFFFFF"
          fontFamily="Manrope"
          fontWeight={500}
          align="center"
        >
          Is God stirring your heart to be a part of the vision? Begin praying now about the cities and growing as a disciple of Christ!
        </Text>

        <Image
          w="100%"
          src={`${process.env.PUBLIC_URL}/images/10y-commitment/goParticipate.png`}
          marginX="auto"
          display="flex"
          borderRadius={10}
          alt="People participating in mission work"
        />

        <Text
          fontSize={{ base: 'xs', md: 'sm' }}
          color="white"
          textAlign="center"
          mt="0.5rem"
          fontFamily="Manrope"
          fontWeight={500}
        >
          See events and classes for more locations
        </Text>

        <HStack spacing="0.75rem" w="100%" mt="auto">
          <Button
            as="a"
            href="https://atx.hmccglobal.org/"
            target="_blank"
            rel="noopener noreferrer"
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
            <Text>Austin</Text>
          </Button>
          <Button
            as="a"
            href="https://hk.hmccglobal.org/"
            target="_blank"
            rel="noopener noreferrer"
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
            <Text>Hong Kong</Text>
          </Button>
        </HStack>

        <Image
          w="100%"
          src={`${process.env.PUBLIC_URL}/images/10y-commitment/10cities.png`}
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
