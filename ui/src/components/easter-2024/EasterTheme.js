import React from 'react';
import { Box, Stack, HStack, VStack, Image, Text } from '@chakra-ui/react';
import {
  bodyFontSizeMobile,
  bodyFontSizeDesktop,
  greyColor,
} from './constants';

export const EasterTheme = () => {
  return (
    <Box
      display={'flex'}
      flexDir={'column'}
      p={'1rem'}
      borderRadius={'15px'}
      bg={
        'linear-gradient(180deg, rgba(217, 91, 0, 0.30) 0%, rgba(255, 207, 82, 0.30) 100%)'
      }
      fontSize={{ base: bodyFontSizeMobile, lg: bodyFontSizeDesktop }}
      color={greyColor}
      fontFamily={'Cousine'}
      maxW={'100%'}
      id="easter-2024-theme"
    >
      <Text textAlign="center" whiteSpace="pre-line" mb={'10px'}>
        Come celebrate this <b>Passion Week</b> with us!
        <br />
        <i>You are invited</i>
      </Text>
      <Stack
        display-="flex"
        direction={{ base: 'column', lg: 'row' }}
        spacing={'1rem'}
      >
        <Image
          src={process.env.PUBLIC_URL + '/images/easter-2024/theme.svg'}
          flex="1"
          borderRadius={10}
        />
        <VStack
          textAlign={'center'}
          justifyContent={'center'}
          minH={'100%'}
          spacing={0}
          maxW={{ lg: '35%' }}
        >
          <Text>
            <b>Jesus</b> defeated death by dying on the cross and resurrecting
            back to life once and for all!
          </Text>
          <br />
          <Text fontWeight={'700'}>
            Because Jesus was undefeated, we are undefeated.
          </Text>
          <br />
          <HStack>
            <Text>
              This gives us <b>hope</b> that we can continue to put on this
              identity no matter what our situations are or what reasons we have
              to feel defeated in this broken world.
            </Text>
          </HStack>
        </VStack>
      </Stack>
    </Box>
  );
};
