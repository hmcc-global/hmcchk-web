import React from 'react';
import { Box, Heading, Text, Stack, Image } from '@chakra-ui/react';

const values = [
  {
    title: 'Direction',
    description:
      "Children to come to a saving knowledge of Jesus Christ and be rooted in God's Word and the gospel.",
    icon: '/images/building-blocks/DirectionIcon.png',
    bg: '#DBF1F1',
    shadow: '10px 10px 0 #77C2C6',
  },
  {
    title: 'Delight',
    description:
      'Children to experience the joy of being in an intimate relationship with Jesus and the church community.',
    icon: '/images/building-blocks/DelightIcon.png',
    bg: 'yellow.50',
    shadow: '8px 8px 0 #FFE29A',
  },
  {
    title: 'Destiny',
    description:
      "Children to grow as a disciple of Jesus, to daily live out God's call in their lives, and raise up future disciples of Christ.",
    icon: '/images/building-blocks/DestinyIcon.png',
    bg: 'pink.50',
    shadow: '8px 8px 0 #F7B2B7',
  },
];

const OurValues = () => (
  <Box maxW="1440px" p={{ base: 4, md: 8 }}>
    <Heading
      as="h1"
      size="xl"
      mb={2}
      fontSize={{ base: '28px', md: '42px' }}
      fontFamily="DMSerifDisplay_Italic"
      fontWeight="400"
    >
      Our Values
    </Heading>
    <Text fontSize={{ base: '16px', md: '20px' }} fontFamily="Manrope" mb={10} fontWeight="400">
      We hope to accomplish our mission with the 3-Ds. Our prayer is for...
    </Text>
    <Stack
      direction={{ base: 'column', md: 'row' }}
      spacing={8}
      align="flex-start"
      justify="center"
    >
      {values.map((value) => (
        <Box
          key={value.title}
          bg={value.bg}
          borderRadius="60px"
          boxShadow={value.shadow}
          p={{ base: 6, md: 8 }}
          minW={{ base: '100%', md: '353px' }}
          maxW={{ base: '100%', md: '353px' }}
          maxH="384px"
          position="relative"
        >
          <Image
            src={value.icon}
            alt={value.title + ' icon'}
            boxSize={{ base: '72px', md: '136px' }}
            mb={4}
          />
          <Heading
            as="h3"
            size="lg"
            fontWeight="400"
            fontSize={{ base: '22px', md: '32px' }}
            fontFamily="DMSerifDisplay_Italic"
            mb={2}
          >
            {value.title}
          </Heading>
          <Text fontSize={{ base: '14px', md: '18px' }} fontWeight="400" fontFamily="Manrope">
            {value.description}
          </Text>
        </Box>
      ))}
    </Stack>
  </Box>
);

export default OurValues;
