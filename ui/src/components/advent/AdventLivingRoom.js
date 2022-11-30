import { Box, Grid, GridItem, Image, Flex, Spacer } from '@chakra-ui/react';
const AdventLivingRoom = () => {
  return (
    <Flex
      w="100%"
      h="107vh"
      bgImage={`url('${process.env.PUBLIC_URL}/images/advent/adventLivingRoom/room.png')`}
      bgSize="cover"
      bgPosition="right"
    >
      <Box w="60%" h="100%">
        <Grid
          templateColumns="repeat(6, 1fr)"
          templateRows="repeat(3, 1fr)"
          w="100%"
          h="100%"
        >
          <GridItem>
            <Image
              src={
                process.env.PUBLIC_URL +
                '/images/advent/adventLivingRoom/wreath.png'
              }
              w="100%"
              mt="10vh"
            />
          </GridItem>
          <GridItem></GridItem>
          <GridItem></GridItem>
          <GridItem></GridItem>
          <GridItem></GridItem>
          <GridItem>
            <Image
              src={
                process.env.PUBLIC_URL +
                '/images/advent/adventLivingRoom/cross.png'
              }
              w="50%"
              pt="5vh"
              m="auto"
            />
          </GridItem>

          <GridItem colSpan={3} rowSpan={2}>
            <Flex flexDirection="column" h="100%">
              <Box></Box>
              <Spacer />
              <Image
                src={
                  process.env.PUBLIC_URL +
                  '/images/advent/adventLivingRoom/chair.png'
                }
                w="90%"
                mb={['4vh', '6vh']}
                marginLeft="1vw"
              />
            </Flex>
          </GridItem>

          <GridItem colSpan={3} rowSpan={2}>
            <Flex flexDirection="column" h="100%">
              <Box h="0"></Box>
              <Spacer />
              <Box position="relative" w="80%" mb={['10vh', '12vh']}>
                <Image
                  src={
                    process.env.PUBLIC_URL +
                    '/images/advent/adventLivingRoom/fireplace.png'
                  }
                />
                <Image
                  position="absolute"
                  top="67%"
                  left="25%"
                  w="50%"
                  src={
                    process.env.PUBLIC_URL +
                    '/images/advent/adventLivingRoom/fire.gif'
                  }
                />
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
      <Box marginTop="auto" w="40%">
        <Image
          mb={['8vh', '10vh']}
          src={
            process.env.PUBLIC_URL + '/images/advent/adventLivingRoom/tree.png'
          }
          w="100%"
        />
      </Box>
    </Flex>
  );
};
export default AdventLivingRoom;
