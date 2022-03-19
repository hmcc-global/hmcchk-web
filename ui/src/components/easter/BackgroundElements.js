import { Image, Box } from '@chakra-ui/react';

const BackgroundElements = () => {
  return (
    <Box h="100%" position="absolute" top="0" zIndex="0" w="100%">
      {/* Desktop */}
      <Image
        position="absolute"
        top="17em"
        right="0"
        src={`${process.env.PUBLIC_URL}/images/easter/background/blue-gradient-desktop.svg`}
        w="40%"
        display={['none', 'block']}
      />
      <Image
        position="absolute"
        top="50em"
        left="0"
        w="50%"
        src={`${process.env.PUBLIC_URL}/images/easter/background/pink-gradient-desktop.svg`}
        display={['none', 'block']}
      />
      <Image
        position="absolute"
        bottom="0"
        right="0"
        w="35%"
        src={`${process.env.PUBLIC_URL}/images/easter/background/yellow-gradient-desktop.svg`}
        display={['none', 'block']}
      />

      {/* Mobile */}
      <Image
        position="absolute"
        top="30em"
        right="0"
        src={`${process.env.PUBLIC_URL}/images/easter/background/blue-gradient-mobile.svg`}
        w="40%"
        display={['block', 'none']}
      />
      <Image
        position="absolute"
        top="45em"
        left="0"
        w="70%"
        src={`${process.env.PUBLIC_URL}/images/easter/background/pink-gradient-mobile.svg`}
        display={['block', 'none']}
      />
      <Image
        position="absolute"
        bottom="0"
        right="0"
        w="70%"
        src={`${process.env.PUBLIC_URL}/images/easter/background/yellow-gradient-mobile.svg`}
        display={['block', 'none']}
      />
    </Box>
  );
};

export default BackgroundElements;
