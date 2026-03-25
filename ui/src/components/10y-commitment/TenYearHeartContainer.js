import React from 'react';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

const OVERLAY_COLOR = 'rgba(13, 27, 90, 0.82)';
const TITLE_COLOR = '#CAD6FF';

const backgroundImage =
  process.env.PUBLIC_URL + '/images/ten-year/heart-behind-commitment-bg.jpg';

const TenYearHeartSection = () => {
  return (
    <Container maxW="container.xl" px={0}>
      <Box
        position="relative"
        borderRadius={{ base: '0', md: '1.5rem' }}
        overflow="hidden"
        px={{ base: '1.25rem', lg: '4.75rem' }}
        py={{ base: '3.75rem' }}
      >
        <Box
          position="absolute"
          inset={0}
          zIndex={0}
          bgImage={`url(${backgroundImage})`}
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
        />

        {/* Dark navy overlay */}
        <Box position="absolute" inset={0} zIndex={1} bg={OVERLAY_COLOR} />

        {/* Content */}
        <VStack
          position="relative"
          zIndex={2}
          spacing={{ base: 6, md: 8, lg: 10 }}
          textAlign="center"
          color="white"
          mx="auto"
        >
          <Heading
            as="h2"
            fontFamily="DMSerifDisplay_Italic"
            fontSize={{ base: '2.375rem', lg: '2.8125rem' }}
            letterSpacing="0.0125rem"
            lineHeight={1}
            color={TITLE_COLOR}
          >
            The Heart Behind Our 10-Year Commitment
          </Heading>

          <Text
            fontFamily="Manrope"
            fontSize={{ base: '0.75rem', lg: '1.125rem' }}
            fontWeight={500}
            maxW={{ base: '100%', md: '80%', lg: '62.5%' }}
          >
            For the past 10 years, God has been faithful to HMCC. From our
            humble beginnings, He has grown us, led us to plant churches, and
            shown us the power of community. This new decade of commitment is
            built on that legacy of His faithfulness.
          </Text>

          <Box
            border="1px solid #FFFFFF"
            borderRadius={{ base: '0.625rem', lg: '1.25rem' }}
            px={{ base: '1.5rem', lg: '4rem' }}
            py="1.25rem"
            w="100%"
          >
            <Text
              fontFamily="DMSerifDisplay_Italic"
              fontSize={{ base: '0.875rem', lg: '1.25rem' }}
            >
              Our heart is captured by the prayer of Jabez in 1 Chronicles 4:10:
              <br />
              <Box as="br" display={{ base: 'block', md: 'none' }} />
              'Oh, that you would bless me and enlarge my territory! Let your
              hand be with me, and keep me from harm so that I will be free from
              pain.'
            </Text>
          </Box>

          <Text
            fontFamily="Manrope"
            fontSize={{ base: '0.75rem', lg: '1.125rem' }}
            fontWeight={500}
            maxW={{ base: '100%', md: '90%', lg: '80%' }}
          >
            We invite you to pray with us, asking for God to enlarge our
            influence and impact for His glory across the globe, trusting that
            His hand will guide and protect us every step of the way.
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default TenYearHeartSection;
