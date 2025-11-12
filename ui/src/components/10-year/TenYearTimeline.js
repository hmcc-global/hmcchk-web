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
import timelineYearData from './timelineData.json';

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
  isLast,
}) => {
  const itemRef = useRef(null);
  const imageHeight = { base: '90px', sm: '110px', md: '140px', lg: '160px' };
  const yearSuffixWidth = { base: '6rem', sm: '7rem', md: '8rem', lg: '10rem' };
  const yearData = timelineYearData?.years?.find((y) => y.year === item.year);
  const rows = yearData?.rows || [
    [{ width: '2fr' }, { width: '3fr' }],
    [{ width: '1.5fr' }, { width: '1fr' }, { width: '1.5fr' }],
  ];

  const frToFlex = (w) => {
    if (!w) return 1;
    const n = parseFloat(String(w).replace('fr', ''));
    return Number.isFinite(n) ? n : 1;
  };

  useEffect(() => {
    if (itemRef.current) {
      gsap.set(itemRef.current, { opacity: 1 });
    }
  }, []);

  return (
    <Box
      ref={itemRef}
      className={`timeline-item-${index}`}
      position="relative"
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py="0.5em"
    >
      <HStack
        spacing={'0.5em'}
        align="center"
        w="90vw" // 90% of viewport width
        justify="flex-start"
        pl={{ base: '6rem', sm: '7rem', md: '8rem', lg: '10rem' }} // Space for fixed "20"
        pr={{ base: 4, sm: 6, md: 8 }} // Right padding for mobile
      >
        {/* Year suffix - only the last two digits, takes up actual space */}
        <Box
          className="year-suffix"
          display="flex"
          alignItems="center"
          minW={yearSuffixWidth}
          w={yearSuffixWidth}
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
          className="timeline-content"
          bg="transparent"
          p={0}
          border="none"
          borderRadius={0}
          boxShadow="none"
          position="relative"
          overflow="visible"
          flex={1}
          w="100%"
        >
          <VStack spacing={{ base: 1, md: 2 }} align="stretch" w="100%">
            {rows.slice(0, 2).map((row, rowIdx) => (
              <HStack
                key={rowIdx}
                spacing={{ base: 1, md: 2 }}
                align="stretch"
                w="100%"
              >
                {row.map((col, colIdx) => (
                  <Box
                    key={`${rowIdx}-${colIdx}`}
                    flex={`${frToFlex(col.width)} 1 0`}
                    h={imageHeight}
                    bg="#E2E8F0"
                    borderRadius={tenYearTheme.borderRadius.image}
                  />
                ))}
              </HStack>
            ))}
          </VStack>
          {!isLast && (
            <Box
              mt="0.5em"
              h="1px"
              w="100%"
              bg="#FFFFFF"
              opacity={1}
              borderRadius="full"
            />
          )}
        </Box>
      </HStack>
    </Box>
  );
};

