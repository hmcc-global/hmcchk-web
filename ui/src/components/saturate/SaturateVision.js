import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
} from '@chakra-ui/react';

const SaturateVision = () => {
  const [stopTransition, setStopTransition] = useState(false);

  const [fillPosition, setFillPosition] = useState(false);
  const [impactPosition, setImpactPosition] = useState(false);
  const [linkPosition, setLinkPosition] = useState(false);
  const [launchPosition, setLaunchPosition] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // useState to get mobile value
  let yPos = useRef(0);
  let windowWidth = useRef(0);

  useEffect(() => {
    if (launchPosition) {
      const timerOut = setTimeout(() => {
        setStopTransition(launchPosition);
      }, 1000);
    } else {
      setStopTransition(launchPosition);
    }
  }, [launchPosition]);

  useEffect(() => {
    const position = document.querySelector('#main-container');
    const handleScroll = () => {
      yPos.current = position.scrollTop;
      windowWidth.current = window.innerWidth;

      if (position.scrollTop > 500) {
        setFillPosition(true);
      }
      if (position.scrollTop > 600) {
        setImpactPosition(true);
      }
      if (position.scrollTop > 750) {
        setLinkPosition(true);
      }
      if (position.scrollTop > 850) {
        setLaunchPosition(true);
      }

      if (position.scrollTop < 600) {
        setFillPosition(false);
      }
      if (position.scrollTop < 650) {
        setImpactPosition(false);
      }
      if (position.scrollTop < 700) {
        setLinkPosition(false);
        setLaunchPosition(false);
      }

      if (window.innerWidth < 750) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    position.addEventListener('scroll', handleScroll);

    return () => {
      position.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container maxW="100%" m={0} p={0}>
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
                fontSize={['5xl', '6xl']}
                lineHeight={1}
                textColor="#ffffff"
                fontFamily="DarkerGrotesque"
              >
                THE <br /> VISION STATEMENT
              </Text>
              <Text fontSize="2xl" textColor="#ffffff">
                To <b>saturate</b> Hong Kong with the knowledge of God’s glory
                by living out the Kingdom lifestyle and proclaiming the Gospel,
                so that we can make more disciples of all nations, locally,
                regionally, and globally for the spread of Jesus’s fame.
              </Text>
            </Flex>
          </Box>
          <Stack p={5}>
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
              transition={stopTransition ? 'none' : 'border 2s ease-in'}
              style={{
                border: launchPosition
                  ? '3vw solid #C3E0FD'
                  : '3vw solid #ffffff',
              }}
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
              p="3vw"
            >
              <Box
                transition={stopTransition ? 'none' : 'border 1.5s ease-in'}
                style={{
                  border: linkPosition
                    ? '3vw solid #81B1E1'
                    : '3vw solid #ffffff',
                }}
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="relative"
                p="4vw"
              >
                <Box
                  transition={stopTransition ? 'none' : 'border 1s ease-in'}
                  style={{
                    border: impactPosition
                      ? '3vw solid #3B8AD7'
                      : '3vw solid #ffffff',
                  }}
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                  p="21vw"
                >
                  <Box
                    transition={stopTransition ? 'none' : 'border 0.5s ease-in'}
                    style={{
                      border: fillPosition
                        ? '3vw solid #0053A4'
                        : '3vw solid #ffffff',
                    }}
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="absolute"
                    p="15vw"
                  />
                  <Flex
                    h={10}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    top="14%"
                    left="70%"
                    position="absolute"
                    transition={
                      stopTransition ? 'none' : 'opacity 0.5s ease-in'
                    }
                    style={{
                      opacity: fillPosition ? 1 : 0,
                    }}
                  >
                    <Box
                      boxSize="5vw"
                      borderRadius="full"
                      bgColor="#0053A4"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize={[30, 30, 30, 30, 30, 30]}
                      color="white"
                      fontFamily="DarkerGrotesque"
                    >
                      F
                    </Box>
                    <Box
                      // w={[120, 250, 250, 250, 250, 250]}
                      w="34vw"
                      h={2}
                      borderRadius={'0 20px 20px 0'}
                      bgColor="#0053A4"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    />

                    <Flex fontSize={[13, 20, 30, 35, 40]} gap={2}>
                      <span />{' '}
                      <Text fontFamily="DarkerGrotesque">FOUNDATIONS</Text>
                      <Text fontFamily="DarkerGrotesque_Normal">
                        (disciples)
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
                <Flex
                  h={10}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  position="absolute"
                  top="33%"
                  left="85%"
                  transition={stopTransition ? 'none' : 'opacity 1s ease-in'}
                  style={{
                    opacity: impactPosition ? 1 : 0,
                  }}
                >
                  <Box
                    boxSize="5vw"
                    borderRadius="full"
                    bgColor="#3B8AD7"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize={[30, 30, 30, 30, 30]}
                    color="white"
                    fontFamily="DarkerGrotesque"
                  >
                    I
                  </Box>
                  <Box
                    w="22.5vw"
                    h={2}
                    borderRadius={'0 20px 20px 0'}
                    bgColor="#3B8AD7"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  />

                  <Flex fontSize={[13, 20, 30, 35, 40]} gap={2}>
                    <span /> <Text fontFamily="DarkerGrotesque">IMPACT</Text>
                    <Text fontFamily="DarkerGrotesque_Normal">
                      (microchurches)
                    </Text>
                  </Flex>
                </Flex>
              </Box>
              <Flex
                h={10}
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="absolute"
                top="43%"
                left="90%"
                transition={stopTransition ? 'none' : 'opacity 1.5s ease-in'}
                style={{
                  opacity: linkPosition ? 1 : 0,
                }}
              >
                <Box
                  boxSize="5vw"
                  borderRadius="full"
                  bgColor="#81B1E1"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize={[30, 30, 30, 30, 30]}
                  color="white"
                  fontFamily="DarkerGrotesque"
                >
                  L
                </Box>
                <Box
                  w="15vw"
                  h={2}
                  borderRadius={'0 20px 20px 0'}
                  bgColor="#81B1E1"
                  alignItems="center"
                  justifyContent="center"
                />
                <Flex
                  width={['160px', '240px', '240px', '240px', '240px', '240px']}
                  fontSize={[13, 20, 30, 35, 30]}
                  gap={2}
                >
                  <span /> <Text fontFamily="DarkerGrotesque">LINK UP</Text>
                  <Text fontFamily="DarkerGrotesque_Normal">
                    (district churches)
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Flex
              h={10}
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="absolute"
              top="40%"
              left="93%"
              transition={stopTransition ? 'none' : 'opacity 1.5s ease-in'}
              style={{
                opacity: launchPosition ? 1 : 0,
              }}
            >
              <Box
                boxSize="5vw"
                borderRadius="full"
                bgColor="#C3E0FD"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={[30, 30, 30, 30, 30]}
                color="white"
                fontFamily="DarkerGrotesque"
              >
                L
              </Box>
              <Box
                w="8vw"
                // w={[15, 45, 170, 170, 190, 170]}
                h={2}
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
          </Box>
        </Stack>
      ) : (
        <Stack>
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
                transition={stopTransition ? 'none' : 'border 2s ease-in'}
                style={{
                  border: launchPosition
                    ? '3vw solid #C3E0FD'
                    : '3vw solid #ffffff',
                }}
                p="4vw"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="relative"
              >
                <Box
                  transition={stopTransition ? 'none' : 'border 1.5s ease-in'}
                  style={{
                    border: linkPosition
                      ? '3vw solid #81B1E1'
                      : '3vw solid #ffffff',
                  }}
                  p="4vw"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                >
                  <Box
                    transition={stopTransition ? 'none' : 'border 1s ease-in'}
                    style={{
                      border: impactPosition
                        ? '3vw solid #3B8AD7'
                        : '3vw solid #ffffff',
                    }}
                    p="21vw"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                  >
                    <Box
                      transition={
                        stopTransition ? 'none' : 'border 0.5s ease-in'
                      }
                      style={{
                        border: fillPosition
                          ? '3vw solid #0053A4'
                          : '3vw solid #ffffff',
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
                        alignItems="center"
                        mt="11vw"
                        mx="6vw"
                        justifyContent="flex-start"
                        pos="absolute"
                      >
                        <Text
                          textAlign="start"
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
                          textAlign="center"
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
                    <Flex
                      h={20}
                      display="flex"
                      position="absolute"
                      alignItems="center"
                      justifyContent="center"
                      top="30%"
                      left="80%"
                      transition={
                        stopTransition ? 'none' : 'opacity 0.5s ease-in'
                      }
                      style={{
                        opacity: fillPosition ? 1 : 0,
                      }}
                    >
                      <Box
                        boxSize="6.5vw"
                        borderRadius="full"
                        bgColor="#0053A4"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize={[80, 60, 70, 80, 80, 90]}
                        color="white"
                        fontFamily="DarkerGrotesque"
                      >
                        F
                      </Box>
                      <Box
                        w="29vw"
                        h={2}
                        borderRadius={'0 20px 20px 0'}
                        bgColor="#0053A4"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      />
                      <Flex fontSize={[20, 20, 30, 35, 40]} gap={3}>
                        <span />{' '}
                        <Text fontFamily="DarkerGrotesque">FOUNDATIONS</Text>
                        <Text fontFamily="DarkerGrotesque_Normal">
                          (disciples)
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                  <Flex
                    h={20}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="absolute"
                    top="45%"
                    left="85%"
                    transition={stopTransition ? 'none' : 'opacity 1s ease-in'}
                    style={{
                      opacity: impactPosition ? 1 : 0,
                    }}
                  >
                    <Box
                      boxSize="6.5vw"
                      borderRadius="full"
                      bgColor="#3B8AD7"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize={[80, 60, 70, 80, 90]}
                      color="white"
                      fontFamily="DarkerGrotesque"
                    >
                      I
                    </Box>
                    <Box
                      w="21vw"
                      h={2}
                      borderRadius={'0 20px 20px 0'}
                      bgColor="#3B8AD7"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    />

                    <Flex fontSize={[20, 20, 30, 35, 40]} gap={3}>
                      <span /> <Text fontFamily="DarkerGrotesque">IMPACT</Text>
                      <Text fontFamily="DarkerGrotesque_Normal">
                        (microchurches)
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
                <Flex
                  h={20}
                  w="80%"
                  alignItems="center"
                  position="absolute"
                  top="55%"
                  left="86%"
                  transition={stopTransition ? 'none' : 'opacity 1.5s ease-in'}
                  style={{
                    opacity: linkPosition ? 1 : 0,
                  }}
                >
                  <Box
                    borderRadius="full"
                    boxSize="6.5vw"
                    bgColor="#81B1E1"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize={[80, 60, 70, 80, 90]}
                    color="white"
                    fontFamily="DarkerGrotesque"
                  >
                    L
                  </Box>
                  <Box
                    w="14.5vw"
                    h={2}
                    borderRadius={'0 20px 20px 0'}
                    bgColor="#81B1E1"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  />

                  <Flex display="-webkit-inline-box" gap={3}>
                    <span />{' '}
                    <Text
                      fontSize={[20, 20, 30, 35, 40]}
                      fontFamily="DarkerGrotesque"
                    >
                      LINK UP
                    </Text>
                    <Text
                      fontSize={[20, 20, 30, 35, 40]}
                      fontFamily="DarkerGrotesque_Normal"
                    >
                      (district churches)
                    </Text>
                  </Flex>
                </Flex>
              </Box>
              <Flex
                h={20}
                alignItems="center"
                position="absolute"
                transition={stopTransition ? 'none' : 'opacity 2s ease-in'}
                style={{
                  opacity: launchPosition ? 1 : 0,
                }}
                top="62%"
                left="87%"
              >
                <Box
                  borderRadius="full"
                  boxSize="6.5vw"
                  bgColor="#C3E0FD"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize={[80, 60, 70, 80, 90]}
                  color="white"
                  fontFamily="DarkerGrotesque"
                >
                  L
                </Box>
                <Box
                  w="6.5vw"
                  h={2}
                  borderRadius={'0 20px 20px 0'}
                  bgColor="#C3E0FD"
                  display="flex"
                />
                <Flex fontSize={[20, 20, 30, 35, 40]} gap={3}>
                  <span /> <Text fontFamily="DarkerGrotesque">LAUNCH</Text>
                  <Text fontFamily="DarkerGrotesque_Normal">(hubs)</Text>
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Stack>
      )}
    </Container>
  );
};

export default SaturateVision;
