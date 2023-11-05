import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
} from '@chakra-ui/react';

const SaturateVision = () => {
  const [fillPosition, setFillPosition] = useState(false);
  const [impactPosition, setImpactPosition] = useState(false);
  const [linkPosition, setLinkPosition] = useState(false);
  const [launchPosition, setLaunchPosition] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // useState to get mobile value
  let yPos = useRef(0);
  let windowWidth = useRef(0);

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
                fontSize="6xl"
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
              fontSize={70}
              lineHeight="85%"
              fontFamily="DarkerGrotesque"
            >
              THE <br />
              VALUES
            </Text>
            <Text fontSize={20} fontFamily="Be-Vietnam">
              To
              <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                {' '}
                FILL{' '}
              </span>{' '}
              Hong Kong with the knowledge of the glory of the Lord
            </Text>
          </Stack>

          <Box
            w="55%"
            h={[320, 500, 500, 600, 650, 700]}
            position="relative"
            overflowY="clip"
          >
            <Box
              h={['90%', '110%', '120%', '50%', '35%', '35%']}
              marginLeft="-50%"
              marginTop="-30%"
              transition="border 4s ease-in"
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
            >
              <Box
                transition="border 3s ease-in"
                style={{
                  border: linkPosition
                    ? '3vw solid #81B1E1'
                    : '3vw solid #ffffff',
                }}
                boxSize="90%"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="relative"
              >
                <Box
                  transition="border 2s ease-in"
                  style={{
                    border: impactPosition
                      ? '3vw solid #3B8AD7'
                      : '3vw solid #ffffff',
                  }}
                  boxSize="87%"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                >
                  <Box
                    transition="border 1s ease-in"
                    style={{
                      border: fillPosition
                        ? '3vw solid #0053A4'
                        : '3vw solid #ffffff',
                    }}
                    boxSize="85%"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="absolute"
                  />
                  <Flex
                    h={10}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    top="10%"
                    left="70%"
                    position="absolute"
                    transition="opacity 1s ease-in"
                    style={{
                      opacity: fillPosition ? 1 : 0,
                    }}
                  >
                    <Box
                      w="9%"
                      h="100%"
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
                      w={[120, 250, 250, 250, 250, 250]}
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
                  top="30%"
                  left="85%"
                  transition="opacity 2s ease-in"
                  style={{
                    opacity: impactPosition ? 1 : 0,
                  }}
                >
                  <Box
                    w="9%"
                    h="100%"
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
                    w={[73, 160, 170, 170, 190, 170]}
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
                transition="opacity 3s ease-in"
                style={{
                  opacity: linkPosition ? 1 : 0,
                }}
              >
                <Box
                  w="13%"
                  h="80%"
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
                  w={[30, 74, 170, 170, 190, 170]}
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
              top={['30%', '30%', '34%', '34%', '34%', '34%']}
              left="93%"
              transition="opacity 4s ease-in"
              style={{
                opacity: launchPosition ? 1 : 0,
              }}
            >
              <Box
                w="15%"
                h="90%"
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
                w={[15, 45, 170, 170, 190, 170]}
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
          <Box
            w="55%"
            h={[500, 700, 900, 800, 1000, 1200]}
            position="relative"
            overflowY="clip"
          >
            <Box
              marginTop="-29%"
              marginLeft="-20%"
              transition="border 4s ease-in"
              style={{
                border: launchPosition
                  ? '3vw solid #C3E0FD'
                  : '3vw solid #ffffff',
              }}
              h={['70%', '70%', '70%', '85%', '100%', '110%']}
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
            >
              <Box
                transition="border 3s ease-in"
                style={{
                  border: linkPosition
                    ? '3vw solid #81B1E1'
                    : '3vw solid #ffffff',
                }}
                boxSize="90%"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="relative"
              >
                <Box
                  transition="border 2s ease-in"
                  style={{
                    border: impactPosition
                      ? '3vw solid #3B8AD7'
                      : '3vw solid #ffffff',
                  }}
                  boxSize="87%"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                >
                  <Box
                    transition="border 1s ease-in"
                    style={{
                      border: fillPosition
                        ? '3vw solid #0053A4'
                        : '3vw solid #ffffff',
                    }}
                    boxSize="85%"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="absolute"
                    p={20}
                  >
                    <Center
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text
                        color="#0053A4"
                        fontSize={[20, 20, 55, 65, 80, 90]}
                        lineHeight="85%"
                        fontFamily="DarkerGrotesque"
                      >
                        THE VALUES
                      </Text>
                      <Text
                        fontSize={[10, 10, 15, 15, 20, 20]}
                        fontFamily="Be-Vietnam"
                      >
                        To
                        <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                          {' '}
                          FILL{' '}
                        </span>{' '}
                        Hong Kong with the knowledge of the glory of the Lord
                      </Text>
                    </Center>
                  </Box>
                  <Flex
                    h={20}
                    display="flex"
                    position="absolute"
                    alignItems="center"
                    justifyContent="center"
                    top="22%"
                    left="75%"
                    transition="opacity 1s ease-in"
                    style={{
                      opacity: fillPosition ? 1 : 0,
                    }}
                  >
                    <Box
                      w={['6%', '10%', '8%', '8%', '10%', '12%']}
                      h={['100%', '60%', '80%', '90%', '100%', '130%']}
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
                      w={[400, 200, 300, 350, 500, 590]}
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
                  top="40%"
                  left="85%"
                  transition="opacity 2s ease-in"
                  style={{
                    opacity: impactPosition ? 1 : 0,
                  }}
                >
                  <Box
                    w={['6%', '12%', '12%', '12%', '10%', '12%']}
                    h={['100%', '60%', '80%', '100%', '100%', '130%']}
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
                    w={[400, 145, 220, 260, 390, 445]}
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
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="absolute"
                top="50%"
                left="88%"
                transition="opacity 3s ease-in"
                style={{
                  opacity: linkPosition ? 1 : 0,
                }}
              >
                <Box
                  w={['6%', '7%', '9%', '10%', '10%', '13%']}
                  h={['100%', '60%', '80%', '90%', '100%', '120%']}
                  borderRadius="full"
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
                  w={[400, 85, 130, 160, 270, 285]}
                  h={2}
                  borderRadius={'0 20px 20px 0'}
                  bgColor="#81B1E1"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                />

                <Flex width="500px" fontSize={[20, 20, 30, 35, 40]} gap={3}>
                  <span /> <Text fontFamily="DarkerGrotesque">LINK UP</Text>
                  <Text fontFamily="DarkerGrotesque_Normal">
                    (district churches)
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
              transition="opacity 4s ease-in"
              style={{
                opacity: launchPosition ? 1 : 0,
              }}
              top={['50%', '25%', '28%', '30%', '25%', '35%']}
              left={['90%', '90%', '90%', '90%', '92%', '92%']}
            >
              <Box
                w={['10%', '15%', '21%', '25%', '17%', '18%']}
                h={['60%', '60%', '80%', '90%', '100%', '120%']}
                borderRadius="full"
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
                w={[10, 55, 100, 120, 120, 200]}
                h={2}
                borderRadius={'0 20px 20px 0'}
                bgColor="#C3E0FD"
                display="flex"
                alignItems="center"
                justifyContent="center"
              />
              <Flex fontSize={[20, 20, 30, 35, 40]} gap={3}>
                <span /> <Text fontFamily="DarkerGrotesque">LAUNCH</Text>
                <Text fontFamily="DarkerGrotesque_Normal">(hubs)</Text>
              </Flex>
            </Flex>
          </Box>
        </Stack>
      )}
    </Container>
  );
};

export default SaturateVision;
