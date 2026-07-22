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
} from 'components';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const SWIPE_THRESHOLD_PX = 50;

// Slide direction is a ref (not state) since it only needs to be read at the
// moment the next AnimatePresence render picks it up via `custom` — bumping
// it doesn't need to trigger its own re-render.
// Full-width push; exit fades so the outgoing card softens while sliding out.
const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 1 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? '-100%' : '100%', opacity: 0 }),
};

const WaysToParticipate = () => {
  const isMobile = useBreakpointValue(
    { base: true, md: false },
    { fallback: 'md' }
  );
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideHeight, setSlideHeight] = useState(undefined);
  const carouselRef = useRef(null);
  const touchStart = useRef(null);
  const direction = useRef(1);

  // Absolute slides need an explicit height or the container collapses.
  // Keep the tallest so shorter cards don't shrink the carousel.
  const measureSlide = (node) => {
    if (!node) return;
    const next = Math.max(node.offsetHeight, node.scrollHeight);
    setSlideHeight((prev) => (prev == null ? next : Math.max(prev, next)));
  };

  const goToCard = (index) => {
    direction.current = index >= currentCardIndex ? 1 : -1;
    setCurrentCardIndex(index);
  };
  useEffect(() => {
    if (!isMobile) return undefined;

    const el = carouselRef.current;
    if (!el) return undefined;

    const onTouchStart = (e) => {
      touchStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const onTouchMove = (e) => {
      if (!touchStart.current) return;

      const dx = e.touches[0].clientX - touchStart.current.x;
      const dy = e.touches[0].clientY - touchStart.current.y;

      if (Math.abs(dx) > Math.abs(dy)) {
        e.preventDefault();
      }
    };

    const onTouchEnd = (e) => {
      if (!touchStart.current) return;

      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      touchStart.current = null;

      if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) < Math.abs(dy)) {
        return;
      }

      direction.current = dx < 0 ? 1 : -1;
      setCurrentCardIndex((prev) =>
        dx < 0
          ? (prev + 1) % CARDS.length
          : (prev - 1 + CARDS.length) % CARDS.length
      );
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile || isPaused) return undefined;

    const interval = setInterval(() => {
      direction.current = 1;
      setCurrentCardIndex((prev) => (prev + 1) % CARDS.length);
    }, 12500);

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
            onClick={() => goToCard(index)}
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
      overflowX="hidden"
    >
      {/* Section Header */}
      <VStack spacing={{ base: '1rem', md: '1.5rem' }} align="center" w="100%">
        <Heading
          as="h2"
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
          ref={carouselRef}
          position="relative"
          overflow="hidden"
          h={slideHeight}
          aria-live="polite"
          role="group"
          aria-roledescription="carousel"
          aria-label="Ways to participate"
          sx={{ touchAction: 'pan-y' }}
        >
          <AnimatePresence custom={direction.current} initial={false}>
            <motion.div
              key={currentCardIndex}
              ref={measureSlide}
              custom={direction.current}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
              }}
            >
              <ActiveCard footer={carouselControls} />
            </motion.div>
          </AnimatePresence>
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
            <GridItem key={key} minW={0} display="flex">
              <Component />
            </GridItem>
          ))}
        </Grid>
      )}
    </Flex>
  );
};

export default WaysToParticipate;
