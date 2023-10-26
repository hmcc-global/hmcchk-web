import { Container, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react';
import RippleOutFaqSection from './RippleOutFaqSection';
import RippleOutHeroSection from './RippleOutHeroSection';
import {
  fontColor,
  headerFontSize,
  bodyFontSize,
  subHeaderFontSize,
} from './RippleOutTextStyle';
import RippleOutGiveSection from './support-sections/RippleOutGiveSection';
import { useState } from 'react';
import RippleOutPraySection from './support-sections/RippleOutPraySection';
import RippleOutPledgeSection from './support-sections/RippleOutPledgeSection';

const RippleOutSupportContainer = () => {
  const supportText =
    "Our Ripple Out Campaign aims to fund the facility's preparation, reflecting Christ's generosity and enabling us to reach more people with the Gospel. We believe that we are not just simply giving a sum to a campaign or facility, but giving towards a larger vision so that we can see more lives transformed. Join us as we invest in God’s work!";
  const supportWaysText =
    'Click the buttons below to learn more about how to support the Ripple Out Campaign and respond to God’s calling through prayer, giving, and pledging to the campaign.';
  const tabStyle = {
    borderRadius: '10px',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    padding: '0.5em 3em',
    color: '#182E57',
    fontWeight: 800,
    cursor: 'pointer',
  };
  const [tabStatus, setTabStatus] = useState('pray');

  const handleClick = (tabName) => {
    setTabStatus(tabName);
  };
  return (
    <>
      <RippleOutHeroSection />
      <Flex
        minH="100%"
        flexDir="column"
        background="linear-gradient(180deg, #F0F5FF 10.74%, #E9F6FF 22.35%, #FFFAEC 99.87%)"
        py={['1.8em', '4em']}
        color={fontColor}
      >
        <Container maxW={['container.xl']}>
          <Flex flexDir="column" gap={9} textStyle="darker_grotesque">
            {/* Header of support */}
            <Flex flexDir="column" gap={3}>
              <Text
                fontSize={headerFontSize}
                textStyle="darker_grotesque_black"
                lineHeight="0.9em"
              >
                THE SUPPORT
              </Text>
              <Text fontSize={bodyFontSize}>{supportText}</Text>
              <Text
                fontSize={subHeaderFontSize}
                textStyle="darker_grotesque_black"
                lineHeight="0.9em"
              >
                WAYS TO SUPPORT
              </Text>
              <Text fontSize={bodyFontSize}>{supportWaysText}</Text>
            </Flex>
            {/* Beginning of tabs */}
            <HStack
              w="100%"
              display="flex"
              justifyContent="center"
              spacing={[6, 28]}
            >
              <VStack>
                <Image
                  src={`${process.env.PUBLIC_URL}/images/ripple-out/pray.png`}
                  h={['30px', '90px']}
                  onClick={() => handleClick('pray')}
                  cursor="pointer"
                />
                <Text
                  style={tabStyle}
                  background={tabStatus === 'pray' ? '#FFFFFF' : '#C9DDED'}
                  fontSize={['10px', '30px']}
                  onClick={() => handleClick('pray')}
                >
                  PRAY
                </Text>
              </VStack>
              <VStack>
                <Image
                  src={`${process.env.PUBLIC_URL}/images/ripple-out/give.png`}
                  h={['30px', '90px']}
                  onClick={() => handleClick('give')}
                  cursor="pointer"
                />
                <Text
                  style={tabStyle}
                  fontSize={['10px', '30px']}
                  background={tabStatus === 'give' ? '#FFFFFF' : '#C9DDED'}
                  onClick={() => handleClick('give')}
                >
                  GIVE
                </Text>
              </VStack>

              <VStack>
                <Image
                  src={`${process.env.PUBLIC_URL}/images/ripple-out/pledge.png`}
                  h={['30px', '90px']}
                  onClick={() => handleClick('pledge')}
                  cursor="pointer"
                />
                <Text
                  style={tabStyle}
                  background={tabStatus === 'pledge' ? '#FFFFFF' : '#C9DDED'}
                  fontSize={['10px', '30px']}
                  onClick={() => handleClick('pledge')}
                >
                  PLEDGE
                </Text>
              </VStack>
            </HStack>
            {/* Render different tabs based on state */}
            {tabStatus === 'pray' ? (
              <RippleOutPraySection />
            ) : tabStatus === 'give' ? (
              <RippleOutGiveSection />
            ) : (
              <RippleOutPledgeSection />
            )}
          </Flex>
        </Container>
      </Flex>
      <RippleOutFaqSection />
    </>
  );
};

export default RippleOutSupportContainer;
