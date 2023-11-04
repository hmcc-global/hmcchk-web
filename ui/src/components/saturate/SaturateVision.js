import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Fade,
  Grid,
  GridItem,
  Image,
  Text,
  VStack,
  Flex,
  Stack,
  HStack,
} from '@chakra-ui/react';

const SaturateVision = () => {
  const [fillPosition, setFillPosition] = useState(false);
  const [impactPosition, setImpactPosition] = useState(false);
  const [linkPosition, setLinkPosition] = useState(false);
  const [launchPosition, setLaunchPosition] = useState(false);
  let yPos = useRef(0);

  useEffect(() => {
    const position = document.querySelector('#main-container');
    const handleScroll = () => {
      yPos.current = position.scrollTop;
      if (position.scrollTop > 500 && position.scrollTop < 600) {
        setFillPosition(true);
      } else if (position.scrollTop > 600 && position.scrollTop < 750) {
        setImpactPosition(true);
      } else if (position.scrollTop > 750 && position.scrollTop < 850) {
        setLinkPosition(true);
      } else if (position.scrollTop > 850 && position.scrollTop < 1000) {
        setLaunchPosition(true);
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

      <HStack h={1200} overflow="hidden" alignItems="left">
        <Box w="70%" h={[300, 350, 450, 730, 900, 1050]}>
          <Box
            marginTop="-20%"
            marginLeft="-20%"
            transition="border 4s ease-in"
            style={{
              border: launchPosition
                ? '2.3vw solid #C3E0FD'
                : '2.3vw solid #ffffff',
            }}
            boxSize="90%"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              transition="border 3s ease-in"
              style={{
                border: linkPosition
                  ? '2.3vw solid #81B1E1'
                  : '2.3vw solid #ffffff',
              }}
              boxSize="92%"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                transition="border 2s ease-in"
                style={{
                  border: impactPosition
                    ? '2.3vw solid #3B8AD7'
                    : '2.3vw solid #ffffff',
                }}
                boxSize="90%"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  transition="border 1s ease-in"
                  style={{
                    border: fillPosition
                      ? '2.3vw solid #0053A4'
                      : '2.3vw solid #ffffff',
                  }}
                  boxSize="90%"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Center
                    display="flex"
                    flexDirection="column"
                    w="80%"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text
                      fontWeight={700}
                      color="#0053A4"
                      fontSize={55}
                      lineHeight="90%"
                    >
                      THE VALUES
                    </Text>
                    <Text>
                      To FILL Hong Kong with the knowledge of the glory of the
                      Lord
                    </Text>
                  </Center>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Stack
          w="50%"
          color="black"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Flex
            gap={0}
            h={20}
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginTop={['-65%', '-75%', '-70%', '-60%', '-30%']}
            marginLeft={['-25%', '-20%', '-15%', '-13%', '-10%']}
          >
            <Box
              w={['60px', '65px', '70px', '75px', '80px']}
              h={['60px', '65px', '70px', '75px', '80px']}
              borderRadius="50%"
              bgColor="#0053A4"
              transform="translate(10%, 0%)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize={[40, 15, 30, 30, 40]}
              fontWeight={700}
              color="white"
            >
              F
            </Box>
            <Box
              w={380}
              h={2}
              bgColor="#0053A4"
              transform="translate(-5%, 0%)"
              display="flex"
              alignItems="center"
              justifyContent="center"
            />
            <Text fontSize={[20, 20, 30, 35, 40]} fontWeight={700}>
              FOUNDATIONS (disciples)
            </Text>
          </Flex>
          <Flex
            h={20}
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginTop={['-65%', '-75%', '-70%', '-60%', '-30%']}
            // marginLeft={['-25%', '-20%', '-15%', '-13%', '-10%']}
          >
            <Box
              w={['60px', '65px', '70px', '75px', '80px']}
              h={['60px', '65px', '70px', '75px', '80px']}
              top="50%"
              transform="translate(-30%, 0%)"
              borderRadius="50%"
              bgColor="#3B8AD7"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize={[40, 15, 30, 30, 40]}
              fontWeight={700}
              color="white"
            >
              I
            </Box>
            <Box
              w={240}
              h={2}
              transform="translate(-10%, 0%)"
              bgColor="#3B8AD7"
              display="flex"
              alignItems="center"
              justifyContent="center"
            />
            <Text
              fontSize={[20, 20, 30, 35, 40]}
              transform="translate(0%, 0%)"
              fontWeight={700}
            >
              IMPACT (microchurches)
            </Text>
          </Flex>
          <Flex
            h={20}
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginTop={['-65%', '-75%', '-70%', '-60%', '-30%']}
            // marginLeft={['-20%', '-20%', '-20%', '-20%', '-20%']}
          >
            <Box
              w={['60px', '65px', '70px', '75px', '80px']}
              h={['60px', '65px', '70px', '75px', '80px']}
              top="50%"
              transform="translate(80%, 0%)"
              borderRadius="50%"
              bgColor="#81B1E1"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize={[40, 15, 30, 30, 40]}
              fontWeight={700}
              color="white"
            >
              L
            </Box>
            <Box
              w={240}
              h={2}
              //   transform="translate(0%, 0%)"
              bgColor="#81B1E1"
              display="flex"
              alignItems="center"
              justifyContent="center"
            />
            <Text
              fontSize={[20, 20, 30, 35, 40]}
              transform="translate(3%, 0%)"
              fontWeight={700}
            >
              LINK UP (district churches)
            </Text>
          </Flex>
          <Flex
            gap={0}
            h={10}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              w={['60px', '65px', '70px', '75px', '80px']}
              h={['60px', '65px', '70px', '75px', '80px']}
              top="50%"
              transform="translate(-50%, 0%)"
              borderRadius="50%"
              bgColor="#C3E0FD"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize={[40, 15, 30, 30, 40]}
              fontWeight={700}
              color="white"
            >
              L
            </Box>
            <Box
              w={110}
              h={2}
              transform="translate(-37%, 0%)"
              bgColor="#C3E0FD"
              display="flex"
              alignItems="center"
              justifyContent="center"
            />
            <Text
              fontSize={[20, 20, 30, 35, 40]}
              transform="translate(-9%, 0%)"
              fontWeight={700}
            >
              LAUNCH (hubs)
            </Text>
          </Flex>
        </Stack>
      </HStack>
    </Container>
  );
};

export default SaturateVision;
