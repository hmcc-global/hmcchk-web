import { AspectRatio, Box, Image, Text } from 'components';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import CommitmentPanel from './CommitmentPanel';
import WaterFill from './WaterFill';
import { useCountUp } from './motion';
import { useRaiseProgress } from './useRaiseProgress';
import {
  RAISE_EMPTY_FILL_RATIO,
  RAISE_FALLBACK_GOAL,
  RAISE_LAYOUT,
  TYC_IMG,
} from '../constants';

const usd = (n) => `$${n.toLocaleString('en-US')} USD`;

const RaisePanel = ({ onPrev, onNext }) => {
  // Live raised amount + goal from the Fundraise table. The goal falls back
  // to the campaign default while the row loads (or if its milestone is
  // missing), so the heading and fill ratio never see a zero goal.
  const { raised, goal: liveGoal } = useRaiseProgress();
  const goal = liveGoal > 0 ? liveGoal : RAISE_FALLBACK_GOAL;

  // Until anything is raised, show the goal amount and a token fill so the
  // vessel isn't empty; once funds come in, show the real raised ÷ goal.
  const hasRaised = raised > 0;
  const fillRatio = hasRaised
    ? Math.min(raised / goal, 1)
    : RAISE_EMPTY_FILL_RATIO;
  const target = hasRaised ? raised : goal;
  const goalLabel = usd(goal);

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
          {/* Raised-amount label at a fixed spot in the artwork, per Figma
              (node 55:1697 / 55:1976): it does not move as fillRatio
              changes - only the water level and the number itself do. */}
          <Text
            position="absolute"
            top={RAISE_LAYOUT.amountAnchorTop}
            left="50%"
            transform="translate(-50%, -50%)"
            fontFamily="Manrope"
            fontWeight={800}
            fontSize={{ base: '1.25rem', md: '2.2rem' }}
            color="white"
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
