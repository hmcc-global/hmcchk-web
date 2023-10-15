import { Box, Container, Flex, Text, Center, HStack } from '@chakra-ui/react';
import RippleOutSubHero from './RippleOutSubHero';
import RippleOutTakePartSection from './RippleOutTakePartSection';
import RippleOutSupportGiveSection from './RippleOutSupportGiveSection';
import RippleOutFaqSection from './RippleOutFaqSection';
import RippleOutSpaceSection from './RippleOutSpaceSection';
import ProgressSection from './ProgressSection';
import { useRef } from 'react';

const headerFontSize = ['2.5em', '4.25em'];
const bodyFontSize = '1.4em';
const fontColor = '#182E57';

const RippleOutContainer = () => {
  const storyRef = useRef(null);
  const stepsRef = useRef(null);
  const spaceRef = useRef(null);
  const supportRef = useRef(null);
  const navStyle = {
    color: '#F0F0F0',
    fontFamily: 'Inter',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '32px' /* 177.778% */,
    textDecorationLine: 'underline',
    cursor: 'pointer',
  };
  const navStyleMobile = {
    color: '#F0F0F0',
    fontFamily: 'Inter',
    fontSize: '8px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '8.711px' /* 177.778% */,
    textDecorationLine: 'underline',
    cursor: 'pointer',
  };
  const navDotStyle = {
    borderRadius: '20px',
    borderColor: '#F0F0F0',
    border: '3px #F0F0F0 solid',
  };
  const navDotStyleMobile = {
    borderRadius: '20px',
    borderColor: '#F0F0F0',
    border: '1.2px #F0F0F0 solid',
  };

  return (
    <>
      {/* Hero section - desktop */}
      <Box
        w="full"
        h="100%"
        bgImage={`url(${process.env.PUBLIC_URL}/images/ripple-out/ripple-out-hero.png)`}
        bgSize="cover"
        bgPos={['right', 'center']}
        display={['none', 'block']}
      >
        <Container maxW={['container.xl']} h="100%">
          <Center
            h="full"
            flexDirection="column"
            justifyContent="space-between"
          >
            <HStack paddingTop="40px" />
            <Flex w="100%" flexDir="column" color="#ffffff">
              <Text
                textStyle="darker_grotesque_bold"
                fontWeight="900"
                fontSize={['4em', '8em', '8em', '14em']}
                lineHeight={['1em', '0em']}
              >
                RIPPLE OUT
              </Text>
              <Text
                textStyle="darker_grotesque"
                fontSize={['3em', '6em', '6em', '12em']}
              >
                CAMPAIGN
              </Text>
            </Flex>
            <HStack
              alignItems="center"
              w="100%"
              paddingBottom="20px"
              spacing={8}
            >
              <Text
                style={navStyle}
                onClick={() =>
                  storyRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest',
                  })
                }
              >
                THE STORY
              </Text>
              <Box style={navDotStyle} />
              <Text
                style={navStyle}
                onClick={() =>
                  stepsRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest',
                  })
                }
              >
                THE STEPS
              </Text>
              <Box style={navDotStyle} />
              <Text
                style={navStyle}
                onClick={() =>
                  spaceRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest',
                  })
                }
              >
                THE SPACE
              </Text>
              <Box style={navDotStyle} />
              <Text
                style={navStyle}
                onClick={() =>
                  supportRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest',
                  })
                }
              >
                THE SUPPORT
              </Text>
            </HStack>
          </Center>
        </Container>
      </Box>
      {/* Hero section - mobile */}
      <Box
        w="full"
        h="36%"
        bgImage={`url(${process.env.PUBLIC_URL}/images/ripple-out/ripple-out-hero-mobile.png)`}
        bgSize="cover"
        bgPos={['right', 'center']}
        display={['block', 'none']}
      >
        <Container maxW={['container.xl']} h="100%">
          <Center
            h="full"
            flexDirection="column"
            justifyContent="space-between"
          >
            <HStack paddingTop="40px" />
            <Flex w="100%" flexDir="column" color="#ffffff">
              <Text
                textStyle="darker_grotesque_bold"
                fontWeight="900"
                fontSize={['4em', '14em']}
                lineHeight={['0.25em', '0em']}
              >
                RIPPLE OUT
              </Text>
              <Text textStyle="darker_grotesque" fontSize={['3em', '12em']}>
                CAMPAIGN
              </Text>
            </Flex>
            <HStack
              alignItems="center"
              w="100%"
              paddingBottom="20px"
              spacing={2}
            >
              <Text
                style={navStyleMobile}
                onClick={() =>
                  storyRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest',
                  })
                }
              >
                THE STORY
              </Text>
              <Box style={navDotStyleMobile} />
              <Text
                style={navStyleMobile}
                onClick={() =>
                  stepsRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest',
                  })
                }
              >
                THE STEPS
              </Text>
              <Box style={navDotStyleMobile} />
              <Text
                style={navStyleMobile}
                onClick={() =>
                  spaceRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest',
                  })
                }
              >
                THE SPACE
              </Text>
              <Box style={navDotStyleMobile} />
              <Text
                style={navStyleMobile}
                onClick={() =>
                  supportRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest',
                  })
                }
              >
                THE SUPPORT
              </Text>
            </HStack>
          </Center>
        </Container>
      </Box>
      <Flex
        minH="100%"
        flexDir="column"
        bgColor="#FFFBEF"
        py={['1.8em', '4em']}
        color={fontColor}
        ref={storyRef}
      >
        <Container
          maxW={['container.xl']}
          h="100%"
          textStyle="darker_grotesque"
        >
          <Flex flexDir="column" gap={9}>
            <RippleOutSubHero
              headerFontSize={headerFontSize}
              bodyFontSize={bodyFontSize}
            />
            <ProgressSection />

            <Flex flexDir="column" gap={3} ref={stepsRef}>
              <Text
                fontSize={headerFontSize}
                textStyle="darker_grotesque_black"
                color="#182E57"
                lineHeight="0.9em"
              >
                THE STEPS
              </Text>
              <Text fontSize={bodyFontSize}>
                As you prayerfully consider giving to the campaign, you are not
                just simply giving a sum to a campaign or facility, but you are
                giving towards a larger vision so that we can accomplish all
                that God has called us and see life transformation through the
                Gospel
              </Text>
            </Flex>
          </Flex>
        </Container>

        {/* Ripple steps drops image - desktop & mobile */}
        <Box
          my={9}
          h={['60vh', '40vh', '50vh', '85vh']}
          w="screen"
          bgImage={`url(${process.env.PUBLIC_URL}/images/ripple-out/ripple-steps.png)`}
          bgSize="contain"
          bgRepeat="no-repeat"
          bgColor="#34486F"
          display={['none', 'block']}
        />
        <Box
          my={9}
          h={['40vh', '50vh', '50vh', '50vh']}
          w="screen"
          bgImage={`url(${process.env.PUBLIC_URL}/images/ripple-out/ripple-steps-mobile.png)`}
          bgSize="contain"
          bgRepeat="no-repeat"
          bgColor="#34486F"
          display={['block', 'none']}
        />

        <RippleOutTakePartSection
          headerFontSize={headerFontSize}
          bodyFontSize={bodyFontSize}
        />
      </Flex>

      {/* The space section */}
      <Flex
        minH="100%"
        flexDir="column"
        bgColor="#C9DDED"
        py={['1.8em', '4em']}
        color={fontColor}
        ref={spaceRef}
      >
        <RippleOutSpaceSection
          headerFontSize={headerFontSize}
          bodyFontSize={bodyFontSize}
        />
      </Flex>
      {/* The support and how to give section */}
      <Flex
        minH="100%"
        flexDir="column"
        bgColor="#FFFBEF"
        py={['1.8em', '4em']}
        color={fontColor}
        ref={supportRef}
      >
        <RippleOutSupportGiveSection
          headerFontSize={headerFontSize}
          bodyFontSize={bodyFontSize}
        />
      </Flex>

      {/* FAQ section */}
      <Flex
        minH="100%"
        flexDir="column"
        bgColor="#C9DDED"
        py={['1.8em', '4em']}
        color={fontColor}
      >
        <RippleOutFaqSection headerFontSize={headerFontSize} />
      </Flex>
    </>
  );
};

export default RippleOutContainer;
