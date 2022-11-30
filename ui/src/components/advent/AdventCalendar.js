import { Box, Grid, GridItem, Image } from '@chakra-ui/react';
import AdventCard from './AdventCard';
import AudioPlayer from './AudioPlayer';
import { DateTime } from 'luxon';
import blurb from './AdventCardConfig.json';
console.log(blurb);

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
      h="107vh"
      bgImage={`url('${process.env.PUBLIC_URL}/images/advent/adventCalendar/bg.png')`}
      bgSize="200% 110%"
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
            px={['5vw', '9vw', '7vw', '7vw', '5vw']}
            py={['30vh', '25vh', '22vh', '20vh', '20vh']}
            position="relative"
            top={['12vh', '12vh', '12vh', '11vh', '10vh']}
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
            mt={['24vh', '20vh', '20vh', '20vh', '15vh']}
            ml="8vh"
            w="80%"
          />
        </GridItem>
        <GridItem display={{ base: 'none', md: 'block' }}>
          <AudioPlayer />
          <Image
            src={
              process.env.PUBLIC_URL + '/images/advent/adventCalendar/music.png'
            }
            w="35%"
            position="relative"
            top={['24vh', '19vh', '17vh', '15vh', '2vh']}
            left={['5vw', '7vw', '5vw', '10vw', '10vw']}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AdventCalendar;
