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
  const defaultRows = {
    web: [{ width: '1fr', alt: `${item.year} - 1`, image: '2015-01' }],
    mobile: [{ width: '1fr', alt: `${item.year} - 1`, image: '2015-01' }],
  };
  const [rawRows, setRawRows] = useState(yearData?.rows || defaultRows);

  useEffect(() => {
    setRawRows(yearData?.rows || defaultRows);
  }, [yearData]);

  useEffect(() => {
    // Ensure ScrollTrigger recalculates when rows or breakpoint change
    ScrollTrigger.refresh();
  }, [rawRows, isMobile]);

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

  // rows change is handled within TimelineItem via ScrollTrigger.refresh()

  useEffect(() => {
    const mm = gsap.matchMedia();
    // Ensure GSAP can revert styles cleanly when contexts switch
    ScrollTrigger.saveStyles([
      '.pinned-year-prefix',
      '.mobile-pinned-twenty',
      '.pinned-heading',
      '.pinned-bottom-gradient',
    ]);

    // Shared triggers for all viewports
    mm.add('(min-width: 0px)', () => {
      // Track which timeline item is active
      const sectionTriggers = timelineYearData.years.map((_, index) =>
        ScrollTrigger.create({
          trigger: `.timeline-item-${index}`,
          start: 'center center',
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
        gsap.set(el, {
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
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

      // Ensure correct placement immediately and on refreshes
      const syncBottomGradientPosition = () => {
        if (!bottomGradientTrigger) return;
        if (bottomGradientTrigger.isActive) {
          fixBottomGradient();
        } else if (bottomGradientTrigger.progress >= 1) {
          placeBottomGradientAtEnd();
        } else {
          placeBottomGradientAtStart();
        }
      };

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

      // Initial placement to match current scroll position
      syncBottomGradientPosition();

      // Keep layout responsive during viewport resizes
      const onResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener('resize', onResize);

      // Re-sync on ScrollTrigger refresh lifecycle
      ScrollTrigger.addEventListener('refresh', syncBottomGradientPosition);

      // Cleanup for shared triggers
      return () => {
        sectionTriggers.forEach((t) => t.kill());
        bottomGradientTrigger.kill();
        ScrollTrigger.removeEventListener(
          'refresh',
          syncBottomGradientPosition
        );
        window.removeEventListener('resize', onResize);
      };
    });

    // Desktop / Web layout (Chakra md and up => 48em ~ 768px)
    mm.add('(min-width: 48em)', () => {
      const firstItemSelector = `.timeline-item-0`;
      const lastItemSelector = `.timeline-item-${
        timelineYearData.years.length - 1
      }`;

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
        const leftWithinItem =
          suffixRect.left - itemRect.left - pinnedRect.width;
        gsap.set(pinnedEl, {
          position: 'absolute',
          top: centeredTopWithinItem,
          left: leftWithinItem,
          transform: 'none',
          opacity: 1,
        });
      };

      // Place the pinned "20" just above the given item's year suffix with a small gap
      const placeAboveItem = (itemIndex) => {
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
        const gapPx = 8;
        const topWithinItem =
          suffixRect.top - itemRect.top - pinnedRect.height - gapPx;
        const leftWithinItem =
          suffixRect.left - itemRect.left - pinnedRect.width;
        gsap.set(pinnedEl, {
          position: 'absolute',
          top: topWithinItem,
          left: leftWithinItem,
          transform: 'none',
          opacity: 1,
        });
      };

      const positionPinnedToActive = () => {
        const idx = getIndexClosestToCenter();
        const suffixEl = document.querySelector(
          `.timeline-item-${idx} .year-suffix`
        );
        const pinnedEl = pinnedRef.current;
        if (!suffixEl || !pinnedEl) return;
        const suffixRect = suffixEl.getBoundingClientRect();
        const pinnedRect = pinnedEl.getBoundingClientRect();
        const centerTop = window.innerHeight / 2 - pinnedRect.height / 2;
        gsap.set(pinnedEl, {
          top: centerTop,
          left: suffixRect.left - pinnedRect.width,
          transform: 'none',
          opacity: 1,
        });
      };

      // Determine the item closest to the viewport center and sync active index
      const getIndexClosestToCenter = () => {
        const centerY = window.innerHeight / 2;
        let closestIndex = 0;
        let closestDist = Infinity;
        for (let i = 0; i < timelineYearData.years.length; i += 1) {
          const el = document.querySelector(`.timeline-item-${i}`);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const elCenter = rect.top + rect.height / 2;
          const dist = Math.abs(elCenter - centerY);
          if (dist < closestDist) {
            closestDist = dist;
            closestIndex = i;
          }
        }
        return closestIndex;
      };

      const syncActiveIndexToViewport = () => {
        const idx = getIndexClosestToCenter();
        activeIndexRef.current = idx;
        setActiveIndex(idx);
        return idx;
      };

      // Initial placement: align with the item nearest the viewport center
      const initialIdx = syncActiveIndexToViewport();
      placeRelativeToItem(initialIdx);

      const pinTwenty = ScrollTrigger.create({
        trigger: firstItemSelector,
        endTrigger: lastItemSelector,
        start: 'top 40%',
        end: 'bottom 60%',
        pin: '.pinned-year-prefix',
        pinSpacing: false,
        invalidateOnRefresh: true,
        // No per-scroll updates to avoid snapping; compute only on toggle/refresh
        onToggle: (self) => {
          if (self.isActive) {
            // When entering pin range, ensure the pinned element is positioned relative to the root
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
        endTrigger: lastItemSelector,
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
          const idx = syncActiveIndexToViewport();
          placeRelativeToItem(idx);
        }
      };
      ScrollTrigger.addEventListener('refresh', onStRefresh);

      // On desktop resize, keep the pinned "20" vertically centered in the viewport
      const onDesktopResize = () => {
        const pinnedEl = pinnedRef.current;
        if (!pinnedEl) return;
        if (pinTwenty && pinTwenty.isActive) {
          const pinnedRect = pinnedEl.getBoundingClientRect();
          const centerTop = window.innerHeight / 2 - pinnedRect.height / 2;
          const idx = getIndexClosestToCenter();
          const suffixEl = document.querySelector(
            `.timeline-item-${idx} .year-suffix`
          );
          let nextLeft;
          if (suffixEl) {
            const suffixRect = suffixEl.getBoundingClientRect();
            nextLeft = suffixRect.left - pinnedRect.width;
          }
          gsap.set(pinnedEl, {
            top: centerTop,
            ...(typeof nextLeft === 'number' ? { left: nextLeft } : {}),
            transform: 'none',
            opacity: 1,
          });
        }
      };
      window.addEventListener('resize', onDesktopResize);

      // Ensure correct initialization after breakpoint switch
      ScrollTrigger.refresh();

      // Additional initialization passes to account for async layout/font loading
      const applyInitialPositioning = () => {
        if (pinTwenty && pinTwenty.isActive) {
          // Ensure we have the correct active index based on current scroll position
          syncActiveIndexToViewport();
          positionPinnedToActive();
        } else {
          const idx = syncActiveIndexToViewport();
          placeRelativeToItem(idx);
        }
      };

      // Next frame: after first layout
      requestAnimationFrame(() => {
        applyInitialPositioning();
      });

      // After fonts are ready (text metrics stabilized)
      if (document && document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          ScrollTrigger.refresh();
          applyInitialPositioning();
        });
      }

      // After window load (images/backgrounds/etc.)
      const onWindowLoad = () => {
        ScrollTrigger.refresh();
        applyInitialPositioning();
      };
      window.addEventListener('load', onWindowLoad);

      return () => {
        pinTwenty.kill();
        pinHeading.kill();
        ScrollTrigger.removeEventListener('refresh', onStRefresh);
        window.removeEventListener('load', onWindowLoad);
        window.removeEventListener('resize', onDesktopResize);
      };
    });

    // Mobile layout (below Chakra md)
    mm.add('(max-width: 47.99em)', () => {
      // Resolve DOM elements up-front and hold references to triggers safely
      const triggerEl = document.querySelector(`.timeline-item-0`);
      const endEl = timelineRef.current;
      const pinEl = document.querySelector('.mobile-pinned-twenty');
      const headingEl = document.querySelector('.pinned-heading');
      let mobilePin = null;
      let pinHeading = null;

      const positionMobilePinnedToActive = () => {
        const idx = activeIndexRef.current;
        const suffixEl = document.querySelector(
          `.timeline-item-${idx} .year-suffix`
        );
        const mobilePinnedEl = document.querySelector('.mobile-pinned-twenty');
        if (!mobilePinnedEl) return;
        // Only force fixed positioning when the pin is active
        if (!mobilePin || !mobilePin.isActive) {
          gsap.set(mobilePinnedEl, {
            position: 'relative',
            top: 0,
            left: 'auto',
            transform: 'none',
            opacity: 1,
          });
          return;
        }
        if (!suffixEl) return;
        const suffixRect = suffixEl.getBoundingClientRect();
        const pinnedRect = mobilePinnedEl.getBoundingClientRect();
        const headingEl = document.querySelector('.pinned-heading');
        const marginPx = 8;
        const gapPx = 4;
        const defaultTop = suffixRect.top - pinnedRect.height - gapPx;
        const minTop = headingEl
          ? headingEl.getBoundingClientRect().bottom + marginPx
          : marginPx;
        const maxTop = window.innerHeight - pinnedRect.height - marginPx;
        const safeZoneHeight = Math.max(0, maxTop - minTop);
        // Ensure the pinned "20" never sits too high; baseline ~40% down the safe zone
        const baselineFloor = minTop + safeZoneHeight * 0.4;
        const clampedTop = Math.min(
          maxTop,
          Math.max(baselineFloor, defaultTop)
        );
        const left =
          suffixRect.left + (suffixRect.width - pinnedRect.width) / 2;
        gsap.set(mobilePinnedEl, {
          position: 'fixed',
          top: clampedTop,
          left,
          transform: 'none',
          opacity: 1,
        });
      };

      mobilePin = ScrollTrigger.create({
        id: 'mobilePinTwenty',
        trigger: triggerEl || `.timeline-item-0`,
        endTrigger: endEl || timelineRef.current,
        start: () =>
          `top ${
            window.matchMedia('(max-width: 29.99em)').matches ? '35%' : '40%'
          }`,
        end: 'bottom 80%',
        pin: pinEl || '.mobile-pinned-twenty',
        pinSpacing: false,
        invalidateOnRefresh: true,
        onToggle: (self) => {
          if (self.isActive) {
            positionMobilePinnedToActive();
          } else {
            const el = document.querySelector('.mobile-pinned-twenty');
            if (el) {
              gsap.set(el, {
                position: 'relative',
                top: 0,
                left: 'auto',
                transform: 'none',
                opacity: 1,
              });
            }
          }
        },
        onUpdate: () => positionMobilePinnedToActive(),
      });

      if (headingEl && endEl) {
        pinHeading = ScrollTrigger.create({
          id: 'mobilePinHeading',
          trigger: headingEl,
          endTrigger: endEl,
          start: 'top 5%',
          end: 'bottom 80%',
          pin: headingEl,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      }

      // Fade away the heading and mobile "20" near the end to hide jump
      let fadeOutMobileUI = null;
      if (pinEl && headingEl && endEl) {
        fadeOutMobileUI = gsap.to([headingEl, pinEl], {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: endEl,
            start: 'bottom 120%',
            end: 'bottom 80%',
            scrub: true,
          },
        });
      }

      const onStRefresh = () => {
        positionMobilePinnedToActive();
      };
      ScrollTrigger.addEventListener('refresh', onStRefresh);

      // Initial placement
      positionMobilePinnedToActive();

      // Ensure correct initialization after breakpoint switch
      ScrollTrigger.refresh();

      return () => {
        if (mobilePin) mobilePin.kill();
        if (pinHeading) pinHeading.kill();
        if (fadeOutMobileUI) {
          if (fadeOutMobileUI.scrollTrigger)
            fadeOutMobileUI.scrollTrigger.kill();
          fadeOutMobileUI.kill();
        }
        ScrollTrigger.removeEventListener('refresh', onStRefresh);
      };
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Recalculate when breakpoint changes
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [isMobile]);

  return (
    <>
      <Box
        className="pinned-heading"
        position="relative"
        w="100%"
        bgGradient="linear(180deg, #000214 0%, #0C134A 25%, rgba(16, 24, 97, 0.70) 50%, rgba(0, 13, 146, 0.00) 100%)"
        zIndex={2}
        minH={['35vh', '35vh', '50vh']}
      >
        <VStack
          align="center"
          justify="center"
          py={('0.5rem', '0.5rem', '2.5rem')}
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
            maxW="90%"
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
            whiteSpace="nowrap"
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
          mt={['-7rem', '-3.5rem', 0]}
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
