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
  const yearData = timelineYearData?.years?.find((y) => y.year === item.year);
  const rows = yearData?.rows || [
    [
      { width: '1fr', alt: `${item.year} - 1`, image: '2015-01' },
      { width: '1fr', alt: `${item.year} - 2`, image: '2015-02' },
    ],
    [
      { width: '1fr', alt: `${item.year} - 1`, image: '2015-01' },
      { width: '1fr', alt: `${item.year} - 2`, image: '2015-02' },
    ],
  ];

  const frToFlex = (w) => {
    if (!w) return 1;
    const n = parseFloat(String(w).replace('fr', ''));
    return Number.isFinite(n) ? n : 1;
  };

  // Build a PUBLIC_URL-based image path from filename (without extension)
  const buildImageUrl = (filename) =>
    `${process.env.PUBLIC_URL}/images/10-year/timeline/web/${filename}.png`;

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
        pl={{
          base: 'calc(var(--year-font) * 1.05)',
          md: 'calc(var(--year-font) * 1.1)',
          lg: 'calc(var(--year-font) * 1.15)',
        }} // Space for fixed "20"
        pr={{ base: 4, sm: 6, md: 8 }} // Right padding for mobile
      >
        {/* Year suffix - only the last two digits, takes up actual space */}
        <Box
          className="year-suffix"
          display="flex"
          alignItems="center"
          minW={{
            base: 'calc(var(--year-font) * 1.05)',
            md: 'calc(var(--year-font) * 1.1)',
            lg: 'calc(var(--year-font) * 1.15)',
          }}
          w={{
            base: 'calc(var(--year-font) * 1.05)',
            md: 'calc(var(--year-font) * 1.1)',
            lg: 'calc(var(--year-font) * 1.15)',
          }}
          justifyContent="flex-start"
        >
          <Text
            fontSize="var(--year-font)"
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
          <VStack spacing={1.5} align="stretch" w="100%" h="fit-content">
            {(Array.isArray(rows?.[0])
              ? rows.slice(0, 2)
              : rows.slice(0, 2).map((item) => [item])
            ).map((row, rowIdx) => (
              <HStack
                key={`row-${rowIdx}`}
                spacing={{ base: 1, md: 2 }}
                align="stretch"
                w="100%"
                h="var(--row-height)"
              >
                {row.map((col, colIdx) => {
                  const url = col.image ? buildImageUrl(col.image) : undefined;
                  return (
                    <Box
                      key={`cell-${rowIdx}-${colIdx}`}
                      flex={`${frToFlex(col.width)} 1 0`}
                      h="var(--row-height)"
                      borderRadius={tenYearTheme.borderRadius.image}
                      bg="transparent"
                      aria-label={col.alt || `${item.year} photo ${colIdx + 1}`}
                      {...(url
                        ? {
                            backgroundImage: `url('${url}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: 'transparent',
                          }
                        : {})}
                    />
                  );
                })}
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
  const headingPinRef = useRef(null);
  const bottomGradientRef = useRef(null);
  const bottomGradientPinRef = useRef(null);

  useEffect(() => {
    // Create scroll triggers for each timeline section
    const sectionTriggers = timelineYearData.years.map((_, index) =>
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
      timelineYearData.years.length - 1
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
            placeRelativeToItem(timelineYearData.years.length - 1);
          } else {
            placeRelativeToItem(0);
          }
        }
      },
    });
    pinRef.current = pinTwenty;

    // Pin the heading section at the top while scrolling through timeline
    const pinHeading = ScrollTrigger.create({
      trigger: '.pinned-heading',
      endTrigger: lastContentSelector,
      start: 'top 0%',
      end: 'bottom 60%',
      pin: '.pinned-heading',
      pinSpacing: false,
      invalidateOnRefresh: true,
    });
    headingPinRef.current = pinHeading;

    // Helpers to place bottom gradient consistently relative to timeline container
    const placeBottomGradientAtStart = () => {
      const el = bottomGradientRef.current;
      const root = timelineRef.current;
      if (!el || !root) return;
      if (el.parentElement !== root) root.appendChild(el);
      gsap.set(el, {
        position: 'absolute',
        top: 'calc(70vh - 33vh)', // 30vh visible, gradient height ~33vh
        left: 0,
        right: 0,
        bottom: 'auto',
        opacity: 1,
        zIndex: 2,
      });
    };

    const placeBottomGradientAtEnd = () => {
      const el = bottomGradientRef.current;
      const root = timelineRef.current;
      if (!el || !root) return;
      if (el.parentElement !== root) root.appendChild(el);
      gsap.set(el, {
        position: 'absolute',
        bottom: '-20vh',
        left: 0,
        right: 0,
        top: 'auto',
        opacity: 1,
        zIndex: 2,
      });
    };

    // Fix bottom gradient to viewport (preserve on-screen position to avoid jumps)
    const fixBottomGradient = () => {
      const el = bottomGradientRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const bottomOffsetPx = Math.max(0, window.innerHeight - rect.bottom);
      gsap.set(el, {
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: bottomOffsetPx,
        top: 'auto',
        opacity: 1,
        zIndex: 4,
      });
    };

    const bottomGradientTrigger = ScrollTrigger.create({
      trigger: '.timeline-root',
      start: () => `top ${Math.round(window.innerHeight * 0.7)}px`,
      end: 'bottom 80%',
      onEnter: fixBottomGradient,
      onEnterBack: fixBottomGradient,
      onLeave: placeBottomGradientAtEnd,
      onLeaveBack: placeBottomGradientAtStart,
      // markers: true,
    });
    bottomGradientPinRef.current = bottomGradientTrigger;

    // Fade-in after 30vh threshold and fade-out near end
    if (bottomGradientRef.current) {
      gsap.fromTo(
        bottomGradientRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-root',
            start: () => `top ${Math.round(window.innerHeight * 0.7)}px`,
            end: () => `top ${Math.round(window.innerHeight * 0.6)}px`,
            scrub: true,
          },
        }
      );
    }

    // Initial placement to avoid pop-in when loaded scrolled
    placeBottomGradientAtStart();

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
      pinHeading.kill();
      bottomGradientPinRef.current && bottomGradientPinRef.current.kill();
      window.removeEventListener('resize', onResize);
      ScrollTrigger.removeEventListener('refresh', onStRefresh);
    };
  }, []);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  return (
    <>
      <Box
        className="pinned-heading"
        position="relative"
        w="100%"
        h="33vh"
        bgGradient="linear(180deg, #000214 0%, #0C134A 25%, rgba(16, 24, 97, 0.70) 50%, rgba(0, 13, 146, 0.00) 100%)"
        zIndex={2}
      >
        <VStack
          align="center"
          justify="center"
          py={5}
          w="100%"
          h="100%"
          spacing={'-1.25rem'}
          zIndex={3}
          position="relative"
        >
          <Heading
            {...tenYearTheme.components.heading}
            {...tenYearTheme.typography.h1}
            letterSpacing={tenYearTheme.letterSpacings.tight}
            textAlign="center"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              as="img"
              src={`${process.env.PUBLIC_URL}/images/10-year/timeline/10.svg`}
              alt="10"
              h="3.5em"
              w="fit-content"
              display="inline-block"
              verticalAlign="middle"
              mr={'-0.88em'}
            />
            <Text as="span" ml={0}>
              Years: The Moments
            </Text>
          </Heading>
          <Text
            {...tenYearTheme.components.text}
            {...tenYearTheme.typography.body}
            fontSize={['16px', '18px']}
            color="white"
            textAlign="center"
            maxW="100%"
          >
            Look back at the moments and recount all that God has done in the
            past decade for our church family.
          </Text>
        </VStack>
      </Box>
      <Box
        ref={timelineRef}
        className="timeline-root"
        w="100%"
        position="relative"
        style={{
          ['--row-height']: 'clamp(100px, 11vw, 130px)',
          ['--year-font']: 'calc(var(--row-height) * 0.95)',
        }}
      >
        {/* "20" prefix - controlled by GSAP ScrollTrigger */}
        <Box
          ref={pinnedRef}
          position="absolute"
          top={{ base: '1.5rem', md: '2rem' }}
          left={{ base: '1.5rem', md: '2rem' }}
          zIndex={1}
          pointerEvents="none"
          className="pinned-year-prefix"
          opacity={0}
          w="fit-content"
          h="fit-content"
        >
          <Text
            fontSize="var(--year-font)"
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
          {timelineYearData.years.map((item, index) => (
            <TimelineItem
              key={item.year}
              item={item}
              index={index}
              isActive={index === activeIndex}
              isPassed={index < activeIndex}
              isNext={index > activeIndex}
              activeIndex={activeIndex}
              isLast={index === timelineYearData.years.length - 1}
            />
          ))}
        </VStack>
        {/* Bottom gradient - pinned during timeline scroll */}
        <Box
          className="pinned-bottom-gradient"
          ref={bottomGradientRef}
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          h="33vh"
          bgGradient="linear(0deg, #000214 0%, #0C134A 25%, rgba(16, 24, 97, 0.70) 50%, rgba(0, 13, 146, 0.00) 100%)"
          zIndex={2}
          pointerEvents="none"
        />
      </Box>
    </>
  );
};

export default TenYearTimeline;
