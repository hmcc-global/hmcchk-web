import { Image, Box } from '@chakra-ui/react';

const BackgroundElements = () => {
  return (
    <Box h="100%" position="absolute" top="0" zIndex="-1" w="100%">
      {/* Desktop */}
      <Image
        boxSize={'100%'}
        position="absolute"
        right={'45em'}
        src={`${process.env.PUBLIC_URL}/images/home/blue-background-desktop.svg`}
        w={['40%']}
        display={['none', 'block']}
      />

      {/* Mobile */}
      <Image
        position="absolute"
        src={`${process.env.PUBLIC_URL}/images/home/blue-background-mobile.svg`}
        w={['100%']}
        display={['block', 'none']}
      />
    </Box>
  );
};

export default BackgroundElements;
