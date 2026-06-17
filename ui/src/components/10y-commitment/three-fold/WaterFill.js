import { Box, keyframes, usePrefersReducedMotion } from '@chakra-ui/react';
import React from 'react';
import { MotionBox } from './motion';
import { RAISE_LAYOUT, TYC_IMG } from '../constants';

const WATER_COLOR = '#4169EB';
const TILE = 80; // px width of one repeating wave tile

// One seamless, gentle wave period as an inline SVG. The bottom half is solid
// so it joins the water body; the top edge is the (small-amplitude) crest.
const WAVE = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='12' viewBox='0 0 40 12' preserveAspectRatio='none'><path d='M0 6 q 10 -5 20 0 t 20 0 V12 H0 Z' fill='${WATER_COLOR}'/></svg>`;
const WAVE_URI = `data:image/svg+xml,${encodeURIComponent(WAVE)}`;

// Scroll the wave horizontally by one tile for continuous, looping motion.
const waveScroll = keyframes`
  from { background-position-x: 0px; }
  to   { background-position-x: ${TILE}px; }
`;

// A blue water layer masked to the vessel silhouette. It rises to `ratio` of
// the vessel height once `start` is true, then the surface keeps undulating.
const WaterFill = ({ ratio, start }) => {
  const prefersReduced = usePrefersReducedMotion();
  const level = `${Math.min(Math.max(ratio, 0), 1) * 100}%`;
  const maskUrl = `url(${TYC_IMG}/raise/vessel.svg)`;

  return (
    <MotionBox
      position="absolute"
      {...RAISE_LAYOUT.vessel}
      overflow="hidden"
      pointerEvents="none"
      sx={{
        maskImage: maskUrl,
        WebkitMaskImage: maskUrl,
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
      }}
    >
      {/* Water body — height animates from empty to the funding ratio. */}
      <MotionBox
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        bg={WATER_COLOR}
        initial={{ height: '0%' }}
        animate={{ height: start ? level : '0%' }}
        transition={
          prefersReduced
            ? { duration: 0 }
            : { duration: 1.8, ease: [0.22, 1, 0.36, 1] }
        }
      >
        {/* Wavy surface sitting directly on top of the water body. */}
        <Box
          position="absolute"
          bottom="100%"
          left={0}
          right={0}
          h={{ base: '8px', md: '12px' }}
          mb="-1px"
          backgroundImage={`url("${WAVE_URI}")`}
          backgroundRepeat="repeat-x"
          backgroundSize={`${TILE}px 100%`}
          animation={prefersReduced ? undefined : `${waveScroll} 3.5s linear infinite`}
        />
      </MotionBox>
    </MotionBox>
  );
};

export default WaterFill;
