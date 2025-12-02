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

// Individual timeline item component with integrated year display
const TimelineItem = ({
  item,
  index,
  isActive,
  isPassed,
  isNext,
  activeIndex,
}) => {
  const itemRef = useRef(null);

  useEffect(() => {
    if (itemRef.current) {
      if (isActive) {
        // Current year - in focus
        gsap.to(itemRef.current, {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        });
      } else if (isPassed || isNext) {
        // Adjacent years - faded
        gsap.to(itemRef.current, {
          opacity: 0.3,
          duration: 0.8,
          ease: 'power2.out',
        });
      } else {
        // Distant years - hidden
        gsap.to(itemRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
        });
      }
    }
  }, [isActive, isPassed, isNext, activeIndex]);

  return (
    <Box
      ref={itemRef}
      className={`timeline-item-${index}`}
      position="relative"
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
    >
      <HStack
        spacing={{ base: '1em', sm: '2em', md: '3em' }}
        align="center"
        w="90vw" // 90% of viewport width
        justify="flex-start"
        pl={{ base: '6rem', sm: '7rem', md: '8rem', lg: '10rem' }} // Space for fixed "20"
        pr={{ base: 4, sm: 6, md: 8 }} // Right padding for mobile
      >
        {/* Year suffix - only the last two digits, takes up actual space */}
        <Box
          display="flex"
          alignItems="center"
          minW={{ base: '3rem', sm: '4rem', md: '5rem', lg: '6rem' }} // Allocate space for year suffix
          justifyContent="flex-start"
        >
          <Text
            fontSize={{ base: '5xl', sm: '6xl', md: '7xl', lg: '9xl' }}
            fontWeight="900"
            color="white"
            fontFamily={tenYearTheme.fonts.heading}
            fontStyle="normal"
            lineHeight={0.8}
            textShadow="0 0 40px rgba(255, 255, 255, 0.3)"
            whiteSpace="nowrap"
          >
            {String(item.year).slice(-2)}
          </Text>
        </Box>

        {/* Content card - positioned to the right */}
        <Box
          bg="white"
          p={{ base: 4, sm: 6, md: 8, lg: 10 }}
          borderRadius={{ base: '16px', md: '20px' }}
          boxShadow={{
            base: '0 10px 30px rgba(6, 40, 163, 0.2)',
            md: '0 20px 60px rgba(6, 40, 163, 0.3)',
          }}
          border={{ base: '2px solid', md: '3px solid' }}
          borderColor={tenYearTheme.colors.primary}
          position="relative"
          overflow="hidden"
          flex={1}
          w="100%"
        >
          {/* Highlight badge */}
          <Box
            position="absolute"
            top={0}
            right={0}
            bg={tenYearTheme.colors.primary}
            color="white"
            px={{ base: 2, sm: 3, md: 4 }}
            py={{ base: 1, sm: 1.5, md: 2 }}
            fontSize={{ base: 'xs', sm: 'sm', md: 'sm' }}
            fontWeight="bold"
            borderRadius={{ base: '0 16px 0 8px', md: '0 20px 0 12px' }}
          >
            {item.highlight}
          </Box>

          <VStack spacing={{ base: 2, sm: 3, md: 4 }} align="flex-start">
            <Heading
              fontSize={{ base: 'lg', sm: 'xl', md: '2xl', lg: '4xl' }}
              color={tenYearTheme.colors.text.primary}
              fontFamily={tenYearTheme.fonts.heading}
              lineHeight={{ base: 1.1, md: 1.2 }}
            >
              {item.title}
            </Heading>
            <Text
              fontSize={{ base: 'sm', sm: 'md', md: 'lg', lg: 'xl' }}
              color={tenYearTheme.colors.text.secondary}
              lineHeight={{ base: 1.4, md: 1.6 }}
            >
              {item.description}
            </Text>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
};

// Main timeline component - now creates individual scroll sections
const TenYearTimeline = ({ onExit }) => {
  const timelineRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Create scroll triggers for each timeline section
    const scrollTriggers = timelineData.map((_, index) => {
      return ScrollTrigger.create({
        trigger: `.timeline-item-${index}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          setActiveIndex(index);
        },
        onEnterBack: () => {
          setActiveIndex(index);
        },
      });
    });

    // Control visibility of the fixed "20" prefix
    const timelineTrigger = ScrollTrigger.create({
      trigger: timelineRef.current,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        const prefixElement = document.querySelector('.fixed-year-prefix');
        if (prefixElement)
          gsap.to(prefixElement, { opacity: 1, duration: 0.3 });
      },
      onLeave: () => {
        const prefixElement = document.querySelector('.fixed-year-prefix');
        if (prefixElement)
          gsap.to(prefixElement, { opacity: 0, duration: 0.3 });
      },
      onEnterBack: () => {
        const prefixElement = document.querySelector('.fixed-year-prefix');
        if (prefixElement)
          gsap.to(prefixElement, { opacity: 1, duration: 0.3 });
      },
      onLeaveBack: () => {
        const prefixElement = document.querySelector('.fixed-year-prefix');
        if (prefixElement)
          gsap.to(prefixElement, { opacity: 0, duration: 0.3 });
      },
    });

    return () => {
      scrollTriggers.forEach((trigger) => trigger.kill());
      timelineTrigger.kill();
    };
  }, []);

  return (
    <Box ref={timelineRef} w="100%" position="relative">
      {/* Fixed "20" prefix - always visible when timeline is in view */}
      <Box
        position="fixed"
        left={{ base: '4rem', sm: '5rem', md: '6rem' }}
        top="50%"
        transform="translateY(-50%)"
        zIndex={5}
        pointerEvents="none"
        className="fixed-year-prefix"
        opacity={0}
      >
        <Text
          fontSize={{ base: '5xl', sm: '6xl', md: '7xl', lg: '9xl' }}
          fontWeight="900"
          color="white"
          fontFamily={tenYearTheme.fonts.heading}
          fontStyle="normal"
          lineHeight={0.8}
          textShadow="0 0 40px rgba(255, 255, 255, 0.3)"
        >
          20
        </Text>
      </Box>

      {/* All timeline items - rendered at once with focus-based visibility */}
      {timelineData.map((item, index) => (
        <TimelineItem
          key={item.year}
          item={item}
          index={index}
          isActive={index === activeIndex}
          isPassed={index < activeIndex}
          isNext={index > activeIndex}
          activeIndex={activeIndex}
        />
      ))}
    </Box>
  );
};

export default TenYearTimeline;
