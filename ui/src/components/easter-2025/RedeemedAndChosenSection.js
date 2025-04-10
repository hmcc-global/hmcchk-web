import React from 'react';
import { Box, Text, Flex, Image } from '@chakra-ui/react';

const RedeemedAndChosenSection = () => {
  return (
    <Box bgGradient="linear(to-r, #0FACD0, #FFFDD7, #FFDBC9)">
      <Flex direction={{base:'column', md:'row'}} align="center">
        <Image
          src={process.env.PUBLIC_URL + 'images/easter-2025/redeemed-chosen-mountain.png'}
            alt="Redeemed and Chosen"
            width={{ base: '26.875rem', md: '50rem' }}
            height="auto"
            objectFit="cover"
            marginBottom={-12}
            marginTop={{ base: '3', md: '10' }}
            marginRight={{ base: '3rem', md: '0' }}
            zIndex={1}
            order={{ base: 2, md: 1 }}
        />
        <Flex 
            direction="column"
            order={{ base: 1, md: 2 }}>
          <Text
            fontFamily="LexendPeta"
            fontWeight={900}
            fontSize={{ base: '1.125rem', md: '2rem' }}
            letterSpacing={{ base: '-0.188rem', md: '-0.313rem' }}
            align={{ base: 'center', md: 'left' }}
            marginBottom={{ base: '-2.5', md: '-5' }}
            marginTop={{ base: '4', md: '0' }}
          >
            BECAUSE OF WHAT JESUS DID
          </Text>
          <Text
            fontFamily="LexendPeta"
            fontWeight={900}
            fontSize={{ base: '1.125rem', md: '2rem' }}
            marginBottom={{ base: '2', md: '3' }}
            letterSpacing={{ base: '-0.188rem', md: '-0.313rem' }}
            align={{ base: 'center', md: 'left' }}
          >
            ON THE CROSS FOR US,
          </Text>
          <Text
            fontFamily="LexendPeta"
            fontWeight={900}
            fontSize={{ base: '1.125rem', md: '2rem' }}
            letterSpacing={{ base: '-0.188rem', md: '-0.313rem' }}
            align={{ base: 'center', md: 'left' }}
            marginBottom={{ base: '-2.5', md: '-5' }}
          >
            WE ARE NOW A
          </Text>
          <Text
            fontFamily="LexendPeta"
            fontWeight={900}
            bgGradient="radial-gradient(233.98% 351.14% at 31.64% -118.61%, #20444A 23.68%, #0FACD0 54.26%, #FBF574 100%)"
            backgroundClip="text"
            fontSize={{ base: '2.875rem', md: '4.875rem' }}
            letterSpacing={{ base: '-0.5rem', md: '-0.875rem' }}
            align={{ base: 'center', md: 'left' }}
            marginBottom={{ base: '-4', md: '-8' }}
          >
            REDEEMED
          </Text>
          <Text
            fontFamily="LexendPeta"
            fontWeight={900}
            bgGradient="linear-gradient(87deg, #20444A 16.04%, #0FACD0 57.53%, #6D852F 94.98%)"
            backgroundClip="text"
            fontSize={{  base: '2.875rem', md: '4.875rem'}}
            letterSpacing={{ base: '-0.5rem', md: '-0.875rem' }}
            align={{ base: 'center', md: 'left' }}
            marginBottom={{ base: '-2.5', md: '-5' }}
          >
            AND CHOSEN
          </Text>
          <Text
            fontFamily="LexendPeta"
            fontWeight={900}
            fontSize={{ base: '1.125rem', md: '2rem' }}
            letterSpacing={{ base: '-0.188rem', md: '-0.313rem' }}
            align={{ base: 'center', md: 'right' }}
          >
            GENERATION
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default RedeemedAndChosenSection;
