import { AspectRatio, Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import CommitmentPanel from './CommitmentPanel';
import WaterFill from './WaterFill';
import { useCountUp } from './motion';
import {
  COLORS,
  RAISE_FILL_RATIO,
  RAISE_GOAL,
  RAISE_LAYOUT,
  RAISE_RAISED_USD,
  TYC_IMG,
} from '../constants';

// Float the goal label just above the water surface (which sits at
// `ratio` of the vessel box, itself offset within the artboard).
const vesselTop = parseFloat(RAISE_LAYOUT.vessel.top);
const vesselHeight = parseFloat(RAISE_LAYOUT.vessel.h);
const labelTop = `${vesselTop + (1 - RAISE_FILL_RATIO) * vesselHeight - 9}%`;

const RaisePanel = () => {
  // Trigger the fill + count-up when the visual scrolls into view.
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
  const raised = useCountUp(RAISE_RAISED_USD, { start: inView });

  return (
    <CommitmentPanel
      heading={`Raise ${RAISE_GOAL}`}
      body="We will raise $500,000 USD that will be used to resource the vision. This money is intended to provide ready capital for church plants, covering costs like facility rentals, so the church can act quickly when opportunities arise."
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
          <WaterFill ratio={RAISE_FILL_RATIO} start={inView} />
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
            {`$${raised.toLocaleString('en-US')} USD`}
          </Text>
        </Box>
      </AspectRatio>
    </CommitmentPanel>
  );
};

export default RaisePanel;
