import { Box, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import CommitmentPanel from './CommitmentPanel';
import { MotionBox } from './motion';
import {
  px,
  RELEASE_VIEW,
  RELEASE_MAP,
  RELEASE_CITIES,
  RELEASE_REGION_LABELS,
  RELEASE_TAGS,
  RELEASE_DOTS,
  RELEASE_DOT_SIZE,
  RELEASE_TAG_BLUE,
  RELEASE_TAG_BG,
  RELEASE_IMG,
  COLORS,
} from '../constants';

// A circular city photo pinned at its geographic location. The city name is
// already legible in the photo, so it is not overlaid here (kept only as alt
// text). Lifts (scales + deeper shadow) when hovered directly or when its
// matching city tag is hovered.
const CityCircle = ({ name, img, x, y, w, h, isHighlighted }) => (
  <MotionBox
    position="absolute"
    left={px(x, RELEASE_VIEW.w)}
    top={px(y, RELEASE_VIEW.h)}
    w={px(w, RELEASE_VIEW.w)}
    h={px(h, RELEASE_VIEW.h)}
    borderRadius="full"
    overflow="hidden"
    boxShadow="0px 4px 31px 0px #919191"
    animate={{ scale: isHighlighted ? 1.12 : 1 }}
    whileHover={{
      scale: 1.12,
      zIndex: 5,
      boxShadow: '0 10px 28px rgba(40,60,160,0.55)',
    }}
    zIndex={isHighlighted ? 5 : undefined}
  >
    <Image src={`${RELEASE_IMG}/${img}`} alt={name} w="100%" h="100%" objectFit="cover" loading="lazy" />
  </MotionBox>
);

// Pill-shaped city tag (Figma Tag_city). Hovering turns it white with a
// shadow and highlights the matching photo circle.
const CityTag = ({ name, x, y, onHover }) => (
  <Box
    position="absolute"
    left={px(x, RELEASE_VIEW.w)}
    top={px(y, RELEASE_VIEW.h)}
    bg={RELEASE_TAG_BG}
    border={`1px solid ${RELEASE_TAG_BLUE}`}
    borderRadius="2.5rem"
    px={{ base: '0.35rem', md: '0.6rem' }}
    py="0.1rem"
    cursor="default"
    transition="background-color 0.2s ease, box-shadow 0.2s ease"
    _hover={{
      bg: 'white',
      boxShadow: '1px 1px 3.25px rgba(0,0,0,0.5)',
    }}
    zIndex={3}
    onMouseEnter={() => onHover(name)}
    onMouseLeave={() => onHover(null)}
  >
    <Text
      fontFamily="Manrope"
      fontWeight={700}
      fontSize={{ base: '0.45rem', sm: '0.6rem', md: '0.775rem' }}
      color={RELEASE_TAG_BLUE}
      whiteSpace="nowrap"
      lineHeight="1.3"
    >
      {name}
    </Text>
  </Box>
);

const ReleasePanel = ({ onPrev, onNext }) => {
  const [hoveredCity, setHoveredCity] = useState(null);

  return (
    <CommitmentPanel
      heading="Release people to plant 10 churches"
      onPrev={onPrev}
      onNext={onNext}
      body={
        <>
          We will strategically send out teams to establish gospel-centered
          churches in key global cities across four regions:{' '}
          <Text as="span" fontWeight={700}>
            The Americas, Europe, East Asia, and Southeast Asia.
          </Text>
        </>
      }
    >
      <Box w="100%" maxW="797px">
        {/* Aspect-ratio box built with the padding-bottom trick instead of
            Chakra's AspectRatio, which forces overflow:hidden on its child and
            clips circles that scale up on hover at the map's edges. */}
        <Box
          position="relative"
          w="100%"
          pb={`${(RELEASE_VIEW.h / RELEASE_VIEW.w) * 100}%`}
        >
          <Box position="absolute" top={0} left={0} right={0} bottom={0}>
            {/* World map */}
            <Image
              src={`${RELEASE_IMG}/map.svg`}
              alt="World map highlighting the 10 target cities"
              position="absolute"
              left={px(RELEASE_MAP.x, RELEASE_VIEW.w)}
              top={px(RELEASE_MAP.y, RELEASE_VIEW.h)}
              w={px(RELEASE_MAP.w, RELEASE_VIEW.w)}
              h={px(RELEASE_MAP.h, RELEASE_VIEW.h)}
            />

            {/* Region labels */}
            {RELEASE_REGION_LABELS.map((r) => (
              <Text
                key={r.name}
                position="absolute"
                left={px(r.x, RELEASE_VIEW.w)}
                top={px(r.y, RELEASE_VIEW.h)}
                color={COLORS.regionLabel}
                fontFamily="Manrope"
                fontWeight={800}
                fontSize={{ base: '0.6rem', sm: '0.8rem', md: '1.3rem' }}
                textTransform="uppercase"
                whiteSpace="nowrap"
              >
                {r.name}
              </Text>
            ))}

            {/* Decorative scatter dots */}
            {RELEASE_DOTS.map((d, i) => (
              <Box
                key={i}
                position="absolute"
                left={px(d.x, RELEASE_VIEW.w)}
                top={px(d.y, RELEASE_VIEW.h)}
                w={px(RELEASE_DOT_SIZE, RELEASE_VIEW.w)}
                h={px(RELEASE_DOT_SIZE, RELEASE_VIEW.h)}
                minW="3px"
                minH="3px"
                borderRadius="full"
                bg={RELEASE_TAG_BLUE}
              />
            ))}

            {/* City tag pills */}
            {RELEASE_TAGS.map((t) => (
              <CityTag key={t.name} {...t} onHover={setHoveredCity} />
            ))}

            {/* City photo circles */}
            {RELEASE_CITIES.map((c) => (
              <CityCircle
                key={c.name}
                {...c}
                isHighlighted={hoveredCity === c.name}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </CommitmentPanel>
  );
};

export default ReleasePanel;
