import { Stack, Box, Text, Link, Image, Center } from '@chakra-ui/react';

const WhatIsGivingTuesday = (props) => {
  const { accentColor } = props;

  return (
    <Box borderRadius="3xl" pt={[3, 5]} pb={[5, 8]}>
      <Stack spacing={5} direction="column" textAlign="left">
        <Stack direction={['row', 'row']} spacing={[2, 5]}>
          <Image
            src={process.env.PUBLIC_URL + '/images/givingTuesday/gt-logo.png'}
            h={['20px', '40px']}
            w={['20px', '40px']}
            mt="0.6rem"
          />
          <Text
            color={accentColor}
            fontWeight="900"
            fontSize={['26', '40']}
            fontFamily="DMserifText"
          >
            What is Giving Tuesday?
          </Text>
        </Stack>

        <Text px={[2, 0]} fontSize={['14', '20']} mt={5} fontFamily="manrope">
          <b>Giving Tuesday</b>{' '}
          <Link href="https://www.givingtuesday.org">
            (www.givingtuesday.org)
          </Link>{' '}
          is a global generosity movement unleashing the power of people and
          organizations to transform their communities and the world. It started
          as a way to grow a heart for generosity as people are purchasing
          materials during Black Friday and Cyber Monday.
        </Text>
        <Text px={[2, 0]} fontSize={['14', '20']} mt={3} fontWeight="700">
          As a church, we want to continue to grow in a heart to give to others.
        </Text>
      </Stack>
    </Box>
  );
};

export default WhatIsGivingTuesday;
