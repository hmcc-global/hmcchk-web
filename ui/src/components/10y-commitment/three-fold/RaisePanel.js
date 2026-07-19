import { AspectRatio, Box, Image, Text } from '@chakra-ui/react';
import CommitmentPanel from './CommitmentPanel';
import { COLORS, RAISE_GOAL, RAISE_LAYOUT, TYC_IMG } from '../constants';

const RaisePanel = () => {
  return (
    <CommitmentPanel
      heading={`Raise ${RAISE_GOAL}`}
      body={`We will raise ${RAISE_GOAL} that will be used to resource the vision. This money is intended to provide ready capital for church plants, covering costs like facility rentals, so the church can act quickly when opportunities arise.`}
    >
      <AspectRatio ratio={796 / 433} w="100%" maxW="620px">
        <Box position="relative">
          {/* Church silhouette */}
          <Image
            src={`${TYC_IMG}/raise/vessel.svg`}
            alt="Church silhouette"
            position="absolute"
            {...RAISE_LAYOUT.vessel}
            objectFit="contain"
          />
          {/* Blue fill rising from the bottom (static for now — can animate later) */}
          <Image
            src={`${TYC_IMG}/raise/fill.svg`}
            alt=""
            aria-hidden="true"
            position="absolute"
            {...RAISE_LAYOUT.fill}
            objectFit="fill"
          />
          {/* Goal label sitting on the waterline */}
          <Text
            position="absolute"
            top={RAISE_LAYOUT.goalTop}
            left="50%"
            transform="translateX(-50%)"
            fontFamily="Manrope"
            fontWeight={800}
            fontSize={{ base: '1.25rem', md: '2.2rem' }}
            color={COLORS.brandBlue}
            whiteSpace="nowrap"
          >
            {RAISE_GOAL}
          </Text>
        </Box>
      </AspectRatio>
    </CommitmentPanel>
  );
};

export default RaisePanel;
