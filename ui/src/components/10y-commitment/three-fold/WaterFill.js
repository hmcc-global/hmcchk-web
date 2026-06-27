import { Box, keyframes, usePrefersReducedMotion } from '@chakra-ui/react';
import React from 'react';
import { MotionBox } from './motion';
import { RAISE_LAYOUT, TYC_IMG } from '../constants';

const WATER_COLOR = '#4169EB';
const TILE = 80; // px width of one repeating wave tile

// One seamless wave period as an inline SVG. The bottom half is solid so it
// joins the water body; the top edge is a tall, pronounced crest.
const WAVE = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='24' viewBox='0 0 40 24' preserveAspectRatio='none'><path d='M0 13 q 10 -11 20 0 t 20 0 V24 H0 Z' fill='${WATER_COLOR}'/></svg>`;
const WAVE_URI = `data:image/svg+xml,${encodeURIComponent(WAVE)}`;

// Scroll the wave horizontally by one tile for continuous, looping motion.
// Use the standard `background-position` shorthand (the `-x` longhand isn't
// reliably animatable across browsers).
const waveScroll = keyframes`
  from { background-position: 0px 0; }
  to   { background-position: ${TILE}px 0; }
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
          h={{ base: '16px', md: '24px' }}
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
