import { Flex, Box, Text } from '@chakra-ui/react';

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
        <Text {...tenYearTheme.typography.h1}>
          <Text
            {...tenYearTheme.typography.hero}
            fontFamily="Qindom"
            fontSize={['50px', '90px']}
            textColor="#95CFFF"
            display="inline"
            position="relative"
            lineHeight="inherit"
            verticalAlign="middle"
            right="-0.5rem"
            zIndex={1}
          >
            10
          </Text>
          Years The Memories
        </Text>
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