// Main timeline component - now creates individual scroll sections
const TenYearTimeline = ({ onExit }) => {
  const timelineRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const pinnedRef = useRef(null);
  const activeIndexRef = useRef(0);
  const pinRef = useRef(null);

  useEffect(() => {
    // Create scroll triggers for each timeline section
    const sectionTriggers = timelineData.map((_, index) =>
      ScrollTrigger.create({
        trigger: `.timeline-item-${index}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      })
    );

    // Pin the "20" between the first and last timeline items
    const firstContentSelector = `.timeline-item-0 .timeline-content`;
    const lastContentSelector = `.timeline-item-${
      timelineData.length - 1
    } .timeline-content`;

    // Helpers to place the pinned element relative to a specific item
    const placeRelativeToItem = (itemIndex) => {
      const itemEl = document.querySelector(`.timeline-item-${itemIndex}`);
      const suffixEl = document.querySelector(
        `.timeline-item-${itemIndex} .year-suffix`
      );
      const pinnedEl = pinnedRef.current;
      if (!itemEl || !suffixEl || !pinnedEl) return;
      const itemRect = itemEl.getBoundingClientRect();
      const suffixRect = suffixEl.getBoundingClientRect();
      const pinnedRect = pinnedEl.getBoundingClientRect();
      // Reparent to the item so it moves with it
      if (pinnedEl.parentElement !== itemEl) {
        itemEl.appendChild(pinnedEl);
      }
      gsap.set(pinnedEl, {
        position: 'absolute',
        top: '50%',
        left: suffixRect.left - itemRect.left - pinnedRect.width,
        transform: 'translateY(-50%)',
        opacity: 1,
      });
    };

    // Initial placement: align with first item so it scrolls in naturally
    placeRelativeToItem(0);

    const positionPinnedToActive = () => {
      const idx = activeIndexRef.current;
      const itemEl = document.querySelector(`.timeline-item-${idx}`);
      const suffixEl = document.querySelector(
        `.timeline-item-${idx} .year-suffix`
      );
      const pinnedEl = pinnedRef.current;
      const root = timelineRef.current;
      if (!suffixEl || !pinnedEl || !itemEl) return;
      if (root && pinnedEl.parentElement !== root) {
        root.appendChild(pinnedEl);
      }
      const suffixRect = suffixEl.getBoundingClientRect();
      const pinnedRect = pinnedEl.getBoundingClientRect();
      gsap.set(pinnedEl, {
        position: 'fixed',
        top: '50%',
        left: suffixRect.left - pinnedRect.width,
        transform: 'translateY(-50%)',
        opacity: 1,
      });
    };

    const pinTwenty = ScrollTrigger.create({
      trigger: firstContentSelector,
      endTrigger: lastContentSelector,
      start: 'center center',
      end: 'center center',
      pin: '.pinned-year-prefix',
      pinSpacing: false,
      invalidateOnRefresh: true,
      onToggle: (self) => {
        if (self.isActive) {
          positionPinnedToActive();
        } else {
          // On forward unpin, attach to last item; on backward unpin, attach to first item
          if (self.direction === 1) {
            placeRelativeToItem(timelineData.length - 1);
          } else {
            placeRelativeToItem(0);
          }
        }
      },
    });
    pinRef.current = pinTwenty;

    // Keep layout responsive during viewport resizes
    const onResize = () => {
      // Trigger GSAP to recalc measurements; our refresh listener will finalize placement
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);

    // Ensure placement is corrected after any ScrollTrigger refresh (e.g., resize, content changes)
    const onStRefresh = () => {
      if (pinRef.current && pinRef.current.isActive) {
        positionPinnedToActive();
      } else {
        placeRelativeToItem(activeIndexRef.current);
      }
    };
    ScrollTrigger.addEventListener('refresh', onStRefresh);

    return () => {
      sectionTriggers.forEach((t) => t.kill());
      pinTwenty.kill();
      window.removeEventListener('resize', onResize);
      ScrollTrigger.removeEventListener('refresh', onStRefresh);
    };
  }, []);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  return (
    <Box ref={timelineRef} w="100%" position="relative">
      {/* "20" prefix - controlled by GSAP ScrollTrigger */}
      <Box
        ref={pinnedRef}
        position="absolute"
        top={{ base: '1.5rem', md: '2rem' }}
        left={{ base: '1.5rem', md: '2rem' }}
        zIndex={5}
        pointerEvents="none"
        className="pinned-year-prefix"
        opacity={0}
        w="fit-content"
        h="fit-content"
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

      {/* Timeline content - scrolls normally without affecting "20" */}
      <VStack spacing={0} align="stretch">
        {timelineData.map((item, index) => (
          <TimelineItem
            key={item.year}
            item={item}
            index={index}
            isActive={index === activeIndex}
            isPassed={index < activeIndex}
            isNext={index > activeIndex}
            activeIndex={activeIndex}
            isLast={index === timelineData.length - 1}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default TenYearTimeline;
