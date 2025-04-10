import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  HStack,
  Icon,
  Text,
  Image,
  Container,
  Flex,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCircle } from 'react-icons/fa';

const EasterStorySection = () => {
  const [visibleParagraphs, setVisibleParagraphs] = useState([0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const vidRef = useRef(null);
  const videoSrc = `${process.env.PUBLIC_URL}/images/easter-2025/story.mp4`;

  const storyData = [
    {
      text: 'We all feel lost, broken, or stuck at times, chasing things that leave us empty. This universal struggle points to our need for redemption - a way to be made whole again.',
      media: 'easter_story_1.png',
      color: '#40163F',
    },
    {
      text: 'Jesus came to redeem us. By His life, death, and resurrection, He took on our brokenness, paid the price for our mistakes, and offered us forgiveness and freedom. Through Him, we are restored to God.',
      media: 'easter_story_2.png',
      color: '#68161A',
    },
    {
      text: 'Jesus rose from the grave 3 days later, conquering sin and death. His resurrection proves His power to redeem us completely--freeing us from shame, fear, and the weight of our past. We are given a new identity: beloved and redeemed.',
      media: 'easter_story_3.png',
      color: '#20444A',
    },
    {
      text: 'Because of Jesus, we are no longer defined by our failures or fears. This Easter, we celebrate redemption: a fresh start, a life of hope, and the promise of being fully known, fully loved, and fully restored.',
      media: 'easter_story_4.png',
      color: '#1587A1',
    },
  ];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        setPrevIndex(prev);
        const nextIndex = (prev + 1) % storyData.length;

        // if (nextIndex === 0) {
        //   setIsResetting(true);
        //   setTimeout(() => {
        //     setVisibleParagraphs([0]);
        //     setIsResetting(false);
        //   }, 1000);
        //   return 0;
        // }

        setVisibleParagraphs((prev) =>
          prev.includes(nextIndex) ? prev : [...prev, nextIndex]
        );
        return nextIndex;
      });
    }, 4350);

    return () => clearInterval(interval);
  }, [isPaused, storyData.length]);

  useEffect(() => {
    const videoElement = vidRef.current;
    if (videoElement) {
      const handleLoadedMetadata = () => {
        videoElement.play();
      };

      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        videoElement.removeEventListener(
          'loadedmetadata',
          handleLoadedMetadata
        );
      };
    }
  }, [vidRef]);

  const handleHover = (shouldPause) => setIsPaused(shouldPause);

  return (
    <Container maxW="container.xl" py={{ base: '2rem', lg: '5rem' }}>
      <Box
        display="flex"
        flexDir={{ base: 'column-reverse', lg: 'row' }}
        alignItems={{ base: 'center', lg: 'flex-start' }}
        // onMouseEnter={() => handleHover(true)}
        // onMouseLeave={() => handleHover(false)}
        // onTouchStart={() => handleHover(true)}
        // onTouchEnd={() => handleHover(false)}
      >
        {/* Left Panel - Keep AnimatePresence for accumulating paragraphs */}
        <Box w={{ base: '100%', lg: '45%' }} aria-live="polite">
          <Text
            fontFamily={'LexendPeta'}
            fontSize={{ base: '1.125rem', lg: '2rem' }}
            fontWeight={800}
            letterSpacing={'-0.4rem'}
            px="0.4rem"
            mb={{ lg: '1.25rem' }}
            display={{ base: 'none', lg: 'block' }}
            backgroundClip="text"
            bgGradient="linear(90deg, #39083F 0%, #005A6E 100%)"
          >
            THE STORY OF REDEMPTION
          </Text>

          <AnimatePresence>
            {storyData.map(
              (section, index) =>
                visibleParagraphs.includes(index) &&
                !isResetting && (
                  <StoryParagraph
                    key={index}
                    section={section}
                    index={index}
                    activeIndex={activeIndex}
                  />
                )
            )}
          </AnimatePresence>
        </Box>

        {/* Right Panel - Simplified without AnimatePresence */}
        <Flex
          flex={1}
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          my="auto"
        >
          <Box
            position="relative"
            my={{ base: '1rem', lg: 0 }}
            mx={{ base: '10%', sm: '15%', md: '25%', lg: '5%' }}
            width={{ base: '80%', sm: '70%', md: '50%', lg: '90%' }}
          >
            <Flex
              as="video"
              ref={vidRef}
              w={['full']}
              h="auto"
              src={videoSrc}
              loop
              muted
              objectFit={['cover', 'cover']}
              justify="center"
              playsInline
              sx={{ background: 'transparent' }}
              borderRadius="4rem"
            />
          </Box>
        </Flex>

        <Text
          fontFamily={'LexendPeta'}
          fontSize={{ base: '1.125rem', lg: '2rem' }}
          display={{ base: 'block', lg: 'none' }}
          fontWeight={800}
          letterSpacing={'-0.2rem'}
          px="0.4rem"
          mb={{ lg: '1.25rem' }}
          backgroundClip="text"
          bgGradient="linear(90deg, #39083F 0%, #005A6E 100%)"
        >
          THE STORY OF REDEMPTION
        </Text>
      </Box>
    </Container>
  );
};

const StoryParagraph = ({ section, index, activeIndex }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{
      opacity: 1,
      y: 0,
      color: section.color,
      fontWeight: activeIndex === index ? 700 : 500,
    }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.8, ease: 'easeInOut' }}
    style={{ marginBottom: '1.5rem' }}
  >
    <HStack alignItems="center" spacing="1rem">
      <Icon as={FaCircle} color={section.color} boxSize="1rem" />
      <Text
        fontSize={{ base: '0.9rem', lg: '1rem' }}
        fontFamily={'Manrope'}
        lineHeight={'140%'}
      >
        {section.text}
      </Text>
    </HStack>
  </motion.div>
);

export default EasterStorySection;
