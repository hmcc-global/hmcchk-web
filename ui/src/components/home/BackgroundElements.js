import { Image, Box } from '@chakra-ui/react';

const BackgroundElements = () => {
  return (
    <Box h="100%" position="absolute" top="0" zIndex="0" w="100%">
      {/* Desktop */}
      <Image
        position="absolute"
        top={['17em', '0']}
        right="0"
        src={`${process.env.PUBLIC_URL}/images/home/blue-background-desktop.svg`}
        w={['100%', '40%']}
        display={['block']}
      />
    </Box>
  );
};

export default BackgroundElements;
