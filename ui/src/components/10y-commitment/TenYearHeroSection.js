import { Stack, Image, Box, Heading, Text } from '@chakra-ui/react';

const TenYearHeroSection = () => {
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
        position="relative"
      >
        <Stack
          spacing={'1rem'}
          alignItems="center"
          textAlign="center"
          gap="0rem"
        >
          <Stack spacing={'0'} alignItems="center" textAlign="center">
            <Heading
              as="h2"
              fontSize={{ base: '1.0625rem', lg: '2.5rem' }}
              fontWeight={700}
              fontFamily={'DMSans_Regular'}
              textTransform={'uppercase'}
              letterSpacing={{ base: '0.03em', lg: '0.08em' }}
            >
              Harvest Mission Global
            </Heading>
            <Heading
              as="h1"
              fontSize={{ base: '2.375rem', lg: '5.625rem' }}
              fontFamily={'DMSerifDisplay_Italic'}
              fontWeight={400}
            >
              10-Year Commitment
            </Heading>
          </Stack>
          <Image
            src={process.env.PUBLIC_URL + '/images/ripple.png'}
            alt="Ripple graphic"
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

        {/* Fades the hero photo into the white background of the next
            section instead of cutting off with a hard edge. */}
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          h={{ base: '6rem', lg: '10rem' }}
          bgGradient="linear(to-b, transparent, white)"
          pointerEvents="none"
        />
      </Box>
    </>
  );
};

export default TenYearHeroSection;
