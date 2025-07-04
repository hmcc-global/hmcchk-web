import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  IconButton,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const images = [
  '/images/building-blocks/carousel-1.png',
  '/images/building-blocks/carousel-2.png',
  '/images/building-blocks/carousel-3.png',
  '/images/building-blocks/carousel-4.png',
  '/images/building-blocks/carousel-5.png',
  '/images/building-blocks/carousel-6.png',
];

export default function Curriculum() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  const prevSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      setFade(true);
    }, 400);
  };
  const nextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setFade(true);
    }, 400);
  };

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        setFade(true);
      }, 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Flex
      w="100%"
      bg="#F7F9FC"
      overflow="hidden"
      direction={{ base: 'column-reverse', xl: 'row' }}
      align="center"
      marginLeft={{ base: 0, xl: '8.5rem' }}
      py={{ base: '1.5rem', xl: '3rem' }}
    >
      {/* Carousel Section */}
      <VStack w={{ base: '100%', xl: '55%' }} spacing={3} align="stretch">
        <Box
          position="relative"
          h="100%"
          minW={{ md: '35rem', lg: '40.625rem' }}
          borderRadius="5rem"
          overflow="hidden"
          role="group"
        >
          <Image
            src={images[current]}
            alt="Curriculum"
            objectFit="cover"
            objectPosition="100% 50%"
            w="100%"
            h="100%"
            transition="opacity 1.2s"
            opacity={fade ? 1 : 0}
          />
          {/* Carousel Controls */}
          <Box
            position="absolute"
            top="0"
            left="0"
            h="100%"
            w="4rem"
            bgGradient="linear(to-r, rgba(0,0,0,0.5), transparent)"
            opacity={0}
            _groupHover={{ opacity: 1 }}
            transition="opacity 0.2s"
            zIndex={0}
          >
            <IconButton
              aria-label="Previous"
              icon={<ChevronLeftIcon boxSize="2rem" color="white" />}
              position="absolute"
              top="50%"
              left="0.25rem"
              transform="translateY(-50%)"
              onClick={prevSlide}
              bg="transparent"
              _hover={{ bg: 'transparent' }}
              zIndex={1}
              opacity={0}
              _groupHover={{ opacity: 1 }}
              transition="opacity 0.2s"
              _focus={{ boxShadow: 'none', outline: 'none' }}
              _active={{ boxShadow: 'none', outline: 'none' }}
            />
          </Box>
          <Box
            position="absolute"
            top="0"
            right="0"
            h="100%"
            w="4rem"
            bgGradient="linear(to-l, rgba(0,0,0,0.5), transparent)"
            opacity={0}
            _groupHover={{ opacity: 1 }}
            transition="opacity 0.2s"
            zIndex={0}
          >
            <IconButton
              aria-label="Next"
              icon={<ChevronRightIcon boxSize="2rem" color="white" />}
              position="absolute"
              top="50%"
              right="0.25rem"
              transform="translateY(-50%)"
              onClick={nextSlide}
              bg="transparent"
              _hover={{ bg: 'transparent' }}
              zIndex={1}
              opacity={0}
              _groupHover={{ opacity: 1 }}
              transition="opacity 0.2s"
              _focus={{ boxShadow: 'none', outline: 'none' }}
              _active={{ boxShadow: 'none', outline: 'none' }}
            />
          </Box>
        </Box>
        {/* Dots below the carousel, grouped */}
        <HStack justify="center" spacing={2}>
          {images.map((_, idx) => (
            <Box
              key={idx}
              w={2}
              h={2}
              borderRadius="full"
              bg={current === idx ? ' #EBAC09;' : '#D9D9D9'}
              cursor="pointer"
              onClick={() => {
                setFade(false);
                setTimeout(() => {
                  setCurrent(idx);
                  setFade(true);
                }, 400);
              }}
            />
          ))}
        </HStack>
      </VStack>

      {/* Text Section */}
      <Box
        flex="1"
        px={{ xl: '6.5rem' }}
        py={{ base: '2.5rem', xl: '2.625rem' }}
        textAlign="left"
        fontWeight="400"
        minW={{ lg: '38rem' }}
      >
        <Heading
          as="h2"
          fontSize={{ base: '2.25rem', lg: '2.625rem' }}
          fontWeight="400"
          fontFamily="DMSerifDisplay_Italic"
          mb="1rem"
        >
          Curriculum
        </Heading>
        <Text
          fontSize={{ base: '0.875rem', lg: '1.25rem' }}
          fontWeight="400"
          fontFamily="Manrope"
        >
          In Building Blocks, we use the curriculum "The Biggest Story
          Curriculum" by Crossway as the backbone for our lessons. The
          curriculum spans over the entire Bible, helping children understand
          that God has written this story of redeeming the world through his
          Son, Jesus Christ.
        </Text>
      </Box>
    </Flex>
  );
}
