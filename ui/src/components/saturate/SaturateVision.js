import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Center,
  Container,
  Grid,
  GridItem,
  Flex,
  HStack,
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
      console.log('width: ', windowWidth.current);

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
        console.log('TRUE');
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
              fontWeight="900"
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
              To <b>saturate</b> Hong Kong with the knowledge of God’s glory by
              living out the Kingdom lifestyle and proclaiming the Gospel, so
              that we can make more disciples of all nations, locally,
              regionally, and globally for the spread of Jesus’s fame.
            </Text>
          </GridItem>
        </Grid>
      </Box>
      <Box bgColor="white" h={7} />

      {isMobile ? (
        <Stack>
          <Stack p={5}>
            <Text>isMovile</Text>
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
          <HStack>
            <Box w="55%" h={[320, 600, 650, 700]} overflow="hidden">
              <Box
                W="90%"
                h={['90%', '80%', '70%', '50%', '35%', '35%']}
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
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              w={['20%', '20%', '20%', '20%', '50%', '50%']}
              color="black"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Flex
                h={10}
                display="flex"
                alignItems="center"
                justifyContent="left"
                marginLeft="-70%"
                marginTop="-70%"
                // marginLeft={['30%', '30%', '30%', '30%', '40%', '30%']}
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
                  w={[250, 250, 250, 250, 250, 250]}
                  h={2}
                  borderRadius={'0 20px 20px 0'}
                  bgColor="#0053A4"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                />

                <Flex fontSize={[20, 20, 30, 35, 40]} gap={3}>
                  <span /> <Text fontFamily="DarkerGrotesque">FOUNDATIONS</Text>
                  <Text fontFamily="DarkerGrotesque_Normal">(disciples)</Text>
                </Flex>
              </Flex>
              <Flex
                h={10}
                display="flex"
                alignItems="center"
                justifyContent="left"
                marginLeft="-60%"
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
                  w={200}
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
              <Flex
                h={10}
                display="flex"
                alignItems="center"
                justifyContent="left"
                marginLeft="-45%"
                transition="opacity 3s ease-in"
                style={{
                  opacity: linkPosition ? 1 : 0,
                }}
              >
                <Box
                  w="9%"
                  h="100%"
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
                  w={140}
                  h={2}
                  borderRadius={'0 20px 20px 0'}
                  bgColor="#81B1E1"
                  alignItems="center"
                  justifyContent="center"
                />

                <Flex fontSize={[20, 20, 30, 35, 30]} gap={3}>
                  <span /> <Text fontFamily="DarkerGrotesque">LINK UP</Text>
                  <Text fontFamily="DarkerGrotesque_Normal">
                    (district churches)
                  </Text>
                </Flex>
              </Flex>
              <Flex
                h={10}
                display="flex"
                alignItems="center"
                justifyContent="left"
                marginLeft="-55%"
                transition="opacity 3s ease-in"
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
                  w={100}
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
          </HStack>
        </Stack>
      ) : (
        <HStack h={1100} overflow="hidden" alignItems="left" spacing="-20%">
          <Box w="55%" h={['70%', '70%', '70%', '70%', '80%', '95%']}>
            <Box
              marginTop="-20%"
              marginLeft="-20%"
              transition="border 4s ease-in"
              style={{
                border: launchPosition
                  ? '3vw solid #C3E0FD'
                  : '3vw solid #ffffff',
              }}
              w="120%"
              h={['70%', '70%', '80%', '90%', '110%', '118%']}
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
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
                  >
                    <Center
                      display="flex"
                      flexDirection="column"
                      w="65%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text
                        color="#0053A4"
                        fontSize={90}
                        lineHeight="85%"
                        fontFamily="DarkerGrotesque"
                      >
                        THE VALUES
                      </Text>
                      <Text fontSize={20} fontFamily="Be-Vietnam">
                        To
                        <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                          {' '}
                          FILL{' '}
                        </span>{' '}
                        Hong Kong with the knowledge of the glory of the Lord
                      </Text>
                    </Center>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            w={800}
            color="black"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Flex
              h={20}
              w={1200}
              display="flex"
              alignItems="center"
              justifyContent="left"
              marginTop="-45%"
              marginLeft={['30%', '30%', '30%', '30%', '40%', '30%']}
              transition="opacity 1s ease-in"
              style={{
                opacity: fillPosition ? 1 : 0,
              }}
            >
              <Box
                w={['6%', '6%', '6%', '6%', '6%', '8%']}
                h={['100%', '100%', '100%', '100%', '100%', '130%']}
                borderRadius="full"
                bgColor="#0053A4"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={[80, 80, 80, 80, 80, 90]}
                color="white"
                fontFamily="DarkerGrotesque"
              >
                F
              </Box>
              <Box
                w={[400, 400, 400, 400, 400, 500]}
                h={2}
                borderRadius={'0 20px 20px 0'}
                bgColor="#0053A4"
                display="flex"
                alignItems="center"
                justifyContent="center"
              />

              <Flex fontSize={[20, 20, 30, 35, 40]} gap={3}>
                <span /> <Text fontFamily="DarkerGrotesque">FOUNDATIONS</Text>
                <Text fontFamily="DarkerGrotesque_Normal">(disciples)</Text>
              </Flex>
            </Flex>
            <Flex
              h={20}
              w={1200}
              display="flex"
              alignItems="center"
              justifyContent="left"
              marginLeft="65%"
              transition="opacity 2s ease-in"
              style={{
                opacity: impactPosition ? 1 : 0,
              }}
            >
              <Box
                w="8%"
                h="130%"
                borderRadius="full"
                bgColor="#3B8AD7"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={[40, 15, 30, 30, 90]}
                color="white"
                fontFamily="DarkerGrotesque"
              >
                I
              </Box>
              <Box
                w={360}
                h={2}
                borderRadius={'0 20px 20px 0'}
                bgColor="#3B8AD7"
                display="flex"
                alignItems="center"
                justifyContent="center"
              />

              <Flex fontSize={[20, 20, 30, 35, 40]} gap={3}>
                <span /> <Text fontFamily="DarkerGrotesque">IMPACT</Text>
                <Text fontFamily="DarkerGrotesque_Normal">(microchurches)</Text>
              </Flex>
            </Flex>
            <Flex
              h={20}
              w={1200}
              display="flex"
              alignItems="center"
              justifyContent="left"
              marginLeft="95%"
              transition="opacity 3s ease-in"
              style={{
                opacity: linkPosition ? 1 : 0,
              }}
            >
              <Box
                w="8%"
                h="130%"
                borderRadius="full"
                bgColor="#81B1E1"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={[40, 15, 30, 30, 90]}
                color="white"
                fontFamily="DarkerGrotesque"
              >
                L
              </Box>
              <Box
                w={240}
                h={2}
                borderRadius={'0 20px 20px 0'}
                bgColor="#81B1E1"
                display="flex"
                alignItems="center"
                justifyContent="center"
              />

              <Flex fontSize={[20, 20, 30, 35, 40]} gap={3}>
                <span /> <Text fontFamily="DarkerGrotesque">LINK UP</Text>
                <Text fontFamily="DarkerGrotesque_Normal">
                  (district churches)
                </Text>
              </Flex>
            </Flex>
            <Flex
              h={20}
              w={1200}
              display="flex"
              alignItems="center"
              justifyContent="left"
              marginLeft="125%"
              transition="opacity 3s ease-in"
              style={{
                opacity: launchPosition ? 1 : 0,
              }}
            >
              <Box
                w="8%"
                h="130%"
                borderRadius="full"
                bgColor="#C3E0FD"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={[40, 15, 30, 30, 90]}
                color="white"
                fontFamily="DarkerGrotesque"
              >
                L
              </Box>
              <Box
                w={114}
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
        </HStack>
      )}
    </Container>
  );
};

export default SaturateVision;
