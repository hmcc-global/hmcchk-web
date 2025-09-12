import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  HStack,
  Container,
} from '@chakra-ui/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tenYearTheme } from './theme';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Timeline milestone data
const timelineData = [
  {
    year: 2015,
    title: 'The Beginning',
    description:
      'HMCC Hong Kong was founded with a vision to reach the Chinese community in Hong Kong.',
    highlight: 'Church Launch',
  },
  {
    year: 2018,
    title: 'Growing Community',
    description:
      'Established our first permanent location and launched multiple ministry programs.',
    highlight: 'First Building',
  },
  {
    year: 2020,
    title: 'Digital Transformation',
    description:
      'Adapted to online ministry during the pandemic, reaching even more people globally.',
    highlight: 'Online Ministry',
  },
  {
    year: 2022,
    title: 'Expansion',
    description:
      'Launched new campuses and expanded our reach across different districts.',
    highlight: 'Multi-Campus',
  },
  {
    year: 2025,
    title: '10 Year Anniversary',
    description:
      "Celebrating a decade of God's faithfulness and looking forward to the future.",
    highlight: 'Decade of Impact',
  },
];

// Individual timeline item component
const TimelineItem = ({ item, index, isActive, isPassed }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    if (itemRef.current) {
      // Initial animation on scroll into view
      gsap.fromTo(
        itemRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Active state animation
      if (isActive) {
        gsap.to(itemRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(itemRef.current, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    }
  }, [isActive]);

  return (
    <Box
      ref={itemRef}
      position="relative"
      mb={{ base: 8, md: 12 }}
      opacity={isPassed ? 0.6 : 1}
      transform={isActive ? 'scale(1.05)' : 'scale(1)'}
      transition="all 0.3s ease"
    >
      <HStack
        spacing={{ base: 4, md: 8 }}
        align="flex-start"
        position="relative"
      >
        {/* Timeline line connector */}
        {index < timelineData.length - 1 && (
          <Box
            position="absolute"
            left={{ base: '20px', md: '40px' }}
            top="60px"
            width="2px"
            height="100%"
            bg={
              isPassed
                ? tenYearTheme.colors.primary
                : tenYearTheme.colors.secondary
            }
            opacity={isPassed ? 1 : 0.3}
            transition="all 0.3s ease"
          />
        )}

        {/* Year and dot */}
        <VStack spacing={2} align="center" minW={{ base: '60px', md: '80px' }}>
          <Box
            width={{ base: '40px', md: '60px' }}
            height={{ base: '40px', md: '60px' }}
            borderRadius="50%"
            bg={
              isActive
                ? tenYearTheme.colors.primary
                : tenYearTheme.colors.secondary
            }
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="4px solid"
            borderColor={
              isActive
                ? tenYearTheme.colors.primary
                : tenYearTheme.colors.secondary
            }
            boxShadow={
              isActive ? `0 0 20px ${tenYearTheme.colors.primary}40` : 'none'
            }
            transition="all 0.3s ease"
            position="relative"
            zIndex={2}
          >
            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              fontWeight="bold"
              color="white"
            >
              {item.year}
            </Text>
          </Box>
        </VStack>

        {/* Content card */}
        <Box
          flex={1}
          bg={isActive ? 'white' : 'rgba(255, 255, 255, 0.9)'}
          p={{ base: 4, md: 6 }}
          borderRadius="12px"
          boxShadow={
            isActive
              ? '0 8px 32px rgba(6, 40, 163, 0.2)'
              : '0 4px 16px rgba(0, 0, 0, 0.1)'
          }
          border="2px solid"
          borderColor={isActive ? tenYearTheme.colors.primary : 'transparent'}
          transition="all 0.3s ease"
          position="relative"
          overflow="hidden"
        >
          {/* Highlight badge */}
          <Box
            position="absolute"
            top={0}
            right={0}
            bg={tenYearTheme.colors.primary}
            color="white"
            px={3}
            py={1}
            fontSize="xs"
            fontWeight="bold"
            borderRadius="0 12px 0 8px"
            transform={isActive ? 'translateY(0)' : 'translateY(-100%)'}
            transition="transform 0.3s ease"
          >
            {item.highlight}
          </Box>

          <VStack spacing={3} align="flex-start">
            <Heading
              fontSize={{ base: 'lg', md: 'xl' }}
              color={tenYearTheme.colors.text.primary}
              fontFamily={tenYearTheme.fonts.heading}
            >
              {item.title}
            </Heading>
            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              color={tenYearTheme.colors.text.secondary}
              lineHeight={1.6}
            >
              {item.description}
            </Text>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
};

// Main timeline component
const TenYearTimeline = ({ onExit }) => {
  const timelineRef = useRef(null);
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Create scroll-triggered animation for the entire timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: timelineRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        onUpdate: (self) => {
          // Calculate which item should be active based on scroll progress
          const progress = self.progress;
          const newActiveIndex = Math.min(
            Math.floor(progress * timelineData.length),
            timelineData.length - 1
          );

          if (newActiveIndex !== activeIndex) {
            setActiveIndex(newActiveIndex);
          }
        },
      },
    });

    // Animate the timeline line
    tl.fromTo(
      '.timeline-line',
      { scaleY: 0, transformOrigin: 'top' },
      { scaleY: 1, duration: 2, ease: 'power2.out' }
    );

    return () => {
      tl.kill();
    };
  }, [activeIndex]);

  return (
    <Container
      ref={containerRef}
      maxW="container.lg"
      py={{ base: 8, md: 16 }}
      px={{ base: 4, md: 6 }}
    >
      <VStack spacing={0} ref={timelineRef}>
        {/* Timeline header */}
        <Box textAlign="center" mb={{ base: 8, md: 12 }}>
          <Heading
            fontSize={{ base: '2xl', md: '4xl' }}
            color="white"
            fontFamily={tenYearTheme.fonts.heading}
            mb={4}
          >
            Our Journey Through Time
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color={tenYearTheme.colors.text.secondary}
            maxW="600px"
            mx="auto"
          >
            Scroll down to explore the milestones that have shaped our community
          </Text>
        </Box>

        {/* Timeline items */}
        <Box position="relative" w="100%">
          {timelineData.map((item, index) => (
            <TimelineItem
              key={item.year}
              item={item}
              index={index}
              isActive={index === activeIndex}
              isPassed={index < activeIndex}
            />
          ))}
        </Box>

        {/* Call to action */}
        <Box
          textAlign="center"
          mt={{ base: 8, md: 12 }}
          p={{ base: 6, md: 8 }}
          bg="rgba(255, 255, 255, 0.1)"
          borderRadius="12px"
          backdropFilter="blur(10px)"
        >
          <Heading
            fontSize={{ base: 'lg', md: 'xl' }}
            color="white"
            fontFamily={tenYearTheme.fonts.heading}
            mb={3}
          >
            Join Our Story
          </Heading>
          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            color={tenYearTheme.colors.text.secondary}
            mb={4}
          >
            Be part of the next chapter in our journey
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default TenYearTimeline;
