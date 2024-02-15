import { Grid, GridItem } from '@chakra-ui/react';

function EasterBodyMobile() {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      <GridItem colSpan={3}></GridItem>
      <GridItem colSpan={2}></GridItem>
      <GridItem colSpan={1}></GridItem>
    </Grid>
  );
}

export default EasterBodyMobile;
