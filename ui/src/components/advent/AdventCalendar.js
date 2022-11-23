import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Image,
  Text,
  Center,
  ChakraProvider,
} from '@chakra-ui/react';
import AdventCard from './AdventCard';
import { DateTime } from 'luxon';
import blurb from './AdventCardConfig.json';
import adventTheme from './adventTheme';

const AdventCalendar = () => {
  const cardArray = Array.from({ length: 24 }, (_, i) => i + 1);
  const isActive = (i) => {
    const today = DateTime.now().day;
    if (cardArray[i] <= today) {
      return true;
    }
  };

  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', setDimension);

    return () => {
      window.removeEventListener('resize', setDimension);
    };
  }, [screenSize]);

  return (
    <ChakraProvider theme={adventTheme}>
      {screenSize.dynamicWidth > 770 ? (
        <Box
          w="100%"
          h="95vh"
          bgImage={`url('${process.env.PUBLIC_URL}/images/advent/adventCalendar/bg.png')`}
          bgSize="cover"
          bgPosition="right"
        >
          <Grid
            templateColumns="repeat(5, 1fr)"
            templateRows="repeat(2, 1fr)"
            w="100%"
            h="100%"
          >
            <GridItem colSpan={3} rowSpan={2} h="100%">
              <Grid
                templateColumns="repeat(8, 1fr)"
                templateRows="repeat(3, 1fr)"
                bgImage={`url('${process.env.PUBLIC_URL}/images/advent/adventCalendar/board.png')`}
                bgRepeat="no-repeat"
                bgSize="contain"
                bgPosition="center"
                w="90%"
                h="85%"
                px={['5vw', '7vw', '7vw', '7vw', '4.5vw']}
                py={['30vh', '25vh', '22vh', '17vh', '12vh']}
                position="relative"
                top={['12vh', '12vh', '11vh', '11vh', '10vh']}
                left={['5vw', '7vw']}
              >
                {cardArray.map((el, i) => (
                  <AdventCard
                    isActive={isActive(i)}
                    date={el}
                    key={i}
                    content={blurb[i]}
                  />
                ))}
              </Grid>
            </GridItem>
            <GridItem colSpan={2} rowSpan={2}>
              <Image
                src={
                  process.env.PUBLIC_URL +
                  '/images/advent/adventCalendar/paintings.png'
                }
                w={['90%', '80%']}
                marginTop={['26vh', '30vh', '24vh', '12vh', '6vh', '0vh']}
              />
              <Image
                src={
                  process.env.PUBLIC_URL +
                  '/images/advent/adventCalendar/music.png'
                }
                w={['50%', '40%', '35%']}
                position="relative"
                top={['24vh', '5vh', '10vh', '8vh', '5vh', '0vh']}
                left={['5vw', '7vw', '12vw', '12vw', '10vw']}
              />
            </GridItem>
          </Grid>
        </Box>
      ) : (
        <Box
          maxW="770px"
          h="200vh"
          bgSize="cover"
          bgPosition="right"
          bgImage={`url('${process.env.PUBLIC_URL}/images/advent/adventCalendar/bg.png')`}
        >
          <Center>
            <Text
              fontSize="55px"
              textAlign="center"
              fontFamily="Nosifer"
              color="#9A5508"
            >
              ADVENT 2022
            </Text>
          </Center>
          <Box
            h="180vh"
            bgPosition="center"
            bgSize="cover"
            bgImage={`url('${process.env.PUBLIC_URL}/images/advent/adventCalendar/justBoard.png')`}
          >
            <Center>
              <Text
                fontFamily="DryWhiteboardMarker-Regular"
                fontSize={20}
                textAlign="center"
              >
                {'(Calendar is best viewed over a laptop)'}
              </Text>
            </Center>
            <Grid
              templateColumns="repeat(3, 1fr)"
              templateRows="repeat(8, 1fr)"
              bgRepeat="no-repeat"
              bgSize="contain"
              w="90%"
              h="90%"
              px="5wh"
              py="7vh"
              position="relative"
              margin="auto"
              justifyContent="center"
            >
              {cardArray.map((el, i) => (
                <AdventCard
                  isActive={isActive(i)}
                  date={el}
                  key={i}
                  content={blurb[i]}
                />
              ))}
            </Grid>
            <Center justifyContent="center" textAlign="center">
              <Text fontFamily="DryWhiteboardMarker-Regular" fontSize={20}>
                {'(You might want to check the desktop version!)'}
              </Text>
            </Center>
          </Box>
        </Box>
      )}
    </ChakraProvider>
  );
};

export default AdventCalendar;
