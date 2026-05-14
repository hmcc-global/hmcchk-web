import {
  Flex,
  Box,
  Heading,
  Text,
  VStack,
  Grid,
  GridItem,
  useBreakpointValue,
  HStack,
  IconButton,
  Button,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import PrayCard from './cards/PrayCard';
import GiveCard from './cards/GiveCard';
import GoCard from './cards/GoCard';

const WaysToParticipate = (props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const cards = [
    <PrayCard key="pray" />,
    <GiveCard key="give" />,
    <GoCard key="go" />,
  ];

  useEffect(() => {
    if (!isMobile || isPaused) return;

    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % cards.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile, isPaused, cards.length]);

  

  return (
    <Flex
      w="100%"
      direction="column"
      gap={{ base: '2rem', md: '3rem' }}
      py={{ base: '2rem', md: '4rem' }}
      px={{ base: '1rem', md: '2rem' }}
      bg="#F6FAFF"
    >
      {/* Section Header */}
      <VStack spacing={{ base: '1rem', md: '1.5rem' }} align="center" w="100%">
        <Heading
          as="h3"
          fontSize={{ base: '2rem', md: '2.813rem' }}
          fontWeight={400}
          textAlign="center"
          color="#0025a3"
          fontFamily="DMSerifDisplay_Italic"
        >
          Ways to Participate
        </Heading>
        <Text
          fontSize={{ base: "0.813rem" , md: "1rem" }}
          fontWeight={500}
          fontFamily={"Manrope"}
          textAlign="center"
          color="#333"
          maxW="600px"
          lineHeight="1.6"
        >
          This is not a commitment for a few, but a call for the entire church.
          Here's how you can be a part of it.
        </Text>
      </VStack>

      {isMobile ? (
        <Flex
          position="relative"
          w="100vw" 
          ml="calc(-50vw + 50%)" 
          h="650px"
          direction="column"
        >
          <Box flex={1}>
            {cards[currentCardIndex]}
          </Box>

          <Flex
            position="absolute"
            bottom="1rem"
            left="50%"
            transform="translateX(-50%)"
            align="center"
            pointerEvents="auto"
            zIndex={1}
          >
            <HStack spacing="0.75rem">
              {cards.map((_, index) => (
                <Button
                  key={index}
                  w={index === currentCardIndex ? "28px" : "10px"}
                  h="10px"
                  minW={index === currentCardIndex ? "28px" : "10px"}
                  borderRadius="full"
                  bg={index === currentCardIndex ? "#9CB5FF" : "#5B6177"}
                  transition="all 0.3s ease"
                  flexShrink={0}
                  onClick={() => setCurrentCardIndex(index)}
                  _hover={{ opacity: 0.8 }}
                  aria-label={`Go to slide ${index + 1}`}
                  p={0}
                />
              ))}
            </HStack>
          </Flex>

          <Flex
            position="absolute"
            bottom="1rem"
            right="1rem"
            pointerEvents="auto"
            zIndex={2}
          >
            <IconButton
              icon={isPaused ? <FaPlay /> : <FaPause />}
              onClick={() => setIsPaused(!isPaused)}
              variant="ghost"
              bgColor="#5B6177"
              color="#9CB5FF"
              aria-label={isPaused ? 'Play carousel' : 'Pause carousel'}
              size="sm"
              borderRadius="full"
            />
          </Flex>
          </Flex>
      ) : (
        <Grid
          templateColumns='repeat(3, 1fr)'
          gap={{ base: '1.5rem', md: '2rem' }}
          w="100%"
          maxW="1200px"
          mx="auto"
        >
          <GridItem>
            <PrayCard />
          </GridItem>
          <GridItem>
            <GiveCard />
          </GridItem>
          <GridItem>
            <GoCard />
          </GridItem>
        </Grid>
      )}
    </Flex>
  );
};

export default WaysToParticipate;
