import { Flex, Box, Heading, Image } from '@chakra-ui/react';

import { tenYearTheme } from './theme';

const Testimony = () => {
  return (
    <Box position="relative" w="100%">
      {/* Top gradient to blend with timeline section */}
      <Box
        className="testimony-top-gradient"
        position="absolute"
        top="0"
        left="0"
        right="0"
        h="33vh"
        bgGradient="linear(180deg, #000214 0%, #0C134A 75%, rgba(16, 24, 97, 0.70) 85%, rgba(0, 13, 146, 0.00) 100%)"
        zIndex={0}
        pointerEvents="none"
      />
      <Flex
        direction="column"
        {...tenYearTheme.components.fullPageSection}
        position="relative"
        paddingX={['1.5rem', '2rem', '4rem']}
        zIndex={1}
      >
        <Heading
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={0}
        >
          <Image
            src="/images/10-year/10.svg"
            alt="10"
            h="3em"
            w="auto"
            mt={-4}
          />
          <Box as="span" {...tenYearTheme.typography.h1} ml={-8}>
            Years: The Memories
          </Box>
        </Heading>
        <iframe
          src="https://padlet.com/embed/8z5rbl41cl1ji4ax"
          width="100%"
          height="600"
          frameborder="0"
          allowfullscreen
          style={{ borderRadius: '20px', overflow: 'hidden' }}
        ></iframe>
      </Flex>
    </Box>
  );
};

export default Testimony;
