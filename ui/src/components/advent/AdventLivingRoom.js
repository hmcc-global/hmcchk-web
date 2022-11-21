import { Box, Button, Grid, GridItem, Image } from '@chakra-ui/react';
const AdventLivingRoom = () => {
  return (
    <Box
      w="50%"
      h="95vh"
      bgImage={`url('${process.env.PUBLIC_URL}/images/advent/adventCalendar/bg.png')`}
      bgSize="cover"
      bgPosition="right"
    ></Box>
  );
};
export default AdventLivingRoom;
