import { AspectRatio, Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import CommitmentPanel from './CommitmentPanel';
import WaterFill from './WaterFill';
import { useCountUp } from './motion';
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

const RaisePanel = () => {
  // Live raised amount + goal from the Fundraise table (falls back to
  // constants while loading or on error).
  const { raised, goal } = useRaiseProgress();

  // Until anything is raised, show the goal amount and a token fill so the
  // vessel isn't empty; once funds come in, show the real raised ÷ goal.
  const hasRaised = raised > 0;
  const fillRatio = hasRaised
    ? Math.min(raised / goal, 1)
    : RAISE_EMPTY_FILL_RATIO;
  const goalLabel = usd(goal);

  // Float the amount label just above the water surface (which sits at
  // `fillRatio` of the vessel box, itself offset within the artboard).
  const labelTop = `${vesselTop + (1 - fillRatio) * vesselHeight - 9}%`;

  // Trigger the fill + count-up when the visual scrolls into view.
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
  const amount = useCountUp(hasRaised, { start: inView });

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
          {/* Raised-amount label floating just above the waterline */}
          <Text
            position="absolute"
            top={labelTop}
            left="50%"
            transform="translateX(-50%)"
            fontFamily="Manrope"
            fontWeight={800}
            fontSize={{ base: '1.25rem', md: '2.2rem' }}
            color={COLORS.brandBlue}
            whiteSpace="nowrap"
          >
            {usd(amount)}
          </Text>
        </Box>
      </AspectRatio>
    </CommitmentPanel>
  );
};

export default RaisePanel;
