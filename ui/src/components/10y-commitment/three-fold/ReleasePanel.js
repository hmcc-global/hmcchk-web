import { AspectRatio, Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import CommitmentPanel from './CommitmentPanel';
import {
  px,
  COLORS,
  RELEASE_VIEW,
  RELEASE_MAP,
  RELEASE_CITIES,
  RELEASE_REGION_LABELS,
  RELEASE_IMG,
} from '../constants';

// A circular city photo pinned at its geographic location. The city name is
// baked into the image (exported from Figma), so we only clip it to a circle
// and add the drop shadow here.
// Memoized since RELEASE_CITIES is static — avoids re-rendering all circles.
const CityCircle = React.memo(({ name, img, x, y, w, h }) => (
  <Box
    position="absolute"
    left={px(x, RELEASE_VIEW.w)}
    top={px(y, RELEASE_VIEW.h)}
    w={px(w, RELEASE_VIEW.w)}
    h={px(h, RELEASE_VIEW.h)}
    borderRadius="full"
    overflow="hidden"
    boxShadow="0 3px 14px rgba(80,80,80,0.45)"
  >
    <Image src={`${RELEASE_IMG}/${img}`} alt={name} w="100%" h="100%" objectFit="cover" loading="lazy" />
  </Box>
));
CityCircle.displayName = 'CityCircle';

const ReleasePanel = () => {
  return (
    <CommitmentPanel
      heading="Release people to plant 10 churches"
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
      <Box
        w="100%"
        maxW="900px"
        bg="#E7EDFF"
        borderRadius="1.25rem"
        p={{ base: 4, md: 8 }}
      >
        <AspectRatio ratio={RELEASE_VIEW.w / RELEASE_VIEW.h} w="100%">
          <Box position="relative" overflow="visible">
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
                fontSize={{ base: '0.6rem', sm: '0.8rem', md: '1.1rem' }}
                textTransform="uppercase"
                whiteSpace="nowrap"
              >
                {r.name}
              </Text>
            ))}

            {/* City photo circles */}
            {RELEASE_CITIES.map((c) => (
              <CityCircle key={c.name} {...c} />
            ))}
          </Box>
        </AspectRatio>
      </Box>
    </CommitmentPanel>
  );
};

export default ReleasePanel;
