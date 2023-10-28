import {
  Container,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  Box,
} from '@chakra-ui/react';
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
import supportContent from './support-sections/supportContent.json';

const TriangleTabs = ({ status }) => {
  const stat = status;
  return (
    <>
      <Flex style={{ marginTop: '25px' }}>
        <Box
          w="0"
          h="0"
          borderLeftWidth={['20px', '40px']}
          borderLeftColor="transparent"
          borderRightWidth={['20px', '40px']}
          borderRightColor="transparent"
          borderBottomWidth={['30px', '60px']}
          borderBottomColor={stat ? 'white' : 'transparent'}
        />
      </Flex>
    </>
  );
};

const RippleOutSupportContainer = () => {
  const data = supportContent;
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
            <Flex flexDir="column">
              <HStack
                w="100%"
                display="flex"
                justifyContent="center"
                spacing={{ base: 6, md: 16, lg: 28 }}
              >
                <VStack>
                  <Image
                    src={`${process.env.PUBLIC_URL}/images/ripple-out/pray.png`}
                    h={{ base: '30px', md: '60px', lg: '90px' }}
                    onClick={() => handleClick('pray')}
                    cursor="pointer"
                  />
                  <Text
                    style={tabStyle}
                    background={tabStatus === 'pray' ? '#FFFFFF' : '#C9DDED'}
                    fontSize={{ base: '10px', md: '20px', lg: '30px' }}
                    onClick={() => handleClick('pray')}
                  >
                    PRAY
                  </Text>
                  <TriangleTabs status={tabStatus === 'pray'} />
                </VStack>
                <VStack>
                  <Image
                    src={`${process.env.PUBLIC_URL}/images/ripple-out/give.png`}
                    h={{ base: '30px', md: '60px', lg: '90px' }}
                    onClick={() => handleClick('give')}
                    cursor="pointer"
                  />
                  <Text
                    style={tabStyle}
                    fontSize={{ base: '10px', md: '20px', lg: '30px' }}
                    background={tabStatus === 'give' ? '#FFFFFF' : '#C9DDED'}
                    onClick={() => handleClick('give')}
                  >
                    GIVE
                  </Text>
                  <TriangleTabs status={tabStatus === 'give'} />
                </VStack>

                <VStack>
                  <Image
                    src={`${process.env.PUBLIC_URL}/images/ripple-out/pledge.png`}
                    h={{ base: '30px', md: '60px', lg: '90px' }}
                    onClick={() => handleClick('pledge')}
                    cursor="pointer"
                  />
                  <Text
                    style={tabStyle}
                    background={tabStatus === 'pledge' ? '#FFFFFF' : '#C9DDED'}
                    fontSize={{ base: '10px', md: '20px', lg: '30px' }}
                    onClick={() => handleClick('pledge')}
                  >
                    PLEDGE
                  </Text>
                  <TriangleTabs status={tabStatus === 'pledge'} />
                </VStack>
              </HStack>
              {/* Render different tabs based on state */}

              <Flex
                flexDir="column"
                gap={9}
                padding={['1em', '4em']}
                paddingBottom={['2em', '4em']}
                style={{
                  borderRadius: 10,
                  background: '#FFFFFF',
                }}
                w="100%"
              >
                {tabStatus === 'pray' ? (
                  <RippleOutPraySection prayerData={data[0]} />
                ) : tabStatus === 'give' ? (
                  <RippleOutGiveSection giveData={data[1]} />
                ) : (
                  <RippleOutPledgeSection pledgeData={data[2]} />
                )}
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Flex>
      <RippleOutFaqSection pageTopic="ripple-out-support" />
    </>
  );
};

export default RippleOutSupportContainer;
