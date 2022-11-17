import { Box, Grid, GridItem, Image } from '@chakra-ui/react';
import AdventCard from './AdventCard';
import { DateTime } from 'luxon';

const AdventCalendar = () => {
  const cardArray = Array.from({ length: 24 }, (_, i) => i + 1);
  const isActive = (i) => {
    const today = DateTime.now().day;
    if (cardArray[i] <= today) {
      return true;
    }
  };

  return (
    <Box
      w="100%"
      h="95vh"
      bgImage={`url('${process.env.PUBLIC_URL}/images/advent/adventCalendar/bg.png')`}
      bgSize="cover"
      bgPosition="right"
    >
      <Grid
        templateColumns="repeat(4, 1fr)"
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
            w="75%"
            h="81%"
            px={['5vw', '9vw', '7vw', '7vw', '5vw']}
            py={['30vh', '25vh', '20vh', '17vh', '12vh']}
            position="relative"
            top={['12vh', '12vh', '12vh', '11vh', '10vh']}
            left={['5vw', '7vw', '7vw', '7vw', '10vw']}
          >
            {cardArray.map((el, i) => (
              <AdventCard isActive={isActive(i)} date={el} key={i} />
            ))}
          </Grid>
        </GridItem>
        <GridItem>
          <Image
            src={
              process.env.PUBLIC_URL +
              '/images/advent/adventCalendar/paintings.png'
            }
            w="75%"
            mt="15vh"
          />
        </GridItem>
        <GridItem>
          <Image
            src={
              process.env.PUBLIC_URL + '/images/advent/adventCalendar/music.png'
            }
            w="66%"
            position="relative"
            top={['28vh', '19vh', '13vh', '7vh', '2vh']}
            left={['5vw', '5vw', '5vw', '5vw', '5vw']}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AdventCalendar;
