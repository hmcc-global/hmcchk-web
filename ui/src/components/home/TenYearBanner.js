import {
  Box,
  Flex,
  Image,
  VStack,
  Text,
  Button,
  Fade,
  Container,
  Link,
} from '@chakra-ui/react';
import { InView } from 'react-intersection-observer';

const TenYearBanner = () => {
  const backgroundImages = {
    base: `${process.env.PUBLIC_URL}/images/10-year/10y_banner_mobile.png`,
    md: `${process.env.PUBLIC_URL}/images/10-year/10y_banner_desktop.png`,
  };
  return (
    <InView rootMargin="-50px" triggerOnce={true} w="100%">
      {({ inView, ref }) => (
        <Fade transition={{ enter: { duration: 1 } }} in={inView}>
          <Container
            minW="100%"
            mx="0"
            h={{ base: '79vh', md: '75vh' }}
            py={{ base: '0', md: 10 }}
            paddingTop={{ base: '6rem' }}
            ref={ref}
            backgroundImage={{
              base: `url(${backgroundImages.base})`,
              md: `url(${backgroundImages.md})`,
            }}
            backgroundPosition="center"
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
          >
            <VStack
              w={{ base: '70%', md: '25%' }}
              justifyContent="center"
              alignItems="flex-start"
              mx="auto"
              fontFamily="Abhaya Libre"
              textColor="#FFFFFF"
              letterSpacing="-0.03em"
            >
              <Text
                fontSize={{ base: '1.3rem', md: '1.65rem' }}
                alignSelf="center"
              >
                10 YEARS OF
              </Text>
              <Flex
                fontSize={{ base: '5.7rem', md: '7rem' }}
                letterSpacing="-0.03em"
              >
                <Text
                  fontFamily="Qindom"
                  fontSize={['10.8rem', '12rem']}
                  textColor="#95CFFF"
                  position="relative"
                  top={['-3.5rem', '-4rem']}
                >
                  t
                </Text>
                <Box
                  marginLeft={{ base: '1.8rem', md: '1.7rem' }}
                  position="absolute"
                >
                  <Text position="absolute">ransfor</Text>
                  <Text
                    position="absolute"
                    top={['1.9rem', '2.5rem']}
                    left="-2rem"
                  >
                    mat
                    <Text
                      fontFamily="Qindom"
                      fontSize={['7rem', '8.5rem']}
                      textColor="#95CFFF"
                      display="inline"
                      position="relative"
                      lineHeight="inherit"
                      verticalAlign="middle"
                      zIndex={1}
                    >
                      10
                    </Text>
                    n
                  </Text>
                </Box>
              </Flex>
              <Box
                width={{ base: '80%', md: '50%' }}
                position="absolute"
                alignSelf="center"
              >
                <VStack
                  position="absolute"
                  top="5rem"
                  fontSize={{ base: '1.4rem', md: '1.5rem' }}
                  justifySelf="center"
                  textAlign="center"
                >
                  <Text>AT HMCC-HK</Text>
                  <Text
                    fontSize={{ base: '1.25rem', md: '1.875rem' }}
                    paddingTop="2rem"
                  >
                    Celebrate all of God's faithfulness in <br /> the last 10
                    years of our church
                  </Text>
                  <Link href="/10-year" my="auto">
                    <Button
                      border="0.7px solid var(--chakra-colors-Blue-Primary, #4A6EEB)"
                      borderRadius="2.75rem"
                      _hover={{ bg: '#4A6EEB', color: 'white' }}
                      textColor="#000339"
                      bgColor="#DFE7FF"
                      px={{ base: '6rem', md: '3em' }}
                      py={{ base: '0.3rem', md: '1.3rem' }}
                    >
                      <Flex
                        flexDir="row"
                        w="100%"
                        gap={{ base: '4', md: '1' }}
                        justifyContent="center"
                      >
                        <Text
                          fontSize={{ base: '0.875rem', md: '1.25rem' }}
                          fontFamily="Manrope"
                          fontWeight="700"
                          wordBreak="break-word"
                        >
                          Learn More
                        </Text>
                        <Image
                          h={['1.2em', '2em', '2.5em', '1.5em']}
                          w="auto"
                          src={
                            process.env.PUBLIC_URL +
                            '/images/10-year/call-made.svg'
                          }
                        />
                      </Flex>
                    </Button>
                  </Link>
                </VStack>
              </Box>
            </VStack>
          </Container>
        </Fade>
      )}
    </InView>
  );
};

export default TenYearBanner;
