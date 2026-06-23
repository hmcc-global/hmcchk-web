import { AspectRatio, Box, Image } from '@chakra-ui/react';
import CommitmentPanel from './CommitmentPanel';
import { TYC_IMG } from '../constants';

const ReproducePanel = () => {
  return (
    <CommitmentPanel
      heading="Reproduce 1,000 Disciples"
      body="We will intentionally raise up 1,000 faithful followers of Christ, men and women, who are equipped to serve and go wherever God calls them."
    >
      {/* The SVG is exported with preserveAspectRatio="none", so it must live in a
          box matching its 479.421 x 422.25 viewBox or it stretches/squashes. */}
      <Box w="100%" maxW="560px" px={{ base: 2, md: 4 }}>
        <AspectRatio ratio={479.421 / 422.25} w="100%">
          <Image
            src={`${TYC_IMG}/reproduce/diagram.svg`}
            alt="Diagram showing one disciple reproducing into many"
            loading="lazy"
          />
        </AspectRatio>
      </Box>
    </CommitmentPanel>
  );
};

export default ReproducePanel;
