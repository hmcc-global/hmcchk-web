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

const HeroSection = () => {
  const vidRef = useRef();
  const vidRefMobile = useRef();

  // Define some styling as variable to make editing them easier
  const headerTextSize = ['2.75rem', '3rem', '4.6rem', '5.75rem'];
  const headerTextWeight = ['bold', 'semibold', 'semibold'];
  const headerTextSpacing = ['-3px', '-4px', '-5.5px'];
  const headerHighlightTextSize = ['1.25em', '1.25em', '1em', '1.1em'];
  const headerHighlightTextWeight = ['normal', 'normal', 'lighter'];
  const headerHighlightTextSpacing = ['-2px', '-2.5px', '-5.5px'];
  const bodyTextSize = { base: '0.925rem', md: '1.2rem' };
  const imgPath = 'images/connect/life-design.png';

  useEffect(() => {
    if (vidRef.current) {
      vidRef.current.addEventListener('loadedmetadata', (e) => {
        vidRef.current.play();
      });
    }
    if (vidRefMobile.current) {
      vidRefMobile.current.addEventListener('loadedmetadata', (e) => {
        vidRefMobile.current.play();
      });
    }
  }, [vidRef, vidRefMobile]);

  return (
    <>
      <Box
        minH={[400, 500, 850]}
        p={3}
        bgImage={`url('${process.env.PUBLIC_URL}/images/10y-commitment/10y-hero-background.png')`}
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
          spacing={4}
          alignItems="center"
          textAlign="center"
          mt="-20rem"
          gap="0rem"
        >
          <Heading
            as="h1"
            fontSize={"2.5rem"}
            fontWeight={700}
            fontFamily={"DMSans"}
            textTransform={"uppercase"}
            letterSpacing="0.1rem"
            mt={[3, 10, 14]}
            mb="-2rem"
          >
            Harvest Mission Global
          </Heading>
          <Heading
            as="h4"
            fontSize={"5.625rem"}
            fontFamily={"DMSerifDisplay_Italic"}
            fontWeight={400}
          >
            10-Year Commitment
          </Heading>
          <Image
            src={process.env.PUBLIC_URL + "images/ripple.png"}
            w={"10%"}
            margin="auto"
            borderRadius="7"
          />
          <Text
            mt={[1, 5]}
            fontWeight={500}
            fontSize={"1.25rem"}
            fontFamily={"Manrope"}
          >
            Join us as we embark on a God-sized commitment to plant churches,
            make disciples,
            <br />
            and reach the nations over the next 10 years.
          </Text>
        </Stack>
      </Box>
    </>
  );
};

export default HeroSection;
