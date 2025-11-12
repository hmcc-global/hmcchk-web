import { Box, Container, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { tenYearTheme } from './theme';

const HeroSection = () => {
  const vidRef = useRef();

  useEffect(() => {
    if (vidRef.current) {
      vidRef.current.addEventListener('loadedmetadata', (e) => {
        vidRef.current.play();
      });
    }
  }, vidRef);

  return (
    <Flex
      {...tenYearTheme.components.fullPageSection}
      h="100vh"
      px="0"
      zIndex={2}
    >
      <Flex
        as="video"
        ref={vidRef}
        w="100%"
        h="100vh"
        src={process.env.PUBLIC_URL + '/images/10-year/hero-loop.mp4'}
        loop
        muted
        objectFit="cover"
        justify="center"
        playsInline
        zIndex="0"
        position="absolute"
      />
      <HStack
        bgImage={{
          base: `url('${process.env.PUBLIC_URL}/images/10-year/waves-mobile-bg.png')`,
          md: `url('${process.env.PUBLIC_URL}/images/10-year/waves-bg.png')`,
        }}
        bgPos="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        zIndex={1}
        w="100%"
        h="100%"
        justifyContent="space-between"
        paddingTop={['2rem', '3.5rem']}
        paddingX={['1.5rem', '4rem']}
      >
        <Flex w="25%" h="25%" alignSelf="start" alignItems="start">
          <Text
            {...tenYearTheme.typography.hero}
            fontFamily="Qindom"
            fontSize={['50px', '95px']}
            textColor="#95CFFF"
            position="relative"
            top={['-1.3rem', '-1.8rem']}
            right="-0.9rem"
          >
            t
          </Text>
          <Box marginLeft="1rem" position="absolute">
            <Text
              {...tenYearTheme.typography.hero}
              position="absolute"
              marginLeft={['1', '3']}
            >
              ransfor
            </Text>
            <Text
              {...tenYearTheme.typography.hero}
              position="absolute"
              top={['0.5rem', '1.4rem']}
            >
              mat
              <Text
                {...tenYearTheme.typography.hero}
                fontFamily="Qindom"
                fontSize={['30px', '55px']}
                textColor="#95CFFF"
                display="inline"
                position="relative"
                lineHeight="inherit"
                verticalAlign="middle"
                zIndex={1}
              >
                10
              </Text>
              n
            </Text>
          </Box>
        </Flex>
        <Flex
          w={['80%', '50%']}
          flexDir="column"
          alignSelf={['center', 'flex-end']}
          alignItems="flex-end"
          paddingBottom="10vh"
          paddingTop={['8', '0']}
        >
          <Text {...tenYearTheme.typography.title} lineHeight={['0.7', '0.9']}>
            Witness
            <Text whiteSpace="normal" display={['inline', 'none']}>
              {' '}
            </Text>
            <Text
              {...tenYearTheme.typography.hero}
              fontFamily="Qindom"
              fontSize={['60px', '80px']}
              textColor="#95CFFF"
              display="inline"
              position="relative"
              lineHeight="inherit"
              verticalAlign="bottom"
              right={['0', '-1rem']}
              zIndex={1}
            >
              10
            </Text>
            <Text
              {...tenYearTheme.typography.title}
              position="relative"
              lineHeight="inherit"
              verticalAlign="middle"
              display={['none', 'inline']}
            >
              Years of
            </Text>
            <Text
              {...tenYearTheme.typography.title}
              position="relative"
              lineHeight="inherit"
              verticalAlign="middle"
              display={['inline', 'none']}
            >
              Years
            </Text>
          </Text>
          <Text {...tenYearTheme.typography.title} lineHeight={['0.7', '0.9']}>
            <Text
              {...tenYearTheme.typography.title}
              position="relative"
              lineHeight="inherit"
              verticalAlign="middle"
              display={['inline', 'none']}
              left={['0', '-1rem']}
              whiteSpace="pre"
            >
              of{'   '}
            </Text>
            <Text
              {...tenYearTheme.typography.hero}
              fontFamily="Qindom"
              fontSize={['70px', '90px']}
              textColor="#95CFFF"
              display="inline"
              position="relative"
              lineHeight="inherit"
              verticalAlign="middle"
              zIndex={1}
            >
              t
            </Text>
            ransformation
          </Text>
          <Text {...tenYearTheme.typography.title} lineHeight={['0.7', '0.9']}>
            at HMCC-HK
          </Text>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default HeroSection;
