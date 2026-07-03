import { AspectRatio, Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import CommitmentPanel from './CommitmentPanel';
import WaterFill from './WaterFill';
import { useCountUp } from './motion';
import { useRaiseProgress } from './useRaiseProgress';
import {
  RAISE_EMPTY_FILL_RATIO,
  RAISE_LAYOUT,
  TYC_IMG,
} from '../constants';

const vesselTop = parseFloat(RAISE_LAYOUT.vessel.top);
const vesselHeight = parseFloat(RAISE_LAYOUT.vessel.h);
const usd = (n) => `$${n.toLocaleString('en-US')} USD`;

const RaisePanel = ({ onPrev, onNext }) => {
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

  // The water surface sits at `fillRatio` of the vessel box, itself offset
  // within the artboard. The label is anchored at that line, then shifted up
  // by the *dry* fraction of its own height via translateY — CSS resolves a
  // translateY percentage against the element's own box, not the container,
  // so this submerges exactly `fillRatio` of the glyphs with no JS
  // measurement: fillRatio 0.2 wets the bottom 20%, 0.8 wets the bottom 80%.
  const waterlineTop = `${vesselTop + (1 - fillRatio) * vesselHeight}%`;
  const dryShift = `${-(1 - fillRatio) * 100}%`;

  // Trigger the fill + count-up when the visual scrolls into view.
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
  const amount = useCountUp(target, { start: inView });

  return (
    <CommitmentPanel
      heading={`Raise ${goalLabel}`}
      onPrev={onPrev}
      onNext={onNext}
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
          {/* Raised-amount label centered on the waterline. Figma paints it
              gold with mix-blend-mode: difference, which is what produces the
              two-tone split — deep blue against the light card above water,
              pink-purple against the blue water below — and lets the moving
              wave crests re-colour the letters as they pass. */}
          <Text
            position="absolute"
            top={waterlineTop}
            left="50%"
            transform={`translate(-50%, ${dryShift})`}
            fontFamily="Manrope"
            fontWeight={800}
            fontSize={{ base: '1.25rem', md: '2.2rem' }}
            color="#EBB733"
            sx={{ mixBlendMode: 'difference' }}
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
