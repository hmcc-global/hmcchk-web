import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
  Fade,
} from '@chakra-ui/react';

import { InView } from 'react-intersection-observer';

const FADEIN_THRESHOLD = '-50px';

// Desktop FILL callout rows — all vw so circles, letters, lines, and labels scale together.
const DESKTOP_FILL = {
  circle: '6.5vw',
  letter: '4.2vw',
  line: '1vw',
  label: '3.2vw',
  labelGap: '1vw',
  labelBarGap: '2.5vw',
};

const SaturateVision = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 750) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize(); // Call handler right away so state gets updated with initial window size
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container maxW="100%" m={0} p={0} bgColor="#ffffff">
      {isMobile ? (
        <Stack>
          <Box
            bgColor="#0053A4"
            bgImage={
              process.env.PUBLIC_URL + '/images/saturate/Saturate_vision_bg.png'
            }
            bgPosition="center"
            bgSize="cover"
          >
            <Flex flexDirection="column" p={10} alignItems="left">
              <Text
                fontSize={['8vw', '10vw']}
                lineHeight={1}
                textColor="#ffffff"
                fontFamily="DarkerGrotesque"
              >
                THE <br /> VISION STATEMENT
              </Text>
              <br />
              <Text fontSize="4vw" textColor="#ffffff">
                To <b>saturate</b> Hong Kong with the knowledge of God’s glory
                by living out the Kingdom lifestyle and proclaiming the Gospel,
                so that we can make more disciples of all nations, locally,
                regionally, and globally for the spread of Jesus’s fame.
              </Text>
            </Flex>
          </Box>
          <Stack p={5} pl={10}>
            <Text
              color="#0053A4"
              fontSize="10vw"
              lineHeight="85%"
              fontFamily="DarkerGrotesque"
            >
              THE <br />
              VALUES
            </Text>
            <Text fontSize="4vw" fontFamily="Be-Vietnam">
              To
              <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                {' '}
                FILL{' '}
              </span>{' '}
              Hong Kong with the knowledge of the glory of the Lord
            </Text>
          </Stack>

          <Box w="50%" position="relative" overflowY="clip">
            <Box
              marginLeft="-50%"
              marginTop="-30%"
              style={{
                border: '3vw solid #C3E0FD',
              }}
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
              p="3vw"
            >
              <Box
                style={{
                  border: '3vw solid #81B1E1',
                }}
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="relative"
                p="4vw"
              >
                <Box
                  style={{
                    border: '3vw solid #3B8AD7',
                  }}
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                  p="21vw"
                >
                  <Box
                    style={{
                      border: '3vw solid #0053A4',
                    }}
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="absolute"
                    p="15vw"
                  />
                  <InView rootMargin={FADEIN_THRESHOLD} triggerOnce={true}>
                    {({ inView, ref }) => (
                      <Fade transition={{ enter: { duration: 1 } }} in={inView}>
                        <Flex
                          h={10}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          top="14%"
                          left="69%"
                          position="absolute"
                          ref={ref}
                        >
                          <Box
                            boxSize="8vw"
                            borderRadius="full"
                            bgColor="#0053A4"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontSize={25}
                            color="white"
                            fontFamily="DarkerGrotesque"
                          >
                            F
                          </Box>
                          <Box
                            w="30vw"
                            h={1}
                            borderRadius={'0 20px 20px 0'}
                            bgColor="#0053A4"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          />

                          <Flex fontSize={[13, 20, 30, 35, 40]} gap={2}>
                            <span />{' '}
                            <Text fontFamily="DarkerGrotesque">
                              FOUNDATIONS
                            </Text>
                            <Text fontFamily="DarkerGrotesque_Normal">
                              (disciples)
                            </Text>
                          </Flex>
                        </Flex>
                      </Fade>
                    )}
                  </InView>
                </Box>
                <InView rootMargin={FADEIN_THRESHOLD} triggerOnce={true}>
                  {({ inView, ref }) => (
                    <Fade transition={{ enter: { duration: 1 } }} in={inView}>
                      <Flex
                        h={10}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        position="absolute"
                        top="34%"
                        left="82%"
                        ref={ref}
                      >
                        <Box
                          boxSize="8vw"
                          borderRadius="full"
                          bgColor="#3B8AD7"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          fontSize={25}
                          color="white"
                          fontFamily="DarkerGrotesque"
                        >
                          I
                        </Box>
                        <Box
                          w="20vw"
                          h={1}
                          borderRadius={'0 20px 20px 0'}
                          bgColor="#3B8AD7"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        />

                        <Flex fontSize={[13, 20, 30, 35, 40]} gap={2}>
                          <span />{' '}
                          <Text fontFamily="DarkerGrotesque">IMPACT</Text>
                          <Text fontFamily="DarkerGrotesque_Normal">
                            (microchurches)
                          </Text>
                        </Flex>
                      </Flex>
                    </Fade>
                  )}
                </InView>
              </Box>
              <InView rootMargin={FADEIN_THRESHOLD} triggerOnce={true}>
                {({ inView, ref }) => (
                  <Fade transition={{ enter: { duration: 1 } }} in={inView}>
                    <Flex
                      h={10}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      position="absolute"
                      top="46%"
                      left="87%"
                      ref={ref}
                    >
                      <Box
                        boxSize="8vw"
                        borderRadius="full"
                        bgColor="#81B1E1"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize={25}
                        color="white"
                        fontFamily="DarkerGrotesque"
                      >
                        L
                      </Box>
                      <Box
                        w="12vw"
                        h={1}
                        borderRadius={'0 20px 20px 0'}
                        bgColor="#81B1E1"
                        alignItems="center"
                        justifyContent="center"
                      />
                      <Flex
                        width={[
                          '160px',
                          '240px',
                          '240px',
                          '240px',
                          '240px',
                          '240px',
                        ]}
                        fontSize={[13, 20, 30, 35, 30]}
                        gap={2}
                      >
                        <span />{' '}
                        <Text fontFamily="DarkerGrotesque">LINK UP</Text>
                        <Text fontFamily="DarkerGrotesque_Normal">
                          (district churches)
                        </Text>
                      </Flex>
                    </Flex>
                  </Fade>
                )}
              </InView>
            </Box>
            <InView rootMargin={FADEIN_THRESHOLD} triggerOnce={true}>
              {({ inView, ref }) => (
                <Fade transition={{ enter: { duration: 1 } }} in={inView}>
                  <Flex
                    h={10}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="absolute"
                    top="44%"
                    left="88%"
                    ref={ref}
                  >
                    <Box
                      boxSize="8vw"
                      borderRadius="full"
                      bgColor="#C3E0FD"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize={25}
                      color="white"
                      fontFamily="DarkerGrotesque"
                    >
                      L
                    </Box>
                    <Box
                      w="6vw"
                      h={1}
                      borderRadius={'0 20px 20px 0'}
                      bgColor="#C3E0FD"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    />
                    <Flex fontSize={[13, 20, 30, 35, 40]} gap={2}>
                      <span /> <Text fontFamily="DarkerGrotesque">LAUNCH</Text>
                      <Text fontFamily="DarkerGrotesque_Normal">(hubs)</Text>
                    </Flex>
                  </Flex>
                </Fade>
              )}
            </InView>
          </Box>
        </Stack>
      ) : (
        <Stack spacing={0}>
          <Box
            bgColor="#0053A4"
            bgImage={
              process.env.PUBLIC_URL + '/images/saturate/Saturate_vision_bg.png'
            }
            bgPosition="center"
            bgSize="cover"
          >
            <Grid padding={20} templateColumns="1fr 3fr" gap={3}>
              <GridItem colSpan={1}>
                <Text
                  fontSize="6xl"
                  lineHeight={1}
                  textColor="#ffffff"
                  fontFamily="DarkerGrotesque"
                >
                  THE <br /> VISION <br /> STATEMENT
                </Text>
              </GridItem>
              <GridItem
                colSpan={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="2xl" textColor="#ffffff">
                  To <b>saturate</b> Hong Kong with the knowledge of God’s glory
                  by living out the Kingdom lifestyle and proclaiming the
                  Gospel, so that we can make more disciples of all nations,
                  locally, regionally, and globally for the spread of Jesus’s
                  fame.
                </Text>
              </GridItem>
            </Grid>
          </Box>
          <Stack h={7} bgColor="#ffffff" />
          <Box w="55%" position="relative" overflowY="clip">
            <Box
              marginTop="-29%"
              marginLeft="-55%"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
            >
              <Box
                style={{
                  border: '3vw solid #C3E0FD',
                }}
                p="4vw"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="relative"
              >
                <Box
                  style={{
                    border: '3vw solid #81B1E1',
                  }}
                  p="4vw"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                >
                  <Box
                    style={{
                      border: '3vw solid #3B8AD7',
                    }}
                    p="21vw"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                  >
                    <Box
                      style={{
                        border: '3vw solid #0053A4',
                      }}
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      position="absolute"
                      p="15vw"
                    >
                      <Box
                        h="100%"
                        display="flex"
                        flexDirection="column"
                        mt="11vw"
                        mx="6vw"
                        pos="absolute"
                      >
                        <Text
                          textAlign="left"
                          color="#0053A4"
                          fontSize="4vw"
                          lineHeight="85%"
                          fontFamily="DarkerGrotesque"
                        >
                          THE <br /> VALUES
                        </Text>
                        <br />
                        <Text
                          fontSize="1.6vw"
                          textAlign="left"
                          fontFamily="Be-Vietnam"
                        >
                          To
                          <span
                            style={{ color: '#0053A4', fontWeight: 'bold' }}
                          >
                            {' '}
                            FILL{' '}
                          </span>{' '}
                          Hong Kong with the knowledge of the glory of the Lord
                        </Text>
                      </Box>
                    </Box>
                    <InView rootMargin={FADEIN_THRESHOLD} triggerOnce={true}>
                      {({ inView, ref }) => (
                        <Fade
                          transition={{ enter: { duration: 1 } }}
                          in={inView}
                        >
                          <Flex
                            position="absolute"
                            alignItems="center"
                            top="30%"
                            left="80%"
                            ref={ref}
                          >
                            <Flex
                              boxSize={DESKTOP_FILL.circle}
                              borderRadius="full"
                              bgColor="#0053A4"
                              alignItems="center"
                              justifyContent="center"
                              flexShrink={0}
                              fontSize={DESKTOP_FILL.letter}
                              lineHeight="1"
                              color="white"
                              fontFamily="DarkerGrotesque"
                            >
                              F
                            </Flex>
                            <Box
                              w="29vw"
                              h={DESKTOP_FILL.line}
                              flexShrink={0}
                              borderRadius="0 20px 20px 0"
                              bgColor="#0053A4"
                            />
                            <Flex
                              alignItems="center"
                              fontSize={DESKTOP_FILL.label}
                              lineHeight="1"
                              gap={DESKTOP_FILL.labelGap}
                              ml={DESKTOP_FILL.labelBarGap}
                              whiteSpace="nowrap"
                            >
                              <Text fontFamily="DarkerGrotesque">
                                FOUNDATIONS
                              </Text>
                              <Text fontFamily="DarkerGrotesque_Normal">
                                (disciples)
                              </Text>
                            </Flex>
                          </Flex>
                        </Fade>
                      )}
                    </InView>
                  </Box>
                  <InView rootMargin={FADEIN_THRESHOLD} triggerOnce={true}>
                    {({ inView, ref }) => (
                      <Fade transition={{ enter: { duration: 1 } }} in={inView}>
                        <Flex
                          alignItems="center"
                          position="absolute"
                          top="45%"
                          left="85%"
                          ref={ref}
                        >
                          <Flex
                            boxSize={DESKTOP_FILL.circle}
                            borderRadius="full"
                            bgColor="#3B8AD7"
                            alignItems="center"
                            justifyContent="center"
                            flexShrink={0}
                            fontSize={DESKTOP_FILL.letter}
                            lineHeight="1"
                            color="white"
                            fontFamily="DarkerGrotesque"
                          >
                            I
                          </Flex>
                          <Box
                            w="22vw"
                            h={DESKTOP_FILL.line}
                            flexShrink={0}
                            borderRadius="0 20px 20px 0"
                            bgColor="#3B8AD7"
                          />
                          <Flex
                            alignItems="center"
                            fontSize={DESKTOP_FILL.label}
                            lineHeight="1"
                            gap={DESKTOP_FILL.labelGap}
                            ml={DESKTOP_FILL.labelBarGap}
                            whiteSpace="nowrap"
                          >
                            <Text fontFamily="DarkerGrotesque">IMPACT</Text>
                            <Text fontFamily="DarkerGrotesque_Normal">
                              (microchurches)
                            </Text>
                          </Flex>
                        </Flex>
                      </Fade>
                    )}
                  </InView>
                </Box>
                <InView rootMargin={FADEIN_THRESHOLD} triggerOnce={true}>
                  {({ inView, ref }) => (
                    <Fade transition={{ enter: { duration: 1 } }} in={inView}>
                      <Flex
                        w="80%"
                        alignItems="center"
                        position="absolute"
                        top="55%"
                        left="86%"
                        ref={ref}
                      >
                        <Flex
                          boxSize={DESKTOP_FILL.circle}
                          borderRadius="full"
                          bgColor="#81B1E1"
                          alignItems="center"
                          justifyContent="center"
                          flexShrink={0}
                          fontSize={DESKTOP_FILL.letter}
                          lineHeight="1"
                          color="white"
                          fontFamily="DarkerGrotesque"
                        >
                          L
                        </Flex>
                        <Box
                          w="16.5vw"
                          h={DESKTOP_FILL.line}
                          flexShrink={0}
                          borderRadius="0 20px 20px 0"
                          bgColor="#81B1E1"
                        />
                        <Flex
                          alignItems="center"
                          fontSize={DESKTOP_FILL.label}
                          lineHeight="1"
                          gap={DESKTOP_FILL.labelGap}
                          ml={DESKTOP_FILL.labelBarGap}
                          whiteSpace="nowrap"
                        >
                          <Text fontFamily="DarkerGrotesque">LINK UP</Text>
                          <Text fontFamily="DarkerGrotesque_Normal">
                            (district churches)
                          </Text>
                        </Flex>
                      </Flex>
                    </Fade>
                  )}
                </InView>
              </Box>
              <InView rootMargin={FADEIN_THRESHOLD} triggerOnce={true}>
                {({ inView, ref }) => (
                  <Fade transition={{ enter: { duration: 1 } }} in={inView}>
                    <Flex
                      alignItems="center"
                      position="absolute"
                      ref={ref}
                      top="62%"
                      left="87%"
                    >
                      <Flex
                        boxSize={DESKTOP_FILL.circle}
                        borderRadius="full"
                        bgColor="#C3E0FD"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                        fontSize={DESKTOP_FILL.letter}
                        lineHeight="1"
                        color="white"
                        fontFamily="DarkerGrotesque"
                      >
                        L
                      </Flex>
                      <Box
                        w="10vw"
                        h={DESKTOP_FILL.line}
                        flexShrink={0}
                        borderRadius="0 20px 20px 0"
                        bgColor="#C3E0FD"
                      />
                      <Flex
                        alignItems="center"
                        fontSize={DESKTOP_FILL.label}
                        lineHeight="1"
                        gap={DESKTOP_FILL.labelGap}
                        ml={DESKTOP_FILL.labelBarGap}
                        whiteSpace="nowrap"
                      >
                        <Text fontFamily="DarkerGrotesque">LAUNCH</Text>
                        <Text fontFamily="DarkerGrotesque_Normal">(hubs)</Text>
                      </Flex>
                    </Flex>
                  </Fade>
                )}
              </InView>
            </Box>
          </Box>
        </Stack>
      )}
    </Container>
  );
};

export default SaturateVision;
