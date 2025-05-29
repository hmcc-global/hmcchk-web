import React from 'react';
import { Box, Heading, Text, Stack, Image } from '@chakra-ui/react';

const values = [
  {
    title: 'Direction',
    description:
      "Children to come to a saving knowledge of Jesus Christ and be rooted in God's Word and the gospel.",
    icon: '/images/building-blocks/DirectionIcon.png',
    bg: '#DBF1F1',
    shadow: '0.625rem 0.625rem 0 #77C2C6',
  },
  {
    title: 'Delight',
    description:
      'Children to experience the joy of being in an intimate relationship with Jesus and the church community.',
    icon: '/images/building-blocks/DelightIcon.png',
    bg: '#F5F0E0',
    shadow: '0.5rem 0.5rem 0 #FFE29A',
  },
  {
    title: 'Destiny',
    description:
      "Children to grow as a disciple of Jesus, to daily live out God's call in their lives, and raise up future disciples of Christ.",
    icon: '/images/building-blocks/DestinyIcon.png',
    bg: '#F1E6E6',
    shadow: '0.5rem 0.5rem 0 #F7B2B7',
  },
];

const OurValues = () => (
  <Box maxW="90rem" p={{ base: '1rem', md: '2rem' }} mb={20}>
    <Heading
      as="h1"
      size="xl"
      mb="0.5rem"
      fontSize={{ base: '2.25rem', lg: '2.625rem' }}
      fontFamily="DMSerifDisplay_Italic"
      fontWeight="400"
    >
      Our Values
    </Heading>
    <Text
      fontSize={{ base: '0.875rem', lg: '1.25rem' }}
      fontFamily="Manrope"
      mb="2.5rem"
      fontWeight="400"
    >
      We hope to accomplish our mission with the 3-Ds. Our prayer is for...
    </Text>
    <Stack
      direction={{ base: 'column', xl: 'row' }}
      spacing="2rem"
      align={{ base: 'center', xl: 'flex-start' }}
      justify="center"
    >
      {values.map((value) => (
        <Box
          key={value.title}
          bg={value.bg}
          borderRadius="3.75rem"
          boxShadow={value.shadow}
          p={{ base: '1.5rem', md: '2rem' }}
          minW={{ base: '17.9375rem', md: '17.9375rem', xl: '22.0625rem' }}
          maxW={{ base: '17.9375rem', md: '22.0625rem' }}
          maxH="24rem"
          mx="auto"
        >
          <Image
            src={value.icon}
            alt={value.title + ' icon'}
            boxSize={{ base: '4.5rem', md: '8.5rem' }}
            mb="1rem"
          />
          <Heading
            as="h3"
            size="lg"
            fontWeight="400"
            fontSize={{ base: '2rem', md: '2rem' }}
            fontFamily="DMSerifDisplay_Italic"
            mb="0.5rem"
          >
            {value.title}
          </Heading>
          <Text
            fontSize={{ base: '0.875rem', md: '1.125rem' }}
            fontWeight="400"
            fontFamily="Manrope"
          >
            {value.description}
          </Text>
        </Box>
      ))}
    </Stack>
  </Box>
);

export default OurValues;
