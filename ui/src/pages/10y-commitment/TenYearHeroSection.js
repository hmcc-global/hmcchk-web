import { Stack, Image, Box, Heading, Text } from 'components';
import { TYC_BODY_TEXT, TYC_HERO_EYEBROW, TYC_HERO_TITLE } from './constants';

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
            <Heading as="h2" {...TYC_HERO_EYEBROW}>
              Harvest Mission Global
            </Heading>
            <Heading as="h1" {...TYC_HERO_TITLE}>
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
          <Text {...TYC_BODY_TEXT} mt={[1, 5]} maxW={{ base: '90%', lg: '50%' }}>
            Join us as we embark on a God-sized commitment to plant churches,
            make disciples, and reach the nations over the next 10 years.
          </Text>
        </Stack>

        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          h={{ base: '20vh', lg: '10vh' }}
          bgGradient="linear(to-b, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 15%, rgba(255,255,255,0.22) 30%, rgba(255,255,255,0.43) 45%, rgba(255,255,255,0.65) 60%, rgba(255,255,255,0.84) 75%, rgba(255,255,255,0.97) 90%, rgba(255,255,255,1) 100%)"
          pointerEvents="none"
        />
      </Box>
    </>
  );
};

export default TenYearHeroSection;
