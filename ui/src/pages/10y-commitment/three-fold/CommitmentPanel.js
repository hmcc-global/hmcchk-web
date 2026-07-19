import { Box, Heading, Image, Text } from 'components';
import React from 'react';
import { MotionBox, MotionVStack, fadeUp, staggerContainer } from './motion';
import { TYC_IMG } from '../constants';

// One round arrow button pinned to a card edge. `flip` mirrors the (rightward
// pointing) icon to make a "previous" affordance without a second asset.
// Desktop-only per Figma — on mobile the tabs are the only way to switch.
const NavArrow = ({ onClick, side, flip }) => (
  <Box
    as="button"
    type="button"
    onClick={onClick}
    aria-label={flip ? 'Previous commitment' : 'Next commitment'}
    display={{ base: 'none', md: 'block' }}
    position="absolute"
    top="50%"
    {...{ [side]: '-17px' }}
    transform="translateY(-50%)"
    w="34px"
    h="34px"
    filter="drop-shadow(0 4px 17px rgba(0,0,0,0.45))"
    transition="transform 0.2s ease"
    _hover={{ transform: 'translateY(-50%) scale(1.1)' }}
    _focusVisible={{ outline: '3px solid #7094ff', borderRadius: 'full' }}
    zIndex={2}
  >
    <Image
      src={`${TYC_IMG}/arrow-next.svg`}
      alt=""
      w="100%"
      h="100%"
      transform={flip ? 'scaleX(-1)' : undefined}
    />
  </Box>
);

// Shared layout for each tab panel: one light-blue rounded card (per Figma
// section-release) holding a serif heading, a body paragraph, then the
// tab-specific visual passed as children. The whole panel staggers itself
// in on mount, which (with the tabs set to unmount inactive panels) means the
// content animates each time you switch to a tab. `onPrev`/`onNext` render
// round arrows on the card's edges — whichever is absent is hidden, so the
// first/last commitment only shows the one direction that's available.
const CommitmentPanel = ({ heading, body, onPrev, onNext, children }) => {
  return (
    <Box
      position="relative"
      w="100%"
      bg="#E7EDFF"
      borderRadius="1.25rem"
      px={{ base: '1rem', md: '4.75rem' }}
      py={{ base: '1.5rem', md: '1.875rem' }}
    >
      <MotionVStack
        spacing={{ base: '1.25rem', md: '1.5625rem' }}
        align="center"
        w="100%"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <MotionBox variants={fadeUp} w="100%">
          <Heading
            as="h3"
            fontFamily="DMSerifDisplay_Italic"
            fontWeight={400}
            textTransform="capitalize"
            fontSize={{ base: '1.5rem', md: '1.875rem' }}
            color="#000000"
            textAlign="center"
          >
            {heading}
          </Heading>
        </MotionBox>
        <MotionBox variants={fadeUp} w="100%">
          <Text
            fontFamily="Manrope"
            fontWeight={500}
            fontSize={{ base: '0.875rem', md: '1.125rem' }}
            letterSpacing="0.0125rem"
            color="#000000"
            textAlign="center"
            maxW="966px"
            mx="auto"
          >
            {body}
          </Text>
        </MotionBox>
        <MotionBox
          variants={fadeUp}
          w="100%"
          display="flex"
          justifyContent="center"
        >
          {children}
        </MotionBox>
      </MotionVStack>

      {onPrev && <NavArrow onClick={onPrev} side="left" flip />}
      {onNext && <NavArrow onClick={onNext} side="right" />}
    </Box>
  );
};

export default CommitmentPanel;
