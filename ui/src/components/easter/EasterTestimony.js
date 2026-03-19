import {
  Box,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  HStack,
  Button,
  Link,
  Container,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import EasterVerticalLine from './EasterVerticalLine';

export default function EasterTestimony() {
  const testimonyButtonIcon = useBreakpointValue({
    base: undefined,
    md: (
      <ArrowForwardIcon
        transition="transform .18s"
        _groupHover={{ transform: 'translateX(0.375rem)' }}
      />
    ),
  });

  return (
    <Box
      as="section"
      w="100%"
      pt={{ base: 2, md: 4, lg: 0 }}
      pb={{ base: 6, md: 10, lg: 16 }}
    >
      <Box display="flex">
        <EasterVerticalLine position="left" color="#A690B4" />
        <Container maxW="container.xl" px={[0, 6, 8]}>
          <Box position="relative">
            <Image
              src={
                process.env.PUBLIC_URL +
                '/images/easter/easter_testimony_icon.png'
              }
              alt="icon"
              mx="auto"
              display="block"
              w={{ base: '3rem', md: '4.5rem', lg: '6rem' }}
              mb={{ base: 3, md: 4, lg: 6 }}
            />
            <Heading
              as="h2"
              mt={{ base: 2, md: 3, lg: 4 }}
              fontFamily="Instrument Serif"
              fontStyle="italic"
              fontWeight={400}
              fontSize={{ base: '1.625rem', md: '2.375rem', lg: '2.5rem' }}
              lineHeight="97%"
              textAlign="center"
              textTransform="uppercase"
              background="linear-gradient(90deg, #982896 0%, #320D19 100%)"
              backgroundClip="text"
              maxW={{ base: '100%', md: '36rem', lg: '100%' }}
              mx="auto"
              pb={{ base: 4, md: 3, lg: 2 }}
              sx={{
                WebkitTextStrokeWidth: '0.075rem',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              WE ARE ALSO SHARING TESTIMONIES!
            </Heading>

            <Grid
              position="relative"
              templateColumns={{ base: '1fr', xl: '1fr 26.25rem' }}
              gap={{ base: 8, md: 10, lg: 12 }}
              alignItems={{ base: 'center', md: 'start' }}
            >
              <Box
                bg="transparent"
                borderRadius="md"
                p={{ base: 3, md: 6, lg: 8 }}
              >
                <Stack spacing={{ base: 4, md: 5, lg: 6 }}>
                  <HStack
                    justifyContent={{ base: 'center', md: 'space-between' }}
                    alignItems="start"
                  >
                    <VStack alignItems={{ base: 'center', md: 'flex-start' }}>
                      <Text
                        fontSize={{ base: '0.75rem', md: '1rem' }}
                        letterSpacing="widest"
                        fontWeight="600"
                        color="gray.600"
                        textTransform="uppercase"
                        border={{ base: '0.0625rem solid #7D736E', md: 'none' }}
                        borderRadius={{ base: '0.5625rem', md: '0' }}
                        px={{ base: 4, md: 0 }}
                        py={{ base: 1, md: 0 }}
                      >
                        HOW TO PARTICIPATE
                      </Text>
                      <Box
                        display={{ base: 'none', md: 'block' }}
                        width={{ md: '100%', lg: '32.375rem' }}
                        height="0.0625rem"
                        bg="rgba(0,0,0,0.20)"
                      />
                    </VStack>
                  </HStack>

                  <Text
                    fontFamily="Manrope"
                    color="#161616"
                    fontSize={{ base: '0.75rem', md: '1rem' }}
                    fontStyle="normal"
                    fontWeight={400}
                    lineHeight="120.156%"
                    textAlign={{ base: 'center', md: 'left' }}
                  >
                    Post a Living Hope testimony with the following prompt:
                  </Text>

                  <Text
                    as="span"
                    fontFamily="Instrument Serif"
                    fontStyle="italic"
                    fontWeight={400}
                    fontSize={{ base: '1.5rem', md: '2rem', lg: '1.875rem' }}
                    color="#982896"
                    lineHeight="normal"
                    display="block"
                    textAlign={{ base: 'center', md: 'left' }}
                    sx={{
                      WebkitTextStrokeWidth: '0.0625rem',
                      WebkitTextStrokeColor: '#982896',
                      WebkitTextFillColor: '#982896',
                    }}
                  >
                    My hope was in ______,
                    <br />
                    but now, Jesus is
                    <Box as="br" display={{ base: 'block', md: 'none' }} /> my
                    Living Hope because ____.
                  </Text>

                  <Text
                    fontFamily="Manrope"
                    color="#161616"
                    fontSize={{ base: '0.75rem', md: '1rem' }}
                    fontStyle="normal"
                    fontWeight={400}
                    lineHeight="120.156%"
                    textAlign={{ base: 'center', md: 'left' }}
                  >
                    Include the hashtag{' '}
                    <Text
                      as="span"
                      fontWeight={700}
                      fontFamily="Manrope"
                      fontSize={{ base: '0.75rem', md: '1rem' }}
                      lineHeight="120.156%"
                    >
                      #hmcc_livinghope
                    </Text>{' '}
                    and <br />
                    tag{' '}
                    <Text
                      as="span"
                      fontWeight={700}
                      fontFamily="Manrope"
                      fontSize={{ base: '0.75rem', md: '1rem' }}
                      lineHeight="120.156%"
                    >
                      @HMCC_HK
                    </Text>{' '}
                    in your Instagram post!
                    <br />
                    <br />
                    *Make your account public so that people can see your
                    testimony from the hashtag!
                  </Text>

                  <HStack
                    pt={4}
                    justifyContent={{ base: 'center', md: 'flex-start' }}
                  >
                    <Link
                      href="https://www.instagram.com/explore/search/keyword/?q=%23hmcc_livinghope"
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      <Button
                        rightIcon={testimonyButtonIcon}
                        bg="#410025"
                        color="#FFF"
                        borderRadius="80px"
                        display="inline-flex"
                        h="55px"
                        p="8px 30px 8px 40px"
                        justifyContent="center"
                        alignItems="center"
                        gap="20px"
                        fontFamily="Manrope"
                        fontSize="18px"
                        fontWeight={700}
                        lineHeight="normal"
                        textAlign="center"
                        transition="transform .18s ease, background-color .18s ease, box-shadow .18s ease"
                        _hover={{
                          opacity: 0.95,
                          transform: 'translateY(-0.1875rem)',
                          bg: '#5a002a',
                          boxShadow: 'lg',
                        }}
                        role="group"
                      >
                        <Text
                          color="#FFF"
                          textAlign="center"
                          fontFamily="Manrope"
                          fontSize="18px"
                          fontStyle="normal"
                          fontWeight={700}
                          lineHeight="normal"
                        >
                          View More on Instagram
                        </Text>
                      </Button>
                    </Link>
                  </HStack>
                </Stack>
              </Box>

              <Box
                display="block"
                width={{ base: '100%', md: '58%', lg: '52%', xl: '80%' }}
                height={{
                  base: '24rem',
                  md: '20rem',
                  lg: '22rem',
                  xl: '22rem',
                }}
                border="none"
                px={{ base: 2, md: 0 }}
                mt={{ base: 0, xl: 8 }}
                mx="auto"
              >
                <iframe
                  title="instagram"
                  src="https://widget.tagembed.com/319774?website=11"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                ></iframe>
              </Box>
            </Grid>
          </Box>
        </Container>
        <EasterVerticalLine position="right" color="#A690B4" />
      </Box>

      <Container
        maxW="container.xl"
        px={[4, 6, 8]}
        mt={{ base: 6, md: 7, lg: 8 }}
      >
        <Box pt={{ base: 0, md: 8 }}>
          <Text
            fontFamily="Instrument Serif"
            fontSize={{ base: '1.5rem', md: '2.25rem', lg: '2.5rem' }}
            textAlign="center"
            color="#7586C1"
            fontStyle="normal"
            fontWeight={400}
            lineHeight={{ base: '1.9rem', md: '2.5rem', lg: '2rem' }}
            maxW={{ base: '100%', md: '100%' }}
            mx="auto"
            sx={{
              WebkitTextStrokeWidth: '0.0375rem',
              WebkitTextStrokeColor: '#7586C1',
              WebkitTextFillColor: '#7586C1',
            }}
          >
            Come experience the{' '}
            <Text as="span" fontStyle="italic">
              Living Hope
            </Text>
            <Box as="br" display={{ base: 'block', md: 'none' }} /> we have in
            Jesus Christ this Passion Week!
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
