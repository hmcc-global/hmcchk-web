import React from 'react';
import { Box, Button, Grid, Icon, Text } from '@chakra-ui/react';
import {
  bodyFontSizeMobile,
  bodyFontSizeDesktop,
  bodyTwoFontSize,
  buttonRadius,
  subheadingFontSize,
} from './constants';
import { MdOutlinePlayCircleFilled } from 'react-icons/md';

export const EasterMore = () => {
  return (
    <Grid
      templateColumns={'repeat(2, 1fr)'}
      gap={'10px'}
      minW="100%"
      maxW="100%"
      textAlign={'left'}
      fontFamily={'Cousine'}
      fontSize={{ base: bodyFontSizeMobile, lg: bodyFontSizeDesktop }}
    >
      <Box
        bg="linear-gradient(90deg, #BA43CD 17.6%, #00A0D2 77.46%);"
        borderRadius={'15px'}
        p={'1rem'}
        justifyContent={'space-between'}
      >
        <Text
          fontSize={{ base: bodyTwoFontSize, lg: subheadingFontSize }}
          color="white"
          mb={'1rem'}
        >
          Join us as we go through LENT: ONE Hearing the Word
        </Text>
        <Button
          as={'a'}
          borderRadius={buttonRadius}
          color={'#487DD1'}
          href="https://go.onehtw.com/"
          fontStyle={'italic'}
        >
          <Text mr="10px">Go</Text>
          <Icon as={MdOutlinePlayCircleFilled} boxSize={'20px'} />
        </Button>
      </Box>
      <Box
        bg={'#0058D2'}
        borderRadius={'15px'}
        p={'1rem'}
        justifyContent={'space-between'}
      >
        <Text
          fontSize={{ base: bodyTwoFontSize, lg: subheadingFontSize }}
          color="white"
          mb={'1rem'}
        >
          Check out Harvest Mission Community Church
        </Text>
        <Button
          as={'a'}
          borderRadius={buttonRadius}
          color={'#487DD1'}
          href="/"
          fontStyle={'italic'}
        >
          <Text mr="10px">Go</Text>
          <Icon as={MdOutlinePlayCircleFilled} boxSize={'20px'} />
        </Button>
      </Box>
    </Grid>
  );
};
