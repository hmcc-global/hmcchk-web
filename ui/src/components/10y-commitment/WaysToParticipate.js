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
import { COLORS } from './constants';

// Single source of truth for the cards — used by both the mobile carousel
// and the desktop grid so the two never drift out of sync.
const CARDS = [
  { key: 'pray', Component: PrayCard },
  { key: 'give', Component: GiveCard },
  { key: 'go', Component: GoCard },
];

const WaysToParticipate = () => {
  const isMobile = useBreakpointValue(
    { base: true, md: false },
    { fallback: 'md' }
  );
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isMobile || isPaused) return undefined;

    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % CARDS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile, isPaused]);

  const ActiveCard = CARDS[currentCardIndex].Component;
  const carouselControls = (
    <Flex w="100%" align="center">
      <Box flex={1} />
      <HStack spacing="0.75rem">
        {CARDS.map((card, index) => (
          <Button
            key={card.key}
            h="1rem"
            w={index === currentCardIndex ? '2.5rem' : '1rem'}
            minW={index === currentCardIndex ? '2.5rem' : '1rem'}
            borderRadius="full"
            bg={
              index === currentCardIndex
                ? COLORS.accentBlue
                : COLORS.dotInactive
            }
            transition="all 0.3s ease"
            flexShrink={0}
            onClick={() => setCurrentCardIndex(index)}
            _hover={{ opacity: 0.8 }}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentCardIndex}
            p={0}
          />
        ))}
      </HStack>
      <Flex flex={1} justify="flex-end">
        <IconButton
          icon={isPaused ? <FaPlay /> : <FaPause />}
          onClick={() => setIsPaused(!isPaused)}
          variant="ghost"
          bgColor={COLORS.dotInactive}
          color={COLORS.accentBlue}
          aria-label={isPaused ? 'Play carousel' : 'Pause carousel'}
          size="sm"
          borderRadius="full"
        />
      </Flex>
    </Flex>
  );

  return (
    <Flex
      w="100%"
      direction="column"
      gap={{ base: '2rem', md: '3rem' }}
      py={{ base: '2rem', md: '4rem' }}
      px={{ base: '1rem', md: '2rem' }}
      bg={COLORS.sectionBg}
      overflowX="clip"
    >
      {/* Section Header */}
      <VStack spacing={{ base: '1rem', md: '1.5rem' }} align="center" w="100%">
        <Heading
          as="h3"
          fontSize={{ base: '2rem', md: '2.813rem' }}
          fontWeight={400}
          textAlign="center"
          color={COLORS.brandBlue}
          fontFamily="DMSerifDisplay_Italic"
        >
          Ways to Participate
        </Heading>
        <Text
          fontSize={{ base: '0.813rem', md: '1.25rem' }}
          fontWeight={500}
          fontFamily={'Manrope'}
          letterSpacing="0.0125rem"
          textAlign="center"
          color={COLORS.bodyText}
          lineHeight="1.6"
        >
          This is not a commitment for a few, but a call for the entire church.
          Here's how you can be a part of it.
        </Text>
      </VStack>

      {isMobile ? (
        <Box
          w="100vw"
          ml="calc(-50vw + 50%)"
          aria-live="polite"
          role="group"
          aria-roledescription="carousel"
          aria-label="Ways to participate"
        >
          <ActiveCard footer={carouselControls} />
        </Box>
      ) : (
        <Grid
          templateColumns="repeat(3, minmax(0, 1fr))"
          gap={{ base: '1rem' }}
          w="100%"
          maxW="1200px"
          mx="auto"
        >
          {CARDS.map(({ key, Component }) => (
            <GridItem key={key} minW={0}>
              <Component />
            </GridItem>
          ))}
        </Grid>
      )}
    </Flex>
  );
};

export default WaysToParticipate;
