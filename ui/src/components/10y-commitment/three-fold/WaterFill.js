import { Box, keyframes, usePrefersReducedMotion } from '@chakra-ui/react';
import React from 'react';
import { MotionBox } from './motion';
import { RAISE_LAYOUT, TYC_IMG } from '../constants';

const WATER_COLOR = '#4169EB';

// Every wave tile shares this viewBox height and resting waterline, so the
// solid base of each layer lines up and they merge into one water body.
const VB_H = 24;
const REST = 15;

// Build one seamless wave-period tile as an inline SVG. `tile` is the
// wavelength (px); `crest` is the peak height in viewBox units. The path is
// one full period (so it repeats with no seam) and is solid below the resting
// line so it joins the water body underneath.
const waveURI = (tile, crest) => {
  const half = tile / 2;
  const q = tile / 4;
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${tile}' height='${VB_H}' ` +
    `viewBox='0 0 ${tile} ${VB_H}' preserveAspectRatio='none'>` +
    `<path d='M0 ${REST} q ${q} ${-crest} ${half} 0 t ${half} 0 V${VB_H} H0 Z' ` +
    `fill='${WATER_COLOR}'/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

// Scroll one tile horizontally (sign sets direction) for looping motion.
const scrollKeys = (dx) => keyframes`
  from { background-position: 0 0; }
  to   { background-position: ${dx}px 0; }
`;

// A small vertical breathe so the surface doesn't sit at a dead-flat line.
const bobKeys = (dy) => keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(${dy}px); }
`;

// Three superimposed wave layers. The wavelengths/durations are deliberately
// non-multiples of each other and the directions alternate, so the layers
// drift out of phase and the surface never visibly repeats. Back layers are
// flatter and more transparent for depth; the front layer is the solid water.
const LAYERS = [
  { tile: 97, crest: 8, opacity: 0.4, dur: 11, dir: 1, bob: 2, bobDur: 7 },
  { tile: 71, crest: 13, opacity: 0.6, dur: 8, dir: -1, bob: 1.5, bobDur: 5.5 },
  { tile: 53, crest: 18, opacity: 1, dur: 6, dir: 1, bob: 1, bobDur: 4.5 },
].map((l) => ({
  ...l,
  uri: waveURI(l.tile, l.crest),
  scroll: scrollKeys(l.dir * l.tile),
  bobKf: bobKeys(l.bob),
}));

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
        {/* Stacked wavy surfaces sitting directly on top of the water body. */}
        <Box
          position="absolute"
          bottom="100%"
          left={0}
          right={0}
          h={{ base: '18px', md: '26px' }}
          mb="-1px"
        >
          {LAYERS.map((l, i) => (
            <Box
              key={i}
              position="absolute"
              left={0}
              right={0}
              bottom={0}
              h="100%"
              opacity={l.opacity}
              backgroundImage={`url("${l.uri}")`}
              backgroundRepeat="repeat-x"
              backgroundSize={`${l.tile}px 100%`}
              sx={
                prefersReduced
                  ? undefined
                  : {
                      animation:
                        `${l.scroll} ${l.dur}s linear infinite, ` +
                        `${l.bobKf} ${l.bobDur}s ease-in-out infinite`,
                    }
              }
            />
          ))}
        </Box>
      </MotionBox>
    </MotionBox>
  );
};

export default WaterFill;
