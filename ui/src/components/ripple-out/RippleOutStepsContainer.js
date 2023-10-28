import { Flex, Text, Box, Container } from '@chakra-ui/react';
import RippleOutFaqSection from './RippleOutFaqSection';
import RippleOutHeroSection from './RippleOutHeroSection';
import { fontColor, headerFontSize, bodyFontSize } from './RippleOutTextStyle';

const RippleOutStepsContainer = () => {
  return (
    <>
      <RippleOutHeroSection />
      <Flex
        minH="100%"
        flexDir="column"
        bgColor="#FFFBEF"
        py={['1.8em', '4em']}
        color={fontColor}
      >
        <Container
          maxW={['container.xl']}
          h="100%"
          textStyle="darker_grotesque"
        >
          <Flex flexDir="column" gap={9}>
            <Flex flexDir="column" gap={3}>
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
          h={['60vh', '60vh', '60vh', '90vh']}
          w="screen"
          bgImage={`url(${process.env.PUBLIC_URL}/images/ripple-out/ripple-steps.png)`}
          bgSize="contain"
          bgRepeat="no-repeat"
          display={['none', 'block']}
        />
        <Box
          my={9}
          h={['60vh', '60vh', '60vh', '90vh']}
          w="screen"
          bgImage={`url(${process.env.PUBLIC_URL}/images/ripple-out/ripple-steps-mobile.png)`}
          bgSize="contain"
          bgRepeat="no-repeat"
          display={['block', 'none']}
        />
      </Flex>
      <RippleOutFaqSection pageTopic="ripple-out-steps" />
    </>
  );
};

export default RippleOutStepsContainer;
