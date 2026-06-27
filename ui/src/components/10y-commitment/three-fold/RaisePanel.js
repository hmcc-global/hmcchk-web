import {
  AspectRatio,
  Box,
  Image,
  Text,
  usePrefersReducedMotion,
} from '@chakra-ui/react';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import CommitmentPanel from './CommitmentPanel';
import WaterFill from './WaterFill';
import { MotionBox, useCountUp } from './motion';
import { useRaiseProgress } from './useRaiseProgress';
import {
  COLORS,
  RAISE_EMPTY_FILL_RATIO,
  RAISE_LAYOUT,
  TYC_IMG,
} from '../constants';

const vesselTop = parseFloat(RAISE_LAYOUT.vessel.top);
const vesselHeight = parseFloat(RAISE_LAYOUT.vessel.h);
const usd = (n) => `$${n.toLocaleString('en-US')} USD`;

// The number reads in the brand blue above the waterline and flips to white
// where it's submerged (design spec: the water colour overlays the text as
// the fill rises through it).
const ABOVE_WATER = COLORS.brandBlue;
const UNDER_WATER = '#FFFFFF';

// Shared so the two stacked copies (base + submerged) line up exactly.
const labelStyle = {
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontFamily: 'Manrope',
  fontWeight: 800,
  fontSize: { base: '1.25rem', md: '2.2rem' },
  whiteSpace: 'nowrap',
};

const RaisePanel = () => {
  const prefersReduced = usePrefersReducedMotion();

  // Live raised amount + goal from the Fundraise table.
  const { raised, goal } = useRaiseProgress();

  // Until anything is raised, show the goal amount and a token fill so the
  // vessel isn't empty; once funds come in, show the real raised ÷ goal.
  const hasRaised = raised > 0;
  const fillRatio = hasRaised
    ? Math.min(raised / goal, 1)
    : RAISE_EMPTY_FILL_RATIO;
  const target = hasRaised ? raised : goal;
  const goalLabel = usd(goal);

  // The waterline as a % of the panel box; the number is centred on it so the
  // fill rises through the digits. The submerged copy is clipped to the water
  // region (everything below the waterline) and revealed in sync with the fill.
  const waterlineTop = vesselTop + (1 - fillRatio) * vesselHeight;
  const clipEmpty = 'inset(100% 0 0 0)';
  const clipToWater = `inset(${waterlineTop}% 0 0 0)`;
  const waterTransition = prefersReduced
    ? { duration: 0 }
    : { duration: 1.8, ease: [0.22, 1, 0.36, 1] };

  // Trigger the fill + count-up when the visual scrolls into view.
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
  const amount = useCountUp(target, { start: inView });

  return (
    <CommitmentPanel
      heading={`Raise ${goalLabel}`}
      body={`We will raise ${goalLabel} that will be used to resource the vision. This money is intended to provide ready capital for church plants, covering costs like facility rentals, so the church can act quickly when opportunities arise.`}
    >
      <AspectRatio ref={ref} ratio={796 / 433} w="100%" maxW="620px">
        <Box position="relative">
          {/* Empty vessel silhouette */}
          <Image
            src={`${TYC_IMG}/raise/vessel.svg`}
            alt="Church silhouette"
            position="absolute"
            {...RAISE_LAYOUT.vessel}
            objectFit="contain"
          />
          {/* Animated water, masked to the silhouette, filled to the ratio */}
          <WaterFill ratio={fillRatio} start={inView} />
          {/* Base copy: the whole number in the above-water colour. */}
          <Text {...labelStyle} top={`${waterlineTop}%`} color={ABOVE_WATER}>
            {usd(amount)}
          </Text>
          {/* Submerged copy: same number, clipped to the water region and
              revealed as the fill rises, painting the underwater part white. */}
          <MotionBox
            position="absolute"
            inset={0}
            pointerEvents="none"
            initial={{ clipPath: clipEmpty }}
            animate={{ clipPath: inView ? clipToWater : clipEmpty }}
            transition={waterTransition}
          >
            <Text {...labelStyle} top={`${waterlineTop}%`} color={UNDER_WATER}>
              {usd(amount)}
            </Text>
          </MotionBox>
        </Box>
      </AspectRatio>
    </CommitmentPanel>
  );
};

export default RaisePanel;
