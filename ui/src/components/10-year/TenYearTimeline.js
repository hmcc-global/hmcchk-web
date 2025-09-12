import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tenYearTheme } from './theme';
import timelineYearData from './timelineData.json';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Individual timeline item component with integrated year display
const TimelineItem = ({ item, index, isLast, isMobile }) => {
  const itemRef = useRef(null);
  const yearData = timelineYearData?.years?.find((y) => y.year === item.year);
  const rawRows = yearData?.rows || {
    web: [{ width: '1fr', alt: `${item.year} - 1`, image: '2015-01' }],
    mobile: [{ width: '1fr', alt: `${item.year} - 1`, image: '2015-01' }],
  };

  // Always render all rows for current breakpoint (rows is an object)
  const getRowsToRender = () => {
    const selected = isMobile ? rawRows?.mobile : rawRows?.web;
    return Array.isArray(selected) ? selected : [];
  };

  const frToFlex = (w) => {
    if (!w) return 1;
    const n = parseFloat(String(w).replace('fr', ''));
    return Number.isFinite(n) ? n : 1;
  };

  // Build a PUBLIC_URL-based image path from filename (without extension)
  const buildImageUrl = (filename) =>
    `${process.env.PUBLIC_URL}/images/10-year/timeline/${
      isMobile ? 'mobile' : 'web'
    }/${filename}.png`;

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
      {isMobile ? (
        <VStack w="90vw" spacing={2} align="stretch">
          <Box
            w="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text
              fontSize="var(--year-font)"
              fontWeight="900"
              color="white"
              fontFamily={tenYearTheme.fonts.heading}
              lineHeight={0.8}
              textShadow="0 0 40px rgba(255, 255, 255, 0.3)"
              whiteSpace="nowrap"
            >
              {String(item.year).slice(-2)}
            </Text>
          </Box>
          <Box
            className="timeline-content"
            bg="transparent"
            position="relative"
            w="100%"
          >
            <VStack spacing={1.5} align="stretch" w="100%" h="fit-content">
              {getRowsToRender().map((row, rowIdx) => (
                <HStack
                  key={`row-${rowIdx}`}
                  spacing={{ base: 1, md: 2 }}
                  align="stretch"
                  w="100%"
                  h="var(--row-height)"
                >
                  {(Array.isArray(row) ? row : [row]).map((col, colIdx) => {
                    const url = col.image
                      ? buildImageUrl(col.image)
                      : undefined;
                    return (
                      <Box
                        key={`cell-${rowIdx}-${colIdx}`}
                        flex={`${frToFlex(col.width)} 1 0`}
                        h="var(--row-height)"
                        borderRadius={tenYearTheme.borderRadius.image}
                        bg="transparent"
                        aria-label={
                          col.alt || `${item.year} photo ${colIdx + 1}`
                        }
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
        </VStack>
      ) : (
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
              {getRowsToRender().map((row, rowIdx) => (
                <HStack
                  key={`row-${rowIdx}`}
                  spacing={{ base: 1, md: 2 }}
                  align="stretch"
                  w="100%"
                  h="var(--row-height)"
                >
                  {(Array.isArray(row) ? row : [row]).map((col, colIdx) => {
                    const url = col.image
                      ? buildImageUrl(col.image)
                      : undefined;
                    return (
                      <Box
                        key={`cell-${rowIdx}-${colIdx}`}
                        flex={`${frToFlex(col.width)} 1 0`}
                        h="var(--row-height)"
                        borderRadius={tenYearTheme.borderRadius.image}
                        bg="transparent"
                        aria-label={
                          col.alt || `${item.year} photo ${colIdx + 1}`
                        }
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
      )}
    </Box>
  );
};

// Main timeline component - now creates individual scroll sections
const TenYearTimeline = ({ onExit }) => {
  const timelineRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const pinnedRef = useRef(null);
  const activeIndexRef = useRef(0);
  const pinRef = useRef(null);
  const headingPinRef = useRef(null);
  const bottomGradientRef = useRef(null);
  const bottomGradientPinRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Shared triggers for all viewports
    mm.add('(min-width: 0px)', () => {
      // Track which timeline item is active
      const sectionTriggers = timelineYearData.years.map((_, index) =>
        ScrollTrigger.create({
          trigger: `.timeline-item-${index}`,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        })
      );

      // Bottom gradient helpers
      const placeBottomGradientAtStart = () => {
        const el = bottomGradientRef.current;
        const root = timelineRef.current;
        if (!el || !root) return;
        if (el.parentElement !== root) root.appendChild(el);
        gsap.set(el, {
          position: 'absolute',
          top: 'calc(70vh - 33vh)',
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
      });

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
        ScrollTrigger.refresh();
      };
      window.addEventListener('resize', onResize);

      // Cleanup for shared triggers
      return () => {
        sectionTriggers.forEach((t) => t.kill());
        bottomGradientTrigger.kill();
        window.removeEventListener('resize', onResize);
      };
    });

    // Desktop / Web layout (Chakra md and up => 48em ~ 768px)
    mm.add('(min-width: 48em)', () => {
      const firstContentSelector = `.timeline-item-0 .timeline-content`;
      const lastContentSelector = `.timeline-item-${
        timelineYearData.years.length - 1
      } .timeline-content`;

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
        if (pinnedEl.parentElement !== itemEl) {
          itemEl.appendChild(pinnedEl);
        }
        const centeredTopWithinItem =
          suffixRect.top -
          itemRect.top +
          (suffixRect.height - pinnedRect.height) / 2;
        gsap.set(pinnedEl, {
          position: 'absolute',
          top: centeredTopWithinItem,
          left: suffixRect.left - itemRect.left - pinnedRect.width,
          transform: 'none',
          opacity: 1,
        });
      };

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
        const centeredTop =
          suffixRect.top + (suffixRect.height - pinnedRect.height) / 2;
        gsap.set(pinnedEl, {
          position: 'fixed',
          top: centeredTop,
          left: suffixRect.left - pinnedRect.width,
          transform: 'none',
          opacity: 1,
        });
      };

      // Initial placement: align with first item
      placeRelativeToItem(0);

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
            if (self.direction === 1) {
              placeRelativeToItem(timelineYearData.years.length - 1);
            } else {
              placeRelativeToItem(0);
            }
          }
        },
      });

      const pinHeading = ScrollTrigger.create({
        trigger: '.pinned-heading',
        endTrigger: lastContentSelector,
        start: 'top 0%',
        end: 'bottom 60%',
        pin: '.pinned-heading',
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      const onStRefresh = () => {
        if (pinTwenty && pinTwenty.isActive) {
          positionPinnedToActive();
        } else {
          placeRelativeToItem(activeIndexRef.current);
        }
      };
      ScrollTrigger.addEventListener('refresh', onStRefresh);

      // Ensure correct initialization after breakpoint switch
      ScrollTrigger.refresh();

      return () => {
        pinTwenty.kill();
        pinHeading.kill();
        ScrollTrigger.removeEventListener('refresh', onStRefresh);
      };
    });

    // Mobile layout (below Chakra md)
    mm.add('(max-width: 47.99em)', () => {
      const lastContentSelector = `.timeline-item-${
        timelineYearData.years.length - 1
      } .timeline-content`;

      const positionMobilePinnedToActive = () => {
        const idx = activeIndexRef.current;
        const suffixEl = document.querySelector(
          `.timeline-item-${idx} .year-suffix`
        );
        const mobilePinnedEl = document.querySelector('.mobile-pinned-twenty');
        if (!suffixEl || !mobilePinnedEl) return;
        const suffixRect = suffixEl.getBoundingClientRect();
        const pinnedRect = mobilePinnedEl.getBoundingClientRect();
        const gapPx = 4;
        const top = Math.max(0, suffixRect.top - pinnedRect.height - gapPx);
        const left =
          suffixRect.left + (suffixRect.width - pinnedRect.width) / 2;
        gsap.set(mobilePinnedEl, {
          position: 'fixed',
          top,
          left,
          transform: 'none',
          opacity: 1,
        });
      };

      const mobilePin = ScrollTrigger.create({
        trigger: `.timeline-item-0`,
        endTrigger: lastContentSelector,
        start: 'top 35%',
        end: 'bottom 80%',
        pin: '.mobile-pinned-twenty',
        pinSpacing: false,
        invalidateOnRefresh: true,
        onToggle: (self) => {
          if (self.isActive) {
            positionMobilePinnedToActive();
          }
        },
        onUpdate: () => positionMobilePinnedToActive(),
      });

      const pinHeading = ScrollTrigger.create({
        trigger: '.pinned-heading',
        endTrigger: lastContentSelector,
        start: 'top 5%',
        end: 'bottom 80%',
        pin: '.pinned-heading',
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      const onStRefresh = () => {
        positionMobilePinnedToActive();
      };
      ScrollTrigger.addEventListener('refresh', onStRefresh);

      // Initial placement
      positionMobilePinnedToActive();

      // Ensure correct initialization after breakpoint switch
      ScrollTrigger.refresh();

      return () => {
        mobilePin.kill();
        pinHeading.kill();
        ScrollTrigger.removeEventListener('refresh', onStRefresh);
      };
    });

    return () => mm.revert();
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
        bgGradient="linear(180deg, #000214 0%, #0C134A 25%, rgba(16, 24, 97, 0.70) 50%, rgba(0, 13, 146, 0.00) 100%)"
        zIndex={2}
      >
        <VStack
          align="center"
          justify="center"
          py={'2rem'}
          w="100%"
          // h="100%"
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
        {/* "20" prefix - always render both, show via responsive display */}
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
          display={{ base: 'none', md: 'block' }}
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
        <Box
          className="mobile-pinned-twenty"
          position="relative"
          w="fit-content"
          mx="auto"
          zIndex={3}
          display={{ base: 'block', md: 'none' }}
        >
          <Text
            fontSize="var(--year-font)"
            fontWeight="900"
            color="white"
            fontFamily={tenYearTheme.fonts.heading}
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
              isLast={index === timelineYearData.years.length - 1}
              isMobile={isMobile}
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
