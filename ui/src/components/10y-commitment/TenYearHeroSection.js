import {
  Flex,
  Stack,
  Image,
  Box,
  Heading,
  Container,
  Text,
} from '@chakra-ui/react';
import { SocialIcon } from 'react-social-icons';
import { useEffect, useRef } from 'react';

const TenYearHeroSection = () => {
  const bodyTextSize = { base: '0.925rem', md: '1.2rem' };

  return (
    <>
      <Box
        minH={{ base: '60vh', lg: '75vh' }}
        bgImage={{
          base: `url('${process.env.PUBLIC_URL}/images/10y-commitment/10y-hero-bg-portrait.png')`,
          lg: `url('${process.env.PUBLIC_URL}/images/10y-commitment/10y-hero-bg-landscape.png')`,
        }}
        bgPosition="center"
        bgSize="cover"
        color="white"
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          spacing={'1rem'}
          alignItems="center"
          textAlign="center"
          gap="0rem"
        >
          <Stack spacing={'0'} alignItems="center" textAlign="center">
            <Heading
              as="h1"
              fontSize={{ base: '1.0625rem', lg: '2.5rem' }}
              fontWeight={700}
              fontFamily={'DMSans'}
              textTransform={'uppercase'}
            >
              Harvest Mission Global
            </Heading>
            <Heading
              as="h4"
              fontSize={{ base: '2.375rem', lg: '5.625rem' }}
              fontFamily={'DMSerifDisplay_Italic'}
              fontWeight={400}
            >
              10-Year Commitment
            </Heading>
          </Stack>
          <Image
            src={process.env.PUBLIC_URL + 'images/ripple.png'}
            w={{ base: '30%', lg: '10%' }}
            margin="auto"
            borderRadius="7"
            py={{ base: '1rem', lg: '2.5rem' }}
          />
          <Text
            mt={[1, 5]}
            fontWeight={500}
            fontSize={{ base: '0.875rem', lg: '1.25rem' }}
            fontFamily={'Manrope'}
            maxW={{ base: '90%', lg: '50%' }}
          >
            Join us as we embark on a God-sized commitment to plant churches,
            make disciples, and reach the nations over the next 10 years.
          </Text>
        </Stack>
      </Box>
    </>
  );
};

export default TenYearHeroSection;
