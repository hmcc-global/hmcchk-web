import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Image,
  Text,
  VStack,
  keyframes,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import SaturateGoals from './SaturateGoals';

const animationKeyframes = keyframes`
  0% { transform: opacity: [1, 0, 1] ; }
`;

const continuousAnimation = {
  opacity: [1, 0.3, 1], // Animating opacity from 1 to 0 and back to 1
  transition: {
    duration: 5,
    loop: Infinity, // Loop the animation infinitely
  },
};

const SaturateContainer = () => {
  const positionElement = (e) => {
    document.documentElement.style.cursor =
      "url('/images/saturate/Saturate_cursor.svg') 1 1, auto";
  };
  window.addEventListener('mousemove', positionElement);
  return (
    <>
      <Container maxW="100%" m={0} p={0}>
        <Box
          display="flex"
          bgImage={process.env.PUBLIC_URL + '/images/saturate/Saturate_bg.svg'}
          bgPosition="center"
          bgSize="cover"
          textAlign="center"
          justifyContent="center"
          pt={[10, 5]}
          pb={[10, 5]}
        >
          <VStack w={{ sm: '50%', md: '55%', lg: '50%', xl: '35%' }}>
            <Image
              src={process.env.PUBLIC_URL + '/images/saturate/Saturate.svg'}
              px={{ base: '4em', sm: '3.5em' }}
              w="100%"
            ></Image>
            <Text
              textColor="#023A71"
              fontSize={{ sm: '15px', md: '17px', lg: '20px' }}
              fontWeight="500"
              textShadow="0px 4px 4px rgba(0, 0, 0, 0.25);"
              display={{ base: 'none', sm: 'block' }}
            >
              For the earth will be filled with the knowledge of <br /> the
              glory of the Lord as the waters cover the sea.
            </Text>
            <Text
              textColor="#023A71"
              fontSize={{ sm: '15px', md: '17px', lg: '20px' }}
              fontWeight="500"
              textShadow="0px 4px 4px rgba(0, 0, 0, 0.25);"
              display={{ base: 'block', sm: 'none' }}
            >
              For the earth will be filled with the <br /> knowledge of the
              glory of the Lord as <br /> the waters cover the sea.
            </Text>
            <Text
              textColor="#023A71"
              fontSize={{ sm: '15px', md: '17px', lg: '20px' }}
              fontWeight="700"
            >
              Habakkuk 2:14
            </Text>
          </VStack>
        </Box>
        <Box
          display="flex"
          textAlign="center"
          justifyContent="center"
          w={{ base: '80%', sm: '70%', md: '75%', lg: '70%', xl: '55%' }}
          mx="auto"
          pt={12}
          pb={3}
        >
          <Text
            textColor="#000"
            fontWeight={400}
            fontSize={{ sm: '15px', md: '17px', lg: '20px' }}
            fontFamily="Inter"
          >
            From January 2024 through December 2029, our church will journey
            together to fulfil God’s calling for us through the{' '}
            <b>Saturate Vision </b> in Hong Kong.
          </Text>
        </Box>
        <Box>
          <motion.div animate={continuousAnimation}>
            <Image
              src={
                process.env.PUBLIC_URL +
                '/images/saturate/Saturate_ring_top.svg'
              }
              width="20"
              height="20"
              mx="auto"
            />
          </motion.div>
        </Box>
      </Container>
      <SaturateGoals />

      <Container maxW="100%" m={0} p={0}></Container>

      <Container maxW="100%" p={[0, 10]} centerContent></Container>
    </>
  );
};

export default SaturateContainer;
