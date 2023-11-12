import {
  Box,
  Container,
  Text,
  Flex,
  Center,
  Image,
  Spacer,
  Link,
  VStack,
  Button,
} from '@chakra-ui/react';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/material.css';
import 'tippy.js/dist/tippy.css';
import './custom-theme.css';
import RippleOutFaqSection from './RippleOutFaqSection';
import RippleOutHeroSection from './RippleOutHeroSection';
import { fontColor, headerFontSize, bodyFontSize } from './RippleOutTextStyle';

const RippleOutSpaceContainer = () => {
  const dotStyle = {
    borderRadius: '50%',
    boxShadow: '0 10px 10px -2px #424B5E',
  };

  return (
    <>
      <RippleOutHeroSection />
      <Flex
        minH="100%"
        flexDir="column"
        bgColor="#C9DDED"
        py={['1.8em', '4em']}
        color={fontColor}
        background="linear-gradient(180deg, #F0F5FF 10.74%, #E9F6FF 22.35%, #FFFAEC 99.87%)"
      >
        <Container
          maxW={['container.xl']}
          h="100%"
          textStyle="darker_grotesque"
        >
          <Text
            fontSize={headerFontSize}
            textStyle="darker_grotesque_black"
            lineHeight="0.9em"
          >
            THE SPACE
          </Text>
          <Text
            fontSize={['xl', '3xl']}
            lineHeight="0.9em"
            textStyle="darker_grotesque_semibold"
            paddingBottom="2em"
            paddingTop="1em"
          >
            TRANSFORMATION CENTER, 22/F CROCODILE CENTER, KWUN TONG
          </Text>

          <Box
            w={['91vw', '61vw']}
            h={['29vh', '61vh']}
            mx="auto"
            paddingTop={[1, 2]}
            borderRadius="1em"
            border="5em"
            bgColor="#34486F"
          >
            <Center
              w={'98%'}
              h={'98%'}
              m="auto"
              borderRadius="1em"
              bgImage={`url('${process.env.PUBLIC_URL}/images/ripple-out/ripple-map.png')`}
              bgPosition="center"
              bgSize="cover"
            >
              <Tippy
                theme="custom-theme"
                content={
                  <Box
                    textAlign="center"
                    w="6em"
                    h="3em"
                    textStyle="darker_grotesque_semibold"
                    fontSize={['1.1em', 'xl']}
                  >
                    Crocodile Center
                  </Box>
                }
                placement="top"
              >
                <Box
                  top={['-9vh', '-20vh']}
                  backgroundColor="white"
                  left={['-7vw', '-5vw']}
                  position="relative"
                  style={dotStyle}
                  height={['15px', '30px']}
                  width={['15px', '30px']}
                  bgColor="#8F6C00"
                >
                  <Box
                    borderRadius="50%"
                    height={['11px', '20px']}
                    width={['11px', '20px']}
                    bgColor="white"
                    marginTop={['2px', '5px']}
                    mx="auto"
                  />
                </Box>
              </Tippy>
            </Center>
          </Box>
          <Text
            fontSize={['1.4em', '4xl']}
            textStyle="darker_grotesque_semibold"
            lineHeight="0.9em"
            paddingTop="3em"
          >
            Features of the Transformation Center:
          </Text>
          <Text
            fontSize={['1em', '3xl']}
            lineHeight="0.9em"
            textStyle="darker_grotesque_semibold"
            paddingBottom="1em"
          >
            Click/hover on the circles for more info!
          </Text>
          <Center
            w={['90vw', '60vw']}
            h={['28vh', '60vh']}
            m="auto"
            borderRadius="1em"
            border="5em"
            borderColor="blue"
            bgImage={`url('${process.env.PUBLIC_URL}/images/ripple-out/ripple-venue-layout.png')`}
            bgPosition="center"
            textStyle="darker_grotesque_semibold"
            bgSize="cover"
          >
            <Tippy
              theme="custom-theme"
              content={
                <VStack textAlign="center">
                  <Image
                    objectFit="scale-down"
                    w="100%"
                    src={`${process.env.PUBLIC_URL}/images/ripple-out/ripple-out-building-blocks.png`}
                  />
                  <Text textStyle="darker_grotesque_semibold" fontSize="lg">
                    classroom for children's ministry and other classes
                  </Text>
                </VStack>
              }
              placement="top"
            >
              <Box
                bottom={['6.25vh', '16vh']}
                right={['28.5vw', '16.5vw']}
                position="relative"
                style={dotStyle}
                bgColor="#424B5E"
                height={['15px', '30px']}
                width={['15px', '30px']}
              >
                <Box
                  borderRadius="50%"
                  height={['11px', '20px']}
                  width={['11px', '20px']}
                  bgColor="#538DFF"
                  marginTop={['2px', '5px']}
                  mx="auto"
                />
              </Box>
            </Tippy>
            <Tippy
              theme="custom-theme"
              content={
                <VStack textAlign="center">
                  <Image
                    objectFit="scale-down"
                    w="100%"
                    src={`${process.env.PUBLIC_URL}/images/ripple-out/ripple-out-main-sanctuary.png`}
                  />
                  <Text textStyle="darker_grotesque_semibold" fontSize="lg">
                    sits up to 200 people
                  </Text>
                </VStack>
              }
              placement="top"
            >
              <Box
                top={['-4.5vh', '-11vh']}
                left={['9vw', '5vw']}
                position="relative"
                style={dotStyle}
                bgColor="#424B5E"
                height={['15px', '30px']}
                width={['15px', '30px']}
              >
                <Box
                  borderRadius="50%"
                  height={['11px', '20px']}
                  width={['11px', '20px']}
                  bgColor="#538DFF"
                  marginTop={['2px', '5px']}
                  mx="auto"
                />
              </Box>
            </Tippy>
            <Tippy
              theme="custom-theme"
              content={
                <VStack textAlign="center">
                  <Image
                    objectFit="scale-down"
                    w="100%"
                    src={`${process.env.PUBLIC_URL}/images/ripple-out/ripple-out-pantry.png`}
                  />
                  <Text textStyle="darker_grotesque_semibold" fontSize="lg">
                    a pantry for fellowship times and community gathering
                  </Text>
                </VStack>
              }
              placement="top"
            >
              <Box
                top={['5vh', '13.5vh']}
                right={['11vw', '6.5vw']}
                position="relative"
                style={dotStyle}
                bgColor="#424B5E"
                height={['15px', '30px']}
                width={['15px', '30px']}
              >
                <Box
                  borderRadius="50%"
                  height={['11px', '20px']}
                  width={['11px', '20px']}
                  bgColor="#538DFF"
                  marginTop={['2px', '5px']}
                  mx="auto"
                />
              </Box>
            </Tippy>
            <Tippy
              theme="custom-theme"
              content={
                <VStack textAlign="center">
                  <Image
                    objectFit="scale-down"
                    w="100%"
                    src={`${process.env.PUBLIC_URL}/images/ripple-out/ripple-out-offices.png`}
                  />
                  <Text textStyle="darker_grotesque_semibold" fontSize="lg">
                    a function room for ministry gatherings and training classes
                  </Text>
                </VStack>
              }
              placement="top"
            >
              <Box
                top={['6.5vh', '18.5vh']}
                left={['7vw', '4vw']}
                position="relative"
                style={dotStyle}
                bgColor="#424B5E"
                height={['15px', '30px']}
                width={['15px', '30px']}
              >
                <Box
                  borderRadius="50%"
                  height={['11px', '20px']}
                  width={['11px', '20px']}
                  bgColor="#538DFF"
                  marginTop={['2px', '5px']}
                  mx="auto"
                />
              </Box>
            </Tippy>
            <Tippy
              theme="custom-theme"
              content={
                <VStack textAlign="center">
                  <Image
                    objectFit="scale-down"
                    w="100%"
                    src={`${process.env.PUBLIC_URL}/images/ripple-out/ripple-out-offices.png`}
                  />
                  <Text textStyle="darker_grotesque_semibold" fontSize="lg">
                    an office for pastoral staff
                  </Text>
                </VStack>
              }
              placement="top"
            >
              <Box
                top={['6.5vh', '17.5vh']}
                left={['21vw', '12.25vw']}
                position="relative"
                style={dotStyle}
                bgColor="#424B5E"
                height={['15px', '30px']}
                width={['15px', '30px']}
              >
                <Box
                  borderRadius="50%"
                  height={['11px', '20px']}
                  width={['11px', '20px']}
                  bgColor="#538DFF"
                  marginTop={['2px', '5px']}
                  mx="auto"
                />
              </Box>
            </Tippy>
          </Center>
          <Text
            py={['2em', '1em']}
            fontSize={['1.2em', '2.5em']}
            textStyle="darker_grotesque"
            lineHeight="0.9em"
            align="center"
          >
            WITH YOUR PARITICIPATION, WE WILL BE ABLE TO TRANSFORM THIS SPACE
            AND SEE OUR VISION REALIZED!
          </Text>
          <Box>
            <VStack>
              <Box w="100%" display={['none', 'block']}>
                <Flex minH={['28vh', '12vh', '15vh', '40vh']} w="100%">
                  <Image
                    w="33%"
                    objectFit="scale-down"
                    src={`${process.env.PUBLIC_URL}/images/ripple-out/ripple-out-venue-1.png`}
                  />
                  <Spacer />
                  <Image
                    w="33%"
                    objectFit="scale-down"
                    src={`${process.env.PUBLIC_URL}/images/ripple-out/ripple-out-venue-2.png`}
                  />
                  <Spacer />
                  <Image
                    w="33%"
                    objectFit="scale-down"
                    src={`${process.env.PUBLIC_URL}/images/ripple-out/ripple-out-venue-3.png`}
                  />
                </Flex>
              </Box>

              <Box>
                <Flex
                  minH={['auto', '12vh', '15vh', '40vh']}
                  w="100%"
                  paddingTop="2em"
                  flexDirection={['column', 'row']}
                >
                  <VStack w={['100%', '49%']}>
                    <Text
                      fontSize={['1.2em', '2.5em']}
                      textStyle="darker_grotesque"
                      lineHeight="0.9em"
                      textAlign="center"
                    >
                      BEFORE
                    </Text>
                    <Image
                      objectFit="scale-down"
                      src={`${process.env.PUBLIC_URL}/images/ripple-out/ripple-out-venue-4.png`}
                    />
                  </VStack>
                  <Spacer />
                  <VStack w={['100%', '49%']}>
                    <Text
                      fontSize={['1.2em', '2.5em']}
                      textStyle="darker_grotesque"
                      lineHeight="0.9em"
                      textAlign="center"
                    >
                      AFTER
                    </Text>
                    <Image
                      objectFit="scale-down"
                      src={`${process.env.PUBLIC_URL}/images/ripple-out/ripple-out-venue-5.png`}
                    />
                  </VStack>
                </Flex>
              </Box>
              <Box textAlign={['center', 'center']} width="100%">
                <Link href="/ripple-out/support" alignSelf="baseline">
                  <Button
                    target="_blank"
                    variant="outline"
                    fontSize={['lg', 'xl']}
                    bgColor="#ffffff"
                    fontWeight="900"
                    borderColor="#182E57"
                    color="#182E57"
                    marginY={[4, 8]}
                    py={[6, 8]}
                    w={['40%', '30%', '25%', '20%']}
                  >
                    I WANT TO <br /> PARTICIPATE!
                  </Button>
                </Link>
              </Box>
            </VStack>
          </Box>
        </Container>
      </Flex>
      <RippleOutFaqSection pageTopic="ripple-out-space" />
    </>
  );
};

export default RippleOutSpaceContainer;
